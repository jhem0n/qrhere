import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ShieldCheck, Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config/app.config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="app-footer"
      className="w-full border-t border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors mt-auto"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <QrCode className="h-4 w-4" />
              </div>
              <span>{APP_CONFIG.name}</span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              A fast, privacy-focused online tool for scanning and generating QR codes. All decoding
              and generation processes run entirely in your web browser. We never upload your images
              or send your data to external servers.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Knowledge • Client-Side Only</span>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              QR Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/scan"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Scan with Camera
                </Link>
              </li>
              <li>
                <Link
                  to="/scan"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Scan from Image File
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Create Website QR Code
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Create Wi-Fi QR Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} {APP_CONFIG.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Engineered for privacy and performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
