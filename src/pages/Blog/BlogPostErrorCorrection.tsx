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

export const BlogPostErrorCorrection: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'QR Code Error Correction Explained',
      path: '/blog/qr-code-error-correction-explained',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Which error correction level should I use for general printing?',
      answer:
        'Level M (15%) is the best default for flyers, restaurant menus, product packaging, and business cards without a logo. It protects against smudges and scratches while keeping the squares large and easy to scan.',
    },
    {
      question: 'Why do I have to use Level H when adding a logo?',
      answer:
        'A logo placed in the center physically covers up data squares. Level H has 30% built-in backup data, which allows the scanner to mathematically restore the covered information.',
    },
    {
      question: 'Does higher error correction make the QR code harder to scan?',
      answer:
        'It can if printed too small. Higher levels (like Level H) pack more black and white dots into the code. If printed on a tiny sticker, low-cost smartphone cameras may struggle to distinguish the tiny dots.',
    },
    {
      question: 'Can error correction fix a torn or missing corner square?',
      answer:
        'No. The three large squares in the corners (the "eyes") tell the camera the orientation and boundaries of the code. If any corner square is cut off or damaged, the scanner cannot read the code at all.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'QR Code Error Correction Levels Explained: Levels L, M, Q, H & When to Use Which',
          description:
            'A clear, human-friendly guide to QR code error correction. Learn what Levels L, M, Q, and H mean, why logos need Level H, and how to choose the right level.',
          canonicalPath: '/blog/qr-code-error-correction-explained',
          datePublished: '2026-10-02',
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
        seo={SEO_CONFIG.blogErrorCorrection}
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
              Design Guide
            </span>
            <span>
              <time dateTime="2026-10-02">Updated October 2, 2026</time>
            </span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            QR Code Error Correction Levels Explained: When to Use Which
          </h1>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/qr-code-error-correction.svg"
            alt="Infographic showing how QR code error correction recovers damaged, dirty, or logo-covered codes"
            className="w-full h-auto object-cover"
            width="1200"
            height="630"
            loading="eager"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            Error correction adds backup data to keep QR codes readable through dirt, scratches, or center logos.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed space-y-8">
          <p>
            Unlike regular barcodes on grocery items, QR codes contain built-in mathematical backup data.
            If a portion of the code is obscured or damaged, your phone’s camera can recalculate the missing pieces
            and still open the link instantly.
          </p>

          {/* Quick CTA to Generator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  Test Error Correction Levels Live
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Toggle between L, M, Q, and H on QR Here and see the pattern adjust in real time.
                </p>
              </div>
              <Link
                to="/qr-code-generator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm shrink-0"
              >
                <span>Try QR Generator</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* The 4 Levels Explained Simply */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              The 4 Error Correction Levels in Plain English
            </h2>
            <p>
              Every QR code generator offers four standard levels. Each level increases the amount of backup data:
            </p>

            <div className="space-y-4 pt-1">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Level L (Low – ~7% Recovery)</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Cleanest Grid</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
                  Has the fewest squares and lowest density. Best for screen displays, TV slides, mobile wallet passes, or digital tickets where the image will never get scratched or dirty.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Level M (Medium – ~15% Recovery)</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Recommended Default</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
                  The universal industry standard. Perfect balance of durability and readability for restaurant menus, business cards, flyers, and retail packaging (without a center logo).
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Level Q (Quartile – ~25% Recovery)</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">High Durability</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
                  Great for industrial environments, warehouse shipping labels, or curved surfaces like drink cans and bottles where reflection and curvature can distort the code.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Level H (High – ~30% Recovery)</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">Mandatory for Logos</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
                  The highest level possible. <strong>Required whenever you put a logo in the center</strong> or print outdoor stickers exposed to rain, weather, and scratches.
                </p>
              </div>
            </div>
          </section>

          {/* Why Higher Isn't Always Better */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why Level H Isn&apos;t Always the Best Choice
            </h2>
            <p>
              It might seem tempting to choose Level H for every QR code just to be safe. But there is a trade-off:
            </p>
            <p className="border-l-4 border-amber-500 pl-4 py-1 text-slate-800 dark:text-slate-200 font-medium">
              More backup data means more black-and-white squares packed into the same physical space.
            </p>
            <p>
              If you print a dense Level H code on a small product sticker, the squares become tiny dots.
              Budget smartphone cameras or cameras held from a distance will struggle to focus on them.
            </p>
            <p>
              <strong>The Golden Rule:</strong> If you are not adding a logo, stick to <strong>Level M</strong>.
              It keeps the squares large, crisp, and effortless to scan.
            </p>
          </section>

          {/* The Logo Rule */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              The 20% Logo Rule
            </h2>
            <p>
              When you put a company logo or icon in the center of a QR code, you are intentionally covering up
              data squares. Because Level H can recover up to 30% of missing information, the code still scans.
            </p>
            <p>
              However, <strong>never let your logo cover more than 20% of the total QR code area</strong>.
              If your logo covers 28%, you have exhausted all backup data. A single scratch or shadow will make
              the entire code stop working. Always keep the logo modest and leave plenty of visible squares around it.
            </p>
          </section>

          {/* Quick Decision Guide */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Quick Decision Checklist
            </h2>
            <div className="space-y-2">
              <p><strong>Adding a logo to the center?</strong> &rarr; Choose <strong>Level H (30%)</strong>.</p>
              <p><strong>Outdoor signs, stickers, or delivery boxes?</strong> &rarr; Choose <strong>Level Q (25%)</strong> or <strong>H (30%)</strong>.</p>
              <p><strong>Restaurant menu, flyer, or business card?</strong> &rarr; Choose <strong>Level M (15%)</strong>.</p>
              <p><strong>Screen display, presentation slide, or digital pass?</strong> &rarr; Choose <strong>Level L (7%)</strong>.</p>
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

          {/* Bottom Action CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Create Your Custom QR Code
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2 mb-5">
              Customize error correction, add your logo, and download high-resolution vector SVG or PNG files for free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/qr-code-generator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition shadow-sm"
              >
                <span>Open QR Generator</span>
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
              Print &amp; Size Standards
            </Link>
            <span>•</span>
            <Link
              to="/blog/static-vs-dynamic-qr-code"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Static vs Dynamic QR Codes
            </Link>
            <span>•</span>
            <Link
              to="/qr-code-security"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              QR Code Security
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
};

export default BlogPostErrorCorrection;
