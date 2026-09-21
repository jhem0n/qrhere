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

export const BlogPostVcardQrCode: React.FC = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    {
      name: 'vCard QR Code for Digital Business Cards',
      path: '/blog/how-to-create-vcard-qr-code',
    },
  ];

  const siteUrl = getSiteUrl();

  const faqData = [
    {
      question: 'Does someone need a special app to scan my vCard QR code?',
      answer:
        'No. Most modern iPhone and Android phones recognize vCard codes right through their normal camera app. Once scanned, the phone shows an option to add the person straight to the contacts list.',
    },
    {
      question: 'Can I add a logo and colors to the QR code?',
      answer:
        'Yes. When you use the QR Here generator, you can adjust the foreground colors, round the corners, and upload a central logo without paying for a subscription.',
    },
    {
      question: 'Can I change my phone number or email after printing the code?',
      answer:
        'Because a standard vCard QR code is static, your contact info is written directly into the square pattern. If your phone number changes later, you will need to generate and print a fresh code. Only include details you know are stable.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Create a vCard QR Code for Digital Business Cards',
          description:
            'A practical guide to making a digital business card QR code with a free vCard generator so people can save your contact details with one scan.',
          canonicalPath: '/blog/how-to-create-vcard-qr-code',
          datePublished: '2026-09-18',
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
        seo={SEO_CONFIG.blogVcardBusinessCards}
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
              Guide
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime="2026-09-18">September 18, 2026</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>4 min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Create a vCard QR Code for Digital Business Cards
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Putting a vCard QR code on your business card lets people save your phone number, email,
            and website to their address book in a few seconds. Instead of typing your name letter by
            letter, they just point their phone camera at the code. Here is how to create one for free
            and make sure it prints cleanly.
          </p>
        </header>

        <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Why Use a vCard QR Code on a Business Card?
            </h2>
            <p className="mb-4">
              Paper business cards are easy to misplace. Even when someone wants to keep in touch,
              typing contact details by hand into a phone is tedious, and typos happen frequently.
            </p>
            <p className="mb-4">
              A vCard QR code solves this simply. When someone scans it with their standard phone
              camera, a contact card pops up with your name, phone number, company, email, and
              website already filled in. They tap save, and your contact card is stored directly on
              their device.
            </p>
            <p>
              It requires no special apps, no account sign-ups, and no monthly fees. The contact
              information is stored right inside the code itself.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              What Information Can You Put in a vCard?
            </h2>
            <p className="mb-4">
              The vCard format supports quite a few fields, but you should stick to what people
              actually need. The more details you pack in, the denser the black-and-white grid
              becomes, which can make tiny codes harder for older cameras to focus on.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              Recommended fields for a business card:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Full Name:</strong> Your first and last name so you appear correctly in
                their search.
              </li>
              <li>
                <strong>Organization and Job Title:</strong> Helps people remember where they met
                you and what you do.
              </li>
              <li>
                <strong>Phone Number:</strong> Always include the international dialing code (like
                +1 for the US) so international contacts can call or text without trouble.
              </li>
              <li>
                <strong>Email Address:</strong> Your primary business email.
              </li>
              <li>
                <strong>Website or Portfolio:</strong> Direct link to your homepage, LinkedIn, or
                portfolio.
              </li>
            </ul>
            <p>
              Skip long biographies or multiple street addresses unless strictly needed. Keeping it
              focused keeps the code crisp and fast to scan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              How to Create Your vCard QR Code Step by Step
            </h2>
            <p className="mb-6">
              You can create your code in under two minutes using our free generator.
            </p>

            <ol className="list-decimal pl-5 space-y-6">
              <li>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Open the generator and select the vCard option
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Head to the{' '}
                    <Link
                      to="/qr-code-generator"
                      className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      QR Here QR Code Generator
                    </Link>
                    . In the type selector, click on <strong>V-card / Contact</strong>.
                  </p>
                </div>
              </li>

              <li>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Enter your contact information
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Type in your first name, last name, phone number, email address, company name,
                    and website URL. As you type, the preview canvas updates immediately so you can
                    see how the pattern looks.
                  </p>
                </div>
              </li>

              <li>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Check your error correction level
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    For business cards, we recommend <strong>Medium (Level M)</strong> or{' '}
                    <strong>Quartile (Level Q)</strong> error correction. This adds redundancy to
                    the code so that even if the physical card gets slightly scratched in a wallet or
                    pocket, it still scans without a hitch.
                  </p>
                </div>
              </li>

              <li>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Download in SVG or high-resolution PNG
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    If you are sending your design to a print shop or adding it to Adobe Illustrator
                    or Canva, choose <strong>Download SVG</strong>. SVG is a vector format that
                    scales cleanly to any physical size without pixelation. For digital cards or
                    email signatures, a high-resolution PNG works well.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Tips to Make Sure Your Code Scans Easily Every Time
            </h2>
            <p className="mb-4">
              Before you order five hundred printed cards, keep these practical printing guidelines
              in mind:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Print it at least 1.2 × 1.2 inches (30 × 30 mm):</strong> While short URLs
                can sometimes scan at smaller sizes, vCard payloads contain more text and have a
                tighter grid. Printing too small will make it tough for budget phone cameras to focus.
              </li>
              <li>
                <strong>Keep high contrast between foreground and background:</strong> Stick with a
                dark color on a light background. Never print a light gray or pastel code on white
                cardstock, as phone sensors struggle with low contrast.
              </li>
              <li>
                <strong>Leave a quiet zone around the edges:</strong> Leave a small margin of empty
                space around the four sides of the QR code. If artwork or text runs right up against
                the black squares, the scanner will get confused.
              </li>
              <li>
                <strong>Always test print a sample:</strong> Print one test copy on standard paper
                first. Use our{' '}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  online QR code scanner
                </Link>{' '}
                or your own phone to verify that the contact sheet appears and that every field is
                spelled right.
              </li>
            </ul>
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
