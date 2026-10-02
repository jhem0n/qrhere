export interface PresetIcon {
  id: string;
  name: string;
  category: 'Social' | 'Communication' | 'Payment' | 'General';
  svgPath: string;
  isFilled?: boolean;
  brandColor?: string;
}

export const PRESET_ICONS: PresetIcon[] = [
  // Communication & Tools (Line Icons)
  {
    id: 'link',
    name: 'Link',
    category: 'General',
    svgPath: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    category: 'Communication',
    svgPath: '<path d="M5 12.55a11 11 0 0 1 14.08 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8.5 16.5a5 5 0 0 1 7 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M1.42 9a16 16 0 0 1 21.16 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="20" r="1" fill="currentColor"/>',
  },
  {
    id: 'email',
    name: 'Email',
    category: 'Communication',
    svgPath: '<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  },
  {
    id: 'phone',
    name: 'Phone',
    category: 'Communication',
    svgPath: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    id: 'sms',
    name: 'SMS',
    category: 'Communication',
    svgPath: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    id: 'vcard',
    name: 'vCard Contact',
    category: 'General',
    svgPath: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>',
  },
  {
    id: 'location',
    name: 'Location',
    category: 'General',
    svgPath: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="2"/>',
  },
  {
    id: 'calendar',
    name: 'Event',
    category: 'General',
    svgPath: '<rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>',
  },

  // Brand & Social Icons (Precision Filled Vectors)
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Social',
    isFilled: true,
    brandColor: '#25D366',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.83.49 3.55 1.34 5.03L2 22l5.12-1.32A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.57 14.16c-.24.67-1.39 1.28-1.92 1.34-.51.06-1.16.08-3.69-.97-3.09-1.28-5.07-4.42-5.23-4.63-.15-.2-1.25-1.66-1.25-3.17 0-1.51.78-2.25 1.06-2.56.28-.31.62-.39.83-.39.21 0 .42 0 .6.01.2.01.46-.07.72.55.27.64.92 2.25 1 2.42.08.16.14.36.03.57-.11.22-.16.35-.32.54-.16.19-.34.42-.49.57-.16.16-.33.34-.14.67.19.32.84 1.39 1.81 2.25 1.25 1.11 2.3 1.46 2.63 1.62.33.16.52.14.71-.08.2-.22.84-.98 1.06-1.32.22-.34.45-.28.75-.17.3.11 1.93.91 2.26 1.08.33.17.55.25.63.39.08.14.08.81-.16 1.48Z"/>',
  },
  {
    id: 'skype',
    name: 'Skype',
    category: 'Social',
    isFilled: true,
    brandColor: '#00AFF0',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.19.22 2.33.61 3.39A6.99 6.99 0 0 0 2 19c0 3.86 3.14 7 7 7 1.34 0 2.58-.38 3.63-.98 1.04.6 2.18.98 3.37.98 5.52 0 10-4.48 10-10 0-1.19-.22-2.33-.61-3.39A6.99 6.99 0 0 0 22 9c0-3.86-3.14-7-7-7-1.34 0-2.58.38-3.63.98A9.94 9.94 0 0 0 12 2Zm.05 4.67c3.16 0 4.67 1.57 4.67 3.51 0 1.37-.89 2.22-2.34 2.61l-2.02.53c-.98.26-1.38.64-1.38 1.18 0 .65.6 1.14 1.7 1.14 2.05 0 2.56-.88 2.65-1.57h2.09c-.19 1.95-1.74 3.23-4.74 3.23-2.93 0-4.73-1.63-4.73-3.56 0-1.37.91-2.31 2.44-2.7l1.96-.51c.91-.24 1.33-.59 1.33-1.12 0-.6-.56-1.07-1.58-1.07-1.56 0-2.27.72-2.43 1.51H7.3c.18-1.89 1.83-3.16 4.75-3.16Z"/>',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    category: 'Communication',
    isFilled: true,
    brandColor: '#2D8CFF',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M3 7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Zm15 2.12 4.25-2.83A1 1 0 0 1 24 7.12v9.76a1 1 0 0 1-1.75.83L18 14.88V9.12Z"/>',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payment',
    isFilled: true,
    brandColor: '#003087',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M7.08 21.34H2.47a.64.64 0 0 1-.63-.74L4.94 3.32a.76.76 0 0 1 .75-.64h6.7c3.09 0 5.49 1.2 5.85 4.32.32 2.76-.99 4.88-3.41 5.92-.9.38-1.92.58-3.05.58H9.19a.76.76 0 0 0-.75.64l-1.36 7.2zM12.8 6.57H8.56L6.71 16.34H9.3a.76.76 0 0 0 .75-.64l.87-4.6a.76.76 0 0 1 .76-.64h1.74c2.4 0 4.16-.8 4.55-3.08.3-1.78-.9-3.82-4.17-3.82z"/>',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    category: 'Payment',
    isFilled: true,
    brandColor: '#F7931A',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1.9 6.27c1.37.28 2.05 1.13 1.93 2.27-.12 1.03-.78 1.62-1.71 1.83 1.25.32 1.86 1.09 1.66 2.37-.23 1.48-1.34 2.18-3.07 2.14l-.32 1.54-.93-.2.32-1.52-.75-.16-.32 1.52-.94-.2.32-1.53c-.35-.08-.71-.16-1.07-.26l-1.32-.3.65-1.42s.7.17.69.15c.29.07.41-.1.46-.26l1.09-5.18c.03-.18-.04-.37-.36-.45.02-.01-.69-.15-.69-.15l.38-1.5 1.39.31c.31.07.63.14.94.21l.32-1.52.93.2-.32 1.51.75.16.32-1.51.93.2-.32 1.54c.73.13 1.42.27 1.98.5Zm-2.6 3.42c.81.18 1.65.17 1.76-.7.1-.81-.62-.97-1.43-1.15l-.83-.18-.5 2.35.99.22c.01-.54.01-.54.01-.54Zm-.83 4.04c.95.21 1.95.23 2.07-.81.12-.95-.69-1.14-1.64-1.35l-.94-.21-.56 2.65 1.07.24v-.52Z"/>',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social',
    brandColor: '#E4405F',
    svgPath: '<rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Social',
    isFilled: true,
    brandColor: '#FF0000',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z"/>',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Social',
    isFilled: true,
    brandColor: '#1877F2',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12Z"/>',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Social',
    isFilled: true,
    brandColor: '#000000',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12.53.02c1.31 0 2.58.37 3.68 1.04v4.54a6.49 6.49 0 0 1-3.68-1.12v8.83a7.31 7.31 0 1 1-7.31-7.31c.4 0 .8.04 1.18.1v4.56a2.76 2.76 0 1 0 1.58 2.5V.02h4.55Z"/>',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Social',
    isFilled: true,
    brandColor: '#0A66C2',
    svgPath: '<path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    category: 'Social',
    isFilled: true,
    brandColor: '#000000',
    svgPath: '<path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'Social',
    isFilled: true,
    brandColor: '#26A5E4',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 4-.17 6.68-2.91 8.04-3.51 3.83-1.69 4.63-1.99 5.15-2 .11 0 .37.03.54.17.14.12.18.28.2.46-.02.07-.02.21-.04.35Z"/>',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'General',
    isFilled: true,
    brandColor: '#1DB954',
    svgPath: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.58 14.43c-.18.29-.56.38-.85.2-2.33-1.43-5.26-1.75-8.72-.96-.33.08-.66-.13-.73-.46-.08-.33.13-.66.46-.73 3.78-.86 7.02-.5 9.64 1.1.29.18.38.56.2.85Zm1.22-2.73c-.23.37-.71.49-1.08.26-2.67-1.64-6.73-2.12-9.88-1.16-.42.13-.86-.11-.99-.52-.13-.42.11-.86.52-.99 3.6-1.09 8.07-.56 11.17 1.34.37.23.49.71.26 1.07Zm.11-2.84c-3.19-1.89-8.47-2.07-11.52-1.14-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 3.53-1.07 9.38-.86 13.06 1.32.44.26.58.83.32 1.28-.26.43-.83.58-1.32.32Z"/>',
  },

  // General Shapes
  {
    id: 'star',
    name: 'Star',
    category: 'General',
    svgPath: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    id: 'heart',
    name: 'Heart',
    category: 'General',
    svgPath: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    id: 'cart',
    name: 'Shopping Cart',
    category: 'General',
    svgPath: '<circle cx="8" cy="21" r="1" fill="currentColor"/><circle cx="19" cy="21" r="1" fill="currentColor"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
];
