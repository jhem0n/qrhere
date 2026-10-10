import bwipjs from 'bwip-js';
import JSZip from 'jszip';
import { analytics } from '../analytics/analytics.service';

export interface BarcodeGenerationOptions {
  text: string;
  format: BarcodeFormatKey;
  barWidth?: number; // scale (default 3)
  barHeight?: number; // height in mm for 1D (default 15, range 8-40)
  margin?: number; // padding in modules/points (default 10)
  barColor?: string;
  backgroundColor?: string;
  showText?: boolean;
}

export type BarcodeFormatKey =
  | 'CODE_128'
  | 'CODE_39'
  | 'CODE_93'
  | 'EAN_13'
  | 'EAN_8'
  | 'UPC_A'
  | 'UPC_E'
  | 'ITF'
  | 'CODABAR'
  | 'DATA_MATRIX'
  | 'PDF_417'
  | 'AZTEC';

export interface BarcodeFormatInfo {
  key: BarcodeFormatKey;
  name: string;
  bcid: string;
  is1D: boolean;
  description: string;
  defaultSample: string;
  validationHint: string;
}

export const BARCODE_FORMAT_MAP: Record<BarcodeFormatKey, BarcodeFormatInfo> = {
  CODE_128: {
    key: 'CODE_128',
    name: 'Code 128',
    bcid: 'code128',
    is1D: true,
    description: 'High-density universal linear barcode. Supports letters, digits, and symbols.',
    defaultSample: 'QR-HERE-12345',
    validationHint: 'Supports any alphanumeric text and ASCII symbols.',
  },
  CODE_39: {
    key: 'CODE_39',
    name: 'Code 39',
    bcid: 'code39',
    is1D: true,
    description: 'Industrial linear barcode. Supports uppercase letters, digits, and basic symbols.',
    defaultSample: 'CODE39-TEST',
    validationHint: 'Uppercase letters A-Z, 0-9, space, -, ., $, /, +, %.',
  },
  CODE_93: {
    key: 'CODE_93',
    name: 'Code 93',
    bcid: 'code93',
    is1D: true,
    description: 'Compact linear barcode with full ASCII support.',
    defaultSample: 'CODE93-VAL',
    validationHint: 'Supports standard ASCII characters.',
  },
  EAN_13: {
    key: 'EAN_13',
    name: 'EAN-13',
    bcid: 'ean13',
    is1D: true,
    description: 'International retail product barcode (13 digits).',
    defaultSample: '5901234123457',
    validationHint: 'Requires 12 or 13 digits. (12 digits auto-calculates check digit).',
  },
  EAN_8: {
    key: 'EAN_8',
    name: 'EAN-8',
    bcid: 'ean8',
    is1D: true,
    description: 'Compact retail product barcode for small items (8 digits).',
    defaultSample: '73513537',
    validationHint: 'Requires 7 or 8 digits.',
  },
  UPC_A: {
    key: 'UPC_A',
    name: 'UPC-A',
    bcid: 'upca',
    is1D: true,
    description: 'Standard North American retail product barcode (12 digits).',
    defaultSample: '036000291452',
    validationHint: 'Requires 11 or 12 digits. (11 digits auto-calculates check digit).',
  },
  UPC_E: {
    key: 'UPC_E',
    name: 'UPC-E',
    bcid: 'upce',
    is1D: true,
    description: 'Zero-compressed compact UPC barcode for small packaging.',
    defaultSample: '04210000',
    validationHint: 'Requires 6 to 8 digits.',
  },
  ITF: {
    key: 'ITF',
    name: 'ITF / ITF-14',
    bcid: 'itf14',
    is1D: true,
    description: 'Interleaved 2 of 5 barcode used for outer cartons and logistics.',
    defaultSample: '10850012345678',
    validationHint: 'Requires an even number of digits (or 13/14 digits for ITF-14).',
  },
  CODABAR: {
    key: 'CODABAR',
    name: 'Codabar',
    bcid: 'rationalizedCodabar',
    is1D: true,
    description: 'Traditional linear barcode used in libraries, blood banks, and shipping.',
    defaultSample: 'A1234567B',
    validationHint: 'Digits 0-9 and symbols -, $, :, /, ., +.',
  },
  DATA_MATRIX: {
    key: 'DATA_MATRIX',
    name: 'Data Matrix',
    bcid: 'datamatrix',
    is1D: false,
    description: 'High-density 2D matrix code for tiny labels on electronics and parts.',
    defaultSample: 'https://qrhere.online/datamatrix',
    validationHint: 'Supports text, URLs, and binary data.',
  },
  PDF_417: {
    key: 'PDF_417',
    name: 'PDF417',
    bcid: 'pdf417',
    is1D: false,
    description: 'Stacked 2D barcode for IDs, tickets, and shipping manifests.',
    defaultSample: 'PDF417-SECURE-ID-DATA',
    validationHint: 'Supports extensive text and structured data.',
  },
  AZTEC: {
    key: 'AZTEC',
    name: 'Aztec Code',
    bcid: 'azteccode',
    is1D: false,
    description: 'Compact 2D matrix code with central finder pattern for transport tickets.',
    defaultSample: 'AZTEC-BOARDING-PASS',
    validationHint: 'Supports text, URLs, and tickets.',
  },
};

/**
 * Check digit calculation for EAN-13
 */
export function calculateEAN13CheckDigit(digits12: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(digits12[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const mod = sum % 10;
  const check = mod === 0 ? 0 : 10 - mod;
  return check.toString();
}

/**
 * Check digit calculation for UPC-A (11 digits -> 12th)
 */
export function calculateUPCACheckDigit(digits11: string): string {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const digit = parseInt(digits11[i], 10);
    sum += i % 2 === 0 ? digit * 3 : digit;
  }
  const mod = sum % 10;
  const check = mod === 0 ? 0 : 10 - mod;
  return check.toString();
}

/**
 * Check digit calculation for EAN-8 (7 digits -> 8th)
 */
export function calculateEAN8CheckDigit(digits7: string): string {
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    const digit = parseInt(digits7[i], 10);
    sum += i % 2 === 0 ? digit * 3 : digit;
  }
  const mod = sum % 10;
  const check = mod === 0 ? 0 : 10 - mod;
  return check.toString();
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  processedText: string;
  suggestion?: string;
}

export function validateBarcodeInput(format: BarcodeFormatKey, rawInput: string): ValidationResult {
  const text = rawInput.trim();
  if (!text) {
    return { isValid: false, error: 'Please enter text or numbers for the barcode.', processedText: '' };
  }

  switch (format) {
    case 'EAN_13': {
      const clean = text.replace(/\D/g, '');
      if (clean.length === 12) {
        const check = calculateEAN13CheckDigit(clean);
        return { isValid: true, processedText: clean + check, suggestion: `Auto-added check digit: ${check} (Total: ${clean + check})` };
      }
      if (clean.length === 13) {
        const base = clean.slice(0, 12);
        const expectedCheck = calculateEAN13CheckDigit(base);
        if (clean[12] !== expectedCheck) {
          return { isValid: false, error: `Invalid EAN-13 check digit. Expected "${expectedCheck}" but got "${clean[12]}".`, processedText: clean };
        }
        return { isValid: true, processedText: clean };
      }
      return { isValid: false, error: `EAN-13 requires exactly 12 or 13 digits. You entered ${clean.length} digits.`, processedText: clean };
    }

    case 'UPC_A': {
      const clean = text.replace(/\D/g, '');
      if (clean.length === 11) {
        const check = calculateUPCACheckDigit(clean);
        return { isValid: true, processedText: clean + check, suggestion: `Auto-added check digit: ${check} (Total: ${clean + check})` };
      }
      if (clean.length === 12) {
        const base = clean.slice(0, 11);
        const expectedCheck = calculateUPCACheckDigit(base);
        if (clean[11] !== expectedCheck) {
          return { isValid: false, error: `Invalid UPC-A check digit. Expected "${expectedCheck}" but got "${clean[11]}".`, processedText: clean };
        }
        return { isValid: true, processedText: clean };
      }
      return { isValid: false, error: `UPC-A requires exactly 11 or 12 digits. You entered ${clean.length} digits.`, processedText: clean };
    }

    case 'EAN_8': {
      const clean = text.replace(/\D/g, '');
      if (clean.length === 7) {
        const check = calculateEAN8CheckDigit(clean);
        return { isValid: true, processedText: clean + check, suggestion: `Auto-added check digit: ${check}` };
      }
      if (clean.length === 8) {
        return { isValid: true, processedText: clean };
      }
      return { isValid: false, error: `EAN-8 requires 7 or 8 digits. You entered ${clean.length} digits.`, processedText: clean };
    }

    case 'CODE_39': {
      const upper = text.toUpperCase();
      const validCode39Regex = /^[A-Z0-9 \-\.\$\/\+\%]+$/;
      if (!validCode39Regex.test(upper)) {
        return {
          isValid: false,
          error: 'Code 39 only supports uppercase letters (A-Z), numbers (0-9), space, and symbols (- . $ / + %).',
          processedText: text,
        };
      }
      if (text !== upper) {
        return { isValid: true, processedText: upper, suggestion: 'Converted text to uppercase for Code 39 compliance.' };
      }
      return { isValid: true, processedText: upper };
    }

    case 'ITF': {
      const clean = text.replace(/\D/g, '');
      if (clean.length === 13) {
        const check = calculateUPCACheckDigit(clean);
        return { isValid: true, processedText: clean + check, suggestion: `Auto-added check digit for ITF-14: ${check}` };
      }
      return { isValid: true, processedText: clean };
    }

    default:
      if (text.length === 0) {
        return { isValid: false, error: 'Input cannot be empty.', processedText: '' };
      }
      return { isValid: true, processedText: text };
  }
}

export interface BarcodeGenerationResult {
  svgString: string;
  dataUrl: string;
  error?: string;
  warning?: string;
}

/**
 * Barcode Generator Service using bwip-js with correct proportions
 */
export class BarcodeGeneratorService {
  public static async generateBarcode(options: BarcodeGenerationOptions): Promise<BarcodeGenerationResult> {
    const formatInfo = BARCODE_FORMAT_MAP[options.format];
    if (!formatInfo) {
      return { svgString: '', dataUrl: '', error: 'Invalid barcode format selected.' };
    }

    const validation = validateBarcodeInput(options.format, options.text);
    if (!validation.isValid) {
      return { svgString: '', dataUrl: '', error: validation.error };
    }

    const textToEncode = validation.processedText;
    const is1D = formatInfo.is1D;
    const isPDF417 = options.format === 'PDF_417';

    const scale = options.barWidth !== undefined ? options.barWidth : 3;
    const height = is1D ? (options.barHeight !== undefined ? options.barHeight : 15) : (isPDF417 ? 3 : undefined);
    const paddingwidth = 10;
    const paddingheight = 6;
    const barColor = (options.barColor || '#000000').replace('#', '');
    const bgColor = (options.backgroundColor || '#ffffff').replace('#', '');
    const showText = options.showText !== false && is1D;

    // For standard linear barcodes (Code 128, Code 39, Code 93, Codabar, etc.), a small negative
    // offset gives a clean separation below the bars. Retail barcodes (EAN/UPC) have standardized GS1
    // notch placement and should not have textyoffset overridden.
    const isRetail = ['EAN_13', 'EAN_8', 'UPC_A', 'UPC_E'].includes(options.format);
    const textyoffset = isRetail ? undefined : -1;

    let warning: string | undefined = validation.suggestion;

    try {
      // 1. Generate preview SVG (scale 3 default)
      const svgString = bwipjs.toSVG({
        bcid: formatInfo.bcid,
        text: textToEncode,
        scale,
        ...(height !== undefined ? { height } : {}),
        includetext: showText,
        textsize: 10,
        ...(textyoffset !== undefined ? { textyoffset } : {}),
        textxalign: 'center',
        barcolor: barColor,
        backgroundcolor: bgColor,
        paddingwidth,
        paddingheight: 8,
      });

      // Defensive SVG sanitization
      if (/<script|foreignObject|onload|onerror|javascript:/i.test(svgString)) {
        throw new Error('Generated SVG contains unauthorized markup.');
      }

      // 2. Generate PNG Data URL (using scale 4 for sharper print export)
      const pngSvgString = bwipjs.toSVG({
        bcid: formatInfo.bcid,
        text: textToEncode,
        scale: Math.max(4, scale),
        ...(height !== undefined ? { height } : {}),
        includetext: showText,
        textsize: 10,
        ...(textyoffset !== undefined ? { textyoffset } : {}),
        textxalign: 'center',
        barcolor: barColor,
        backgroundcolor: bgColor,
        paddingwidth,
        paddingheight: 8,
      });

      const canvas = document.createElement('canvas');
      const parser = new DOMParser();
      const doc = parser.parseFromString(pngSvgString, 'image/svg+xml');
      const svgElement = doc.documentElement;
      const viewBox = svgElement.getAttribute('viewBox');
      const [, , vbWidth, vbHeight] = viewBox ? viewBox.split(' ').map(Number) : [0, 0, 600, 200];

      canvas.width = (vbWidth || 600) * 2;
      canvas.height = (vbHeight || 200) * 2;
      const ctx = canvas.getContext('2d');

      let dataUrl = '';
      if (ctx) {
        const blob = new Blob([pngSvgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = () => {
            ctx.fillStyle = `#${bgColor}`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(true);
          };
          img.onerror = reject;
          img.src = url;
        });
        URL.revokeObjectURL(url);
        dataUrl = canvas.toDataURL('image/png');
      }

      analytics.track('qr_generation', { format: options.format });

      return {
        svgString,
        dataUrl,
        warning,
      };
    } catch {
      return {
        svgString: '',
        dataUrl: '',
        error: 'Failed to generate barcode. Please check that your input matches the format requirements.',
      };
    }
  }

  /**
   * Bulk generation: generates ZIP of PNG/SVG files for up to 100 rows
   */
  public static async generateBulkZip(
    format: BarcodeFormatKey,
    lines: string[],
    fileType: 'png' | 'svg' = 'png',
    options?: Partial<BarcodeGenerationOptions>
  ): Promise<{ blob?: Blob; error?: string; successCount: number; failCount: number }> {
    const zip = new JSZip();
    const validLines = lines.slice(0, 100);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < validLines.length; i++) {
      const rawLine = validLines[i].trim();
      if (!rawLine) continue;

      const parts = rawLine.split(',');
      const val = parts[0].trim();
      const label = parts[1] ? parts[1].trim() : `barcode_${i + 1}`;

      const res = await BarcodeGeneratorService.generateBarcode({
        text: val,
        format,
        ...options,
      });

      if (res.error || !res.svgString) {
        failCount++;
        continue;
      }

      const sanitizedLabel = label.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 50);

      if (fileType === 'svg') {
        zip.file(`${sanitizedLabel}_${i + 1}.svg`, res.svgString);
        successCount++;
      } else {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 800;
          canvas.height = 400;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const svgBlob = new Blob([res.svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = () => {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(true);
              };
              img.onerror = reject;
              img.src = url;
            });
            URL.revokeObjectURL(url);
            const pngDataUrl = canvas.toDataURL('image/png');
            const base64Data = pngDataUrl.replace(/^data:image\/png;base64,/, '');
            zip.file(`${sanitizedLabel}_${i + 1}.png`, base64Data, { base64: true });
            successCount++;
          } else {
            failCount++;
          }
        } catch {
          failCount++;
        }
      }
    }

    if (successCount === 0) {
      return { error: 'No valid barcodes could be generated from the input lines.', successCount, failCount };
    }

    const content = await zip.generateAsync({ type: 'blob' });
    return { blob: content, successCount, failCount };
  }
}
