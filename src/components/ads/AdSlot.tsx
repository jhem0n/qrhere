import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG, canLoadLiveAds } from '../../config/ads.config';
import { AdSlotDefinition } from '../../types/ads.types';
import { loadAdSenseScript, pushAdUnit } from '../../services/ads/adScriptLoader';

export interface AdSlotProps {
  slot: AdSlotDefinition;
  className?: string;
  ariaLabel?: string;
  /**
   * Explicitly control whether to show the safe placeholder when ads are disabled.
   * Defaults to ADS_CONFIG.TEST_MODE (true by default in development).
   */
  showPlaceholder?: boolean;
}

/**
 * Reusable Centralized AdSlot Component for Google AdSense monetization.
 * 
 * Safety & Quality Standards:
 * - When ads are disabled (VITE_ADS_ENABLED=false), renders a safe, inert placeholder
 *   in development/test mode, or cleanly collapses to null when test mode is off.
 * - ZERO external network requests or script injections unless VITE_ADS_ENABLED=true
 *   and a valid client ID is configured.
 * - The application builds and runs normally without an AdSense client ID.
 * - Displays an explicit, policy-mandated "ADVERTISEMENT" label when active.
 * - Never positioned near tool action buttons, camera controls, or navigation links.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slot,
  className = '',
  ariaLabel,
  showPlaceholder,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isPushedRef = useRef(false);

  const isLive = canLoadLiveAds();
  const renderPlaceholder = showPlaceholder !== undefined ? showPlaceholder : ADS_CONFIG.TEST_MODE;

  useEffect(() => {
    // Only execute external AdSense loading if strictly permitted
    if (!isLive) {
      return;
    }

    if (!isPushedRef.current) {
      isPushedRef.current = true;
      loadAdSenseScript().then((success) => {
        if (success) {
          pushAdUnit();
        }
      });
    }
  }, [isLive, slot.id]);

  // When ads are disabled and placeholders are not requested, return null immediately
  if (!ADS_CONFIG.ADS_ENABLED) {
    if (!renderPlaceholder) {
      return null;
    }
  }

  // When live ads are active and verified
  if (isLive) {
    return (
      <aside
        ref={adRef}
        role="complementary"
        aria-label={ariaLabel || `Advertisement: ${slot.name}`}
        className={`my-6 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-2.5 text-center transition-all ${className}`}
        style={{ minHeight: `${slot.minHeightPx}px` }}
      >
        {/* Explicit AdSense Policy Label */}
        <span className="mb-1.5 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase select-none">
          Advertisement
        </span>

        {/* Google AdSense ins element */}
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minHeight: `${slot.minHeightPx}px`,
          }}
          data-ad-client={ADS_CONFIG.PUBLISHER_ID}
          data-ad-slot={slot.slotId || ''}
          data-ad-format={slot.format}
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Safe placeholder when ads are disabled / in development / test mode
  if (renderPlaceholder) {
    return (
      <aside
        ref={adRef}
        role="region"
        aria-label={ariaLabel || `Ad Placement Slot: ${slot.name}`}
        className={`my-6 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 p-4 text-center select-none transition-all ${className}`}
        style={{ minHeight: `${slot.minHeightPx}px` }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            AdSense Slot Reserved • Inactive
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {slot.name} ({slot.dimensions || slot.format})
        </p>
        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 max-w-md">
          {ADS_CONFIG.ADS_ENABLED
            ? 'Waiting for valid VITE_ADSENSE_CLIENT_ID to activate.'
            : 'AdSense disabled (VITE_ADS_ENABLED=false). No external scripts or tracking cookies loaded.'}
        </p>
      </aside>
    );
  }

  // When ads are disabled and test mode is off, collapse cleanly
  return null;
};
