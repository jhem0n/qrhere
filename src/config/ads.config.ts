/**
 * Centralized Google AdSense Advertising Configuration
 * 
 * ARCHITECTURAL REQUIREMENTS & POLICIES:
 * 1. ADS_ENABLED is FALSE by default.
 * 2. No live AdSense scripts or network calls occur when ADS_ENABLED is false.
 * 3. All ad placements strictly adhere to Google AdSense Quality Guidelines:
 *    - NEVER place ads inside camera controls, viewfinders, or scan canvases.
 *    - NEVER place ads beside interactive action buttons (Start Camera, Upload Image, Generate QR, Download).
 *    - NEVER disguise ads as navigation, breadcrumbs, or functional buttons.
 *    - NEVER use pop-unders, auto-opening windows, or timed interstitials.
 *    - NEVER trigger ads on button click events.
 *    - NEVER encourage accidental or incentivized clicks.
 *    - ALWAYS display clear "ADVERTISEMENT" identification above active ad units.
 * 4. When ADS_ENABLED is false, all ad components cleanly collapse to null (0 height, zero DOM nodes),
 *    ensuring pristine layout with no empty spaces or broken grids.
 */

import { AdConfig, AdPosition, AdSlotDefinition } from '../types/ads.types';

/**
 * Validates format of an AdSense Publisher / Client ID.
 * Standard format: "ca-pub-XXXXXXXXXXXXXXXX" (16 digits) or "pub-XXXXXXXXXXXXXXXX".
 * Rejects empty strings, placeholders with 'X', or malformed strings.
 */
export function isValidAdSenseClientId(clientId?: string | null): boolean {
  if (!clientId || typeof clientId !== 'string') return false;
  const trimmed = clientId.trim();
  // Must begin with 'ca-pub-' or 'pub-' and be followed by 10 to 20 digits
  return (
    /^(ca-)?pub-\d{10,20}$/i.test(trimmed) &&
    !trimmed.includes('X') &&
    !trimmed.includes('0000000000')
  );
}

// Determine if running in local development mode
const isDevelopmentEnvironment = Boolean(
  (typeof import.meta !== 'undefined' && import.meta.env?.DEV) ||
  (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production')
);

// All environment variables are completely optional with safe defaults:
// 1. VITE_ADS_ENABLED: false by default
const resolvedAdsEnabled =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADS_ENABLED !== undefined
    ? import.meta.env.VITE_ADS_ENABLED === 'true'
    : false;

// 2. VITE_ADSENSE_CLIENT_ID: optional during development, empty by default
const resolvedPublisherId =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_CLIENT_ID
    ? String(import.meta.env.VITE_ADSENSE_CLIENT_ID).trim()
    : '';

// 3. VITE_ADS_TEST_MODE: true by default for development
const resolvedTestMode =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADS_TEST_MODE !== undefined
    ? import.meta.env.VITE_ADS_TEST_MODE === 'true'
    : isDevelopmentEnvironment;

export const ADS_CONFIG: AdConfig = {
  // Master toggle: Strictly false by default.
  ADS_ENABLED: resolvedAdsEnabled,

  // Google AdSense Publisher Client ID (optional during development)
  PUBLISHER_ID: resolvedPublisherId,

  // Test mode: true by default in development to preview safe placeholders without live AdSense
  TEST_MODE: resolvedTestMode,

  // Centralized Slot Definitions for Allowed Placements
  SLOTS: {
    TOP_CONTENT: {
      id: 'ad-slot-top-content',
      name: 'Top Content Banner',
      position: 'top',
      format: 'horizontal',
      description: 'Placed below page title/breadcrumbs and separated above the primary workbench',
      minHeightPx: 90,
      dimensions: '728x90 (desktop), 320x50/320x100 (mobile)',
    },
    INLINE_CONTENT: {
      id: 'ad-slot-inline-content',
      name: 'In-Content Banner',
      position: 'inline',
      format: 'auto',
      description: 'Placed between tool result and educational guide/informational sections',
      minHeightPx: 100,
      dimensions: 'Responsive fluid width',
    },
    BOTTOM_PAGE: {
      id: 'ad-slot-bottom-page',
      name: 'Bottom Content Banner',
      position: 'bottom',
      format: 'horizontal',
      description: 'Placed immediately above the global footer area',
      minHeightPx: 90,
      dimensions: '728x90 (desktop), 320x50 (mobile)',
    },
    SIDEBAR_DESKTOP: {
      id: 'ad-slot-sidebar-desktop',
      name: 'Desktop Sidebar Banner',
      position: 'sidebar',
      format: 'vertical',
      description: 'Placed on wide screens (lg+) beside supplementary informational content',
      minHeightPx: 250,
      dimensions: '300x250 medium rectangle or 160x600 skyscraper (desktop only)',
    },
  },
};

/**
 * Checks whether live Google AdSense ads are permitted to render and execute.
 * Requires:
 * 1. ADS_ENABLED === true
 * 2. TEST_MODE === false
 * 3. Valid Publisher Client ID is configured
 */
export function canLoadLiveAds(): boolean {
  return Boolean(
    ADS_CONFIG.ADS_ENABLED &&
    !ADS_CONFIG.TEST_MODE &&
    isValidAdSenseClientId(ADS_CONFIG.PUBLISHER_ID)
  );
}

/**
 * Checks whether safe placeholders should be shown (e.g. during development/test mode).
 */
export function shouldShowAdPlaceholder(): boolean {
  // If in test mode or ads are disabled with test mode enabled
  return Boolean(ADS_CONFIG.TEST_MODE || (!ADS_CONFIG.ADS_ENABLED && ADS_CONFIG.TEST_MODE));
}

/**
 * Helper to check if ads are currently permitted to render and load scripts.
 */
export function isAdsEnabled(): boolean {
  return Boolean(ADS_CONFIG.ADS_ENABLED);
}

/**
 * Helper to retrieve slot configuration by placement position.
 */
export function getSlotForPosition(position: AdPosition): AdSlotDefinition {
  switch (position) {
    case 'top':
      return ADS_CONFIG.SLOTS.TOP_CONTENT;
    case 'bottom':
      return ADS_CONFIG.SLOTS.BOTTOM_PAGE;
    case 'sidebar':
      return ADS_CONFIG.SLOTS.SIDEBAR_DESKTOP;
    case 'inline':
    default:
      return ADS_CONFIG.SLOTS.INLINE_CONTENT;
  }
}
