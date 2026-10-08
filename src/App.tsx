import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GoogleAnalyticsTracker } from './components/common/GoogleAnalyticsTracker';
import { GoogleAutoAds } from './components/common/GoogleAutoAds';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/Home/HomePage';
import { QR_TYPES } from './data/qrTypes';

// Resilient route-level code splitting: retry dynamic import if transient network or build hiccup occurs
const lazyWithRetry = (factory: () => Promise<{ default: React.ComponentType<any> }>) =>
  lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      console.warn('Dynamic import failed, retrying once...', error);
      await new Promise((resolve) => setTimeout(resolve, 300));
      return await factory();
    }
  });

const CreatePage = lazyWithRetry(() => import('./pages/Create/CreatePage').then(m => ({ default: m.CreatePage })));
const AboutPage = lazyWithRetry(() => import('./pages/About/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazyWithRetry(() => import('./pages/Contact/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazyWithRetry(() => import('./pages/FAQ/FAQPage').then(m => ({ default: m.FAQPage })));
const PrivacyPage = lazyWithRetry(() => import('./pages/Privacy/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazyWithRetry(() => import('./pages/Terms/TermsPage').then(m => ({ default: m.TermsPage })));
const BlogIndexPage = lazyWithRetry(() => import('./pages/Blog/BlogIndexPage').then(m => ({ default: m.BlogIndexPage })));
const BlogPostStaticVsDynamic = lazyWithRetry(() => import('./pages/Blog/BlogPostStaticVsDynamic').then(m => ({ default: m.BlogPostStaticVsDynamic })));
const BlogPostVcardQrCode = lazyWithRetry(() => import('./pages/Blog/BlogPostVcardQrCode').then(m => ({ default: m.BlogPostVcardQrCode })));
const BlogPostScanWithoutApp = lazyWithRetry(() => import('./pages/Blog/BlogPostScanWithoutApp').then(m => ({ default: m.BlogPostScanWithoutApp })));
const BlogPostWifiQrCode = lazyWithRetry(() => import('./pages/Blog/BlogPostWifiQrCode').then(m => ({ default: m.BlogPostWifiQrCode })));
const BlogPostErrorCorrection = lazyWithRetry(() => import('./pages/Blog/BlogPostErrorCorrection').then(m => ({ default: m.BlogPostErrorCorrection })));
const BlogPostScanFromScreenshot = lazyWithRetry(() => import('./pages/Blog/BlogPostScanFromScreenshot').then(m => ({ default: m.BlogPostScanFromScreenshot })));
const BlogPostQrCodeHistory = lazyWithRetry(() => import('./pages/Blog/BlogPostQrCodeHistory').then(m => ({ default: m.BlogPostQrCodeHistory })));
const BlogPostHowDoesQrCodeWork = lazyWithRetry(() => import('./pages/Blog/BlogPostHowDoesQrCodeWork').then(m => ({ default: m.BlogPostHowDoesQrCodeWork })));
const BarcodeScannerPage = lazyWithRetry(() => import('./pages/Barcode/BarcodeScannerPage').then(m => ({ default: m.BarcodeScannerPage })));
const ScanWifiPage = lazyWithRetry(() => import('./pages/Scanner/ScanWifiPage').then(m => ({ default: m.ScanWifiPage })));
const ScanWhatsappPage = lazyWithRetry(() => import('./pages/Scanner/ScanWhatsappPage').then(m => ({ default: m.ScanWhatsappPage })));
const QrCodeSecurityPage = lazyWithRetry(() => import('./pages/Security/QrCodeSecurityPage').then(m => ({ default: m.QrCodeSecurityPage })));
const QrCodePrintGuidePage = lazyWithRetry(() => import('./pages/Guide/QrCodePrintGuidePage').then(m => ({ default: m.QrCodePrintGuidePage })));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFound/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const TypePageTemplate = lazyWithRetry(() => import('./components/generator/TypePageTemplate').then(m => ({ default: m.TypePageTemplate })));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GoogleAutoAds />
      <GoogleAnalyticsTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan-wifi-qr-code" element={<ScanWifiPage />} />
          <Route path="/scan-whatsapp-qr-code" element={<ScanWhatsappPage />} />
          <Route path="/barcode-scanner" element={<BarcodeScannerPage />} />
          <Route path="/barcode-scanner-online" element={<Navigate to="/barcode-scanner" replace />} />
          <Route path="/qr-code-generator" element={<CreatePage />} />
          <Route path="/create" element={<Navigate to="/qr-code-generator" replace />} />
          <Route path="/scan" element={<Navigate to="/" replace />} />
          {QR_TYPES.map((typeDef) => (
            <Route
              key={typeDef.slug}
              path={`/${typeDef.slug}`}
              element={<TypePageTemplate typeDef={typeDef} />}
            />
          ))}
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/static-vs-dynamic-qr-code" element={<BlogPostStaticVsDynamic />} />
          <Route
            path="/blog/how-to-create-vcard-qr-code"
            element={<BlogPostVcardQrCode />}
          />
          <Route
            path="/blog/how-to-create-vcard-qr-code-digital-business-cards"
            element={<Navigate to="/blog/how-to-create-vcard-qr-code" replace />}
          />
          <Route
            path="/blog/how-to-scan-qr-code-without-app"
            element={<BlogPostScanWithoutApp />}
          />
          <Route
            path="/blog/how-to-create-wifi-qr-code"
            element={<BlogPostWifiQrCode />}
          />
          <Route
            path="/blog/qr-code-error-correction-explained"
            element={<BlogPostErrorCorrection />}
          />
          <Route
            path="/blog/scan-qr-code-from-screenshot"
            element={<BlogPostScanFromScreenshot />}
          />
          <Route
            path="/blog/qr-code-history"
            element={<BlogPostQrCodeHistory />}
          />
          <Route
            path="/blog/how-does-a-qr-code-work"
            element={<BlogPostHowDoesQrCodeWork />}
          />
          <Route path="/qr-code-security" element={<QrCodeSecurityPage />} />
          <Route path="/qr-code-size-and-print-guide" element={<QrCodePrintGuidePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
