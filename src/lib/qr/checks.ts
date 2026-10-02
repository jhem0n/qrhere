import jsQR from 'jsqr';
import { QRDesignState, ScannabilityResult } from '../../types/generator.types';
import { QRMatrixResult } from './matrix';
import { svgToCanvas } from './exportPng';

/**
 * Calculates relative luminance according to WCAG 2.1 specifications
 */
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '').trim();
  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255;
    g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255;
    b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255;
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  }

  const sRGB = [r, g, b].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculates contrast ratio between two hex colors (1:1 to 21:1)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

/**
 * Comprehensive scannability and structural validation
 */
export function evaluateScannability(
  state: QRDesignState,
  matrix: QRMatrixResult
): Omit<ScannabilityResult, 'decodedSuccessfully' | 'decodedText' | 'decodeError'> {
  const issues: ScannabilityResult['issues'] = [];

  // 1. Contrast Check
  const fgColor = state.fg || '#000000';
  const bgColor = state.transparent ? '#ffffff' : state.bg || '#ffffff';
  let contrastRatio = calculateContrastRatio(fgColor, bgColor);

  if (state.gradient.on) {
    const ratio1 = calculateContrastRatio(state.gradient.from, bgColor);
    const ratio2 = calculateContrastRatio(state.gradient.to, bgColor);
    contrastRatio = Math.min(ratio1, ratio2);
  }

  const isContrastSufficient = contrastRatio >= 4.0;
  if (contrastRatio < 3.0) {
    issues.push({
      id: 'low-contrast-fail',
      level: 'error',
      message: `Critically low contrast ratio (${contrastRatio}:1). Most smartphone cameras will not decode this code reliably.`,
      canFix: true,
      fixAction: 'fix-contrast',
    });
  } else if (contrastRatio < 4.0) {
    issues.push({
      id: 'low-contrast-warn',
      level: 'warning',
      message: `Sub-optimal optical contrast ratio (${contrastRatio}:1). We recommend at least 4.5:1 for dependable scanning.`,
      canFix: true,
      fixAction: 'fix-contrast',
    });
  }

  // 2. Inverted Colors Check
  const lumFg = getLuminance(fgColor);
  const lumBg = getLuminance(bgColor);
  const isInverted = lumFg > lumBg;

  if (isInverted) {
    issues.push({
      id: 'inverted-colors',
      level: 'warning',
      message: 'Inverted colors (light code on dark background). Some hardware scanners and budget cameras struggle with inverted codes.',
      canFix: true,
      fixAction: 'swap-colors',
    });
  }

  // 3. Logo Checks
  const hasLogo = Boolean(state.logo.src || state.logo.preset);
  const logoCoverage = hasLogo ? state.logo.size || 22 : 0;
  const isLogoTooLarge = logoCoverage > 25;
  const isLogoBlocked = logoCoverage > 30;

  if (isLogoBlocked) {
    issues.push({
      id: 'logo-too-large',
      level: 'error',
      message: `Center logo covers ${logoCoverage}% of the QR code area, which exceeds the mathematical Reed-Solomon repair limit.`,
      canFix: true,
      fixAction: 'reduce-logo-size',
    });
  } else if (isLogoTooLarge) {
    issues.push({
      id: 'logo-large-warn',
      level: 'warning',
      message: `Center logo covers ${logoCoverage}% of code area. Use Error Correction Level H to ensure dependable scanning.`,
      canFix: true,
      fixAction: 'raise-ecc-h',
    });
  }

  const isEccSufficientForLogo = !hasLogo || state.ecc === 'Q' || state.ecc === 'H';
  if (hasLogo && !isEccSufficientForLogo) {
    issues.push({
      id: 'ecc-low-for-logo',
      level: 'warning',
      message: `Using center logo with error correction level ${state.ecc}. Error correction should be set to Q (25%) or H (30%).`,
      canFix: true,
      fixAction: 'raise-ecc-h',
    });
  }

  // 4. Data Density Check
  const isDense = matrix.version > 14;
  if (isDense) {
    issues.push({
      id: 'dense-modules',
      level: 'info',
      message: `High data density (QR Version ${matrix.version}, ${matrix.size}x${matrix.size} grid). Print at least 4 x 4 cm for reliable scanning.`,
      canFix: false,
    });
  }

  // 5. Quiet Zone Check
  const hasEnoughQuietZone = state.margin >= 2;
  if (!hasEnoughQuietZone) {
    issues.push({
      id: 'small-quiet-zone',
      level: 'warning',
      message: 'Quiet zone margin is below 2 modules. Scanners may struggle if placed against busy surrounding artwork.',
      canFix: true,
      fixAction: 'set-margin-3',
    });
  }

  // 6. Transparent Background Notice
  if (state.transparent) {
    issues.push({
      id: 'transparent-bg',
      level: 'info',
      message: 'Transparent background active. Ensure the surface you place this code on is high-contrast and solid.',
      canFix: false,
    });
  }

  // Overall Score Calculation
  let score: ScannabilityResult['score'] = 'excellent';
  let scoreLabel = 'Excellent Scannability';

  const hasErrors = issues.some((i) => i.level === 'error');
  const hasWarnings = issues.some((i) => i.level === 'warning');

  if (hasErrors) {
    score = 'fail';
    scoreLabel = 'Will Likely Fail to Scan';
  } else if (hasWarnings) {
    score = 'risky';
    scoreLabel = 'Risky — Check Warnings';
  } else if (contrastRatio < 5.0 || isDense) {
    score = 'good';
    scoreLabel = 'Good Scannability';
  }

  return {
    score,
    scoreLabel,
    contrastRatio,
    isContrastSufficient,
    isInverted,
    logoCoveragePercent: logoCoverage,
    isLogoTooLarge,
    isLogoBlocked,
    isEccSufficientForLogo,
    isDense,
    hasEnoughQuietZone,
    issues,
  };
}

/**
 * Performs real-time optical scan verification by rendering and decoding the code
 */
export async function runRealDecodeTest(svgString: string): Promise<{
  success: boolean;
  decodedText?: string;
  error?: string;
}> {
  try {
    const canvas = await svgToCanvas(svgString, 600);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { success: false, error: 'Could not access canvas context' };
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imgData.data, imgData.width, imgData.height, {
      inversionAttempts: 'attemptBoth',
    });

    if (code && code.data) {
      return {
        success: true,
        decodedText: code.data,
      };
    }

    return {
      success: false,
      error: 'Optical decoder could not detect QR finder patterns or read data matrix.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Decode test failed',
    };
  }
}
