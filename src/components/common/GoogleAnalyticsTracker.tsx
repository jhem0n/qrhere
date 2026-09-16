import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const GA_MEASUREMENT_ID = 'G-LJDCL6XYYB';

/**
 * Tracks route changes in Single Page Application (SPA) navigation
 * and sends page_view events to Google Analytics.
 */
export const GoogleAnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};
