import React from 'react';
import { Download } from 'lucide-react';
import { ScannabilityResult } from '../../types/generator.types';

interface MobileStickyBarProps {
  svgString: string;
  scannability: ScannabilityResult;
  onDownload: () => void;
  onScrollToPreview: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  svgString,
  scannability,
  onDownload,
  onScrollToPreview,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 shadow-lg flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-150">
      <button
        type="button"
        onClick={onScrollToPreview}
        className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-none"
      >
        <div
          className="w-11 h-11 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-1 shrink-0 overflow-hidden flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: svgString }}
        />
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
            Preview Ready
          </span>
          <span className={`text-[10px] font-semibold ${scannability.score === 'fail' ? 'text-rose-600' : scannability.score === 'risky' ? 'text-amber-600' : 'text-emerald-600'}`}>
            {scannability.scoreLabel}
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 active:scale-95 transition"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download PNG</span>
      </button>
    </div>
  );
};
