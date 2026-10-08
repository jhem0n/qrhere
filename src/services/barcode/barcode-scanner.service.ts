import jsQR from 'jsqr';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/browser';
import { MultiFormatReader, DecodeHintType } from '@zxing/library';
import { QRScanResult } from '../../types/qr.types';
import { analyzeQRContent } from '../../utils/security/url';
import { validateImageFile, safeRevokeObjectURL } from '../../utils/security/file';
import { analytics } from '../analytics/analytics.service';

export const BARCODE_FORMAT_LABELS: Record<string | number, string> = {
  [BarcodeFormat.AZTEC]: 'Aztec',
  [BarcodeFormat.CODABAR]: 'Codabar',
  [BarcodeFormat.CODE_39]: 'Code 39',
  [BarcodeFormat.CODE_93]: 'Code 93',
  [BarcodeFormat.CODE_128]: 'Code 128',
  [BarcodeFormat.DATA_MATRIX]: 'Data Matrix',
  [BarcodeFormat.EAN_8]: 'EAN-8',
  [BarcodeFormat.EAN_13]: 'EAN-13',
  [BarcodeFormat.ITF]: 'ITF (Interleaved 2 of 5)',
  [BarcodeFormat.MAXICODE]: 'MaxiCode',
  [BarcodeFormat.PDF_417]: 'PDF417',
  [BarcodeFormat.QR_CODE]: 'QR Code',
  [BarcodeFormat.RSS_14]: 'GS1 DataBar (RSS-14)',
  [BarcodeFormat.RSS_EXPANDED]: 'GS1 DataBar Expanded',
  [BarcodeFormat.UPC_A]: 'UPC-A',
  [BarcodeFormat.UPC_E]: 'UPC-E',
  [BarcodeFormat.UPC_EAN_EXTENSION]: 'UPC/EAN Extension',
  [BarcodeFormat.MICRO_QR_CODE]: 'Micro QR Code',
};

export const NATIVE_FORMAT_LABELS: Record<string, string> = {
  aztec: 'Aztec',
  codabar: 'Codabar',
  code_39: 'Code 39',
  code_93: 'Code 93',
  code_128: 'Code 128',
  data_matrix: 'Data Matrix',
  ean_8: 'EAN-8',
  ean_13: 'EAN-13',
  itf: 'ITF (Interleaved 2 of 5)',
  pdf417: 'PDF417',
  qr_code: 'QR Code',
  upc_a: 'UPC-A',
  upc_e: 'UPC-E',
  unknown: 'Barcode',
};

export class BarcodeScannerService {
  private static browserReader: BrowserMultiFormatReader | null = null;
  private static nativeBarcodeDetector: any = null;
  private static nativeDetectorChecked = false;
  private static nativeSupportedFormats: Set<string> = new Set();

  /**
   * Lazily initializes and returns the BrowserMultiFormatReader configured with all 1D/2D formats and TRY_HARDER.
   */
  public static getReader(): BrowserMultiFormatReader {
    if (!this.browserReader) {
      // DecodeHintType: 2 = POSSIBLE_FORMATS, 3 = TRY_HARDER
      const hints = new Map<number, any>();
      hints.set(2, [
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.CODE_93,
        BarcodeFormat.ITF,
        BarcodeFormat.CODABAR,
        BarcodeFormat.QR_CODE,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.AZTEC,
        BarcodeFormat.PDF_417,
      ]);
      hints.set(3, true);
      this.browserReader = new BrowserMultiFormatReader(hints);
    }
    return this.browserReader;
  }

  /**
   * Checks for browser native BarcodeDetector API (fast hardware-accelerated path in Chromium/Android).
   */
  private static async getNativeDetector(): Promise<any> {
    if (this.nativeDetectorChecked) {
      return this.nativeBarcodeDetector;
    }
    this.nativeDetectorChecked = true;

    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        const DetectorClass = (window as any).BarcodeDetector;
        if (typeof DetectorClass.getSupportedFormats === 'function') {
          const supported: string[] = await DetectorClass.getSupportedFormats();
          supported.forEach((f) => this.nativeSupportedFormats.add(f.toLowerCase()));

          const desired = [
            'ean_13',
            'ean_8',
            'upc_a',
            'upc_e',
            'code_128',
            'code_39',
            'code_93',
            'itf',
            'codabar',
            'qr_code',
            'data_matrix',
            'aztec',
            'pdf417',
          ];
          const formatsToUse = desired.filter((f) => this.nativeSupportedFormats.has(f));

          if (formatsToUse.length > 0) {
            this.nativeBarcodeDetector = new DetectorClass({ formats: formatsToUse });
            return this.nativeBarcodeDetector;
          }
        }
      } catch {
        this.nativeBarcodeDetector = null;
      }
    }
    return null;
  }

  /**
   * Rotates a canvas 90° clockwise to catch vertical 1D barcodes.
   */
  private static rotateCanvas90(canvas: HTMLCanvasElement): HTMLCanvasElement | null {
    if (typeof document === 'undefined') return null;
    try {
      const rot = document.createElement('canvas');
      rot.width = canvas.height;
      rot.height = canvas.width;
      const ctx = rot.getContext('2d');
      if (!ctx) return null;
      ctx.translate(rot.width / 2, rot.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
      return rot;
    } catch {
      return null;
    }
  }

  /**
   * Stretches contrast for low-contrast or poorly lit barcode captures.
   */
  private static enhanceCanvasContrast(canvas: HTMLCanvasElement): HTMLCanvasElement | null {
    if (typeof document === 'undefined') return null;
    try {
      const enhanced = document.createElement('canvas');
      enhanced.width = canvas.width;
      enhanced.height = canvas.height;
      const ctx = enhanced.getContext('2d', { willReadFrequently: true });
      if (!ctx) return null;

      ctx.drawImage(canvas, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;
      let min = 255;
      let max = 0;
      for (let i = 0; i < d.length; i += 4) {
        const gray = (306 * d[i] + 601 * d[i + 1] + 117 * d[i + 2] + 512) >> 10;
        if (gray < min) min = gray;
        if (gray > max) max = gray;
      }
      const range = max - min;
      if (range > 15 && range < 220) {
        const scale = 255 / range;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = Math.min(255, Math.max(0, Math.round((d[i] - min) * scale)));
          d[i + 1] = Math.min(255, Math.max(0, Math.round((d[i + 1] - min) * scale)));
          d[i + 2] = Math.min(255, Math.max(0, Math.round((d[i + 2] - min) * scale)));
        }
        ctx.putImageData(imgData, 0, 0);
        return enhanced;
      }
    } catch {
      // Fallback
    }
    return null;
  }

  /**
   * Scans a canvas element for any 1D or 2D barcode format.
   * Employs native BarcodeDetector fast-path, followed by multi-orientation ZXing and jsQR fallback.
   */
  public static async scanCanvas(
    canvas: HTMLCanvasElement
  ): Promise<{ text: string; format?: string } | null> {
    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return null;

    // 1. Fast-path: Native BarcodeDetector (hardware-accelerated in Chromium/Android)
    try {
      const nativeDetector = await this.getNativeDetector();
      if (nativeDetector) {
        const results = await nativeDetector.detect(canvas);
        if (results && results.length > 0) {
          const first = results[0];
          if (first && first.rawValue) {
            const rawFormat = String(first.format).toLowerCase();
            const formatLabel = NATIVE_FORMAT_LABELS[rawFormat] || first.format || 'Barcode';
            return {
              text: first.rawValue,
              format: formatLabel,
            };
          }
        }
      }
    } catch {
      // Continue to fallback
    }

    const reader = this.getReader();

    // 2. Pass 1: Standard 0° orientation with ZXing
    try {
      const result = await reader.decodeFromCanvas(canvas);
      if (result && result.getText()) {
        const rawFormat = result.getBarcodeFormat();
        return {
          text: result.getText(),
          format: BARCODE_FORMAT_LABELS[rawFormat] || 'Barcode',
        };
      }
    } catch {
      // Continue to Pass 2
    }

    // 3. Pass 2: Rotated 90° orientation (for vertical 1D barcodes)
    const rotCanvas = this.rotateCanvas90(canvas);
    if (rotCanvas) {
      try {
        const result = await reader.decodeFromCanvas(rotCanvas);
        if (result && result.getText()) {
          const rawFormat = result.getBarcodeFormat();
          return {
            text: result.getText(),
            format: BARCODE_FORMAT_LABELS[rawFormat] || 'Barcode',
          };
        }
      } catch {
        // Continue to Pass 3
      }
    }

    // 4. Pass 3: Contrast stretched / enhanced (for low contrast or uneven lighting)
    const enhancedCanvas = this.enhanceCanvasContrast(canvas);
    if (enhancedCanvas) {
      try {
        const result = await reader.decodeFromCanvas(enhancedCanvas);
        if (result && result.getText()) {
          const rawFormat = result.getBarcodeFormat();
          return {
            text: result.getText(),
            format: BARCODE_FORMAT_LABELS[rawFormat] || 'Barcode',
          };
        }
      } catch {
        // Continue to Pass 4
      }
    }

    // 5. Pass 4: Fallback to jsQR for fast QR detection if ZXing didn't catch it
    try {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const imgData = ctx.getImageData(0, 0, width, height);
        const qrCode = jsQR(imgData.data, width, height, {
          inversionAttempts: 'attemptBoth',
        });
        if (qrCode && qrCode.data) {
          return {
            text: qrCode.data,
            format: 'QR Code',
          };
        }
      }
    } catch {
      // Fallback failed
    }

    return null;
  }

  /**
   * Decodes a barcode from an uploaded image file (PNG, JPG, WEBP, etc.)
   */
  public static async scanImageFile(file: File): Promise<QRScanResult> {
    analytics.track('image_upload');

    const validation = await validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error || 'The uploaded file is not a valid image.');
    }

    let objectUrl: string | null = null;

    try {
      objectUrl = URL.createObjectURL(file);
      const img = await this.loadImage(objectUrl);

      const rawW = img.naturalWidth || img.width;
      const rawH = img.naturalHeight || img.height;

      if (rawW <= 0 || rawH <= 0) {
        throw new Error('Image has invalid or zero dimensions.');
      }

      // Safe size constraints
      const MAX_SAFE_DIM = 4096;
      const MAX_SAFE_PIXELS = 16_777_216;
      if (rawW > MAX_SAFE_DIM || rawH > MAX_SAFE_DIM || rawW * rawH > MAX_SAFE_PIXELS) {
        throw new Error(
          `Image resolution (${rawW}×${rawH}) exceeds maximum safe processing limits. Please upload a standard photo.`
        );
      }

      // Optimal canvas bounds for barcode scanning: up to 2048px maintains maximum barcode stripe resolution
      const MAX_CANVAS_DIM = 2048;
      let renderW = rawW;
      let renderH = rawH;

      if (renderW > MAX_CANVAS_DIM || renderH > MAX_CANVAS_DIM) {
        const scale = Math.min(MAX_CANVAS_DIM / renderW, MAX_CANVAS_DIM / renderH);
        renderW = Math.max(1, Math.round(renderW * scale));
        renderH = Math.max(1, Math.round(renderH * scale));
      }

      const canvas = document.createElement('canvas');
      canvas.width = renderW;
      canvas.height = renderH;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) {
        throw new Error('Could not initialize image processing context.');
      }

      ctx.drawImage(img, 0, 0, renderW, renderH);

      const scanResult = await this.scanCanvas(canvas);

      if (!scanResult || !scanResult.text) {
        analytics.track('qr_scan_failed');
        throw new Error(
          'Barcode not detected. Try moving closer, improving lighting, or uploading a clearer image.'
        );
      }

      analytics.track('qr_scan_success');
      return this.formatScanResult(scanResult.text, 'image', scanResult.format);
    } finally {
      safeRevokeObjectURL(objectUrl);
    }
  }

  /**
   * Helper to load an HTMLImageElement from an object URL safely
   */
  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image file for barcode processing.'));
      img.src = src;
    });
  }

  /**
   * Formats raw barcode text into a typed QRScanResult
   */
  public static formatScanResult(
    rawText: string,
    source: 'camera' | 'image',
    barcodeFormat?: string
  ): QRScanResult {
    const analysis = analyzeQRContent(rawText);

    return {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      rawText,
      type: analysis.type,
      parsedUrl: analysis.sanitizedHref,
      displayHostname: analysis.displayHostname,
      isSafeUrl: analysis.isSafe && analysis.isUrl,
      urlScheme: analysis.protocol,
      warning: analysis.dangerReason,
      isPrivateNetwork: analysis.isPrivateNetwork,
      isPunycode: analysis.isPunycode,
      isInsecureHttp: analysis.isInsecureHttp,
      hasCredentials: analysis.hasCredentials,
      isBiDiSpoof: analysis.isBiDiSpoof,
      timestamp: Date.now(),
      source,
      barcodeFormat: barcodeFormat || 'Barcode',
    };
  }
}
