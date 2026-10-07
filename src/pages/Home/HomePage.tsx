import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { SEO_CONFIG, HOMEPAGE_FAQS, generateWebsiteSchema, generateFAQSchema } from '../../config/seo.config';
import { CameraScanner } from '../../components/scanner/CameraScanner';
import { ImageScanner } from '../../components/scanner/ImageScanner';
import { ScanResultCard } from '../../components/qr/ScanResultCard';
import { QRScanResult } from '../../types/qr.types';

export const HomePage: React.FC = () => {
  const [method, setMethod] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<QRScanResult | null>(null);

  const handleScanSuccess = (scanRes: QRScanResult) => {
    setResult(scanRes);
  };

  const handleScanAgain = () => {
    setResult(null);
  };

  const homepageSchema = generateWebsiteSchema([generateFAQSchema(HOMEPAGE_FAQS)]);

  return (
    <>
      <SEOHead seo={SEO_CONFIG.home} structuredData={homepageSchema} />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page Header - Single H1 on page */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scan here QR Code
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
            </div>
          )}
        </section>

        {/* Homepage Educational Content Sections (All H2s below the scanner tool) */}
        <div className="mt-16 sm:mt-20 space-y-14 sm:space-y-16 max-w-5xl lg:max-w-6xl mx-auto">
          {/* Section: How to scan a QR code online */}
          <section aria-labelledby="heading-how-to-scan">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: How to scan content & 3 steps */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h2 id="heading-how-to-scan" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                  How to scan a QR code online
                </h2>

                <div className="space-y-4">
                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                        Open the page and allow camera access
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        Open QR Here in any browser and allow camera permissions, or switch to the image upload tab if you have a saved picture.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                        Point the camera or upload an image
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        Hold your QR code steadily in front of your camera, or drag and drop a screenshot or photo directly into the upload area.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                        Open or copy the result
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        Your code decodes in milliseconds. Preview the link safely, copy the text to your clipboard, or open the destination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-md lg:max-w-none aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 shadow-sm">
                  <img
                    src="/images/qr-code-scan.jpg"
                    alt="How to scan a QR code online"
                    title="How to scan a QR code online"
                    width={900}
                    height={1350}
                    className="w-full h-full object-cover rounded-3xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Image - Unboxed presentation */}
              <div className="lg:col-span-7 flex items-center justify-center">
                <div className="w-full flex items-center justify-center">
                  <img
                    src="/images/qr-type.png"
                    alt="What you can scan - QR code types"
                    title="What you can scan - QR code types"
                    width={1500}
                    height={800}
                    className="w-full h-auto object-contain rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Right Column: What you can scan content - Unboxed */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 id="heading-what-you-can-scan" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  What you can scan
                </h2>
                <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Website links (URLs) scanner:</strong> Open websites, social pages, and online resources.
                  </li>
                  <li>
                    <strong>Wi-Fi QR code scanner:</strong> View network names (SSID) and passwords to connect quickly.
                  </li>
                  <li>
                    <strong>WhatsApp chat links:</strong> Open WhatsApp conversations and view contact numbers or messages.
                  </li>
                  <li>
                    <strong>Location and map links:</strong> Open Google Maps pins, navigation routes, and coordinates.
                  </li>
                  <li>
                    <strong>Contact cards:</strong> Read vCard contact information with phone, email, and name.
                  </li>
                  <li>
                    <strong>Payment and ticket codes:</strong> Inspect event passes, boarding passes, and invoices.
                  </li>
                  <li>
                    <strong>QR code to text:</strong> Decode alphanumeric messages, serial numbers, and notes.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: What Does "Scan Here" on a QR Code Mean? */}
          <section aria-labelledby="heading-scan-here-meaning" className="p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="max-w-4xl">
              <h2 id="heading-scan-here-meaning" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                What Does "Scan Here" on a QR Code Mean?
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                &ldquo;Please scan here&rdquo; is a prompt printed next to a QR code. It tells you to open your phone camera, point it at the code, and tap the link that appears. With QR Here you can do the same from your browser, with no app. Here are the most common prompts and what they open:
              </p>

              {/* Common prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Scan here to pay
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Opens a payment page or wallet. Check the link carefully before you pay.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Scan here to learn more
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Opens a website, menu, brochure, or product page.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Scan here for location
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Opens a map pin with directions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Scan here to join
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Connects you to a Wi-Fi network, meeting, or event.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 sm:col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Scan here to contact us
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Opens WhatsApp, a phone call, SMS, email, or a contact card.
                  </p>
                </div>
              </div>

              {/* Wi-Fi and WhatsApp paragraph */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 mb-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Need a{' '}
                <Link
                  to="/scan-wifi-qr-code"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  WiFi QR code scanner
                </Link>
                ? Scan a Wi-Fi code to see the network name and password. Need a{' '}
                <Link
                  to="/scan-whatsapp-qr-code"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  WhatsApp QR code scanner
                </Link>
                ? Scan the code to see the chat link before you open it. Both work with your camera or an image upload.
              </div>

              {/* Closing link line */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                Want to make your own &ldquo;scan here&rdquo; code? Try our{' '}
                <Link
                  to="/qr-code-generator"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  QR code generator
                </Link>
                .
              </p>
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
                  What does "scan here" mean?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  It is an instruction to point your phone camera at the QR code to open what it contains.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Can I scan a Wi-Fi or WhatsApp QR code online?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. Use your camera or upload a screenshot, and the details or link appear before you open anything.
                </p>
              </div>

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
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition shrink-0 shadow-sm"
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
