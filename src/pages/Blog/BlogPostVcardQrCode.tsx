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

export const BlogPostVcardQrCode: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'vCard QR Code for Digital Business Cards',
      path: '/blog/how-to-create-vcard-qr-code',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Do people need an app to scan my vCard QR code?',
      answer:
        'No. Both iPhones and Android phones recognize vCard QR codes directly through their standard camera app. When scanned, a contact card immediately appears with a button to save to their address book.',
    },
    {
      question: 'Can I add my logo and brand colors?',
      answer:
        'Yes. With QR Here, you can customize the code colors and upload your company logo into the center without paying for a subscription.',
    },
    {
      question: 'Can I change my phone number or email after printing?',
      answer:
        'Standard vCard QR codes are static and permanent. Your contact details are stored directly in the pattern of squares. If your phone number changes later, you will need to print a new code. Only include stable details.',
    },
    {
      question: 'What is the recommended print size for a vCard QR code?',
      answer:
        'Print your vCard QR code at least 1.2 × 1.2 inches (30 × 30 mm). Because contact cards contain more data than simple URLs, printing too small makes it harder for budget phone cameras to focus.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Create a vCard QR Code for Digital Business Cards',
          description:
            'Learn how to create a free vCard QR code in under two minutes. Let clients and contacts save your phone number, email, and website with a single tap.',
          canonicalPath: '/blog/how-to-create-vcard-qr-code',
          datePublished: '2026-09-18',
          dateModified: '2026-10-02',
          image: `${siteUrl}/images/howtocreatevcardqr.jpg`,
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
        seo={SEO_CONFIG.blogVcardBusinessCards}
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
              Step-by-Step Guide
            </span>
            <span>
              <time dateTime="2026-10-02">Updated October 2, 2026</time>
            </span>
            <span>•</span>
            <span>4 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Create a vCard QR Code for Digital Business Cards
          </h1>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/howtocreatevcardqr.jpg"
            alt="How to create a vCard QR code for digital business cards"
            title="How to Create a vCard QR Code for Digital Business Cards"
            className="w-full h-auto object-cover"
            width={1200}
            height={670}
            loading="eager"
            decoding="async"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            A single scan saves your contact card and phone number straight to smartphone address books.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed space-y-8">
          <p>
            Instead of forcing someone to manually type your 10-digit number, name, and email into their phone,
            they simply point their camera at your card and tap <strong>&ldquo;Add to Contacts&rdquo;</strong>.
            Everything fills in automatically.
          </p>

          {/* Quick CTA to vCard Generator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  Make your vCard QR code in 2 minutes
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  100% free, runs locally in your browser, and exports clean vector SVG for printing.
                </p>
              </div>
              <Link
                to="/qr-code-generator-vcard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm shrink-0"
              >
                <span>Open vCard Generator</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to Create Your vCard Code (Step by Step)
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  1. Open the QR Here vCard Generator
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Head over to the{' '}
                  <Link
                    to="/qr-code-generator-vcard"
                    className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    vCard QR Code Generator
                  </Link>
                  . It runs completely in your browser, so your private contact info is never saved on external servers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  2. Enter essential contact details
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Fill in only what people actually need:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li><strong>Full Name:</strong> First and last name.</li>
                  <li><strong>Company &amp; Title:</strong> Helps people remember where they met you.</li>
                  <li><strong>Phone Number:</strong> Include the country code (e.g., +1 for USA) for international clients.</li>
                  <li><strong>Email &amp; Website:</strong> Your primary business email and portfolio or LinkedIn link.</li>
                </ul>
                <p className="text-sm italic text-slate-500 dark:text-slate-400">
                  Pro Tip: Keep it concise. Packing 10 fields makes the QR pattern extremely dense and harder for budget cameras to focus on.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  3. Select Error Correction Level M or Q
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  We recommend <strong>Medium (Level M)</strong> or <strong>Quartile (Level Q)</strong>.
                  This ensures that even if your card gets slightly scuffed in someone’s pocket or wallet,
                  their phone can still scan it without issues.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  4. Download vector SVG for print
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Always choose <strong>Download SVG</strong> when sending your design to a print shop or adding it to
                  Canva / Photoshop. Vector SVGs remain sharp at any print size. For digital badges or email footers,
                  a high-resolution PNG works great.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Printing Guidelines */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              3 Golden Rules for Printing Business Cards
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">1. Minimum Size: 1.2 × 1.2 inches (30 × 30 mm)</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Never print a vCard code smaller than 1.2 inches. Because it holds more data than a simple link, shrinking it further makes the squares too tiny.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">2. High Contrast Only</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Always use dark ink on a light background. Avoid light gray or pastel colors on white cardstock.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">3. Leave Empty Space Around the Edges</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Keep a small buffer of blank space (the quiet zone) around the QR code so text and graphics don&apos;t crowd the barcode corners.
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
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                    {item.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Action CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Ready to create your vCard QR code?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2 mb-5">
              Generate a free, professional contact QR code in seconds. Export in vector SVG for flawless printing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/qr-code-generator-vcard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition shadow-sm"
              >
                <span>Create vCard Code</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to="/qr-code-size-and-print-guide"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
              >
                <span>Read Print Size Guide</span>
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
              Print &amp; Size Guide
            </Link>
            <span>•</span>
            <Link
              to="/blog/how-to-create-wifi-qr-code"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Wi-Fi QR Code Guide
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

export default BlogPostVcardQrCode;
