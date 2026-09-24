import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, ArrowRight, HelpCircle } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { SEO_CONFIG, generateWebsiteSchema } from '../../config/seo.config';
import { CameraScanner } from '../../components/scanner/CameraScanner';
import { ImageScanner } from '../../components/scanner/ImageScanner';
import { ScanResultCard } from '../../components/qr/ScanResultCard';
import { QRScanResult } from '../../types/qr.types';
import { QRScannerService } from '../../services/qr/scanner.service';

export const HomePage: React.FC = () => {
  const [method, setMethod] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<QRScanResult | null>(null);

  const handleScanSuccess = (scanRes: QRScanResult) => {
    setResult(scanRes);
  };

  const handleScanAgain = () => {
    setResult(null);
  };

  // Test triggers for scanner verification
  const handleLoadTestSample = (sampleText: string) => {
    const formatted = QRScannerService.formatScanResult(sampleText, 'image');
    setResult(formatted);
  };

  const homepageSchema = generateWebsiteSchema();

  return (
    <>
      <SEOHead seo={SEO_CONFIG.home} structuredData={homepageSchema} />

      <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <header className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            QR Code Scanner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
            The QR code scanner online lets you scan QR codes without any app. Upload an image or use your camera to scan a QR code.
          </p>
        </header>

        {/* Scanner Card */}
        <section aria-label="QR Code Scanner Online" className="flex flex-col items-center">
          {result ? (
            <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
              <ScanResultCard result={result} onScanAgain={handleScanAgain} />
            </div>
          ) : (
            <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-[#F0EAD6] dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
              {/* Method Switcher */}
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

              {/* Scanning Active Component */}
              {method === 'camera' ? (
                <CameraScanner
                  onScanSuccess={handleScanSuccess}
                  onSwitchToUpload={() => setMethod('image')}
                />
              ) : (
                <ImageScanner onScanSuccess={handleScanSuccess} />
              )}

              {/* Test Samples Bar for Optical & Safety Validation */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Scanner Test Scenarios
                  </span>
                  <span className="text-[11px] text-slate-400">Click to verify security &amp; decoding</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    id="test-safe-url-btn"
                    onClick={() => handleLoadTestSample('https://example.com/getting-started?ref=qr')}
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 transition cursor-pointer min-h-[38px]"
                  >
                    Safe Web URL
                  </button>
                  <button
                    type="button"
                    id="test-dangerous-scheme-btn"
                    onClick={() => handleLoadTestSample('javascript:alert(document.domain)')}
                    className="px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-xs font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition cursor-pointer min-h-[38px]"
                  >
                    Dangerous Scheme (javascript:)
                  </button>
                  <button
                    type="button"
                    id="test-data-uri-btn"
                    onClick={() => handleLoadTestSample('data:text/html,<script>alert("XSS")</script>')}
                    className="px-2.5 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-[11px] font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition cursor-pointer min-h-[36px]"
                  >
                    Dangerous Data URI
                  </button>
                  <button
                    type="button"
                    id="test-wifi-btn"
                    onClick={() => handleLoadTestSample('WIFI:T:WPA;S:StudioGuestWifi;P:SuperSecretPass2026;;')}
                    className="px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 text-[11px] font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition cursor-pointer min-h-[36px]"
                  >
                    Wi-Fi Network
                  </button>
                  <button
                    type="button"
                    id="test-unicode-btn"
                    onClick={() => handleLoadTestSample('こんにちは世界 🚀 Привет мир مرحبا بالعالم')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 transition cursor-pointer min-h-[36px]"
                  >
                    Unicode Text
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Detailed Semantic Instructions & Technical Guidance */}
        <section aria-label="Scanner Instructions & Technical Guidelines" className="mt-14">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                How to Scan QR Codes Online
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our web application provides two flexible methods to decode any QR code on desktop or mobile browsers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Using Your Camera (Webcam or Mobile)</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Click "Start Camera" to activate your webcam or mobile back camera. Grant temporary camera permissions when prompted by your browser. Point your camera at the QR code and align it within the square viewfinder guide.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Uploading an Image File</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Drag and drop or browse for an existing image from your photo library or disk. Supported formats include PNG, JPG, JPEG, and WEBP files up to 10 MB in size.
                </p>
              </div>
            </div>

            {/* Contextual Cross-Links */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Need to create a new QR code?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Generate high-resolution PNG or vector SVG codes for URLs, Wi-Fi networks, and contact details.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  to="/qr-code-generator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                >
                  <span>Create QR Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Scanner FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
