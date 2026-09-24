import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GoogleAnalyticsTracker } from './components/common/GoogleAnalyticsTracker';
import { GoogleAutoAds } from './components/common/GoogleAutoAds';
import { HomePage } from './pages/Home/HomePage';
import { CreatePage } from './pages/Create/CreatePage';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { FAQPage } from './pages/FAQ/FAQPage';
import { PrivacyPage } from './pages/Privacy/PrivacyPage';
import { TermsPage } from './pages/Terms/TermsPage';
import { BlogIndexPage } from './pages/Blog/BlogIndexPage';
import { BlogPostStaticVsDynamic } from './pages/Blog/BlogPostStaticVsDynamic';
import { BlogPostVcardQrCode } from './pages/Blog/BlogPostVcardQrCode';
import { BlogPostScanWithoutApp } from './pages/Blog/BlogPostScanWithoutApp';
import { BlogPostWifiQrCode } from './pages/Blog/BlogPostWifiQrCode';
import { QrCodeSecurityPage } from './pages/Security/QrCodeSecurityPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAutoAds />
      <GoogleAnalyticsTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/qr-code-generator" element={<CreatePage />} />
          <Route path="/create" element={<Navigate to="/qr-code-generator" replace />} />
          <Route path="/scan" element={<Navigate to="/" replace />} />
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
          <Route path="/qr-code-security" element={<QrCodeSecurityPage />} />
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
