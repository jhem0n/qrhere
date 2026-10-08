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

export const BlogPostQrCodeHistory: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'QR Code History',
      path: '/blog/qr-code-history',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'When was the QR code invented?',
      answer:
        'In 1994, at Denso in Japan. Development took roughly a year and a half to two years before that.',
    },
    {
      question: 'Who invented the QR code?',
      answer:
        'Masahiro Hara, an engineer at Denso (now Denso Wave), led the team that developed it.',
    },
    {
      question: 'What does QR stand for?',
      answer:
        'Quick Response. The code was designed so scanners could read it fast, from any angle.',
    },
    {
      question: 'Is the QR code free to use?',
      answer:
        'Yes, anyone can create and scan QR codes for free. Denso Wave holds the patent but chose not to enforce it, though "QR Code" remains its registered trademark.',
    },
    {
      question: 'Was the QR code the first 2D barcode?',
      answer:
        'No. Earlier 2D codes existed, such as Code 49 in 1987. The QR code became the best known because it was fast, held a lot of data, and was free to use.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'QR Code History: Who Invented It, Why, and How It Took Over',
          description:
            'The real story of the QR code: why a car factory invented it in 1994, why it was given away, and how phones and 2020 made it part of daily life.',
          canonicalPath: '/blog/qr-code-history',
          datePublished: '2026-10-06',
          dateModified: '2026-10-06',
          image: `${siteUrl}/images/qr-code-history.jpg`,
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
        seo={SEO_CONFIG.blogQrCodeHistory}
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
              Invention Story
            </span>
            <span>
              <time dateTime="2026-10-06">October 6, 2026</time>
            </span>
            <span>•</span>
            <span>6 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            QR Code History: Who Invented It, Why, and How It Took Over
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            You've probably scanned a QR code this week. A menu, a Wi-Fi password, a payment at a small shop. It takes two seconds and nobody stops to think about it.
          </p>
        </header>

        {/* Featured Visual */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src="/images/qr-code-history.jpg"
            alt="History of the QR code: Masahiro Hara and Denso Wave 1994 invention"
            title="QR Code History: Who Invented It, Why, and How It Took Over"
            className="w-full h-auto object-cover"
            width={1280}
            height={720}
            loading="eager"
            decoding="async"
          />
          <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-900/60">
            From Japanese auto plants to global smartphones: the evolution of the Quick Response code.
          </figcaption>
        </figure>

        {/* Main Content Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            But that little square has a stranger backstory than you'd guess. It wasn't made for restaurants, phones, or marketing. It was made so a car parts factory could stop wasting time on barcodes.
          </p>
          <p>
            Here's the whole story in plain language, from a factory floor in Japan to the phone in your pocket.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The problem that led to the QR code
            </h2>
            <p>
              Before QR codes, factories used normal barcodes, the striped kind you still see on groceries. They're good at one thing: holding a short number.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Barcodes couldn't hold enough
              </h3>
              <p>
                A regular barcode carries only a short string of characters, and it can't store Japanese Kanji at all. For a car supplier that needed to track lots of details about each part, that was a real limit. Workers sometimes had to scan several barcodes on a single item, one after another.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Factories needed speed and toughness
              </h3>
              <p>
                Barcodes also have to be scanned in a straight line, facing the right way. On a busy production line, parts get dirty, scratched and turned around. The company wanted one code that held more, read faster, and still worked when it wasn't perfectly clean or lined up.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Who invented the QR code?
            </h2>
            <p>
              The QR code was developed in 1994 at Denso, a Toyota group company. The unit that built it later became its own company, Denso Wave, in 2001. The engineer who led the work was Masahiro Hara.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Masahiro Hara and a small team
              </h3>
              <p>
                Hara led a small development team. Accounts differ a little on the exact timeline, but the project took roughly a year and a half to two years from idea to finished code.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The Go board idea
              </h3>
              <p>
                By Hara's own account, the idea came to him during lunch breaks playing Go, the board game with black and white stones on a grid. A grid made him wonder why data had to sit in a single line. A square could hold information across rows and columns, and that is how a code can carry so much more.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Those three squares in the corners
              </h3>
              <p>
                The harder part was helping a scanner find the code instantly. The team looked for a pattern that almost never appears in normal printing and settled on a dark, light, dark, light, dark sequence in a 1:1:3:1:1 ratio. They placed it in three corners.
              </p>
              <p>
                Those are the big squares you see on every QR code. When a scanner spots them, it knows where the code is and how it's turned, so it can read from any angle. The name says it all: QR stands for Quick Response.
              </p>
              <p>
                The finished code could hold thousands of characters, up to 7,089 digits in the largest version. It also has built-in error correction. At the highest level, a code can still be read with roughly 30 percent of it damaged, which is why you can put a logo in the middle of one.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Why the inventors gave it away
            </h2>
            <p>
              Here is the part that explains why QR codes are everywhere. Denso owns the patent. But it decided not to enforce it.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                An open design on purpose
              </h3>
              <p>
                Denso Wave published the specification and let anyone make and read QR codes without paying a licence fee. The company has said it wanted the code to be used as widely as possible. Anyone could build a scanner or a generator, and soon many did.
              </p>
              <p className="text-sm italic text-slate-500 dark:text-slate-400">
                One small note: the name "QR Code" is still a registered trademark of Denso Wave. The code is free to use. The name belongs to them.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Becoming an official standard
              </h3>
              <p>
                The code was approved as an industry standard by the AIM in 1997. In June 2000 it was published as the international standard ISO/IEC 18004. A published standard meant software makers and printer makers around the world could support it with confidence.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How QR codes got onto phones
            </h2>
            <p>
              For about eight years, QR codes stayed mostly in factories and logistics. Then cameras arrived on phones.
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Japan goes first
              </h3>
              <p>
                In August 2002, Sharp released the J-SH09, widely recognised as the first mobile phone that could read QR codes. Other Japanese brands followed. People started pointing their phones at squares in magazines and on products to open websites.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The app problem
              </h3>
              <p>
                Outside Japan, things moved slowly. To scan a code, you had to find and download a separate scanner app, open it, and aim it correctly. For most people that was too much work for a link they could type in. QR codes stayed a curiosity in many countries.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The camera finally learned to read them
              </h3>
              <p>
                That changed in 2017, when Apple added QR code scanning to the iPhone camera with iOS 11. Android phones followed with built-in scanning through the camera and Google Lens. Once you could just open the camera and point it, the biggest obstacle was gone.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              QR codes and money
            </h2>
            <p>
              While much of the world was ignoring QR codes, some countries were building payments around them.
            </p>
            <p>
              In China, Alipay and WeChat Pay made scanning a code the normal way to pay, from big stores to street stalls. Other countries built their own systems, such as UPI in India, QRIS in Indonesia, and SGQR in Singapore.
            </p>
            <p>
              It's a use the original team never planned for. A tool built to track car parts became a way to buy lunch.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How 2020 changed everything
            </h2>
            <p>
              Then came the pandemic. Suddenly nobody wanted to touch shared menus, paper forms or tickets.
            </p>
            <p>
              Restaurants moved menus onto QR codes. Governments and venues used them for check-ins and contact tracing. Vaccination and health certificates were checked with a scan. Event tickets moved onto phone screens.
            </p>
            <p>
              A lot of people learned to scan a code simply because they had to. And when restrictions ended, many businesses kept using them, because they were cheap, quick and easy to change. That's the year QR codes went from "occasionally seen" to "normal".
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              QR code timeline at a glance
            </h2>
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">1987:</span>
                  <span>Code 49, one of the earlier 2D barcodes, appears. The QR code was not the first 2D code.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">1994:</span>
                  <span>The QR code is developed at Denso in Japan, led by Masahiro Hara.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">1997:</span>
                  <span>Approved as an AIM industry standard.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">June 2000:</span>
                  <span>Published as the ISO/IEC 18004 international standard.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">2001:</span>
                  <span>Denso Wave becomes its own company.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">2002:</span>
                  <span>Sharp's J-SH09 becomes the first phone with QR code reading.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">2017:</span>
                  <span>iOS 11 adds QR scanning to the iPhone camera.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">2020:</span>
                  <span>The pandemic pushes QR codes into everyday life worldwide.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[70px]">End of 2027:</span>
                  <span>GS1's industry goal for shop checkouts to read 2D codes.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Where QR codes are headed
            </h2>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                What GS1 Sunrise 2027 really means
              </h3>
              <p>
                You may read that barcodes will disappear by 2027. That's not quite right. GS1, the group that runs barcode standards for products, has an industry goal called Sunrise 2027. The aim is for shop checkouts to be able to read certain 2D codes, including QR codes that carry a product's GS1 information, alongside the old barcodes by the end of 2027.
              </p>
              <p>
                It is an industry goal, not a law, and the old barcodes won't vanish overnight. For a while, packages are likely to carry both. The attraction is that a QR code can hold the product number plus extras like ingredients or expiry details through a web link.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                The downside: fake codes
              </h3>
              <p>
                Because QR codes are easy to make and print, scammers use them too. A sticker placed over a real code, or a code sent in a message, can lead to a fake site. The simple habit is to read the address your phone shows before you tap it. We've written a short guide on this:{' '}
                <Link to="/qr-code-security" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                  QR code security guide
                </Link>
                . You can also read our guide on{' '}
                <Link to="/blog/scan-qr-code-from-screenshot" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                  scanning QR codes from screenshots
                </Link>{' '}
                when receiving codes digitally.
              </p>
            </div>
          </section>

          <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Common questions about QR code history
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
              The QR code's story is a good reminder that useful ideas often start small. It began as a fix for a slow factory line. It spread because its makers let everyone use it, and it took off once phone cameras caught up.
            </p>
            <p>
              If you want to try one yourself, you can scan any code on our{' '}
              <Link to="/" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                free scanner
              </Link>{' '}
              or make your own with the{' '}
              <Link to="/qr-code-generator" className="text-blue-600 dark:text-blue-400 underline font-semibold">
                QR code generator
              </Link>
              . It takes less time than reading this post did.
            </p>
          </section>
        </div>
      </article>
    </>
  );
};
