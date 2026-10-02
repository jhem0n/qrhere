import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, CheckCircle2, AlertTriangle, Layers, ShieldCheck, Ruler, ArrowRight, ExternalLink, Calendar, Clock, User } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG, generateArticleSchema, generateBreadcrumbSchema } from '../../config/seo.config';
import { getSiteUrl } from '../../config/app.config';

export const QrCodePrintGuidePage: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'QR Code Size & Print Guide', path: '/qr-code-size-and-print-guide' },
  ];

  const siteUrl = getSiteUrl();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'QR Code Size and Printing Guide: Formulas, DPI & Specifications',
          description:
            'A practical engineering and design guide for printing QR codes. Learn the 10:1 distance rule, quiet zones, contrast, error correction, and vector SVG print setup.',
          canonicalPath: '/qr-code-size-and-print-guide',
          datePublished: '2026-09-25T00:00:00Z',
          dateModified: '2026-10-02T00:00:00Z',
        },
        siteUrl
      ),
      generateBreadcrumbSchema(breadcrumbs, siteUrl),
    ],
  };

  return (
    <>
      <SEOHead seo={SEO_CONFIG.printGuide} breadcrumbs={breadcrumbs} structuredData={structuredData} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 mb-3">
            <Printer className="w-3.5 h-3.5" />
            <span>Print Engineering &amp; Production Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            QR Code Size and Printing Guide
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            A comprehensive, practical reference for graphic designers, print operators, and business owners. Learn exact scanning distance ratios, quiet zone tolerances, contrast thresholds, and vector SVG specifications to ensure every printed code scans on the first attempt.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>By Jahid Hasan Emon (QR Here Developer)</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime="2026-09-25">Updated October 2, 2026</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>7 min read</span>
            </span>
          </div>
        </header>

        <div className="space-y-12 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
          {/* Section 1: The 10:1 Optical Distance Rule */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Ruler className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>The 10:1 Scanning Distance Ratio</span>
            </h2>
            <p>
              When a smartphone camera focuses on a physical QR code, optical sensors must resolve the individual dark and light modules that encode your data. The single most important factor determining whether a code scans cleanly is the ratio between <strong>scanning distance</strong> (the physical space between the phone lens and the printed surface) and the <strong>width of the QR code</strong>.
            </p>
            <p>
              The industry-standard rule of thumb is <strong>10:1</strong>: for every 10 units of distance from which you anticipate users will scan, the printed QR code pattern should be at least 1 unit wide.
            </p>
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-5 font-mono text-sm text-blue-900 dark:text-blue-200">
              Minimum Width = Anticipated Scanning Distance ÷ 10
            </div>
            <p>
              For example, if you place a QR code on an eye-level store window where pedestrians will stand approximately 2 meters (78 inches) away, the code should be printed at least 20 cm (7.8 inches) wide.
            </p>

            {/* Quick Sizing Matrix Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 my-6">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-850 font-bold text-slate-900 dark:text-white">
                  <tr>
                    <th scope="col" className="p-3.5">Physical Application</th>
                    <th scope="col" className="p-3.5">Typical Scan Distance</th>
                    <th scope="col" className="p-3.5 text-blue-600 dark:text-blue-400">Min. Size (Width × Height)</th>
                    <th scope="col" className="p-3.5">Recommended ECC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Business Cards &amp; Badges</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">10–25 cm (4–10 in)</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">2.5 × 2.5 cm (1.0 × 1.0 in)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Medium (M) or Quartile (Q)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Restaurant Menus &amp; Table Tents</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">30–50 cm (12–20 in)</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">4.0 × 4.0 cm (1.6 × 1.6 in)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Medium (M)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Flyers, Brochures &amp; Catalogs</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">30–60 cm (1–2 ft)</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">3.5 × 3.5 cm (1.4 × 1.4 in)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Medium (M)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Posters, Standees &amp; Windows</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">1.0–2.0 m (3–6.5 ft)</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">10 × 10 cm (4.0 × 4.0 in)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Quartile (Q) or High (H)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Trade Show Booth Backdrops</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">2.0–4.0 m (6.5–13 ft)</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">30 × 30 cm (12 × 12 in)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">High (H)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Outdoor Billboards &amp; Fleet Graphics</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">5.0–15 m (16–50 ft)</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">60–150 cm (24–60 in)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">High (H)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Quiet Zone Rules */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>The Quiet Zone: Non-Negotiable Margin Space</span>
            </h2>
            <p>
              According to the ISO/IEC 18004 standard, every QR code requires a <strong>quiet zone</strong>—a completely blank, solid margin surrounding all four sides of the matrix pattern.
            </p>
            <p>
              Optical barcode decoders use this blank perimeter to calculate the bounding coordinates of the finder squares (the three corner locator eyes). If graphics, background photographs, text, or card borders encroach directly into the quiet zone, scanners cannot isolate the grid, and recognition fails completely.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block text-sm mb-1">Standard Quiet Zone Specification</span>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Keep a margin of at least <strong>4 modules (blocks)</strong> of solid background color around all four sides. When generating in QR Here, selecting a margin setting of 3 or 4 automatically guarantees ISO compliance.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20">
                <span className="font-bold text-rose-900 dark:text-rose-200 block text-sm mb-1">Common Print Mistake</span>
                <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                  Bleeding the QR code flush to the trim edge of a physical paper card or placing it over a gradient background without a solid bounding box. Always give the code breathing room.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Optical Contrast and Inversion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <span>Contrast Thresholds and Color Polarity</span>
            </h2>
            <p>
              Smartphone cameras convert color images into grayscale pixel arrays before computing binary bit values. To distinguish between 0 and 1, the camera lens needs high optical contrast.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Minimum 4.5:1 Contrast Ratio:</strong> Always maintain a high contrast ratio between your foreground dot color and the background. Avoid pastel colors, pale grays, or light yellow dots on white cardstock.
              </li>
              <li>
                <strong>Dark on Light is the Safest:</strong> Standard QR algorithms expect dark modules placed over a lighter background. While some modern operating systems can read inverted codes (white squares on a black background), budget Android camera sensors and older phone models often fail.
              </li>
              <li>
                <strong>Beware of Reflective Gloss &amp; Foil:</strong> Printing metallic gold foil or high-gloss UV varnish over a dark background creates extreme directional glare under indoor spotlights. Stick with matte, semi-matte, or satin finishes for consistent optical recognition.
              </li>
            </ul>
          </section>

          {/* Section 4: Vector SVG vs Raster PNG */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Vector SVG vs. Raster PNG for Print Production</span>
            </h2>
            <p>
              When exporting your code from the{' '}
              <Link to="/qr-code-generator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
                QR code generator
              </Link>
              , you have two primary file choices:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Vector SVG (Scalable Vector Graphics)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  <strong>Always choose SVG for commercial printing.</strong> SVG files contain exact mathematical bezier curves and polygons rather than fixed pixel grids. You can scale an SVG code from a postage stamp to a highway billboard with zero pixelation, blurriness, or anti-aliasing softening.
                </p>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Best for: InDesign, Illustrator, Print Shops, Signage
                </span>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Raster PNG (300+ DPI Minimum)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  If your workflow strictly requires raster bitmap images (e.g. Canva or Microsoft Word), ensure the exported PNG has enough pixels to achieve at least <strong>300 DPI (dots per inch)</strong> at the final physical print size.
                </p>
                <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded text-slate-700 dark:text-slate-300">
                  Required Pixels = Physical Inches × 300
                </p>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mt-2">
                  Best for: Web graphics, email footers, digital slides
                </span>
              </div>
            </div>
          </section>

          {/* Section 5: Error Correction Selection */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Error Correction Levels: When to Use L, M, Q, and H
            </h2>
            <p>
              Reed-Solomon error correction embeds mathematical checksum redundancy into the QR matrix, allowing damaged, scratched, or partially covered codes to remain readable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">Level L (Low)</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold block my-1">~7% recovery</span>
                <p className="text-slate-500">Yields the simplest, least dense pattern. Suitable for clean digital displays with short URLs.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">Level M (Medium)</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold block my-1">~15% recovery</span>
                <p className="text-slate-500">Standard industry default. Ideal balance between scannability and physical density for flyers, cards, and table tents.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">Level Q (Quartile)</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold block my-1">~25% recovery</span>
                <p className="text-slate-500">Recommended for printed merchandise, restaurant tables, and packaging prone to fingerprints and scuffs.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">Level H (High)</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold block my-1">~30% recovery</span>
                <p className="text-slate-500">Mandatory when embedding central brand logos, or for outdoor construction signage and fleet wraps.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Pre-Press Quality Checklist */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Pre-Press Production Checklist
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Before sending your artwork to a commercial print shop or printing thousands of copies, verify these 7 checkpoints:
            </p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Print a 100% Scale Test Sheet:</strong> Never evaluate scannability solely on a backlit monitor. Print one sample on plain paper at actual trim dimensions.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Test with Both iOS and Android:</strong> Scan the test print with an Apple iPhone Camera and an Android phone running Google Lens to confirm universal compatibility.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Verify Quiet Zones:</strong> Ensure there is at least 3–4 mm of blank margin space on all four sides of the code.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Check URL Destination:</strong> Verify that the linked website or payload is live, formatted with HTTPS, and mobile-optimized.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Inspect Logo Knockout:</strong> If a center logo is embedded, confirm the surrounding matrix blocks are properly knocked out so they do not overlap the logo boundary.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Avoid Creases and Folds:</strong> Ensure the code does not cross a brochure trifold score, package seam, or curved corner.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Use Vector SVG for Print:</strong> Supply scalable vector artwork to your graphic designer or print vendor to prevent pixelation.</span>
              </div>
            </div>
          </section>

          {/* Section 7: Contextual Links */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Explore Generator Tools &amp; Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/qr-code-generator"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition shadow-xs group"
              >
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 block mb-1">
                  Vector QR Generator
                </span>
                <span className="text-xs text-slate-500">
                  Export scalable SVG and high-resolution PNG with live scannability checks.
                </span>
              </Link>

              <Link
                to="/qr-code-generator-vcard"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition shadow-xs group"
              >
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 block mb-1">
                  vCard Business Cards
                </span>
                <span className="text-xs text-slate-500">
                  Create digital contact card QR codes ready for business card printing.
                </span>
              </Link>

              <Link
                to="/qr-code-generator-wifi"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition shadow-xs group"
              >
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 block mb-1">
                  Wi-Fi Standee Codes
                </span>
                <span className="text-xs text-slate-500">
                  Generate printable Wi-Fi sign codes for cafe tables and guest rooms.
                </span>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};
