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

export const BlogPostScanBarcodeToCheckPrice: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'Scan Barcode to Check Price',
      path: '/blog/scan-barcode-to-check-price',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Can I scan a barcode to check the price?',
      answer:
        'Yes, with one extra step. Scan the barcode with an online barcode reader to get the number, then paste it into Google, a shopping site, or your local marketplace to see prices.',
    },
    {
      question: 'Is there a free online barcode reader that works without an app?',
      answer:
        'Yes. Our online barcode reader runs in your browser on phones and computers, so there is nothing to install. Open the page, allow the camera, and scan.',
    },
    {
      question: 'What is the difference between a UPC and an EAN?',
      answer:
        'UPC is the 12-digit standard used mainly in North America. EAN is the 13-digit standard used in most of the world. A UPC-A is the same as an EAN-13 with a zero at the front.',
    },
    {
      question: 'Can I use an online barcode reader on a photo?',
      answer:
        'Yes. Upload a clear photo of the barcode and the reader decodes it. Make sure the whole barcode is in the picture and there is no glare on the bars.',
    },
    {
      question: 'Why does my barcode search show no results?',
      answer:
        'The product may be local, new, or sold only in certain regions, so it is not in public catalogs. Try a different site, search the product name and size, or look it up on a local marketplace.',
    },
    {
      question: 'How do I know if an online price is a good deal?',
      answer:
        'Compare the exact same model and size, add the delivery fee, and check the seller and warranty. For items sold on Amazon, a price history site can show whether the current price is near its usual level.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Scan a Barcode to Check Price (Free Online Barcode Reader)',
          description:
            'Use a free online barcode reader to scan any product barcode, then compare prices in seconds. Works on phone or laptop, no app needed. Here is how.',
          canonicalPath: '/blog/scan-barcode-to-check-price',
          datePublished: '2026-10-08',
          dateModified: '2026-10-08',
          image: `${siteUrl}/images/scan-barcode-price.svg`,
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
        seo={SEO_CONFIG.blogScanBarcodeToCheckPrice}
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
              QR &amp; Barcode
            </span>
            <span>
              <time dateTime="2026-10-08">October 2026</time>
            </span>
            <span>•</span>
            <span>7 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Scan a Barcode to Check Price (Free Online Barcode Reader)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            You&apos;re in a shop, holding a speaker with a price tag that feels a bit too high. You wonder if it&apos;s cheaper online. Or you&apos;re clearing a shelf of old books and want to know what they might sell for.
          </p>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            In both cases the quickest place to start is the barcode. Every packaged product has one, and with a free <Link to="/barcode-scanner" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">online barcode reader</Link> you can turn it into a number you can search in about a minute. No app to download, and it works on a phone or a laptop.
          </p>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Here&apos;s how to do it, where to look the number up, and what to do when nothing shows up.
          </p>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/scan-barcode-price.svg"
            alt="How to scan a barcode to check price using a free online barcode reader"
            title="Scan a Barcode to Check Price"
            className="w-full h-auto object-cover"
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            Scan any retail product barcode in your browser and look up competitive prices instantly.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How to scan a barcode and check the price in 3 steps
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Open our online barcode reader:</strong> Launch our free{' '}
                <Link
                  to="/barcode-scanner"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  online barcode reader
                </Link>{' '}
                in any browser. Everything decodes 100% client-side in your browser, so your camera video and uploaded images are never sent to any server.
              </li>
              <li>
                <strong>Scan or upload:</strong> Point your camera at the barcode, or upload a photo of it. The online barcode reader immediately shows the number printed under the bars, usually 12 or 13 digits.
              </li>
              <li>
                <strong>Look up and compare:</strong> Copy the number and paste it into Google, a shopping site, or your local marketplace. Compare what comes up.
              </li>
            </ol>
            <p>
              That&apos;s the whole method. The rest of this post covers where to paste the number and why it sometimes finds nothing.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Where to paste the barcode number
            </h2>
            <p>
              Once your online barcode reader gives you the number, you have a few good places to try.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Search engines and shopping sites
              </h3>
              <p>
                Paste the number into Google or Google Shopping. For many products it brings up listings with prices from several sellers. You can also try the search box on Amazon, and eBay is handy for used or older items.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Your local marketplace
              </h3>
              <p>
                Prices and stock change from country to country, so use the shops people near you actually buy from. For example, Daraz in Bangladesh, Flipkart in India, or Shopee in Southeast Asia. If a site doesn&apos;t find the number, search the product name and size instead.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Free product databases
              </h3>
              <p>
                For food and drinks, Open Food Facts is a free, open database that can show the product name, brand, ingredients and more. UPCitemdb covers general products, and it has free and paid plans with limits. These are best for identifying a product, not for current shop prices.
              </p>
              <p>
                One extra tip: if the item is sold on Amazon, a price history site such as CamelCamelCamel shows whether today&apos;s price is close to the usual one.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Why a barcode doesn&apos;t contain the price
            </h2>
            <p>
              This surprises a lot of people. A normal product barcode holds only an identification number, a bit like a name tag. The price isn&apos;t in it.
            </p>
            <p>
              The price lives in each shop&apos;s own system. When a cashier scans the code, the till looks up that number and finds the price. When you scan it with an online barcode reader, you get the number, and you then do the lookup yourself.
            </p>
            <p>
              That&apos;s why you&apos;ll sometimes see these problems:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A local or niche product may not appear in any online catalog.</li>
              <li>Store-brand items often aren&apos;t listed in public databases.</li>
              <li>The same product in a different size or pack usually has a different barcode, so make sure the numbers match the exact one in your hand.</li>
              <li>Different shops can charge different prices for the same barcode.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Three ways to scan a barcode on your phone
            </h2>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Use an online barcode reader in your browser
              </h3>
              <p>
                This is the simplest way, and it works on iPhone, Android, Windows and Mac. Open the{' '}
                <Link
                  to="/barcode-scanner"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  online barcode reader
                </Link>
                , allow camera access, and hold the barcode steady inside the frame. There&apos;s nothing to install and nothing to update. You also get the plain number, so you can paste it into any site you like.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Use Google Lens on Android
              </h3>
              <p>
                If you have Google Lens, open it, frame the barcode, and it can often show product matches with shopping results. It&apos;s quick, but the results arrive inside Google&apos;s own view. If you want the raw number to use somewhere else, an online barcode reader is the cleaner option.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Scan from a photo or screenshot
              </h3>
              <p>
                Maybe a friend sent you a picture of a box, or you took a photo in a shop with weak signal and want to look it up later. Upload that image to the online barcode reader instead of scanning live. For the best result, use a sharp photo with the whole barcode visible, include a little blank space on each side, and avoid glare across the bars.
              </p>
              <p>
                If a QR code is the thing stuck in an image, our guide to{' '}
                <Link
                  to="/blog/scan-qr-code-from-screenshot"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  scanning a QR code from a screenshot
                </Link>{' '}
                walks through it.
              </p>
            </div>
          </section>

          {/* Section 5: Barcode Formats Table */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Barcode types you&apos;ll see on products
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th scope="col" className="px-4 py-3">Format</th>
                    <th scope="col" className="px-4 py-3">Where you&apos;ll see it</th>
                    <th scope="col" className="px-4 py-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">UPC-A</td>
                    <td className="px-4 py-3">Retail in North America</td>
                    <td className="px-4 py-3 font-mono">12 digits</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">UPC-E</td>
                    <td className="px-4 py-3">Small packages in North America</td>
                    <td className="px-4 py-3 font-mono">8 digits (a shortened UPC)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">EAN-13</td>
                    <td className="px-4 py-3">Retail in most of the world</td>
                    <td className="px-4 py-3 font-mono">13 digits</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">EAN-8</td>
                    <td className="px-4 py-3">Very small packages</td>
                    <td className="px-4 py-3 font-mono">8 digits</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">ISBN-13</td>
                    <td className="px-4 py-3">Books</td>
                    <td className="px-4 py-3 font-mono">13 digits, starts with 978 or 979</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Code 128</td>
                    <td className="px-4 py-3">Shipping and warehouse labels</td>
                    <td className="px-4 py-3 font-mono">Varies</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Code 39</td>
                    <td className="px-4 py-3">Industrial and automotive labels</td>
                    <td className="px-4 py-3 font-mono">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              A 12-digit UPC-A is the same as a 13-digit EAN-13 with a zero added at the front, so many shop systems treat them as the same thing.
            </p>
            <p>
              A good online barcode reader should read all of these. If you get no result, check that you scanned the product barcode and not a shelf label or a batch sticker.
            </p>
          </section>

          {/* Section 6: Real Examples */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Real examples (the prices here are made up)
            </h2>

            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Comparing a gadget price in a shop
              </h3>
              <p>You&apos;re holding a Bluetooth speaker priced at 4,000 in the shop.</p>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm sm:text-base">
                <li>Scan its barcode with the online barcode reader.</li>
                <li>Paste the number into Google and your local marketplace.</li>
                <li>You find the same model for 3,200 online.</li>
              </ol>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                Before you buy online, check the delivery fee, the warranty, and the seller&apos;s reviews. A lower price isn&apos;t a better deal if you lose the warranty or pay for shipping.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Pricing a used book
              </h3>
              <p>You want to sell an old textbook.</p>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm sm:text-base">
                <li>Scan the barcode on the back cover. A book barcode is the ISBN, and it starts with 978 or 979.</li>
                <li>Search that number on a used-book site or a marketplace.</li>
                <li>Compare listings in similar condition.</li>
              </ol>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                Be careful with editions. A newer edition has a different ISBN and a different price, so only compare listings with your exact number.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Checking what&apos;s in a snack
              </h3>
              <p>You don&apos;t always need a price. If you just want to know what&apos;s in a packaged snack:</p>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm sm:text-base">
                <li>Scan the barcode with the online barcode reader.</li>
                <li>Search the number on Open Food Facts.</li>
                <li>Look at the ingredients and nutrition information.</li>
              </ol>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                If the product isn&apos;t there, it&apos;s probably a local item nobody has added yet. In that case, the label on the pack is your best source.
              </p>
            </div>
          </section>

          {/* Section 7: What a barcode can't tell you */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What a barcode can&apos;t tell you
            </h2>
            <p>
              It&apos;s worth knowing the limits, so you don&apos;t trust the wrong thing.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>The price in the shop you&apos;re standing in:</strong> The barcode doesn&apos;t contain it.
              </li>
              <li>
                <strong>Whether the item is genuine:</strong> A barcode number can be copied onto a fake product, so a matching number isn&apos;t proof. Look for the brand&apos;s own verification method, buy from official sellers, and check the packaging.
              </li>
              <li>
                <strong>Expiry date or batch:</strong> A standard product barcode doesn&apos;t carry them.
              </li>
              <li>
                <strong>Where the item was made:</strong> The first digits show which barcode office issued the code, not the country of manufacture.
              </li>
            </ul>
          </section>

          {/* Section 8: FAQ */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently asked questions
            </h2>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Can I scan a barcode to check the price?
              </h3>
              <p>
                Yes, with one extra step. Scan the barcode with an online barcode reader to get the number, then paste it into Google, a shopping site, or your local marketplace to see prices.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Is there a free online barcode reader that works without an app?
              </h3>
              <p>
                Yes. Our{' '}
                <Link
                  to="/barcode-scanner"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  online barcode reader
                </Link>{' '}
                runs in your browser on phones and computers, so there&apos;s nothing to install. Open the page, allow the camera, and scan.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                What is the difference between a UPC and an EAN?
              </h3>
              <p>
                UPC is the 12-digit standard used mainly in North America. EAN is the 13-digit standard used in most of the world. A UPC-A is the same as an EAN-13 with a zero at the front.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Can I use an online barcode reader on a photo?
              </h3>
              <p>
                Yes. Upload a clear photo of the barcode and the reader decodes it. Make sure the whole barcode is in the picture and there&apos;s no glare on the bars.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Why does my barcode search show no results?
              </h3>
              <p>
                The product may be local, new, or sold only in certain regions, so it isn&apos;t in public catalogs. Try a different site, search the product name and size, or look it up on a local marketplace.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How do I know if an online price is a good deal?
              </h3>
              <p>
                Compare the exact same model and size, add the delivery fee, and check the seller and warranty. For items sold on Amazon, a price history site can show whether the current price is near its usual level.
              </p>
            </div>
          </section>

          {/* Section 9: Related reading */}
          <section className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-8 mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Related reading
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/blog/how-does-a-qr-code-work"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true">&rarr;</span>
                  <span>How Does a QR Code Work? What&apos;s Inside the Square</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/scan-qr-code-from-screenshot"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true">&rarr;</span>
                  <span>How to Scan a QR Code on Your Own Phone (Screenshot Guide)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/qr-code-history"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true">&rarr;</span>
                  <span>QR Code History: Who Invented It and How It Took Over</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/barcode-scanner"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true">&rarr;</span>
                  <span>Free Online Barcode Reader (Camera &amp; Photo Upload)</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* Section 10: Final thoughts */}
          <section className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Final thoughts
            </h2>
            <p>
              Checking a price from a barcode is a small trick that saves real money. Scan the code with an online barcode reader, copy the number, and let a few quick searches do the rest. Just remember that the barcode gives you an identity, not a price, and it can&apos;t prove that an item is the real thing.
            </p>
            <p>
              Ready to try it? Open our free{' '}
              <Link
                to="/barcode-scanner"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                online barcode reader
              </Link>{' '}
              and scan the next product you&apos;re unsure about.
            </p>
            <div className="pt-2">
              <Link
                to="/barcode-scanner"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition"
              >
                Open Free Online Barcode Reader
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};
