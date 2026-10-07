import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, MessageSquare, ShieldCheck, ArrowRight, Eye, ChevronDown, PhoneCall, UserCheck } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  SEO_CONFIG,
  SCAN_WHATSAPP_FAQS,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '../../config/seo.config';
import { CameraScanner } from '../../components/scanner/CameraScanner';
import { ImageScanner } from '../../components/scanner/ImageScanner';
import { ScanResultCard } from '../../components/qr/ScanResultCard';
import { QRScanResult } from '../../types/qr.types';

export const ScanWhatsappPage: React.FC = () => {
  const [method, setMethod] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<QRScanResult | null>(null);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const breadcrumbs = [
    { name: 'WhatsApp QR Code Scanner', path: '/scan-whatsapp-qr-code' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebApplicationSchema(),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchema(SCAN_WHATSAPP_FAQS),
    ],
  };

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.scanWhatsapp}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Free WhatsApp QR Code Scanner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scan WhatsApp QR Code - to start chat
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            scan here WhatsApp qr code to join chat or see phone number instant by one click. Use our free whatsapp qr code scanner with your live camera or a saved image.
          </p>
        </header>

        {/* Scanner Tool Card */}
        <section aria-label="WhatsApp QR Code Scanner Tool" className="flex flex-col items-center">
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
                  id="whatsapp-tab-camera"
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
                  id="whatsapp-tab-upload"
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
          {/* Section: How to use the WhatsApp QR code scanner */}
          <section aria-labelledby="heading-how-to-scan-whatsapp">
            <h2
              id="heading-how-to-scan-whatsapp"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              How to use the WhatsApp QR code scanner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Open scanner or upload image
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Open the whatsapp qr code scanner in your browser. Use your camera or upload a saved photo or screenshot.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Scan the WhatsApp code
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Point your camera at the QR code on a shop flyer, business card, product packaging, or website screen.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  See phone number &amp; chat
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our whatsapp qr code scanner reveals the phone number and welcome message. Tap to chat or copy the number.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Why use an online WhatsApp QR code scanner */}
          <section aria-labelledby="heading-benefits-whatsapp-scanner">
            <h2
              id="heading-benefits-whatsapp-scanner"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              Why use an online WhatsApp QR code scanner?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  No need to save contacts
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Avoid cluttering your address book with one-time service numbers. Our whatsapp qr code scanner lets you inspect numbers and start chats without saving contacts first.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Preview phone numbers safely
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Preview the full country code, mobile number, and pre-filled message before opening WhatsApp. This protects you from suspicious redirects and unwanted spam.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  100% free &amp; private
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our whatsapp qr code scanner decodes every image in your browser memory. We never record phone numbers, store images, or track your communications.
                </p>
              </div>
            </div>
          </section>

          {/* Section: What information is revealed */}
          <section aria-labelledby="heading-whatsapp-info-revealed">
            <div className="p-6 sm:p-8 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs">
              <h2
                id="heading-whatsapp-info-revealed"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"
              >
                <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>What information is decoded by the whatsapp qr code scanner?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                WhatsApp QR codes generally encode official <code className="text-xs bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400 font-mono">wa.me/[phone]?text=[message]</code> links. When parsed by our whatsapp qr code scanner, you get:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span><strong>Full Phone Number:</strong> Displays the complete telephone number with country dial code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span><strong>Welcome Message:</strong> Shows any pre-written text ready to be sent in the chat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span><strong>Direct Chat Link:</strong> One-tap button to open WhatsApp on mobile or WhatsApp Web on desktop.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span><strong>Copy Number Button:</strong> Copy the raw telephone number to your clipboard with one click.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Frequently Asked Questions */}
          <section aria-labelledby="heading-whatsapp-scanner-faqs">
            <h2
              id="heading-whatsapp-scanner-faqs"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
            >
              Frequently asked questions about WhatsApp QR code scanner
            </h2>
            <div className="space-y-3">
              {SCAN_WHATSAPP_FAQS.map((faq, index) => {
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
                          isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
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
                Need to create a WhatsApp QR code?
              </h2>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Generate a custom WhatsApp click-to-chat QR code with your phone number, custom greeting message, and official logo.
              </p>
            </div>
            <Link
              to="/qr-code-generator-whatsapp"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition shrink-0 shadow-sm"
            >
              <span>WhatsApp QR Code Maker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};
