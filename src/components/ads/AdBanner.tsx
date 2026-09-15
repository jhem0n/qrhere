import React from 'react';
import { ADS_CONFIG, getSlotForPosition } from '../../config/ads.config';
import { AdPosition } from '../../types/ads.types';
import { AdSlot } from './AdSlot';

interface AdBannerProps {
  position: AdPosition;
  className?: string;
  ariaLabel?: string;
}

/**
 * High-Level AdBanner Component
 * 
 * Maps placement positions ('top' | 'inline' | 'bottom' | 'sidebar') to centralized slot definitions.
 * Returns null immediately when ADS_ENABLED is false to eliminate unnecessary DOM elements and whitespace.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ position, className, ariaLabel }) => {
  // If ads are disabled globally, collapse immediately with zero footprint
  if (!ADS_CONFIG.ADS_ENABLED) {
    return null;
  }

  const slot = getSlotForPosition(position);

  return (
    <div
      className={`w-full flex justify-center ${
        position === 'sidebar' ? 'my-0' : 'my-4'
      }`}
    >
      <AdSlot slot={slot} className={className} ariaLabel={ariaLabel} />
    </div>
  );
};
