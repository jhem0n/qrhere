import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, HelpCircle, Shield, FileText, Bug, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';

export const ContactPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Contact', path: '/contact' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.contact} breadcrumbs={breadcrumbs} />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 flex flex-col">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact QR Here
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Have a question, feedback, or need technical assistance? We welcome inquiries from users, developers, and organizations using QR Here for private scanning and custom QR code generation.
          </p>
        </header>

        {/* Structured Sections */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          {/* General Questions */}
          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
              <span>General Questions</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              For everyday inquiries about how QR Here works, browser compatibility, camera access permissions, or creating custom QR codes for print and web, feel free to send an email. Before reaching out, you might also find instant answers in our{' '}
              <Link to="/faq" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">
                Frequently Asked Questions
              </Link>
              .
            </p>
          </section>

          {/* Bug Reports */}
          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Bug className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
              <span>Bug Reports</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you experience an issue decoding a particular barcode format, encountering camera feed glitches on specific mobile devices, or exporting SVG vector graphics, please let us know. Providing your operating system, browser version, and a brief description of the steps to reproduce helps diagnose the problem quickly.
            </p>
          </section>

          {/* Security Reports */}
          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
              <span>Security Reports</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              We take security and user privacy seriously. All scanning and decoding operates strictly client-side within the browser sandbox with zero cloud storage. If you identify a potential security issue, dependency vulnerability, or client-side sanitization gap, please report it via email for responsible review. You can also read our{' '}
              <Link to="/qr-code-security" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">
                QR Code Security Guide
              </Link>{' '}
              for safe scanning advice.
            </p>
          </section>

          {/* Feature Suggestions & Project Feedback */}
          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" aria-hidden="true" />
              <span>Feature Suggestions &amp; Project Feedback</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Suggestions for new QR code formats, additional frame styling options, custom color palettes, or performance optimizations are always welcome. Feedback from print shops, educators, designers, and regular users directly drives future updates.
            </p>
          </section>

          {/* Email Section */}
          <section className="space-y-3 p-6 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
              <span>Email</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              You can contact the developer directly at:
            </p>
            <div className="pt-1">
              <a
                href="mailto:qrhereonline@gmail.com"
                id="contact-email-link"
                className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-500 transition-colors"
              >
                <span>qrhereonline@gmail.com</span>
              </a>
            </div>
          </section>

          {/* GitHub Project */}
          <section className="space-y-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ExternalLink className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" aria-hidden="true" />
              <span>GitHub Project</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Explore source repositories, issue trackers, and open-source contributions on GitHub:
            </p>
            <div className="pt-1">
              <a
                href="https://github.com/jhem0n"
                id="contact-github-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>github.com/jhem0n</span>
                <ExternalLink className="w-4 h-4 opacity-75" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* Quick Help & Self-Service Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Resources &amp; Documentation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <Link
                to="/faq"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-slate-900 transition flex flex-col gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Frequently Asked Questions</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Camera permissions, offline scanning, and generator options
                </span>
              </Link>
              <Link
                to="/privacy"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-slate-900 transition flex flex-col gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Privacy Policy</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Zero-knowledge client-side architecture and data handling
                </span>
              </Link>
              <Link
                to="/terms"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-slate-900 transition flex flex-col gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Terms of Service</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Permitted usage guidelines, licensing, and disclaimer
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
