import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Contact,
  Globe,
  FileText,
  Mail,
  Phone,
  Wifi,
  Download,
  Shield,
  Layers,
  Sliders,
  ExternalLink,
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
      question: 'Does the recipient need a special app to scan a vCard QR code?',
      answer:
        'No. Modern iOS and Android devices decode vCard QR codes directly through their native camera app. When scanned, the device automatically prompts an "Add to Contacts" sheet allowing the user to review and save the complete contact card with a single tap.',
    },
    {
      question: 'Can I customize colors and add a brand logo to my free vCard QR code?',
      answer:
        'Yes. On QR Here (https://qrhere.online/create), you can customize pattern colors, adjust corner styles, and embed your company logo directly into the center of the QR code without registering an account or paying subscription fees.',
    },
  ];

  // Combined JSON-LD Schema: Article + BreadcrumbList + FAQPage
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateArticleSchema(
        {
          headline: 'How to Create a vCard QR Code for Digital Business Cards (Free)',
          description:
            'Create digital business card QR codes using a vCard QR code generator free online. Enable instant address book saves with zero apps required.',
          canonicalPath: '/blog/how-to-create-vcard-qr-code',
          datePublished: '2026-09-18',
          dateModified: '2026-09-18',
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3 h-3" />
              Tutorial &amp; Best Practices
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

          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            How to Create a vCard QR Code for Digital Business Cards (Free)
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A vCard QR code instantly shares your contact details—including your full name, phone number,
            email, company, job title, and website—directly to a smartphone's native address book with
            a single camera scan. Using a browser-based <strong>vcard qr code generator free</strong> tool
            eliminates manual contact entry and ensures your contacts save your information error-free
            without downloading any third-party app.
          </p>
        </header>

        {/* Featured Visual: Digital Business Card Concept */}
        <figure className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 overflow-hidden shadow-sm">
          <div className="w-full max-w-2xl mx-auto">
            <svg
              viewBox="0 0 760 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              role="img"
              aria-labelledby="vcard-hero-title vcard-hero-desc"
              width="760"
              height="280"
            >
              <title id="vcard-hero-title">Digital Business Card vCard QR Code Workflow</title>
              <desc id="vcard-hero-desc">
                Illustration showing a physical business card with a vCard QR code scanning directly into a mobile address book with zero app installation.
              </desc>

              {/* Physical Business Card Mockup */}
              <rect x="30" y="30" width="310" height="200" rx="14" className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700" strokeWidth="2" />
              <rect x="50" y="55" width="48" height="48" rx="24" className="fill-blue-100 dark:fill-blue-900/60" />
              <circle cx="74" cy="74" r="14" className="fill-blue-600 dark:fill-blue-400" />
              <text x="112" y="70" className="fill-slate-900 dark:fill-white font-bold text-sm">Sarah Jenkins</text>
              <text x="112" y="88" className="fill-slate-500 dark:fill-slate-400 text-xs">Creative Director • Apex Studio</text>
              <text x="50" y="130" className="fill-slate-600 dark:fill-slate-300 text-[11px] font-mono">+1 (555) 019-2834</text>
              <text x="50" y="150" className="fill-slate-600 dark:fill-slate-300 text-[11px] font-mono">sarah@apexstudio.design</text>
              <text x="50" y="170" className="fill-blue-600 dark:fill-blue-400 text-[11px] font-mono">apexstudio.design</text>

              {/* Mini QR on Card */}
              <rect x="235" y="115" width="85" height="85" rx="8" className="fill-slate-900" />
              <rect x="245" y="125" width="22" height="22" className="fill-white" />
              <rect x="250" y="130" width="12" height="12" className="fill-slate-900" />
              <rect x="288" y="125" width="22" height="22" className="fill-white" />
              <rect x="293" y="130" width="12" height="12" className="fill-slate-900" />
              <rect x="245" y="168" width="22" height="22" className="fill-white" />
              <rect x="250" y="173" width="12" height="12" className="fill-slate-900" />
              <rect x="275" y="145" width="10" height="10" className="fill-white" />
              <rect x="270" y="160" width="8" height="8" className="fill-white" />
              <rect x="288" y="168" width="15" height="15" className="fill-white" />

              {/* Scan Arrow */}
              <path d="M 360 130 L 415 130" className="stroke-blue-500" strokeWidth="2.5" strokeDasharray="5 5" />
              <path d="M 405 124 L 420 130 L 405 136" className="fill-blue-500 stroke-blue-500" strokeWidth="2" />
              <text x="350" y="115" className="fill-blue-600 dark:fill-blue-400 text-[11px] font-semibold">1-Tap Scan</text>

              {/* Smartphone Address Book Mockup */}
              <rect x="440" y="20" width="280" height="235" rx="20" className="fill-slate-950 stroke-slate-700" strokeWidth="3" />
              <rect x="450" y="32" width="260" height="210" rx="14" className="fill-slate-50 dark:fill-slate-900" />
              
              {/* Phone Status Header */}
              <rect x="540" y="40" width="80" height="8" rx="4" className="fill-slate-300 dark:fill-slate-700" />
              <text x="470" y="70" className="fill-emerald-600 dark:fill-emerald-400 font-bold text-xs">✓ Contact Card Recognized</text>
              <text x="470" y="92" className="fill-slate-900 dark:fill-white font-bold text-sm">Save Sarah Jenkins?</text>
              
              <rect x="470" y="106" width="220" height="75" rx="8" className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" />
              <text x="482" y="125" className="fill-slate-500 dark:fill-slate-400 text-[10px]">Mobile Phone</text>
              <text x="482" y="140" className="fill-slate-800 dark:fill-slate-200 font-mono text-[11px]">+1 (555) 019-2834</text>
              <text x="482" y="158" className="fill-slate-500 dark:fill-slate-400 text-[10px]">Email</text>
              <text x="482" y="172" className="fill-blue-600 dark:fill-blue-400 text-[11px]">sarah@apexstudio.design</text>

              {/* Action Button on Phone */}
              <rect x="470" y="190" width="220" height="36" rx="8" className="fill-blue-600" />
              <text x="530" y="213" className="fill-white font-bold text-xs">Save to Contacts</text>
            </svg>
          </div>
          <figcaption className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            Native smartphone camera workflow: Point camera at the vCard QR code to import full credentials directly into Apple Contacts or Google Contacts.
          </figcaption>
        </figure>

        {/* Content Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-10">
          {/* Key Stat Blockquote */}
          <blockquote className="my-6 p-5 rounded-2xl border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-slate-800 dark:text-slate-200 not-italic">
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              Why vCard QR codes outperform physical cards:
            </p>
            <p className="text-sm leading-relaxed">
              Over 88% of printed paper business cards are discarded within a week. A digital vCard QR
              code saves directly into Apple Contacts or Google Contacts in under three seconds.
            </p>
          </blockquote>

          {/* Section: Walkthrough */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Step-by-Step: Generating a Free vCard QR Code on QR Here
            </h2>
            <p>
              Follow these four steps to generate a high-density, print-ready digital business card QR
              code using the free generator at <a href="https://qrhere.online/" className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">QR Here</a>.
            </p>

            <div className="space-y-10 mt-8">
              {/* STEP 1 */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 1: Select the vCard Contact Type
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Navigate to the{' '}
                  <a
                    href="https://qrhere.online/create"
                    className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    QR Here QR Code Generator
                  </a>{' '}
                  and select the <strong>V-card / Contact</strong> tab from the payload selector.
                </p>

                {/* Screenshot UI Mockup 1 */}
                <figure className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>UI Preview • Data Type Selector</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-[10px]">qrhere.online/create</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 opacity-60">
                      <Globe className="w-3.5 h-3.5" /> Link
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 opacity-60">
                      <FileText className="w-3.5 h-3.5" /> Text
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 opacity-60">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 opacity-60">
                      <Wifi className="w-3.5 h-3.5" /> Wi-Fi
                    </span>
                    {/* Active V-Card Tab */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 shadow-sm shadow-blue-500/30 ring-2 ring-blue-500/20">
                      <Contact className="w-3.5 h-3.5" /> V-card
                    </span>
                  </div>
                  <figcaption className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
                    [Screenshot: The QR Here creation tool showing the 'vCard / Contact' tab highlighted among data type options]
                  </figcaption>
                </figure>
              </div>

              {/* STEP 2 */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 2: Input Your Contact Information
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Fill in your core professional credentials into the structured fields. The generator
                  automatically formats these inputs into standard RFC 6350 (vCard 4.0/3.0) syntax (
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                    BEGIN:VCARD ... END:VCARD
                  </code>
                  ):
                </p>
                <ul className="space-y-2 text-sm list-disc pl-5 mb-4 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Full Name (<code className="text-xs">FN:</code>):</strong> E.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Sarah Jenkins</code>
                  </li>
                  <li>
                    <strong>Organization &amp; Title (<code className="text-xs">ORG:</code>, <code className="text-xs">TITLE:</code>):</strong> E.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Apex Studio</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Creative Director</code>
                  </li>
                  <li>
                    <strong>Phone Number (<code className="text-xs">TEL:</code>):</strong> Always include the international country code (e.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">+1-555-019-2834</code>) to ensure seamless dialing for global clients.
                  </li>
                  <li>
                    <strong>Email Address (<code className="text-xs">EMAIL:</code>):</strong> E.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">sarah@apexstudio.design</code>
                  </li>
                  <li>
                    <strong>Website URL (<code className="text-xs">URL:</code>):</strong> E.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">https://apexstudio.design</code>
                  </li>
                </ul>

                {/* Screenshot UI Mockup 2 */}
                <figure className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    UI Preview • vCard Contact Information Fields
                  </div>
                  <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 mb-1">First Name</span>
                        <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-medium">Sarah</div>
                      </div>
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 mb-1">Last Name</span>
                        <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-medium">Jenkins</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 mb-1">Phone Number (+Country Code)</span>
                        <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono text-blue-600 dark:text-blue-400">+1-555-019-2834</div>
                      </div>
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 mb-1">Email Address</span>
                        <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-medium">sarah@apexstudio.design</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 mb-1">Company / Organization</span>
                        <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-medium">Apex Studio</div>
                      </div>
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 mb-1">Website URL</span>
                        <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-blue-600 dark:text-blue-400">https://apexstudio.design</div>
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
                    [Screenshot: Form fields for Name, Phone Number, Email, and Company on the QR Here vCard input card]
                  </figcaption>
                </figure>
              </div>

              {/* STEP 3 */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 3: Set Error Correction to Level M or Q
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Because vCard payloads contain more alphanumeric characters than simple URLs, your
                  QR code will have higher module density. Select <strong>Level M (15%)</strong> or{' '}
                  <strong>Level Q (25%)</strong> error correction on QR Here to preserve scannability
                  even if printed business cards suffer scratches or smudges.
                </p>

                {/* Screenshot UI Mockup 3 */}
                <figure className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    UI Preview • Error Correction &amp; Live Real-Time Vector Preview
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="space-y-2">
                      <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Error Correction Level
                      </span>
                      <div className="p-2.5 rounded-lg border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-300">
                        <span>Medium (15% redundancy)</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Recommended balance between module density and scratch tolerance for business cards.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="w-24 h-24 bg-white p-2 rounded border border-slate-300 dark:border-slate-600 shadow-xs flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-1 w-full h-full">
                          <div className="bg-slate-900 col-span-2 row-span-2"></div>
                          <div className="bg-slate-900"></div>
                          <div className="bg-slate-900 col-span-2 row-span-2"></div>
                          <div className="bg-slate-900"></div>
                          <div className="bg-slate-900"></div>
                          <div className="bg-blue-600 col-span-1"></div>
                          <div className="bg-slate-900"></div>
                          <div className="bg-slate-900 col-span-2 row-span-2"></div>
                          <div className="bg-slate-900"></div>
                          <div className="bg-slate-900 col-span-2"></div>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Scannability Verified (4.5:1 Contrast)
                      </span>
                    </div>
                  </div>
                  <figcaption className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
                    [Screenshot: Error Correction dropdown menu on QR Here set to Level M with real-time vector preview updating]
                  </figcaption>
                </figure>
              </div>

              {/* STEP 4 */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                    4
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Step 4: Download in High-Resolution SVG or PNG
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Click <strong>Download SVG</strong> for infinite-resolution vector printing on physical
                  cards, badges, and stationery, or download a crisp <strong>PNG</strong> for digital email
                  signatures and lock-screen wallpapers.
                </p>

                {/* Screenshot UI Mockup 4 */}
                <figure className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    UI Preview • High-Resolution Export Actions
                  </div>
                  <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 shadow-sm shadow-blue-500/20"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PNG</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                    >
                      <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Download SVG (Vector)</span>
                    </button>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                      100% In-Browser &amp; Zero Watermarks
                    </span>
                  </div>
                  <figcaption className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
                    [Screenshot: Export buttons for 'Download PNG' and 'Download SVG' beneath the real-time QR code canvas]
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Section: Best Practices Table */}
          <section className="pt-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Best Practices for Digital Business Card QR Codes
            </h2>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              Follow these technical parameters to guarantee instantaneous scans across all smartphone
              cameras and operating systems:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-white">
                  <tr>
                    <th scope="col" className="p-3.5 sm:p-4">Factor</th>
                    <th scope="col" className="p-3.5 sm:p-4 text-blue-600 dark:text-blue-400">Recommended Standard</th>
                    <th scope="col" className="p-3.5 sm:p-4 text-rose-600 dark:text-rose-400">Common Pitfall to Avoid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 dark:text-white">Minimum Print Size</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">1.2 × 1.2 inches</code> (30 × 30 mm)
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-400">
                      Printing under 0.8 in causes dense vCard modules to blur together on standard camera sensors.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 dark:text-white">Color Contrast</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                      Dark foreground on light background (≥ 4.5:1 ratio)
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-400">
                      Light gray, pastel, or inverted (white on yellow) codes that native camera apps cannot detect.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 dark:text-white">Payload Density</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                      Include only essential contact fields
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-400">
                      Adding large bio paragraphs or profile images into static vCards, resulting in ultra-dense codes that fail to scan.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 dark:text-white">Phone Formatting</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">+E.164</code> format (<code className="text-xs">+1XXXXXXXXXX</code>)
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-400">
                      Omitting country codes, preventing international colleagues from saving or calling the number directly.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Frequently Asked Questions */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-5"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item.question}</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Author & Navigation */}
        <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Written by QR Here Editorial</span>
            <span>•</span>
            <span>Mobile Networking &amp; vCard Standards</span>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Browse all articles</span>
            <ArrowLeft className="w-3 h-3 rotate-180" />
          </Link>
        </footer>
      </article>
    </>
  );
};
