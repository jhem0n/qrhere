import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ImageIcon } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';

interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readingTime: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPostSummary[] = [
  {
    slug: '/blog/scan-barcode-to-check-price',
    title: 'How to Scan a Barcode to Check Price (Free Online Barcode Reader)',
    excerpt:
      'Use a free online barcode reader to scan any product barcode, then compare prices in seconds. Works on phone or laptop, no app needed. Here is how.',
    date: 'October 8, 2026',
    isoDate: '2026-10-08',
    readingTime: '7 min read',
    category: 'QR & Barcode',
    imageUrl: '/images/scan-barcode-price.svg',
    featured: true,
  },
  {
    slug: '/blog/how-does-a-qr-code-work',
    title: "How Does a QR Code Work? What's Inside the Square",
    excerpt:
      'Ever wondered how a QR code works? Learn what is inside the square, how your phone reads it in a second, and why a damaged code can still scan.',
    date: 'October 6, 2026',
    isoDate: '2026-10-06',
    readingTime: '6 min read',
    category: 'Technology Explained',
    imageUrl: '/images/qr-code-anatomy.svg',
    featured: true,
  },
  {
    slug: '/blog/scan-qr-code-from-screenshot',
    title: 'How to Scan a QR Code on Your Own Phone (Screenshot Guide)',
    excerpt:
      'Got a QR code as a screenshot or image? Learn how to scan it on iPhone, Android and PC, why it sometimes fails, and how to fix it. No second phone needed.',
    date: 'October 6, 2026',
    isoDate: '2026-10-06',
    readingTime: '4 min read',
    category: 'Screenshot Guide',
    imageUrl: '/images/scan-qr-code-from-screenshot.jpg',
    featured: true,
  },
  {
    slug: '/blog/qr-code-history',
    title: 'QR Code History: Who Invented It and How It Took Over',
    excerpt:
      'The real story of the QR code: why a car factory invented it in 1994, why it was given away, and how phones and 2020 made it part of daily life.',
    date: 'October 6, 2026',
    isoDate: '2026-10-06',
    readingTime: '6 min read',
    category: 'Invention Story',
    imageUrl: '/images/qr-code-history.jpg',
  },
  {
    slug: '/blog/qr-code-error-correction-explained',
    title: 'QR Code Error Correction Levels Explained: When to Use Which',
    excerpt:
      'Ever wondered how a QR code scans even when scratched or covered with a logo? Learn what Levels L, M, Q, and H mean in plain English and how to pick the right one.',
    date: 'October 2, 2026',
    isoDate: '2026-10-02',
    readingTime: '5 min read',
    category: 'Design Guide',
    imageUrl: '/images/errorcorrection.jpg',
    featured: true,
  },
  {
    slug: '/blog/how-to-create-wifi-qr-code',
    title: 'How to Create a WiFi QR Code (Step-by-Step Guide)',
    excerpt:
      'Stop reading your Wi-Fi password out loud. Learn how to make a free Wi-Fi QR code your guests and customers can scan to connect in seconds with their phone camera.',
    date: 'October 2, 2026',
    isoDate: '2026-10-02',
    readingTime: '5 min read',
    category: 'Guide',
    imageUrl: '/images/howtocreatewifiqrcode.jpg',
    featured: true,
  },
  {
    slug: '/blog/how-to-scan-qr-code-without-app',
    title: 'How to Scan a QR Code Without Installing an App',
    excerpt:
      'You do not need to download an ad-filled scanner app from an app store. Here is how to scan QR codes using your iPhone, Android, or desktop computer, plus how to decode codes straight from screenshots.',
    date: 'September 20, 2026',
    isoDate: '2026-09-20',
    readingTime: '4 min read',
    category: 'Tutorial',
    imageUrl: '/images/howtoscanwithoutapp.jpg',
    featured: true,
  },
  {
    slug: '/blog/how-to-create-vcard-qr-code',
    title: 'How to Create a vCard QR Code for Digital Business Cards',
    excerpt:
      'Put your contact details directly into a QR code for your business card. Contacts can scan it with their standard camera and save your name, phone number, and email straight to their address book.',
    date: 'September 18, 2026',
    isoDate: '2026-09-18',
    readingTime: '4 min read',
    category: 'Guide',
    imageUrl: '/images/howtocreatevcardqr.jpg',
  },
  {
    slug: '/blog/static-vs-dynamic-qr-code',
    title: 'Static vs Dynamic QR Codes: What’s the Difference?',
    excerpt:
      'A straightforward, jargon-free breakdown of static vs dynamic QR codes. Learn which one you need for business cards, Wi-Fi, flyers, and products.',
    date: 'September 17, 2026',
    isoDate: '2026-09-17',
    readingTime: '4 min read',
    category: 'Comparison',
    imageUrl: '/images/static-vs-dynamic-qr-code.jpg',
  },
];

export const BlogIndexPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Blog', path: '/blog' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.blog} breadcrumbs={breadcrumbs} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="mb-8 mt-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            QR Code Guides &amp; Tutorials
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Practical walkthroughs, scanning guides, and technical advice for creating and scanning QR codes.
          </p>
        </header>

        {/* 2 Articles per row Grid Layout */}
        <section aria-label="Latest Articles" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-6 sm:mt-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/70 dark:hover:border-blue-600/70 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Featured Image Container (Box with empty state ready for future upload) */}
              <Link
                to={post.slug}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block w-full aspect-[16/9] bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden group-hover:opacity-95 transition-opacity"
              >
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    title={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/40 dark:from-slate-800/90 dark:via-slate-900 dark:to-blue-950/30">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300">
                      <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
                    </div>
                    <span className="mt-3 text-xs sm:text-sm font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      Featured Image
                    </span>
                  </div>
                )}
              </Link>

              {/* Box Content Body */}
              <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta: Date & Reading Time */}
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <time dateTime={post.isoDate}>{post.date}</time>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  {/* Article Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link to={post.slug} className="focus:outline-none focus:underline">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={post.slug}
                    className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    aria-label={`Read article: ${post.title}`}
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Foundational Technical Guides Section */}
        <section aria-label="Reference Guides" className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Foundational Reference Guides
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              In-depth research on optical scanning physics, vector resolution, and counter-phishing defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/qr-code-size-and-print-guide"
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400/80 dark:hover:border-amber-500/80 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md">
                Print Engineering
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                QR Code Size, Ratio &amp; Print Quality Standards
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The definitive 10:1 distance-to-size formula, quiet zone rules, dot gain mitigation, and SVG vector specifications for high-volume commercial printing.
              </p>
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                <span>Explore Print Guide</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/qr-code-security"
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400/80 dark:hover:border-emerald-500/80 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                Cybersecurity
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                QR Code Security: Quishing, Phishing &amp; Tampering
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                How malicious actors exploit QR codes to bypass enterprise email gateways, credential harvesting tactics, and technical inspection strategies.
              </p>
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Read Security Guide</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
