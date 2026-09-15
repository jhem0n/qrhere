import React from 'react';
import { ADS_CONFIG } from '../../config/ads.config';
import { AdBanner } from './AdBanner';

interface AdSidebarProps {
  children: React.ReactNode;
  className?: string;
  sidebarAriaLabel?: string;
}

/**
 * Responsive Desktop Sidebar Layout for Informational Content
 * 
 * Safety & Quality:
 * - When ADS_CONFIG.ADS_ENABLED is FALSE:
 *   Renders children directly without splitting into grid columns or leaving any empty whitespace.
 * - When ADS_CONFIG.ADS_ENABLED is TRUE:
 *   Renders a balanced 2-column layout on wide screens (lg+):
 *   8 columns for main educational content and 4 columns for the desktop sidebar ad banner.
 */
export const AdSidebar: React.FC<AdSidebarProps> = ({
  children,
  className = '',
  sidebarAriaLabel = 'Sidebar Sponsorship',
}) => {
  // If ads are disabled, render pure content with ZERO grid split or margin gap
  if (!ADS_CONFIG.ADS_ENABLED) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${className}`}>
      {/* Primary Informational Content Area */}
      <div className="lg:col-span-8 w-full">{children}</div>

      {/* Desktop Sidebar Ad Placement (Hidden on mobile/tablet to avoid screen clutter) */}
      <aside
        role="complementary"
        aria-label={sidebarAriaLabel}
        className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4"
      >
        <AdBanner position="sidebar" />
      </aside>
    </div>
  );
};
