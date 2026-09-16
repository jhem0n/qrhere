import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, EyeOff, ServerOff, Database } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { APP_CONFIG } from '../../config/app.config';

export const PrivacyPage: React.FC = () => {
  const lastUpdated = 'September 15, 2026';
  const breadcrumbs = [{ name: 'Privacy Policy', path: '/privacy' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.privacy} breadcrumbs={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40 mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy-First Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Last Updated: {lastUpdated} • Effective Date: {lastUpdated}
          </p>
        </header>

        {/* Quick Highlights Summary */}
        <div className="mb-10 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-200 mb-3">
            At a Glance: Our Privacy Commitments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <ServerOff className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero server uploads for camera feeds or photos</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>QR code content is never tracked or logged</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No permanent databases or cookies for tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% in-browser JavaScript execution</span>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Introduction</h2>
            <p>
              Welcome to {APP_CONFIG.name} ("we", "our", or "the Service"), operated by{' '}
              {APP_CONFIG.name}. We believe that everyday utility tools should respect user privacy by design. This
              Privacy Policy explains how our website operates, what data is processed, and our
              strict zero-knowledge architecture.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Client-Side QR Processing (Camera & Image Uploads)
            </h2>
            <p>
              When you use QR Here, your device processes data entirely locally:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>
                <strong>Camera Scanning:</strong> Video frames from your camera are piped into an
                HTML5 video element and decoded in browser memory via JavaScript. Video streams are
                never recorded, transmitted over the internet, or sent to cloud servers.
              </li>
              <li>
                <strong>Image File Scanning:</strong> When you select or drop an image file (PNG, JPG,
                WEBP), the image is loaded into your browser's local memory using an ephemeral
                Blob URL. The file is analyzed on your computer or phone and is never uploaded.
              </li>
              <li>
                <strong>Decoded Text & URLs:</strong> The text or URL contained within your QR code
                is shown on your screen only. We do not transmit, log, or index this content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Client-Side QR Code Generation
            </h2>
            <p>
              When you create a QR code on our website:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>
                The text, URL, Wi-Fi password, or contact information you input is converted into a
                matrix barcode directly in your browser using an in-memory vector/canvas renderer.
              </li>
              <li>
                Your inputs are not submitted to any backend server. Downloads (PNG or SVG) are
                constructed locally using browser data URIs and Blob objects.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Data Storage & Local Storage
            </h2>
            <p>
              We do not use permanent database storage or tracking cookies. The only client-side
              storage we use is:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>
                <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">theme_preference</code>:
                A single key in your browser's <code className="font-mono text-xs">localStorage</code> to remember whether you prefer Light or Dark mode.
              </li>
            </ul>
            <p>
              You can clear this at any time through your browser settings without affecting the
              functionality of the QR scanner or generator.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Third-Party Services, Advertising & Analytics
            </h2>
            <p>
              <strong>Google AdSense:</strong> The application is designed to support future
              non-intrusive banner advertising. When advertising is enabled, Google AdSense may use
              cookies or web beacons to serve advertisements based on your prior visits to this or
              other websites. You can opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Google Ad Settings
              </a>
              .
            </p>
            <p>
              <strong>No QR Content in Analytics:</strong> Even if analytics or advertising are
              present, we guarantee that decoded QR text, URLs, file names, Wi-Fi passwords, and
              camera frames are strictly excluded from all telemetry and advertising payloads.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. External Links Disclaimer
            </h2>
            <p>
              When you scan a QR code pointing to an external website, our tool provides a safe
              button to open that destination in a new browser tab. We are not responsible for the
              content, privacy policies, or practices of any third-party websites you choose to
              visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              7. Terms of Service
            </h2>
            <p>
              For additional details regarding acceptable use, intellectual property, and service guidelines, please review our{' '}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4">
                Terms of Service
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              8. Contact Information
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please visit our{' '}
              <Link to="/contact" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4">
                Contact Page
              </Link>{' '}
              or email{' '}
              <a
                href={`mailto:${APP_CONFIG.contactEmail}`}
                className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4"
              >
                {APP_CONFIG.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
