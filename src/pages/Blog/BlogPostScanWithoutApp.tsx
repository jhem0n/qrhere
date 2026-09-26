import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  SEO_CONFIG,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../../config/seo.config';
import { getSiteUrl } from '../../config/app.config';

export const BlogPostScanWithoutApp: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'How to Scan a QR Code Without an App',
      path: '/blog/how-to-scan-qr-code-without-app',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Do all smartphones have built-in QR code scanners?',
      answer:
        'Virtually all iPhones running iOS 11 or newer and Android devices running Android 9 or newer have native QR scanning built directly into their standard camera app. You do not need to install any software.',
    },
    {
      question: 'Can I scan a QR code if I am on a laptop or desktop computer?',
      answer:
        'Yes. You can use an in-browser scanner like QR Here. Open the site in your browser, allow camera access to use your webcam, or upload an image file of the code to decode it immediately.',
    },
    {
      question: 'Is it safe to scan QR codes with a third-party app from an app store?',
      answer:
        'Many free QR scanner apps in app stores are filled with aggressive ads, tracking scripts, and subscription traps. Using your built-in phone camera or a clean, client-side browser scanner is much safer and respects your privacy.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Scan a QR Code Without Installing an App',
          description:
            'A practical guide to scanning QR codes on iPhone, Android, or desktop computers using your built-in camera or a private in-browser scanner.',
          canonicalPath: '/blog/how-to-scan-qr-code-without-app',
          datePublished: '2026-09-20',
          dateModified: '2026-09-21',
        },
        siteUrl
      ),
      generateBreadcrumbSchema(breadcrumbs, siteUrl),
      generateFAQSchema(faqData),
    ],
  };

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.blogScanWithoutApp}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all guides</span>
          </Link>
        </div>

        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3 h-3" />
              Tutorial
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime="2026-09-20">September 20, 2026</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>4 min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Scan a QR Code Without Installing an App
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            You do not need to download a suspicious, ad-cluttered barcode scanner from the app store
            just to read a QR code. Your phone already has everything you need built right in, and
            you can scan codes on a computer or from image screenshots directly in your browser.
            Here is how to do it on every device.
          </p>
        </header>

        <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Use the Built-In Camera on Your iPhone or iPad
            </h2>
            <p className="mb-4">
              Apple built QR code recognition directly into the native iOS Camera app years ago. To
              scan any code:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Open your default <strong>Camera</strong> app from your home screen or lock screen.</li>
              <li>Point the rear camera steadily at the QR code. You do not need to take a photo or press the shutter button.</li>
              <li>A small yellow banner displaying the website link or action will pop up directly below the viewfinder.</li>
              <li>Tap the yellow notification banner to open the link in Safari.</li>
            </ol>
            <p>
              If nothing happens, make sure the feature is turned on in your device settings. Go to
              <strong> Settings &gt; Camera</strong> and check that <strong>Scan QR Codes</strong> is
              toggled on.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Use the Built-In Camera or Google Lens on Android
            </h2>
            <p className="mb-4">
              Almost all Android devices (Samsung Galaxy, Google Pixel, Motorola, Xiaomi, and others)
              support native scanning right out of the box:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Open the default <strong>Camera</strong> app on your device.</li>
              <li>Frame the QR code inside the camera preview for one or two seconds.</li>
              <li>A preview link will appear on screen. Tap it to visit the website.</li>
            </ol>
            <p className="mb-4">
              If your default camera app does not respond automatically, swipe down from the top of
              your screen to view your quick settings tiles. Many Android phones include a dedicated
              tile named <strong>Scan QR code</strong>. You can also tap the small Google Lens icon
              inside your camera app or the Google search bar widget on your home screen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Scan Directly in Your Web Browser (Computer or Phone)
            </h2>
            <p className="mb-4">
              If you are on a laptop, desktop PC, Chromebook, or an older tablet that does not have
              automatic scanning built in, you can scan QR codes directly in your web browser.
            </p>
            <p className="mb-4">
              Our free{' '}
              <Link
                to="/"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                online QR code scanner
              </Link>{' '}
              runs entirely inside your browser. Here is how it works:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Visit the QR Here homepage in any modern browser like Chrome, Safari, Edge, or Firefox.</li>
              <li>Click <strong>Start Camera</strong> and allow temporary camera access when prompted by your browser.</li>
              <li>Hold the QR code up to your webcam. The scanner reads the code instantly and shows you the decoded URL.</li>
            </ol>
            <p>
              Everything runs locally on your computer. Your camera video stream never gets recorded or
              uploaded to a remote server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              How to Scan a QR Code From a Photo or Screenshot
            </h2>
            <p className="mb-4">
              A very common situation is seeing a QR code while browsing on your phone or computer,
              such as on a social media post, an email, or a PDF. Since you cannot point your phone
              camera at its own screen, here is what to do:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Take a screenshot of the QR code on your phone or computer.</li>
              <li>
                Open the{' '}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  QR Here scanner
                </Link>{' '}
                and click the <strong>Upload Image</strong> tab.
              </li>
              <li>Select your screenshot or drag and drop the image into the dropzone.</li>
              <li>The tool parses the picture on your device in milliseconds and displays the destination link.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Why You Should Avoid Random App Store QR Scanners
            </h2>
            <p className="mb-4">
              If you search for "QR code scanner" in the App Store or Google Play, you will see
              hundreds of third-party utility apps. We strongly suggest avoiding most of them for a
              few reasons:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Aggressive advertising:</strong> Many free scanner apps force you to sit
                through 30-second video ads before showing you where the QR code leads.
              </li>
              <li>
                <strong>Subscription traps:</strong> Some apps trick users into signing up for weekly
                or monthly subscriptions for a basic capability that your phone already does for
                free.
              </li>
              <li>
                <strong>Data tracking:</strong> Third-party scanner apps often log your location,
                device identifiers, and every link you scan, selling your browsing activity to ad
                networks.
              </li>
            </ul>
            <p>
              Your phone native camera and clean browser tools provide a faster, safer, and ad-free
              experience. To learn more about identifying suspicious codes and protecting your data,
              read our{' '}
              <Link
                to="/qr-code-security"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR code security guide
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What to Check If a QR Code Will Not Scan
            </h2>
            <p className="mb-4">
              If your camera is struggling to recognize a code, check these quick troubleshooting
              points:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Distance and focus:</strong> Do not hold your phone too close. Give the
                camera 8 to 12 inches of breathing room so its autofocus lens can lock on sharply.
              </li>
              <li>
                <strong>Glare and lighting:</strong> If the code is printed on a glossy sticker,
                laminated paper, or displayed on a reflective computer monitor, tilt your camera
                slightly to remove the light reflection.
              </li>
              <li>
                <strong>Clean the lens:</strong> Smudges or fingerprints on your camera lens are one
                of the most common causes of scanning failure.
              </li>
              <li>
                <strong>High contrast:</strong> Ensure there is strong contrast between the dark
                modules and light background. Low-contrast or faded prints often fail to register.
              </li>
            </ul>
            <p>
              If you ever need to create your own reliable, high-contrast code for print or digital
              sharing, you can use our free{' '}
              <Link
                to="/qr-code-generator"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR code generator
              </Link>{' '}
              to generate vector SVG and high-resolution PNG files.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-5"
                >
                  <p className="font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item.question}</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Published by QR Here
            </span>
            <span>•</span>
            <span>Practical QR Guides</span>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Back to all guides</span>
            <ArrowLeft className="w-3 h-3 rotate-180" />
          </Link>
        </footer>
      </article>
    </>
  );
};
