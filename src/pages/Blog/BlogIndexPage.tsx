import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';

export const BlogIndexPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Blog', path: '/blog' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.blog} breadcrumbs={breadcrumbs} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides & Technical Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Learn about QR codes, scanning, generation, static and dynamic QR codes, and practical
            tips with simple guides and tutorials.
          </p>
        </header>

        {/* Articles List */}
        <section aria-label="Latest Articles" className="space-y-8">
          {/* New vCard Digital Business Cards Article */}
          <article className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-200">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
                <Sparkles className="w-3 h-3" />
                Latest Guide
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

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              <Link to="/blog/how-to-create-vcard-qr-code" className="focus:outline-none focus:underline">
                How to Create a vCard QR Code for Digital Business Cards (Free)
              </Link>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Learn how to create a digital business card QR code using a free vCard generator. Enable
              contacts to save your name, phone, email, and company straight into their smartphone address book
              with a single camera scan—zero app installation required.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Includes Step-by-Step UI Screenshots &amp; RFC Standards Table</span>
              </div>

              <Link
                to="/blog/how-to-create-vcard-qr-code"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition shadow-sm shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Read article: How to Create a vCard QR Code for Digital Business Cards (Free)"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>

          {/* Static vs Dynamic QR Code Article */}
          <article className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-200">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                Technical Comparison
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <time dateTime="2026-09-17">September 17, 2026</time>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>6 min read</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              <Link to="/blog/static-vs-dynamic-qr-code" className="focus:outline-none focus:underline">
                Static vs Dynamic QR Code: What’s the Difference?
              </Link>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Learn the difference between static and dynamic QR codes, how they work, their key
              benefits, limitations, and which type to use. Explore how direct data encoding compares
              with intermediary URL redirection, tracking capabilities, service dependencies, and practical use cases.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Includes Comparison Table &amp; Practical FAQs</span>
              </div>

              <Link
                to="/blog/static-vs-dynamic-qr-code"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition shadow-sm shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Read article: Static vs Dynamic QR Code: What’s the Difference?"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
