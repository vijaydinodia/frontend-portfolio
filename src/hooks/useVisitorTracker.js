import { useEffect } from 'react';
import axios from 'axios';

/**
 * Lightweight visitor tracking hook.
 * Fires a single POST on first page load per session.
 * Uses sessionStorage to avoid duplicate tracking within the same tab session.
 */
const useVisitorTracker = () => {
  useEffect(() => {
    // Only track once per session
    if (sessionStorage.getItem('_vt')) return;

    const trackVisit = async () => {
      try {
        const payload = {
          path: window.location.pathname,
          referrer: document.referrer || '',
        };

        // Use sendBeacon for non-blocking fire-and-forget if available
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          const baseURL = axios.defaults.baseURL || '';
          navigator.sendBeacon(`${baseURL}/api/visitors/track`, blob);
        } else {
          // Fallback to fetch (non-blocking)
          axios.post('/api/visitors/track', payload).catch(() => {});
        }

        sessionStorage.setItem('_vt', '1');
      } catch {
        // Silently fail — tracking should never break the app
      }
    };

    trackVisit();
  }, []);
};

export default useVisitorTracker;
