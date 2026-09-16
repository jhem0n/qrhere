import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, HelpCircle, Shield, FileText } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { AdBanner } from '../../components/ads/AdBanner';

export const ContactPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Contact', path: '/contact' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.contact} breadcrumbs={breadcrumbs} />

      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        <AdBanner position="top" />

        {/* Centered Main Contact Content */}
        <div className="my-auto py-10 sm:py-14 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40 mb-6 shadow-sm">
            <Mail className="w-6 h-6" aria-hidden="true" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Contact
          </h1>

          <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            <p>
              For any question or request you can mail me at{' '}
              <span className="text-slate-500 dark:text-slate-400">[</span>{' '}
              <a
                href="mailto:qrhereonline@gmail.com"
                id="contact-email-link"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-500 transition-colors"
              >
                qrhereonline at gmail.com
              </a>{' '}
              <span className="text-slate-500 dark:text-slate-400">]</span>
            </p>

            <p>
              Check out my other projects on{' '}
              <a
                href="https://github.com/jhem0n"
                id="contact-github-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-500 transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-75" aria-hidden="true" />
              </a>
            </p>
          </div>

          {/* Quick Help & Self-Service Links */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 text-left max-w-xl mx-auto">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 text-center">
              Quick Resources & Self-Service
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <Link
                to="/faq"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors flex flex-col items-center text-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Frequently Asked Questions</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Answers to common scan & generation questions</span>
              </Link>
              <Link
                to="/privacy"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors flex flex-col items-center text-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">Privacy Policy</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero-knowledge in-browser architecture details</span>
              </Link>
              <Link
                to="/terms"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors flex flex-col items-center text-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold">Terms of Service</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Permitted use and open standard guidelines</span>
              </Link>
            </div>
          </div>
        </div>

        <AdBanner position="bottom" />
      </div>
    </>
  );
};
