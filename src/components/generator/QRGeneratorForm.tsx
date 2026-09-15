import React, { useState, useEffect, useId, useCallback } from 'react';
import {
  Globe,
  FileText,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  AlertTriangle,
  Sparkles,
  QrCode,
  ArrowRightLeft,
  ShieldCheck,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { QRErrorCorrectionLevel, QRGenerationOptions } from '../../types/qr.types';
import { QRGeneratorService, GenerationResult } from '../../services/qr/generator.service';
import { evaluateQRColorScannability } from '../../utils/qr/color-contrast';
import { isUrlSafe } from '../../utils/security/url';
import { APP_CONFIG } from '../../config/app.config';

type Mode = 'url' | 'text';

// Quick color presets with guaranteed high contrast
const COLOR_PRESETS = [
  { name: 'Classic Black', fg: '#000000', bg: '#ffffff' },
  { name: 'Midnight Navy', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Deep Royal', fg: '#1e3a8a', bg: '#f8fafc' },
  { name: 'Forest Emerald', fg: '#064e3b', bg: '#f0fdf4' },
  { name: 'Warm Charcoal', fg: '#1c1917', bg: '#fafaf9' },
];

export const QRGeneratorForm: React.FC = () => {
  // Mode selection: URL or Plain Text first
  const [activeMode, setActiveMode] = useState<Mode>('url');

  // Input states - Link input starts empty with placeholder
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [urlSecurityWarning, setUrlSecurityWarning] = useState<{ reason?: string } | null>(null);

  // Submitted & validated payload currently displayed in preview
  const [generatedPayload, setGeneratedPayload] = useState<string | null>(null);

  // Customization states
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [size, setSize] = useState<number>(APP_CONFIG.limits.defaultSize);
  const [margin, setMargin] = useState<number>(3);
  const [errorCorrection, setErrorCorrection] = useState<QRErrorCorrectionLevel>('M');
  const [fgColor, setFgColor] = useState<string>('#0f172a'); // slate-900
  const [bgColor, setBgColor] = useState<string>('#ffffff'); // pure white

  // Output states
  const [result, setResult] = useState<GenerationResult>({ dataUrl: '', svgString: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  const urlInputId = useId();
  const textInputId = useId();
  const sizeInputId = useId();
  const marginInputId = useId();

  // Evaluate WCAG contrast safety in real-time
  const contrastAnalysis = evaluateQRColorScannability(fgColor, bgColor);

  // Compute active untrusted raw source payload
  const currentSourceText = activeMode === 'url' ? urlInput : textInput;
  const rawPayload = currentSourceText.trim();

  // Core QR generation service call
  const generateQRCode = useCallback(
    async (textToEncode: string) => {
      const hexPattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
      const safeFg = hexPattern.test(fgColor) ? fgColor : '#0f172a';
      const safeBg = hexPattern.test(bgColor) ? bgColor : '#ffffff';

      setIsGenerating(true);
      try {
        const options: QRGenerationOptions = {
          text: textToEncode,
          size,
          margin,
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: safeFg,
            light: safeBg,
          },
        };

        const res = await QRGeneratorService.generateQR(options);
        setResult(res);
      } catch (err) {
        setValidationError(err instanceof Error ? err.message : 'Generation failed.');
      } finally {
        setIsGenerating(false);
      }
    },
    [size, margin, errorCorrection, fgColor, bgColor]
  );

  // When styling options change, update already generated QR code without re-validating inputs
  useEffect(() => {
    if (!generatedPayload) return;

    let isMounted = true;
    const hexPattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    const safeFg = hexPattern.test(fgColor) ? fgColor : '#0f172a';
    const safeBg = hexPattern.test(bgColor) ? bgColor : '#ffffff';

    const options: QRGenerationOptions = {
      text: generatedPayload,
      size,
      margin,
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: safeFg,
        light: safeBg,
      },
    };

    QRGeneratorService.generateQR(options)
      .then((res) => {
        if (isMounted) {
          setResult(res);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setValidationError(err instanceof Error ? err.message : 'Generation failed.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [generatedPayload, size, margin, errorCorrection, fgColor, bgColor]);

  // Handle Explicit "Generate QR Code" action
  // Complete validation is performed HERE, never on individual keystrokes
  const handleManualGenerate = async () => {
    const textToEncode = (activeMode === 'url' ? urlInput : textInput).trim();

    if (!textToEncode) {
      setResult({ dataUrl: '', svgString: '' });
      setGeneratedPayload(null);
      setUrlSecurityWarning(null);
      setValidationError(
        activeMode === 'url'
          ? 'URL is required. Please enter a valid website URL.'
          : 'Please enter text content to generate a QR code.'
      );
      return;
    }

    // Security check: In URL mode, validate scheme and URL safety
    if (activeMode === 'url') {
      const safety = isUrlSafe(textToEncode);
      if (!safety.isSafe) {
        setResult({ dataUrl: '', svgString: '' });
        setGeneratedPayload(null);
        setUrlSecurityWarning({ reason: safety.reason });
        setValidationError(safety.reason || 'Cannot encode dangerous or untrusted URL scheme.');
        return;
      }
    }

    // Input is valid and safe: clear errors and generate
    setUrlSecurityWarning(null);
    setValidationError(null);
    setGeneratedPayload(textToEncode);

    await generateQRCode(textToEncode);
  };

  // Handle "Clear" button click
  const handleClear = () => {
    if (activeMode === 'url') {
      setUrlInput('');
    } else {
      setTextInput('');
    }
    setValidationError(null);
    setUrlSecurityWarning(null);
    setGeneratedPayload(null);
    setResult({ dataUrl: '', svgString: '' });
  };

  // Handle "Copy Source Text" button click
  const handleCopySourceText = async () => {
    if (!currentSourceText) return;
    const ok = await QRGeneratorService.copyText(currentSourceText);
    if (ok) {
      setCopiedSource(true);
      setTimeout(() => setCopiedSource(false), 2000);
    }
  };

  // Handle PNG Download
  const handleDownloadPNG = () => {
    if (!result.dataUrl) return;
    const prefix = activeMode === 'url' ? 'qr-url' : 'qr-text';
    QRGeneratorService.downloadPNG(result.dataUrl, `${prefix}-${Date.now()}.png`);
  };

  // Handle SVG Download (Vector)
  const handleDownloadSVG = () => {
    if (!result.svgString) return;
    const prefix = activeMode === 'url' ? 'qr-url' : 'qr-text';
    QRGeneratorService.downloadSVG(result.svgString, `${prefix}-${Date.now()}.svg`);
  };

  // Handle Copy QR Image (PNG Blob)
  const handleCopyImage = async () => {
    if (!result.dataUrl) return;
    const ok = await QRGeneratorService.copyImage(result.dataUrl);
    if (ok) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    }
  };

  // Swap Foreground and Background colors
  const handleInvertColors = () => {
    const tempFg = fgColor;
    setFgColor(bgColor);
    setBgColor(tempFg);
  };

  return (
    <div
      id="qr-generator-container"
      className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
    >
      {/* LEFT COLUMN: Input Form, Presets & Controls (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
        {/* Mode Selector: URL and Plain-Text First */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="mode-url-btn"
              onClick={() => {
                setActiveMode('url');
                setValidationError(null);
                setUrlSecurityWarning(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                activeMode === 'url'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              aria-selected={activeMode === 'url'}
            >
              <Globe className="w-4 h-4" />
              <span>Website URL</span>
            </button>

            <button
              type="button"
              id="mode-text-btn"
              onClick={() => {
                setActiveMode('text');
                setValidationError(null);
                setUrlSecurityWarning(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                activeMode === 'text'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              aria-selected={activeMode === 'text'}
            >
              <FileText className="w-4 h-4" />
              <span>Plain Text</span>
            </button>
          </div>

          {/* Quick Clear Button */}
          <button
            type="button"
            id="clear-btn"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer min-h-[36px]"
            title="Clear current input"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* Input Controls */}
        <div className="mt-5 space-y-4">
          {activeMode === 'url' ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={urlInputId}
                  className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider"
                >
                  Target Website URL <span className="text-rose-500">*</span>
                </label>
                {urlInput.length > 0 && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    {urlInput.length} chars
                  </span>
                )}
              </div>

              <input
                id={urlInputId}
                type="url"
                maxLength={APP_CONFIG.limits.maxQrTextInputLength}
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (validationError) setValidationError(null);
                  if (urlSecurityWarning) setUrlSecurityWarning(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleManualGenerate();
                  }
                }}
                placeholder="https://example.com"
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Tip: Always include http:// or https:// for instant mobile opening.</span>
              </p>

              {/* URL Protocol Safety Warning - rendered ONLY when validation triggers upon clicking Generate QR Code */}
              {urlSecurityWarning && (
                <div
                  role="alert"
                  className="mt-2.5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Untrusted URL Scheme:</strong>
                    {urlSecurityWarning.reason ? ` ${urlSecurityWarning.reason}` : ''}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={textInputId}
                  className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider"
                >
                  Text Content <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {textInput.length} / {APP_CONFIG.limits.maxQrTextInputLength}
                </span>
              </div>

              <textarea
                id={textInputId}
                rows={5}
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  if (validationError) setValidationError(null);
                  if (urlSecurityWarning) setUrlSecurityWarning(null);
                }}
                placeholder="Type or paste any plain text, notes, Wi-Fi details, or Unicode characters here..."
                maxLength={APP_CONFIG.limits.maxQrTextInputLength}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Full Unicode, emoji, and special character support.
              </p>
            </div>
          )}

          {/* Validation Error Message */}
          {validationError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
            >
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Core Action Buttons: Generate & Copy Source Text */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="generate-qr-btn"
              onClick={handleManualGenerate}
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate QR Code</span>
            </button>

            <button
              type="button"
              id="copy-source-text-btn"
              onClick={handleCopySourceText}
              disabled={!currentSourceText.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
              title="Copy the source text or URL to clipboard"
            >
              {copiedSource ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 dark:text-emerald-400">Source Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Source Text</span>
                </>
              )}
            </button>
          </div>

          {/* Toggle Advanced Styling & Customization */}
          <div className="pt-2">
            <button
              type="button"
              id="toggle-customizer-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Customize Size, Margin, Colors & Error Correction</span>
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-xs">
                {showAdvanced ? 'Collapse' : 'Expand'}
              </span>
            </button>
          </div>

          {/* ADVANCED CUSTOMIZER PANEL */}
          {showAdvanced && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 p-4 sm:p-5 space-y-5 animate-in fade-in duration-150">
              {/* Size & Margin Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Size / Resolution */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <label htmlFor={sizeInputId}>Output Resolution</label>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{size} × {size} px</span>
                  </div>
                  <input
                    id={sizeInputId}
                    type="range"
                    min={APP_CONFIG.limits.minSize}
                    max={APP_CONFIG.limits.maxSize}
                    step={32}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>128px (Web)</span>
                    <span>300px (Default)</span>
                    <span>1024px (Print)</span>
                  </div>
                </div>

                {/* Margin (Quiet Zone) */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <label htmlFor={marginInputId}>Quiet Zone (Margin)</label>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{margin} blocks</span>
                  </div>
                  <input
                    id={marginInputId}
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0 (Tight)</span>
                    <span>3-4 (Recommended)</span>
                    <span>8 (Spacious)</span>
                  </div>
                </div>
              </div>

              {/* Error Correction Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Reed-Solomon Error Correction Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { level: 'L', label: 'Low (7%)', desc: 'Dense data' },
                    { level: 'M', label: 'Medium (15%)', desc: 'Standard' },
                    { level: 'Q', label: 'Quartile (25%)', desc: 'Damaged codes' },
                    { level: 'H', label: 'High (30%)', desc: 'Outdoor / Print' },
                  ].map((ec) => (
                    <button
                      key={ec.level}
                      type="button"
                      onClick={() => setErrorCorrection(ec.level as QRErrorCorrectionLevel)}
                      className={`p-2.5 text-left rounded-xl border text-xs transition cursor-pointer min-h-[44px] ${
                        errorCorrection === ec.level
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 ring-1 ring-blue-600'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold">{ec.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{ec.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Customization & Swatches */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Colors & Palette
                  </span>
                  <button
                    type="button"
                    onClick={handleInvertColors}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>Invert Colors</span>
                  </button>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Foreground */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Foreground (Pattern)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-12 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-28 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Background */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Background (Canvas)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-12 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-28 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Preset Palette Buttons */}
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                    High Contrast Presets:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => {
                          setFgColor(p.fg);
                          setBgColor(p.bg);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-slate-300"
                          style={{ backgroundColor: p.fg }}
                        />
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* WCAG Contrast Ratio & Scannability Assessment */}
                <div
                  role="status"
                  className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs transition ${
                    contrastAnalysis.isScannable
                      ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-200'
                      : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200'
                  }`}
                >
                  {contrastAnalysis.isScannable ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold flex items-center gap-2">
                      <span>WCAG Contrast Ratio: {contrastAnalysis.formattedRatio}</span>
                      <span className="text-[11px] font-normal px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-900/50">
                        {contrastAnalysis.isOptimal
                          ? 'Optimal (≥ 7:1)'
                          : contrastAnalysis.isScannable
                          ? 'Acceptable (≥ 4:1)'
                          : 'Low Contrast (< 4:1)'}
                      </span>
                    </div>
                    {contrastAnalysis.warning ? (
                      <p className="mt-1 leading-relaxed">{contrastAnalysis.warning}</p>
                    ) : (
                      <p className="mt-0.5 text-[11px] opacity-90">
                        High color contrast ensures fast, reliable scanning across all optical sensors and ambient lighting conditions.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Live Preview, Scannability Badge & Downloads (5 cols) */}
      <div className="lg:col-span-5 flex flex-col items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs lg:sticky lg:top-24">
        <div className="w-full flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Live QR Preview</span>
          </h3>

          {result.dataUrl && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
              {size}×{size}px • Level {errorCorrection}
            </span>
          )}
        </div>

        {/* QR Canvas / Image Preview Container */}
        <div className="w-full max-w-[280px] aspect-square flex items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 relative shadow-inner">
          {result.dataUrl ? (
            <img
              src={result.dataUrl}
              alt="Generated QR code preview"
              className="w-full h-full object-contain rounded-lg transition-transform duration-150"
            />
          ) : (
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2.5 text-slate-400">
                <QrCode className="w-6 h-6 opacity-60" />
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Enter a URL or text to render live preview
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs flex items-center justify-center rounded-2xl">
              <span className="text-xs font-semibold text-blue-600 animate-pulse">
                Rendering...
              </span>
            </div>
          )}
        </div>

        {/* Scannability Rating Meter */}
        {result.dataUrl && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                contrastAnalysis.isScannable ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Scannability:{' '}
              {contrastAnalysis.isOptimal
                ? 'Optimal'
                : contrastAnalysis.isScannable
                ? 'Good'
                : 'Poor (Low Contrast)'}{' '}
              ({contrastAnalysis.formattedRatio})
            </span>
          </div>
        )}

        {/* Action Buttons: Downloads & Copy */}
        <div className="w-full mt-6 space-y-2.5">
          {/* Downloads: PNG and SVG */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              id="download-png-btn"
              onClick={handleDownloadPNG}
              disabled={!result.dataUrl}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              id="download-svg-btn"
              onClick={handleDownloadSVG}
              disabled={!result.svgString}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
              title="Download infinite-scale vector SVG for printing"
            >
              <Download className="w-4 h-4" />
              <span>Download SVG</span>
            </button>
          </div>

          {/* Quick Copy Image & Text Controls */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              id="copy-image-btn"
              onClick={handleCopyImage}
              disabled={!result.dataUrl}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition disabled:opacity-40 cursor-pointer min-h-[44px]"
            >
              {copiedImage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Image Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Image</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="copy-text-btn"
              onClick={handleCopySourceText}
              disabled={!rawPayload}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition disabled:opacity-40 cursor-pointer min-h-[44px]"
            >
              {copiedSource ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Text Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security & Client-Side Privacy Badge */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>100% Client-Side • Never sent to any server</span>
        </div>
      </div>
    </div>
  );
};
