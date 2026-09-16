/**
 * Centralized Application Configuration
 * All application metadata, domain settings, and contact information are defined here.
 */

const DEFAULT_PRODUCTION_DOMAIN = 'https://qrcodescanner.app';

/**
 * Resolves the production-ready site URL.
 * Prioritizes configurable environment variables (VITE_SITE_URL, APP_URL),
 * falls back to window.location.origin if running on a live domain,
 * and strictly defaults to DEFAULT_PRODUCTION_DOMAIN if on localhost/127.0.0.1.
 * Ensures sitemaps and canonical URLs never point to localhost.
 */
export function getSiteUrl(): string {
  // 1. Check explicit client environment variable VITE_SITE_URL
  const viteSiteUrl =
    typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_SITE_URL as string | undefined) : undefined;
  if (viteSiteUrl && typeof viteSiteUrl === 'string' && viteSiteUrl.trim()) {
    const cleaned = viteSiteUrl.trim().replace(/\/$/, '');
    if (!cleaned.includes('localhost') && !cleaned.includes('127.0.0.1')) {
      return cleaned;
    }
  }

  // 2. Check injected APP_URL (e.g. from Cloud Run / AI Studio container environment)
  const appUrl =
    typeof import.meta !== 'undefined' ? (import.meta.env?.APP_URL as string | undefined) : undefined;
  if (appUrl && typeof appUrl === 'string' && appUrl.trim()) {
    const cleaned = appUrl.trim().replace(/\/$/, '');
    if (!cleaned.includes('localhost') && !cleaned.includes('127.0.0.1')) {
      return cleaned;
    }
  }

  // 3. If running in a browser on a live production domain (not local dev)
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin.replace(/\/$/, '');
    }
  }

  // 4. Fallback production domain - NEVER localhost
  return DEFAULT_PRODUCTION_DOMAIN;
}

export const APP_CONFIG = {
  name: 'QR Here',
  shortName: 'QR Here',
  tagline: 'Fast, Privacy-Focused QR Code Scanner & Generator',
  description:
    'Free online QR code scanner and generator. Scan QR codes with your camera or image files, and create custom high-resolution QR codes completely in your browser.',
  version: '1.0.0',
  // Domain is dynamically and safely resolved without ever using localhost
  get siteUrl(): string {
    return getSiteUrl();
  },
  contactEmail: 'support@qrcodescanner.app',
  githubUrl: 'https://github.com',
  features: {
    cameraScanning: true,
    imageScanning: true,
    qrGeneration: true,
    pngDownload: true,
    svgDownload: true,
    clipboardCopy: true,
    offlineSupport: true,
  },
  limits: {
    maxImageFileSizeMB: 10,
    maxQrTextInputLength: 4000, // Standard max capacity for v40 QR code
    defaultSize: 320,
    minSize: 160,
    maxSize: 1024,
  },
} as const;
