import React, { useEffect } from 'react';
import { RouteSEO, BreadcrumbItem, generateBreadcrumbSchema, generateWebsiteSchema } from '../../config/seo.config';
import { APP_CONFIG, getSiteUrl } from '../../config/app.config';

export interface SEOHeadProps {
  seo: RouteSEO;
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: object;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  seo,
  breadcrumbs,
  structuredData,
  noIndex,
}) => {
  useEffect(() => {
    const isNoIndex = noIndex || seo.noIndex;
    const siteUrl = getSiteUrl();

    // 1. Update Title
    document.title = seo.title;

    // 2. Helper to set or create meta tag
    const setMeta = (nameAttr: string, nameValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    setMeta('name', 'description', seo.description);
    
    // Explicitly remove keywords meta tag if present (per modern SEO best practices)
    const existingKeywords = document.querySelector('meta[name="keywords"]');
    if (existingKeywords) {
      existingKeywords.remove();
    }

    setMeta(
      'name',
      'robots',
      isNoIndex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // Canonical link calculation (strictly sanitized to never use localhost)
    const normalizedPath = seo.canonicalPath.startsWith('/') ? seo.canonicalPath : `/${seo.canonicalPath}`;
    const fullCanonical = `${siteUrl.replace(/\/$/, '')}${normalizedPath === '/' ? '/' : normalizedPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (isNoIndex) {
      // Remove canonical tag on 404 or noindex pages
      if (canonicalLink) {
        canonicalLink.remove();
      }
    } else {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', fullCanonical);
    }

    // OpenGraph Meta Tags
    setMeta('property', 'og:site_name', APP_CONFIG.name);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:type', seo.ogType || 'website');
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:image', `${siteUrl}/icon.svg`);
    setMeta('property', 'og:image:type', 'image/svg+xml');
    setMeta('property', 'og:image:alt', `${APP_CONFIG.name} - Free Online QR Code Scanner & Generator`);
    setMeta('property', 'og:locale', 'en_US');

    // Twitter / X Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', `${siteUrl}/icon.svg`);
    setMeta('name', 'twitter:image:alt', `${APP_CONFIG.name} - Free Online QR Code Scanner & Generator`);

    // Structured data injection
    let finalSchema: object;
    if (structuredData) {
      finalSchema = structuredData;
    } else {
      const extraEntities: object[] = [];
      if (breadcrumbs && breadcrumbs.length > 0) {
        extraEntities.push(generateBreadcrumbSchema(breadcrumbs, siteUrl));
      }
      finalSchema = generateWebsiteSchema(extraEntities);
    }

    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(finalSchema, null, 2);
  }, [
    seo.title,
    seo.description,
    seo.keywords,
    seo.canonicalPath,
    seo.ogType,
    seo.noIndex,
    noIndex,
    breadcrumbs ? JSON.stringify(breadcrumbs) : '',
    structuredData ? JSON.stringify(structuredData) : '',
  ]);

  return null;
};
