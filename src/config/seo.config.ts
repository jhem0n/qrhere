import { APP_CONFIG, getSiteUrl } from './app.config';

export interface RouteSEO {
  title: string;
  description: string;
  keywords?: string;
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
    title: 'QR Code Scanner Online — Scan QR Codes from Camera or Image | QR Here',
    description:
      'Scan QR codes online with your camera or an uploaded image. QR Here lets you scan here directly in your browser without installing an app.',
    canonicalPath: '/',
    ogType: 'website',
  },
  generator: {
    title: 'Free QR Code Generator — Create Custom QR Codes Online | QR Here',
    description:
      'Create custom QR codes online with logos, colors, and frames. Generate high-resolution PNG or vector SVG QR codes for free in your browser.',
    canonicalPath: '/qr-code-generator',
    ogType: 'website',
  },
  // Legacy route aliases for backward compatibility in config lookups
  scan: {
    title: 'QR Code Scanner Online — Scan QR Codes from Camera or Image | QR Here',
    description:
      'Scan QR codes online with your camera or an uploaded image. QR Here lets you scan here directly in your browser without installing an app.',
    canonicalPath: '/',
    ogType: 'website',
  },
  create: {
    title: 'Free QR Code Generator — Create Custom QR Codes Online | QR Here',
    description:
      'Create custom QR codes online with logos, colors, and frames. Generate high-resolution PNG or vector SVG QR codes for free in your browser.',
    canonicalPath: '/qr-code-generator',
    ogType: 'website',
  },
  about: {
    title: 'About Us — Private In-Browser QR Tools | QR Here',
    description:
      'Learn how QR Here operates in your browser using client-side algorithms to provide fast, private QR code scanning and generation.',
    canonicalPath: '/about',
    ogType: 'website',
  },
  contact: {
    title: 'Contact Us | QR Here',
    description:
      'Contact the QR Here maintainer for technical support, feedback, bug reports, or feature requests regarding our online QR tools.',
    canonicalPath: '/contact',
    ogType: 'website',
  },
  faq: {
    title: 'Frequently Asked Questions — QR Scanning & Creation | QR Here',
    description:
      'Clear answers to common questions about scanning with camera or image upload, generating custom QR codes, error correction, and privacy.',
    canonicalPath: '/faq',
    ogType: 'website',
  },
  privacy: {
    title: 'Privacy Policy | QR Here',
    description:
      'Our privacy policy. Learn how all QR decoding and generation executes locally in your browser with zero data retention and zero tracking.',
    canonicalPath: '/privacy',
    ogType: 'website',
  },
  terms: {
    title: 'Terms of Service | QR Here',
    description:
      'Terms of service, usage guidelines, and open standard disclaimers for using the QR Here web application.',
    canonicalPath: '/terms',
    ogType: 'website',
  },
  blog: {
    title: 'QR Code Blog: Guides, Tips & Tutorials | QR Here',
    description:
      'Learn about QR codes, scanning, generation, static and dynamic QR codes, and practical tips with simple guides and tutorials.',
    canonicalPath: '/blog',
    ogType: 'website',
  },
  blogStaticVsDynamic: {
    title: 'Static vs Dynamic QR Code: What’s the Difference? | QR Here',
    description:
      'Learn the difference between static and dynamic QR codes, how they work, their key benefits, limitations, and which type to use.',
    canonicalPath: '/blog/static-vs-dynamic-qr-code',
    ogType: 'article',
  },
  blogVcardBusinessCards: {
    title: 'vCard QR Code Generator Free: Create Digital Cards | QR Here',
    description:
      'Create digital business card QR codes using a vCard QR code generator free online. Enable instant address book saves with zero apps required. Generate yours now!',
    canonicalPath: '/blog/how-to-create-vcard-qr-code',
    ogType: 'article',
  },
  blogScanWithoutApp: {
    title: 'How to Scan a QR Code Without an App | QR Here',
    description:
      'Learn how to scan QR codes on iPhone, Android, and PC without installing third-party apps. Step-by-step camera and browser scanner guide.',
    canonicalPath: '/blog/how-to-scan-qr-code-without-app',
    ogType: 'article',
  },
  blogWifiQrCode: {
    title: 'How to Create a WiFi QR Code (Free, No App) | QR Here',
    description:
      'Stop reading your WiFi password out loud. Learn how to make a free WiFi QR code guests can scan to connect instantly — no app, no sign-up, no typing.',
    canonicalPath: '/blog/how-to-create-wifi-qr-code',
    ogType: 'article',
  },
  qrCodeSecurity: {
    title: 'QR Code Security Guide: How to Scan QR Codes Safely | QR Here',
    description:
      'Learn how QR code phishing and quishing work, how to spot suspicious QR codes and URLs, and practical steps for safer QR code scanning.',
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
    name: `${APP_CONFIG.name} - QR Code Scanner`,
    url: siteUrl,
    description:
      'Scan QR codes online with your camera or an uploaded image. QR Here lets you scan here directly in your browser without installing an app.',
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
