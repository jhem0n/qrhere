export type QRContentType = 'url' | 'text' | 'email' | 'tel' | 'sms' | 'wifi';

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRGenerationOptions {
  text: string;
  size: number;
  margin: number;
  errorCorrectionLevel: QRErrorCorrectionLevel;
  color: {
    dark: string;
    light: string;
  };
}

export interface QRScanResult {
  id: string;
  rawText: string;
  type: QRContentType;
  parsedUrl?: string;
  displayHostname?: string;
  isSafeUrl: boolean;
  urlScheme?: string;
  warning?: string;
  isPrivateNetwork?: boolean;
  isPunycode?: boolean;
  isInsecureHttp?: boolean;
  hasCredentials?: boolean;
  isBiDiSpoof?: boolean;
  timestamp: number;
  source: 'camera' | 'image';
}

export interface CameraDevice {
  deviceId: string;
  label: string;
  facing?: 'environment' | 'user' | 'unknown';
}

export interface CameraState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean | null;
  devices: CameraDevice[];
  selectedDeviceId: string | null;
  facingMode: 'environment' | 'user';
  hasTorch: boolean;
  isTorchOn: boolean;
}

export interface WifiConfig {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}
