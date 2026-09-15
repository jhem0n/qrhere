/**
 * Centralized Analytics Configuration & Privacy Protections
 * 
 * Strict Privacy Mandate:
 * - QR content, scanned URLs, uploaded image contents, and user messages are NEVER tracked.
 * - ANALYTICS_ENABLED is disabled by default.
 * - Only operational counters (e.g., scan initiated, download clicked) are supported.
 */

export const ANALYTICS_CONFIG = {
  // Master toggle: set to false by default
  ANALYTICS_ENABLED: false,
  
  // Tracking ID if enabled in future
  TRACKING_ID:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ANALYTICS_ID) || '',

  // Whitelist of privacy-safe event names
  ALLOWED_EVENTS: [
    'qr_scan_started',
    'qr_scan_success',
    'qr_scan_failed',
    'qr_generation',
    'qr_download',
    'image_upload',
    'camera_permission_denied',
    'camera_permission_granted',
    'theme_changed',
  ] as const,

  // Forbidden fields check (compile-time and runtime guarantee)
  FORBIDDEN_FIELDS: [
    'qrText',
    'qrContent',
    'url',
    'image',
    'imageData',
    'filename',
    'message',
    'name',
    'email',
  ] as const,
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_CONFIG.ALLOWED_EVENTS)[number];
