import { ANALYTICS_CONFIG, AnalyticsEventName } from '../../config/analytics.config';

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

    // Defensive check against forbidden fields
    if (metadata) {
      const sanitized: Record<string, string | number | boolean> = {};
      for (const [key, value] of Object.entries(metadata)) {
        if (!ANALYTICS_CONFIG.FORBIDDEN_FIELDS.includes(key as any)) {
          sanitized[key] = value;
        }
      }
      // Future analytics forwarder would receive: eventName, sanitized
    }
  }
}

export const analytics = new PrivacySafeAnalyticsService();
