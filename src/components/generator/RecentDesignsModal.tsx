import React from 'react';
import { X, History, Trash2, ArrowRight } from 'lucide-react';
import { getRecentDesigns, clearRecentDesigns, SavedDesignRecord } from '../../lib/state/designStore';
import { QRDesignState } from '../../types/generator.types';

interface RecentDesignsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreDesign: (state: QRDesignState) => void;
}

export const RecentDesignsModal: React.FC<RecentDesignsModalProps> = ({
  isOpen,
  onClose,
  onRestoreDesign,
}) => {
  if (!isOpen) return null;

  const records = getRecentDesigns();

  const handleClear = () => {
    if (confirm('Clear all recent designs?')) {
      clearRecentDesigns();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Designs (Last 10)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {records.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No saved designs in this browser yet. Your recent designs will be remembered here automatically.
          </p>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-slate-50/50 dark:bg-slate-950/40 transition"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {rec.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Saved on {rec.date} · {rec.state.body} style
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onRestoreDesign(rec.state);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
                >
                  <span>Load</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          {records.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
