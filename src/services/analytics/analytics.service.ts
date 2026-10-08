import { ANALYTICS_CONFIG, AnalyticsEventName } from '../../config/analytics.config';
import { track as vercelTrack } from '@vercel/analytics';

/**
 * Privacy-Preserving Analytics Service
 * 
 * NEVER sends QR content, decoded text, URLs, file data, or personal details.
 * Completely no-op when ANALYTICS_CONFIG.ANALYTICS_ENABLED is false.
 */
class PrivacySafeAnalyticsService {
  private enabled: boolean = ANALYTICS_CONFIG.ANALYTICS_ENABLED;

  public track(eventName: AnalyticsEventName, metadata?: Record<string, string | number | boolean>): void {
    if (!this.enabled) {
      return;
    }

    try {
      // Defensive check against forbidden fields
      const sanitized: Record<string, string | number | boolean> = {};
      if (metadata) {
        for (const [key, value] of Object.entries(metadata)) {
          if (!ANALYTICS_CONFIG.FORBIDDEN_FIELDS.includes(key as any)) {
            sanitized[key] = value;
          }
        }
      }
      vercelTrack(eventName, Object.keys(sanitized).length > 0 ? sanitized : undefined);
    } catch {
      // Ignore analytics failures silently
    }
  }
}

export const analytics = new PrivacySafeAnalyticsService();
