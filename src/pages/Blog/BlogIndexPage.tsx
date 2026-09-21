import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
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
  featured?: boolean;
}

const BLOG_POSTS: BlogPostSummary[] = [
  {
    slug: '/blog/how-to-scan-qr-code-without-app',
    title: 'How to Scan a QR Code Without Installing an App',
    excerpt:
      'You do not need to download an ad-filled scanner app from an app store. Here is how to scan QR codes using your iPhone, Android, or desktop computer, plus how to decode codes straight from screenshots.',
    date: 'September 20, 2026',
    isoDate: '2026-09-20',
    readingTime: '4 min read',
    category: 'Tutorial',
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
  },
];

export const BlogIndexPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Blog', path: '/blog' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.blog} breadcrumbs={breadcrumbs} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles &amp; Practical Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Simple explanations, helpful tips, and practical tutorials for scanning and creating
            QR codes. No marketing fluff—just clear, useful guidance.
          </p>
        </header>

        {/* Articles List */}
        <section aria-label="Latest Articles" className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span className="inline-flex items-center font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/40">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <time dateTime={post.isoDate}>{post.date}</time>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.readingTime}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Link to={post.slug} className="focus:outline-none focus:underline">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to={post.slug}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  aria-label={`Read article: ${post.title}`}
                >
                  <span>Read article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};
