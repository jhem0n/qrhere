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
    { name: 'Home', path: '/' },
    { name: 'WiFi QR Code Scanner', path: '/scan-wifi-qr-code' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QR Here',
        url: window.location.origin + '/scan-wifi-qr-code',
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
      question: 'Can I see the password from a WiFi QR code?',
      answer:
        'Yes. When you scan a Wi-Fi QR code with our scanner, it decodes the standard Wi-Fi configuration string directly in your browser. It extracts and displays the network name (SSID), security type, and the plain text password so you can view or copy it.',
    },
    {
      question: 'Can I scan a WiFi QR code from a screenshot?',
      answer:
        'Yes. Switch to the Upload Image tab and select or drag and drop any saved screenshot or photo of a Wi-Fi code. The scanner reads the image instantly without uploading anything to external servers.',
    },
    {
      question: 'Does this work on iPhone, Android and PC?',
      answer:
        'Yes, it works in any modern web browser across iPhone, Android, Windows PC, Mac, and Linux. While mobile cameras can join networks directly, this online tool is especially useful for revealing passwords or scanning from desktop screens.',
    },
    {
      question: 'Is it safe to scan a WiFi QR code?',
      answer:
        'Scanning on QR Here is 100% private because all decoding happens locally inside your browser memory. However, you should only connect to wireless networks and routers that you personally trust.',
    },
    {
      question: 'Why does my WiFi QR code not scan?',
      answer:
        'Scanning failures are usually caused by poor lighting, blur, glare on a shiny laminated print, or low image resolution. Make sure the code is well-lit, steady, and entirely visible within the frame.',
    },
    {
      question: 'How do I make a WiFi QR code?',
      answer:
        'You can generate your own custom Wi-Fi QR code using our free QR code maker. Enter your network SSID and password, customize colors or frames, and download it as an SVG or PNG file for printing.',
    },
  ];

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            WiFi QR Code Scanner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan a WiFi QR code with your camera or upload a screenshot to see the network name, security type and password. Everything is decoded in your browser, so nothing is uploaded.
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
        <div className="mt-16 sm:mt-20 space-y-14 sm:space-y-16 max-w-4xl mx-auto text-slate-700 dark:text-slate-300">
          
          {/* What a WiFi QR code contains */}
          <section aria-labelledby="heading-wifi-contents">
            <h2 id="heading-wifi-contents" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What a WiFi QR code contains
            </h2>
            <p className="text-base leading-relaxed mb-4">
              Wireless QR codes encode network connection details following the standardized URI configuration format: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono">WIFI:S:&lt;name&gt;;T:&lt;security&gt;;P:&lt;password&gt;;;</code>. When parsed correctly by our client-side scanner, the data structure breaks down into clear components that give you total visibility before connecting your devices.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">Network name (SSID)</strong>
                The exact broadcast identifier name of the wireless router so you know which network you are inspecting.
              </li>
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">Security type</strong>
                Indicates whether the network utilizes WPA, WPA2, WPA3, WEP encryption, or remains completely open.
              </li>
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">Password</strong>
                The exact security passkey displayed with a convenient copy button so you can paste it into any device settings.
              </li>
              <li className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <strong className="block text-slate-900 dark:text-white mb-1">Hidden-network flag</strong>
                Flags whether the wireless router hides its SSID broadcast or announces itself publicly to nearby devices.
              </li>
            </ul>
          </section>

          {/* How to scan a WiFi QR code */}
          <section aria-labelledby="heading-how-to-scan">
            <h2 id="heading-how-to-scan" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              How to scan a WiFi QR code
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Scanning wireless codes online takes just a few seconds whether you are using a smartphone camera or an archived screenshot on your desktop computer.
            </p>
            <ol className="space-y-4 text-base">
              <li className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-1">Open the camera tab or upload a screenshot</strong>
                  Choose the camera scanner mode to use your live webcam or mobile lens, or switch to the image upload tab if you saved a photo of the code.
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-1">View the decoded network details</strong>
                  The scanner instantly processes the payload in your browser and displays the SSID, security protocol, and password on your screen.
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-1">Copy the password or use Wi-Fi settings</strong>
                  Copy the plain text password to your clipboard with one click, or enter it manually into your device's Wi-Fi settings panel to establish your connection.
                </div>
              </li>
            </ol>
          </section>

          {/* Scan a WiFi QR code on any device */}
          <section aria-labelledby="heading-any-device">
            <h2 id="heading-any-device" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Scan a WiFi QR code on any device
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Our web-based scanner works seamlessly across different hardware platforms without requiring app store downloads or proprietary software installations.
            </p>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">iPhone and Android</h3>
                <p className="text-base leading-relaxed">
                  While modern smartphone camera apps can join wireless networks directly when pointed at a code, this page is especially useful when you need to see and copy the actual password to share with family members or guests.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Windows PC and laptop</h3>
                <p className="text-base leading-relaxed">
                  Windows laptops lack native built-in QR readers. You can easily use your built-in webcam or upload a screenshot of the network code to retrieve the password instantly.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Mac and MacBook</h3>
                <p className="text-base leading-relaxed">
                  MacBooks and iMacs can access this page directly in Safari, Chrome, or Firefox. Use your FaceTime camera or drag and drop a received image file to decode network credentials in seconds.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Smart TV, console or other devices with no camera</h3>
                <p className="text-base leading-relaxed">
                  Devices like smart TVs, streaming boxes, and gaming consoles often lack cameras. Use your phone to read the password here, then type it into your TV or console's network configuration menu.
                </p>
              </div>
            </div>
          </section>

          {/* Find a WiFi password from a QR code */}
          <section aria-labelledby="heading-find-password">
            <h2 id="heading-find-password" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Find a WiFi password from a QR code
            </h2>
            <p className="text-base leading-relaxed">
              If you took a photo of a router sticker during a hotel stay, cafe visit, or friend's house party and forgot the password later, you do not need to hunt down the physical router again. Simply upload your saved photo to our browser scanner. The tool extracts the plain text password instantly, saving you time and hassle.
            </p>
          </section>

          {/* Is it safe? */}
          <section aria-labelledby="heading-is-it-safe">
            <h2 id="heading-is-it-safe" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Is it safe?
            </h2>
            <p className="text-base leading-relaxed mb-3">
              All decoding occurs 100% client-side inside your browser. Your camera stream, uploaded screenshots, and extracted passwords are never uploaded, logged, or stored on any external server. However, for your personal online security, only join wireless networks and routers that you trust. Read more in our <Link to="/qr-code-security" className="text-blue-600 dark:text-blue-400 underline hover:opacity-80">QR code security guide</Link>.
            </p>
          </section>

          {/* Frequently asked questions */}
          <section aria-labelledby="heading-wifi-faqs">
            <h2 id="heading-wifi-faqs" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
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

          {/* Related Links Block */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-900 dark:text-white mb-3">Related scanning and generation tools:</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link to="/qr-code-generator-wifi" className="text-blue-600 dark:text-blue-400 hover:underline">
                  create a WiFi QR code
                </Link>
              </li>
              <li>
                <Link to="/blog/how-to-create-wifi-qr-code" className="text-blue-600 dark:text-blue-400 hover:underline">
                  how to create a WiFi QR code
                </Link>
              </li>
              <li>
                <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  QR code scanner
                </Link>
              </li>
              <li>
                <Link to="/qr-code-security" className="text-blue-600 dark:text-blue-400 hover:underline">
                  QR code security guide
                </Link>
              </li>
              <li>
                <Link to="/scan-whatsapp-qr-code" className="text-blue-600 dark:text-blue-400 hover:underline">
                  WhatsApp QR code scanner
                </Link>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </>
  );
};
