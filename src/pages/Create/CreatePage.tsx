import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Shield, Layers, Sliders, ArrowRight, Camera, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { QRGeneratorForm } from '../../components/generator/QRGeneratorForm';
import { AdBanner, AdSidebar } from '../../components/ads';

export const CreatePage: React.FC = () => {
  const breadcrumbs = [{ name: 'Create QR Code', path: '/create' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.create} breadcrumbs={breadcrumbs} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            QR Code Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Create custom QR codes with logos, frames, and colors. Download your QR code as SVG or PNG.
          </p>
        </header>

        <AdBanner position="top" />

        {/* Generator Form Section */}
        <section aria-label="QR Code Generator Form" className="my-6">
          <QRGeneratorForm />
        </section>

        <AdBanner position="inline" />

        {/* Engineering & Design Guidance */}
        <section aria-label="QR Code Technical Specifications & Standards" className="mt-14">
          <AdSidebar className="space-y-8" sidebarAriaLabel="Technical Standards Sponsorship">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Technical Specifications & Printing Standards
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Standard QR codes (ISO/IEC 18004) require proper contrast, quiet zones, and error correction for reliable real-world optical decoding.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-3">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Error Correction Levels
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Error correction allows QR codes to remain readable even if partially covered,
                wrinkled, or printed on textured surfaces. We support Low (7%), Medium (15%), Quartile
                (25%), and High (30%). High is recommended for outdoor signs, vehicles, and printed merchandise.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Vector SVG vs Raster PNG
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                PNG is perfect for web sharing, emails, and phone screens. For billboard printing,
                product packaging, or laser engraving, always use SVG (Scalable Vector Graphics),
                which scales infinitely without pixelation, blurriness, or quality loss.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 mb-3">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Quiet Zone & Margin Rules
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The quiet zone is the blank border surrounding the QR pattern. Optical scanners need
                this empty buffer to separate the code from adjacent graphics or text. We recommend a
                margin of at least 3 to 4 blocks for maximum reliability.
              </p>
            </div>
          </div>

          {/* Practical Printing Checklist */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Checklist for High-Quality Physical Printing
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Maintain a minimum 4.5:1 optical contrast ratio between foreground and background.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Keep physical dimensions at least 2 cm x 2 cm (0.8" x 0.8") for close scanning.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Always test print on paper and scan with a smartphone before producing large batches.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Never invert colors to light code on dark background on reflective glossy paper.</span>
              </div>
            </div>
          </div>

          {/* Contextual Cross-Links */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Want to test your printed code?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Verify readability instantly using our camera scanner or upload an image sample.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                to="/scan"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Open Scanner</span>
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Generator FAQ</span>
              </Link>
            </div>
          </div>
          </AdSidebar>
        </section>

        <AdBanner position="bottom" />
      </div>
    </>
  );
};
