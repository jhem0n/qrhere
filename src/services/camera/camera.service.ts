import { CameraDevice } from '../../types/qr.types';
import { analytics } from '../analytics/analytics.service';

/**
 * Camera Service
 * Manages device media streams, permissions, device enumeration, torch, and track teardown.
 */
export class CameraService {
  private activeStream: MediaStream | null = null;

  /**
   * Checks if MediaDevices API is supported in the current browser environment
   */
  public isSupported(): boolean {
    return !!(
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    );
  }

  /**
   * Starts camera stream with rear-camera preference on mobile
   */
  public async startCamera(options?: {
    deviceId?: string;
    facingMode?: 'environment' | 'user';
  }): Promise<MediaStream> {
    // 1. Stop any currently active stream first
    this.stopCamera();

    if (!this.isSupported()) {
      throw new Error(
        'Camera access is not supported by your current browser. Please try another modern browser like Chrome, Safari, or Firefox.'
      );
    }

    const facingMode = options?.facingMode || 'environment';

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: options?.deviceId
        ? { deviceId: { exact: options.deviceId } }
        : {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.activeStream = stream;
      analytics.track('camera_permission_granted');
      return stream;
    } catch (err: any) {
      analytics.track('camera_permission_denied');
      throw new Error(this.humanizeCameraError(err));
    }
  }

  /**
   * Stops all tracks on the active stream and releases camera hardware
   */
  public stopCamera(): void {
    if (this.activeStream) {
      this.activeStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      this.activeStream = null;
    }
  }

  /**
   * Returns current active stream if running
   */
  public getStream(): MediaStream | null {
    return this.activeStream;
  }

  /**
   * Enumerates available video input devices
   */
  public async getAvailableCameras(): Promise<CameraDevice[]> {
    if (!this.isSupported() || !navigator.mediaDevices.enumerateDevices) {
      return [];
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices
        .filter((d) => d.kind === 'videoinput')
        .map((d, index) => {
          const label = d.label.toLowerCase();
          const isBack = label.includes('back') || label.includes('rear') || label.includes('environment');
          const isFront = label.includes('front') || label.includes('user') || label.includes('selfie');

          return {
            deviceId: d.deviceId,
            label: d.label || `Camera ${index + 1}`,
            facing: isBack ? 'environment' : isFront ? 'user' : 'unknown',
          };
        });
    } catch {
      return [];
    }
  }

  /**
   * Checks if torch (flashlight) is supported by the active video track
   */
  public hasTorchCapability(): boolean {
    if (!this.activeStream) return false;
    const track = this.activeStream.getVideoTracks()[0];
    if (!track) return false;
    const capabilities: any = track.getCapabilities ? track.getCapabilities() : {};
    return !!capabilities.torch;
  }

  /**
   * Toggles torch on or off
   */
  public async setTorch(enable: boolean): Promise<boolean> {
    if (!this.activeStream) return false;
    const track = this.activeStream.getVideoTracks()[0];
    if (!track) return false;

    try {
      const capabilities: any = track.getCapabilities ? track.getCapabilities() : {};
      if (capabilities.torch) {
        await (track as any).applyConstraints({
          advanced: [{ torch: enable }],
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Maps technical DOMExceptions into clear, helpful user-facing errors
   */
  private humanizeCameraError(err: any): string {
    const name = err?.name || '';
    const message = err?.message || '';

    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return 'Camera permission was denied. Please allow camera access in your browser site permissions to scan QR codes.';
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return 'No camera was detected on this device. Please connect a webcam or upload a QR image instead.';
    }
    if (name === 'NotReadableError' || name === 'TrackStartError') {
      return 'The camera is currently in use by another application or browser tab. Please close other camera apps and try again.';
    }
    if (name === 'OverconstrainedError') {
      return 'The requested camera settings are not supported by your hardware.';
    }
    if (name === 'SecurityError') {
      return 'Camera access is blocked by your browser security policy or iframe constraints.';
    }
    return message || 'Could not start camera. Please verify device permissions and try again.';
  }
}

export const cameraService = new CameraService();
