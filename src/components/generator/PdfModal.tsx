import React, { useState } from 'react';
import { X, Printer, Download, Sparkles } from 'lucide-react';
import { generatePdfPrintSheet } from '../../lib/qr/exportPdf';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgString: string;
  defaultLabel: string;
}

export const PdfModal: React.FC<PdfModalProps> = ({
  isOpen,
  onClose,
  svgString,
  defaultLabel,
}) => {
  const [paperSize, setPaperSize] = useState<'a4' | 'letter'>('a4');
  const [qrSizeCm, setQrSizeCm] = useState(5);
  const [copies, setCopies] = useState(6);
  const [label, setLabel] = useState(defaultLabel);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generatePdfPrintSheet(svgString, {
        paperSize,
        qrSizeCm,
        copiesPerPage: copies,
        label,
        fileName: 'qr-print-sheet',
      });
      onClose();
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Export PDF Print Sheet
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Paper Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaperSize('a4')}
                className={`py-2 px-3 rounded-xl border font-semibold ${
                  paperSize === 'a4'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                A4 (210 x 297 mm)
              </button>
              <button
                type="button"
                onClick={() => setPaperSize('letter')}
                className={`py-2 px-3 rounded-xl border font-semibold ${
                  paperSize === 'letter'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                US Letter (8.5 x 11 in)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>QR Code Physical Size: {qrSizeCm} cm</span>
              <span className="text-slate-400">({Math.round(qrSizeCm * 0.3937 * 10) / 10} in)</span>
            </div>
            <div className="flex gap-2">
              {[3, 5, 7, 10].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setQrSizeCm(sz)}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                    qrSizeCm === sz
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {sz} cm
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Copies per Page: {copies}
            </label>
            <input
              type="range"
              min="1"
              max="24"
              value={copies}
              onChange={(e) => setCopies(parseInt(e.target.value, 10))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Optional Cut-Label Text
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Scan to Connect to Guest Wi-Fi"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Generating PDF...' : 'Download PDF Sheet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
