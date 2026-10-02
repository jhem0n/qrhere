import React from 'react';
import { Link } from 'react-router-dom';
import {
  Link as LinkIcon,
  FileText,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  MessageSquare,
  Video,
  Wifi,
  Contact,
  Calendar,
  DollarSign,
  Coins,
} from 'lucide-react';
import { QR_TYPES } from '../../data/qrTypes';

interface TypeChipsProps {
  currentType: string;
  onSelectType?: (typeId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Link: LinkIcon,
  FileText: FileText,
  Mail: Mail,
  MapPin: MapPin,
  Phone: Phone,
  MessageCircle: MessageCircle,
  MessageSquare: MessageSquare,
  Video: Video,
  Wifi: Wifi,
  Contact: Contact,
  Calendar: Calendar,
  DollarSign: DollarSign,
  Coins: Coins,
};

export const TypeChips: React.FC<TypeChipsProps> = ({ currentType, onSelectType }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Select QR Code Type
        </label>
        <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
          14 specialized formats
        </span>
      </div>

      {/* Grid box containing all 14 types without horizontal scroll/slider */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {QR_TYPES.map((type) => {
            const isActive = currentType === type.id;
            const Icon = ICON_MAP[type.icon] || LinkIcon;
            const href = `/${type.slug}`;

            return (
              <Link
                key={type.id}
                to={href}
                onClick={() => {
                  if (onSelectType) {
                    onSelectType(type.id);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer text-center min-h-[42px] ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs ring-2 ring-blue-600 dark:ring-blue-400'
                    : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{type.shortName}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
