import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { generateFAQSchema, generateBreadcrumbSchema, generateWebsiteSchema } from '../../config/seo.config';
import { BARCODE_DEDICATED_PAGES, BarcodePageConfig } from '../../data/barcodeGeneratorConfig';
import { BarcodeGeneratorWidget } from '../../components/barcode/BarcodeGeneratorWidget';
import { NotFoundPage } from '../NotFound/NotFoundPage';

interface BarcodeDedicatedPageProps {
  pageConfig?: BarcodePageConfig;
}

export const BarcodeDedicatedPage: React.FC<BarcodeDedicatedPageProps> = ({ pageConfig }) => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const config = pageConfig || BARCODE_DEDICATED_PAGES[slug || 'code-128'];

  if (!config) {
    return <NotFoundPage />;
  }

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

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap min-h-[44px]" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <Link to="/barcode-generator" className="hover:text-blue-600 transition">Barcode Generator</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">{config.h1}</span>
        </nav>

        {/* Page Header (H1 28px line-height 1.2 on phones, subline 16px) */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-[28px] leading-[1.2] sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {config.h1}
          </h1>
          {config.subline && (
            <p className="mt-2.5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-1">
              {config.subline}
            </p>
          )}
          <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {config.intro}
          </p>
        </header>

        {/* Generator Widget */}
        <section aria-label="Barcode Generator Interactive Tool" className="mb-8 sm:mb-12">
          <BarcodeGeneratorWidget initialFormat={config.preselectedFormat || 'CODE_128'} />
        </section>

        {/* Sections & FAQs (Section spacing 32px on phones) */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16 max-w-4xl mx-auto">
          {config.sections.map((sec, idx) => (
            <section key={idx} aria-labelledby={`section-${idx}`}>
              <h2 id={`section-${idx}`} className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
                {sec.title}
              </h2>
              {sec.content && (
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sec.content}
                </p>
              )}
              {sec.steps && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 mt-4 sm:mt-6">
                  {sec.steps.map((st) => (
                    <div key={st.step} className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-3">
                        {st.step}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{st.title}</h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{st.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* FAQs Accordion */}
          <section aria-labelledby="heading-faqs">
            <h2 id="heading-faqs" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {config.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full min-h-[48px] py-3.5 px-4 flex items-center justify-between text-left text-base font-bold text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl transition cursor-pointer"
                    >
                      <span className="pr-3 leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

