import React from 'react';
import {
  Globe,
  FileText,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  MessageCircle,
  Video,
  Tv,
  Wifi,
  Contact,
  Calendar,
  DollarSign,
  Bitcoin,
} from 'lucide-react';
import { DataType } from '../../../types/qr-advanced.types';

interface DataTabsProps {
  activeType: DataType;
  onSelectType: (type: DataType) => void;
}

interface TabDef {
  id: DataType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabDef[] = [
  { id: 'link', label: 'Link', icon: Globe },
  { id: 'text', label: 'Text', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'skype', label: 'Skype', icon: Video },
  { id: 'zoom', label: 'Zoom', icon: Tv },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'V-card', icon: Contact },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'paypal', label: 'PayPal', icon: DollarSign },
  { id: 'bitcoin', label: 'BitCoin', icon: Bitcoin },
];

export const DataTabs: React.FC<DataTabsProps> = ({ activeType, onSelectType }) => {
  return (
    <div
      role="tablist"
      aria-label="QR Code Data Type Tabs"
      className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeType === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onSelectType(tab.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer min-h-[38px] ${
              isActive
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-700/60'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
