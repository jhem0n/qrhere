import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { BarcodeScannerBox } from '../../components/scanner/BarcodeScannerBox';

export const BarcodeScannerPage: React.FC = () => {
  const breadcrumbs = [
    { name: 'Barcode Scanner', path: '/barcode-scanner' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QR Here Barcode Scanner',
        url: 'https://qrhere.online/barcode-scanner',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        description:
          'Free online barcode scanner. Scan UPC, EAN, Code 128 and QR codes with your camera or an image. No app, no sign-up – processed in your browser.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this online barcode scanner really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. It is completely free, with no sign-up, no limits and no app to install.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I scan a barcode from an image or screenshot?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Upload a JPG, PNG or WebP image and the barcode is decoded in your browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work on iPhone and Android?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. It works in modern mobile browsers such as Safari and Chrome. Allow camera access when prompted.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which barcode types can it read?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It reads common 1D barcodes such as UPC, EAN and Code 128, and 2D codes such as QR and Data Matrix.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data stored or sent anywhere?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Everything is processed locally on your device.',
            },
          },
          {
            '@type': 'Question',
            name: "Why won't my barcode scan?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Usually poor lighting, glare, blur or a cropped code. Try better light, hold the camera steady, or upload a clearer, higher-resolution image.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://qrhere.online/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Barcode Scanner',
            item: 'https://qrhere.online/barcode-scanner',
          },
        ],
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

        {/* Page Header - Exactly One H1 on the page */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 mt-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Free Online Barcode Scanner &amp; Reader
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan any barcode free with your camera or an image upload. Reads 1D barcodes (UPC, EAN, Code 128) and 2D codes (QR, Data Matrix). No app, no sign-up, and your images never leave your device.
          </p>
        </header>

        {/* Scanner Box Area */}
        <section aria-label="Barcode Scanner Box" className="flex flex-col items-center">
          <BarcodeScannerBox />
        </section>

        {/* Comprehensive SEO Content Section */}
        <div className="mt-14 sm:mt-18 space-y-12 max-w-4xl mx-auto text-slate-800 dark:text-slate-200">
          {/* Section 1: How to Scan a Barcode Online */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to Scan a Barcode Online
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Our online barcode scanner works in any modern browser on phone, tablet and desktop. Choose whichever method suits you. Whether you have a saved screenshot on your device or a physical product right in front of you, you can decode barcodes instantly without installing apps or buying hardware scanners.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Method 1: Scan from Image */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Scan a barcode from an image
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  <li>Open the scanner and click &ldquo;Upload&rdquo;.</li>
                  <li>Select a photo or screenshot of the barcode from your phone or computer.</li>
                  <li>The barcode is decoded instantly and the data appears in the output panel.</li>
                </ol>
              </div>

              {/* Method 2: Scan with Camera */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Scan a barcode with your camera
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  <li>Click &ldquo;Open Camera&rdquo; and allow camera access.</li>
                  <li>Point the camera at the barcode and click &ldquo;Capture&rdquo;.</li>
                  <li>The captured image is decoded automatically and the result is shown.</li>
                </ol>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <strong className="text-slate-800 dark:text-slate-200">Helpful scanning tips:</strong> Ensure good lighting on the barcode surface and hold your device steady. Keep the whole barcode in frame with all margins and bars clearly visible. Avoid glare or strong light reflections on glossy plastic packaging. If a camera scan fails due to camera motion blur, take a crisp, well-focused photo and upload the higher-resolution image instead.
            </p>
          </section>

          {/* Section 2: Supported Barcode Formats */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Supported Barcode Formats
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              Our web barcode scanner is built with multi-format recognition engines. It supports the standard linear (1D) and matrix (2D) symbologies used across retail, warehousing, logistics, and identity verification:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-semibold">
                    <th className="py-3.5 px-4 sm:px-6 w-1/3">Barcode Format</th>
                    <th className="py-3.5 px-4 sm:px-6">Typical Use &amp; Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">UPC-A and UPC-E</td>
                    <td className="py-3 px-4 sm:px-6">Retail products, groceries, and consumer point of sale in the US and Canada.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">EAN-13 and EAN-8</td>
                    <td className="py-3 px-4 sm:px-6">Retail products, supermarket items, and book ISBNs worldwide outside North America.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">Code 128</td>
                    <td className="py-3 px-4 sm:px-6">High-density tracking for shipping labels, freight, packaging, and logistics management.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">Code 39</td>
                    <td className="py-3 px-4 sm:px-6">Industrial manufacturing, inventory tracking, automotive tagging, and defense records.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">ITF / ITF-14</td>
                    <td className="py-3 px-4 sm:px-6">Corrugated shipping cartons, cardboard master cases, and bulk wholesale packaging.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">QR Code</td>
                    <td className="py-3 px-4 sm:px-6">Website URLs, Wi-Fi network credentials, digital payments, and plain text notes.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">Data Matrix</td>
                    <td className="py-3 px-4 sm:px-6">Tiny components, aerospace parts, medical devices, and healthcare serialization.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 sm:px-6 font-medium text-slate-900 dark:text-white">PDF417</td>
                    <td className="py-3 px-4 sm:px-6">ID cards, driver licenses, airline boarding passes, railway tickets, and parcels.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Private and Free – Nothing Is Uploaded */}
          <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/60">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Private and Free – Nothing Is Uploaded
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              Scanning runs entirely in your browser. Your camera feed and images are never uploaded to a server or stored. All image processing and barcode decoding happen locally inside your web browser memory using client-side algorithms. There is no account, no paywall and no scan limit. You can scan as many barcodes as you need every day with complete confidentiality.
            </p>
          </section>

          {/* Section 4: Frequently Asked Questions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  1. Is this online barcode scanner really free?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Yes. It is completely free, with no sign-up, no limits and no app to install.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  2. Can I scan a barcode from an image or screenshot?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Yes. Upload a JPG, PNG or WebP image and the barcode is decoded in your browser.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  3. Does it work on iPhone and Android?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Yes. It works in modern mobile browsers such as Safari and Chrome. Allow camera access when prompted.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  4. Which barcode types can it read?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  It reads common 1D barcodes such as UPC, EAN and Code 128, and 2D codes such as QR and Data Matrix.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  5. Is my data stored or sent anywhere?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  No. Everything is processed locally on your device.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  6. Why won&apos;t my barcode scan?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Usually poor lighting, glare, blur or a cropped code. Try better light, hold the camera steady, or upload a clearer, higher-resolution image.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: More Barcode Tools */}
          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              More Barcode Tools
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Discover our specialized barcode scanning and decoding tools tailored for different workflows:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link
                  to="/barcode-reader-from-image"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  scan a barcode from an image
                </Link>
                {' '}&ndash; Upload screenshots, photos, and digital documents to read barcodes instantly.
              </li>
              <li>
                <Link
                  to="/upc-ean-scanner"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  UPC and EAN scanner
                </Link>
                {' '}&ndash; Read 12-digit UPC and 13-digit EAN packaging barcodes with camera or photo upload.
              </li>
              <li>
                <Link
                  to="/webcam-barcode-scanner"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  webcam barcode scanner
                </Link>
                {' '}&ndash; Use your laptop or desktop webcam to scan physical barcodes without handheld hardware.
              </li>
              <li>
                <Link
                  to="/barcode-decoder-online"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  barcode decoder
                </Link>
                {' '}&ndash; Translate barcode patterns into readable text and inspect detected formats.
              </li>
            </ul>
          </section>

          {/* Section 6: Related Tools */}
          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Related Tools
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Check out our other fast and private web utilities:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base">
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

export default BarcodeScannerPage;

