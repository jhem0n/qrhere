import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  SEO_CONFIG,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../../config/seo.config';
import { getSiteUrl } from '../../config/app.config';

export const BlogPostScanFromScreenshot: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'Scan QR Code From Screenshot',
      path: '/blog/scan-qr-code-from-screenshot',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Can I scan a QR code from a screenshot?',
      answer:
        'Yes. Open the screenshot in your Photos app or Google Lens, or upload it to an online scanner.',
    },
    {
      question: 'How do I scan a QR code on the same phone?',
      answer:
        'Take a screenshot of the code, then scan it from your photo app, Google Lens, or a browser-based scanner. Your regular camera app usually cannot read it from the screen.',
    },
    {
      question: 'Do I need to install an app to scan a QR code from an image?',
      answer:
        'Usually not. Recent iPhones and Android phones have built-in options, and an online scanner works in any browser with nothing to install.',
    },
    {
      question: 'Why does my QR code image say "no QR code found"?',
      answer:
        'The image is probably cropped, blurry or low in contrast. Take a clean, full screenshot and try again.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Scan a QR Code on Your Own Phone (From a Screenshot or Image)',
          description:
            'Got a QR code as a screenshot or image? Learn how to scan it on iPhone, Android and PC, why it sometimes fails, and how to fix it. No second phone needed.',
          canonicalPath: '/blog/scan-qr-code-from-screenshot',
          datePublished: '2026-10-06',
          dateModified: '2026-10-06',
          image: `${siteUrl}/images/scan-qr-code-from-screenshot.jpg`,
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
        seo={SEO_CONFIG.blogScanFromScreenshot}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to all guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full">
              Screenshot Guide
            </span>
            <span>
              <time dateTime="2026-10-06">October 6, 2026</time>
            </span>
            <span>•</span>
            <span>4 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Scan a QR Code on Your Own Phone (From a Screenshot or Image)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Someone sends you a QR code on WhatsApp. Maybe it's a Wi-Fi code from a friend, a ticket for an event, or a payment code from a shop. You open it, look at it, and then it hits you: the code is on the same phone you're supposed to scan it with.
          </p>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/scan-qr-code-from-screenshot.jpg"
            alt="How to scan a QR code from a screenshot or saved image on your phone"
            title="How to Scan a QR Code on Your Own Phone"
            className="w-full h-auto object-cover"
            width={1280}
            height={720}
            loading="eager"
            decoding="async"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            Scan QR codes saved directly on your device without needing a second phone.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            You can't point a camera at your own screen. Well, you can, but it won't go anywhere.
          </p>
          <p>
            The good news is that you don't need a second phone. If the QR code is a screenshot or an image on your device, you can scan it straight from there. This guide shows you how on iPhone, Android and a computer, and what to do when it refuses to work.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Can you scan a QR code that's already on your phone?
            </h2>
            <p>
              Yes. A QR code is just a picture of a pattern. It doesn't matter if your camera is looking at it on a poster, or your phone is reading it from a saved image. What matters is that the picture is clear enough to read.
            </p>
            <p>
              The only thing that changes is the tool. The normal camera app is built to look at the real world, so on most phones it can't read a saved image. You'll use your photo app, Google Lens, or an online scanner instead.
            </p>
            <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-sm">
              <strong>First step:</strong> if the code is on your screen right now, take a screenshot. Then follow the steps below.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How to scan a QR code from a screenshot on iPhone
            </h2>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Method 1: Use the Photos app
              </h3>
              <ol className="list-decimal pl-6 space-y-1.5">
                <li>Open the screenshot in the Photos app.</li>
                <li>Wait a second. On recent iPhones, the code is usually picked up automatically and a small button or link shows up.</li>
                <li>If nothing shows, press and hold on the QR code itself.</li>
                <li>Tap the link or action that appears.</li>
              </ol>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Menus look a little different from one iOS version to another, and older iPhones may not offer this at all. If yours doesn't, jump to the online scanner method below.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Method 2: Use an online scanner
              </h3>
              <p>
                Open a browser-based scanner like <Link to="/" className="text-blue-600 dark:text-blue-400 underline font-semibold">QR Here</Link>, choose the image upload option, and pick the screenshot from your photos. It reads the code and shows you the text or link. It works on any iPhone with a modern browser, and it's handy when the Photos trick doesn't respond.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How to scan a QR code from an image on Android
            </h2>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Method 1: Google Photos with Google Lens
              </h3>
              <ol className="list-decimal pl-6 space-y-1.5">
                <li>Open the image in Google Photos.</li>
                <li>Tap the Lens icon at the bottom of the screen.</li>
                <li>Lens finds the code and shows you what's inside. Tap the result to open it.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Method 2: Circle to Search
              </h3>
              <p>
                Some newer Android phones have Circle to Search. If your phone has it, you can hold the home button or navigation bar while the QR code is on screen, then circle it. You don't even need to take a screenshot. If you don't see this option on your phone, don't worry, Method 1 does the same job.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Method 3: Your Gallery app
              </h3>
              <p>
                Some phone brands add QR detection to their own gallery app. Open the image and see if a link or scan button appears. It's worth a quick try before you install anything.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How to scan a QR code from an image on a computer
            </h2>
            <p>
              Laptops and desktops don't have a camera app that reads QR codes the way phones do, but you still have two easy options.
            </p>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Use an online QR code scanner
              </h3>
              <p>
                Save the image to your computer, open an online scanner, and upload it. On <Link to="/" className="text-blue-600 dark:text-blue-400 underline font-semibold">QR Here</Link>, you can drop in a PNG, JPG or WEBP file up to 10 MB. The scanning happens inside your browser, so the image isn't sent to a server.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Use Google Lens in Chrome
              </h3>
              <p>
                Right-click the image in Chrome and choose the option to search it with Google Lens. If the image is a QR code, Lens shows the link it contains. This is quick when the code is sitting on a web page.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Why your QR code screenshot won't scan
            </h2>
            <p>
              If a scan fails, it's almost never your phone's fault. It's usually the image. Here are the usual suspects.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The code is cropped
              </h3>
              <p>
                A scanner needs to see the whole code, including a bit of empty space around it. If one edge is cut off, or you caught half of a chat bubble in the screenshot, it can fail. Retake the screenshot and leave a small margin.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The image is blurry or tiny
              </h3>
              <p>
                Pictures that were forwarded through several chats get squashed each time. Ask the sender for the original file, or take a fresh screenshot straight from the source. Avoid taking a photo of a screen if you can use a screenshot instead.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The colours are inverted or low contrast
              </h3>
              <p>
                Standard QR codes are dark on a light background. A light code on a dark background, or a code in pale colours, can confuse some scanners. Try a different scanner, or ask for a normal black and white version.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The code itself is broken
              </h3>
              <p>
                Sometimes the scan works but the link leads nowhere. That means the QR code is fine and the destination is dead or expired. Only the person who made the code can fix that.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Is it safe to scan a QR code from a screenshot?
            </h2>
            <p>
              Scanning is safe. What you open afterwards is the part to think about.
            </p>
            <p>
              A screenshot can come from anyone, and fake QR codes sent in messages are a real way people get tricked into visiting bad websites. Before you tap a result, read the web address. If it looks strange, has odd spelling, or doesn't match who supposedly sent it, don't open it. Be extra careful with anything that asks for a password, a card number, or a payment you weren't expecting.
            </p>
            <p>
              For codes that hold a Wi-Fi password or contact details, look at what the scan shows you first, and only then decide whether to connect or save it. Our{' '}
              <Link to="/qr-code-security" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                QR code security guide
              </Link>{' '}
              has a longer checklist.
            </p>
          </section>

          <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Quick answers
            </h2>

            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Final thoughts
            </h2>
            <p>
              Getting a QR code on the same phone you want to scan it with is one of those small annoyances that feels bigger than it is. Take a screenshot, open it in the right tool, and you're done in under a minute.
            </p>
            <p>
              If your phone's built-in option doesn't cooperate, try the free scanner on our{' '}
              <Link to="/" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                homepage
              </Link>
              . Upload the image, see what's inside, and open it only if it looks right. And if you need to make a QR code of your own, our{' '}
              <Link to="/qr-code-generator" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                generator
              </Link>{' '}
              takes about the same amount of time.
            </p>
          </section>
        </div>
      </article>
    </>
  );
};
