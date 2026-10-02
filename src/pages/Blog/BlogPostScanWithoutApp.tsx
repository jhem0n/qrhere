import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  SEO_CONFIG,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../../config/seo.config';
import { getSiteUrl } from '../../config/app.config';

export const BlogPostScanWithoutApp: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'How to Scan a QR Code Without an App',
      path: '/blog/how-to-scan-qr-code-without-app',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Do I need an app to scan a QR code?',
      answer:
        'No. You can scan QR codes using your standard iPhone or Android camera app, or directly inside your web browser using QR Here. You never need to download a separate scanner app.',
    },
    {
      question: 'Can I scan a QR code from a photo or screenshot?',
      answer:
        'Yes. With the QR Here web scanner, simply select the "Upload Image" tab and choose your screenshot or photo. It decodes the code instantly right inside your browser.',
    },
    {
      question: 'How do I scan a QR code on a computer?',
      answer:
        'Open the QR Here homepage on your laptop or desktop. You can either use your webcam to scan a physical code or upload an image file of the code to decode it immediately.',
    },
    {
      question: 'Is it safe to use app store QR scanner apps?',
      answer:
        'Most free QR scanner apps on app stores are filled with invasive tracking, battery-draining video ads, and subscription traps. Using your built-in camera or a private browser scanner like QR Here is much safer.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Scan a QR Code Without Installing an App',
          description:
            'A practical guide to scanning QR codes on iPhone, Android, or desktop computers using your built-in camera or a private in-browser scanner.',
          canonicalPath: '/blog/how-to-scan-qr-code-without-app',
          datePublished: '2026-09-20',
          dateModified: '2026-10-02',
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
        seo={SEO_CONFIG.blogScanWithoutApp}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to all guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full">
              Quick Guide
            </span>
            <span>
              <time dateTime="2026-10-02">Updated October 2, 2026</time>
            </span>
            <span>•</span>
            <span>4 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Scan a QR Code Without Installing an App
          </h1>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/how-to-scan-qr-code-without-app.svg"
            alt="Infographic showing how to scan QR codes on iPhone, Android, and web browsers without installing extra apps"
            className="w-full h-auto object-cover"
            width="1200"
            height="630"
            loading="eager"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            Scan QR codes instantly using your web browser, native camera, or screenshots.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed space-y-8">
          {/* Method 1: QR Here Scanner (First Example) */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              1. Scan in Your Browser with QR Here (Phone, PC &amp; Mac)
            </h2>
            <p>
              The easiest and most versatile way to scan a QR code is directly in your web browser with our free{' '}
              <Link
                to="/"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR Here Scanner
              </Link>
              . It runs 100% on your device with no app store downloads and zero data uploaded to servers.
            </p>

            <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                Two Quick Ways to Scan on QR Here:
              </h3>

              <div className="space-y-2">
                <p className="font-semibold text-slate-900 dark:text-white">Option A: Live Camera or Webcam</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  <li>
                    Open{' '}
                    <Link to="/" className="text-blue-600 dark:text-blue-400 font-medium underline">
                      QR Here
                    </Link>{' '}
                    in Chrome, Safari, Edge, or Firefox.
                  </li>
                  <li>Click <strong>Start Camera</strong> and allow camera access.</li>
                  <li>Hold the code in front of your camera. Your link appears instantly.</li>
                </ol>
              </div>

              <div className="space-y-2 pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                <p className="font-semibold text-slate-900 dark:text-white">Option B: From an Image or Screenshot</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  <li>Take a screenshot or photo of the QR code.</li>
                  <li>
                    On{' '}
                    <Link to="/" className="text-blue-600 dark:text-blue-400 font-medium underline">
                      QR Here
                    </Link>
                    , switch to the <strong>Upload Image</strong> tab.
                  </li>
                  <li>Drag and drop the file or tap to select it. The code is decoded in milliseconds.</li>
                </ol>
              </div>

              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm"
                >
                  <span>Launch QR Here Scanner</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Method 2: iPhone & iPad Camera */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              2. Use the Built-In Camera on iPhone or iPad
            </h2>
            <p>
              If you have an iPhone or iPad, Apple has built-in QR scanning right inside the standard camera:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open the default <strong>Camera</strong> app.</li>
              <li>Point your phone steadily at the QR code (no need to press the shutter button).</li>
              <li>A yellow link banner will appear below the code. Tap it to visit the page.</li>
            </ol>
            <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Quick Tip:</strong> If your iPhone does not detect the code, open <strong>Settings &gt; Camera</strong> and verify that <strong>Scan QR Codes</strong> is turned on.
            </p>
          </section>

          {/* Method 3: Android Camera */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              3. Use the Built-In Camera on Android
            </h2>
            <p>
              Almost every modern Android phone (Samsung, Google Pixel, Motorola, Xiaomi) scans QR codes out of the box:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open your phone&apos;s default <strong>Camera</strong> app.</li>
              <li>Hold it steady facing the QR code.</li>
              <li>Tap the pop-up link bubble to open it.</li>
            </ol>
            <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Alternative:</strong> If your camera app does not react, swipe down from the top of your screen to open Quick Settings and tap the <strong>Scan QR code</strong> tile, or tap the Google Lens icon in your search bar.
            </p>
          </section>

          {/* Why Avoid App Store Scanners */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why You Should Avoid Third-Party App Store Scanners
            </h2>
            <p>
              When you search &ldquo;QR scanner&rdquo; in the App Store or Google Play, you will see hundreds of utility apps. Here is why you should skip them:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Annoying Video Ads:</strong> Most free scanner apps force you to watch unskippable 30-second ads before showing your link.
              </li>
              <li>
                <strong>Subscription Traps:</strong> Many apps trick users into weekly or monthly subscriptions for a feature your phone already does for free.
              </li>
              <li>
                <strong>Data Tracking:</strong> Third-party scanner apps often log your location, device ID, and every URL you scan to sell to advertisers.
              </li>
            </ul>
            <p>
              Your built-in phone camera or an in-browser scanner like{' '}
              <Link to="/" className="text-blue-600 dark:text-blue-400 underline font-medium">
                QR Here
              </Link>{' '}
              gives you a faster, safer, and 100% ad-free experience.
            </p>
          </section>

          {/* Troubleshooting Section */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Quick Fixes If a QR Code Won&apos;t Scan
            </h2>
            <p>
              If your phone camera is having trouble reading a code:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Back up a little:</strong> Hold your phone 8 to 12 inches away. Holding the lens too close prevents autofocus from locking on.
              </li>
              <li>
                <strong>Avoid glare:</strong> Tilt your camera slightly if the code is behind shiny glass, plastic lamination, or a computer monitor.
              </li>
              <li>
                <strong>Wipe your camera lens:</strong> Pocket lint and fingerprints are the most common reason cameras fail to recognize barcodes.
              </li>
              <li>
                <strong>Turn up the brightness:</strong> If you are scanning from someone else&apos;s phone screen, ask them to increase their screen brightness.
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 pt-2">
              {faqData.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                    {item.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Action CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Scan a QR Code Right Now
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2 mb-5">
              Launch our clean, free web scanner. Works instantly with your camera or image uploads.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition shadow-sm"
              >
                <span>Open QR Scanner</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to="/qr-code-generator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
              >
                <span>Create a QR Code</span>
              </Link>
            </div>
          </div>

          {/* Related Links Footer */}
          <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap gap-3 items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Related Guides:</span>
            <Link
              to="/qr-code-security"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              QR Code Security
            </Link>
            <span>•</span>
            <Link
              to="/blog/how-to-create-wifi-qr-code"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create a Wi-Fi QR Code
            </Link>
            <span>•</span>
            <Link
              to="/blog/static-vs-dynamic-qr-code"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Static vs Dynamic QR Codes
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
};

export default BlogPostScanWithoutApp;
