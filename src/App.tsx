import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GoogleAnalyticsTracker } from './components/common/GoogleAnalyticsTracker';
import { HomePage } from './pages/Home/HomePage';
import { ScanPage } from './pages/Scan/ScanPage';
import { CreatePage } from './pages/Create/CreatePage';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { FAQPage } from './pages/FAQ/FAQPage';
import { PrivacyPage } from './pages/Privacy/PrivacyPage';
import { TermsPage } from './pages/Terms/TermsPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalyticsTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/create" element={<CreatePage />} />
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
