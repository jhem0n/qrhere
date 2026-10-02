// Polyfill/guard window.fetch in environments where it is defined as getter-only
try {
  if (typeof window !== 'undefined') {
    const origFetch = window.fetch;
    let currentFetch = origFetch ? origFetch.bind(window) : null;
    try {
      Object.defineProperty(window, 'fetch', {
        get() {
          return currentFetch;
        },
        set(fn) {
          currentFetch = fn;
        },
        configurable: true,
        enumerable: true,
      });
    } catch (_) {
      try {
        Object.defineProperty(window, 'fetch', {
          value: origFetch,
          writable: true,
          configurable: true,
        });
      } catch (__) {}
    }
  }
} catch (_) {}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
