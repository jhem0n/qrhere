import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';
import { APP_CONFIG } from '../../config/app.config';
import { AdBanner } from '../../components/ads/AdBanner';

export const TermsPage: React.FC = () => {
  const lastUpdated = 'September 15, 2026';
  const breadcrumbs = [{ name: 'Terms of Service', path: '/terms' }];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.terms} breadcrumbs={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Last Updated: {lastUpdated} • Effective Date: {lastUpdated}
          </p>
        </header>

        <AdBanner position="top" />

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using {APP_CONFIG.name} ("the Service"), operated by{' '}
              {APP_CONFIG.name}, you agree to be bound by these Terms of Service. If you do not agree with any part
              of these terms, you must discontinue use of the Service immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Permitted Use</h2>
            <p>
              You are granted a non-exclusive, revocable, non-transferable license to access and use
              the application for personal, educational, and lawful commercial purposes. You agree
              not to use the Service to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Generate QR codes that link to malware, phishing sites, or fraudulent services.</li>
              <li>
                Engage in any automated scraping, reverse engineering, or denial of service attacks.
              </li>
              <li>Violate any local, national, or international laws or regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Scanning Untrusted Third-Party Content
            </h2>
            <p>
              QR codes can encode arbitrary text and links. You acknowledge and agree that scanning a
              QR code provided by a third party involves inherent security risks. While our
              application includes URL sanitization and blocks known malicious execution schemes, we
              do not control the content or security of destination websites. You are solely
              responsible for verifying the safety of any link prior to opening it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Disclaimer of Warranties
            </h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF
              ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
              WARRANT THAT THE CAMERA SCANNER OR QR GENERATOR WILL BE UNINTERRUPTED, ERROR-FREE, OR
              COMPATIBLE WITH EVERY HARDWARE DEVICE OR BROWSER CONFIGURATION.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Limitation of Liability
            </h2>
            <p>
              IN NO EVENT SHALL THE OPERATORS OF {APP_CONFIG.name} BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION
              WITH YOUR ACCESS TO OR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO VIRUSES,
              PHISHING ENCOUNTERS, DATA LOSS, OR EQUIPMENT DAMAGE.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. Intellectual Property
            </h2>
            <p>
              The application interface, design systems, logos, and custom code are the property of{' '}
              {APP_CONFIG.name}. The QR code standard itself is an open standard created by Denso Wave Incorporated.
              You retain all ownership rights to any content, text, or graphics you create or scan
              using the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the applicable legal jurisdiction, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              8. Privacy & Data Protection
            </h2>
            <p>
              Your privacy is fundamental to our service design. All QR code decoding and image processing executes strictly in your browser. For comprehensive details on our zero-knowledge architecture, please see our{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">9. Contact Us</h2>
            <p>
              Questions regarding these Terms of Service should be directed to our{' '}
              <Link to="/contact" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4">
                Contact Page
              </Link>{' '}
              or via email at:{' '}
              <a
                href={`mailto:${APP_CONFIG.contactEmail}`}
                className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4"
              >
                {APP_CONFIG.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>

        <AdBanner position="bottom" />
      </div>
    </>
  );
};
