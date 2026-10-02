import React, { useState, useMemo, useRef } from 'react';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Square,
  Sliders,
  Upload,
  X,
  ArrowRightLeft,
  Sparkles,
} from 'lucide-react';
import {
  QRDesignState,
  QRBodyShape,
  QREyeOuterShape,
  QREyeInnerShape,
  QREccLevel,
} from '../../types/generator.types';
import { PRESET_ICONS } from '../../lib/qr/icons';
import { FRAMES } from '../../lib/qr/frames';
import { generateQRMatrix } from '../../lib/qr/matrix';
import { renderSvg } from '../../lib/qr/renderSvg';
import { createDefaultDesignState } from '../../lib/state/designStore';

interface DesignTabsProps {
  state: QRDesignState;
  onChange: (updates: Partial<QRDesignState>) => void;
}

export const DesignTabs: React.FC<DesignTabsProps> = ({ state, onChange }) => {
  const [activeTab, setActiveTab] = useState<'style' | 'colors' | 'logo' | 'frames' | 'export'>('style');

  // Frame text section ref for auto-scrolling
  const frameTextSectionRef = useRef<HTMLDivElement>(null);
  const frameTextInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFrame = (frameId: string, defaultText: string) => {
    onChange({
      frame: {
        ...state.frame,
        id: frameId,
        text: state.frame.text || defaultText,
      },
    });

    if (frameId !== 'none') {
      setTimeout(() => {
        frameTextSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        frameTextInputRef.current?.focus({ preventScroll: true });
      }, 120);
    }
  };

  // Pre-rendered visual thumbnails of all original frame templates
  const frameThumbnails = useMemo(() => {
    const svgs: Record<string, string> = {};
    const sampleMatrix = generateQRMatrix('https://qrhere.online', 'M');
    const base = createDefaultDesignState('url');
    const frameColor = state.frame.color || state.fg || '#2563eb';

    for (const f of FRAMES) {
      svgs[f.id] = renderSvg(sampleMatrix, {
        ...base,
        fg: state.fg || '#1e293b',
        bg: '#ffffff',
        frame: {
          id: f.id,
          text: f.defaultText || 'SCAN',
          color: frameColor,
          textColor: state.frame.textColor || '#ffffff',
        },
        size: 140,
        margin: 1,
      }).svgString;
    }
    return svgs;
  }, [state.frame.color, state.fg, state.frame.textColor]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          logo: {
            ...state.logo,
            src: event.target?.result as string,
            preset: null,
          },
          // Auto-raise ECC to Q or H when logo is added
          ecc: state.ecc === 'L' || state.ecc === 'M' ? 'Q' : state.ecc,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Select Preset Icon
  const handleSelectPresetIcon = (iconId: string) => {
    onChange({
      logo: {
        ...state.logo,
        preset: iconId,
        src: null,
      },
      ecc: state.ecc === 'L' || state.ecc === 'M' ? 'Q' : state.ecc,
    });
  };

  const handleRemoveLogo = () => {
    onChange({
      logo: {
        ...state.logo,
        src: null,
        preset: null,
      },
    });
  };

  // Swap Colors
  const handleSwapColors = () => {
    onChange({
      fg: state.bg,
      bg: state.fg,
      gradient: {
        ...state.gradient,
        on: false,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60">
        {/* Mobile View: Two lines (Line 1: Style & Shapes, Colors, Logo; Line 2: Frames, Options) */}
        <div className="sm:hidden flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
          {/* Line 1: Style & Shapes, Colors, Logo */}
          <div className="grid grid-cols-3 divide-x divide-slate-200/80 dark:divide-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('style')}
              className={`flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-bold transition text-center cursor-pointer min-h-[44px] ${
                activeTab === 'style'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shapes className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Style & Shapes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-bold transition text-center cursor-pointer min-h-[44px] ${
                activeTab === 'colors'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Colors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('logo')}
              className={`flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-bold transition text-center cursor-pointer min-h-[44px] ${
                activeTab === 'logo'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Logo</span>
              {(state.logo.src || state.logo.preset) && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              )}
            </button>
          </div>

          {/* Line 2: Frames, Options */}
          <div className="grid grid-cols-2 divide-x divide-slate-200/80 dark:divide-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('frames')}
              className={`flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-bold transition text-center cursor-pointer min-h-[44px] ${
                activeTab === 'frames'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Square className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Frames</span>
              {state.frame.id !== 'none' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className={`flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-bold transition text-center cursor-pointer min-h-[44px] ${
                activeTab === 'export'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Options</span>
            </button>
          </div>
        </div>

        {/* Desktop View: Single clean row */}
        <div className="hidden sm:flex items-center overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('style')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'style'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shapes className="w-4 h-4" />
            <span>Style & Shapes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'colors'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Colors</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logo')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'logo'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Logo & Watermark</span>
            {(state.logo.src || state.logo.preset) && (
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('frames')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'frames'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Square className="w-4 h-4" />
            <span>Frames</span>
            {state.frame.id !== 'none' && (
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'export'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Options</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-5 sm:p-6">
        {/* TAB 1: STYLE */}
        {activeTab === 'style' && (
          <div className="space-y-6">
            {/* Body Module Pattern */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Body Module Pattern
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {(
                  [
                    { id: 'square', label: 'Square' },
                    { id: 'dots', label: 'Dots' },
                    { id: 'rounded', label: 'Rounded' },
                    { id: 'extra-rounded', label: 'Pill Round' },
                    { id: 'classy', label: 'Classy' },
                    { id: 'diamond', label: 'Diamond' },
                    { id: 'vertical', label: 'Vertical' },
                    { id: 'horizontal', label: 'Horizontal' },
                    { id: 'small-squares', label: 'Compact' },
                  ] as { id: QRBodyShape; label: string }[]
                ).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onChange({ body: b.id })}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition cursor-pointer min-h-[58px] ${
                      state.body === b.id
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Eye Outer Frame */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Corner Finder Outer Border
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {(
                  [
                    { id: 'square', label: 'Square' },
                    { id: 'rounded', label: 'Rounded' },
                    { id: 'circle', label: 'Circle' },
                    { id: 'leaf', label: 'Leaf' },
                    { id: 'dotted', label: 'Dotted' },
                  ] as { id: QREyeOuterShape; label: string }[]
                ).map((eo) => (
                  <button
                    key={eo.id}
                    type="button"
                    onClick={() => onChange({ eyeOuter: eo.id })}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition cursor-pointer min-h-[54px] ${
                      state.eyeOuter === eo.id
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs">{eo.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Eye Inner Dot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Corner Center Dot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {(
                  [
                    { id: 'square', label: 'Square' },
                    { id: 'circle', label: 'Circle' },
                    { id: 'diamond', label: 'Diamond' },
                    { id: 'star', label: 'Star' },
                    { id: 'heart', label: 'Heart' },
                    { id: 'flower', label: 'Flower' },
                  ] as { id: QREyeInnerShape; label: string }[]
                ).map((ei) => (
                  <button
                    key={ei.id}
                    type="button"
                    onClick={() => onChange({ eyeInner: ei.id })}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition cursor-pointer min-h-[50px] ${
                      state.eyeInner === ei.id
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs">{ei.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COLORS */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Primary Palette
              </span>
              <button
                type="button"
                onClick={handleSwapColors}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap Colors</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Foreground Color */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Foreground (Dots)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={state.fg}
                    onChange={(e) => onChange({ fg: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    value={state.fg}
                    onChange={(e) => onChange({ fg: e.target.value })}
                    className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Background
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.transparent}
                      onChange={(e) => onChange({ transparent: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Transparent PNG</span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    disabled={state.transparent}
                    value={state.bg}
                    onChange={(e) => onChange({ bg: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 disabled:opacity-40"
                  />
                  <input
                    type="text"
                    disabled={state.transparent}
                    value={state.transparent ? 'transparent' : state.bg}
                    onChange={(e) => onChange({ bg: e.target.value })}
                    className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-mono disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            {/* Gradient Options */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={state.gradient.on}
                    onChange={(e) =>
                      onChange({
                        gradient: { ...state.gradient, on: e.target.checked },
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Apply Gradient to QR Modules</span>
                </label>
                {state.gradient.on && (
                  <select
                    value={state.gradient.kind}
                    onChange={(e) =>
                      onChange({
                        gradient: { ...state.gradient, kind: e.target.value as 'linear' | 'radial' },
                      })
                    }
                    className="text-xs rounded-lg border border-slate-200 dark:border-slate-800 px-2 py-1 bg-white dark:bg-slate-900"
                  >
                    <option value="linear">Linear Gradient</option>
                    <option value="radial">Radial Gradient</option>
                  </select>
                )}
              </div>

              {state.gradient.on && (
                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Color Start</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={state.gradient.from}
                          onChange={(e) =>
                            onChange({
                              gradient: { ...state.gradient, from: e.target.value },
                            })
                          }
                          className="w-8 h-8 rounded border cursor-pointer"
                        />
                        <span className="text-xs font-mono">{state.gradient.from}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Color End</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={state.gradient.to}
                          onChange={(e) =>
                            onChange({
                              gradient: { ...state.gradient, to: e.target.value },
                            })
                          }
                          className="w-8 h-8 rounded border cursor-pointer"
                        />
                        <span className="text-xs font-mono">{state.gradient.to}</span>
                      </div>
                    </div>
                  </div>

                  {state.gradient.kind === 'linear' && (
                    <div>
                      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                        <span>Angle: {state.gradient.angle}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="15"
                        value={state.gradient.angle}
                        onChange={(e) =>
                          onChange({
                            gradient: { ...state.gradient, angle: parseInt(e.target.value, 10) },
                          })
                        }
                        className="w-full accent-blue-600"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Custom Eye Colors */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={state.eyeColors.on}
                  onChange={(e) =>
                    onChange({
                      eyeColors: { ...state.eyeColors, on: e.target.checked },
                    })
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Customize Corner Marker Colors</span>
              </label>

              {state.eyeColors.on && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Outer Eye Frame</span>
                    <input
                      type="color"
                      value={state.eyeColors.outer}
                      onChange={(e) =>
                        onChange({
                          eyeColors: { ...state.eyeColors, outer: e.target.value },
                        })
                      }
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Inner Eye Center</span>
                    <input
                      type="color"
                      value={state.eyeColors.inner}
                      onChange={(e) =>
                        onChange({
                          eyeColors: { ...state.eyeColors, inner: e.target.value },
                        })
                      }
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LOGO */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            {/* Active Logo Status */}
            {(state.logo.src || state.logo.preset) ? (
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 flex items-center justify-center p-1 overflow-hidden">
                    {state.logo.src ? (
                      <img src={state.logo.src} alt="Custom logo" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-blue-600 uppercase">{state.logo.preset}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Center Watermark Active
                    </span>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400">
                      Error correction set to Level {state.ecc} for scanning safety
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  aria-label="Remove Logo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 text-center">
                <label className="cursor-pointer inline-flex flex-col items-center">
                  <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1.5" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Upload Your Brand Logo (PNG, SVG, JPG)
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Drag and drop or browse from your computer (Max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            )}

            {/* Preset Icon Library */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Or Pick a Preset Icon
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {PRESET_ICONS.map((p) => {
                  const isSelected = state.logo.preset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPresetIcon(p.id)}
                      className={`group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition cursor-pointer min-h-[64px] ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-bold ring-2 ring-blue-500/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900'
                      }`}
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={!isSelected && p.brandColor ? { color: p.brandColor } : undefined}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                          className={
                            p.isFilled
                              ? 'fill-current stroke-none w-5.5 h-5.5'
                              : 'stroke-current fill-none stroke-[1.8] w-5.5 h-5.5'
                          }
                          dangerouslySetInnerHTML={{ __html: p.svgPath }}
                        />
                      </div>
                      <span className="text-[10px] font-medium leading-tight truncate max-w-full text-center">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logo Settings */}
            {(state.logo.src || state.logo.preset) && (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>Logo Size: {state.logo.size}% of code area</span>
                    <span className="text-[11px] text-slate-400">Max safe: 25%</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="28"
                    value={state.logo.size}
                    onChange={(e) =>
                      onChange({
                        logo: { ...state.logo, size: parseInt(e.target.value, 10) },
                      })
                    }
                    className="w-full accent-blue-600"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={state.logo.knockout}
                      onChange={(e) =>
                        onChange({
                          logo: { ...state.logo, knockout: e.target.checked },
                        })
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Add White Knockout Padding</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Knockout Mask:</span>
                    <button
                      type="button"
                      onClick={() => onChange({ logo: { ...state.logo, mask: 'round' } })}
                      className={`px-2 py-1 rounded text-xs ${
                        state.logo.mask === 'round' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-700'
                      }`}
                    >
                      Round
                    </button>
                    <button
                      type="button"
                      onClick={() => onChange({ logo: { ...state.logo, mask: 'square' } })}
                      className={`px-2 py-1 rounded text-xs ${
                        state.logo.mask === 'square' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-700'
                      }`}
                    >
                      Square
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FRAMES */}
        {activeTab === 'frames' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Select Frame Template (14 Modern Styles)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FRAMES.map((f) => {
                  const isSelected = state.frame.id === f.id;
                  const frameSvg = frameThumbnails[f.id];

                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleSelectFrame(f.id, f.defaultText)}
                      className={`group flex flex-col items-center gap-2 p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/30 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900'
                      }`}
                    >
                      {/* Original Frame Visual Preview */}
                      <div className="w-full h-24 rounded-lg bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-1.5 overflow-hidden shadow-2xs transition-transform group-hover:scale-105">
                        {frameSvg ? (
                          <div
                            className="w-full h-full flex items-center justify-center pointer-events-none [&>svg]:w-auto [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:object-contain"
                            dangerouslySetInnerHTML={{ __html: frameSvg }}
                          />
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">No Frame</span>
                        )}
                      </div>

                      {/* Frame Label */}
                      <div className="w-full truncate">
                        <span className="text-xs font-semibold block truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {f.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                          {f.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {state.frame.id !== 'none' && (
              <div
                ref={frameTextSectionRef}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4 scroll-mt-6"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Frame Call-to-Action Text
                  </label>
                  <input
                    ref={frameTextInputRef}
                    type="text"
                    value={state.frame.text}
                    onChange={(e) =>
                      onChange({
                        frame: { ...state.frame, text: e.target.value },
                      })
                    }
                    placeholder="e.g. SCAN ME"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      'SCAN ME',
                      'Scan to Connect',
                      'Scan to Pay',
                      'Scan for Menu',
                      'Scan to Chat',
                      'Join Wi-Fi',
                      'Save Contact',
                      'Get Directions',
                    ].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => onChange({ frame: { ...state.frame, text: sug } })}
                        className="px-2 py-0.5 rounded-full text-[11px] bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 hover:text-blue-700"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Frame Color
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={state.frame.color}
                        onChange={(e) =>
                          onChange({
                            frame: { ...state.frame, color: e.target.value },
                          })
                        }
                        className="w-8 h-8 rounded border cursor-pointer"
                      />
                      <span className="text-xs font-mono">{state.frame.color}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Text Color
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={state.frame.textColor}
                        onChange={(e) =>
                          onChange({
                            frame: { ...state.frame, textColor: e.target.value },
                          })
                        }
                        className="w-8 h-8 rounded border cursor-pointer"
                      />
                      <span className="text-xs font-mono">{state.frame.textColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: EXPORT & ADVANCED */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            {/* Resolution Presets */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Output Resolution
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { size: 300, label: '300 px', desc: 'Screen' },
                  { size: 1024, label: '1024 px', desc: 'Web / Social' },
                  { size: 2048, label: '2048 px', desc: 'Print / Flyers' },
                  { size: 4096, label: '4096 px', desc: 'Billboard / HQ' },
                ].map((p) => (
                  <button
                    key={p.size}
                    type="button"
                    onClick={() => onChange({ size: p.size })}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      state.size === p.size
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-sm font-bold block">{p.label}</span>
                    <span className="text-[10px] text-slate-400">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Correction Level */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Reed-Solomon Error Correction
                </label>
                <span className="text-[11px] text-slate-400">
                  {state.ecc === 'L' && 'Level L: 7% recovery (simplest code)'}
                  {state.ecc === 'M' && 'Level M: 15% recovery (standard)'}
                  {state.ecc === 'Q' && 'Level Q: 25% recovery (recommended with logo)'}
                  {state.ecc === 'H' && 'Level H: 30% recovery (best for outdoor/print)'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { id: 'L', name: 'Low (7%)' },
                    { id: 'M', name: 'Medium (15%)' },
                    { id: 'Q', name: 'Quartile (25%)' },
                    { id: 'H', name: 'High (30%)' },
                  ] as { id: QREccLevel; name: string }[]
                ).map((ecc) => (
                  <button
                    key={ecc.id}
                    type="button"
                    onClick={() => onChange({ ecc: ecc.id })}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      state.ecc === ecc.id
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{ecc.id}</span>
                    <span className="text-[10px] text-slate-400">{ecc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiet Zone Margin */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                <span className="font-semibold">Quiet Zone (Margin): {state.margin} blocks</span>
                <span className="text-slate-400">Standard recommendation: 2–4</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                value={state.margin}
                onChange={(e) => onChange({ margin: parseInt(e.target.value, 10) })}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
