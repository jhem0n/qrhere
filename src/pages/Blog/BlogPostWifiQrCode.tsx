import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Sparkles,
  Wifi,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  SEO_CONFIG,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../../config/seo.config';
import { getSiteUrl } from '../../config/app.config';

export const BlogPostWifiQrCode: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'How to Create a WiFi QR Code',
      path: '/blog/how-to-create-wifi-qr-code',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Does the WiFi QR code expire?',
      answer:
        'No. It works for as long as the network name and password stay the same. Change your WiFi password, and you will need a new code.',
    },
    {
      question: 'Can I make one for a hidden network?',
      answer:
        'Yes. Just select the hidden network option when generating it so scanners know to look for it.',
    },
    {
      question: 'Will it work on older phones?',
      answer:
        'Most phones from recent years support it natively with their default camera app. Very old devices may need a separate QR scanner app to read the code, though they will still connect fine once scanned.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Create a WiFi QR Code (Free, No App)',
          description:
            'Stop reading your WiFi password out loud. Learn how to make a free WiFi QR code guests can scan to connect instantly — no app, no sign-up, no typing.',
          canonicalPath: '/blog/how-to-create-wifi-qr-code',
          datePublished: '2026-09-24',
          dateModified: '2026-09-24',
        },
        siteUrl
      ),
      generateBreadcrumbSchema(breadcrumbs, siteUrl),
      generateFAQSchema(faqData),
    ],
  };

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.blogWifiQrCode}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all guides</span>
          </Link>
        </div>

        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3 h-3" />
              WiFi Tutorial
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime="2026-09-24">September 24, 2026</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>2 min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Create a WiFi QR Code (Free, No App)
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            A 2-minute guide to letting guests connect to your WiFi with one scan — no spelled-out
            passwords, no downloads.
          </p>
        </header>

        <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-8">
          <p>
            If you have ever had to spell out &ldquo;capital S, lowercase y, dollar sign, seven, three&rdquo; to
            a guest trying to join your WiFi, you already know why WiFi QR codes exist. Print one, stick it
            on the wall, and people connect by pointing their camera at it. No app, no typos, no repeating
            the password for the third time.
          </p>

          <p>
            Here is exactly how to make one — for free, right in your browser.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What a WiFi QR code actually does
            </h2>
            <p className="mb-4">
              A WiFi QR code is not a link. It is a small text string encoded directly into the QR pattern,
              formatted like <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono text-sm">WIFI:T:WPA;S:NetworkName;P:Password;;</code>.
              When a phone camera reads that format, it recognizes it instantly and offers a &ldquo;Join Network&rdquo;
              button — the password is typed in automatically, behind the scenes.
            </p>
            <p>
              This works natively on iPhones (iOS 11 and later) and nearly all modern Android phones. No
              extra app needed on either end.
            </p>
          </section>

          {/* Action Callout Box */}
          <div className="rounded-2xl border-l-4 border-blue-600 border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-7">
            <p className="text-slate-900 dark:text-white font-semibold text-lg mb-2">
              Skip the manual steps.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
              QR Here&apos;s generator builds a properly formatted WiFi QR code in seconds — entirely
              in your browser, nothing uploaded to a server.
            </p>
            <Link
              to="/qr-code-generator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm"
            >
              <Wifi className="w-4 h-4" />
              <span>Create Your WiFi QR Code</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              How to create a WiFi QR code
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Open the QR generator</strong> and select the WiFi option.
              </li>
              <li>
                <strong>Enter your network name (SSID)</strong> exactly as it appears on your router —
                it is case-sensitive.
              </li>
              <li>
                <strong>Add your password</strong> and choose the correct security type: WPA/WPA2 (most common),
                WPA3, or WEP for older routers. If your network has no password, select &ldquo;no encryption.&rdquo;
              </li>
              <li>
                <strong>Check &ldquo;hidden network&rdquo;</strong> only if your SSID does not broadcast publicly.
              </li>
              <li>
                <strong>Customize it (optional).</strong> Add your logo, adjust colors, or apply a frame so
                it fits your space.
              </li>
              <li>
                <strong>Download</strong> as SVG for sharp printing at any size, or PNG for digital use.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Where WiFi QR codes are genuinely useful
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Airbnbs and guest rooms</strong> — leave it on a card by the bed instead of a sticky note.
              </li>
              <li>
                <strong>Cafes and restaurants</strong> — print it on the table or receipt.
              </li>
              <li>
                <strong>Offices</strong> — a laminated card at reception saves IT from repeating the guest password all day.
              </li>
              <li>
                <strong>Home</strong> — frame it near the router so family and friends stop asking.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Before you print it
            </h2>
            <p>
              Test the code with two or three different phones first — do not assume it works just because
              it looks right. Keep a quiet white border around the code (no text or logos crowding the edges),
              and if you are adding a center logo, make sure your generator applies high error correction, or
              the code may fail to scan once printed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Is it safe to share your WiFi password this way?
            </h2>
            <p>
              Yes, as long as the QR code was generated locally in your browser rather than sent to someone
              else&apos;s server. QR Here never uploads or stores what you type — the code is built entirely
              on your device, so your password never leaves your screen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Quick answers
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5">
                <p className="font-bold text-slate-900 dark:text-white mb-2">
                  Does the WiFi QR code expire?
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  No. It works for as long as the network name and password stay the same. Change your
                  WiFi password, and you will need a new code.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5">
                <p className="font-bold text-slate-900 dark:text-white mb-2">
                  Can I make one for a hidden network?
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Yes — just tick the hidden network option when generating it so scanners know to look for it.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5">
                <p className="font-bold text-slate-900 dark:text-white mb-2">
                  Will it work on older phones?
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Most phones from the last several years support it natively. Older devices can also use our free{' '}
                  <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    QR code scanner
                  </Link>{' '}
                  directly in their web browser without installing any software.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Action CTA */}
          <div className="rounded-2xl border-l-4 border-blue-600 border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-7">
            <p className="text-slate-900 dark:text-white font-semibold text-lg mb-2">
              Ready to make yours?
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
              It takes under a minute and nothing leaves your browser.
            </p>
            <Link
              to="/qr-code-generator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm"
            >
              <Wifi className="w-4 h-4" />
              <span>Generate a WiFi QR Code</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap gap-2 items-center">
            <span>Related:</span>
            <Link
              to="/blog/static-vs-dynamic-qr-code"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Static vs Dynamic QR Codes
            </Link>
            <span>·</span>
            <Link
              to="/blog/how-to-scan-qr-code-without-app"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              How to Scan a QR Code Without an App
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
};
export default BlogPostWifiQrCode;
