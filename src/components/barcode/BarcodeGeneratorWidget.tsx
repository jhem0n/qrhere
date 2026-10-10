import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Copy,
  Printer,
  RotateCcw,
  Check,
  AlertTriangle,
  Shuffle,
  Camera,
  Sliders,
  FileCode,
} from 'lucide-react';
import {
  BarcodeGeneratorService,
  BarcodeFormatKey,
  BARCODE_FORMAT_MAP,
  validateBarcodeInput,
} from '../../services/qr/barcodeGenerator.service';
import { evaluateQRColorScannability } from '../../utils/qr/color-contrast';

interface BarcodeGeneratorWidgetProps {
  initialFormat?: BarcodeFormatKey;
}

export const BarcodeGeneratorWidget: React.FC<BarcodeGeneratorWidgetProps> = ({
  initialFormat = 'CODE_128',
}) => {
  const [format, setFormat] = useState<BarcodeFormatKey>(initialFormat);
  const [text, setText] = useState<string>(BARCODE_FORMAT_MAP[initialFormat]?.defaultSample || 'QR-HERE-12345');
  const [barWidth, setBarWidth] = useState<number>(3); // scale 3 default
  const [barHeight, setBarHeight] = useState<number>(15); // height 15 mm default (range 8-40)
  const [margin, setMargin] = useState<number>(10);
  const [barColor, setBarColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [showText, setShowText] = useState<boolean>(true);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [svgString, setSvgString] = useState<string>('');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [copiedImage, setCopiedImage] = useState<boolean>(false);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Update text sample when format changes to ensure valid input for each barcode type
  useEffect(() => {
    const info = BARCODE_FORMAT_MAP[format];
    if (info) {
      setText(info.defaultSample);
    }
  }, [format]);

  // Debounced async generation using bwip-js with correct proportions
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(async () => {
      const validation = validateBarcodeInput(format, text);
      if (!validation.isValid) {
        if (!isMounted) return;
        setError(validation.error || 'Invalid input.');
        setSvgString('');
        setDataUrl('');
        setWarning('');
        setSuggestion('');
        return;
      }

      if (!isMounted) return;
      setError('');
      setSuggestion(validation.suggestion || '');

      const result = await BarcodeGeneratorService.generateBarcode({
        text,
        format,
        barWidth,
        barHeight,
        margin,
        barColor,
        backgroundColor: bgColor,
        showText,
      });

      if (!isMounted) return;
      if (result.error) {
        setError(result.error);
        setSvgString('');
        setDataUrl('');
      } else {
        setSvgString(result.svgString);
        setDataUrl(result.dataUrl);
        setWarning(result.warning || '');
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [text, format, barWidth, barHeight, margin, barColor, bgColor, showText]);

  // Contrast analysis
  const contrast = evaluateQRColorScannability(barColor, bgColor);

  const handleRandomize = () => {
    const info = BARCODE_FORMAT_MAP[format];
    if (!info) return;
    let sample = info.defaultSample;
    if (format === 'EAN_13') {
      const rand12 = Math.floor(100000000000 + Math.random() * 900000000000).toString();
      sample = rand12;
    } else if (format === 'UPC_A') {
      const rand11 = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      sample = rand11;
    } else if (format === 'CODE_39') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.$/+%';
      let res = '';
      for (let i = 0; i < 8; i++) res += chars[Math.floor(Math.random() * chars.length)];
      sample = res;
    } else {
      sample = 'CODE-' + Math.floor(1000 + Math.random() * 9000);
    }
    setText(sample);
  };

  const handleDownloadPNG = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `barcode_${format.toLowerCase()}_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleDownloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `barcode_${format.toLowerCase()}_${Date.now()}.svg`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleCopyImage = async () => {
    if (!dataUrl) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      if (blob && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    const info = BARCODE_FORMAT_MAP[format];
    setText(info ? info.defaultSample : '123456');
    setBarWidth(3);
    setBarHeight(15);
    setMargin(10);
    setBarColor('#000000');
    setBgColor('#ffffff');
    setShowText(true);
  };

  const formatInfo = BARCODE_FORMAT_MAP[format];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs & Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Format Selector */}
          <div>
            <label htmlFor="barcode-format-select" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Barcode Type (Symbology)
            </label>
            <select
              id="barcode-format-select"
              value={format}
              onChange={(e) => setFormat(e.target.value as BarcodeFormatKey)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(BARCODE_FORMAT_MAP).map((item) => (
                <option key={item.key} value={item.key}>
                  {item.name} — {item.description}
                </option>
              ))}
            </select>
            {formatInfo && (
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                {formatInfo.validationHint}
              </p>
            )}
          </div>

          {/* Input Field & Random Button */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="barcode-input-text" className="text-sm font-bold text-slate-900 dark:text-white">
                Barcode Content / Value
              </label>
              <button
                type="button"
                onClick={handleRandomize}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random Sample</span>
              </button>
            </div>
            <div className="relative">
              <input
                id="barcode-input-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type text or numbers..."
                className={`w-full px-4 py-3.5 rounded-xl border text-slate-900 dark:text-white bg-white dark:bg-slate-800 text-base font-mono focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
            </div>

            {/* Error / Warning / Suggestion Messages */}
            {error && (
              <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-1.5" role="alert">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </p>
            )}
            {warning && !error && (
              <p className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5" role="alert">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{warning}</span>
              </p>
            )}
            {suggestion && !error && !warning && (
              <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5" role="status">
                <Check className="w-4 h-4 shrink-0" />
                <span>{suggestion}</span>
              </p>
            )}
          </div>

          {/* Advanced Customization Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>{showAdvanced ? 'Hide Advanced Design Options' : 'Show Advanced Design Options (Bar Height, Scale, Colors)'}</span>
            </button>
          </div>

          {/* Advanced Controls Panel */}
          {showAdvanced && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/55 border border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Scale */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Scale ({barWidth}x)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={barWidth}
                    onChange={(e) => setBarWidth(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Bar Height (mm for 1D) */}
                {formatInfo?.is1D && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Bar Height ({barHeight} mm)
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="40"
                      step="1"
                      value={barHeight}
                      onChange={(e) => setBarHeight(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Margin */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Quiet Zone Margin ({margin})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Show Human Readable Text (1D only) */}
                {formatInfo?.is1D && (
                  <div className="flex items-center pt-6">
                    <label className="relative flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={showText}
                        onChange={(e) => setShowText(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                      />
                      <span>Show text under barcode</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                {/* Bar Color */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Bar Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={barColor}
                      onChange={(e) => setBarColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={barColor}
                      onChange={(e) => setBarColor(e.target.value)}
                      className="w-24 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-24 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Contrast warning */}
              {contrast.warning && (
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {contrast.warning} (Contrast ratio: {contrast.formattedRatio})
                </p>
              )}
            </div>
          )}

          {/* Reset Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview & Action Buttons */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            ref={previewContainerRef}
            className="w-full aspect-4/3 sm:aspect-square max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-6 flex flex-col items-center justify-center relative shadow-xs overflow-hidden"
          >
            {svgString && !error ? (
              <div
                className="w-full h-full flex items-center justify-center max-h-[300px]"
                dangerouslySetInnerHTML={{ __html: svgString }}
              />
            ) : (
              <div className="text-center p-6">
                <FileCode className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {error ? 'Unable to generate barcode' : 'Enter valid text to preview'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                  {error || 'Your barcode updates instantly as you type.'}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons Grid */}
          <div className="w-full max-w-md mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              disabled={!svgString || !!error}
              onClick={handleDownloadPNG}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download className="w-4 h-4 mb-1" />
              <span>PNG Image</span>
            </button>

            <button
              type="button"
              disabled={!svgString || !!error}
              onClick={handleDownloadSVG}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileCode className="w-4 h-4 mb-1" />
              <span>Vector SVG</span>
            </button>

            <button
              type="button"
              disabled={!dataUrl || !!error}
              onClick={handleCopyImage}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {copiedImage ? <Check className="w-4 h-4 mb-1 text-emerald-600" /> : <Copy className="w-4 h-4 mb-1" />}
              <span>{copiedImage ? 'Copied!' : 'Copy Image'}</span>
            </button>

            <button
              type="button"
              disabled={!svgString || !!error}
              onClick={handlePrint}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Printer className="w-4 h-4 mb-1" />
              <span>Print Barcode</span>
            </button>
          </div>

          {/* Test Scanner Link */}
          <div className="w-full max-w-md mt-4 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Want to test it?</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Scan this barcode with our online scanner.</p>
              </div>
            </div>
            <Link
              to="/barcode-scanner"
              className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition shadow-xs shrink-0"
            >
              Test Scanner →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
