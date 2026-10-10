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
      question: 'Does a Wi-Fi QR code ever expire?',
      answer:
        'No, Wi-Fi QR codes never expire. Because they are static, the network details and password are stored right inside the pattern. The code will continue working forever unless you change your Wi-Fi name or password on your router.',
    },
    {
      question: 'Do guests need a special app to scan the Wi-Fi QR code?',
      answer:
        'No app is needed. Both iPhone (iOS 11 and later) and modern Android phones can scan the QR code directly using their built-in camera app. Scanning immediately pops up a notification asking if the user wants to join the network.',
    },
    {
      question: 'Can I make a QR code for a hidden Wi-Fi network?',
      answer:
        'Yes. In the QR Here Wi-Fi generator, simply check the "Hidden Network" box. The generated QR code will instruct scanning phones to look for your hidden network name.',
    },
    {
      question: 'Is it safe to share my Wi-Fi with a QR code?',
      answer:
        'Yes, especially if you share a dedicated Guest Network. Setting up a guest network keeps your personal computers, smart devices, and private files separated from visiting guests while still giving them fast internet access.',
    },
    {
      question: 'What happens if my Wi-Fi password contains spaces or symbols?',
      answer:
        'Our Wi-Fi QR code generator automatically formats and escapes all special characters (such as semicolons, colons, spaces, and backslashes) so every smartphone can read and connect without errors.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Create a WiFi QR Code (Step-by-Step Guide)',
          description:
            'Learn how to create a free Wi-Fi QR code in minutes. Connect guests and customers to your Wi-Fi with a quick scan—no apps or typing required.',
          canonicalPath: '/blog/how-to-create-wifi-qr-code',
          datePublished: '2026-09-24',
          dateModified: '2026-10-02',
          image: `${siteUrl}/images/howtocreatewifiqrcode.jpg`,
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
              Easy Guide
            </span>
            <span>
              <time dateTime="2026-10-02">Updated October 2, 2026</time>
            </span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Create a WiFi QR Code
          </h1>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/howtocreatewifiqrcode.jpg"
            alt="How to scan a Wi-Fi QR code to join an internet network"
            title="How to scan a Wi-Fi QR code to join an internet network"
            className="w-full h-auto object-cover"
            width={1200}
            height={629}
            loading="eager"
            decoding="async"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            A quick phone camera scan connects any phone to your Wi-Fi automatically.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed space-y-8">
          <p>
            Whenever friends come over or customers visit your café, one question always comes up:{' '}
            <em>&ldquo;What is the Wi-Fi password?&rdquo;</em>
          </p>
          <p>
            Spelling out a 16-character password with random capital letters, numbers, and symbols is frustrating
            for everyone. Someone always confuses an uppercase &ldquo;I&rdquo; with a lowercase &ldquo;l&rdquo;,
            or a zero with the letter &ldquo;O&rdquo;.
          </p>
          <p>
            A <strong>Wi-Fi QR code</strong> solves this completely. When someone points their phone camera at the code,
            a banner pops up on their screen saying <strong>&ldquo;Join Network&rdquo;</strong>. One tap, and they are online.
            No typing, no mistakes, and no extra apps needed.
          </p>

          {/* Quick CTA to Generator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  Want to make your Wi-Fi QR code right now?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  100% free, private, and works right in your browser.
                </p>
              </div>
              <Link
                to="/qr-code-generator-wifi"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm shrink-0"
              >
                <span>Open Wi-Fi Generator</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to Make a Wi-Fi QR Code in 3 Simple Steps
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  1. Find your Wi-Fi details
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Before creating the code, gather three basic pieces of information:
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                  <li>
                    <strong>Network Name (SSID):</strong> The exact name of your Wi-Fi as it appears on your phone or laptop.
                    Keep in mind that capitalization matters.
                  </li>
                  <li>
                    <strong>Password:</strong> Your current Wi-Fi security key.
                  </li>
                  <li>
                    <strong>Security Type:</strong> Almost all modern routers use <strong>WPA/WPA2</strong> or <strong>WPA3</strong>.
                    If you are not sure, leaving it on <em>WPA/WPA2</em> works for 99% of home and business networks.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  2. Enter details in the QR Code Generator
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Head over to our free{' '}
                  <Link
                    to="/qr-code-generator-wifi"
                    className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Wi-Fi QR Code Generator
                  </Link>
                  :
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                  <li>Type your Wi-Fi network name into the <strong>Network Name</strong> field.</li>
                  <li>Type your password into the <strong>Password</strong> field.</li>
                  <li>If your Wi-Fi network is hidden, toggle the <strong>Hidden Network</strong> option.</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-300 text-sm italic">
                  Note: QR Here generates your code 100% locally inside your browser tab. Your password is never sent
                  to any server or saved in any database.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  3. Download and test with your phone
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Once your code appears on screen:
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                  <li>
                    Open the built-in camera app on your smartphone and aim it at your computer screen.
                  </li>
                  <li>
                    Tap the <strong>&ldquo;Join Network&rdquo;</strong> prompt to confirm that it connects smoothly.
                  </li>
                  <li>
                    Download your QR code image as a crisp <strong>PNG</strong> or vector <strong>SVG</strong> for printing.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Tips for Best Results */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Smart Tips for Printing &amp; Sharing Your Code
            </h2>
            <p>
              To make sure your guests have zero trouble scanning, keep these helpful tips in mind:
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                  Use a Dedicated Guest Network
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base mt-1">
                  If you run an Airbnb, coffee shop, or office, create a separate &ldquo;Guest&rdquo; network on your router.
                  This keeps guests connected to the internet while keeping your personal computers, smart TVs, and files safely private.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                  Print at a Readable Size
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base mt-1">
                  Print your QR code at least <strong>1.5 inches by 1.5 inches (4 cm × 4 cm)</strong>.
                  If guests will be scanning it from across a table or counter, 2 to 3 inches is even better.
                  For detailed sizing guidelines, check our{' '}
                  <Link
                    to="/qr-code-size-and-print-guide"
                    className="text-blue-600 dark:text-blue-400 underline font-medium"
                  >
                    QR code print and size guide
                  </Link>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                  Add Helpful Text Below the Code
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base mt-1">
                  Always include a short note below the printed code, such as:
                  <br />
                  <span className="font-mono text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block mt-1">
                    &ldquo;Scan with your phone camera to connect to Wi-Fi&rdquo;
                  </span>
                  <br />
                  This helps first-time guests know exactly what to do.
                </p>
              </div>
            </div>
          </section>

          {/* Section: How Devices Scan */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How Guests Scan on iPhone &amp; Android
            </h2>
            <p>
              Guests do not need any special apps or third-party barcode readers:
            </p>
            <div className="space-y-3">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">On iPhone &amp; iPad:</p>
                <p className="text-slate-600 dark:text-slate-400 text-base mt-1">
                  Open the regular Camera app, point it at the QR code, and tap the yellow <strong>&ldquo;Join Network&rdquo;</strong> bubble that appears on screen.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">On Android (Samsung, Google Pixel, etc.):</p>
                <p className="text-slate-600 dark:text-slate-400 text-base mt-1">
                  Open the Camera app or Quick Settings scanner, point at the code, and tap <strong>&ldquo;Connect to Wi-Fi&rdquo;</strong>.
                </p>
              </div>
            </div>
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

          {/* Bottom Action Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Ready to create your Wi-Fi QR code?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2 mb-5">
              It takes less than 30 seconds. Enter your network name, download the code, and print it for your guests.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/qr-code-generator-wifi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition shadow-sm"
              >
                <span>Create Wi-Fi QR Code Now</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
              >
                <span>Test a QR Code</span>
              </Link>
            </div>
          </div>

          {/* Related Links Footer */}
          <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap gap-3 items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Helpful Guides:</span>
            <Link
              to="/qr-code-size-and-print-guide"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Print &amp; Sizing Guide
            </Link>
            <span>•</span>
            <Link
              to="/qr-code-security"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              QR Code Security
            </Link>
            <span>•</span>
            <Link
              to="/blog/how-to-scan-qr-code-without-app"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Scan Without an App
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
};

export default BlogPostWifiQrCode;
