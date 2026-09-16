/**
 * Type definitions for Google AdSense Auto Ads Configuration
 */

export interface AdSenseAutoAdsConfig {
  /** Master toggle: When false, zero scripts are loaded */
  ADS_ENABLED: boolean;
  /** Google AdSense Publisher Client ID (e.g. ca-pub-XXXXXXXXXXXXXXXX or pub-XXXXXXXXXXXXXXXX) */
  PUBLISHER_ID: string;
  /** Test mode toggle: Set to false for live AdSense script loading */
  TEST_MODE: boolean;
}
