/**
 * Static route definitions and semantic HTML for crawler-friendly prerendering.
 * These are emitted as static HTML files during `vite build` so crawlers with
 * JavaScript disabled immediately receive full semantic HTML, H1 headings,
 * complete text, and internal navigation links.
 */

export interface StaticRouteConfig {
  path: string;
  folder: string;
  title: string;
  description: string;
  keywords: string;
  heading: string;
  breadcrumbs: { name: string; path: string }[];
  htmlContent: string;
}

export const STATIC_ROUTES: StaticRouteConfig[] = [
  {
    path: '/qr-code-generator',
    folder: 'qr-code-generator',
    title: 'QR Code Generator | QR Here',
    description:
      'Create custom QR codes with logos, frames, and colors. Download your QR code as SVG or PNG.',
    keywords:
      'QR code generator, create QR code, QR code generator with logo, custom QR code maker, vector QR code SVG, high resolution QR code PNG, Wi-Fi QR code generator, QR Here',
    heading: 'QR Code Generator',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'QR Code Generator', path: '/qr-code-generator' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-4">
          QR Code Generator
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto text-center leading-relaxed mb-8">
          Create custom QR codes with logos, frames, and colors. Download your QR code as SVG or PNG.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">14 Supported Data Types</h2>
            <p class="text-xs text-slate-600 leading-relaxed">
              Generate codes for Website URLs, Wi-Fi network credentials, vCard contacts, Email messages, SMS, Telephone numbers, and Geolocation coordinates.
            </p>
          </div>
          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">Design Customization</h2>
            <p class="text-xs text-slate-600 leading-relaxed">
              Customize dots, corner squares, center icons, and color palettes with automated WCAG contrast validation to prevent unreadable codes.
            </p>
          </div>
          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">Vector & High-Res Export</h2>
            <p class="text-xs text-slate-600 leading-relaxed">
              Export in scalable vector SVG format for crisp print production at billboard scale, or download clean raster PNG up to 1024x1024 pixels.
            </p>
          </div>
        </div>

        <div class="p-6 rounded-2xl border border-blue-100 bg-blue-50/50 my-6">
          <h2 class="text-base font-bold text-blue-950 mb-2">Scan & Test Your QR Codes</h2>
          <p class="text-sm text-blue-900/80 mb-4">
            Always verify your newly generated QR codes before printing or distributing them.
          </p>
          <a href="/" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700">
            Open QR Scanner
          </a>
        </div>

        <div class="border-t border-slate-200 pt-6 mt-8 text-sm text-slate-600 space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Printing Tips & Error Correction</h2>
          <p>
            When embedding a center logo, select high error correction (Level Q or H) to preserve scan integrity. Check our <a href="/faq" class="text-blue-600 underline">Frequently Asked Questions</a> for recommended print dimensions, or review our <a href="/terms" class="text-blue-600 underline">Terms of Service</a> for usage guidelines.
          </p>
        </div>
      </section>
    `,
  },
  {
    path: '/about',
    folder: 'about',
    title: 'About Us | QR Here',
    description:
      'Learn how QR Here operates entirely in your browser using modern client-side algorithms to ensure total privacy and zero data harvesting.',
    keywords:
      'about QR Here, private QR scanner, client side QR code, browser QR decoding, zero knowledge scanner',
    heading: 'About QR Here',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-4">
          About QR Here
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto text-center leading-relaxed mb-8">
          QR Here is a lightweight, zero-knowledge web application built to make QR scanning and generation fast, private, and universally accessible without app installations.
        </p>

        <div class="space-y-6 text-sm text-slate-700 leading-relaxed my-8">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Our Privacy Philosophy</h2>
            <p>
              Every year, millions of users download mobile scanner apps riddled with intrusive tracking, advertising identifiers, and unnecessary system permissions. QR Here was created as a transparent, client-side alternative. All image parsing and vector rendering happens entirely within your web browser's memory sandbox.
            </p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Zero-Knowledge Architecture</h2>
            <p>
              When you point your camera at a QR code or upload a photo, your images are never sent across the network to our servers or third-party storage buckets. Video stream frames are consumed by an HTML5 canvas element, decoded via WebAssembly and JavaScript, and immediately released.
            </p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Built with Open Standards</h2>
            <p>
              QR Here utilizes standard web APIs (MediaDevices, Canvas, WebAssembly) and open-source decoding libraries. The QR code format itself is an open ISO/IEC 18004 standard originally created by Denso Wave.
            </p>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-6 mt-8 flex flex-wrap gap-4 text-sm">
          <a href="/" class="text-blue-600 font-semibold underline">Online Scanner</a>
          <a href="/qr-code-generator" class="text-blue-600 font-semibold underline">QR Generator</a>
          <a href="/faq" class="text-blue-600 font-semibold underline">FAQ</a>
          <a href="/privacy" class="text-blue-600 font-semibold underline">Privacy Policy</a>
          <a href="/terms" class="text-blue-600 font-semibold underline">Terms of Service</a>
          <a href="/contact" class="text-blue-600 font-semibold underline">Contact Us</a>
        </div>
      </section>
    `,
  },
  {
    path: '/contact',
    folder: 'contact',
    title: 'Contact Us | QR Here',
    description:
      'Contact the QR Here maintainer for technical support, feedback, bug reports, or feature requests regarding our online QR tools.',
    keywords: 'contact QR Here, QR code email, QR Here feedback, jhem0n',
    heading: 'Contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    htmlContent: `
      <section class="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
          Contact
        </h1>
        <div class="space-y-4 text-base sm:text-lg text-slate-700 max-w-xl mx-auto leading-relaxed mb-8">
          <p>
            For any question or request you can mail me at [ <a href="mailto:qrhereonline@gmail.com" class="text-blue-600 font-medium underline">qrhereonline at gmail.com</a> ]
          </p>
          <p>
            Check out my other projects on <a href="https://github.com/jhem0n" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-medium underline">GitHub</a>
          </p>
        </div>

        <div class="mt-10 pt-8 border-t border-slate-200 text-left max-w-xl mx-auto">
          <h2 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 text-center">
            Quick Resources & Self-Service
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <a href="/faq" class="p-3 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 text-slate-700 hover:text-blue-600">
              <span class="font-semibold">FAQ</span>
              <span class="text-[11px] text-slate-500">Common questions & help</span>
            </a>
            <a href="/privacy" class="p-3 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 text-slate-700 hover:text-blue-600">
              <span class="font-semibold">Privacy Policy</span>
              <span class="text-[11px] text-slate-500">Zero-knowledge details</span>
            </a>
            <a href="/terms" class="p-3 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 text-slate-700 hover:text-blue-600">
              <span class="font-semibold">Terms of Service</span>
              <span class="text-[11px] text-slate-500">Permitted use guidelines</span>
            </a>
          </div>
        </div>
      </section>
    `,
  },
  {
    path: '/faq',
    folder: 'faq',
    title: 'Frequently Asked Questions | QR Here',
    description:
      'Clear answers to common questions about scanning with camera or image upload, generating Wi-Fi QR codes, error correction, and privacy safety.',
    keywords:
      'QR code FAQ, how to scan QR code, how to create QR code, QR code security, safe QR scanning, Wi-Fi QR code help',
    heading: 'Frequently Asked Questions',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto text-center leading-relaxed mb-8">
          Answers to common questions regarding scanning with webcam or image files, custom generator options, and privacy protections.
        </p>

        <div class="space-y-6 text-sm text-slate-700 leading-relaxed my-8">
          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">How does the camera scanner work?</h2>
            <p>The scanner requests temporary camera access via your browser's MediaDevices API. Video frames are streamed to an in-memory HTML5 video element and decoded in real time without sending data over the internet.</p>
          </div>

          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">How do I scan a QR code from an image or screenshot?</h2>
            <p>Click "Upload Image" on the scanner workbench and select any PNG, JPG, or WEBP image. The image is drawn to an off-screen canvas and parsed locally.</p>
          </div>

          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">Are my uploaded images or video frames saved?</h2>
            <p>No. We operate a strict zero-knowledge architecture. All decoding runs in your browser's local JavaScript environment. We have no databases storing decoded payloads.</p>
          </div>

          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">What is the difference between SVG and PNG downloads?</h2>
            <p>SVG (Scalable Vector Graphics) is a mathematical vector format that scales to any size without pixelation, ideal for printing flyers, banners, and business cards. PNG is a raster bitmap format suited for digital displays, email signatures, and web use.</p>
          </div>

          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-base font-bold text-slate-900 mb-2">How do I create a Wi-Fi QR code?</h2>
            <p>Navigate to the Generator page, select the "Wi-Fi" preset, enter your network SSID and password, and download the QR code. Guests can scan it with their camera to join automatically.</p>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-6 mt-8 flex flex-wrap gap-4 text-sm">
          <a href="/" class="text-blue-600 font-semibold underline">Try Camera Scanner</a>
          <a href="/qr-code-generator" class="text-blue-600 font-semibold underline">Generate QR Code</a>
          <a href="/contact" class="text-blue-600 font-semibold underline">Contact Support</a>
        </div>
      </section>
    `,
  },
  {
    path: '/privacy',
    folder: 'privacy',
    title: 'Privacy Policy | QR Here',
    description:
      'Our strict privacy policy. Learn how all QR decoding and generation executes locally in your browser with zero data retention and zero tracking.',
    keywords:
      'QR scanner privacy policy, no data collection, private scanner, client side security, zero tracking',
    heading: 'Privacy Policy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p class="text-xs text-slate-500 mb-8">
          Last Updated: September 16, 2026 • Zero-Knowledge Architecture
        </p>

        <div class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">1. Introduction</h2>
            <p>Welcome to QR Here ("we", "our", or "the Service"), operated by QR Here. We believe utility tools should respect user privacy by default. This policy details our in-browser, client-side processing architecture.</p>
          </div>

          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">2. Client-Side QR Processing</h2>
            <p>When you use QR Here, all camera streams and uploaded image files are processed strictly on your device. Video frames and uploaded images are never transmitted across the network, stored on servers, or shared with third parties.</p>
          </div>

          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">3. Zero Data Retention</h2>
            <p>We do not store decoded payloads, Wi-Fi credentials, contact cards, or camera frames. Once decoding finishes, all memory buffers are cleared by the browser garbage collector.</p>
          </div>

          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">4. Related Policies</h2>
            <p>Please review our <a href="/terms" class="text-blue-600 underline font-medium">Terms of Service</a> for acceptable use rules, or reach out via our <a href="/contact" class="text-blue-600 underline font-medium">Contact Page</a> if you have any questions.</p>
          </div>
        </div>
      </section>
    `,
  },
  {
    path: '/terms',
    folder: 'terms',
    title: 'Terms of Service | QR Here',
    description:
      'Terms of service, usage guidelines, and open standard disclaimers for using the QR Here web application.',
    keywords: 'terms of service, user agreement, disclaimer, terms of use',
    heading: 'Terms of Service',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Terms of Service
        </h1>
        <p class="text-xs text-slate-500 mb-8">
          Last Updated: September 16, 2026 • Legal Agreement
        </p>

        <div class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">1. Agreement to Terms</h2>
            <p>By accessing or using QR Here ("the Service"), operated by QR Here, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.</p>
          </div>

          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">2. Permitted Use</h2>
            <p>You may use this tool for personal, educational, and lawful commercial purposes. You agree not to use the service to generate QR codes linking to malicious software, phishing pages, or fraudulent activities.</p>
          </div>

          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">3. Intellectual Property</h2>
            <p>The QR Here interface and codebase are property of QR Here. The QR code format is an open standard created by Denso Wave. You retain full ownership of any content you create or scan.</p>
          </div>

          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">4. Privacy & Contact</h2>
            <p>Our client-side zero-knowledge architecture is described in our <a href="/privacy" class="text-blue-600 underline font-medium">Privacy Policy</a>. For questions, visit our <a href="/contact" class="text-blue-600 underline font-medium">Contact Page</a>.</p>
          </div>
        </div>
      </section>
    `,
  },
  {
    path: '/blog',
    folder: 'blog',
    title: 'QR Code Blog: Guides, Tips & Tutorials | QR Here',
    description:
      'Learn about QR codes, scanning, generation, static and dynamic QR codes, and practical tips with simple guides and tutorials.',
    keywords:
      'QR code blog, static vs dynamic QR code, QR code tutorials, QR code guides, QR scanner tips, QR generator guide',
    heading: 'Blog',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ],
    htmlContent: `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 class="sr-only">Blog</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <article class="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div class="w-full aspect-[16/9] bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-b border-slate-200">
              <span class="text-xs font-semibold uppercase tracking-wider">Featured Image</span>
            </div>
            <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 mb-3">
                  <a href="/blog/how-to-create-wifi-qr-code" class="text-blue-600 underline">
                    How to Create a WiFi QR Code (Free, No App)
                  </a>
                </h2>
                <p class="text-base text-slate-600 leading-relaxed mb-6">
                  Stop reading your WiFi password out loud. Learn how to make a free WiFi QR code guests can scan to connect instantly — no app, no sign-up, no typing.
                </p>
              </div>
              <a href="/blog/how-to-create-wifi-qr-code" class="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 self-start">
                Read Article
              </a>
            </div>
          </article>

          <article class="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div class="w-full aspect-[16/9] bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-b border-slate-200">
              <span class="text-xs font-semibold uppercase tracking-wider">Featured Image</span>
            </div>
            <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 mb-3">
                  <a href="/blog/how-to-scan-qr-code-without-app" class="text-blue-600 underline">
                    How to Scan a QR Code Without Installing an App
                  </a>
                </h2>
                <p class="text-base text-slate-600 leading-relaxed mb-6">
                  You do not need to download an ad-filled scanner app from an app store. Here is how to scan QR codes using your iPhone, Android, or desktop computer, plus how to decode codes straight from screenshots.
                </p>
              </div>
              <a href="/blog/how-to-scan-qr-code-without-app" class="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 self-start">
                Read Article
              </a>
            </div>
          </article>

          <article class="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div class="w-full aspect-[16/9] bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-b border-slate-200">
              <span class="text-xs font-semibold uppercase tracking-wider">Featured Image</span>
            </div>
            <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 mb-3">
                  <a href="/blog/how-to-create-vcard-qr-code" class="text-blue-600 underline">
                    How to Create a vCard QR Code for Digital Business Cards
                  </a>
                </h2>
                <p class="text-base text-slate-600 leading-relaxed mb-6">
                  Put your contact details directly into a QR code for your business card. Contacts can scan it with their standard camera and save your name, phone number, and email straight to their address book.
                </p>
              </div>
              <a href="/blog/how-to-create-vcard-qr-code" class="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 self-start">
                Read Article
              </a>
            </div>
          </article>

          <article class="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div class="w-full aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-200">
              <img src="/images/static-vs-dynamic-qr-code.jpg" onerror="this.src='/images/static-vs-dynamic-qr-code.svg'" alt="Static vs Dynamic QR Codes Infographic" class="w-full h-full object-cover" />
            </div>
            <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 mb-3">
                  <a href="/blog/static-vs-dynamic-qr-code" class="text-blue-600 underline">
                    Static vs Dynamic QR Codes: What’s the Difference?
                  </a>
                </h2>
                <p class="text-base text-slate-600 leading-relaxed mb-6">
                  Learn how static and dynamic QR codes store data differently, why static codes never expire, and how to choose the right format for your flyers, business cards, or product packaging.
                </p>
              </div>
              <a href="/blog/static-vs-dynamic-qr-code" class="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 self-start">
                Read Article
              </a>
            </div>
          </article>
        </div>
      </section>
    `,
  },
  {
    path: '/blog/static-vs-dynamic-qr-code',
    folder: 'blog/static-vs-dynamic-qr-code',
    title: 'Static vs Dynamic QR Code: What’s the Difference? | QR Here',
    description:
      'Learn the difference between static and dynamic QR codes, how they work, their key benefits, limitations, and which type to use.',
    keywords:
      'static vs dynamic QR code, static QR code, dynamic QR code, static QR, dynamic QR, editable QR code, QR code generator, QR code scanner, QR code tracking, QR code analytics',
    heading: 'Static vs Dynamic QR Codes: What’s the Difference?',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: 'Static vs Dynamic QR Code', path: '/blog/static-vs-dynamic-qr-code' },
    ],
    htmlContent: `
      <article class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Static vs Dynamic QR Codes: What’s the Difference?
        </h1>
        <p class="text-base text-slate-600 leading-relaxed mb-6">
          Learn the difference between static and dynamic QR codes, how they work, their key benefits, limitations, and which type to use.
        </p>

        <figure class="my-8 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <img
            src="/images/static-vs-dynamic-qr-code.jpg"
            onerror="this.src='/images/static-vs-dynamic-qr-code.svg'"
            alt="Static vs Dynamic QR Codes: The Difference Revealed Infographic comparing permanence and privacy with flexibility and analytics"
            class="w-full h-auto object-contain"
            width="1200"
            height="900"
          />
          <figcaption class="text-center text-xs text-slate-500 py-3 px-4 bg-slate-50 border-t border-slate-100">
            Static QR codes encode data permanently with zero server reliance, while dynamic QR codes route through a redirection server for editable destinations and scan analytics.
          </figcaption>
        </figure>

        <section class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">What Is a Static QR Code?</h2>
            <p>A static QR code encodes its information directly into the pattern of black and white squares. Because the data is etched into the code itself, changing the information requires generating a new QR code. You can <a href="/qr-code-generator" class="text-blue-600 underline font-medium">generate static QR</a> codes for websites, Wi-Fi networks, and contact info.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">What Is a Dynamic QR Code?</h2>
            <p>A dynamic QR code encodes an intermediary redirect URL, allowing the final destination to be modified at any time without replacing the printed barcode.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">How to Scan a QR Code</h2>
            <p>You can use your mobile camera or <a href="/" class="text-blue-600 underline font-medium">scan QR code</a> tools directly online using your webcam or photo uploads.</p>
          </div>
        </section>
      </article>
    `,
  },
  {
    path: '/blog/how-to-create-vcard-qr-code',
    folder: 'blog/how-to-create-vcard-qr-code',
    title: 'vCard QR Code Generator Free: Create Digital Cards | QR Here',
    description:
      'Create digital business card QR codes using a vCard QR code generator free online. Enable instant address book saves with zero apps required. Generate yours now!',
    keywords:
      'vcard qr code generator free, digital business card qr code, contact qr code generator, free vcard qr code maker, vcard qr code, digital business cards',
    heading: 'How to Create a vCard QR Code for Digital Business Cards',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      {
        name: 'vCard QR Code for Digital Business Cards',
        path: '/blog/how-to-create-vcard-qr-code',
      },
    ],
    htmlContent: `
      <article class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How to Create a vCard QR Code for Digital Business Cards
        </h1>
        <p class="text-base text-slate-600 leading-relaxed mb-8">
          A vCard QR code instantly shares your contact details directly to a smartphone native address book with a single camera scan. Using a browser-based free tool eliminates manual contact entry and ensures your contacts save your information error-free without downloading any third-party app.
        </p>

        <section class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Why Use a vCard QR Code on a Business Card?</h2>
            <p>Paper cards get lost easily. Scanning a vCard QR code automatically inputs your name, phone number, company, and email into their phone contacts list in seconds.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">How to Create Your Code Step by Step</h2>
            <p>Go to the <a href="/qr-code-generator" class="text-blue-600 underline font-medium">QR Code Generator</a>, choose V-card, enter your details, choose error correction level M, and download in vector SVG or high-resolution PNG.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Testing Your Code</h2>
            <p>Always test your code with our <a href="/" class="text-blue-600 underline font-medium">online QR scanner</a> or phone camera before mass printing.</p>
          </div>
        </section>
      </article>
    `,
  },
  {
    path: '/blog/how-to-scan-qr-code-without-app',
    folder: 'blog/how-to-scan-qr-code-without-app',
    title: 'How to Scan a QR Code Without an App | QR Here',
    description:
      'Learn how to scan QR codes on iPhone, Android, and PC without installing third-party apps. Step-by-step camera and browser scanner guide.',
    keywords:
      'how to scan qr code without app, scan qr code online, scan qr code from screenshot, camera qr scanner, scan qr code without downloading app, browser qr code scanner',
    heading: 'How to Scan a QR Code Without Installing an App',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      {
        name: 'How to Scan a QR Code Without an App',
        path: '/blog/how-to-scan-qr-code-without-app',
      },
    ],
    htmlContent: `
      <article class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How to Scan a QR Code Without Installing an App
        </h1>
        <p class="text-base text-slate-600 leading-relaxed mb-8">
          You do not need to download an ad-filled scanner app from an app store. Your iPhone or Android camera already has scanning built in, and you can scan from webcams or uploaded screenshots directly in your browser.
        </p>

        <section class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Scanning With Your Built-In Phone Camera</h2>
            <p>Simply open your default Camera app on iOS or Android and point it steadily at the QR code. A banner notification pops up with the decoded link.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Scanning in Your Browser or From Screenshots</h2>
            <p>Use our free <a href="/" class="text-blue-600 underline font-medium">online QR code scanner</a> to decode codes via your webcam or by uploading a photo or screenshot directly from your camera roll or desktop.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Creating QR Codes</h2>
            <p>If you need to make your own high-contrast, easily scannable QR code, use our free <a href="/qr-code-generator" class="text-blue-600 underline font-medium">QR code generator</a>.</p>
          </div>
        </section>
      </article>
    `,
  },
  {
    path: '/qr-code-security',
    folder: 'qr-code-security',
    title: 'QR Code Security Guide: How to Scan QR Codes Safely | QR Here',
    description:
      'Learn how QR code phishing and quishing work, how to spot suspicious QR codes and URLs, and practical steps for safer QR code scanning.',
    keywords:
      'QR code security, QR code phishing, quishing, QR code scams, malicious QR codes, safe QR scanning, how to scan a QR code safely, QR code safety, QR code privacy, QR code scanner online, suspicious QR code, malicious QR code, QR phishing attacks',
    heading: 'QR Code Security Guide: How to Scan QR Codes Safely',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      {
        name: 'QR Code Security',
        path: '/qr-code-security',
      },
    ],
    htmlContent: `
      <article class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          QR Code Security Guide: How to Scan QR Codes Safely
        </h1>
        <p class="text-base text-slate-600 leading-relaxed mb-6">
          QR codes are convenient. You can use one to open a restaurant menu, pay for parking, join a Wi-Fi network, open a website, or get information from a poster. The problem is that a QR code does not tell you whether its destination is trustworthy. That is why QR code security is less about the square pattern itself and more about checking where the code takes you before you trust what you see.
        </p>

        <section class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">What is QR code phishing?</h2>
            <p>QR code phishing is an attack that uses a QR code instead of, or alongside, a normal clickable link. The attacker creates a QR code pointing to a fraudulent website. The surrounding message may pretend to come from a bank, postal courier, employer, or government agency with the goal of harvesting credentials or stealing payments.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">What is quishing?</h2>
            <p>Quishing is short for "QR code phishing." The malicious URL is hidden inside a QR code, which can make the attack harder to notice because users focus on the visual image rather than the destination link. The FBI has documented quishing campaigns where malicious QR codes embedded in phishing messages directed victims to fraudulent websites.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">How can a QR code hide a malicious URL?</h2>
            <p>A QR code is simply machine-readable data. That data can be a web address, plain text, or custom URI scheme. When a QR code stores a URL, the physical image does not visually show whether it points to the genuine website or a deceptive spoofed domain. The safest habit is to inspect the decoded destination before opening it in your browser.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">How to inspect a QR destination</h2>
            <p>Scanning a QR code does not mean you must immediately visit the resulting site. When your scanner decodes the payload, examine the domain carefully for misspelled brand names, abnormal top-level domains, unexpected subdomains, or suspicious URL paths. Remember that HTTPS only encrypts the connection; it does not prove that a website is trustworthy.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Fake QR-code stickers</h2>
            <p>Scammers can print malicious QR code stickers and physically paste them over authentic codes on parking meters, restaurant tables, posters, and public transit kiosks. Before scanning a physical code, check whether an adhesive decal has been placed over an existing sign.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">QR codes in phishing emails and text messages</h2>
            <p>Be skeptical when an unexpected QR code arrives via email or SMS with an urgent demand to verify an account or pay an overdue bill. Instead of scanning the code, open a browser and navigate directly to the company's verified website.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Dangerous URL schemes</h2>
            <p>Not every QR code contains a standard web link. Codes can store dangerous URI schemes like javascript: or data: that can execute arbitrary script or embed malicious forms. Scanners must treat all decoded content as untrusted input and avoid executing code automatically.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">How to scan a QR code safely</h2>
            <p>Scan only codes from sources you trust, preview the decoded URL before opening, verify domain spelling, question urgent demands for sensitive data, and keep your phone and browser software updated with the latest security patches.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Browser-based QR scanning</h2>
            <p>You can use our free in-browser <a href="/" class="text-blue-600 underline font-medium">QR code scanner</a> to decode codes via your webcam or uploaded photos without installing third-party apps that bundle advertisements or trackers. Every frame is processed client-side with zero server uploads.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">QR code privacy</h2>
            <p>QR codes can store private URLs, Wi-Fi credentials, contact cards, or account details. Think carefully before encoding sensitive data with a <a href="/qr-code-generator" class="text-blue-600 underline font-medium">QR code generator</a> or sharing codes publicly. Review our <a href="/privacy" class="text-blue-600 underline font-medium">Privacy Policy</a> to understand our zero-knowledge approach.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">What if you already scanned a suspicious QR code?</h2>
            <p>If you scanned a suspicious code, close the browser tab immediately. If you submitted passwords, change them across all accounts right away and enable multi-factor authentication. If you entered card numbers, contact your bank to freeze the card.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">A simple QR code safety checklist</h2>
            <p>Ask yourself: Did I expect this code? Do I trust its source? Does the URL match the genuine domain? Is the domain spelled correctly? Is there artificial urgency? If anything feels suspicious, navigate directly to the official website instead.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Final thoughts</h2>
            <p>A QR scanner tells you what is encoded in a pattern. It cannot prove that the destination is trustworthy. That final check is always yours to make before entering information or completing payments.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Sources and further reading</h2>
            <ul class="list-disc pl-5 space-y-1">
              <li><a href="https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information" class="text-blue-600 underline">FTC: Scammers hide harmful links in QR codes to steal your information</a></li>
              <li><a href="https://consumer.ftc.gov/consumer-alerts/2026/09/see-qr-code-parked-somewhere-dont-scan-ityet" class="text-blue-600 underline">FTC: See a QR code parked somewhere? Don't scan it...yet!</a></li>
              <li><a href="https://www.fbi.gov/investigate/cyber/alerts/2025/unsolicited-packages-containing-qr-codes-used-to-initiate-fraud-schemes" class="text-blue-600 underline">FBI: Unsolicited Packages Containing QR Codes Used to Initiate Fraud Schemes</a></li>
              <li><a href="https://www.fbi.gov/file-repository/cyber-alerts/north-korean-kimsuky-actors-leverage-malicious-qr.pdf" class="text-blue-600 underline">FBI: North Korean Kimsuky Actors Leverage Malicious QR Codes in Spearphishing Campaigns</a></li>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript" class="text-blue-600 underline">MDN Web Docs: javascript: URLs</a></li>
            </ul>
          </div>
        </section>
      </article>
    `,
  },
  {
    path: '/blog/how-to-create-wifi-qr-code',
    folder: 'blog/how-to-create-wifi-qr-code',
    title: 'How to Create a WiFi QR Code (Free, No App) | QR Here',
    description:
      'Stop reading your WiFi password out loud. Learn how to make a free WiFi QR code guests can scan to connect instantly — no app, no sign-up, no typing.',
    keywords:
      'wifi qr code, wifi qr code generator, how to create wifi qr code, qr code for wifi password, share wifi with qr code',
    heading: 'How to Create a WiFi QR Code (Free, No App)',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: 'How to Create a WiFi QR Code', path: '/blog/how-to-create-wifi-qr-code' },
    ],
    htmlContent: `
      <article class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How to Create a WiFi QR Code (Free, No App)
        </h1>
        <p class="text-base text-slate-600 leading-relaxed mb-6">
          A 2-minute guide to letting guests connect to your WiFi with one scan — no spelled-out passwords, no downloads.
        </p>

        <section class="space-y-6 text-sm text-slate-700 leading-relaxed">
          <p>If you've ever had to spell out &ldquo;capital S, lowercase y, dollar sign, seven, three&rdquo; to a guest trying to join your WiFi, you already know why WiFi QR codes exist. Print one, stick it on the wall, and people connect by pointing their camera at it. No app, no typos, no repeating the password for the third time.</p>
          <p>Here's exactly how to make one — for free, right in your browser.</p>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">What a WiFi QR code actually does</h2>
            <p>A WiFi QR code isn't a link. It's a small text string encoded into the QR pattern, formatted like <code>WIFI:T:WPA;S:NetworkName;P:Password;;</code>. When a phone camera reads that format, it recognizes it instantly and offers a &ldquo;Join Network&rdquo; button — the password is typed in automatically, behind the scenes.</p>
            <p>This works natively on iPhones (iOS 11 and later) and nearly all modern Android phones. No extra app needed on either end.</p>
          </div>

          <div class="p-5 rounded-2xl border-l-4 border-blue-600 bg-slate-50">
            <p class="font-semibold text-slate-900 mb-1">Skip the manual steps.</p>
            <p class="mb-3">QR Here's generator builds a properly formatted WiFi QR code in seconds — entirely in your browser, nothing uploaded to a server.</p>
            <a href="/qr-code-generator" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-xs">Create Your WiFi QR Code</a>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">How to create a WiFi QR code</h2>
            <ol class="list-decimal pl-5 space-y-2">
              <li><strong>Open the QR generator</strong> and select the WiFi option.</li>
              <li><strong>Enter your network name (SSID)</strong> exactly as it appears on your router — it's case-sensitive.</li>
              <li><strong>Add your password</strong> and choose the correct security type: WPA/WPA2 (most common), WPA3, or WEP for older routers. If your network has no password, select &ldquo;no encryption.&rdquo;</li>
              <li><strong>Check &ldquo;hidden network&rdquo;</strong> only if your SSID doesn't broadcast publicly.</li>
              <li><strong>Customize it (optional).</strong> Add your logo, adjust colors, or apply a frame so it fits your space.</li>
              <li><strong>Download</strong> as SVG for sharp printing at any size, or PNG for digital use.</li>
            </ol>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Where WiFi QR codes are genuinely useful</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Airbnbs and guest rooms</strong> — leave it on a card by the bed instead of a sticky note.</li>
              <li><strong>Cafes and restaurants</strong> — print it on the table or receipt.</li>
              <li><strong>Offices</strong> — a laminated card at reception saves IT from repeating the guest password all day.</li>
              <li><strong>Home</strong> — frame it near the router so family and friends stop asking.</li>
            </ul>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Before you print it</h2>
            <p>Test the code with two or three different phones first — don't assume it works just because it looks right. Keep a quiet white border around the code (no text or logos crowding the edges), and if you're adding a center logo, make sure your generator applies high error correction, or the code may fail to scan once printed.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">Is it safe to share your WiFi password this way?</h2>
            <p>Yes, as long as the QR code was generated locally in your browser rather than sent to someone else's server. QR Here never uploads or stores what you type — the code is built entirely on your device, so your password never leaves your screen.</p>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">Quick answers</h2>
            <div class="space-y-3">
              <p><strong>Does the WiFi QR code expire?</strong><br>No. It works for as long as the network name and password stay the same. Change your WiFi password, and you'll need a new code.</p>
              <p><strong>Can I make one for a hidden network?</strong><br>Yes — just tick the hidden network option when generating it so scanners know to look for it.</p>
              <p><strong>Will it work on older phones?</strong><br>Most phones from the last several years support it natively. Very old devices may need a separate QR scanner app to read the code, though they'll still connect fine once scanned.</p>
            </div>
          </div>
        </section>
      </article>
    `,
  },
];
