import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { SEO_CONFIG, HOMEPAGE_FAQS, generateWebsiteSchema, generateFAQSchema } from '../../config/seo.config';
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

  const homepageSchema = generateWebsiteSchema([generateFAQSchema(HOMEPAGE_FAQS)]);

  return (
    <>
      <SEOHead seo={SEO_CONFIG.home} structuredData={homepageSchema} />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page Header - Single H1 on page */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            QR Code Scanner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan any QR code free with your camera or an image upload. Private, runs in your browser, no app or signup needed.
          </p>
        </header>

        {/* Scanner Card - Kept at the top */}
        <section aria-label="QR Code Scanner Online" className="flex flex-col items-center">
          {result ? (
            <div className="w-full max-w-2xl md:max-w-3xl">
              <ScanResultCard result={result} onScanAgain={handleScanAgain} />
            </div>
          ) : (
            <div className="w-full max-w-2xl md:max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
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

              {/* Test Samples Bar for Validation */}
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

        {/* Homepage Educational Content Sections (All H2s below the scanner tool) */}
        <div className="mt-16 sm:mt-20 space-y-14 sm:space-y-16 max-w-4xl mx-auto">
          {/* Section: How to scan a QR code online */}
          <section aria-labelledby="heading-how-to-scan">
            <h2 id="heading-how-to-scan" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              How to scan a QR code online
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Open the page and allow camera access
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Open QR Here in any browser and allow camera permissions, or switch to the image upload tab if you have a saved picture.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Point the camera or upload an image
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hold your QR code steadily in front of your camera, or drag and drop a screenshot or photo directly into the upload area.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Open or copy the result
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your code decodes in milliseconds. Preview the link safely, copy the text to your clipboard, or open the destination.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Camera scanning and Image upload */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Scanning Methods">
            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
                <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Camera scanning</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Scan QR codes directly using your smartphone camera or desktop webcam. Live camera video frames are processed in real time entirely within your browser memory. There is no software to install, no delay, and your video feed is never uploaded to any server.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
                <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Image upload</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Scan QR codes from screenshots, saved photos, and digital documents. Simply upload or drop your image into the scanner. Supported formats include PNG, JPG, and WEBP files up to 10 MB, all decoded privately on your device.
              </p>
            </div>
          </section>

          {/* Section: What you can scan */}
          <section aria-labelledby="heading-what-you-can-scan">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h2 id="heading-what-you-can-scan" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                What you can scan
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                QR Here automatically detects and formats standard QR code payloads, including:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Website links (URLs):</strong> Open websites, social pages, and online resources.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Wi-Fi details:</strong> View network names (SSID) and passwords to connect quickly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Contact cards:</strong> Read vCard contact information with phone, email, and name.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Payment and ticket codes:</strong> Inspect event passes, boarding passes, and invoices.</span>
                </li>
                <li className="flex items-start gap-2.5 sm:col-span-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Plain text:</strong> Decode alphanumeric messages, serial numbers, and notes.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Is it safe? */}
          <section aria-labelledby="heading-is-it-safe">
            <div className="p-6 sm:p-8 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs">
              <h2 id="heading-is-it-safe" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Is it safe?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Yes. QR Here operates completely inside your web browser using client-side processing, so your camera feed and uploaded photos never leave your device. We do not store your scans or track your activity. To learn more about identifying suspicious codes and avoiding quishing scams, check out our{' '}
                <Link
                  to="/qr-code-security"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  QR code security guide
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section: Frequently asked questions */}
          <section aria-labelledby="heading-faqs">
            <h2 id="heading-faqs" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Is QR Here free?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, QR Here is 100% free to use. There are no subscriptions, hidden fees, scan limits, or watermarks.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Does it work on iPhone and Android?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. QR Here works seamlessly on iPhones, iPads, Android smartphones, tablets, Windows PCs, and Macs using any modern web browser.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Do you store my camera feed or images?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  No. All scanning and decoding runs completely in your web browser. Your camera feed and uploaded images never leave your device and are never sent to or stored on any server.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Do I need to install an app or sign up?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  No installation or account registration is required. You can scan or create QR codes immediately directly in your browser without entering an email or password.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Which image formats are supported?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  You can upload QR code images and screenshots in PNG, JPG, and WEBP formats up to 10 MB in file size.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  How do I create my own QR code?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  You can generate your own custom QR code using our free{' '}
                  <Link
                    to="/qr-code-generator"
                    className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    QR code generator
                  </Link>
                  . Choose from options like website links, Wi-Fi networks, contact cards, and plain text, customize colors, and download as SVG or PNG.
                </p>
              </div>
            </div>
          </section>

          {/* Contextual Generator CTA Banner */}
          <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-1.5">
                Need to create a QR code?
              </h2>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Generate high-resolution PNG or vector SVG QR codes with colors, logos, and frames in seconds.
              </p>
            </div>
            <Link
              to="/qr-code-generator"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition shrink-0"
            >
              <span>QR code generator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};
