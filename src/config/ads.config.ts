/**
 * Centralized Google AdSense Auto Ads Configuration
 * 
 * ARCHITECTURAL REQUIREMENTS:
 * 1. ONLY Google AdSense Auto Ads: Google determines optimal ad placements autonomously.
 * 2. Zero manual ad units, zero manual ad slots, and zero custom ad containers.
 * 3. The official AdSense script is injected globally once into <head> with the client ID.
 * 4. User data, camera frames, and QR contents are never sent to AdSense.
 */

import { AdSenseAutoAdsConfig } from '../types/ads.types';

/**
 * Validates format of an AdSense Publisher / Client ID.
 * Standard format: "ca-pub-XXXXXXXXXXXXXXXX" (10-20 digits) or "pub-XXXXXXXXXXXXXXXX".
 * Rejects empty strings, placeholders with 'X', or non-numeric IDs.
 */
export function isValidAdSenseClientId(clientId?: string | null): boolean {
  if (!clientId || typeof clientId !== 'string') return false;
  const trimmed = clientId.trim();
  return (
    /^(ca-)?pub-\d{10,20}$/i.test(trimmed) &&
    !trimmed.includes('X') &&
    !trimmed.includes('0000000000')
  );
}

/**
 * Normalizes AdSense client ID to the official "ca-pub-XXXXXXXXXXXXXXXX" format.
 */
export function normalizeAdSenseClientId(clientId: string): string {
  const trimmed = clientId.trim();
  if (trimmed.startsWith('pub-')) {
    return `ca-${trimmed}`;
  }
  return trimmed;
}

// 1. VITE_ADS_ENABLED: Set to "true" in production to activate Auto ads
const resolvedAdsEnabled =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADS_ENABLED !== undefined
    ? import.meta.env.VITE_ADS_ENABLED === 'true'
    : false;

// 2. VITE_ADSENSE_CLIENT_ID: Actual publisher client ID (e.g. ca-pub-XXXXXXXXXXXXXXXX)
const resolvedPublisherId =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_CLIENT_ID
    ? String(import.meta.env.VITE_ADSENSE_CLIENT_ID).trim()
    : '';

// 3. VITE_ADS_TEST_MODE: Set to "false" for live Auto ads
const resolvedTestMode =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADS_TEST_MODE !== undefined
    ? import.meta.env.VITE_ADS_TEST_MODE === 'true'
    : false;

export const ADS_CONFIG: AdSenseAutoAdsConfig = {
  ADS_ENABLED: resolvedAdsEnabled,
  PUBLISHER_ID: resolvedPublisherId,
  TEST_MODE: resolvedTestMode,
};

/**
 * Checks whether live Google AdSense Auto ads script is authorized to load.
 * Requires:
 * 1. ADS_ENABLED === true
 * 2. TEST_MODE === false
 * 3. Valid Publisher Client ID configured
 */
export function canLoadLiveAutoAds(): boolean {
  return Boolean(
    ADS_CONFIG.ADS_ENABLED &&
    !ADS_CONFIG.TEST_MODE &&
    isValidAdSenseClientId(ADS_CONFIG.PUBLISHER_ID)
  );
}
