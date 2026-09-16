import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, EyeOff, Globe, ArrowRight, CheckCircle2, QrCode } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { APP_CONFIG } from '../../config/app.config';
import { AdBanner } from '../../components/ads/AdBanner';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [{ name: 'About', path: '/about' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.about} breadcrumbs={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About {APP_CONFIG.name}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A private, high-performance web application designed to scan and create QR codes without
            compromising user privacy or requiring invasive account signups.
          </p>
        </header>

        <AdBanner position="top" />

        {/* Content Body */}
        <article className="space-y-10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Mission */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h2>
            <p>
              Most online QR tools track the links you generate, upload your personal photos to
              cloud servers for OCR analysis, or hide standard features behind subscription
              paywalls. {APP_CONFIG.name} was built with a different philosophy: powerful utility
              engineered entirely within the user's browser.
            </p>
          </section>

          {/* Core Architectural Principles */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1.5">
                  <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">100% In-Browser Execution</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  QR decoding algorithms and vector rendering run via modern WebAssembly and HTML5
                  Canvas directly on your CPU/GPU.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1.5">
                  <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero Data Harvesting</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  We do not log the text of your QR codes, the URLs you scan, or the images you
                  upload. There is no remote database storing your queries.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Malicious Link Filtering</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  We inspect scanned links before you open them, neutralizing dangerous protocols
                  like javascript: to guard against phishing and XSS exploits.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1.5">
                  <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Open Web Standards</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Compliant with ISO/IEC 18004 QR code specifications, modern Progressive Web App
                  (PWA) guidelines, and WCAG accessibility standards.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Implementation */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              How the Technology Works
            </h2>
            <p className="mb-2">
              When you grant temporary camera access, your device's video stream is piped directly to
              an in-memory HTML5 video buffer. A lightweight pixel-matrix scanner examines the
              feed in real time. Once the three finder patterns (corner squares) of a QR code are
              detected, Reed-Solomon error correction decodes the payload into readable text.
            </p>
            <p>
              Closing the camera or navigating away instantly calls <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">MediaStreamTrack.stop()</code> on every active video track to ensure hardware indicators turn off and your camera cannot be accessed in the background. Read our full data handling details in our{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium">
                Privacy Policy
              </Link>{' '}
              and review our{' '}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 underline font-medium">
                Terms of Service
              </Link>.
            </p>
          </section>

          {/* Quick CTA */}
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">
                Ready to scan or generate a QR code?
              </h3>
              <p className="text-xs text-blue-800/80 dark:text-blue-300 mt-1">
                Experience instant, private QR tools right in your browser.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/scan"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
              >
                <span>Open Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/create"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:text-blue-600 transition"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Create QR</span>
              </Link>
            </div>
          </div>
        </article>

        <AdBanner position="bottom" />
      </div>
    </>
  );
};
