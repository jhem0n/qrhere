import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';
import { STATIC_ROUTES } from './scripts/prerender-data';

/**
 * Generates sitemap.xml, robots.txt, llms.txt, and static HTML pages for all routes dynamically.
 * Strictly prevents localhost or 127.0.0.1 from ever leaking into SEO assets.
 */
function seoFilesPlugin(): Plugin {
  const resolveDomain = () => {
    const raw = process.env.VITE_SITE_URL || process.env.APP_URL || '';
    if (
      raw &&
      !raw.includes('localhost') &&
      !raw.includes('127.0.0.1') &&
      !raw.includes('qr-now.online') &&
      !raw.includes('qrcodescanner.app') &&
      !raw.includes('run.app')
    ) {
      return raw.trim().replace(/\/$/, '');
    }
    return 'https://qrhere.online';
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const getSitemapXml = () => {
    const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      return fs.readFileSync(sitemapPath, 'utf-8');
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://qrhere.online/</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/qr-code-generator</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/blog</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/blog/static-vs-dynamic-qr-code</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/blog/how-to-create-vcard-qr-code</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/blog/how-to-scan-qr-code-without-app</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/blog/how-to-create-wifi-qr-code</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/faq</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/about</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/contact</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/qr-code-security</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/privacy</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://qrhere.online/terms</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
</urlset>
`;
  };

  const getRobotsTxt = () => {
    const robotsPath = path.resolve(__dirname, 'public/robots.txt');
    if (fs.existsSync(robotsPath)) {
      return fs.readFileSync(robotsPath, 'utf-8');
    }
    return `User-agent: *
Allow: /

Sitemap: https://qrhere.online/sitemap.xml
`;
  };

  const generateLlmsTxt = (domain: string) => `# QR Here

> The QR code scanner online lets you scan QR codes without any app. Upload an image or use your camera to scan a QR code. Also includes custom vector QR code generation completely in your browser.

## Core Tools

- [QR Code Scanner](${domain}/): Scan QR codes directly with your device webcam or by uploading image files. Decoded 100% locally in your browser with zero server uploads.
- [QR Code Generator](${domain}/qr-code-generator): Create customized vector QR codes with colors, dots, corners, and embedded logos with SVG or PNG export.

## Support & Documentation

- [Frequently Asked Questions](${domain}/faq): Answers to common questions regarding camera permissions, offline usage, and printing specifications.
- [About QR Here](${domain}/about): Background on our zero-knowledge architecture, performance design, and client-side processing.
- [Contact](${domain}/contact): Support, feedback, and technical inquiries for QR Here.

## Legal & Policies

- [QR Code Security Guide](${domain}/qr-code-security): Practical security guide covering quishing, fake stickers, phishing verification, and safe QR scanning habits.
- [Privacy Policy](${domain}/privacy): Clear disclosure explaining our client-side zero-knowledge architecture with no server storage.
- [Terms of Service](${domain}/terms): Usage conditions, license guidelines, and terms for using QR Here.

## Articles & Guides

- [QR Code Blog](${domain}/blog): Practical tutorials, technical comparisons, and guides on QR codes.
- [How to Scan a QR Code Without an App](${domain}/blog/how-to-scan-qr-code-without-app): Step-by-step guide to scanning QR codes using your phone camera, web browser, or screenshots without installing third-party apps.
- [How to Create a vCard QR Code](${domain}/blog/how-to-create-vcard-qr-code): Guide on generating digital business card QR codes for smartphone address books.
- [Static vs Dynamic QR Code](${domain}/blog/static-vs-dynamic-qr-code): Comprehensive technical comparison between static and dynamic QR codes.
`;

  return {
    name: 'seo-files-generator',
    generateBundle() {
      const domain = resolveDomain();
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: getSitemapXml(),
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: getRobotsTxt(),
      });
      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: generateLlmsTxt(domain),
      });
      const adsTxtPath = path.resolve(__dirname, 'public/ads.txt');
      if (fs.existsSync(adsTxtPath)) {
        this.emitFile({
          type: 'asset',
          fileName: 'ads.txt',
          source: fs.readFileSync(adsTxtPath, 'utf-8'),
        });
      }
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        const domain = resolveDomain();
        const baseHtml = fs.readFileSync(indexPath, 'utf-8');

        for (const route of STATIC_ROUTES) {
          let routeHtml = baseHtml;
          // Replace title
          routeHtml = routeHtml.replace(
            /<title>[^<]*<\/title>/i,
            `<title>${route.title}</title>`
          );
          // Replace description
          routeHtml = routeHtml.replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="description" content="${route.description}" />`
          );
          // Replace keywords
          routeHtml = routeHtml.replace(
            /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="keywords" content="${route.keywords}" />`
          );
          // Replace canonical
          routeHtml = routeHtml.replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
            `<link rel="canonical" href="${domain}${route.path}" />`
          );
          // Replace og:url
          routeHtml = routeHtml.replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:url" content="${domain}${route.path}" />`
          );
          // Replace og:title
          routeHtml = routeHtml.replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:title" content="${route.title}" />`
          );
          // Replace og:description
          routeHtml = routeHtml.replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:description" content="${route.description}" />`
          );
          // Replace twitter:title
          routeHtml = routeHtml.replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:title" content="${route.title}" />`
          );
          // Replace twitter:description
          routeHtml = routeHtml.replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:description" content="${route.description}" />`
          );
          // Replace <main class="flex-1">...</main> inside #root
          routeHtml = routeHtml.replace(
            /<main class="flex-1">[\s\S]*?<\/main>/i,
            `<main class="flex-1">${route.htmlContent}</main>`
          );

          const routeDir = path.join(distDir, route.folder);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf-8');
        }

        // Emit static 301-equivalent redirect fallbacks for legacy URLs
        const redirects = [
          { folder: 'scan', destination: `${domain}/` },
          { folder: 'create', destination: `${domain}/qr-code-generator` },
          {
            folder: 'blog/how-to-create-vcard-qr-code-digital-business-cards',
            destination: `${domain}/blog/how-to-create-vcard-qr-code`,
          },
        ];
        for (const redirect of redirects) {
          const redirectDir = path.join(distDir, redirect.folder);
          if (!fs.existsSync(redirectDir)) {
            fs.mkdirSync(redirectDir, { recursive: true });
          }
          const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${redirect.destination}">
  <link rel="canonical" href="${redirect.destination}">
  <title>Redirecting...</title>
  <script>window.location.replace("${redirect.destination}");</script>
</head>
<body>
  <p>Redirecting to <a href="${redirect.destination}">${redirect.destination}</a>...</p>
</body>
</html>`;
          fs.writeFileSync(path.join(redirectDir, 'index.html'), redirectHtml, 'utf-8');
        }
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const domain = resolveDomain();
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          return res.end(getSitemapXml());
        }
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end(getRobotsTxt());
        }
        if (req.url === '/llms.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end(generateLlmsTxt(domain));
        }
        if (req.url === '/ads.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          const adsTxtFile = path.resolve(__dirname, 'public/ads.txt');
          if (fs.existsSync(adsTxtFile)) {
            return res.end(fs.readFileSync(adsTxtFile, 'utf-8'));
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      seoFilesPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
