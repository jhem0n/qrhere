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

export const BlogPostStaticVsDynamic: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: 'Static vs Dynamic QR Code', path: '/blog/static-vs-dynamic-qr-code' },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Do static QR codes ever expire?',
      answer:
        'No. Static QR codes never expire. The destination is stored permanently in the black-and-white pattern. As long as your website is active, the code works forever.',
    },
    {
      question: 'Can I change the link of a static QR code after printing?',
      answer:
        'No. Because the URL is baked into the squares, you cannot edit it. If you need to update where it goes, you must print a new code or set up a redirect on your own website.',
    },
    {
      question: 'Are static QR codes really 100% free?',
      answer:
        'Yes. With QR Here, creating static QR codes for links, Wi-Fi, vCards, or text is completely free with no subscriptions, accounts, or scan limits.',
    },
    {
      question: 'Which type is safer for privacy?',
      answer:
        'Static QR codes are far more private. When someone scans a static code, their phone opens the link directly without routing through any tracking company or logging their IP address.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'Static vs Dynamic QR Codes: What’s the Difference?',
          description:
            'A simple, clear guide comparing static and dynamic QR codes. Learn which one you need for business cards, Wi-Fi, flyers, and products.',
          canonicalPath: '/blog/static-vs-dynamic-qr-code',
          datePublished: '2026-09-17',
          dateModified: '2026-10-02',
          image: `${siteUrl}/images/static-vs-dynamic-qr-code.jpg`,
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
        seo={SEO_CONFIG.blogStaticVsDynamic}
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
              Quick Comparison
            </span>
            <span>
              <time dateTime="2026-10-02">Updated October 2, 2026</time>
            </span>
            <span>•</span>
            <span>4 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Static vs Dynamic QR Codes: What’s the Difference?
          </h1>
        </header>

        {/* Featured Comparison Graphic */}
        <figure className="my-8 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <img
            src="/images/static-vs-dynamic-qr-code.jpg"
            alt="Static vs Dynamic QR Codes: Simple comparison showing permanent offline codes vs server redirects"
            title="Static vs Dynamic QR Codes: Simple comparison showing permanent offline codes vs server redirects"
            className="w-full h-auto object-contain"
            loading="eager"
            decoding="async"
            width={960}
            height={717}
          />
          <figcaption className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
            Static codes encode data permanently with zero server reliance. Dynamic codes route through a redirect server.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed space-y-8">
          {/* Section: The Core Difference in Plain English */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              The 30-Second Summary
            </h2>
            <div className="space-y-3">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  Static QR Code = Permanent &amp; Free Forever
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-1">
                  Your website link, Wi-Fi password, or contact card is encoded directly into the pattern of squares.
                  It works offline, never expires, and requires no account or subscription. But once printed, you cannot
                  change where it points.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  Dynamic QR Code = Editable &amp; Trackable (Usually Paid)
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-1">
                  The code points to a short redirect URL managed by a third-party company. You can change the destination
                  later and see scan counts. However, if the provider raises prices, cancels your account, or shuts down,
                  your printed QR code stops working completely.
                </p>
              </div>
            </div>
          </section>

          {/* Quick CTA to Generator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 my-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  Need a free, permanent QR code?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Generate high-resolution static QR codes for links, Wi-Fi, and vCards with zero subscriptions.
                </p>
              </div>
              <Link
                to="/qr-code-generator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm shrink-0"
              >
                <span>Create a Free QR Code</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Quick Comparison Table */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Quick Comparison: Static vs. Dynamic
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 my-4">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-sm sm:text-base">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-white">
                  <tr>
                    <th scope="col" className="p-3.5">Feature</th>
                    <th scope="col" className="p-3.5 text-blue-600 dark:text-blue-400">Static QR Code</th>
                    <th scope="col" className="p-3.5">Dynamic QR Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Cost</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">100% Free Forever</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Often $10–$40/month</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Expiration Date</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Never expires</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Stops working if unpaid</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Editable after printing</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">No (permanent)</td>
                    <td className="p-3.5 text-blue-600 dark:text-blue-400 font-semibold">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Privacy &amp; Security</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Direct &amp; Private</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Tracks user data &amp; IPs</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Third-Party Risk</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Zero risk</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">High (depends on host)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When to use which */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Which One Should You Choose?
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                  Choose a Static QR Code if:
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 mt-2">
                  <li>You are sharing your <strong>Wi-Fi network</strong> with guests.</li>
                  <li>You are putting your contact card (<strong>vCard</strong>) on printed business cards.</li>
                  <li>You are linking to your primary website or a permanent social profile.</li>
                  <li>You want zero monthly fees and peace of mind that your code will work in 5 years.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                  Choose a Dynamic QR Code only if:
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 mt-2">
                  <li>You are running expensive billboard or magazine ads and need scan analytics.</li>
                  <li>You print packaging on 50,000 product boxes and know the URL will change next season.</li>
                </ul>
              </div>
            </div>

            <p className="text-sm bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 mt-2">
              <strong>Smart Hack:</strong> If you want an editable link without paying monthly fees, create a static QR code pointing to a URL on your own domain (like <code className="font-mono text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">yourbrand.com/deal</code>). Whenever you want to change the destination, simply set up a free 301 redirect on your own website.
            </p>
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
              Create a Free Static QR Code Now
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2 mb-5">
              Generate permanent QR codes for links, Wi-Fi, vCards, and more. 100% free, private, and vector SVG ready.
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
              to="/blog/how-to-create-wifi-qr-code"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create a Wi-Fi QR Code
            </Link>
            <span>•</span>
            <Link
              to="/blog/how-to-create-vcard-qr-code"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              vCard Business Cards
            </Link>
            <span>•</span>
            <Link
              to="/qr-code-size-and-print-guide"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Print &amp; Size Guide
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
};

export default BlogPostStaticVsDynamic;
