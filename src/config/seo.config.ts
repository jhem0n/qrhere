import { APP_CONFIG, getSiteUrl } from './app.config';

export interface RouteSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
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
    title: 'QR Code Scanner Online – Free, No App Needed | QR Here',
    description:
      'Scan any QR code free with your camera or an image upload. Private, runs in your browser, no app or signup needed.',
    canonicalPath: '/',
    ogType: 'website',
  },
  generator: {
    title: 'QR Code Generator – Create Custom QR Codes | QR Here',
    description:
      'Create custom QR codes with logos, colors, and frames for free. Download vector SVG or high-resolution PNG in your browser without an app.',
    canonicalPath: '/qr-code-generator',
    ogType: 'website',
  },
  printGuide: {
    title: 'QR Code Size and Printing Guide | QR Here',
    description:
      'Learn recommended QR code print sizes, viewing distance ratios, quiet zone rules, and vector SVG specifications for reliable scanning.',
    canonicalPath: '/qr-code-size-and-print-guide',
    ogType: 'article',
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
    title: 'QR Code Generator – Create Custom QR Codes | QR Here',
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
  },
  blogVcardBusinessCards: {
    title: 'Free vCard QR Code Generator for Business Cards | QR Here',
    description:
      'Create a free vCard QR code for your business card. Let contacts save your details directly to their phone address book with a single camera scan.',
    canonicalPath: '/blog/how-to-create-vcard-qr-code',
    ogType: 'article',
  },
  blogScanWithoutApp: {
    title: 'How to Scan a QR Code Without an App | QR Here',
    description:
      'Learn how to scan QR codes on iPhone, Android, and PC without downloading apps. Step-by-step camera, browser, and screenshot scanning guide.',
    canonicalPath: '/blog/how-to-scan-qr-code-without-app',
    ogType: 'article',
  },
  blogWifiQrCode: {
    title: 'How to Create a WiFi QR Code for Free | QR Here',
    description:
      'Make a free Wi-Fi QR code so guests can join your network instantly with one camera scan. No app, no passwords to spell out, and no sign-up required.',
    canonicalPath: '/blog/how-to-create-wifi-qr-code',
    ogType: 'article',
  },
  blogErrorCorrection: {
    title: 'QR Code Error Correction Explained: Levels L, M, Q, H & When to Use Which | QR Here',
    description:
      'Understand Reed-Solomon error correction in QR codes. Learn the practical trade-offs between Levels L, M, Q, and H, logo embedding limits, and print durability.',
    canonicalPath: '/blog/qr-code-error-correction-explained',
    ogType: 'article',
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
    question: 'Is QR Here free?',
    answer:
      'Yes, QR Here is 100% free to use. There are no subscriptions, hidden fees, scan limits, or watermarks.',
  },
  {
    question: 'Does it work on iPhone and Android?',
    answer:
      'Yes. QR Here works seamlessly on iPhones, iPads, Android smartphones, tablets, Windows PCs, and Macs using any modern web browser.',
  },
  {
    question: 'Do you store my camera feed or images?',
    answer:
      'No. All scanning and decoding runs completely in your web browser. Your camera feed and uploaded images never leave your device and are never sent to or stored on any server.',
  },
  {
    question: 'Do I need to install an app or sign up?',
    answer:
      'No installation or account registration is required. You can scan or create QR codes immediately directly in your browser without entering an email or password.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'You can upload QR code images and screenshots in PNG, JPG, and WEBP formats up to 10 MB in file size.',
  },
  {
    question: 'How do I create my own QR code?',
    answer:
      'You can generate your own custom QR code using our free QR code generator. Choose from options like website links, Wi-Fi networks, contact cards, and plain text, customize colors, and download as SVG or PNG.',
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
      'Scan any QR code free with your camera or an image upload. Private, runs in your browser, no app or signup needed.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
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
    image: data.image || `${siteUrl}/icon.svg`,
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
        url: `${siteUrl}/icon.svg`,
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
