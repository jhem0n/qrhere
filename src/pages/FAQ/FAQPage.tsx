import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Search, Camera, PlusCircle, MessageSquare } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG } from '../../config/seo.config';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Scanning' | 'Generation' | 'Privacy & Security' | 'Troubleshooting';
}

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]);

  const breadcrumbs = [{ name: 'Frequently Asked Questions', path: '/faq' }];

  const faqItems: FAQItem[] = [
    {
      category: 'Scanning',
      question: 'What is a QR code and how does it store information?',
      answer:
        'A QR (Quick Response) code is a two-dimensional matrix barcode invented by Denso Wave in 1994. It encodes data using patterns of dark and light squares. Unlike traditional 1D barcodes that hold around 20 numeric characters, a QR code can store up to 7,089 numbers or 4,296 alphanumeric characters, including complex URLs and binary data.',
    },
    {
      category: 'Scanning',
      question: 'How do I scan a QR code using my device camera?',
      answer:
        'Click "Start Camera" on our scanner page. Grant permission when your browser prompts for webcam or phone camera access. Point your camera at the QR code so it appears inside the viewfinder brackets. Once aligned, the scanner will automatically detect and decode the code in real time.',
    },
    {
      category: 'Scanning',
      question: 'Can I scan a QR code from a screenshot or image file?',
      answer:
        'Yes. Switch to the "Upload Image" tab on the scanner page. Drag and drop or browse for any image file (PNG, JPG, JPEG, or WEBP). Our client-side image decoder will process the picture immediately without uploading it to any server.',
    },
    {
      category: 'Scanning',
      question: 'Does the scanner work on smartphones and tablets?',
      answer:
        'Yes. The application is fully responsive and automatically prioritizes the rear-facing (environment) camera on mobile devices. You can also toggle between front and rear cameras using the flip camera icon in the live viewfinder.',
    },
    {
      category: 'Privacy & Security',
      question: 'Is QR scanning on this website private?',
      answer:
        'Yes, 100%. All decoding algorithms run locally in your web browser using HTML5 Canvas and client-side JavaScript. Neither your camera feed, uploaded photos, nor decoded QR text are ever sent to our servers or stored permanently.',
    },
    {
      category: 'Privacy & Security',
      question: 'How do you protect users from malicious QR code links?',
      answer:
        'We treat all QR content as untrusted input. When a link is detected, we parse it through a strict URL validator that forbids dangerous script protocols like "javascript:", "vbscript:", and dangerous "data:" URIs. We display the URL clearly and require you to explicitly click "Open Link", which opens in a new tab with noopener and noreferrer protections.',
    },
    {
      category: 'Generation',
      question: 'Can I create a QR code for a website or URL?',
      answer:
        'Yes. Select "Website URL" in our QR generator, enter your website address (e.g., https://example.com), and the preview will update in real time. We recommend including the https:// prefix so smartphones immediately launch their browser when scanned.',
    },
    {
      category: 'Generation',
      question: 'How do Wi-Fi QR codes work?',
      answer:
        'A Wi-Fi QR code encodes your network name (SSID), security type (WPA, WEP, or Open), and password using the standard WIFI protocol. When scanned with iOS or Android camera apps, the phone prompts the user with "Join Network" and connects automatically without manual typing.',
    },
    {
      category: 'Generation',
      question: 'What is the difference between downloading PNG and SVG?',
      answer:
        'PNG is a raster bitmap format made of pixels, ideal for posting on websites, adding to slides, or sending via email. SVG (Scalable Vector Graphics) is made of mathematical vector lines, meaning it can be scaled to any size—from a business card to a highway billboard—with zero loss in crispness or quality.',
    },
    {
      category: 'Generation',
      question: 'What is QR Error Correction and which level should I choose?',
      answer:
        'QR codes use Reed-Solomon error correction to restore damaged or obscured portions. We support Level L (7%), Level M (15%), Level Q (25%), and Level H (30%). Level M is the default standard for screen display, while Level H is strongly recommended for outdoor signs or printed flyers that might get scuffed.',
    },
    {
      category: 'Generation',
      question: 'Why does the generator show a color contrast warning?',
      answer:
        'Optical camera sensors require high contrast between dark and light modules to distinguish bits. If you select colors with a contrast ratio below 4.0:1 (like yellow on white, or navy on black), smartphone cameras will struggle or fail completely. Our generator warns you before you download an unreadable design.',
    },
    {
      category: 'Troubleshooting',
      question: 'Why does my camera say "Permission Denied"?',
      answer:
        'Browsers remember your camera permissions. If you previously clicked "Block", click the lock or tune icon in your browser URL bar, set Camera to "Allow", and refresh the page. Also ensure no other app (like Zoom or Teams) is currently locking your webcam.',
    },
    {
      category: 'Troubleshooting',
      question: 'Why did the scanner fail to detect a QR code in my uploaded photo?',
      answer:
        'Common causes include: the QR code is cropped off at the edges (missing its quiet zone), the image is excessively blurry or low-resolution, or the image has heavy lighting glare across the finder squares. Try taking a clearer, well-lit photo and re-uploading.',
    },
  ];

  const categories = ['All', 'Scanning', 'Generation', 'Privacy & Security', 'Troubleshooting'];

  const filteredFaqs = faqItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Generate FAQPage Structured Data matching visible content
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.faq}
        structuredData={faqStructuredData}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Semantic Breadcrumbs Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <header className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything you need to know about scanning, generating, downloading, and troubleshooting
            QR codes securely.
          </p>
        </header>

        {/* Search & Category Filter Controls */}
        <section aria-label="FAQ Filters" className="my-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              id="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Wi-Fi, camera, SVG, privacy)..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`faq-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer min-h-[36px] ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section aria-label="Questions and Answers">
          <div className="space-y-3">
            <h2 className="sr-only">Knowledge Base Articles</h2>
            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-500">
                  No questions found matching "{searchQuery}". Try searching with different keywords.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndexes.includes(idx);
                return (
                  <article
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition mb-3 last:mb-0"
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-toggle-${idx}`}
                        onClick={() => toggleIndex(idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-850 transition cursor-pointer min-h-[44px]"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{faq.question}</span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className="hidden sm:inline text-[11px] font-normal px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {faq.category}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* Additional Help Links */}
        <section aria-label="Support and Contact Resources" className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Still Have Questions?
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Need further assistance with camera permissions, high-density SVG rendering, or privacy specifications? We are here to help.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/scan"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Test Camera Scanner</span>
            </Link>
            <Link
              to="/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Generate a QR Code</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
