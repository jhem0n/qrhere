import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG, generateWebsiteSchema, generateBreadcrumbSchema } from '../../config/seo.config';
import { BarcodeScannerBox } from '../../components/scanner/BarcodeScannerBox';
import { getSiteUrl } from '../../config/app.config';

export const BarcodeScannerPage: React.FC = () => {
  const breadcrumbs = [
    { name: 'Barcode Scanner', path: '/barcode-scanner' },
  ];

  const siteUrl = getSiteUrl();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebsiteSchema(),
      generateBreadcrumbSchema(breadcrumbs, siteUrl),
      {
        '@type': 'WebApplication',
        name: 'Online Barcode Scanner',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description:
          'Scan barcodes online using your camera or image upload. Free web-based barcode reader supporting UPC, EAN, Code 128, and more.',
        url: `${siteUrl}/barcode-scanner`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.barcodeScanner}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header - H1 above the box */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 mt-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Online Barcode Reader
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan any barcode free with your camera or an image upload. Scan 1D barcodes (UPC, EAN, Code 128) or 2D barcodes (QR, Data Matrix).
          </p>
        </header>

        {/* Scanner Box Area */}
        <section aria-label="Barcode Scanner Box" className="flex flex-col items-center">
          <BarcodeScannerBox />
        </section>

        {/* Text Section at down of scanner box (No box, no SVG, text in h2, h3 matching reference image) */}
        <div className="mt-12 sm:mt-16 space-y-8 max-w-4xl text-slate-800 dark:text-slate-200">
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Barcode Scanner Online
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Our online barcode scanner lets you scan barcodes quickly and easily. You can upload a barcode image or use your device’s camera to capture an image of the barcode. Once the image is processed, the tool decodes the barcode and displays its data.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              You can scan barcodes displayed on a screen, printed on product packaging, or placed on a flyer. As long as the barcode is clear and legible, our scanner can read it.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              As our barcode scanner is web-based, you can use it on mobile and desktop devices without installing software. No software installation or specialized barcode scanner is required.
            </p>
          </section>

          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to Scan a Barcode Online?
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Our <Link to="/barcode-scanner" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">online barcode reader</Link> provides two simple ways to scan a barcode. You can either upload an existing barcode image or use your device’s camera to capture a barcode image.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Method 1: Scan a Barcode by Uploading an Image
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              <li>Open our barcode scanner tool</li>
              <li>Click the <strong>&ldquo;Upload&rdquo;</strong> button.</li>
              <li>A file browser will open. Locate and select the barcode image from your device.</li>
              <li>As soon as you upload the image, our tool will decode the barcode and display its data.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Method 2: Scan a Barcode Using Your Camera
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              <li>Open our online barcode scanner.</li>
              <li>Select <strong>&ldquo;Open Camera.&rdquo;</strong></li>
              <li>Allow your browser to access your device’s camera.</li>
              <li>When you give your permission, your device’s camera will open.</li>
              <li>Point the camera at the barcode and click <strong>&ldquo;Capture&rdquo;</strong> to take a picture.</li>
              <li>The captured image will be processed automatically, and the decoded data will appear in the output panel.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default BarcodeScannerPage;
