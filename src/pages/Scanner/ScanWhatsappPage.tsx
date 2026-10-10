import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, ShieldCheck, ChevronDown } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG, generateBreadcrumbSchema } from '../../config/seo.config';
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
    { name: 'Home', path: '/' },
    { name: 'WhatsApp QR Code Scanner', path: '/scan-whatsapp-qr-code' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QR Here',
        url: window.location.origin + '/scan-whatsapp-qr-code',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (web browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      generateBreadcrumbSchema(breadcrumbs),
    ],
  };

  const faqs = [
    {
      question: 'How do I scan a WhatsApp QR code?',
      answer:
        'Open our scanner tab, allow camera access or upload a saved screenshot of the WhatsApp QR code. The app decodes the chat link instantly in your browser.',
    },
    {
      question: 'Can I scan a WhatsApp QR code from a screenshot?',
      answer:
        'Yes. Switch to the Upload Image tab and select or drag and drop any screenshot or image file containing a WhatsApp chat code.',
    },
    {
      question: 'Can I see the phone number before opening WhatsApp?',
      answer:
        'Yes! The scanner extracts and displays the full international phone number and any pre-filled greeting message on screen before you decide to open the chat.',
    },
    {
      question: 'Is this the same as WhatsApp Web login?',
      answer:
        'No. WhatsApp Web login QR codes must be scanned inside the mobile WhatsApp app under Linked Devices. This page is specifically designed for scanning contact chat links and wa.me URLs.',
    },
    {
      question: 'Is it safe to scan WhatsApp QR codes?',
      answer:
        'Yes. Scanning on QR Here is 100% private because all processing happens locally in your browser. However, never scan or authorize unknown login codes sent by strangers to protect your account.',
    },
    {
      question: 'How do I make a WhatsApp QR code?',
      answer:
        'You can generate your own custom WhatsApp click-to-chat QR code using our free QR code maker. Enter your phone number and default greeting message, then download as an SVG or PNG.',
    },
  ];

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            WhatsApp QR Code Scanner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan a WhatsApp QR code to preview the phone number and pre-filled message before you open the chat. Decoding happens in your browser, so nothing is uploaded.
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
        <div className="mt-16 sm:mt-20 space-y-14 sm:space-y-16 max-w-4xl mx-auto text-slate-700 dark:text-slate-300">
          
          {/* What this scanner reads */}
          <section aria-labelledby="heading-whatsapp-reads">
            <h2 id="heading-whatsapp-reads" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What this scanner reads
            </h2>
            <p className="text-base leading-relaxed mb-4">
              WhatsApp QR codes and click-to-chat links are designed to streamline instant messaging without manual phone number entry. Our specialized scanner parses these payloads instantly within your browser environment.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">wa.me and api.whatsapp.com links</strong>
                Standardized URL structures that initiate direct messaging conversations with specific phone numbers.
              </li>
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">WhatsApp chat QR codes</strong>
                Encoded square patterns found on business cards, flyers, and storefront posters containing international telephone digits and optional welcome notes.
              </li>
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">WhatsApp Business links</strong>
                Catalog and business contact identifiers that open verified enterprise support channels.
              </li>
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">Pre-filled greeting messages</strong>
                Automated text payloads that populate the chat input field the moment you open the conversation.
              </li>
            </ul>
          </section>

          {/* How to scan a WhatsApp QR code */}
          <section aria-labelledby="heading-how-to-scan-whatsapp">
            <h2 id="heading-how-to-scan-whatsapp" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              How to scan a WhatsApp QR code
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Decoding a messaging QR code takes only a few seconds with our browser-based utility.
            </p>
            <ol className="space-y-4 text-base">
              <li className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-1">Open camera tab or upload a screenshot</strong>
                  Select camera mode to use your live webcam or mobile lens, or choose image upload if you saved a screenshot of the code.
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-1">Review the phone number and message</strong>
                  The parsed phone number, link destination, and pre-filled message appear immediately on your screen for safe inspection.
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-1">Open in WhatsApp or copy the link</strong>
                  Tap the button to launch the chat directly in WhatsApp, or copy the raw link and phone number to your clipboard.
                </div>
              </li>
            </ol>
          </section>

          {/* Scan a WhatsApp QR code on any device */}
          <section aria-labelledby="heading-whatsapp-devices">
            <h2 id="heading-whatsapp-devices" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Scan a WhatsApp QR code on any device
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Our web tool runs smoothly across all major operating systems and web browsers.
            </p>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">iPhone and Android</h3>
                <p className="text-base leading-relaxed">
                  Use your mobile browser to scan codes on posters or packaging without switching between apps. You can preview recipient numbers before launching your messaging app.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Windows PC and laptop</h3>
                <p className="text-base leading-relaxed">
                  Working on a Windows computer? Use your laptop webcam or upload screenshot files to inspect chat links without picking up your phone.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Mac and MacBook</h3>
                <p className="text-base leading-relaxed">
                  Open Safari or Chrome on macOS to decode WhatsApp QR codes from digital documents, PDFs, or photos with complete privacy.
                </p>
              </div>
            </div>
          </section>

          {/* Is it safe to scan a WhatsApp QR code? */}
          <section aria-labelledby="heading-whatsapp-safety">
            <h2 id="heading-whatsapp-safety" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Is it safe to scan a WhatsApp QR code?
            </h2>
            <p className="text-base leading-relaxed mb-4">
              Chat QR codes are generally safe because they only open a conversation with a specific phone number. However, you should always preview the destination link before opening it. Never scan or authorize a WhatsApp Web / Linked Devices login code sent by an unknown person, as doing so can grant attackers full access to your personal account. Read our <Link to="/qr-code-security" className="text-emerald-600 dark:text-emerald-400 underline hover:opacity-80">QR code security guide</Link> for more tips.
            </p>
            <div className="p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Client-side privacy:</strong> All image analysis and decoding occur locally in your browser memory. We never store phone numbers, log chat links, or transmit your data externally.
              </span>
            </div>
          </section>

          {/* Frequently asked questions */}
          <section aria-labelledby="heading-whatsapp-faqs">
            <h2 id="heading-whatsapp-faqs" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => {
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
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.question}
                      </h3>
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

          {/* Related Links Block */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-900 dark:text-white mb-3">Related scanning and generation tools:</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link to="/qr-code-generator-whatsapp" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  create a WhatsApp QR code
                </Link>
              </li>
              <li>
                <Link to="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  QR code scanner
                </Link>
              </li>
              <li>
                <Link to="/qr-code-security" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  QR code security guide
                </Link>
              </li>
              <li>
                <Link to="/scan-wifi-qr-code" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  WiFi QR code scanner
                </Link>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </>
  );
};
