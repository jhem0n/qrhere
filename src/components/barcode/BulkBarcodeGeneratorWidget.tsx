import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Printer,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import {
  BarcodeGeneratorService,
  BarcodeFormatKey,
  BARCODE_FORMAT_MAP,
  validateBarcodeInput,
} from '../../services/qr/barcodeGenerator.service';

export const BulkBarcodeGeneratorWidget: React.FC = () => {
  const [format, setFormat] = useState<BarcodeFormatKey>('CODE_128');
  const [rawText, setRawText] = useState<string>(
    'SKU-1001, Product Alpha\nSKU-1002, Product Beta\nSKU-1003, Product Gamma\nINV-9004\nINV-9005'
  );
  const [fileType, setFileType] = useState<'png' | 'svg'>('png');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const lines = rawText.split('\n').filter((l) => l.trim().length > 0);
  const limitedLines = lines.slice(0, 100);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleGenerateZip = async () => {
    if (limitedLines.length === 0) {
      setStatusMessage('Please enter at least one value.');
      return;
    }

    setIsGenerating(true);
    setStatusMessage('Generating barcodes and building ZIP archive...');

    try {
      const result = await BarcodeGeneratorService.generateBulkZip(
        format,
        limitedLines,
        fileType
      );

      if (result.error || !result.blob) {
        setStatusMessage(result.error || 'Failed to generate ZIP archive.');
        setIsGenerating(false);
        return;
      }

      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bulk_barcodes_${format.toLowerCase()}_${Date.now()}.zip`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      setStatusMessage(
        `Successfully generated and downloaded ${result.successCount} barcodes (${result.failCount} skipped/failed).`
      );
    } catch (err: any) {
      setStatusMessage(err?.message || 'An error occurred during bulk generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-5">
          {/* Format Selector: 48px, 16px font */}
          <div>
            <label htmlFor="bulk-format-select" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Barcode Type for Batch
            </label>
            <div className="relative">
              <select
                id="bulk-format-select"
                value={format}
                onChange={(e) => setFormat(e.target.value as BarcodeFormatKey)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs appearance-none pr-10"
              >
                {Object.values(BARCODE_FORMAT_MAP).map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500 dark:text-slate-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* CSV Upload as a large tap area (56px high, dashed border box) */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Import from File
            </label>
            <label className="min-h-[56px] h-14 w-full flex items-center justify-center gap-2.5 px-4 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50 cursor-pointer transition text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 active:scale-[0.99]">
              <Upload className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Tap to upload CSV or TXT file</span>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Textarea: at least 160px high, 16px font, monospace */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="bulk-textarea" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Values List (One per line, max 100)</span>
              </label>
              <button
                type="button"
                onClick={() => setRawText('')}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 cursor-pointer transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
            <textarea
              id="bulk-textarea"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Enter one value per line&#10;Optional: VALUE, custom_filename"
              className="w-full min-h-[160px] p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs leading-relaxed"
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Rows detected: {lines.length} {lines.length > 100 ? '(first 100 processed)' : ''}</span>
            </div>
          </div>

          {/* Output File Format (44px touch targets) */}
          <div>
            <span className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Output Image Format
            </span>
            <div className="grid grid-cols-2 gap-3">
              <label className="min-h-[44px] flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="radio"
                  name="bulkFileType"
                  value="png"
                  checked={fileType === 'png'}
                  onChange={() => setFileType('png')}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span>PNG Archive (.zip)</span>
              </label>
              <label className="min-h-[44px] flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="radio"
                  name="bulkFileType"
                  value="svg"
                  checked={fileType === 'svg'}
                  onChange={() => setFileType('svg')}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span>Vector SVG (.zip)</span>
              </label>
            </div>
          </div>

          {/* Full-width Action Buttons ("Generate ZIP" & "Print sheet") */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              disabled={isGenerating || limitedLines.length === 0}
              onClick={handleGenerateZip}
              className="w-full min-h-[48px] h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
            >
              <Download className="w-5 h-5 shrink-0" />
              <span>{isGenerating ? 'Generating ZIP...' : `Generate ZIP (${limitedLines.length} Barcodes)`}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintSheet}
              className="w-full min-h-[48px] h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
            >
              <Printer className="w-5 h-5 shrink-0" />
              <span>Print Sheet</span>
            </button>
          </div>

          {statusMessage && (
            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900" role="status">
              {statusMessage}
            </p>
          )}
        </div>

        {/* Right Column: Live Validation (Stacked cards on phones, capped at 50vh with inner scroll) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Live Validation Preview</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing first 10
            </span>
          </div>

          {/* Row results capped at 50vh with internal scroll */}
          <div className="max-h-[50vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 p-2 sm:p-0 space-y-2.5 sm:space-y-0 divide-y-0 sm:divide-y divide-slate-100 dark:divide-slate-800 [scrollbar-width:thin]">
            {/* Phone View: Stacked Cards (sm:hidden) */}
            <div className="sm:hidden space-y-2">
              {limitedLines.slice(0, 10).map((line, idx) => {
                const parts = line.split(',');
                const val = parts[0].trim();
                const validation = validateBarcodeInput(format, val);

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white break-all">
                          {val}
                        </span>
                      </div>
                      {validation.isValid ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valid</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-semibold shrink-0">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Error</span>
                        </span>
                      )}
                    </div>
                    {parts[1] && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-7">
                        Label: {parts[1].trim()}
                      </p>
                    )}
                    {!validation.isValid && validation.error && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 pl-7 font-medium">
                        Reason: {validation.error}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View (hidden sm:block) */}
            <table className="hidden sm:table w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 sticky top-0">
                <tr>
                  <th className="p-3 w-12">#</th>
                  <th className="p-3">Value / Filename</th>
                  <th className="p-3 w-28">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {limitedLines.slice(0, 10).map((line, idx) => {
                  const parts = line.split(',');
                  const val = parts[0].trim();
                  const validation = validateBarcodeInput(format, val);

                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-3 text-slate-400">{idx + 1}</td>
                      <td className="p-3 text-slate-900 dark:text-white truncate max-w-[200px]" title={val}>
                        {val} {parts[1] ? `(${parts[1].trim()})` : ''}
                      </td>
                      <td className="p-3">
                        {validation.isValid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Valid</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-sans font-medium" title={validation.error}>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Error</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {lines.length > 10 && (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-1">
              And {lines.length - 10} more rows ready for batch generation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

