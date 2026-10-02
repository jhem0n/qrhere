import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG, generateGeneratorAppSchema, generateBreadcrumbSchema } from '../../config/seo.config';
import { MasterGenerator } from '../../components/generator/MasterGenerator';

export const CreatePage: React.FC = () => {
  const breadcrumbs = [{ name: 'QR Code Generator', path: '/qr-code-generator' }];

  const generatorSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateGeneratorAppSchema(),
      generateBreadcrumbSchema(breadcrumbs),
    ],
  };

  return (
    <>
      <SEOHead seo={SEO_CONFIG.generator} breadcrumbs={breadcrumbs} structuredData={generatorSchema} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            QR Code Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Create custom QR codes online with logos, colors, and frames. Our free QR code generator lets you make a QR code for links, Wi-Fi networks, and contact cards, and download high-resolution vector SVG or PNG files.
          </p>
        </header>

        {/* Generator Workbench Section */}
        <section aria-label="QR Code Generator Studio" className="my-6">
          <MasterGenerator initialTypeId="url" />
        </section>

        {/* Practical QR Code Printing and Usage Guide - Pure Clean Editorial Section */}
        <section aria-label="QR Code Printing and Usage Guide" className="mt-16 sm:mt-20 max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800/80 pt-12 sm:pt-16">
          <div className="space-y-10 text-slate-700 dark:text-slate-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                How to get crisp, reliable QR codes every time
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you are printing a sign for a shop window, placing table tents in a cafe, or adding a link to an email footer, a few simple choices make the difference between a code that scans in a split second and one that fails to open.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Choosing between SVG and PNG
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you are sharing your QR code on a screen — such as in an email signature, a social media post, or a web banner — download the <strong>PNG</strong> format. It opens everywhere immediately and looks great on all phones and monitors.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                If you are printing your QR code on physical paper, vinyl stickers, product labels, banners, or clothing, always download the <strong>SVG</strong> format. SVG files are vector mathematics rather than pixels, meaning they can scale infinitely to any print dimension without any pixelation or blurry edges.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Error correction made simple
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                QR codes include built-in recovery data called Reed-Solomon error correction. This mathematical safety net allows phone cameras to read the full destination even if the code gets stained, wrinkled, or partially blocked:
              </p>
              <ul className="space-y-2 text-sm sm:text-base pl-5 list-disc marker:text-blue-600 dark:marker:text-blue-400">
                <li>
                  <strong>Low (7%) or Medium (15%):</strong> Best for general website links and clean digital displays. Keeps the grid dots larger and easier for budget cameras to scan from across the room.
                </li>
                <li>
                  <strong>Quartile (25%) or High (30%):</strong> Essential whenever you embed a logo or icon in the center of the code, or for outdoor signs exposed to weather, dirt, and direct sunlight.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Print size and scanning distance
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                The optical rule of thumb for QR codes is a <strong>10:1 distance-to-size ratio</strong>. For every 10 units of distance between the scanner and the code, your QR code should measure at least 1 unit wide. A menu scanned from 30 cm away requires at least a 3 cm wide code; a poster scanned from 2 meters needs at least 20 cm.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                For handheld items like business cards and receipts, never print smaller than <strong>2 cm × 2 cm (0.8 × 0.8 inches)</strong>. Always do a test scan on paper with your phone before producing large batches.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Keep the quiet zone clear
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                The white margin around your QR code is known as the quiet zone. Smartphone cameras need this empty space to identify where your surrounding graphics end and where the QR pattern starts. Always leave at least 4 module blocks of empty background around the entire symbol.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  Have a QR code you need to read?
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Scan codes instantly in your browser using your camera or an uploaded image file.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition shadow-xs"
                >
                  Open Scanner
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold transition"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
