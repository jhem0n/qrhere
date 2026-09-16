import React from 'react';
import { Sliders, ChevronDown, Smartphone, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { QRAdvancedOptions, FrameStyle } from '../../../types/qr-advanced.types';
import { QRErrorCorrectionLevel } from '../../../types/qr.types';

interface OptionsAccordionProps {
  isOpen: boolean;
  onToggle: () => void;
  options: QRAdvancedOptions;
  onChange: (updater: (prev: QRAdvancedOptions) => QRAdvancedOptions) => void;
  hasLogo: boolean;
}

const FRAME_STYLES: { id: FrameStyle; label: string; icon?: React.ComponentType<{ className?: string }> }[] = [
  { id: 'none', label: 'No Frame' },
  { id: 'bottom-banner', label: 'Bottom Banner' },
  { id: 'top-banner', label: 'Top Banner' },
  { id: 'phone-badge', label: 'Phone Badge', icon: Smartphone },
  { id: 'circular-badge', label: 'Pill Frame' },
];

const FONTS = [
  { id: 'Inter, sans-serif', label: 'Modern (Inter)' },
  { id: 'Arial, sans-serif', label: 'Standard (Arial)' },
  { id: 'Impact, fantasy', label: 'Bold Display (Impact)' },
  { id: 'Courier New, monospace', label: 'Monospace (Courier)' },
  { id: 'Georgia, serif', label: 'Serif (Georgia)' },
  { id: 'Montserrat, sans-serif', label: 'Geometric (Montserrat)' },
  { id: 'Roboto, sans-serif', label: 'Clean (Roboto)' },
];

const ERROR_CORRECTION_LEVELS: {
  level: QRErrorCorrectionLevel;
  label: string;
  desc: string;
}[] = [
  { level: 'L', label: 'Low (L)', desc: '~7% recovery' },
  { level: 'M', label: 'Medium (M)', desc: '~15% recovery' },
  { level: 'Q', label: 'Quartile (Q)', desc: '~25% recovery' },
  { level: 'H', label: 'High (H)', desc: '~30% recovery' },
];

export const OptionsAccordion: React.FC<OptionsAccordionProps> = ({
  isOpen,
  onToggle,
  options,
  onChange,
  hasLogo,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      <button
        type="button"
        id="accordion-toggle-options"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50/70 dark:bg-slate-950/40 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition cursor-pointer min-h-[44px]"
      >
        <span className="flex items-center gap-2.5">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Frames & Advanced Options</span>
        </span>
        <span className="text-blue-600 dark:text-blue-400 text-xs font-medium flex items-center gap-1">
          {isOpen ? 'Collapse' : 'Expand'}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 space-y-6 border-t border-slate-100 dark:border-slate-800/80">
          {/* 1. Frame Style Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Frame & Device Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {FRAME_STYLES.map((f) => {
                const isSelected = options.frameStyle === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-label={`Select frame ${f.label}`}
                    onClick={() =>
                      onChange((prev) => ({ ...prev, frameStyle: f.id }))
                    }
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition cursor-pointer min-h-[56px] ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mb-1">
                      {f.id === 'none' && (
                        <div className="w-4 h-4 border border-dashed border-current rounded-xs" />
                      )}
                      {f.id === 'bottom-banner' && (
                        <div className="w-5 h-5 border border-current rounded-xs flex flex-col justify-end">
                          <div className="w-full h-1.5 bg-current" />
                        </div>
                      )}
                      {f.id === 'top-banner' && (
                        <div className="w-5 h-5 border border-current rounded-xs flex flex-col justify-start">
                          <div className="w-full h-1.5 bg-current" />
                        </div>
                      )}
                      {f.id === 'phone-badge' && <Smartphone className="w-4 h-4" />}
                      {f.id === 'circular-badge' && (
                        <LayoutTemplate className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium leading-tight">
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frame Label & Font Controls (Only when frameStyle !== 'none') */}
          {options.frameStyle !== 'none' && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3.5 animate-in fade-in duration-200">
              <div>
                <label
                  htmlFor="input-frame-label"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Frame Label Text
                </label>
                <input
                  type="text"
                  id="input-frame-label"
                  value={options.frameLabel}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, frameLabel: e.target.value }))
                  }
                  placeholder="SCAN ME"
                  maxLength={30}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Font Selector */}
                <div>
                  <label
                    htmlFor="select-frame-font"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Label Typography
                  </label>
                  <select
                    id="select-frame-font"
                    value={options.frameFont}
                    onChange={(e) =>
                      onChange((prev) => ({ ...prev, frameFont: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                  >
                    {FONTS.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <label htmlFor="input-frame-fontsize">Label Text Size</label>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {options.frameLabelSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    id="input-frame-fontsize"
                    min="10"
                    max="28"
                    step="1"
                    aria-label="Frame label font size slider"
                    value={options.frameLabelSize}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        frameLabelSize: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                </div>
              </div>

              {/* Custom Frame Color Toggle */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Custom Frame Color
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Override foreground color for frame banner
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="toggle-custom-frame-color"
                      checked={options.hasCustomFrameColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          hasCustomFrameColor: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {options.hasCustomFrameColor && (
                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      type="color"
                      id="input-frame-color-picker"
                      aria-label="Frame color picker"
                      value={options.frameColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          frameColor: e.target.value,
                        }))
                      }
                      className="w-10 h-10 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      id="input-frame-color"
                      value={options.frameColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          frameColor: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white uppercase"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Output Resolution Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label htmlFor="input-resolution-slider">Output Resolution (px)</label>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                {options.size} × {options.size} px
              </span>
            </div>
            <input
              type="range"
              id="input-resolution-slider"
              min="128"
              max="1024"
              step="32"
              aria-label="Output resolution slider"
              value={options.size}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  size: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>128px (Icon)</span>
              <span>300px (Default)</span>
              <span>1024px (Print HD)</span>
            </div>
          </div>

          {/* 3. Quiet Zone / Margin Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label htmlFor="input-margin-slider">Quiet Zone / Margin (blocks)</label>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                {options.margin} blocks
              </span>
            </div>
            <input
              type="range"
              id="input-margin-slider"
              min="0"
              max="6"
              step="1"
              aria-label="Margin slider"
              value={options.margin}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  margin: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Borderless)</span>
              <span>2 (Standard)</span>
              <span>6 (Wide Margin)</span>
            </div>
          </div>

          {/* 4. Reed-Solomon Error Correction Level Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Reed-Solomon Error Correction Level
              </label>
              {hasLogo && (
                <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  Locked to High (Logo Active)
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ERROR_CORRECTION_LEVELS.map((ec) => {
                const isSelected = options.errorCorrection === ec.level;
                return (
                  <button
                    key={ec.level}
                    type="button"
                    id={`btn-ec-${ec.level}`}
                    disabled={hasLogo && ec.level !== 'H'}
                    onClick={() =>
                      onChange((prev) => ({ ...prev, errorCorrection: ec.level }))
                    }
                    className={`flex flex-col p-2.5 rounded-xl border text-left transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <span className="text-xs font-bold">{ec.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {ec.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
