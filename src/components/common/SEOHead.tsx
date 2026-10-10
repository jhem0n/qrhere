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
    
    // Always remove any legacy meta keywords tag if found in DOM
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

    // Calculate Page Image (supports custom image per page, falls back to default og-image)
    const rawImage = seo.image || '/og-image.png';
    const pageImage = rawImage.startsWith('http')
      ? rawImage
      : `${siteUrl.replace(/\/$/, '')}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
    const imageAlt = seo.imageAlt || seo.title || 'QR Here – Free QR Code Scanner and Generator';
    const isSvg = pageImage.endsWith('.svg');
    const isJpg = pageImage.endsWith('.jpg') || pageImage.endsWith('.jpeg');
    const imageType = isSvg ? 'image/svg+xml' : isJpg ? 'image/jpeg' : 'image/png';
    const imageWidth = seo.imageWidth ? String(seo.imageWidth) : '1200';
    const imageHeight = seo.imageHeight ? String(seo.imageHeight) : '630';

    // OpenGraph Meta Tags
    setMeta('property', 'og:site_name', APP_CONFIG.name);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:type', seo.ogType || 'website');
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:image', pageImage);
    setMeta('property', 'og:image:secure_url', pageImage);
    setMeta('property', 'og:image:type', imageType);
    setMeta('property', 'og:image:width', imageWidth);
    setMeta('property', 'og:image:height', imageHeight);
    setMeta('property', 'og:image:alt', imageAlt);
    setMeta('property', 'og:locale', 'en_US');

    // Twitter / X Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', pageImage);
    setMeta('name', 'twitter:image:alt', imageAlt);

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
    seo.canonicalPath,
    seo.ogType,
    seo.image,
    seo.imageAlt,
    seo.noIndex,
    noIndex,
    breadcrumbs ? JSON.stringify(breadcrumbs) : '',
    structuredData ? JSON.stringify(structuredData) : '',
  ]);

  return null;
};
