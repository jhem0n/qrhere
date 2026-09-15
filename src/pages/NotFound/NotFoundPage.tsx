import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Home, Camera, PlusCircle } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';

export const NotFoundPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Page Not Found', path: '/404' }];

  return (
    <>
      <SEOHead
        noIndex={true}
        seo={SEO_CONFIG.notFound}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-md mb-6 text-left">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 mb-6 shadow-sm">
          <QrCode className="h-10 w-10 opacity-60" />
        </div>

        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
          404 Error
        </span>

        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/scan"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition min-h-[44px]"
          >
            <Camera className="w-4 h-4" />
            <span>Scan QR Code</span>
          </Link>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create QR Code</span>
          </Link>
        </div>
      </div>
    </>
  );
};
