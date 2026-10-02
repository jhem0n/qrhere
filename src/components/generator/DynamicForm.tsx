import React, { useState } from 'react';
import { Eye, EyeOff, MapPin } from 'lucide-react';
import { QRTypeDefinition } from '../../data/qrTypes';

interface DynamicFormProps {
  typeDef: QRTypeDefinition;
  values: Record<string, any>;
  onChange: (fields: Record<string, any>) => void;
  rawPayload: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  typeDef,
  values,
  onChange,
  rawPayload: _rawPayload,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mapLinkInput, setMapLinkInput] = useState('');

  const handleFieldChange = (fieldName: string, value: any) => {
    onChange({
      ...values,
      [fieldName]: value,
    });
  };

  // Google Maps link auto-parser for location type
  const handleParseMapLink = (link: string) => {
    setMapLinkInput(link);
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = link.match(regex);
    if (match) {
      onChange({
        ...values,
        latitude: match[1],
        longitude: match[2],
      });
      return;
    }
    const qRegex = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const qMatch = link.match(qRegex);
    if (qMatch) {
      onChange({
        ...values,
        latitude: qMatch[1],
        longitude: qMatch[2],
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
      <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          1. Enter {typeDef.shortName} Details
        </h2>
      </div>

      <div className="space-y-4">
        {/* Special helper for Location type: paste Google Maps URL */}
        {typeDef.id === 'location' && (
          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
            <label className="block text-xs font-bold text-blue-950 dark:text-blue-200 mb-1">
              Quick Paste: Google Maps Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={mapLinkInput}
                onChange={(e) => handleParseMapLink(e.target.value)}
                placeholder="Paste any Google Maps share link here to auto-fill..."
                className="flex-1 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="shrink-0 inline-flex items-center px-2 py-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                <MapPin className="w-3.5 h-3.5 mr-1" /> Auto-detect
              </span>
            </div>
          </div>
        )}

        {/* Regular fields rendering */}
        {typeDef.fields.map((field) => {
          const val = values[field.name] !== undefined ? values[field.name] : field.defaultValue ?? '';

          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(val)}
                    onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>{field.label}</span>
                </label>
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {String(val).length} characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={val}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                {field.help && <p className="text-[11px] text-slate-500 dark:text-slate-400">{field.help}</p>}
              </div>
            );
          }

          if (field.type === 'select') {
            return (
              <div key={field.name} className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                <select
                  value={val || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
                >
                  <option value="" disabled>
                    Select {field.label}...
                  </option>
                  {field.options?.map((opt, index) => (
                    <option key={`${opt.value}-${opt.label}-${index}`} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {field.help && <p className="text-[11px] text-slate-500 dark:text-slate-400">{field.help}</p>}
              </div>
            );
          }

          // Wi-Fi Password field with toggle
          if (typeDef.id === 'wifi' && field.name === 'password') {
            return (
              <div key={field.name} className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={val}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 pl-3.5 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {field.help && <p className="text-[11px] text-slate-500 dark:text-slate-400">{field.help}</p>}
              </div>
            );
          }

          return (
            <div key={field.name} className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {field.label} {field.required && <span className="text-rose-500">*</span>}
              </label>
              <input
                type={field.type}
                value={val}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
              />
              {field.help && <p className="text-[11px] text-slate-500 dark:text-slate-400">{field.help}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
