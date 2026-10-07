import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Wifi, ShieldCheck, ArrowRight, Eye, ChevronDown, KeyRound, Laptop } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  SEO_CONFIG,
  SCAN_WIFI_FAQS,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '../../config/seo.config';
import { CameraScanner } from '../../components/scanner/CameraScanner';
import { ImageScanner } from '../../components/scanner/ImageScanner';
import { ScanResultCard } from '../../components/qr/ScanResultCard';
import { QRScanResult } from '../../types/qr.types';

export const ScanWifiPage: React.FC = () => {
  const [method, setMethod] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<QRScanResult | null>(null);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const breadcrumbs = [
    { name: 'WiFi QR Code Scanner', path: '/scan-wifi-qr-code' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebApplicationSchema(),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchema(SCAN_WIFI_FAQS),
    ],
  };

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.scanWifi}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <Wifi className="w-3.5 h-3.5" />
            <span>Free WiFi QR Code Scanner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scan WiFi QR code here - to join network
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            scan here wifi qr code to see password or join wifi network by one click. Use our fast wifi qr code scanner with your camera or an uploaded image.
          </p>
        </header>

        {/* Scanner Tool Card */}
        <section aria-label="WiFi QR Code Scanner Tool" className="flex flex-col items-center">
          {result ? (
            <div className="w-full max-w-2xl md:max-w-3xl">
              <ScanResultCard result={result} onScanAgain={() => setResult(null)} />
            </div>
          ) : (
            <div className="w-full max-w-2xl md:max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
              {/* Method Switcher */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <button
                  type="button"
                  id="wifi-tab-camera"
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
                  id="wifi-tab-upload"
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

              {/* Active Scanner Component */}
              {method === 'camera' ? (
                <CameraScanner
                  onScanSuccess={(res) => setResult(res)}
                  onSwitchToUpload={() => setMethod('image')}
                />
              ) : (
                <ImageScanner onScanSuccess={(res) => setResult(res)} />
              )}
            </div>
          )}
        </section>

        {/* Content Section */}
        <div className="mt-16 sm:mt-20 space-y-14 sm:space-y-16 max-w-5xl lg:max-w-6xl mx-auto">
          {/* Section: How to use the WiFi QR code scanner */}
          <section aria-labelledby="heading-how-to-scan-wifi">
            <h2
              id="heading-how-to-scan-wifi"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              How to use the WiFi QR code scanner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Allow camera or upload image
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Open the wifi qr code scanner in any browser. Grant camera access or drag and drop a saved photo or screenshot.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Point at the Wi-Fi code
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hold your phone or webcam steadily over the Wi-Fi code on the router, cafe table card, or rental guestbook.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  See password &amp; connect
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The wifi qr code scanner decodes the network name and password instantly. Connect in one tap or copy the password.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Why use an online WiFi QR code scanner */}
          <section aria-labelledby="heading-benefits-wifi-scanner">
            <h2
              id="heading-benefits-wifi-scanner"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              Why use an online WiFi QR code scanner?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Reveal hidden passwords
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Most native phone camera apps connect blindly without revealing the Wi-Fi password. Our wifi qr code scanner reveals the exact plain text password so you can share it with others.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Works on laptops &amp; desktops
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Laptops, MacBooks, and Windows PCs lack native QR camera readers. With our online wifi qr code scanner, you can upload a photo of the code and get the password in seconds.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  100% private &amp; client-side
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your network credentials and camera feeds are processed exclusively inside your browser memory. We never store, transmit, or log Wi-Fi passwords on external servers.
                </p>
              </div>
            </div>
          </section>

          {/* Section: What information is revealed */}
          <section aria-labelledby="heading-wifi-info-revealed">
            <div className="p-6 sm:p-8 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs">
              <h2
                id="heading-wifi-info-revealed"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"
              >
                <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>What information is decoded by the wifi qr code scanner?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Wi-Fi QR codes follow standard protocol schemas (<code className="text-xs bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono">WIFI:T:WPA;S:Network;P:Password;;</code>). When scanned by our wifi qr code scanner, you get:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong>Network SSID:</strong> The exact broadcast name of the wireless router.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong>Network Password:</strong> The security passkey with a reveal/hide toggle and copy button.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong>Security Protocol:</strong> Identifies WPA, WPA2, WPA3, WEP, or Open unencrypted networks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span><strong>Hidden Status:</strong> Displays whether the SSID is broadcast publicly or hidden.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Frequently Asked Questions */}
          <section aria-labelledby="heading-wifi-scanner-faqs">
            <h2
              id="heading-wifi-scanner-faqs"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              Frequently asked questions about WiFi QR code scanner
            </h2>
            <div className="space-y-3">
              {SCAN_WIFI_FAQS.map((faq, index) => {
                const isOpen = openFaqIndexes.includes(index);
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Generator Cross-Link CTA */}
          <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-1.5">
                Need to create a WiFi QR code?
              </h2>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Generate a custom Wi-Fi QR code with your network name, password, and custom frames for your home, cafe, or Airbnb.
              </p>
            </div>
            <Link
              to="/qr-code-generator-wifi"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition shrink-0 shadow-sm"
            >
              <span>WiFi QR Code Maker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};
