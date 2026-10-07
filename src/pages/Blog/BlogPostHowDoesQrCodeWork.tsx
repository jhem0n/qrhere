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

export const BlogPostHowDoesQrCodeWork: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'How Does a QR Code Work',
      path: '/blog/how-does-a-qr-code-work',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Can a QR code have a virus?',
      answer:
        'The code itself is just data, like a line of text. The risk is where it sends you. A fake code can point to a harmful website, so check the address your phone shows before you open it.',
    },
    {
      question: 'Why do QR codes have three big squares?',
      answer:
        'They let the scanner find the code and tell which way up it is. With only three, the empty corner gives the code a clear orientation.',
    },
    {
      question: 'Do QR codes expire?',
      answer:
        'A static code never expires, because the information is built directly into the pattern. A dynamic code can stop working if the redirect service behind it ends or lapses.',
    },
    {
      question: 'Can a QR code be read upside down or at an angle?',
      answer:
        'Yes. The three big corner squares let scanners recognise the code from nearly any angle, and the alignment patterns help correct tilt and bending.',
    },
    {
      question: 'Is every QR code the same?',
      answer:
        'They all follow the standard ISO/IEC 18004 specification, but they differ in version size (from 21x21 up to 177x177 modules), error correction levels (L, M, Q, H), and what data they encode.',
    },
    {
      question: 'Do QR codes need the internet?',
      answer:
        'No. Scanning and decoding a QR code happens entirely offline on your device. You only need an internet connection if the decoded content is a web URL you want to visit.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: "How Does a QR Code Work? What's Really Inside That Square",
          description:
            'Ever wondered how a QR code works? Learn what is inside the square, how your phone reads it in a second, and why a damaged code can still scan.',
          canonicalPath: '/blog/how-does-a-qr-code-work',
          datePublished: '2026-10-06',
          dateModified: '2026-10-06',
          image: `${siteUrl}/images/qr-code-anatomy.svg`,
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
        seo={SEO_CONFIG.blogHowDoesQrCodeWork}
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
              Technology Explained
            </span>
            <span>
              <time dateTime="2026-10-06">October 6, 2026</time>
            </span>
            <span>•</span>
            <span>6 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How Does a QR Code Work? What&apos;s Really Inside That Square
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            You point your phone at a little black and white square. A second later, a website opens, a Wi-Fi network connects, or a payment screen appears. It feels like magic.
          </p>
        </header>

        {/* Featured Visual Diagram: Anatomy of a QR Code */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <img
            src="/images/qr-code-anatomy.svg"
            alt="Anatomy of a QR code: labelled diagram showing finder patterns, timing patterns, alignment pattern, format info, quiet zone, and data area"
            title="Anatomy of a QR Code – What's Inside the Square"
            className="w-full h-auto object-contain"
            width={960}
            height={620}
            loading="eager"
            decoding="async"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
            A version 2 QR code breakdown showing finder patterns, timing belts, alignment squares, and data blocks.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            It isn&apos;t. A QR code is a very tidy way of writing information down so that a camera can read it fast, even when the picture is crooked, blurry, or a bit damaged. Once you see how it&apos;s built, the square stops looking random.
          </p>
          <p>
            Here&apos;s what&apos;s going on, in plain language.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The short answer
            </h2>
            <p>
              A QR code is a grid of tiny black and white squares called modules. Together they spell out a message in a simple code, the same way letters spell words. Your phone&apos;s camera sees the grid, works out how it&apos;s turned and sized, reads the squares, fixes any mistakes, and turns them back into text, like a link.
            </p>
            <p>
              That&apos;s it. The rest of this post is how each of those steps works.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What&apos;s inside a QR code
            </h2>
            <p>
              Every QR code has the same set of parts. Some help the scanner find the code. Others hold the actual message.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The three big squares in the corners
              </h3>
              <p>
                These are the finder patterns. They are the first thing a scanner looks for. Each one is built from dark, light and dark rings in a fixed ratio, which is unusual enough that it rarely appears by accident in normal printing.
              </p>
              <p>
                There are three, not four, on purpose. Because one corner is missing, the scanner can tell which way up the code is, even if you hold it sideways or upside down.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The small square and the dotted lines
              </h3>
              <p>
                Larger codes have smaller squares inside called alignment patterns, which help the scanner fix any bending or tilt. Two lines of alternating black and white dots, called timing patterns, run between the big squares. By counting them, the scanner learns the exact size of each module and can lay an accurate grid over the whole code.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The blank border
              </h3>
              <p>
                Around the code is a plain empty margin called the quiet zone. The standard asks for at least four modules of space. It keeps nearby text, pictures or edges from being mistaken for part of the code. If you&apos;ve ever had a QR code that wouldn&apos;t scan because it was printed too close to other things, this is why.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The format information
              </h3>
              <p>
                Near the big squares, a small strip of modules tells the scanner two things: how much error correction the code uses, and which mask pattern was applied. Both are explained below.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The data area
              </h3>
              <p>
                Everything else is the message itself, plus extra &quot;backup&quot; data used to fix errors. This is the speckled part that looks like random noise. It isn&apos;t random at all.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How your phone reads a QR code, step by step
            </h2>
            <p>
              This all happens in a fraction of a second:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>The camera takes a picture and turns it into black and white.</li>
              <li>The software searches for the three finder patterns.</li>
              <li>It works out which way the code is turned and how big it is, using the timing and alignment patterns to straighten any distortion.</li>
              <li>It reads the format information to learn the error correction level and the mask.</li>
              <li>It removes the mask and reads the modules in a zigzag path across the grid.</li>
              <li>It uses the backup data to fix any mistakes, such as a smudge or a blurry spot.</li>
              <li>It turns the result back into readable text.</li>
              <li>Your phone decides what to do with that text. A web address shows a link. A Wi-Fi code offers to connect. A contact card offers to save.</li>
            </ol>
            <p>
              About the mask in step 5: when a code is created, the generator tries eight different patterns that flip some of the squares. It picks the one that avoids big blocks of the same colour or shapes that look like finder patterns, since both can confuse a scanner. Your phone just undoes that pattern when it reads.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How a QR code stores information
            </h2>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Numbers, letters and text
              </h3>
              <p>
                A QR code can pack different kinds of data. It has separate modes for numbers only, for capital letters and numbers, for general text, and for Japanese Kanji characters. Numbers-only is the most compact, which is why a code with only digits looks simpler than one with a long web address.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How much it can hold
              </h3>
              <p>
                The size of a QR code is called its version. Version 1 is a grid of 21 by 21 modules. Each version adds four more modules per side, up to version 40, which is 177 by 177.
              </p>
              <p>
                At its largest, with the lowest error correction, one code can hold up to 7,089 digits, 4,296 letters and numbers, or 2,953 bytes of general text. In practice, most codes hold far less, such as a short link, because a small code scans more easily than a dense one.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                What a Wi-Fi code actually contains
              </h3>
              <p>
                A QR code doesn&apos;t contain anything magical. A Wi-Fi code just holds a line of text in a standard format, something like this:
              </p>
              <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-mono overflow-x-auto text-slate-800 dark:text-slate-200">
                WIFI:T:WPA;S:MyNetwork;P:mypassword;;
              </pre>
              <p>
                That says: security type WPA, network name MyNetwork, password mypassword. Your phone recognises that format and offers to connect. The same idea works for links, phone numbers, emails, locations and contact cards. Each one is just text written in a pattern phones understand.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Why a damaged QR code can still work
            </h2>
            <p>
              Have you ever seen a QR code with a logo in the middle that still scans? That works because of error correction.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Backup data built into the code
              </h3>
              <p>
                When a code is made, extra backup data is added using a method called Reed-Solomon error correction. If part of the code is dirty, torn or covered, the scanner uses the backup data to rebuild what&apos;s missing.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The four levels
              </h3>
              <p>
                You can choose how much backup to include. The levels are L, M, Q and H, and they can repair roughly 7, 15, 25 and 30 percent of the code&apos;s data. More backup means more protection but a denser code. That&apos;s why logos are usually used with a higher level, so the covered area can be rebuilt.
              </p>
              <p>
                One catch: the figure is about data, not how much of the picture looks covered. A mark that wipes out the big corner squares can stop a code from scanning long before a third of it is hidden.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Does a QR code need the internet?
            </h2>
            <p>
              This is one of the most common questions, and the answer depends on the type of code.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Static QR codes
              </h3>
              <p>
                A static code holds the information directly inside the pattern. Your phone can read it with no connection at all. A Wi-Fi code, a plain text note or a contact card works fine offline. If it contains a web link, the scan itself is offline, but you need the internet to open the page.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Dynamic QR codes
              </h3>
              <p>
                A dynamic code holds a short web address that points to a service, which then sends you on to the real destination. That lets the owner change the destination later without reprinting the code, and some services show scan counts. The trade-off is that it only works while that service is running, so check how long a provider keeps dynamic codes active before you print them. For a deeper breakdown, check our guide to{' '}
                <Link
                  to="/blog/static-vs-dynamic-qr-code"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  static vs dynamic QR codes
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Why some QR codes won&apos;t scan
            </h2>
            <p>
              Most failed scans come down to a few things:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Low contrast:</strong> Dark code on a light background works best. Pale colours or a light code on dark can fail.
              </li>
              <li>
                <strong>No quiet zone:</strong> Leave a clear margin of at least four modules on all sides.
              </li>
              <li>
                <strong>Too small or too dense:</strong> A code with a very long link has tiny modules. Shorten the link or make the code bigger.
              </li>
              <li>
                <strong>Blur, glare or a crumpled surface:</strong> Hold steady and tilt away from reflections.
              </li>
              <li>
                <strong>A damaged corner square:</strong> Error correction can&apos;t fully rescue a code that has lost the big squares.
              </li>
            </ul>
            <p className="mt-4">
              If a code is saved as an image on your screen, our{' '}
              <Link
                to="/blog/scan-qr-code-from-screenshot"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                scanning guide for screenshots
              </Link>{' '}
              may help.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Common questions about how QR codes work
            </h2>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Can a QR code have a virus?
              </h3>
              <p>
                The code itself is just data, like a line of text. The risk is where it sends you. A fake code can point to a harmful website, so check the address your phone shows before you open it. Our{' '}
                <Link
                  to="/qr-code-security"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  QR code security guide
                </Link>{' '}
                has more advice on avoiding phishing.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Why do QR codes have three big squares?
              </h3>
              <p>
                They let the scanner find the code and tell which way up it is. With only three, the empty corner gives the code a clear direction.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Do QR codes expire?
              </h3>
              <p>
                A static code never expires, because the information is built into the pattern. A dynamic code can stop working if the service behind it ends or the plan lapses. Also, a link inside any code can stop working if the website is removed.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Can a QR code be read upside down or at an angle?
              </h3>
              <p>
                Yes. The big corner squares let scanners recognise the code from nearly any angle, and the alignment patterns help with tilt and bending.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Is every QR code the same?
              </h3>
              <p>
                They all follow the same standard, but they differ in size (version), error correction level and what they store. That&apos;s why one code looks simple and another looks packed. To see how Masahiro Hara originally created the specification in 1994, read our{' '}
                <Link
                  to="/blog/qr-code-history"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  QR code history story
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-8 mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Final thoughts
            </h2>
            <p>
              A QR code is a small, clever piece of design. The big squares tell the scanner where to look, the dotted lines tell it how big things are, the speckled area holds the message, and the backup data covers any slips. The next time you scan one, you&apos;ll know that a lot of careful engineering happens in under a second.
            </p>
            <p>
              Want to see it for yourself? Scan any code with our free{' '}
              <Link
                to="/"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                QR code scanner
              </Link>
              , or make your own with the{' '}
              <Link
                to="/qr-code-generator"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                QR code generator
              </Link>{' '}
              and take a look at the pattern it creates.
            </p>
          </section>
        </div>
      </article>
    </>
  );
};
