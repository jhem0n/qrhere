import React, { useEffect } from 'react';
import { loadGoogleAutoAdsScript } from '../../services/ads/adScriptLoader';

/**
 * GoogleAutoAds
 * 
 * Headless component that mounts once globally at application root.
 * Injects the Google AdSense Auto Ads global script if configured and authorized.
 * 
 * Guarantees:
 * - Loaded globally and strictly only once.
 * - Zero route duplication or re-injections across React Router navigation.
 * - Zero manual ad units or custom ad containers.
 * - Google automatically determines optimal, responsive placements.
 */
export const GoogleAutoAds: React.FC = () => {
  useEffect(() => {
    loadGoogleAutoAdsScript();
  }, []);

  return null;
};
