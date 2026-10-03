import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG, generateGeneratorAppSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../config/seo.config';
import { MasterGenerator } from '../../components/generator/MasterGenerator';
import { GeneratorGuide, GENERATOR_FAQS } from '../../components/generator/GeneratorGuide';

export const CreatePage: React.FC = () => {
  const breadcrumbs = [{ name: 'QR Code Generator', path: '/qr-code-generator' }];

  const generatorSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateGeneratorAppSchema(),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchema(GENERATOR_FAQS),
    ],
  };

  return (
    <>
      <SEOHead seo={SEO_CONFIG.generator} breadcrumbs={breadcrumbs} structuredData={generatorSchema} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Free QR Code Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Create custom QR codes online with logos, colors, frames, and error correction. Turn any link, Wi-Fi network, vCard contact, or text into a permanent, scannable QR code and download free high-resolution vector SVG or PNG files.
          </p>
        </header>

        {/* Generator Workbench Section */}
        <section aria-label="QR Code Generator Studio" className="my-6">
          <MasterGenerator initialTypeId="url" />
        </section>

        {/* Comprehensive Guide & FAQ Section personalized for QR Here */}
        <GeneratorGuide />
      </div>
    </>
  );
};

