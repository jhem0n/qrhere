import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

/**
 * Generates sitemap.xml and robots.txt dynamically with the configured domain.
 * Strictly prevents localhost or 127.0.0.1 from ever leaking into SEO assets.
 */
function seoFilesPlugin(): Plugin {
  const resolveDomain = () => {
    const raw = process.env.VITE_SITE_URL || process.env.APP_URL || '';
    if (raw && !raw.includes('localhost') && !raw.includes('127.0.0.1')) {
      return raw.trim().replace(/\/$/, '');
    }
    return 'https://qrcodescanner.app';
  };

  const generateSitemap = (domain: string) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/scan</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/create</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/faq</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/about</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${domain}/contact</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${domain}/privacy</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${domain}/terms</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`;

  const generateRobots = (domain: string) => `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

  return {
    name: 'seo-files-generator',
    generateBundle() {
      const domain = resolveDomain();
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: generateSitemap(domain),
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: generateRobots(domain),
      });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const domain = resolveDomain();
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml');
          return res.end(generateSitemap(domain));
        }
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain');
          return res.end(generateRobots(domain));
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
