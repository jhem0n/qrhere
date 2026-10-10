import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { generateFAQSchema, generateBreadcrumbSchema, generateWebsiteSchema } from '../../config/seo.config';
import { BARCODE_HUB_CONFIG } from '../../data/barcodeGeneratorConfig';
import { BarcodeGeneratorWidget } from '../../components/barcode/BarcodeGeneratorWidget';

export const BarcodeHubPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqSchema = generateFAQSchema(BARCODE_HUB_CONFIG.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(BARCODE_HUB_CONFIG.breadcrumbs);
  const structuredData = generateWebsiteSchema([faqSchema, breadcrumbSchema]);

  return (
    <>
      <SEOHead
        seo={{
          title: BARCODE_HUB_CONFIG.title,
          description: BARCODE_HUB_CONFIG.metaDescription,
          canonicalPath: BARCODE_HUB_CONFIG.path,
          ogType: 'website',
        }}
        structuredData={structuredData}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap min-h-[44px]" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">Barcode Generator</span>
        </nav>

        {/* Page Header (H1 28px line-height 1.2 on phones, subline 16px) */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-[28px] leading-[1.2] sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {BARCODE_HUB_CONFIG.h1}
          </h1>
          <p className="mt-2.5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-1">
            {BARCODE_HUB_CONFIG.subline}
          </p>
        </header>

        {/* Generator Widget */}
        <section aria-label="Barcode Generator Interactive Tool" className="mb-8 sm:mb-12">
          <BarcodeGeneratorWidget />
        </section>

        {/* Educational Content & H2s (Section spacing 32px on phones) */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16 max-w-4xl mx-auto">
          {/* H2: Make a barcode in 3 quick steps */}
          <section aria-labelledby="heading-steps">
            <h2 id="heading-steps" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6">
              Make a barcode in 3 quick steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
              {BARCODE_HUB_CONFIG.sections[0].steps?.map((step) => (
                <div key={step.step} className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* H2: Which barcode type should you pick? (Stacked cards on mobile, table on larger screens) */}
          <section aria-labelledby="heading-types">
            <h2 id="heading-types" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6">
              Which barcode type should you pick?
            </h2>

            {/* Mobile View: Stacked Cards (zero horizontal scroll) */}
            <div className="sm:hidden space-y-2.5">
              {BARCODE_HUB_CONFIG.sections[1].table?.rows.map((row, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{row.col1}</span>
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                      {row.col3}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Best for: </span>
                    {row.col2}
                  </p>
                </div>
              ))}
            </div>

            {/* Tablet/Desktop View: Table in scroll wrapper */}
            <div className="hidden sm:block border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto bg-white dark:bg-slate-900 shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3 sm:p-4 font-bold">Format</th>
                    <th className="p-3 sm:p-4 font-bold">Best Used For</th>
                    <th className="p-3 sm:p-4 font-bold">Character Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {BARCODE_HUB_CONFIG.sections[1].table?.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{row.col1}</td>
                      <td className="p-3 sm:p-4">{row.col2}</td>
                      <td className="p-3 sm:p-4 font-mono text-xs">{row.col3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              If your scanner or software asks for a specific type, use that one. If nobody told you, Code 128 will work in almost every case.
            </p>
          </section>

          {/* H2: Code 128: the one to use if you're not sure */}
          <section aria-labelledby="heading-code128">
            <h2 id="heading-code128" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Code 128: the one to use if you&apos;re not sure
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Code 128 packs letters, digits and symbols into a short, sturdy barcode and nearly every scanner reads it. It&apos;s the usual pick for warehouse bins, parcels, and anything you label yourself. Need only this type? Go to the{' '}
              <Link to="/barcode-generator/code-128" className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700">
                Code 128 barcode generator
              </Link>
              .
            </p>
          </section>

          {/* H2: EAN-13 and UPC-A for products (read this before you print) */}
          <section aria-labelledby="heading-ean-upc">
            <h2 id="heading-ean-upc" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              EAN-13 and UPC-A for products (read this before you print)
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Quick honesty: this tool draws the barcode, it doesn&apos;t give you the right to use the number. Shops and marketplaces expect numbers issued by GS1. If you invent a number, it can clash with someone else&apos;s product. For internal stock, school projects, tests and mock-ups, go ahead. For selling in stores or on big marketplaces, get your numbers from GS1 first, then paste them here. We calculate the check digit for you.
            </p>
          </section>

          {/* H2: Need a lot of barcodes? Do them in bulk */}
          <section aria-labelledby="heading-bulk">
            <h2 id="heading-bulk" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Need a lot of barcodes? Do them in bulk
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste one value per line, or upload a CSV, and we&apos;ll make every barcode at once. Download them as a ZIP of images or print a sheet. Handy for inventory, event tickets and asset tags.{' '}
              <Link to="/barcode-generator/bulk" className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700">
                Open Bulk Barcode Generator →
              </Link>
            </p>
          </section>

          {/* H2: PNG, SVG or print: get it the way you need it */}
          <section aria-labelledby="heading-formats">
            <h2 id="heading-formats" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              PNG, SVG or print: get it the way you need it
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              PNG for documents and quick posts. SVG when you want it razor sharp at any size, for printing or design software. You can change size, margin, bar colour and whether the number shows underneath. Keep high contrast: dark bars on a light background scan best.
            </p>
          </section>

          {/* H2: Will it actually scan? Test it right here */}
          <section aria-labelledby="heading-test">
            <h2 id="heading-test" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Will it actually scan? Test it right here
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Never print a hundred labels before testing one. Open the{' '}
              <Link to="/barcode-scanner" className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700">
                QR Here scanner
              </Link>
              , point your camera at the screen, and check that it reads what you typed. You can also upload the PNG and scan it from the file.
            </p>
          </section>

          {/* H2: Barcode generator questions, answered (FAQ Accordion with 48px tap targets & visible focus) */}
          <section aria-labelledby="heading-faq">
            <h2 id="heading-faq" className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6">
              Barcode generator questions, answered
            </h2>
            <div className="space-y-3">
              {BARCODE_HUB_CONFIG.faqs.map((faq, idx) => {
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

