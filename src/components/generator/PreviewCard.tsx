import React, { useState } from 'react';
import {
  Download,
  Copy,
  Share2,
  Printer,
  FileDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Ruler,
  Check,
} from 'lucide-react';
import { QRDesignState, ScannabilityResult } from '../../types/generator.types';
import { downloadQrCode, copyQrToClipboard, shareQrCode } from '../../lib/qr/exportPng';

interface PreviewCardProps {
  svgString: string;
  rawPayload: string;
  state: QRDesignState;
  scannability: ScannabilityResult;
  onFixIssue: (action: string) => void;
  onOpenPdfModal: () => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  svgString,
  rawPayload,
  state,
  scannability,
  onFixIssue,
  onOpenPdfModal,
}) => {
  const [showMoreExports, setShowMoreExports] = useState(false);
  const [showIssuesList, setShowIssuesList] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedData, setCopiedData] = useState(false);
  const [scanDistanceMeters, setScanDistanceMeters] = useState(0.5); // 0.5m = 50cm

  // Primary Downloads
  const handleDownloadPng = async () => {
    await downloadQrCode(svgString, {
      format: 'png',
      size: state.size || 1024,
      fileName: `qrhere-${state.type}`,
    });
  };

  const handleDownloadSvg = async () => {
    await downloadQrCode(svgString, {
      format: 'svg',
      size: state.size || 1024,
      fileName: `qrhere-${state.type}`,
    });
  };

  const handleDownloadRaster = async (format: 'jpeg' | 'webp') => {
    await downloadQrCode(svgString, {
      format,
      size: state.size || 1024,
      fileName: `qrhere-${state.type}`,
    });
  };

  const handleCopyImage = async () => {
    const success = await copyQrToClipboard(svgString, 1024);
    if (success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } else {
      alert('Could not copy image to clipboard. Try downloading PNG instead.');
    }
  };

  const handleCopyData = () => {
    navigator.clipboard.writeText(rawPayload);
    setCopiedData(true);
    setTimeout(() => setCopiedData(false), 2000);
  };

  const handleShare = async () => {
    await shareQrCode(svgString, `QR Code for ${state.type}`);
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <head><title>Print QR Code - QR Here</title></head>
          <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;">
            <div style="max-width:400px;text-align:center;">
              ${svgString}
              <p style="font-family:sans-serif;font-size:12px;color:#666;margin-top:16px;">Scan with phone camera</p>
            </div>
            <script>window.onload = function() { window.print(); window.close(); }</script>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  // Distance formula: recommended min QR size = scan distance / 10
  const recommendedMinSizeCm = Math.max(2, Math.round((scanDistanceMeters * 100) / 10 * 10) / 10);

  // Status Badge Colors
  let badgeBg = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  let StatusIcon = CheckCircle2;

  if (scannability.score === 'fail') {
    badgeBg = 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    StatusIcon = XCircle;
  } else if (scannability.score === 'risky') {
    badgeBg = 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    StatusIcon = AlertTriangle;
  }

  return (
    <div className="sticky top-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Live QR Preview
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          {state.size}x{state.size}px
        </span>
      </div>

      {/* SVG Canvas Preview Frame */}
      <div className="w-full aspect-square bg-[#F8FAFC] dark:bg-slate-950/70 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 relative overflow-hidden shadow-inner group">
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.02]"
          dangerouslySetInnerHTML={{ __html: svgString }}
        />
      </div>

      {/* Scannability Engine & Decode Verification Status */}
      <div className="space-y-2">
        <div
          onClick={() => setShowIssuesList(!showIssuesList)}
          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${badgeBg}`}
        >
          <div className="flex items-center gap-2">
            <StatusIcon className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold block">{scannability.scoreLabel}</span>
              <span className="text-[10px] opacity-80 block">
                Contrast: {scannability.contrastRatio}:1 · {scannability.decodedSuccessfully ? 'Decoded cleanly' : 'Optical check running'}
              </span>
            </div>
          </div>
          {scannability.issues.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] font-semibold">
              <span>{scannability.issues.length} {scannability.issues.length === 1 ? 'tip' : 'tips'}</span>
              {showIssuesList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          )}
        </div>

        {/* Expandable Issues / Recommendations List with Fix Buttons */}
        {showIssuesList && scannability.issues.length > 0 && (
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2.5 text-xs">
            {scannability.issues.map((issue) => (
              <div key={issue.id} className="flex items-start justify-between gap-3 text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-1.5 flex-1">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{issue.message}</span>
                </div>
                {issue.canFix && issue.fixAction && (
                  <button
                    type="button"
                    onClick={() => onFixIssue(issue.fixAction!)}
                    className="shrink-0 px-2 py-1 rounded bg-blue-600 text-white font-semibold text-[10px] hover:bg-blue-700 transition"
                  >
                    Fix it for me
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Download Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleDownloadPng}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm hover:bg-blue-700 active:scale-95 transition cursor-pointer min-h-[46px]"
        >
          <Download className="w-4 h-4" />
          <span>Download PNG</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadSvg}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-sm hover:bg-slate-800 active:scale-95 transition cursor-pointer min-h-[46px]"
        >
          <Download className="w-4 h-4" />
          <span>Download SVG</span>
        </button>
      </div>

      {/* More Export Options Toolbar */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          type="button"
          onClick={() => setShowMoreExports(!showMoreExports)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 py-1.5 hover:text-blue-600 transition cursor-pointer"
        >
          <span>More formats & sharing options</span>
          {showMoreExports ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showMoreExports && (
          <div className="grid grid-cols-2 gap-2 pt-1 animate-in fade-in duration-150">
            <button
              type="button"
              onClick={() => handleDownloadRaster('jpeg')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-400" />
              <span>JPG Format</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadRaster('webp')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-400" />
              <span>WebP Format</span>
            </button>

            <button
              type="button"
              onClick={onOpenPdfModal}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600" />
              <span>PDF Print Sheet</span>
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedImage ? 'Image Copied!' : 'Copy Image'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyData}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
              title="Copy the raw text string stored inside the code"
            >
              {copiedData ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedData ? 'Data Copied!' : 'Copy QR Data'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share Code</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 col-span-2"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick Print Sheet</span>
            </button>
          </div>
        )}
      </div>

      {/* Print Size Calculator Helper */}
      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
          <Ruler className="w-3.5 h-3.5 text-blue-600" />
          <span>Print Size Calculator</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-slate-600 dark:text-slate-400">
          <span>Scan distance:</span>
          <select
            value={scanDistanceMeters}
            onChange={(e) => setScanDistanceMeters(parseFloat(e.target.value))}
            className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs"
          >
            <option value={0.3}>30 cm (Handheld / Business card)</option>
            <option value={0.5}>50 cm (Desk / Table menu)</option>
            <option value={1.0}>1 meter (Counter / Wall flyer)</option>
            <option value={2.0}>2 meters (Poster / Window)</option>
            <option value={5.0}>5 meters (Billboard / Banner)</option>
          </select>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Recommended min size: <strong className="text-slate-900 dark:text-white font-bold">{recommendedMinSizeCm} x {recommendedMinSizeCm} cm</strong> ({Math.round(recommendedMinSizeCm * 0.3937 * 10) / 10} inches)
        </p>
      </div>
    </div>
  );
};
