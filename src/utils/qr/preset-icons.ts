// High quality SVG data URIs for preset watermark icons
export const PRESET_ICONS: Record<string, { name: string; svg: string }> = {
  link: {
    name: 'Link',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
  email: {
    name: 'Email',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#ea4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
  location: {
    name: 'Location',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#ea4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  phone: {
    name: 'Phone',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
  whatsapp: {
    name: 'WhatsApp',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
  },
  skype: {
    name: 'Skype',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#00aff0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14.5c.5 1.5 2 2.5 4 2.5 2.5 0 4-1.5 4-3.5 0-3-4-2.5-4-4.5 0-1 1-1.5 2-1.5 1.5 0 2.5.5 3 1.5"/></svg>`,
  },
  zoom: {
    name: 'Zoom',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#2d8cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="12" x="2" y="6" rx="2"/><polygon points="22 8 16 12 22 16 22 8"/></svg>`,
  },
  wifi: {
    name: 'Wi-Fi',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`,
  },
  vcard: {
    name: 'V-Card',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>`,
  },
  event: {
    name: 'Event',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  },
  paypal: {
    name: 'PayPal',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#003087" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-7l-2 16h4.5l1-7h3c3 0 5-1.5 5-4.5S17.5 4 14.5 4z"/></svg>`,
  },
  bitcoin: {
    name: 'Bitcoin',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c3.5-.7 2.8-5.3-1.4-5.3m-1.4 5.3-5.908-.952m5.908.952-.348 1.97m.348-1.97.348-1.97M5.86 11.231l.348-1.97M9.01 4.5l-.348 1.97M12.5 4.5l-.348 1.97"/></svg>`,
  },
};

export function getPresetSvgDataUri(presetKey: string): string | null {
  const item = PRESET_ICONS[presetKey];
  if (!item) return null;
  return `data:image/svg+xml;utf8,${encodeURIComponent(item.svg)}`;
}
