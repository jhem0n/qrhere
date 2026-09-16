import React, { useRef } from 'react';
import {
  Image as ImageIcon,
  ChevronDown,
  Upload,
  X,
  ShieldCheck,
  Globe,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Video,
  Tv,
  Wifi,
  Contact,
  Calendar,
  DollarSign,
  Bitcoin,
} from 'lucide-react';
import { QRAdvancedOptions } from '../../../types/qr-advanced.types';

interface LogoAccordionProps {
  isOpen: boolean;
  onToggle: () => void;
  options: QRAdvancedOptions;
  onChange: (updater: (prev: QRAdvancedOptions) => QRAdvancedOptions) => void;
}

interface PresetLogoItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRESET_LOGOS: PresetLogoItem[] = [
  { id: 'link', name: 'Link', icon: Globe },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'location', name: 'Location', icon: MapPin },
  { id: 'phone', name: 'Phone', icon: Phone },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
  { id: 'skype', name: 'Skype', icon: Video },
  { id: 'zoom', name: 'Zoom', icon: Tv },
  { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', name: 'V-Card', icon: Contact },
  { id: 'event', name: 'Event', icon: Calendar },
  { id: 'paypal', name: 'PayPal', icon: DollarSign },
  { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin },
];

export const LogoAccordion: React.FC<LogoAccordionProps> = ({
  isOpen,
  onToggle,
  options,
  onChange,
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange((prev) => ({
          ...prev,
          logoUrl: result,
          logoPreset: undefined,
          errorCorrection: 'H', // Auto-bump to High
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (presetId: string) => {
    if (options.logoPreset === presetId && !options.logoUrl) {
      // Toggle off
      onChange((prev) => ({ ...prev, logoPreset: undefined }));
    } else {
      onChange((prev) => ({
        ...prev,
        logoPreset: presetId,
        logoUrl: undefined,
        errorCorrection: 'H', // Auto-bump to High
      }));
    }
  };

  const handleClearLogo = () => {
    onChange((prev) => ({
      ...prev,
      logoUrl: undefined,
      logoPreset: undefined,
    }));
  };

  const hasLogo = Boolean(options.logoUrl || options.logoPreset);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      <button
        type="button"
        id="accordion-toggle-logo"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50/70 dark:bg-slate-950/40 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition cursor-pointer min-h-[44px]"
      >
        <span className="flex items-center gap-2.5">
          <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Add Logo & Watermark</span>
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
          {/* Logo Status & High Error Correction Notice */}
          {hasLogo && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>
                Error Correction automatically set to <strong>High (30%)</strong> to protect scannability.
              </span>
            </div>
          )}

          {/* 1. Custom Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Upload Custom Logo Image
            </label>

            {options.logoUrl ? (
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <img
                    src={options.logoUrl}
                    alt="Custom logo preview"
                    className="w-10 h-10 object-contain rounded-lg border border-slate-300 dark:border-slate-700 bg-white p-0.5"
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Custom Logo Loaded
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Remove uploaded logo"
                  onClick={handleClearLogo}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  ref={logoInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <button
                  type="button"
                  id="upload-custom-logo-btn"
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer min-h-[44px]"
                >
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Choose Image File (PNG, JPG, SVG)</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Preset Watermark Icons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Or Select a Preset Watermark Icon
              </label>
              {options.logoPreset && (
                <button
                  type="button"
                  onClick={handleClearLogo}
                  className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                >
                  Clear Preset
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {PRESET_LOGOS.map((item) => {
                const Icon = item.icon;
                const isSelected = options.logoPreset === item.id && !options.logoUrl;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Select ${item.name} watermark`}
                    onClick={() => handleSelectPreset(item.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition cursor-pointer min-h-[52px] ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1 shrink-0" />
                    <span className="text-[10px] font-medium truncate w-full">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Logo Controls (Size & Background Cutout) */}
          {hasLogo && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-in fade-in duration-200">
              {/* Remove Background Behind Logo Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Remove Background Behind Logo
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Punches a clean cutout hole so modules do not touch the logo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="toggle-remove-bg-behind-logo"
                    checked={options.removeBgBehindLogo}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        removeBgBehindLogo: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Logo Size Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label htmlFor="input-logo-size">Logo Size (% of QR width)</label>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {options.logoSize}%
                  </span>
                </div>
                <input
                  type="range"
                  id="input-logo-size"
                  min="10"
                  max="30"
                  step="1"
                  aria-label="Logo size percentage slider"
                  value={options.logoSize}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      logoSize: parseInt(e.target.value, 10),
                    }))
                  }
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>10% (Subtle)</span>
                  <span>20% (Recommended)</span>
                  <span>30% (Max Safe)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
