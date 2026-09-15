/**
 * Centralized Google AdSense Script Loader
 * 
 * Safety & Quality:
 * - Strictly guarded by ADS_CONFIG.ADS_ENABLED (false by default).
 * - ZERO network calls or DOM script injections if ads are disabled or publisher ID is empty.
 * - Single-instance loader prevents redundant script tags.
 */

import { ADS_CONFIG, canLoadLiveAds, isValidAdSenseClientId } from '../../config/ads.config';

let isScriptInjected = false;
let isScriptLoaded = false;

/**
 * Injects Google AdSense script ONLY when VITE_ADS_ENABLED=true and a valid client ID is configured.
 * Returns a promise that resolves when the script is loaded or resolves immediately if disabled.
 */
export function loadAdSenseScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Strict Requirement: Do not load Google AdSense scripts unless VITE_ADS_ENABLED=true and a valid client ID is configured
    if (!canLoadLiveAds()) {
      resolve(false);
      return;
    }

    // Return if already loaded
    if (isScriptLoaded) {
      resolve(true);
      return;
    }

    // Check if script already exists in document
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (existingScript) {
      isScriptInjected = true;
      isScriptLoaded = true;
      resolve(true);
      return;
    }

    if (isScriptInjected) {
      resolve(true);
      return;
    }

    try {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        ADS_CONFIG.PUBLISHER_ID
      )}`;

      script.onload = () => {
        isScriptLoaded = true;
        resolve(true);
      };

      script.onerror = () => {
        // Silently handle blocker or network error without crashing app
        resolve(false);
      };

      document.head.appendChild(script);
      isScriptInjected = true;
    } catch {
      resolve(false);
    }
  });
}

/**
 * Safely push an ad unit request to the AdSense queue.
 * Only executes if live ads are permitted and window.adsbygoogle is available.
 */
export function pushAdUnit(): void {
  if (!canLoadLiveAds()) {
    return;
  }

  try {
    const win = window as unknown as { adsbygoogle?: Array<Record<string, unknown>> };
    win.adsbygoogle = win.adsbygoogle || [];
    win.adsbygoogle.push({});
  } catch {
    // Ad blockers or offline mode: Fail silently
  }
}

/**
 * Checks if AdSense script has been injected.
 */
export function isAdSenseScriptLoaded(): boolean {
  return isScriptLoaded || isScriptInjected;
}
