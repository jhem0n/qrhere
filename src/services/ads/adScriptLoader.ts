/**
 * Centralized Google AdSense Auto Ads Script Loader
 * 
 * Safety & Quality:
 * - Loads the official Google AdSense Auto Ads script globally ONCE.
 * - Guarded by ADS_CONFIG.ADS_ENABLED=true, TEST_MODE=false, and valid VITE_ADSENSE_CLIENT_ID.
 * - Idempotent: checks for existing script before injection; never injects duplicate scripts.
 * - No manual ad units or manual ad placements.
 * - Google's machine learning autonomously determines optimal, non-intrusive placements.
 */

import { ADS_CONFIG, canLoadLiveAutoAds, normalizeAdSenseClientId } from '../../config/ads.config';

let isAutoAdsScriptInjected = false;
let isAutoAdsScriptLoaded = false;

/**
 * Initializes and injects the global Google AdSense Auto Ads script.
 * Runs once globally during application startup.
 */
export function loadGoogleAutoAdsScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Only execute in browser environments
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(false);
      return;
    }

    // Check if live Auto ads are permitted
    if (!canLoadLiveAutoAds()) {
      resolve(false);
      return;
    }

    // Prevent duplicate injection
    if (isAutoAdsScriptLoaded || isAutoAdsScriptInjected) {
      resolve(true);
      return;
    }

    // Check if script tag already exists in document head
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (existingScript) {
      isAutoAdsScriptInjected = true;
      isAutoAdsScriptLoaded = true;
      resolve(true);
      return;
    }

    try {
      const clientId = normalizeAdSenseClientId(ADS_CONFIG.PUBLISHER_ID);
      const script = document.createElement('script');
      script.id = 'google-adsense-auto-ads';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;

      script.onload = () => {
        isAutoAdsScriptLoaded = true;
        resolve(true);
      };

      script.onerror = () => {
        // Silently resolve if blocked by network or content blockers
        resolve(false);
      };

      document.head.appendChild(script);
      isAutoAdsScriptInjected = true;
    } catch {
      resolve(false);
    }
  });
}

/**
 * Returns whether the Google AdSense Auto Ads script is injected into the DOM.
 */
export function isAdSenseAutoAdsInjected(): boolean {
  if (typeof document === 'undefined') return false;
  return isAutoAdsScriptInjected || Boolean(document.querySelector('script[src*="adsbygoogle.js"]'));
}
