export interface WifiOptions {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface EmailOptions {
  email: string;
  subject?: string;
  body?: string;
}

export interface SmsOptions {
  phone: string;
  message?: string;
}

/**
 * Escapes special characters in Wi-Fi parameter strings
 */
function escapeWifi(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

/**
 * Encodes Wi-Fi network configuration into standard MeCard/ZXing format
 * Example: WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;
 */
export function formatWifiQR(options: WifiOptions): string {
  const enc = options.encryption || 'WPA';
  const ssid = escapeWifi(options.ssid || '');
  const pass = options.password ? escapeWifi(options.password) : '';
  const hidden = options.hidden ? 'true' : 'false';

  if (enc === 'nopass') {
    return `WIFI:T:nopass;S:${ssid};H:${hidden};;`;
  }
  return `WIFI:T:${enc};S:${ssid};P:${pass};H:${hidden};;`;
}

/**
 * Parses a standard Wi-Fi QR string into its components
 */
export function parseWifiQR(wifiString: string): WifiOptions | null {
  if (!/^WIFI:/i.test(wifiString)) return null;

  const content = wifiString.replace(/^WIFI:/i, '').replace(/;;$/, ';');
  const tokens = content.split(';');

  let ssid = '';
  let password = '';
  let encryption: 'WPA' | 'WEP' | 'nopass' = 'WPA';
  let hidden = false;

  for (const token of tokens) {
    if (token.startsWith('S:')) {
      ssid = token.substring(2).replace(/\\([\\;,:"])/g, '$1');
    } else if (token.startsWith('P:')) {
      password = token.substring(2).replace(/\\([\\;,:"])/g, '$1');
    } else if (token.startsWith('T:')) {
      const type = token.substring(2).toUpperCase();
      if (type === 'WEP' || type === 'WPA' || type === 'NOPASS') {
        encryption = type as any;
      }
    } else if (token.startsWith('H:')) {
      hidden = token.substring(2).toLowerCase() === 'true';
    }
  }

  return { ssid, password, encryption, hidden };
}

/**
 * Formats email into standard mailto: format
 */
export function formatEmailQR(options: EmailOptions): string {
  const params = new URLSearchParams();
  if (options.subject) params.set('subject', options.subject);
  if (options.body) params.set('body', options.body);
  const qs = params.toString();
  return `mailto:${options.email.trim()}${qs ? `?${qs}` : ''}`;
}

/**
 * Formats SMS into standard sms: format
 */
export function formatSmsQR(options: SmsOptions): string {
  const cleanPhone = options.phone.trim();
  if (options.message) {
    return `sms:${cleanPhone}?body=${encodeURIComponent(options.message)}`;
  }
  return `sms:${cleanPhone}`;
}

/**
 * Formats phone number into standard tel: format
 */
export function formatTelQR(phone: string): string {
  return `tel:${phone.trim()}`;
}
