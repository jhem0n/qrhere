# QR Here — QR Code Scanner & Generator

A high-performance, privacy-first web application for scanning and generating QR codes directly inside the browser using HTML5 Canvas, WebRTC, and Web Workers with zero server-side uploads.

---

## LOCAL DEVELOPMENT

To develop and test the application locally, ensure you have Node.js (version 18 or higher) and npm installed. The application is built with React 18, TypeScript, and Vite.

---

## INSTALLATION

Clone the repository and install all dependencies:

```bash
# Install root dependencies
npm install
```

---

## DEVELOPMENT

Start the local Vite development server:

```bash
npm run dev
```

The application development server will bind to `http://localhost:3000`.

- **Hot-reloading**: Code changes in `/src` trigger automatic updates.
- **Monetization test mode**: AdSense scripts are not loaded; safe placeholder bounding boxes can be toggled via `VITE_ADS_TEST_MODE`.

---

## BUILD

To compile and bundle the application for production deployment:

```bash
npm run build
```

This compiles TypeScript (`tsc`), generates production assets in `/dist`, and optimizes code splitting and bundle sizes.

---

## PREVIEW

To verify and test the production build locally before releasing:

```bash
npm run preview
```

This serves the contents of the `/dist` directory via Vite's production preview server at `http://localhost:3000`.

---

## DEPLOYMENT

The application is structured as a client-side Single Page Application (SPA) compatible with any static hosting platform or container environment:

### Standard Static Hosting (Cloudflare Pages, Vercel, Netlify, GitHub Pages)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Fallback**: Route all non-file paths to `/index.html`.

### Docker / Cloud Run Container Deployment
1. Build the production Docker container:
   ```bash
   docker build -t qr-code-scanner .
   ```
2. Run container:
   ```bash
   docker run -p 3000:3000 qr-code-scanner
   ```

---

## ENVIRONMENT VARIABLES

All environment variables are optional during development. Configure them in `.env` (refer to `.env.example`):

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `VITE_SITE_URL` | No | `https://qrcodescanner.app` | Canonical production domain used for SEO canonical tags, OpenGraph URLs, and sitemaps. |
| `APP_URL` | No | Container injected URL | Fallback hosting URL provided by cloud runtime environments. |
| `VITE_ADS_ENABLED` | No | `false` | Master toggle for Google AdSense monetization. Must be explicitly set to `"true"` to enable ad slots. |
| `VITE_ADSENSE_CLIENT_ID` | Conditional | `""` | Google AdSense Publisher/Client ID (e.g., `ca-pub-1234567890123456`). Required only when `VITE_ADS_ENABLED=true`. |
| `VITE_ADS_TEST_MODE` | No | `true` in dev, `false` in prod | Enables visual placeholder wireframes for ad slots without loading external Google scripts. |

---

## SEO CONFIGURATION

The application incorporates a comprehensive, modern SEO framework:

- **Canonical URL Enforcement**: All routes inject canonical link tags resolved via `getSiteUrl()`, preventing duplicate indexing or localhost URLs.
- **Meta Tags**: Route-specific `<title>`, `<meta name="description">`, OpenGraph (`og:*`), and Twitter Cards (`twitter:*`) are dynamically managed per route.
- **Structured Data (JSON-LD)**: Schema.org structured data schemas are injected into `<head>`:
  - `WebSite` & `SoftwareApplication` on Homepage
  - `BreadcrumbList` on all sub-routes
  - `FAQPage` on Homepage and FAQ Page
- **Crawlers**:
  - `public/robots.txt`: Directs search engine bots and points to the sitemap.
  - `public/sitemap.xml`: XML sitemap covering all routes with priority ratings and change frequencies.

---

## ADSENSE CONFIGURATION

Monetization strictly enforces Google AdSense Publisher Policies:

1. **Disabled by Default**: `VITE_ADS_ENABLED` is `false`. Zero external ad scripts or network calls are made unless explicitly enabled with a valid Client ID.
2. **Safe Degradation**: When ads are disabled and test mode is off, ad components collapse completely to `null` with 0 height, leaving no empty space, layout shifts, or stray DOM nodes.
3. **Policy-Compliant Placements**:
   - Ads are strictly isolated to neutral editorial areas (top of page, bottom of page, informational sidebar).
   - Ads are **never** placed adjacent to interactive buttons, inside camera viewfinders, or around file upload/download controls.
   - All active units render a mandatory `"ADVERTISEMENT"` label.
4. **Verification Suite**:
   Run the automated compliance test:
   ```bash
   npm run test:ads
   ```

---

## SECURITY NOTES

The application is engineered with a strict privacy-first architecture:

- **100% Client-Side Processing**: Neither camera video frames, uploaded image files, nor generated QR payloads are ever transmitted to any remote server or third-party cloud.
- **Camera Privacy & Zero Persistence**:
  - Camera access requires explicit user interaction (`Start Camera` button).
  - Video stream tracks are immediately stopped and cleared when navigating away, switching tabs (`visibilitychange`), or closing the window.
- **URL Sanitization & Anti-XSS**:
  - All decoded and generated URLs are sanitized against dangerous URI schemes (e.g. `javascript:`, `vbscript:`, `data:text/html`).
  - Outbound link navigation requires explicit user confirmation with `rel="noopener noreferrer"`.
- **WCAG Accessibility & Color Contrast**:
  - Color picker calculates real-time WCAG contrast ratios and displays optical scannability warnings if foreground and background colors fail readability thresholds.
- **Content Security & Headers**:
  - Application runs without arbitrary `eval()` or unvalidated inline scripts.
