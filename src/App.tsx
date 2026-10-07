import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GoogleAnalyticsTracker } from './components/common/GoogleAnalyticsTracker';
import { GoogleAutoAds } from './components/common/GoogleAutoAds';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/Home/HomePage';
import { QR_TYPES } from './data/qrTypes';

// Route-level code splitting: lazy load all non-homepage routes
const CreatePage = lazy(() => import('./pages/Create/CreatePage').then(m => ({ default: m.CreatePage })));
const AboutPage = lazy(() => import('./pages/About/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage').then(m => ({ default: m.FAQPage })));
const PrivacyPage = lazy(() => import('./pages/Privacy/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/Terms/TermsPage').then(m => ({ default: m.TermsPage })));
const BlogIndexPage = lazy(() => import('./pages/Blog/BlogIndexPage').then(m => ({ default: m.BlogIndexPage })));
const BlogPostStaticVsDynamic = lazy(() => import('./pages/Blog/BlogPostStaticVsDynamic').then(m => ({ default: m.BlogPostStaticVsDynamic })));
const BlogPostVcardQrCode = lazy(() => import('./pages/Blog/BlogPostVcardQrCode').then(m => ({ default: m.BlogPostVcardQrCode })));
const BlogPostScanWithoutApp = lazy(() => import('./pages/Blog/BlogPostScanWithoutApp').then(m => ({ default: m.BlogPostScanWithoutApp })));
const BlogPostWifiQrCode = lazy(() => import('./pages/Blog/BlogPostWifiQrCode').then(m => ({ default: m.BlogPostWifiQrCode })));
const BlogPostErrorCorrection = lazy(() => import('./pages/Blog/BlogPostErrorCorrection').then(m => ({ default: m.BlogPostErrorCorrection })));
const BlogPostScanFromScreenshot = lazy(() => import('./pages/Blog/BlogPostScanFromScreenshot').then(m => ({ default: m.BlogPostScanFromScreenshot })));
const BlogPostQrCodeHistory = lazy(() => import('./pages/Blog/BlogPostQrCodeHistory').then(m => ({ default: m.BlogPostQrCodeHistory })));
const BlogPostHowDoesQrCodeWork = lazy(() => import('./pages/Blog/BlogPostHowDoesQrCodeWork').then(m => ({ default: m.BlogPostHowDoesQrCodeWork })));
const BarcodeScannerPage = lazy(() => import('./pages/Barcode/BarcodeScannerPage').then(m => ({ default: m.BarcodeScannerPage })));
const ScanWifiPage = lazy(() => import('./pages/Scanner/ScanWifiPage').then(m => ({ default: m.ScanWifiPage })));
const ScanWhatsappPage = lazy(() => import('./pages/Scanner/ScanWhatsappPage').then(m => ({ default: m.ScanWhatsappPage })));
const QrCodeSecurityPage = lazy(() => import('./pages/Security/QrCodeSecurityPage').then(m => ({ default: m.QrCodeSecurityPage })));
const QrCodePrintGuidePage = lazy(() => import('./pages/Guide/QrCodePrintGuidePage').then(m => ({ default: m.QrCodePrintGuidePage })));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const TypePageTemplate = lazy(() => import('./components/generator/TypePageTemplate').then(m => ({ default: m.TypePageTemplate })));

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
