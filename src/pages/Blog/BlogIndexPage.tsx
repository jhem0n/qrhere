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
    slug: '/blog/how-to-create-wifi-qr-code',
    title: 'How to Create a WiFi QR Code (Free, No App)',
    excerpt:
      'Stop reading your WiFi password out loud. Learn how to make a free WiFi QR code guests can scan to connect instantly — no app, no sign-up, no typing.',
    date: 'September 24, 2026',
    isoDate: '2026-09-24',
    readingTime: '2 min read',
    category: 'Tutorial',
    imageUrl: '', // Empty placeholder ready for future upload
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
    imageUrl: '', // Empty placeholder ready for future upload
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
    imageUrl: '', // Empty placeholder ready for future upload
  },
  {
    slug: '/blog/static-vs-dynamic-qr-code',
    title: 'Static vs Dynamic QR Codes: What’s the Difference?',
    excerpt:
      'Learn how static and dynamic QR codes store data differently, why static codes never expire, and how to choose the right format for your flyers, business cards, or product packaging.',
    date: 'September 17, 2026',
    isoDate: '2026-09-17',
    readingTime: '5 min read',
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

        {/* Accessible Heading for Screen Readers & SEO */}
        <h1 className="sr-only">Blog</h1>

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
                    onError={(e) => {
                      if (post.imageUrl?.endsWith('.jpg')) {
                        (e.currentTarget as HTMLImageElement).src = post.imageUrl.replace('.jpg', '.svg');
                      }
                    }}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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

                {/* Floating Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm border border-slate-200/80 dark:border-slate-700/80">
                    {post.category}
                  </span>
                </div>
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
      </div>
    </>
  );
};
