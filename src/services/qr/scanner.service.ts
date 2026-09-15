import jsQR from 'jsqr';
import { BrowserQRCodeReader } from '@zxing/browser';
import { QRScanResult } from '../../types/qr.types';
import { analyzeQRContent } from '../../utils/security/url';
import { validateImageFile, safeRevokeObjectURL } from '../../utils/security/file';
import { analytics } from '../analytics/analytics.service';

export interface DecodedPayload {
  text: string;
  points?: { x: number; y: number }[];
}

/**
 * High-performance, dual-engine QR Scanner Service
 * 100% client-side decoding with zero data uploads.
 */
export class QRScannerService {
  private static zxingReader: BrowserQRCodeReader | null = null;

  private static getZXingReader(): BrowserQRCodeReader {
    if (!this.zxingReader) {
      this.zxingReader = new BrowserQRCodeReader();
    }
    return this.zxingReader;
  }

  /**
   * Scans a single video frame from a video element using an offscreen canvas
   */
  public static scanVideoFrame(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement
  ): DecodedPayload | null {
    // Ensure video has at least current frame data ready
    if (!video || video.readyState < 2) {
      return null;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (width === 0 || height === 0) return null;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);

    // Primary engine: jsQR (ultra fast pixel scan)
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth',
    });

    if (code && code.data) {
      return {
        text: code.data,
        points: code.location
          ? [
              code.location.topLeftCorner,
              code.location.topRightCorner,
              code.location.bottomRightCorner,
              code.location.bottomLeftCorner,
            ]
          : undefined,
      };
    }

    return null;
  }

  /**
   * Decodes a QR code from an uploaded user image file (PNG, JPG, WEBP)
   */
  public static async scanImageFile(file: File): Promise<QRScanResult> {
    analytics.track('image_upload');

    // 1. Strict security validation on the uploaded file
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

      // Decompression bomb / resource exhaustion defense
      const MAX_SAFE_DIM = 4096;
      const MAX_SAFE_PIXELS = 16_777_216; // 16 Megapixels
      if (rawW > MAX_SAFE_DIM || rawH > MAX_SAFE_DIM || rawW * rawH > MAX_SAFE_PIXELS) {
        throw new Error(
          `Image resolution (${rawW}×${rawH}) exceeds maximum safe processing limits (4096×4096). Please upload a standard photo.`
        );
      }

      // Downscale offscreen canvas if larger than 2048px to prevent heavy buffer allocation while maintaining 100% QR fidelity
      const MAX_CANVAS_DIM = 2048;
      let renderW = rawW;
      let renderH = rawH;

      if (renderW > MAX_CANVAS_DIM || renderH > MAX_CANVAS_DIM) {
        const scale = Math.min(MAX_CANVAS_DIM / renderW, MAX_CANVAS_DIM / renderH);
        renderW = Math.max(1, Math.round(renderW * scale));
        renderH = Math.max(1, Math.round(renderH * scale));
      }

      // Create offscreen canvas for decoding
      const canvas = document.createElement('canvas');
      canvas.width = renderW;
      canvas.height = renderH;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) {
        throw new Error('Could not initialize image processing context.');
      }

      ctx.drawImage(img, 0, 0, renderW, renderH);
      const imageData = ctx.getImageData(0, 0, renderW, renderH);

      // Engine 1: jsQR
      let decodedText: string | null = null;
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth',
      });

      if (code && code.data) {
        decodedText = code.data;
      }

      // Engine 2 fallback: ZXing Browser reader if jsQR didn't catch it
      if (!decodedText) {
        try {
          const zxing = this.getZXingReader();
          // Decode directly from downscaled canvas to protect against memory spikes
          const result = await zxing.decodeFromCanvas(canvas);
          if (result && result.getText()) {
            decodedText = result.getText();
          }
        } catch {
          // ZXing also couldn't find a QR code
        }
      }

      if (!decodedText) {
        analytics.track('qr_scan_failed');
        throw new Error(
          'No QR code was detected in this image. Please ensure the QR code is clear, well-lit, and in focus.'
        );
      }

      analytics.track('qr_scan_success');
      return this.formatScanResult(decodedText, 'image');
    } catch (err: any) {
      throw err;
    } finally {
      // Memory safety: Always revoke object URL immediately
      safeRevokeObjectURL(objectUrl);
    }
  }

  /**
   * Converts raw decoded QR text into a typed, security-evaluated QRScanResult
   */
  public static formatScanResult(rawText: string, source: 'camera' | 'image'): QRScanResult {
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
    };
  }

  /**
   * Helper to load an HTMLImageElement from a URL with timeout
   */
  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const timer = setTimeout(() => {
        reject(new Error('Image loading timed out. The file might be corrupted.'));
      }, 10000);

      img.onload = () => {
        clearTimeout(timer);
        resolve(img);
      };

      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error('Failed to load image. The file may be corrupt or an unsupported format.'));
      };

      img.src = src;
    });
  }
}
