import jsQR from 'jsqr';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/browser';
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
  [BarcodeFormat.RSS_14]: 'RSS-14',
  [BarcodeFormat.RSS_EXPANDED]: 'RSS Expanded',
  [BarcodeFormat.UPC_A]: 'UPC-A',
  [BarcodeFormat.UPC_E]: 'UPC-E',
  [BarcodeFormat.UPC_EAN_EXTENSION]: 'UPC/EAN Extension',
  [BarcodeFormat.MICRO_QR_CODE]: 'Micro QR Code',
};

export class BarcodeScannerService {
  private static multiFormatReader: BrowserMultiFormatReader | null = null;
  private static nativeDetector: any = null;
  private static nativeDetectorChecked: boolean = false;

  private static getNativeDetector(): any {
    if (!this.nativeDetectorChecked) {
      this.nativeDetectorChecked = true;
      if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
        try {
          this.nativeDetector = new (window as any).BarcodeDetector({
            formats: [
              'aztec',
              'code_128',
              'code_39',
              'code_93',
              'codabar',
              'data_matrix',
              'ean_13',
              'ean_8',
              'itf',
              'pdf417',
              'qr_code',
              'upc_a',
              'upc_e',
            ],
          });
        } catch {
          this.nativeDetector = null;
        }
      }
    }
    return this.nativeDetector;
  }

  public static getReader(): BrowserMultiFormatReader {
    if (!this.multiFormatReader) {
      this.multiFormatReader = new BrowserMultiFormatReader();
    }
    return this.multiFormatReader;
  }

  /**
   * Scans a live video element or canvas for any 1D or 2D barcode format.
   * Leverages hardware-accelerated BarcodeDetector directly when available,
   * with ZXing MultiFormat and jsQR fallbacks.
   */
  public static async scanVideoOrCanvas(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement
  ): Promise<{ text: string; format?: string } | null> {
    // 1. Try Hardware-accelerated native BarcodeDetector directly on the video element
    const native = this.getNativeDetector();
    if (native) {
      try {
        const barcodes = await native.detect(video);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          return {
            text: barcodes[0].rawValue,
            format: (barcodes[0].format || 'Barcode').toUpperCase(),
          };
        }
      } catch {
        // Fall back to canvas
      }
    }

    // 2. Draw current frame to canvas for JS engine fallbacks
    if (video.videoWidth === 0 || video.videoHeight === 0) return null;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return this.scanCanvas(canvas);
  }

  /**
   * Scans a canvas element for any 1D or 2D barcode format.
   */
  public static async scanCanvas(
    canvas: HTMLCanvasElement
  ): Promise<{ text: string; format?: string } | null> {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || canvas.width === 0 || canvas.height === 0) return null;

    // 1. Try Native BarcodeDetector if available
    const native = this.getNativeDetector();
    if (native) {
      try {
        const barcodes = await native.detect(canvas);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          return {
            text: barcodes[0].rawValue,
            format: (barcodes[0].format || 'Barcode').toUpperCase(),
          };
        }
      } catch {
        // Fall back to ZXing
      }
    }

    // 2. ZXing Browser MultiFormat Reader (handles UPC, EAN, Code 128, etc.)
    try {
      const reader = this.getReader();
      const result = await reader.decodeFromCanvas(canvas);
      if (result && result.getText()) {
        const rawFormat = result.getBarcodeFormat();
        const formatLabel = BARCODE_FORMAT_LABELS[rawFormat] || 'Barcode';
        return {
          text: result.getText(),
          format: formatLabel,
        };
      }
    } catch {
      // Continue to fallback
    }

    // 3. Secondary fallback: jsQR for fast QR detection
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imgData.data, imgData.width, imgData.height, {
        inversionAttempts: 'attemptBoth',
      });
      if (qrCode && qrCode.data) {
        return {
          text: qrCode.data,
          format: 'QR Code',
        };
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

      // Downscale canvas if larger than 2048px for memory safety
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
          'No barcode detected in this image. Please ensure the barcode is clear, well-lit, and in focus.'
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
