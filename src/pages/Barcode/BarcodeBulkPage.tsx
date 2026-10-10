import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { generateFAQSchema, generateBreadcrumbSchema, generateWebsiteSchema } from '../../config/seo.config';
import { BARCODE_DEDICATED_PAGES } from '../../data/barcodeGeneratorConfig';
import { BulkBarcodeGeneratorWidget } from '../../components/barcode/BulkBarcodeGeneratorWidget';

export const BarcodeBulkPage: React.FC = () => {
  const config = BARCODE_DEDICATED_PAGES['bulk'];

  const faqSchema = generateFAQSchema(config.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(config.breadcrumbs);
  const structuredData = generateWebsiteSchema([faqSchema, breadcrumbSchema]);

  return (
    <>
      <SEOHead
        seo={{
          title: config.title,
          description: config.metaDescription,
          canonicalPath: `/${config.slug}`,
          ogType: 'website',
        }}
        structuredData={structuredData}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <Link to="/barcode-generator" className="hover:text-blue-600 transition">Barcode Generator</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">Bulk Barcode Generator</span>
        </nav>

        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {config.h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {config.subline}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {config.intro}
          </p>
        </header>

        {/* Bulk Widget */}
        <section aria-label="Bulk Barcode Generator Tool" className="mb-16">
          <BulkBarcodeGeneratorWidget />
        </section>

        {/* Sections & FAQs */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {config.sections.map((sec, idx) => (
            <section key={idx} aria-labelledby={`section-${idx}`}>
              <h2 id={`section-${idx}`} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                {sec.title}
              </h2>
              {sec.content && (
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sec.content}
                </p>
              )}
              {sec.steps && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {sec.steps.map((st) => (
                    <div key={st.step} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-3">
                        {st.step}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{st.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{st.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* FAQs */}
          <section aria-labelledby="heading-faqs">
            <h2 id="heading-faqs" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {config.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
