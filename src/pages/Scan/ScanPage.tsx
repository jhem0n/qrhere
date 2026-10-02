import React, { useState } from 'react';
import { Camera, Upload, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CameraScanner } from '../../components/scanner/CameraScanner';
import { ImageScanner } from '../../components/scanner/ImageScanner';
import { ScanResultCard } from '../../components/qr/ScanResultCard';
import { QRScanResult } from '../../types/qr.types';
import { QRScannerService } from '../../services/qr/scanner.service';
import { SCANNER_KEYWORDS_STRING } from '../../data/scannerKeywords';

export const ScanPage: React.FC = () => {
  const [method, setMethod] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<QRScanResult | null>(null);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'QR Code Scanner', path: '/scan' },
  ];

  const handleScanSuccess = (scanRes: QRScanResult) => {
    setResult(scanRes);
  };

  const handleScanAgain = () => {
    setResult(null);
  };

  const handleLoadTestSample = (sampleText: string) => {
    const formatted = QRScannerService.formatScanResult(sampleText, 'image');
    setResult(formatted);
  };

  const seoData = {
    title: 'QR Code Scanner Online – Camera & Image Upload | QR Here',
    description: 'Scan any QR code with your webcam, phone camera, or uploaded image file. 100% private, runs in your browser without an app.',
    keywords: SCANNER_KEYWORDS_STRING,
    canonicalPath: '/scan',
    ogType: 'website' as const,
  };

  return (
    <>
      <SEOHead seo={seoData} breadcrumbs={breadcrumbs} />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Webcam & File Upload Scanner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Online QR Code Scanner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan any QR code directly in your browser using your camera or an uploaded image file. Runs 100% on your device with complete privacy.
          </p>
        </header>

        {/* Scanner Workbench */}
        <section aria-label="QR Code Scanner Online" className="flex flex-col items-center">
          {result ? (
            <div className="w-full max-w-2xl md:max-w-3xl">
              <ScanResultCard result={result} onScanAgain={handleScanAgain} />
            </div>
          ) : (
            <div className="w-full max-w-2xl md:max-w-3xl bg-[#F0EAD6] dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-8">
                <button
                  type="button"
                  id="scan-tab-camera"
                  onClick={() => setMethod('camera')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                    method === 'camera'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Camera Scanner</span>
                </button>

                <button
                  type="button"
                  id="scan-tab-upload"
                  onClick={() => setMethod('image')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                    method === 'image'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
              </div>

              {method === 'camera' ? (
                <CameraScanner
                  onScanSuccess={handleScanSuccess}
                  onSwitchToUpload={() => setMethod('image')}
                />
              ) : (
                <ImageScanner onScanSuccess={handleScanSuccess} />
              )}

              {/* Test Samples Bar */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Scanner Test Scenarios
                  </span>
                  <span className="text-[11px] text-slate-400">Click to verify decoding</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleLoadTestSample('https://example.com/getting-started?ref=qr')}
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer"
                  >
                    Safe Web URL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadTestSample('WIFI:T:WPA;S:CoffeeShop_WiFi;P:LatteLove2026;;')}
                    className="px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 text-xs font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition cursor-pointer"
                  >
                    Wi-Fi Network
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadTestSample('BEGIN:VCARD\nVERSION:3.0\nN:Smith;John;;;\nFN:John Smith\nTEL:+15551234567\nEMAIL:john@example.com\nEND:VCARD')}
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer"
                  >
                    vCard Contact
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Content Section */}
        <div className="mt-16 space-y-12 max-w-4xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              How to scan QR codes online without an app
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">1</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Grant camera permission</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Allow temporary camera access in your browser, or pick the image upload tab.</p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">2</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Align the QR code</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Hold the QR code inside the viewfinder brackets or upload any screenshot.</p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">3</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Inspect and open</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Preview destination links safely before opening, or copy data to your clipboard.</p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Need to create your own QR code?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Generate customized static QR codes for links, Wi-Fi, contacts, and WhatsApp.</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shrink-0"
            >
              <span>QR Code Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
};
