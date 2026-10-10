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

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Format Selector */}
          <div>
            <label htmlFor="bulk-format-select" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Barcode Type for Batch
            </label>
            <select
              id="bulk-format-select"
              value={format}
              onChange={(e) => setFormat(e.target.value as BarcodeFormatKey)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(BARCODE_FORMAT_MAP).map((item) => (
                <option key={item.key} value={item.key}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Textarea & CSV Upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="bulk-textarea" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Values List (One per line, max 100)</span>
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload CSV / TXT</span>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              id="bulk-textarea"
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Enter one value per line&#10;Optional: VALUE, custom_filename"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Rows detected: {lines.length} {lines.length > 100 ? '(Showing first 100)' : ''}</span>
              <button
                type="button"
                onClick={() => setRawText('')}
                className="hover:text-red-500 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Output File Format */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Output Image Format
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="radio"
                  name="bulkFileType"
                  value="png"
                  checked={fileType === 'png'}
                  onChange={() => setFileType('png')}
                  className="accent-blue-600"
                />
                <span>PNG Archive (.zip)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="radio"
                  name="bulkFileType"
                  value="svg"
                  checked={fileType === 'svg'}
                  onChange={() => setFileType('svg')}
                  className="accent-blue-600"
                />
                <span>Vector SVG Archive (.zip)</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            disabled={isGenerating || limitedLines.length === 0}
            onClick={handleGenerateZip}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-500 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>{isGenerating ? 'Generating ZIP...' : `Download ${limitedLines.length} Barcodes (ZIP)`}</span>
          </button>

          {statusMessage && (
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
              {statusMessage}
            </p>
          )}
        </div>

        {/* Right Column: Live Validation Table Preview */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Live Validation Preview (First 10 rows)</span>
          </h3>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden max-h-[400px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Value / Filename</th>
                  <th className="p-3">Status</th>
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
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              And {lines.length - 10} more rows ready for batch generation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
