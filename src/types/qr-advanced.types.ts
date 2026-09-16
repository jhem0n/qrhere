import { QRErrorCorrectionLevel } from './qr.types';

export type DataType =
  | 'link'
  | 'text'
  | 'email'
  | 'location'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'skype'
  | 'zoom'
  | 'wifi'
  | 'vcard'
  | 'event'
  | 'paypal'
  | 'bitcoin';

export interface LinkData {
  url: string;
}

export interface TextData {
  text: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  address: string;
}

export interface PhoneData {
  phone: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface SkypeData {
  username: string;
  action: 'call' | 'chat';
}

export interface ZoomData {
  meetingId: string;
  password?: string;
  joinUrl?: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
  address: string;
  website: string;
}

export interface EventData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PayPalData {
  type: 'me' | 'email';
  account: string;
  amount?: string;
}

export interface BitcoinData {
  address: string;
  amount?: string;
}

export interface AllQRFormData {
  link: LinkData;
  text: TextData;
  email: EmailData;
  location: LocationData;
  phone: PhoneData;
  sms: SmsData;
  whatsapp: WhatsAppData;
  skype: SkypeData;
  zoom: ZoomData;
  wifi: WifiData;
  vcard: VCardData;
  event: EventData;
  paypal: PayPalData;
  bitcoin: BitcoinData;
}

export type PatternStyle = 'square' | 'dots' | 'rounded' | 'classy' | 'diamond';
export type MarkerBorderStyle = 'square' | 'rounded' | 'circle' | 'leaf';
export type MarkerCenterStyle = 'square' | 'circle' | 'star' | 'diamond' | 'heart';
export type FrameStyle = 'none' | 'bottom-banner' | 'top-banner' | 'phone-badge' | 'circular-badge';

export interface QRAdvancedOptions {
  // Colors
  bgColor: string;
  fgColor: string;
  isTransparentBg: boolean;
  isGradient: boolean;
  gradientColor2: string;
  gradientType: 'linear' | 'radial';
  bgImageUrl?: string;
  bgImageOpacity: number;

  // Design
  pattern: PatternStyle;
  markerBorder: MarkerBorderStyle;
  markerCenter: MarkerCenterStyle;
  hasCustomMarkerColor: boolean;
  markerBorderColor: string;
  markerCenterColor: string;

  // Logo
  logoUrl?: string;
  logoPreset?: string;
  removeBgBehindLogo: boolean;
  logoSize: number; // 10 - 30

  // Options
  size: number;
  margin: number;
  errorCorrection: QRErrorCorrectionLevel;
  frameStyle: FrameStyle;
  frameLabel: string;
  frameFont: string;
  frameLabelSize: number;
  hasCustomFrameColor: boolean;
  frameColor: string;
}
