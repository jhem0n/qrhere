import { APP_CONFIG, getSiteUrl } from './app.config';

export interface RouteSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  imageWidth?: number | string;
  imageHeight?: number | string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItemSchema {
  question: string;
  answer: string;
}

export const SEO_CONFIG: Record<string, RouteSEO> = {
  home: {
    title: 'Scan QR Code Here – Free Online QR Scanner | QR Here',
    description:
      'Scan QR codes online for free with your camera or by uploading an image. Works on phone, PC and Mac. No app, no sign-up, and nothing leaves your device.',
    canonicalPath: '/',
    ogType: 'website',
  },
  scanWifi: {
    title: 'WiFi QR Code Scanner – See Password Online | QR Here',
    description:
      'Scan a WiFi QR code online and see the network name, security type and password. Use your camera or upload a screenshot. Free, private, no app.',
    canonicalPath: '/scan-wifi-qr-code',
    ogType: 'website',
  },
  scanWhatsapp: {
    title: 'WhatsApp QR Code Scanner – Preview Chat Link Free | QR Here',
    description:
      'Scan a WhatsApp QR code online and preview the phone number and message before you open the chat. Camera or image upload. Free, private, no app.',
    canonicalPath: '/scan-whatsapp-qr-code',
    ogType: 'website',
  },
  generator: {
    title: 'Free Best QR Code Generator – Create Custom QR Codes Online ',
    description:
      'Create custom QR codes with logos, colors, and frames for free. Download vector SVG or high-resolution PNG in your browser without an app.',
    canonicalPath: '/qr-code-generator',
    ogType: 'website',
    image: '/images/qrcodegen.jpg',
    imageAlt: 'Free QR Code Generator Online – Create Custom QR Codes',
  },
  // Specific QR Code Generator Type Pages
  generatorUrl: {
    title: 'Free URL QR Code Generator – Create Link QR Codes | QR Here',
    description:
      'Turn any website link into a permanent, custom QR code. Free, no sign-up, no expiry. Customize colors, add logos, and download vector SVG or high-res PNG files.',
    canonicalPath: '/qr-code-generator-url',
    ogType: 'website',
    image: '/images/qrcodegen.jpg',
    imageAlt: 'Free URL QR Code Generator',
  },
  generatorText: {
    title: 'Free Text QR Code Generator – Plain Text to QR | QR Here',
    description:
      'Convert any message, note, or serial number into a plain text QR code. Free, private, and works 100% offline without an internet connection or sign-up.',
    canonicalPath: '/qr-code-generator-text',
    ogType: 'website',
    image: '/images/qrcodegen.jpg',
    imageAlt: 'Free Text QR Code Generator',
  },
  generatorWifi: {
    title: 'WiFi QR Code Maker – Create a Scannable Password in Seconds',
    description:
      'Use our free WiFi QR code generator to turn your network name and password into a scannable code. Print it, share it, and let guests connect instantly.',
    canonicalPath: '/qr-code-generator-wifi',
    ogType: 'website',
    image: '/images/howtocreatewifiqrcode.jpg',
    imageAlt: 'WiFi QR Code Maker',
  },
  generatorVcard: {
    title: 'Free vCard QR Code Generator – Digital Business Card | QR Here',
    description:
      'Create a free vCard QR code for digital business cards. Scan with camera to save contacts to address books instantly. Free, private, and customizable.',
    canonicalPath: '/qr-code-generator-vcard',
    ogType: 'website',
    image: '/images/howtocreatevcardqr.jpg',
    imageAlt: 'Free vCard QR Code Generator',
  },
  generatorWhatsapp: {
    title: 'Free WhatsApp QR Code Generator – Direct Chat Link | QR Here',
    description:
      'Create a free WhatsApp QR code that launches a direct chat with your number and pre-filled greeting message. Free, private, and instant vector download.',
    canonicalPath: '/qr-code-generator-whatsapp',
    ogType: 'website',
  },
  generatorEmail: {
    title: 'Free Email QR Code Generator – Pre-filled Message | QR Here',
    description:
      'Create an email QR code with pre-filled recipient address, subject, and body message. Scan to compose and send emails instantly. Free with no sign-up.',
    canonicalPath: '/qr-code-generator-email',
    ogType: 'website',
  },
  generatorPhone: {
    title: 'Free Phone Number QR Code Generator – Scan to Call | QR Here',
    description:
      'Generate a free phone number QR code that launches the smartphone dialer ready to call with one scan. Permanent static code that never expires.',
    canonicalPath: '/qr-code-generator-phone',
    ogType: 'website',
  },
  generatorSms: {
    title: 'Free SMS QR Code Generator – Pre-filled Text | QR Here',
    description:
      'Create an SMS QR code that opens messaging apps with recipient number and text ready to send. Free, private, static barcode that never expires.',
    canonicalPath: '/qr-code-generator-sms',
    ogType: 'website',
  },
  generatorLocation: {
    title: 'Free Location QR Code Generator – Map Pin | QR Here',
    description:
      'Share exact Google Maps coordinates with a custom map pin QR code. Scan to launch turn-by-turn navigation on iPhone and Android. Free with no sign-up.',
    canonicalPath: '/qr-code-generator-location',
    ogType: 'website',
  },
  generatorEvent: {
    title: 'Free Event QR Code Generator – Add to Calendar | QR Here',
    description:
      'Create a calendar event QR code to add dates and invites to Apple, Google, or Outlook Calendar with one scan. Free, private, and universal iCal format.',
    canonicalPath: '/qr-code-generator-event',
    ogType: 'website',
  },
  generatorPaypal: {
    title: 'Free PayPal QR Code Generator – Get Paid Online | QR Here',
    description:
      'Create a PayPal.Me QR code for instant cashless payments, donations, and tips. Connect directly to your PayPal account with custom amounts and colors.',
    canonicalPath: '/qr-code-generator-paypal',
    ogType: 'website',
  },
  generatorBitcoin: {
    title: 'Free Bitcoin QR Code Generator – BTC Wallet Address | QR Here',
    description:
      'Generate a Bitcoin wallet QR code using the BIP-21 URI standard. Encode BTC address, amount, and memo for error-free mobile crypto transactions.',
    canonicalPath: '/qr-code-generator-bitcoin',
    ogType: 'website',
  },
  generatorSkype: {
    title: 'Free Skype QR Code Generator – Direct Call & Chat | QR Here',
    description:
      'Create a free Skype QR code that launches a direct audio call or chat with one scan. Fast, private, static barcode that never expires with no sign-up.',
    canonicalPath: '/qr-code-generator-skype',
    ogType: 'website',
  },
  generatorZoom: {
    title: 'Free Zoom Meeting QR Code Generator – 1-Click Join | QR Here',
    description:
      'Generate a free Zoom QR code to let attendees join your meeting or webinar in one scan with pre-filled ID and passcode. Instant download, no sign-up.',
    canonicalPath: '/qr-code-generator-zoom',
    ogType: 'website',
  },
  printGuide: {
    title: 'QR Code Size and Printing Guide | QR Here',
    description:
      'Learn recommended QR code print sizes, viewing distance ratios, quiet zone rules, and vector SVG specifications for reliable scanning.',
    canonicalPath: '/qr-code-size-and-print-guide',
    ogType: 'article',
  },
  barcodeScanner: {
    title: 'Free Online Barcode Scanner – Camera or Image | QR Here',
    description:
      'Free online barcode scanner. Scan UPC, EAN, Code 128 and QR codes with your camera or an image. No app, no sign-up – processed in your browser.',
    canonicalPath: '/barcode-scanner',
    ogType: 'website',
  },
  barcodeReaderFromImage: {
    title: 'Scan Barcode from Image – Free Online Reader | QR Here',
    description:
      'Upload a photo or screenshot and read the barcode instantly. Free online barcode reader from image. Supports UPC, EAN, Code 128, QR. Nothing is uploaded.',
    canonicalPath: '/barcode-reader-from-image',
    ogType: 'website',
  },
  upcEanScanner: {
    title: 'Free UPC & EAN Barcode Scanner Online | QR Here',
    description:
      'Scan UPC-A, UPC-E, EAN-13 and EAN-8 product barcodes free with your camera or an image. No app, no sign-up. Processed in your browser.',
    canonicalPath: '/upc-ean-scanner',
    ogType: 'website',
  },
  webcamBarcodeScanner: {
    title: 'Webcam Barcode Scanner Online – Free | QR Here',
    description:
      'Use your laptop or PC webcam to scan barcodes online. Free, no software to install, works in your browser. Camera stays on your device.',
    canonicalPath: '/webcam-barcode-scanner',
    ogType: 'website',
  },
  barcodeDecoderOnline: {
    title: 'Barcode Decoder Online – Read Any Barcode | QR Here',
    description:
      'Decode barcodes online and see the data and format. Free barcode decoder for UPC, EAN, Code 128, QR and Data Matrix. Works in your browser.',
    canonicalPath: '/barcode-decoder-online',
    ogType: 'website',
  },
  // Legacy route aliases for backward compatibility in config lookups
  scan: {
    title: 'QR Code Scanner Online – Free, No App Needed | QR Here',
    description:
      'Scan any QR code free with your camera or an image upload. Private, runs in your browser, no app or signup needed.',
    canonicalPath: '/',
    ogType: 'website',
  },
  create: {
    title: 'Online Best QR Code Generator – Create Custom QR Codes Free | QR Here',
    description:
      'Create custom QR codes with logos, colors, and frames for free. Download vector SVG or high-resolution PNG in your browser without an app.',
    canonicalPath: '/qr-code-generator',
    ogType: 'website',
  },
  about: {
    title: 'About QR Here – Private In-Browser QR Tools',
    description:
      'Learn how QR Here works entirely in your browser with client-side algorithms, zero server uploads, and total privacy for scanning and creating QR codes.',
    canonicalPath: '/about',
    ogType: 'website',
  },
  contact: {
    title: 'Contact Us – Support & Feedback | QR Here',
    description:
      'Get in touch with QR Here for support, feature suggestions, or feedback. We are here to help with your QR code scanning and generation needs.',
    canonicalPath: '/contact',
    ogType: 'website',
  },
  faq: {
    title: 'FAQ – QR Code Scanning & Creation Questions | QR Here',
    description:
      'Find answers to common questions about scanning with camera or image upload, creating custom QR codes, Wi-Fi codes, error correction, and privacy.',
    canonicalPath: '/faq',
    ogType: 'website',
  },
  privacy: {
    title: 'Privacy Policy – Zero Data Collection | QR Here',
    description:
      'Read our privacy policy. All QR code scanning and generation runs client-side in your browser with zero data logging, zero tracking, and no server uploads.',
    canonicalPath: '/privacy',
    ogType: 'website',
  },
  terms: {
    title: 'Terms of Service – Usage Guidelines | QR Here',
    description:
      'Read our terms of service, usage rules, and guidelines for using the QR Here online scanner and QR code generator.',
    canonicalPath: '/terms',
    ogType: 'website',
  },
  blog: {
    title: 'QR Code Blog – Guides, Tips & Tutorials | QR Here',
    description:
      'Practical guides, tutorials, and tips for scanning and creating QR codes. Learn about static vs dynamic codes, vCards, Wi-Fi codes, and safety.',
    canonicalPath: '/blog',
    ogType: 'website',
  },
  blogStaticVsDynamic: {
    title: "Static vs Dynamic QR Code – What's the Difference?",
    description:
      'Learn the difference between static and dynamic QR codes, how they work, key benefits and limits, and how to choose the right one for your needs.',
    canonicalPath: '/blog/static-vs-dynamic-qr-code',
    ogType: 'article',
    image: '/images/static-vs-dynamic-qr-code.jpg',
    imageAlt: 'Static vs Dynamic QR Codes: What is the Difference?',
  },
  blogVcardBusinessCards: {
    title: 'Free vCard QR Code Generator for Business Cards | QR Here',
    description:
      'Create a free vCard QR code for your business card. Let contacts save your details directly to their phone address book with a single camera scan.',
    canonicalPath: '/blog/how-to-create-vcard-qr-code',
    ogType: 'article',
    image: '/images/howtocreatevcardqr.jpg',
    imageAlt: 'How to Create a vCard QR Code for Digital Business Cards',
  },
  blogScanWithoutApp: {
    title: 'How to Scan a QR Code Without an App | QR Here',
    description:
      'Learn how to scan QR codes on iPhone, Android, and PC without downloading apps. Step-by-step camera, browser, and screenshot scanning guide.',
    canonicalPath: '/blog/how-to-scan-qr-code-without-app',
    ogType: 'article',
    image: '/images/howtoscanwithoutapp.jpg',
    imageAlt: 'How to Scan a QR Code Without Installing an App',
  },
  blogWifiQrCode: {
    title: 'How to Create a WiFi QR Code for Free | QR Here',
    description:
      'Make a free Wi-Fi QR code so guests can join your network instantly with one camera scan. No app, no passwords to spell out, and no sign-up required.',
    canonicalPath: '/blog/how-to-create-wifi-qr-code',
    ogType: 'article',
    image: '/images/howtocreatewifiqrcode.jpg',
    imageAlt: 'How to Create a WiFi QR Code',
  },
  blogErrorCorrection: {
    title: 'QR Code Error Correction Explained: Levels L, M, Q, H & When to Use Which | QR Here',
    description:
      'Understand Reed-Solomon error correction in QR codes. Learn the practical trade-offs between Levels L, M, Q, and H, logo embedding limits, and print durability.',
    canonicalPath: '/blog/qr-code-error-correction-explained',
    ogType: 'article',
    image: '/images/errorcorrection.jpg',
    imageAlt: 'QR Code Error Correction Explained: Levels L, M, Q, and H',
  },
  blogScanFromScreenshot: {
    title: 'How to Scan a QR Code on Your Own Phone (Screenshot Guide)',
    description:
      'Got a QR code as a screenshot or image? Learn how to scan it on iPhone, Android and PC, why it sometimes fails, and how to fix it. No second phone needed.',
    canonicalPath: '/blog/scan-qr-code-from-screenshot',
    ogType: 'article',
    image: '/images/scan-qr-code-from-screenshot.jpg',
    imageAlt: 'How to Scan a QR Code on Your Own Phone from a Screenshot',
  },
  blogQrCodeHistory: {
    title: 'QR Code History: Who Invented It and How It Took Over',
    description:
      'The real story of the QR code: why a car factory invented it in 1994, why it was given away, and how phones and 2020 made it part of daily life.',
    canonicalPath: '/blog/qr-code-history',
    ogType: 'article',
    image: '/images/qr-code-history.jpg',
    imageAlt: 'QR Code History: Who Invented It, Why, and How It Took Over',
  },
  blogHowDoesQrCodeWork: {
    title: "How Does a QR Code Work? What's Inside the Square",
    description:
      'Ever wondered how a QR code works? Learn what is inside the square, how your phone reads it in a second, and why a damaged code can still scan.',
    canonicalPath: '/blog/how-does-a-qr-code-work',
    ogType: 'article',
    image: '/images/qr-code-anatomy.svg',
    imageAlt: 'How Does a QR Code Work – Anatomy and Structure of a QR Code',
  },
  blogScanBarcodeToCheckPrice: {
    title: 'Scan a Barcode to Check Price: Free Online Barcode Reader',
    description:
      "Use a free online barcode reader to scan any product barcode, then compare prices in seconds. Works on phone or laptop, no app needed. Here's how.",
    canonicalPath: '/blog/scan-barcode-to-check-price',
    ogType: 'article',
    image: '/images/scan-barcode-price.svg',
    imageAlt: 'How to Scan a Barcode to Check Price Online',
  },
  qrCodeSecurity: {
    title: 'QR Code Security Guide – Scan Codes Safely | QR Here',
    description:
      'Learn how QR code phishing and quishing work, how to spot suspicious links, and practical steps to scan QR codes safely without exposing your device.',
    canonicalPath: '/qr-code-security',
    ogType: 'article',
  },
  notFound: {
    title: '404 - Page Not Found | QR Here',
    description: 'The requested page could not be found on QR Here.',
    canonicalPath: '/404',
    ogType: 'website',
    noIndex: true,
  },
};

/**
 * Common Homepage FAQs used for visible content and JSON-LD structured data
 */
export const HOMEPAGE_FAQS: FAQItemSchema[] = [
  {
    question: 'What does "scan here" mean?',
    answer:
      '"Scan here" is an instruction printed next to a QR code. It means point your phone camera at the code to open what it contains, such as a website, payment page, menu or Wi-Fi login. You can do the same in your browser with QR Here.',
  },
  {
    question: 'How do I scan a QR code online?',
    answer:
      'Open QR Here, tap Start Camera, allow camera access and hold the code in front of the camera. Or switch to Image upload and add a screenshot or photo. The result appears in a moment and you choose whether to open or copy it.',
  },
  {
    question: 'Can I scan a QR code on my computer or laptop?',
    answer:
      'Yes. Any laptop or desktop with a webcam works in Chrome, Edge, Safari or Firefox. If the code is on your screen, take a screenshot and upload it.',
  },
  {
    question: 'Can I scan a QR code from an image or screenshot?',
    answer:
      'Yes. Use the Image upload tab and drop in a PNG, JPG or WEBP file up to 10 MB. Decoding happens on your device.',
  },
  {
    question: 'Do I need to install an app or sign up?',
    answer:
      'No installation or account registration is required. You can scan or create QR codes immediately directly in your browser without entering an email or password.',
  },
  {
    question: 'Can I scan a Wi-Fi or WhatsApp QR code online?',
    answer:
      'Yes. Use your camera or upload a screenshot, and the details or link appear before you open anything.',
  },
  {
    question: 'Is it safe to scan QR codes with QR Here?',
    answer:
      'Yes. Scanning runs in your browser, so your camera feed and images never leave your device, and we do not store your scans. Always check the link shown before you open it.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'You can upload QR code images and screenshots in PNG, JPG, and WEBP formats up to 10 MB in file size.',
  },
  {
    question: 'Is QR Here free?',
    answer:
      'Yes, QR Here is 100% free to use. There are no subscriptions, hidden fees, scan limits, or watermarks.',
  },
  {
    question: 'How do I create my own QR code?',
    answer:
      'You can generate your own custom QR code using our free QR code generator. Choose from options like website links, Wi-Fi networks, contact cards, and plain text, customize colors, and download as SVG or PNG.',
  },
];

/**
 * FAQs for the WiFi QR Code Scanner Landing Page
 */
export const SCAN_WIFI_FAQS: FAQItemSchema[] = [
  {
    question: 'How does the wifi qr code scanner reveal the network password?',
    answer:
      'When you scan a Wi-Fi QR code with our wifi qr code scanner, it decodes the standard WIFI format directly inside your browser. It instantly extracts and displays the Network Name (SSID), Security Type (WPA/WPA2/WPA3/WEP), and the actual Password so you can view or copy it.',
  },
  {
    question: 'Can I join a Wi-Fi network directly with this wifi qr code scanner?',
    answer:
      'Yes. When scanned on a smartphone or mobile browser, you can tap to connect directly to the Wi-Fi network or click the copy button to paste the password into your device settings.',
  },
  {
    question: 'Is my Wi-Fi password stored or sent over the internet?',
    answer:
      'Never. This wifi qr code scanner processes every image and camera frame 100% client-side in your web browser. Your credentials are never uploaded, logged, or sent to any server.',
  },
  {
    question: 'Can I scan a Wi-Fi QR code from an image or screenshot?',
    answer:
      'Yes. Simply switch to the "Upload Image" tab and select or drag and drop any screenshot or photo of a Wi-Fi QR code. Our wifi qr code scanner decodes it in milliseconds.',
  },
  {
    question: 'Why use an online wifi qr code scanner instead of a phone camera?',
    answer:
      'Most native smartphone camera apps connect silently without revealing the plain-text password. Our online wifi qr code scanner shows you the exact password and works across desktop PCs, laptops, and tablets without extra apps.',
  },
];

/**
 * FAQs for the WhatsApp QR Code Scanner Landing Page
 */
export const SCAN_WHATSAPP_FAQS: FAQItemSchema[] = [
  {
    question: 'What does the whatsapp qr code scanner do?',
    answer:
      'Our whatsapp qr code scanner reads WhatsApp chat links (wa.me) from camera scans or uploaded images. It extracts the phone number with country dial code and any pre-filled greeting message before opening the chat.',
  },
  {
    question: 'Can I view the phone number without opening WhatsApp?',
    answer:
      'Yes! Scanning with our whatsapp qr code scanner displays the full international phone number and pre-written message on screen, allowing you to copy the contact number without saving it to your phonebook.',
  },
  {
    question: 'How do I start a chat after scanning?',
    answer:
      'Once the whatsapp qr code scanner decodes the code, tap "Open in WhatsApp" or "Start Chat" to launch the conversation in WhatsApp or WhatsApp Web instantly.',
  },
  {
    question: 'Is this whatsapp qr code scanner free and private?',
    answer:
      'Yes, 100% free with no sign-up or app download required. The decoding runs locally in your web browser with zero data collection.',
  },
  {
    question: 'Can I scan a WhatsApp QR code from a picture or screenshot?',
    answer:
      'Yes. Drag and drop any screenshot, photo, or digital document containing a WhatsApp QR code into the "Upload Image" tab for immediate decoding.',
  },
];

/**
 * FAQs for the Barcode Scanner Landing Page
 */
export const BARCODE_SCANNER_FAQS: FAQItemSchema[] = [
  {
    question: 'Is this online barcode scanner really free?',
    answer:
      'Yes. It is completely free, with no sign-up, no limits and no app to install.',
  },
  {
    question: 'Can I scan a barcode from an image or screenshot?',
    answer:
      'Yes. Upload a JPG, PNG or WebP image and the barcode is decoded in your browser.',
  },
  {
    question: 'Does it work on iPhone and Android?',
    answer:
      'Yes. It works in modern mobile browsers such as Safari and Chrome. Allow camera access when prompted.',
  },
  {
    question: 'Which barcode types can it read?',
    answer:
      'It reads common 1D barcodes such as UPC, EAN and Code 128, and 2D codes such as QR and Data Matrix.',
  },
  {
    question: 'Is my data stored or sent anywhere?',
    answer:
      'No. Everything is processed locally on your device.',
  },
  {
    question: "Why won't my barcode scan?",
    answer:
      'Usually poor lighting, glare, blur or a cropped code. Try better light, hold the camera steady, or upload a clearer, higher-resolution image.',
  },
];

/**
 * Generates Schema.org WebSite entity
 */
export function generateWebSiteSchema(siteUrl: string = getSiteUrl()) {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    inLanguage: 'en-US',
  };
}

/**
 * Generates Schema.org WebApplication entity for the QR Scanner Homepage
 */
export function generateWebApplicationSchema(siteUrl: string = getSiteUrl()) {
  return {
    '@type': 'WebApplication',
    '@id': `${siteUrl}/#webapp`,
    name: 'QR Here',
    url: siteUrl,
    description:
      'Scan QR codes online for free with your camera or by uploading an image. Works on phone, PC and Mac. No app, no sign-up, and nothing leaves your device.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas or WebAssembly support.',
    softwareVersion: APP_CONFIG.version,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Live Camera QR Code Scanning in Browser',
      'Image and Screenshot QR Code Decoding (PNG, JPG, WEBP)',
      'Custom Vector QR Code Generator (SVG and PNG)',
      'Wi-Fi, vCard Contact, SMS, and URL Presets',
      '100% Client-Side In-Browser Decoding with Zero Server Storage',
    ],
  };
}

/**
 * Generates Schema.org WebApplication entity for the QR Generator Tool
 */
export function generateGeneratorAppSchema(siteUrl: string = getSiteUrl()) {
  const genUrl = `${siteUrl.replace(/\/$/, '')}/qr-code-generator`;
  return {
    '@type': 'WebApplication',
    '@id': `${genUrl}/#webapp`,
    name: `${APP_CONFIG.name} - QR Code Generator`,
    url: genUrl,
    description:
      'Create custom QR codes online with logos, colors, and frames. Generate high-resolution PNG or vector SVG QR codes for free in your browser.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas support.',
    softwareVersion: APP_CONFIG.version,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Custom QR Code Vector Generator (SVG and PNG)',
      'Wi-Fi Network, vCard Contact, SMS, and URL Presets',
      'Embedded Logo and Color Customization',
      'Live WCAG Contrast Validation',
      '100% Client-Side In-Browser Generation',
    ],
  };
}

/**
 * Generates Schema.org FAQPage entity
 */
export function generateFAQSchema(faqs: FAQItemSchema[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Schema.org BreadcrumbList entity
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[], siteUrl: string = getSiteUrl()) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl.replace(/\/$/, '')}${crumb.path}`,
    })),
  };
}

/**
 * Generates Schema.org Article entity
 */
export function generateArticleSchema(
  data: {
    headline: string;
    description: string;
    canonicalPath: string;
    datePublished: string;
    dateModified: string;
    image?: string;
  },
  siteUrl: string = getSiteUrl()
) {
  const fullUrl = `${siteUrl.replace(/\/$/, '')}${data.canonicalPath}`;
  const baseDomain = siteUrl.replace(/\/$/, '');
  const resolvedImage = data.image
    ? data.image.startsWith('http')
      ? data.image
      : `${baseDomain}${data.image.startsWith('/') ? '' : '/'}${data.image}`
    : `${baseDomain}/og-image.png`;

  return {
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    url: fullUrl,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    image: [resolvedImage],
    primaryImageOfPage: resolvedImage,
    author: {
      '@type': 'Organization',
      name: APP_CONFIG.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: APP_CONFIG.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl.replace(/\/$/, '')}/icon.svg`,
      },
    },
  };
}

/**
 * Generates comprehensive JSON-LD schema graph for SEO
 */
export function generateWebsiteSchema(extraEntities: object[] = []) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebSiteSchema(siteUrl),
      generateWebApplicationSchema(siteUrl),
      ...extraEntities,
    ],
  };
}
