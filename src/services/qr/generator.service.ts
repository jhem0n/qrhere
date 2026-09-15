import QRCode from 'qrcode';
import { QRGenerationOptions } from '../../types/qr.types';
import { analytics } from '../analytics/analytics.service';

export interface GenerationResult {
  dataUrl: string;
  svgString: string;
  error?: string;
}

/**
 * Sanitizes download filenames against path traversal, control characters, and injection
 */
function sanitizeDownloadFilename(filename: string, extension: string): string {
  const base = (filename || '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\.{2,}/g, '_')
    .trim()
    .slice(0, 100) || 'qr-code';
  return base.endsWith(`.${extension}`) ? base : `${base}.${extension}`;
}

/**
 * QR Code Generator Service
 * 100% client-side QR code generation using canvas and vector SVG.
 */
export class QRGeneratorService {
  /**
   * Generates both high-res PNG data URL and crisp SVG string from input options
   */
  public static async generateQR(options: QRGenerationOptions): Promise<GenerationResult> {
    const text = options.text.trim();
    if (!text) {
      return { dataUrl: '', svgString: '' };
    }

    try {
      const qrOptions: QRCode.QRCodeToDataURLOptions = {
        errorCorrectionLevel: options.errorCorrectionLevel,
        margin: options.margin,
        width: options.size,
        color: {
          dark: options.color.dark,
          light: options.color.light,
        },
      };

      // 1. Generate PNG Data URL
      const dataUrl = await QRCode.toDataURL(text, qrOptions);

      // 2. Generate SVG String
      const rawSvgString = await QRCode.toString(text, {
        type: 'svg',
        errorCorrectionLevel: options.errorCorrectionLevel,
        margin: options.margin,
        width: options.size,
        color: {
          dark: options.color.dark,
          light: options.color.light,
        },
      });

      // Defensive SVG sanitization: Ensure no script or foreignObject elements
      if (/<script|foreignObject|onload|onerror/i.test(rawSvgString)) {
        throw new Error('SVG content contains unauthorized markup tags.');
      }

      analytics.track('qr_generation', {
        errorCorrectionLevel: options.errorCorrectionLevel,
        size: options.size,
      });

      return { dataUrl, svgString: rawSvgString };
    } catch (err: any) {
      const message = err?.message || 'Failed to generate QR code.';
      return {
        dataUrl: '',
        svgString: '',
        error: message.includes('too large')
          ? 'The input text is too long to fit into a standard QR code. Please shorten your content or lower the error correction level.'
          : message,
      };
    }
  }

  /**
   * Triggers a safe client-side file download for PNG
   */
  public static downloadPNG(dataUrl: string, filename = 'qr-code.png'): boolean {
    if (!dataUrl) return false;
    try {
      const safeName = sanitizeDownloadFilename(filename, 'png');
      const link = document.createElement('a');
      link.download = safeName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      analytics.track('qr_download', { format: 'png' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Triggers a safe client-side file download for SVG
   */
  public static downloadSVG(svgString: string, filename = 'qr-code.svg'): boolean {
    if (!svgString) return false;
    try {
      // Defensive check against active scripts in SVG
      if (/<script|onload|onerror|javascript:/i.test(svgString)) {
        return false;
      }
      const safeName = sanitizeDownloadFilename(filename, 'svg');
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = safeName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      analytics.track('qr_download', { format: 'svg' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Copies the raw text content to the clipboard
   */
  public static async copyText(text: string): Promise<boolean> {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  }

  /**
   * Copies the generated QR image directly to the clipboard (PNG blob)
   */
  public static async copyImage(dataUrl: string): Promise<boolean> {
    if (!dataUrl) return false;
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        return false;
      }
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      return true;
    } catch {
      return false;
    }
  }
}
