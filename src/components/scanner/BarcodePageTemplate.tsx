import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { BarcodeScannerBox } from './BarcodeScannerBox';
import { BarcodePageDefinition, BARCODE_PAGES } from '../../data/barcodePages';
import { getSiteUrl } from '../../config/app.config';

interface BarcodePageTemplateProps {
  pageDef: BarcodePageDefinition;
}

export const BarcodePageTemplate: React.FC<BarcodePageTemplateProps> = ({ pageDef }) => {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl.replace(/\/$/, '')}${pageDef.path}`;
  const parentUrl = `${siteUrl.replace(/\/$/, '')}/barcode-scanner`;

  const breadcrumbs = [
    { name: 'Barcode Scanner', path: '/barcode-scanner' },
    { name: pageDef.breadcrumbName, path: pageDef.path },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: pageDef.h1,
        url: pageUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        description: pageDef.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: pageDef.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl.replace(/\/$/, '')}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Barcode Scanner',
            item: parentUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: pageDef.breadcrumbName,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  const seoData = {
    title: pageDef.title,
    description: pageDef.metaDescription,
    canonicalPath: pageDef.path,
    ogType: 'website' as const,
  };

  // Other barcode landing pages for the Related Tools block
  const otherBarcodePages = BARCODE_PAGES.filter((p) => p.id !== pageDef.id);

  return (
    <>
      <SEOHead
        seo={seoData}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header - Exactly One H1 per page */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 mt-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {pageDef.h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {pageDef.intro}
          </p>
        </header>

        {/* Interactive Scanner Box near the top (Above the Fold) */}
        <section aria-label={`${pageDef.h1} Tool`} className="flex flex-col items-center">
          <BarcodeScannerBox />
        </section>

        {/* Comprehensive Unique Text Content Section */}
        <div className="mt-14 sm:mt-18 space-y-12 max-w-4xl mx-auto text-slate-800 dark:text-slate-200">
          {pageDef.sections.map((section, secIdx) => (
            <section key={secIdx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {section.title}
              </h2>

              {section.intro && (
                <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                  {section.intro}
                </p>
              )}

              {/* Numbered Steps with H3 */}
              {section.steps && section.steps.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {section.steps.map((st) => (
                    <div
                      key={st.step}
                      className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-xs">
                          {st.step}
                        </span>
                        {st.title && (
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {st.title}
                          </h3>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {st.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Subsections with H3 */}
              {section.subsections && section.subsections.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {section.subsections.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {sub.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Paragraphs */}
              {section.paragraphs && (
                <div className="space-y-3">
                  {section.paragraphs.map((pText, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
                    >
                      {pText}
                    </p>
                  ))}
                </div>
              )}

              {/* Table */}
              {section.table && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs mt-3">
                  <table className="w-full text-left text-sm sm:text-base border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-semibold">
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="py-3 px-4 sm:px-6">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">
                            {row.col1}
                          </td>
                          <td className="py-3 px-4 sm:px-6">{row.col2}</td>
                          {(row as any).col3 && (
                            <td className="py-3 px-4 sm:px-6">{(row as any).col3}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Frequently Asked Questions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {pageDef.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {fIdx + 1}. {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Related Tools
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our full suite of fast, client-side barcode and QR utilities:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link
                  to="/barcode-scanner"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Free online barcode scanner
                </Link>
                {' '}&ndash; All-in-one barcode reader supporting live camera feeds and image uploads.
              </li>
              {otherBarcodePages.map((other) => (
                <li key={other.id}>
                  <Link
                    to={other.path}
                    className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {other.h1}
                  </Link>
                  {' '}&ndash; {other.intro.split('.')[0]}.
                </li>
              ))}
              <li>
                <Link
                  to="/"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  QR code scanner
                </Link>
                {' '}&ndash; Scan 2D QR codes with your webcam or an uploaded image in your browser.
              </li>
              <li>
                <Link
                  to="/qr-code-generator"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  QR code generator
                </Link>
                {' '}&ndash; Create custom QR codes with logos, frames, and colors with instant vector SVG or PNG download.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
