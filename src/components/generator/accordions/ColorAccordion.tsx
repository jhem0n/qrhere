import React, { useRef } from 'react';
import { Palette, ChevronDown, Upload, X } from 'lucide-react';
import { QRAdvancedOptions } from '../../../types/qr-advanced.types';

interface ColorAccordionProps {
  isOpen: boolean;
  onToggle: () => void;
  options: QRAdvancedOptions;
  onChange: (updater: (prev: QRAdvancedOptions) => QRAdvancedOptions) => void;
}

export const ColorAccordion: React.FC<ColorAccordionProps> = ({
  isOpen,
  onToggle,
  options,
  onChange,
}) => {
  const bgFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange((prev) => ({ ...prev, bgImageUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      <button
        type="button"
        id="accordion-toggle-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50/70 dark:bg-slate-950/40 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition cursor-pointer min-h-[44px]"
      >
        <span className="flex items-center gap-2.5">
          <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Colors & Background</span>
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
        <div className="p-4 sm:p-5 space-y-5 border-t border-slate-100 dark:border-slate-800/80">
          {/* Main Foreground & Background Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foreground Color */}
            <div className="space-y-1.5">
              <label htmlFor="input-fg-color" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Foreground Color
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  id="input-fg-color-picker"
                  aria-label="Foreground color picker"
                  value={options.fgColor}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, fgColor: e.target.value }))
                  }
                  className="w-10 h-10 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  id="input-fg-color"
                  value={options.fgColor}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, fgColor: e.target.value }))
                  }
                  className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white uppercase"
                />
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-1.5">
              <label htmlFor="input-bg-color" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Background Color
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  id="input-bg-color-picker"
                  aria-label="Background color picker"
                  disabled={options.isTransparentBg}
                  value={options.bgColor}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, bgColor: e.target.value }))
                  }
                  className="w-10 h-10 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent disabled:opacity-40"
                />
                <input
                  type="text"
                  id="input-bg-color"
                  disabled={options.isTransparentBg}
                  value={options.isTransparentBg ? 'TRANSPARENT' : options.bgColor}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, bgColor: e.target.value }))
                  }
                  className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white uppercase disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Transparent Background Toggle */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Transparent Background
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Export QR with transparent PNG alpha channel
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="toggle-transparent-bg"
                checked={options.isTransparentBg}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, isTransparentBg: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Gradient Toggle & Second Color */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Color Gradient
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Blend foreground with a 2-color linear gradient
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-gradient"
                  checked={options.isGradient}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, isGradient: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {options.isGradient && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2 animate-in fade-in duration-200">
                <label
                  htmlFor="input-grad2-color"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Gradient Stop Color (Second Color)
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    id="input-grad2-color-picker"
                    aria-label="Gradient stop color picker"
                    value={options.gradientColor2}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        gradientColor2: e.target.value,
                      }))
                    }
                    className="w-10 h-10 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    id="input-grad2-color"
                    value={options.gradientColor2}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        gradientColor2: e.target.value,
                      }))
                    }
                    className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white uppercase"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Background Image Toggle & Controls */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Background Image
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Place a subtle branded watermark image behind the QR modules
              </p>
            </div>

            {options.bgImageUrl ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                <img
                  src={options.bgImageUrl}
                  alt="Background preview"
                  className="w-12 h-12 object-cover rounded-lg border border-slate-300 dark:border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Opacity: {Math.round(options.bgImageOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    aria-label="Background image opacity"
                    value={options.bgImageOpacity}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        bgImageOpacity: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Remove background image"
                  onClick={() => onChange((prev) => ({ ...prev, bgImageUrl: undefined }))}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  ref={bgFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                <button
                  type="button"
                  id="upload-bg-image-btn"
                  onClick={() => bgFileInputRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>Upload Background Image</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
