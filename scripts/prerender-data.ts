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
    path: '/scan',
    folder: 'scan',
    title: 'Online QR Code Scanner | QR Here',
    description:
      'Scan QR codes instantly using your device camera or upload image files. Fast, private client-side decoding with zero server uploads.',
    keywords:
      'QR code scanner online, camera QR scanner, scan QR from image, upload QR code, webcam QR reader, fast QR reader, mobile QR reader, QR Here',
    heading: 'Online QR Code Scanner',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Scan', path: '/scan' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-4">
          Online QR Code Scanner
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto text-center leading-relaxed mb-8">
          Scan QR codes instantly using your device camera or upload image files from your computer or smartphone. Processed 100% locally in your web browser with zero server uploads.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-lg font-bold text-slate-900 mb-2">Live Camera Scanning</h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              Use your device webcam or rear smartphone camera with automatic autofocus, mirror inversion options, and real-time link safety checks. Video stream frames are processed strictly in browser RAM and discarded immediately.
            </p>
          </div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-lg font-bold text-slate-900 mb-2">Image File Upload</h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              Drop screenshot captures or photo files in PNG, JPG, or WEBP formats. Multi-pass binarization handles low-contrast or angled QR codes without sending your pictures to any external server.
            </p>
          </div>
        </div>

        <div class="p-6 rounded-2xl border border-blue-100 bg-blue-50/50 my-6">
          <h2 class="text-base font-bold text-blue-950 mb-2">Need to create a QR code instead?</h2>
          <p class="text-sm text-blue-900/80 mb-4">
            Design customized QR codes with colors, patterns, and logos using our companion generator tool.
          </p>
          <a href="/create" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700">
            Open QR Generator
          </a>
        </div>

        <div class="border-t border-slate-200 pt-6 mt-8 text-sm text-slate-600 space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Browser Compatibility & Safety</h2>
          <p>
            Our scanner runs on Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and mobile browsers on iOS and Android. For more information regarding permissions and security practices, please visit our <a href="/faq" class="text-blue-600 underline">FAQ</a> and <a href="/privacy" class="text-blue-600 underline">Privacy Policy</a>.
          </p>
        </div>
      </section>
    `,
  },
  {
    path: '/create',
    folder: 'create',
    title: 'QR Code Generator | QR Here',
    description:
      'Create custom QR codes with logos, frames, and colors. Download high-resolution vector SVG or PNG QR codes with 100% in-browser generation.',
    keywords:
      'QR code generator, create QR code, QR code generator with logo, custom QR code maker, vector QR code SVG, high resolution QR code PNG, Wi-Fi QR code generator, QR Here',
    heading: 'QR Code Generator',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Create', path: '/create' },
    ],
    htmlContent: `
      <section class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-4">
          QR Code Generator
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto text-center leading-relaxed mb-8">
          Create custom QR codes with logos, frames, and colors. Download your QR code as vector SVG or high-resolution PNG with 100% in-browser generation.
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
          <a href="/scan" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700">
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
    title: 'About QR Here',
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
          <a href="/scan" class="text-blue-600 font-semibold underline">Online Scanner</a>
          <a href="/create" class="text-blue-600 font-semibold underline">QR Generator</a>
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
    title: 'Contact QR Here',
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
          <a href="/scan" class="text-blue-600 font-semibold underline">Try Camera Scanner</a>
          <a href="/create" class="text-blue-600 font-semibold underline">Generate QR Code</a>
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
];
