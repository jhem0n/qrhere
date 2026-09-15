import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { OfflineIndicator } from '../common/OfflineIndicator';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Offline Status Indicator */}
      <OfflineIndicator />

      {/* Primary Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 w-full flex flex-col focus:outline-none" tabIndex={-1}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Primary Footer */}
      <Footer />
    </div>
  );
};
