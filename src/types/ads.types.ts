/**
 * Type definitions for Centralized Google AdSense Monetization Architecture
 */

export type AdPosition = 'top' | 'inline' | 'bottom' | 'sidebar';

export type AdFormat = 'auto' | 'horizontal' | 'rectangle' | 'vertical';

export interface AdSlotDefinition {
  /** Unique DOM and configuration ID */
  id: string;
  /** Human-readable name for reporting and accessibility */
  name: string;
  /** Placement location category */
  position: AdPosition;
  /** Ad format type recognized by Google AdSense */
  format: AdFormat;
  /** Google AdSense ad unit slot ID (e.g. 1234567890) */
  slotId?: string;
  /** Architectural placement description */
  description: string;
  /** Minimum height in pixels to avoid Cumulative Layout Shift (CLS) */
  minHeightPx: number;
  /** Standard responsive dimensions for this slot */
  dimensions?: string;
}

export interface AdConfig {
  /** Master toggle: When false, zero scripts are loaded and all slots collapse to 0 */
  ADS_ENABLED: boolean;
  /** Google AdSense Publisher ID (e.g. ca-pub-XXXXXXXXXXXXXXXX) */
  PUBLISHER_ID: string;
  /** Test mode toggle for previewing bounding boxes in dev without calling live AdSense */
  TEST_MODE: boolean;
  /** Registry of predefined ad slot placements */
  SLOTS: {
    TOP_CONTENT: AdSlotDefinition;
    INLINE_CONTENT: AdSlotDefinition;
    BOTTOM_PAGE: AdSlotDefinition;
    SIDEBAR_DESKTOP: AdSlotDefinition;
  };
}
