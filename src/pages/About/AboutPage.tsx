import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { APP_CONFIG } from '../../config/app.config';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [{ name: 'About', path: '/about' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.about} breadcrumbs={breadcrumbs} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About {APP_CONFIG.name}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            A fast, privacy-first QR code scanner and generator that runs directly in your web browser —
            with zero cloud uploads, no account registration, and no software to install.
          </p>
        </header>

        {/* Content Body - Clean, elegant editorial layout without unnecessary boxes */}
        <article className="space-y-12 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
          {/* Section: Why We Built QR Here */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why We Built {APP_CONFIG.name}
            </h2>
            <p>
              QR codes are everywhere today — on restaurant menus, event passes, Wi-Fi stickers, packaging labels,
              digital invoices, and business cards. Yet most online QR tools and scanner utilities come with major
              compromises: they force users to download native apps, bombard them with intrusive ads, or upload
              their photos to remote cloud servers to perform the scan.
            </p>
            <p>
              While uploading an image of a public concert poster might seem harmless, scanning a QR code containing
              your home Wi-Fi network password, a confidential document, a payment request, or a personal vCard
              introducing private contact details should never involve third-party servers.
            </p>
            <p className="border-l-4 border-blue-600 pl-4 py-1 text-slate-800 dark:text-slate-200 font-medium">
              We built {APP_CONFIG.name} around a single uncompromised rule: your scans should never leave your device.
            </p>
          </section>

          {/* Section: How 100% Client-Side Scanning Works */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              100% In-Browser Processing
            </h2>
            <p>
              Modern web browsers possess powerful graphics and computing capabilities. Through HTML5 Canvas, Web Streams,
              and client-side image processing algorithms, QR codes can be recognized and decoded locally on your device's
              processor in milliseconds. There is zero technical reason to transmit your data over the internet.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Camera Scanning:</strong> Video frames from your smartphone or desktop webcam are processed in real
                  time inside temporary browser memory. Your camera feed is never recorded or streamed to a server, and stopping
                  the scanner immediately releases hardware camera access.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Image & Screenshot Uploads:</strong> When you select or drag-and-drop a photo, screenshot, or digital
                  document (PNG, JPG, WEBP), it is decoded strictly within your browser tab. No database storage, no cloud
                  caching, and nothing saved remotely.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Data Retention:</strong> When you close the browser tab or refresh the page, all scanned content
                  and temporary buffers are permanently erased from memory.
                </span>
              </li>
            </ul>
          </section>

          {/* Section: Safety & Quishing Protection */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Safety by Design: Inspect Before You Open
            </h2>
            <p>
              A QR code is essentially an unreadable envelope — you cannot know what destination it holds until it has been
              decoded. Cybercriminals exploit this through "quishing" (QR phishing), placing fraudulent QR stickers over legitimate
              ones on parking meters, transit boards, and retail counters to lure users to phishing sites.
            </p>
            <p>
              Standard mobile camera scanners often redirect you immediately or abbreviate the link. {APP_CONFIG.name} takes a
              safety-first approach: we always display the full decoded content first. You can inspect the verified domain, check
              for deceptive link structures, and review the exact payload before deciding whether to open it in a new tab.
            </p>
            <p>
              To learn more about identifying suspicious codes and avoiding fraudulent QR stickers, explore our comprehensive{' '}
              <Link
                to="/qr-code-security"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR code security guide
              </Link>
              .
            </p>
          </section>

          {/* Section: What You Can Do */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Complete Scanning and Generation Suite
            </h2>
            <p>
              {APP_CONFIG.name} provides an all-in-one utility for both consuming and producing standard QR codes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-1 text-sm">
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">Web Links & URLs</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Inspect and open website addresses, articles, and landing pages with safety checks.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">Wi-Fi Networks</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Decode network names (SSID) and passwords clearly to connect without manual typing.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">Contact Cards (vCard)</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Extract contact names, phone numbers, and email addresses with one-click copying.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">Custom QR Generator</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Create clean QR codes for Wi-Fi, WhatsApp, URLs, and events with vector SVG and high-res PNG export.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Built for the Open Web */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Built for the Open Web
            </h2>
            <p>
              We believe essential web utilities should be lightweight, instant, and accessible to everyone. {APP_CONFIG.name} is
              fully responsive across mobile phones, tablets, laptops, and desktop computers. It complies with standard ISO/IEC 18004
              QR specifications and operates as a Progressive Web App (PWA) with fast offline readiness.
            </p>
            <p>
              There are no subscription paywalls, no tracking cookies on your scan results, and no requirements to create an account.
            </p>
          </section>

          {/* Section: Questions or Feedback */}
          <section className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Questions or Feedback?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We continuously improve our decoding accuracy and generator capabilities. If you have questions, encounter an
              unusual QR code, or want to suggest a feature, please reach out via our{' '}
              <Link to="/contact" className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">
                Contact page
              </Link>
              . For details on how we safeguard user privacy, review our{' '}
              <Link to="/privacy" className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms" className="font-medium text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">
                Terms of Service
              </Link>
              .
            </p>

            {/* Simple, unboxed action navigation */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-sm font-semibold">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4"
              >
                <span>Launch QR Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link
                to="/qr-code-generator"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4"
              >
                <span>Create a QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};
