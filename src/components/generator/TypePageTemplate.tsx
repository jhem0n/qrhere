import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Printer,
  Eye,
} from 'lucide-react';
import { QRTypeDefinition, QR_TYPES } from '../../data/qrTypes';
import { MasterGenerator } from './MasterGenerator';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { generateWebApplicationSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../config/seo.config';
import { getSiteUrl } from '../../config/app.config';

interface TypePageTemplateProps {
  typeDef: QRTypeDefinition;
}

export const TypePageTemplate: React.FC<TypePageTemplateProps> = ({ typeDef }) => {
  const siteUrl = getSiteUrl();
  const canonicalPath = `/${typeDef.slug}`;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: typeDef.h1, path: canonicalPath },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebApplicationSchema(siteUrl),
      generateBreadcrumbSchema(breadcrumbs, siteUrl),
      generateFAQSchema(typeDef.faqs),
    ],
  };

  const seoData = {
    title: typeDef.title,
    description: typeDef.metaDescription,
    canonicalPath,
    ogType: 'website' as const,
  };

  // Find related types
  const relatedTypes = QR_TYPES.filter((t) => typeDef.relatedTypes.includes(t.id));

  return (
    <>
      <SEOHead seo={seoData} breadcrumbs={breadcrumbs} structuredData={structuredData} />

      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {typeDef.h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {typeDef.intro}
          </p>
        </header>

        {/* Interactive Master Generator Tool */}
        <section aria-label={`${typeDef.name} Generator Tool`} className="mb-16">
          <MasterGenerator initialTypeId={typeDef.id} />
        </section>

        {/* Semantic Long-Form Content Sections (All H2s, > 600 words) */}
        <div className="space-y-16 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          {/* Section 1: How to create in 3 steps */}
          <section aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              How to create a {typeDef.name} in 3 simple steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {typeDef.steps.map((st, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: What happens when someone scans it */}
          <section aria-labelledby="scan-experience-heading">
            <div className="p-6 sm:p-8 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs">
              <h2 id="scan-experience-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>What happens when someone scans it?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {typeDef.whatHappensWhenScanned}
              </p>
            </div>
          </section>

          {/* Section 3: Use cases */}
          <section aria-labelledby="usecases-heading">
            <h2 id="usecases-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Popular use cases for {typeDef.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {typeDef.useCases.map((uc, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {uc.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Tips for best results */}
          <section aria-labelledby="tips-heading">
            <h2 id="tips-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Tips for best results with {typeDef.shortName} QR codes
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              {typeDef.bestPractices.map((bp, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {bp.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {bp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Print Size and Placement Guide */}
          <section aria-labelledby="print-guide-heading">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shadow-xs space-y-4">
              <h2 id="print-guide-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Print size and placement recommendations</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                When printing physical QR codes, the primary factor determining scannability is the ratio between scanning distance and the size of the QR code. A dependable rule of thumb is <strong>10:1</strong>: for every 10 inches of scanning distance, the QR code should be at least 1 inch wide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold block text-slate-900 dark:text-white">Business Cards</span>
                  <span className="text-slate-500">Min 2 x 2 cm (0.8 x 0.8 in)</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold block text-slate-900 dark:text-white">Table Tents & Flyers</span>
                  <span className="text-slate-500">Min 4 x 4 cm (1.6 x 1.6 in)</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold block text-slate-900 dark:text-white">Posters & Windows</span>
                  <span className="text-slate-500">Min 10 x 10 cm (4 x 4 in)</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/qr-code-size-and-print-guide"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Read our complete QR Code Size and Print Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Section 6: Frequently Asked Questions */}
          <section aria-labelledby="faqs-heading">
            <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Frequently asked questions about {typeDef.shortName} QR codes
            </h2>
            <div className="space-y-4">
              {typeDef.faqs.map((faq, i) => (
                <div key={i} className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Related QR Generators */}
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Explore related QR code generators
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedTypes.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/${rel.slug}`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-900 shadow-xs transition group"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-blue-600">
                    {rel.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Free {rel.shortName} generator
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
