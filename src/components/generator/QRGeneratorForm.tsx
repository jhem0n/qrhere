import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Download,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  QrCode,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { DataType, QRAdvancedOptions, AllQRFormData } from '../../types/qr-advanced.types';
import { formatPayload } from '../../utils/qr/payload-formatters';
import { AdvancedQRRenderer, AdvancedGenerationResult } from '../../services/qr/advanced-renderer.service';
import { QRGeneratorService } from '../../services/qr/generator.service';
import { evaluateQRColorScannability } from '../../utils/qr/color-contrast';
import { isUrlSafe } from '../../utils/security/url';
import { DataTabs } from './tabs/DataTabs';
import { DataTypeInputs } from './tabs/DataTypeInputs';
import { ColorAccordion } from './accordions/ColorAccordion';
import { DesignAccordion } from './accordions/DesignAccordion';
import { LogoAccordion } from './accordions/LogoAccordion';
import { OptionsAccordion } from './accordions/OptionsAccordion';

export const QRGeneratorForm: React.FC = () => {
  // 1. Data Type Selector (14 types)
  const [activeType, setActiveType] = useState<DataType>('link');

  // 2. Data store for each data type
  const [formData, setFormData] = useState<AllQRFormData>({
    link: { url: 'https://example.com' },
    text: { text: '' },
    email: { to: '', subject: '', body: '' },
    location: { latitude: '', longitude: '', address: '' },
    phone: { phone: '' },
    sms: { phone: '', message: '' },
    whatsapp: { phone: '', message: '' },
    skype: { username: '', action: 'call' },
    zoom: { meetingId: '', password: '', joinUrl: '' },
    wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    vcard: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      jobTitle: '',
      address: '',
      website: '',
    },
    event: {
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    paypal: { type: 'me', account: '', amount: '' },
    bitcoin: { address: '', amount: '' },
  });

  // 3. Advanced styling & customizer options
  const [options, setOptions] = useState<QRAdvancedOptions>({
    bgColor: '#ffffff',
    fgColor: '#000000',
    isTransparentBg: false,
    isGradient: false,
    gradientColor2: '#2563eb',
    gradientType: 'linear',
    bgImageUrl: undefined,
    bgImageOpacity: 0.3,

    pattern: 'square',
    markerBorder: 'square',
    markerCenter: 'square',
    hasCustomMarkerColor: false,
    markerBorderColor: '#000000',
    markerCenterColor: '#000000',

    logoUrl: undefined,
    logoPreset: undefined,
    removeBgBehindLogo: true,
    logoSize: 20,

    size: 300,
    margin: 2,
    errorCorrection: 'M',
    frameStyle: 'none',
    frameLabel: 'SCAN ME',
    frameFont: 'Inter, sans-serif',
    frameLabelSize: 14,
    hasCustomFrameColor: false,
    frameColor: '#000000',
  });

  // 4. Accordion collapse states
  const [openAccordions, setOpenAccordions] = useState({
    colors: false,
    design: false,
    logo: false,
    options: false,
  });

  const toggleAccordion = (name: keyof typeof openAccordions) => {
    setOpenAccordions((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // 5. Validation and security feedback
  const [validationError, setValidationError] = useState<string | null>(null);
  const [urlSecurityWarning, setUrlSecurityWarning] = useState<{ reason?: string } | null>(null);

  // 6. Preview rendering outputs
  const [result, setResult] = useState<AdvancedGenerationResult>({
    dataUrl: '',
    svgString: '',
    mimeType: 'image/png',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  // Compute raw payload from active data type
  const rawPayload = useMemo(() => {
    return formatPayload(activeType, formData);
  }, [activeType, formData]);

  // Scannability contrast analysis
  const contrastAnalysis = useMemo(() => {
    const bg = options.isTransparentBg ? '#ffffff' : options.bgColor;
    return evaluateQRColorScannability(options.fgColor, bg);
  }, [options.fgColor, options.bgColor, options.isTransparentBg]);

  const hasLogo = Boolean(options.logoUrl || options.logoPreset);

  // Clear errors when the user edits or changes input
  const handleInputChange = () => {
    if (validationError || urlSecurityWarning) {
      setValidationError(null);
      setUrlSecurityWarning(null);
    }
  };

  // Core render dispatcher
  const renderCode = useCallback(
    async (payloadText: string, currentOptions: QRAdvancedOptions) => {
      if (!payloadText || !payloadText.trim()) {
        setResult({ dataUrl: '', svgString: '', mimeType: 'image/png' });
        return;
      }

      setIsGenerating(true);
      try {
        const res = await AdvancedQRRenderer.render(payloadText, currentOptions);
        setResult(res);
      } catch (err) {
        console.error('QR rendering error:', err);
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  // Live real-time update (debounced) whenever payload or styling options change
  useEffect(() => {
    // Only live-render if we have a non-empty payload
    if (!rawPayload.trim()) return;

    // In link mode, if it contains an unsafe scheme like javascript:, don't live-render
    if (activeType === 'link') {
      const check = isUrlSafe(rawPayload);
      if (!check.isSafe) {
        return;
      }
    }

    const timer = setTimeout(() => {
      renderCode(rawPayload, options);
    }, 180);

    return () => clearTimeout(timer);
  }, [rawPayload, options, activeType, renderCode]);

  // Handle Explicit "Generate QR Code" click with full validation
  const handleManualGenerate = async () => {
    const trimmed = rawPayload.trim();

    if (!trimmed) {
      setResult({ dataUrl: '', svgString: '', mimeType: 'image/png' });
      setUrlSecurityWarning(null);
      setValidationError(
        activeType === 'link'
          ? 'URL is required. Please enter a valid website URL.'
          : 'Please enter valid information to generate a QR code.'
      );
      return;
    }

    // Security check for link mode
    if (activeType === 'link') {
      const safety = isUrlSafe(trimmed);
      if (!safety.isSafe) {
        setResult({ dataUrl: '', svgString: '', mimeType: 'image/png' });
        setUrlSecurityWarning({ reason: safety.reason });
        setValidationError(safety.reason || 'Cannot encode dangerous or untrusted URL scheme.');
        return;
      }
    }

    // Input is valid: clear any prior errors and render immediately
    setUrlSecurityWarning(null);
    setValidationError(null);
    await renderCode(trimmed, options);
  };

  // Handle "Copy Source Text"
  const handleCopySourceText = async () => {
    if (!rawPayload.trim()) return;
    const ok = await QRGeneratorService.copyText(rawPayload);
    if (ok) {
      setCopiedSource(true);
      setTimeout(() => setCopiedSource(false), 2000);
    }
  };

  // Handle PNG Download
  const handleDownloadPNG = () => {
    if (!result.dataUrl) return;
    QRGeneratorService.downloadPNG(result.dataUrl, `qr-${activeType}-${Date.now()}.png`);
  };

  // Handle SVG Download
  const handleDownloadSVG = () => {
    if (!result.svgString) return;
    QRGeneratorService.downloadSVG(result.svgString, `qr-${activeType}-${Date.now()}.svg`);
  };

  // Handle Copy Image
  const handleCopyImage = async () => {
    if (!result.dataUrl) return;
    const ok = await QRGeneratorService.copyImage(result.dataUrl);
    if (ok) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    }
  };

  return (
    <div
      id="qr-generator-container"
      className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
    >
      {/* LEFT COLUMN: Data Tabs, Dynamic Inputs & Accordions (7 cols) */}
      <div className="lg:col-span-7 space-y-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
        {/* 1. Data Type Tabs */}
        <div>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Select Data Type
          </span>
          <DataTabs
            activeType={activeType}
            onSelectType={(newType) => {
              setActiveType(newType);
              handleInputChange();
            }}
          />
        </div>

        {/* 2. Dynamic Input Fields for Active Data Type */}
        <div className="pt-2">
          <DataTypeInputs
            activeType={activeType}
            data={formData}
            onChange={setFormData}
            onInputChange={handleInputChange}
          />
        </div>

        {/* Security / Validation Feedback (only triggered on manual generate) */}
        {urlSecurityWarning && (
          <div
            id="url-security-warning"
            className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200"
          >
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-semibold">Untrusted URL Scheme:</p>
              <p className="text-rose-600 dark:text-rose-400 mt-0.5">{urlSecurityWarning.reason}</p>
            </div>
          </div>
        )}

        {validationError && !urlSecurityWarning && (
          <div
            id="validation-error-msg"
            className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Buttons: Generate QR Code & Copy Source Text */}
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
            disabled={!rawPayload.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
            title="Copy formatted source payload to clipboard"
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

        {/* 3. Four Collapsible Accordions replacing old "Customize" */}
        <div className="pt-3 space-y-3">
          {/* Accordion A: Colors */}
          <ColorAccordion
            isOpen={openAccordions.colors}
            onToggle={() => toggleAccordion('colors')}
            options={options}
            onChange={setOptions}
          />

          {/* Accordion B: Design */}
          <DesignAccordion
            isOpen={openAccordions.design}
            onToggle={() => toggleAccordion('design')}
            options={options}
            onChange={setOptions}
          />

          {/* Accordion C: Logo */}
          <LogoAccordion
            isOpen={openAccordions.logo}
            onToggle={() => toggleAccordion('logo')}
            options={options}
            onChange={setOptions}
          />

          {/* Accordion D: Options (Resolution, Margins, Error Correction, Frames) */}
          <OptionsAccordion
            isOpen={openAccordions.options}
            onToggle={() => toggleAccordion('options')}
            options={options}
            onChange={setOptions}
            hasLogo={hasLogo}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Live QR Preview Panel (COMPLETELY UNTOUCHED LAYOUT & ID) */}
      <div
        id="qr-preview-panel"
        className="w-full lg:w-[360px] xl:w-[400px] shrink-0 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm flex flex-col items-center sticky top-24 self-start"
      >
        {/* Header with Title & Level */}
        <div className="w-full flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Live QR Preview</span>
          </h3>

          {result.dataUrl && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
              {options.size}×{options.size}px • Level {hasLogo ? 'H' : options.errorCorrection}
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
                Enter content to render live preview
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
              disabled={!rawPayload.trim()}
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
