import { APP_CONFIG, getSiteUrl } from './app.config';

export interface RouteSEO {
  title: string;
  description: string;
  keywords: string;
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
    title: 'QR Code Scanner - Online Scanner without App | QR Here',
    description:
      'The QR code scanner online lets you scan QR codes without any app. Upload an image or use your camera to scan a QR code. 100% private in-browser decoding.',
    keywords:
      'QR code scanner, scan QR code online, QR scanner without app, camera QR scanner, scan QR from image, online QR code reader, QR Here',
    canonicalPath: '/',
    ogType: 'website',
  },
  scan: {
    title: 'Online QR Code Scanner - Camera & Image Scanner | QR Here',
    description:
      'Scan QR codes instantly using your device camera or image upload. Fast, private client-side decoding with real-time security link inspection.',
    keywords:
      'QR code scanner online, camera QR scanner, scan QR from image, upload QR code, webcam QR reader, fast QR reader, mobile QR reader, QR Here',
    canonicalPath: '/scan',
    ogType: 'website',
  },
  create: {
    title: 'QR Code Generator - Create Custom Codes with Logos & Frames | QR Here',
    description:
      'Create custom QR codes with logos, frames, and colors. Download your QR code as vector SVG or high-resolution PNG with 100% in-browser generation.',
    keywords:
      'QR code generator, create QR code, QR code generator with logo, custom QR code maker, vector QR code SVG, high resolution QR code PNG, Wi-Fi QR code generator, QR Here',
    canonicalPath: '/create',
    ogType: 'website',
  },
  about: {
    title: 'About QR Here | Privacy-First In-Browser Technology',
    description:
      'Learn how QR Here operates entirely in your browser using modern WebAssembly and Canvas algorithms to ensure total privacy and zero data harvesting.',
    keywords:
      'about QR Here, private QR scanner, client side QR code, browser QR decoding, zero knowledge scanner',
    canonicalPath: '/about',
    ogType: 'website',
  },
  contact: {
    title: 'Contact | QR Here',
    description:
      'For any question or request regarding QR Here, mail us directly or check out other open source projects.',
    keywords: 'contact QR Here, QR code email, QR Here feedback, jhem0n',
    canonicalPath: '/contact',
    ogType: 'website',
  },
  faq: {
    title: 'QR Here FAQ | Frequently Asked Questions',
    description:
      'Comprehensive answers to common questions about scanning with camera or image upload, generating Wi-Fi codes, error correction levels, and privacy safety.',
    keywords:
      'QR code FAQ, how to scan QR code, how to create QR code, QR code security, safe QR scanning, Wi-Fi QR code help',
    canonicalPath: '/faq',
    ogType: 'website',
  },
  privacy: {
    title: 'Privacy Policy | QR Here Zero-Knowledge Architecture',
    description:
      'Our strict privacy policy. Learn how all QR decoding and generation executes locally in your browser with zero data retention and zero tracking.',
    keywords:
      'QR scanner privacy policy, no data collection, private scanner, client side security, zero tracking',
    canonicalPath: '/privacy',
    ogType: 'website',
  },
  terms: {
    title: 'Terms of Service | QR Here',
    description:
      'Terms of service, usage guidelines, and disclaimers for using the QR Here web application.',
    keywords: 'terms of service, user agreement, disclaimer, terms of use',
    canonicalPath: '/terms',
    ogType: 'website',
  },
  notFound: {
    title: '404 - Page Not Found | QR Here',
    description: 'The requested page could not be found on QR Here.',
    keywords: '404, not found, page not found',
    canonicalPath: '/404',
    ogType: 'website',
    noIndex: true,
  },
};

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
 * Generates Schema.org WebApplication entity
 */
export function generateWebApplicationSchema(siteUrl: string = getSiteUrl()) {
  return {
    '@type': 'WebApplication',
    '@id': `${siteUrl}/#webapp`,
    name: APP_CONFIG.name,
    url: siteUrl,
    description: APP_CONFIG.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas or WebAssembly support.',
    softwareVersion: APP_CONFIG.version,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Live Camera QR Code Scanning with Instant Autofocus',
      'High-Speed Image File QR Code Decoding (PNG, JPG, WEBP)',
      'Custom QR Code Vector Generator (SVG and PNG)',
      'Wi-Fi Network, Contact, and URL Presets',
      '100% In-Browser Privacy Protection with Zero Server Uploads',
      'Automated Malicious URL Scheme Filtering',
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
