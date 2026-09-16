import React from 'react';
import {
  Layers,
  ChevronDown,
  Square,
  Circle,
  Sparkles,
  Heart,
  Hexagon,
} from 'lucide-react';
import {
  QRAdvancedOptions,
  PatternStyle,
  MarkerBorderStyle,
  MarkerCenterStyle,
} from '../../../types/qr-advanced.types';

interface DesignAccordionProps {
  isOpen: boolean;
  onToggle: () => void;
  options: QRAdvancedOptions;
  onChange: (updater: (prev: QRAdvancedOptions) => QRAdvancedOptions) => void;
}

export const DesignAccordion: React.FC<DesignAccordionProps> = ({
  isOpen,
  onToggle,
  options,
  onChange,
}) => {
  const PATTERNS: { id: PatternStyle; label: string }[] = [
    { id: 'square', label: 'Square' },
    { id: 'dots', label: 'Dots' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'classy', label: 'Classy' },
    { id: 'diamond', label: 'Diamond' },
  ];

  const MARKER_BORDERS: { id: MarkerBorderStyle; label: string }[] = [
    { id: 'square', label: 'Square' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'circle', label: 'Circle' },
    { id: 'leaf', label: 'Leaf' },
  ];

  const MARKER_CENTERS: { id: MarkerCenterStyle; label: string }[] = [
    { id: 'square', label: 'Square' },
    { id: 'circle', label: 'Circle' },
    { id: 'star', label: 'Star' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'heart', label: 'Heart' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      <button
        type="button"
        id="accordion-toggle-design"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50/70 dark:bg-slate-950/40 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition cursor-pointer min-h-[44px]"
      >
        <span className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Design & Shape Customization</span>
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
          {/* 1. Body Pattern Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              QR Module Body Pattern
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PATTERNS.map((p) => {
                const isSelected = options.pattern === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Select pattern ${p.label}`}
                    onClick={() =>
                      onChange((prev) => ({ ...prev, pattern: p.id }))
                    }
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mb-1">
                      {p.id === 'square' && <div className="w-4 h-4 bg-current" />}
                      {p.id === 'dots' && (
                        <div className="w-4 h-4 rounded-full bg-current" />
                      )}
                      {p.id === 'rounded' && (
                        <div className="w-4 h-4 rounded-md bg-current" />
                      )}
                      {p.id === 'classy' && (
                        <div className="w-4 h-4 rounded-tl-lg rounded-br-lg bg-current" />
                      )}
                      {p.id === 'diamond' && (
                        <div className="w-3.5 h-3.5 rotate-45 bg-current" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Marker Border Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Corner Finder Outer Border
            </label>
            <div className="grid grid-cols-4 gap-2">
              {MARKER_BORDERS.map((mb) => {
                const isSelected = options.markerBorder === mb.id;
                return (
                  <button
                    key={mb.id}
                    type="button"
                    aria-label={`Select marker border ${mb.label}`}
                    onClick={() =>
                      onChange((prev) => ({ ...prev, markerBorder: mb.id }))
                    }
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mb-1">
                      {mb.id === 'square' && (
                        <div className="w-5 h-5 border-2 border-current" />
                      )}
                      {mb.id === 'rounded' && (
                        <div className="w-5 h-5 border-2 border-current rounded-md" />
                      )}
                      {mb.id === 'circle' && (
                        <div className="w-5 h-5 border-2 border-current rounded-full" />
                      )}
                      {mb.id === 'leaf' && (
                        <div className="w-5 h-5 border-2 border-current rounded-tl-xl rounded-br-xl" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium">{mb.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Marker Center Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Corner Finder Center Dot
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MARKER_CENTERS.map((mc) => {
                const isSelected = options.markerCenter === mc.id;
                return (
                  <button
                    key={mc.id}
                    type="button"
                    aria-label={`Select marker center ${mc.label}`}
                    onClick={() =>
                      onChange((prev) => ({ ...prev, markerCenter: mc.id }))
                    }
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mb-1">
                      {mc.id === 'square' && <Square className="w-3.5 h-3.5 fill-current" />}
                      {mc.id === 'circle' && <Circle className="w-3.5 h-3.5 fill-current" />}
                      {mc.id === 'star' && <Sparkles className="w-3.5 h-3.5 fill-current" />}
                      {mc.id === 'diamond' && <div className="w-2.5 h-2.5 rotate-45 bg-current" />}
                      {mc.id === 'heart' && <Heart className="w-3.5 h-3.5 fill-current" />}
                    </div>
                    <span className="text-[10px] font-medium">{mc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Custom Marker Colors Toggle & Pickers */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Custom Marker Colors
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Style corner finder borders & center dots separately
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-custom-marker-color"
                  checked={options.hasCustomMarkerColor}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hasCustomMarkerColor: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {options.hasCustomMarkerColor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
                {/* Marker Border Color */}
                <div className="space-y-1.5">
                  <label htmlFor="input-marker-border-color" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Marker Outer Border
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="input-marker-border-color-picker"
                      aria-label="Marker border color picker"
                      value={options.markerBorderColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          markerBorderColor: e.target.value,
                        }))
                      }
                      className="w-9 h-9 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      id="input-marker-border-color"
                      value={options.markerBorderColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          markerBorderColor: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Marker Center Color */}
                <div className="space-y-1.5">
                  <label htmlFor="input-marker-center-color" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Marker Center Dot
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="input-marker-center-color-picker"
                      aria-label="Marker center color picker"
                      value={options.markerCenterColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          markerCenterColor: e.target.value,
                        }))
                      }
                      className="w-9 h-9 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      id="input-marker-center-color"
                      value={options.markerCenterColor}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          markerCenterColor: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
