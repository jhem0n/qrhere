/**
 * Calculates relative luminance of an sRGB color string (hex format like #000000 or #ffffff)
 * based on WCAG 2.1 specifications.
 */
export function getRelativeLuminance(hexColor: string): number {
  const cleanHex = hexColor.replace('#', '').trim();
  let r = 0;
  let g = 0;
  let b = 0;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }

  const srgb = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Calculates WCAG 2.1 contrast ratio between two hex colors.
 * Returns a number between 1.0 and 21.0.
 */
export function getContrastRatio(hexColor1: string, hexColor2: string): number {
  try {
    const lum1 = getRelativeLuminance(hexColor1);
    const lum2 = getRelativeLuminance(hexColor2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 21; // fallback
  }
}

export interface ContrastAnalysis {
  ratio: number;
  formattedRatio: string;
  isScannable: boolean;
  isOptimal: boolean;
  isInverted: boolean; // Light foreground on dark background (harder for some legacy scanners)
  warning?: string;
}

export function evaluateQRColorScannability(
  fgColorHex: string,
  bgColorHex: string
): ContrastAnalysis {
  const ratio = getContrastRatio(fgColorHex, bgColorHex);
  const fgLum = getRelativeLuminance(fgColorHex);
  const bgLum = getRelativeLuminance(bgColorHex);
  const isInverted = fgLum > bgLum;

  const isScannable = ratio >= 4.0;
  const isOptimal = ratio >= 7.0 && !isInverted;

  let warning: string | undefined;

  if (ratio < 3.0) {
    warning =
      'Critically low contrast. Optical scanners and mobile cameras will fail to read this QR code. Please increase contrast.';
  } else if (ratio < 4.5) {
    warning =
      'Low contrast warning. This QR code may be difficult to scan under low lighting conditions. We recommend dark foreground on light background.';
  } else if (isInverted) {
    warning =
      'Inverted colors (light QR pattern on dark background). While modern smartphones support this, older handheld hardware scanners may struggle.';
  }

  return {
    ratio,
    formattedRatio: `${ratio.toFixed(1)}:1`,
    isScannable,
    isOptimal,
    isInverted,
    warning,
  };
}
