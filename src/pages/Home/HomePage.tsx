import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Upload,
  PlusCircle,
  ShieldCheck,
  Zap,
  Download,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { SEO_CONFIG, generateWebsiteSchema } from '../../config/seo.config';
import { CameraScanner } from '../../components/scanner/CameraScanner';
import { ImageScanner } from '../../components/scanner/ImageScanner';
import { QRGeneratorForm } from '../../components/generator/QRGeneratorForm';
import { ScanResultCard } from '../../components/qr/ScanResultCard';
import { QRScanResult } from '../../types/qr.types';
import { AdBanner, AdSidebar } from '../../components/ads';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'create'>('scan');
  const [scanMethod, setScanMethod] = useState<'camera' | 'image'>('camera');
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);

  const handleScanSuccess = (res: QRScanResult) => {
    setScanResult(res);
  };

  const handleScanAgain = () => {
    setScanResult(null);
  };

  const homepageSchema = generateWebsiteSchema();

  return (
    <>
      <SEOHead seo={SEO_CONFIG.home} structuredData={homepageSchema} />

      <div className="w-full">
        {/* Hero Section */}
        <section className="pt-8 pb-4 sm:pt-10 sm:pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            QR Code Scanner
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The QR code scanner online lets you scan QR codes without any app. Upload an image or use your camera to scan a QR code.
          </p>

          {/* Primary Action Switcher */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
              <button
                type="button"
                id="hero-scan-tab"
                onClick={() => {
                  setActiveTab('scan');
                  setScanResult(null);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  activeTab === 'scan'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Scan QR Code</span>
              </button>

              <button
                type="button"
                id="hero-create-tab"
                onClick={() => setActiveTab('create')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  activeTab === 'create'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create QR Code</span>
              </button>
            </div>
          </div>
        </section>

        {/* Ad Placement: Top Content (Configured, zero footprint if disabled) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="top" />
        </div>

        {/* Interactive Tool Area (Visually Dominant) */}
        <section
          id="tool-workbench-section"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          {activeTab === 'scan' ? (
            <div className="flex flex-col items-center">
              {/* If a code was detected, display the result card */}
              {scanResult ? (
                <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
                  <ScanResultCard result={scanResult} onScanAgain={handleScanAgain} />
                </div>
              ) : (
                <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
                  {/* Scanner Sub-method Toggle */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <button
                      type="button"
                      onClick={() => setScanMethod('camera')}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                        scanMethod === 'camera'
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                      <span>Use Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setScanMethod('image')}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                        scanMethod === 'image'
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </button>
                  </div>

                  {/* Render Selected Scanning Method */}
                  {scanMethod === 'camera' ? (
                    <CameraScanner
                      onScanSuccess={handleScanSuccess}
                      onSwitchToUpload={() => setScanMethod('image')}
                    />
                  ) : (
                    <ImageScanner onScanSuccess={handleScanSuccess} />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <QRGeneratorForm />
            </div>
          )}
        </section>

        {/* Ad Placement: Inline Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="inline" />
        </div>

        {/* Informational Guides Section */}
        <section className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <AdSidebar className="space-y-16" sidebarAriaLabel="Educational Guides Sponsorship">
              {/* Feature Highlights Group */}
              <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Core Privacy Standards & Capabilities
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Built from the ground up for zero-knowledge privacy, high performance, and standards compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Zero Server Uploads
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    All QR decoding and rendering happens locally in your browser memory. Your images
                    and scanned text never touch our servers.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Malicious Link Defense
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Automatic safety inspection blocks malicious script schemes such as javascript:
                    and vbscript: to protect you from exploits.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 mb-3">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    PNG & Vector SVG
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Download high-resolution raster images or crisp vector SVGs suitable for
                    professional printing on posters, flyers, and merchandise.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Offline PWA Capable
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Install this app on your device for instant offline access. Scan and create QR
                    codes anywhere, even without an active internet connection.
                  </p>
                </div>
              </div>
            </div>

            {/* How-To Guides Group */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step-by-Step Instructions
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Easy instructions to quickly scan or create your QR codes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    How to Scan a QR Code
                  </h3>
                  <ol className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                        1
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Choose your input:</strong>{' '}
                        Click "Start Camera" to scan via webcam or phone camera, or select "Upload Image"
                        to decode a photo from your files.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                        2
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Frame the code:</strong> Position
                        the QR code squarely inside the viewfinder reticle. Ensure adequate lighting
                        without strong glare.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                        3
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Inspect and interact:</strong>{' '}
                        The decoded text or URL appears safely formatted. Verify the web address before
                        clicking "Open Link" or copying to clipboard.
                      </div>
                    </li>
                  </ol>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      to="/scan"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    >
                      <span>Go to full scanner workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/faq"
                      className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      Scanner FAQ
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    How to Create a QR Code
                  </h3>
                  <ol className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                        1
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Select content type:</strong> Pick
                        Website, Plain Text, Wi-Fi, Email, Phone, or SMS to open the corresponding input
                        form.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                        2
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Customize styling:</strong>{' '}
                        Adjust resolution, quiet zone margin, and foreground/background colors with our
                        live contrast analyzer.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300">
                        3
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Download and share:</strong> Click
                        "Download PNG" for digital sharing or "Download SVG" for infinite-scale vector
                        printing.
                      </div>
                    </li>
                  </ol>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      to="/create"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    >
                      <span>Go to full generator workbench</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/faq"
                      className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      Generator FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AdSidebar>
          </div>
        </section>

        {/* Ad Placement: Bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="bottom" />
        </div>
      </div>
    </>
  );
};
