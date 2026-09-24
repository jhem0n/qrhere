import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
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

export const BlogPostStaticVsDynamic: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: 'Static vs Dynamic QR Code', path: '/blog/static-vs-dynamic-qr-code' },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Do static QR codes ever expire?',
      answer:
        'No. Static QR codes have no expiration date because they do not rely on an external redirect service or subscription. As long as the physical code is legible and the target link or Wi-Fi network is still active, the code works indefinitely.',
    },
    {
      question: 'Can I edit the destination of a static QR code after it is printed?',
      answer:
        'No. The destination is encoded directly into the pattern of squares. If you need to send people to a different URL, you have to generate and print a new code, or set up a redirect on your own web server.',
    },
    {
      question: 'Can I track how many people scan a static QR code?',
      answer:
        'A static QR code does not record scans on its own. However, if you add standard tracking parameters (like UTM tags) to your website link before generating the code, your web analytics tool can track visitors arriving from that specific code.',
    },
    {
      question: 'Which type of QR code is better for privacy?',
      answer:
        'Static QR codes are far better for privacy. When someone scans a static code, their phone decodes the data locally without sending any scan information, IP address, or device details to a third-party redirect service.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'Static vs Dynamic QR Codes: What’s the Difference?',
          description:
            'A clear explanation of how static and dynamic QR codes work, their key differences, and how to choose the right one for your project.',
          canonicalPath: '/blog/static-vs-dynamic-qr-code',
          datePublished: '2026-09-17',
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
        seo={SEO_CONFIG.blogStaticVsDynamic}
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
              Comparison
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime="2026-09-17">September 17, 2026</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>5 min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Static vs Dynamic QR Codes: What’s the Difference?
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            If you need to make a QR code for a flyer, business card, or product package, you will
            often see options for static and dynamic codes. They look almost identical on paper, but
            they work quite differently under the hood. Here is a straightforward breakdown to help
            you pick the right one.
          </p>
        </header>

        {/* Featured Comparison Infographic */}
        <figure className="my-8 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <img
            src="/images/static-vs-dynamic-qr-code.jpg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/static-vs-dynamic-qr-code.svg';
            }}
            alt="Static vs Dynamic QR Codes: The Difference Revealed Infographic comparing permanence and privacy with flexibility and analytics"
            className="w-full h-auto object-contain"
            loading="eager"
            width={1200}
            height={900}
          />
          <figcaption className="text-center text-xs text-slate-500 dark:text-slate-400 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
            Static QR codes encode data permanently with zero server reliance, while dynamic QR codes route through a redirection server for editable destinations and scan analytics.
          </figcaption>
        </figure>

        <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What Is a Static QR Code?
            </h2>
            <p className="mb-4">
              A static QR code stores its information directly inside the pattern of black and white
              squares. When someone scans it, their phone reads the characters directly from the
              image, exactly like reading printed text from a book.
            </p>
            <p className="mb-4">
              Because the data lives inside the code itself, a static QR code does not rely on any
              intermediary company or server. Once you generate it, it is permanent and will work
              forever without any fees or account maintenance.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              Common examples of static QR codes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Direct website links:</strong> Taking someone straight to your homepage or a
                specific public page.
              </li>
              <li>
                <strong>Wi-Fi network access:</strong> Letting guests connect to your office or home
                Wi-Fi without typing complex passwords.
              </li>
              <li>
                <strong>Contact cards (vCard):</strong> Saving phone numbers and emails straight to
                an address book.
              </li>
              <li>
                <strong>Plain text:</strong> Serial numbers, notes, or equipment instructions that
                can be read completely offline.
              </li>
            </ul>
            <p>
              You can{' '}
              <Link
                to="/qr-code-generator"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                generate static QR codes
              </Link>{' '}
              on QR Here completely free, with no account required and zero data saved to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What Is a Dynamic QR Code?
            </h2>
            <p className="mb-4">
              A dynamic QR code works through a redirect link. Instead of putting your final website
              or contact info directly into the squares, it encodes a short link owned by a QR
              hosting company.
            </p>
            <p className="mb-4">
              When a user scans a dynamic code, their browser first visits that short link. The
              hosting service logs the visit (recording the time, device, and approximate location)
              and immediately redirects the user to whatever final website you specified in your
              account dashboard.
            </p>
            <p>
              The main advantage is flexibility: you can change where the link points even after
              thousands of brochures have been printed. The catch is dependency: if the hosting
              service goes out of business, cancels your account, or charges high renewal fees, your
              printed codes stop working.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Side-by-Side Comparison
            </h2>
            <p className="mb-4">
              Here is a quick overview of how the two types compare on key factors:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 my-4">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-white">
                  <tr>
                    <th scope="col" className="p-3.5">Feature</th>
                    <th scope="col" className="p-3.5 text-blue-600 dark:text-blue-400">Static QR Code</th>
                    <th scope="col" className="p-3.5">Dynamic QR Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Editable after printing</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">No (permanent data)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Yes (via dashboard)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Expiration date</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Never expires</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Depends on active subscription</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Third-party dependency</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Zero dependency</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Requires provider server uptime</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Scan analytics</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Only via UTM web tags</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Built-in click logs</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Privacy</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">100% private and offline-capable</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Routes through tracking servers</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">Typical cost</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Completely free</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">Often monthly subscription</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              When Should You Use a Static QR Code?
            </h2>
            <p className="mb-4">
              A static code is usually the best choice whenever the information is permanent or
              privacy matters:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Wi-Fi login cards:</strong> For cafes, rental apartments, or office meeting
                rooms where you want people to connect without their passwords passing through any
                third-party site.
              </li>
              <li>
                <strong>Business cards and badges:</strong> Printing your contact card or LinkedIn
                profile on stationery that you will use for a long time.
              </li>
              <li>
                <strong>Internal documentation and equipment labels:</strong> Asset tags, machine
                manuals, and serial numbers in warehouses or manufacturing floors where internet
                access may be spotty or restricted.
              </li>
              <li>
                <strong>Permanent website links:</strong> Direct links to public websites, company
                homepages, or portfolio pages.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              When Should You Use a Dynamic QR Code?
            </h2>
            <p className="mb-4">
              Dynamic codes make the most sense in business scenarios with high print costs or
              frequently changing content:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Product packaging:</strong> If you are manufacturing thousands of retail
                boxes and need the ability to update user guides or safety documents in the future.
              </li>
              <li>
                <strong>Billboards and print advertising:</strong> Where you need to track how many
                leads came from a specific poster, or switch promotions halfway through a campaign.
              </li>
              <li>
                <strong>Restaurant menus:</strong> When seasonal dishes or prices change frequently
                and you prefer to redirect to an updated PDF without reprinting table stands.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Can You Change a Static QR Code After Printing?
            </h2>
            <p className="mb-4">
              No. Once a static QR code is printed, its visual pattern cannot be modified. The
              arrangement of black and white squares physically represents the letters and numbers
              of your destination.
            </p>
            <p>
              If the destination website is one you own, the easiest workaround is setting up a
              normal 301 redirect on your own web server. For example, if your code points to{' '}
              <code>example.com/menu</code>, you can simply tell your website to forward visitors
              from that URL to wherever you want without reprinting the code.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              How to Scan Either Type of Code
            </h2>
            <p className="mb-4">
              To the person scanning, static and dynamic codes look and behave almost identically:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>
                Open the default Camera app on your iPhone or Android phone and hold it steady
                facing the code.
              </li>
              <li>
                A small banner or notification will appear displaying the decoded URL. Tap it to
                open the link.
              </li>
              <li>
                If you are on a computer or have an image file or screenshot, you can use our free{' '}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  in-browser QR code scanner
                </Link>{' '}
                to scan using your webcam or by uploading the image file.
              </li>
            </ol>
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
