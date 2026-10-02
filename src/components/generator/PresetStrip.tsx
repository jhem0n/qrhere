import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { STYLE_PRESETS } from '../../lib/qr/presets';
import { QRDesignState } from '../../types/generator.types';
import { generateQRMatrix } from '../../lib/qr/matrix';
import { renderSvg } from '../../lib/qr/renderSvg';
import { createDefaultDesignState } from '../../lib/state/designStore';

interface PresetStripProps {
  state?: QRDesignState;
  onApplyPreset: (presetId: string) => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onReset?: () => void;
  onOpenHistory?: () => void;
}

export const PresetStrip: React.FC<PresetStripProps> = ({ state, onApplyPreset }) => {
  // Pre-render a thumbnail of the original preset design
  const presetThumbnails = useMemo(() => {
    const svgs: Record<string, string> = {};
    const sampleMatrix = generateQRMatrix('https://qrhere.online', 'M');
    const base = createDefaultDesignState('url');

    for (const p of STYLE_PRESETS) {
      const design: QRDesignState = {
        ...base,
        fg: p.colors.fg,
        bg: p.colors.bg,
        transparent: false,
        gradient: p.colors.gradient || { on: false, from: p.colors.fg, to: p.colors.fg, angle: 45, kind: 'linear' },
        body: p.style.body,
        eyeOuter: p.style.eyeOuter,
        eyeInner: p.style.eyeInner,
        frame: {
          ...base.frame,
          id: p.frameId || 'none',
          color: p.frameColor || p.colors.fg,
        },
        margin: 1,
        size: 100,
      };
      svgs[p.id] = renderSvg(sampleMatrix, design).svgString;
    }
    return svgs;
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Style Presets</span>
        </label>
        <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
          Click to apply preset
        </span>
      </div>

      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
          {STYLE_PRESETS.map((p) => {
            const isMatch = state?.fg === p.colors.fg && state?.body === p.style.body;
            const svg = presetThumbnails[p.id];

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onApplyPreset(p.id)}
                title={p.name}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer text-center ${
                  isMatch
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/50 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 hover:border-blue-400 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                {/* Visual Thumbnail of Original Preset */}
                <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center p-1 bg-white dark:bg-slate-950 shadow-xs border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-105">
                  {svg ? (
                    <div
                      className="w-full h-full flex items-center justify-center pointer-events-none [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-md"
                      style={{ backgroundColor: p.colors.fg }}
                    />
                  )}
                </div>

                {/* Preset Name */}
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
