import React, { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  Globe,
} from 'lucide-react';
import { QRScanResult } from '../../types/qr.types';
import { QRGeneratorService } from '../../services/qr/generator.service';
import { parseWifiQR } from '../../utils/qr/presets';

interface ScanResultCardProps {
  result: QRScanResult;
  onScanAgain: () => void;
}

export const ScanResultCard: React.FC<ScanResultCardProps> = ({ result, onScanAgain }) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Copy result with visual feedback
  const handleCopy = async () => {
    const success = await QRGeneratorService.copyText(result.rawText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const wifiInfo = result.type === 'wifi' ? parseWifiQR(result.rawText) : null;
  const isDangerousOrBlocked = !result.isSafeUrl && (result.warning !== undefined || result.type === 'url');

  return (
    <div
      id="scan-result-container"
      role="region"
      aria-label="QR Code Detection Result"
      className="w-full rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all animate-in fade-in duration-200"
    >
      {/* Header with status badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
              isDangerousOrBlocked
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
            }`}
          >
            {isDangerousOrBlocked ? (
              <ShieldAlert className="h-5 w-5" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isDangerousOrBlocked ? 'Scanned with Security Warning' : 'QR Code Detected'}
              </h3>
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                  isDangerousOrBlocked
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                }`}
              >
                {isDangerousOrBlocked ? (
                  <>
                    <AlertTriangle className="w-3 h-3" />
                    <span>Unsafe Scheme</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Safe</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Source: {result.source === 'camera' ? 'Live Camera' : 'Uploaded Image'} •{' '}
              {new Date(result.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Content Type Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize">
          {result.type === 'url' && <Globe className="w-3.5 h-3.5 text-blue-500" />}
          {result.type === 'wifi' && <Wifi className="w-3.5 h-3.5 text-amber-500" />}
          {result.type === 'email' && <Mail className="w-3.5 h-3.5 text-purple-500" />}
          {result.type === 'tel' && <Phone className="w-3.5 h-3.5 text-green-500" />}
          {result.type === 'sms' && <MessageSquare className="w-3.5 h-3.5 text-teal-500" />}
          {result.type === 'text' && <FileText className="w-3.5 h-3.5 text-slate-500" />}
          <span>{result.type} Payload</span>
        </span>
      </div>

      {/* Critical Security Warning Banner for dangerous/unauthorized schemes */}
      {!result.isSafeUrl && result.warning && (
        <div
          id="security-alert-box"
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-sm text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200"
        >
          <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-rose-900 dark:text-rose-200">
              Action & Execution Strictly Blocked for Safety
            </span>
            <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
              {result.warning}
            </p>
            <p className="text-[11px] text-rose-700 dark:text-rose-400">
              This application never executes scripts or redirects automatically. You may inspect or copy the raw text below safely.
            </p>
          </div>
        </div>
      )}

      {/* Advisory Warning Banner for safe links with nuances (e.g. Punycode, Insecure HTTP) */}
      {result.isSafeUrl && result.warning && (
        <div
          id="security-advisory-box"
          role="status"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-900 dark:text-amber-200">Security Advisory</span>
            <p className="leading-relaxed opacity-90">{result.warning}</p>
          </div>
        </div>
      )}

      {/* Safe URL Destination Information */}
      {result.isSafeUrl && result.parsedUrl && (
        <div className="mt-4 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-semibold mb-1">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Target Destination:</span>
            <span className="font-mono text-blue-700 dark:text-blue-200">{result.displayHostname || 'Web URL'}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            This link was validated against dangerous schemes and uses {result.urlScheme || 'https:'} protocol.
          </p>
        </div>
      )}

      {/* Decoded Content Display - Rendered strictly as text, NEVER HTML */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="scanned-raw-text"
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
          >
            Decoded Content (Text Only)
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            {result.rawText.length} characters
          </span>
        </div>

        <div className="relative group">
          <textarea
            id="scanned-raw-text"
            readOnly
            rows={Math.min(7, Math.max(3, Math.ceil(result.rawText.length / 60)))}
            value={result.rawText}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 break-all select-all focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
            aria-label="Decoded QR text content"
          />
        </div>
      </div>

      {/* Specialized Wi-Fi Details Panel if applicable */}
      {wifiInfo && (
        <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 text-xs dark:border-amber-900/40 dark:bg-amber-950/10 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
            <Wifi className="w-4 h-4 text-amber-600" />
            <span>Wi-Fi Network Configuration</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Network (SSID): </span>
              <span className="font-semibold font-mono">{wifiInfo.ssid}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Security Type: </span>
              <span className="font-medium">{wifiInfo.encryption}</span>
            </div>
            {wifiInfo.password && (
              <div className="col-span-full flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Network Password: </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {showPassword ? wifiInfo.password : '••••••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                  aria-label={showPassword ? 'Hide Wi-Fi password' : 'Show Wi-Fi password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons: Copy Result, Safe Open Link, Scan Again */}
      <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* Safe Open Link: ONLY rendered if isSafeUrl is TRUE and protocol is HTTP/HTTPS */}
        {result.isSafeUrl && result.parsedUrl && (
          <a
            href={result.parsedUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="open-safe-link-btn"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-h-[44px]"
            title="Open verified website in a new secure tab"
          >
            <span>Safe Open Link</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}

        {/* Action button for safe mailto / tel / sms */}
        {result.isSafeUrl && result.type === 'email' && result.parsedUrl && (
          <a
            href={result.parsedUrl}
            id="email-link-btn"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition cursor-pointer min-h-[44px]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>
        )}

        {result.isSafeUrl && result.type === 'tel' && result.parsedUrl && (
          <a
            href={result.parsedUrl}
            id="call-tel-btn"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition cursor-pointer min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Number</span>
          </a>
        )}

        {result.isSafeUrl && result.type === 'sms' && result.parsedUrl && (
          <a
            href={result.parsedUrl}
            id="send-sms-btn"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition cursor-pointer min-h-[44px]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send SMS</span>
          </a>
        )}

        {/* Copy Result Button */}
        <button
          type="button"
          onClick={handleCopy}
          id="copy-result-btn"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-h-[44px]"
          title="Copy the scanned result to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600 dark:text-emerald-400">Result Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Result</span>
            </>
          )}
        </button>

        {/* Scan Again Button */}
        <button
          type="button"
          onClick={onScanAgain}
          id="scan-again-btn"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition sm:ml-auto cursor-pointer min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Scan Again</span>
        </button>
      </div>
    </div>
  );
};
