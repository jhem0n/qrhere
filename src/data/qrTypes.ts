export interface QRFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'email' | 'tel' | 'number' | 'select' | 'datetime-local' | 'checkbox';
  placeholder?: string;
  help?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string | boolean | number;
}

export interface QRTypeDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  promise: string;
  intro: string;
  badge: string;
  fields: QRFieldDefinition[];
  defaultValues: Record<string, any>;
  exampleValues: Record<string, any>;
  buildPayload: (data: Record<string, any>) => string;
  validate: (data: Record<string, any>) => { valid: boolean; message?: string };
  whatHappensWhenScanned: string;
  stepsHeading?: string;
  steps: { title: string; desc: string }[];
  useCasesHeading?: string;
  useCases: { title: string; desc: string }[];
  tipsHeading?: string;
  bestPractices: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedTypes: string[];
}

import { ALL_COUNTRY_DIAL_CODES, COUNTRY_DIAL_CODES } from './countries';
export { ALL_COUNTRY_DIAL_CODES, COUNTRY_DIAL_CODES };

export const QR_TYPES: QRTypeDefinition[] = [
  {
    id: 'url',
    slug: 'qr-code-generator-url',
    name: 'Website Link (URL)',
    shortName: 'Link',
    icon: 'Link',
    badge: 'Most Popular',
    title: 'Free URL QR Code Generator – Create Link QR Codes | QR Here',
    metaDescription: 'Turn any link into a permanent QR code. Free, no sign-up, no expiry. Customize colors, add a logo, and download high-resolution vector SVG or PNG.',
    keywords: [
      'url qr code generator',
      'link qr code',
      'website qr code generator',
      'create url qr code',
      'free website qr code',
      'convert link to qr code',
    ],
    h1: 'URL QR Code Generator',
    promise: 'Free · No sign-up · Static codes that never expire',
    intro: 'Turn any website link into a QR code in seconds. Static codes that don\'t expire, no sign-up needed. Download as PNG or SVG.',
    fields: [
      {
        name: 'url',
        label: 'Website URL',
        type: 'url',
        placeholder: 'https://yourwebsite.com/page',
        help: 'Prefix with https:// (automatically added if omitted).',
        required: true,
        defaultValue: '',
      },
    ],
    defaultValues: {
      url: '',
    },
    exampleValues: {
      url: 'https://myshop.com/summer-sale',
    },
    buildPayload: (data) => {
      let raw = (data.url || '').trim();
      if (!raw) return '';
      if (!/^https?:\/\//i.test(raw)) {
        raw = `https://${raw}`;
      }
      return raw;
    },
    validate: (data) => {
      if (!data.url || !data.url.trim()) {
        return { valid: false, message: 'Please enter a website URL.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'When anyone points their smartphone camera at this QR code, an instant banner appears with your website domain. One tap opens the exact webpage directly in their mobile browser.',
    stepsHeading: 'How to create a QR code for a URL',
    steps: [
      { title: 'Paste your URL', desc: 'Enter any website address, blog post, portfolio, or landing page link.' },
      { title: 'Customize design', desc: 'Pick custom colors, eye patterns, and embed your brand logo with auto-knockout.' },
      { title: 'Download in high res', desc: 'Export scalable vector SVG for crisp printing or high-res PNG for web sharing.' },
    ],
    useCasesHeading: 'Popular use cases for URL QR Codes',
    useCases: [
      { title: 'Restaurant Menus', desc: 'Place on dining tables so customers view digital contactless menus instantly.' },
      { title: 'Flyers & Posters', desc: 'Drive street traffic directly to event ticket sales, promotions, or signup forms.' },
      { title: 'Product Packaging', desc: 'Link buyers to user manuals, warranty registration, or how-to video guides.' },
      { title: 'Business Cards', desc: 'Send networking contacts to your personal portfolio, LinkedIn profile, or resume.' },
      { title: 'Storefront Windows', desc: 'Allow passersby to browse your online inventory even when physical doors are closed.' },
      { title: 'Retail Receipts', desc: 'Encourage repeat purchases with QR codes linking to discount codes or feedback forms.' },
    ],
    tipsHeading: 'Tips for Make best URL QR codes',
    bestPractices: [
      { title: 'Keep URLs concise', desc: 'Shorter URLs create simpler, less dense QR modules that scan faster from farther away.' },
      { title: 'Ensure high contrast', desc: 'Maintain at least a 4:1 contrast ratio between your dark code dots and the background.' },
      { title: 'Leave a quiet zone', desc: 'Keep at least 2–4 modules of blank margin space around all four sides of the code.' },
      { title: 'Test print first', desc: 'Always print a test sheet and scan with an iPhone and Android camera before bulk printing.' },
      { title: 'Target mobile experiences', desc: 'Ensure the destination website is fully mobile-optimized for smartphone visitors.' },
    ],
    faqs: [
      { question: 'Does a static URL QR code expire?', answer: 'No. Static QR codes encode the destination URL directly into the pixel pattern. As long as your website exists, the code will work forever without renewal or subscriptions.' },
      { question: 'Can I change the destination URL later?', answer: 'Static QR codes store the literal URL permanently. If you need to change destinations without reprinting, consider pointing the QR code to a short domain or redirect URL that you manage.' },
      { question: 'Is there a limit on how many people can scan it?', answer: 'None at all. Because decoding happens on user devices with zero server calls, your QR code can be scanned millions of times with zero bandwidth restrictions.' },
      { question: 'Can I add UTM tracking codes?', answer: 'Yes. Use our built-in UTM builder to tag traffic sources, mediums, and campaigns so you can track exact scan conversions in Google Analytics.' },
      { question: 'What file format should I download for printing?', answer: 'Download vector SVG for crisp, pixel-free printing at billboard, poster, or banner sizes. Use PNG for digital graphics, social media, and presentations.' },
      { question: 'Does QR Here add watermarks or ads?', answer: 'Never. QR Here is 100% free with no watermarks, no account walls, and no ads on generated codes.' },
    ],
    relatedTypes: ['text', 'vcard', 'wifi', 'whatsapp'],
  },
  {
    id: 'text',
    slug: 'qr-code-generator-text',
    name: 'Plain Text',
    shortName: 'Text',
    icon: 'FileText',
    badge: 'Offline Safe',
    title: 'Free Text QR Code Generator – Plain Text to QR | QR Here',
    metaDescription: 'Convert any message, note, or serial number into a plain text QR code. Free, private, works offline without an internet connection.',
    keywords: [
      'text qr code generator',
      'plain text qr code',
      'message qr code',
      'offline qr code',
      'convert text to qr code',
      'free text qr maker',
    ],
    h1: 'Text QR Code Generator',
    promise: 'Free · No sign-up · Works 100% offline',
    intro: 'Paste a note, message, or snippet and get a scannable QR code instantly. Perfect for sharing short info offline. Free PNG download.',
    fields: [
      {
        name: 'text',
        label: 'Text Content',
        type: 'textarea',
        placeholder: 'Enter any text, note, secret message, or serial number...',
        help: 'Up to 1,000 characters recommended for high scannability.',
        required: true,
        defaultValue: '',
      },
    ],
    defaultValues: {
      text: '',
    },
    exampleValues: {
      text: 'Order #94821 - SKU: WD-400 - Inspected by Quality Team 4',
    },
    buildPayload: (data) => (data.text || '').trim(),
    validate: (data) => {
      if (!data.text || !data.text.trim()) {
        return { valid: false, message: 'Please enter text content.' };
      }
      if (data.text.length > 2500) {
        return { valid: false, message: 'Text is too long for reliable scanning (max ~2,500 chars).' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The scanner decodes the message instantly and displays the text on the phone screen with an option to copy to clipboard or search the web.',
    stepsHeading: 'How to create a QR code for Text',
    steps: [
      { title: 'Type or paste text', desc: 'Input your message, note, verification token, or alphanumeric code.' },
      { title: 'Check data density', desc: 'Watch the real-time capacity indicator to ensure the code remains easy to scan.' },
      { title: 'Download your code', desc: 'Download high-resolution vector SVG or transparent PNG files.' },
    ],
    useCasesHeading: 'Popular use cases for Text QR Codes',
    useCases: [
      { title: 'Inventory & Asset Tracking', desc: 'Label warehouse bins, machinery, and parts with serial numbers and specs.' },
      { title: 'Classroom & Scavenger Hunts', desc: 'Leave clues and educational quiz questions hidden behind scannable text codes.' },
      { title: 'Device Setup Keys', desc: 'Print backup recovery phrases, hardware serials, and device credentials.' },
      { title: 'Secret Messages & Gifts', desc: 'Add personalized hidden notes to greeting cards, wedding favors, and letters.' },
      { title: 'Offline Instructions', desc: 'Provide equipment operating instructions that work in remote areas with zero cell signal.' },
      { title: 'Conference Badges', desc: 'Encode attendee identification numbers or emergency contact instructions.' },
    ],
    tipsHeading: 'Tips for Make best Text QR codes',
    bestPractices: [
      { title: 'Keep it concise', desc: 'Fewer characters yield bigger QR blocks, making the code much easier to scan.' },
      { title: 'Check character counts', desc: 'Aim for under 500 characters when printing on small surfaces like labels.' },
      { title: 'Use high error correction', desc: 'Set Error Correction to Level Q or H if labels might get scratched or dirty.' },
      { title: 'Avoid sensitive credentials in public', desc: 'Remember that plain text QR codes are readable by anyone who scans them.' },
      { title: 'Test with default camera', desc: 'Verify how native iOS and Android camera apps format and present the text.' },
    ],
    faqs: [
      { question: 'Does a plain text QR code need internet to work?', answer: 'No! The text is stored directly inside the visual squares. The scanner decodes it purely using local device algorithms with zero internet connection needed.' },
      { question: 'How much text can I put in a QR code?', answer: 'Technically up to 4,296 alphanumeric characters, but practical scanners work best with under 1,000 characters. Long text creates very dense grids requiring large print sizes.' },
      { question: 'Can text QR codes be edited later?', answer: 'No, static codes cannot be modified after generation because the text is physically baked into the pattern.' },
      { question: 'Is my text sent to your servers?', answer: 'Never. QR Here operates 100% inside your web browser. Your text never leaves your device memory.' },
      { question: 'Can I format text with bold or italics?', answer: 'QR codes store raw Unicode plain text. Markdown or rich formatting will appear as plain text unless decoded by a reader that supports it.' },
    ],
    relatedTypes: ['url', 'email', 'sms', 'wifi'],
  },
  {
    id: 'wifi',
    slug: 'qr-code-generator-wifi',
    name: 'Wi-Fi Network',
    shortName: 'Wi-Fi',
    icon: 'Wifi',
    badge: 'Guest Favorite',
    title: 'Free WiFi QR Code Generator – Connect to WiFi | QR Here',
    metaDescription: 'Generate a WiFi QR code so guests connect instantly without typing passwords. Free, private, runs in your browser, no sign-up.',
    keywords: [
      'wifi qr code generator',
      'share wifi qr code',
      'wifi password qr code',
      'connect to wifi qr code',
      'free wifi qr code maker',
      'guest wifi qr code',
    ],
    h1: 'WiFi QR Code Generator',
    promise: 'Free · No sign-up · 100% client-side security',
    intro: 'Create a WiFi QR code in seconds. Guests scan and connect, so you never have to spell out your password again. Free, no sign-up.',
    fields: [
      {
        name: 'ssid',
        label: 'Network Name (SSID)',
        type: 'text',
        placeholder: 'e.g. Cafe_Guest_WiFi',
        help: 'Exact network name as broadcast by your wireless router (case-sensitive).',
        required: true,
        defaultValue: '',
      },
      {
        name: 'password',
        label: 'Network Password',
        type: 'text',
        placeholder: 'Enter Wi-Fi password',
        help: 'Processed entirely on your device. Never transmitted over the internet.',
        required: false,
        defaultValue: '',
      },
      {
        name: 'encryption',
        label: 'Security / Encryption Type',
        type: 'select',
        options: [
          { value: 'WPA', label: 'WPA / WPA2 / WPA3 (Standard for most routers)' },
          { value: 'WEP', label: 'WEP (Older routers)' },
          { value: 'nopass', label: 'No Password (Open network)' },
        ],
        defaultValue: '',
      },
      {
        name: 'hidden',
        label: 'Hidden Network (SSID is not publicly broadcast)',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
    defaultValues: {
      ssid: '',
      password: '',
      encryption: '',
      hidden: false,
    },
    exampleValues: {
      ssid: 'BlueCafe_Guest',
      password: 'CoffeeTime2026!',
      encryption: 'WPA',
      hidden: false,
    },
    buildPayload: (data) => {
      const escape = (str: string) => (str || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:').replace(/"/g, '\\"');
      const ssid = escape(data.ssid || '');
      const pass = data.encryption === 'nopass' ? '' : escape(data.password || '');
      const type = data.encryption || 'WPA';
      const hidden = data.hidden ? 'true' : 'false';
      if (!ssid) return '';
      return `WIFI:T:${type};S:${ssid};P:${pass};H:${hidden};;`;
    },
    validate: (data) => {
      if (!data.ssid || !data.ssid.trim()) {
        return { valid: false, message: 'Please enter your Wi-Fi network name (SSID).' };
      }
      if (data.encryption !== 'nopass' && (!data.password || !data.password.trim())) {
        return { valid: false, message: 'Please enter a password or choose "No Password".' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera reads the Wi-Fi credentials and prompts: "Join network [Your Network]?". Tapping "Join" connects the smartphone automatically without typing any password.',
    stepsHeading: 'How to create a QR code for Wi-Fi',
    steps: [
      { title: 'Enter network SSID & password', desc: 'Type your Wi-Fi name and password exactly as configured on your router.' },
      { title: 'Customize appearance', desc: 'Apply a friendly frame like "Join Wi-Fi" and choose your brand colors.' },
      { title: 'Print and display', desc: 'Print on cardstock, frame it near the counter, or stick it on your guest room table.' },
    ],
    useCasesHeading: 'Popular use cases for Wi-Fi QR Codes',
    useCases: [
      { title: 'Coffee Shops & Cafes', desc: 'Eliminate staff interruptions from customers constantly asking for the Wi-Fi code.' },
      { title: 'Airbnbs & Vacation Rentals', desc: 'Place on the nightstand or welcome fridge so travelers connect the moment they arrive.' },
      { title: 'Home Guest Wi-Fi', desc: 'Never spell out long, complex passwords to visiting family and friends again.' },
      { title: 'Coworking Spaces', desc: 'Streamline onboarding for members, hot-deskers, and meeting room guests.' },
      { title: 'Offices & Conference Rooms', desc: 'Let visiting clients connect quickly during presentations without IT assistance.' },
      { title: 'Events & Trade Shows', desc: 'Provide reliable attendee internet access with large signage at check-in desks.' },
    ],
    tipsHeading: 'Tips for Make best WI-Fi QR codes',
    bestPractices: [
      { title: 'Double-check SSID spelling', desc: 'Wi-Fi names are case-sensitive; ensure exact capitalization matches your router.' },
      { title: 'Use a Guest Network', desc: 'Keep your smart home devices and private computers secure on an isolated guest SSID.' },
      { title: 'Add a clear frame', desc: 'Select our "Join Wi-Fi" or "Scan to Connect" frame so guests know what the code is for.' },
      { title: 'Print at least 5x5 cm', desc: 'Ensure the code is large enough to scan comfortably across a table or counter.' },
      { title: 'Update code when password changes', desc: 'Remember to reprint the QR code whenever you update your Wi-Fi router password.' },
    ],
    faqs: [
      { question: 'Is my Wi-Fi password sent to your servers?', answer: 'Absolutely not. All encoding happens strictly on your device inside your web browser. Your credentials are never uploaded, logged, or viewed by anyone.' },
      { question: 'Does this work on both iPhone and Android?', answer: 'Yes. Apple iPhones running iOS 11+ and Android smartphones running Android 10+ natively support Wi-Fi QR codes with their built-in cameras.' },
      { question: 'Does a Wi-Fi QR code expire?', answer: 'No. The QR code is static and never expires. It remains valid as long as your router uses the same SSID and password.' },
      { question: 'Can guests see my password after scanning?', answer: 'Most modern mobile operating systems automatically connect without revealing the plain text password, though some Android devices allow viewing saved network credentials in Settings.' },
      { question: 'What happens if my network is hidden?', answer: 'Check the "Hidden Network" checkbox. This includes the H:true flag so scanners search for the non-broadcasted SSID.' },
    ],
    relatedTypes: ['vcard', 'url', 'text', 'location'],
  },
  {
    id: 'vcard',
    slug: 'qr-code-generator-vcard',
    name: 'vCard Contact Card',
    shortName: 'vCard',
    icon: 'Contact',
    badge: 'Business Essential',
    title: 'Free vCard QR Code Generator – Digital Business Card | QR Here',
    metaDescription: 'Create a digital business card QR code. Scan to save contact details to smartphone address book instantly. Free, no sign-up.',
    keywords: [
      'vcard qr code generator',
      'digital business card qr code',
      'contact qr code',
      'business card qr code',
      'scan to save contact',
      'free vcard maker',
    ],
    h1: 'vCard QR Code Generator',
    promise: 'Free · No sign-up · Standard vCard 3.0 format',
    intro: 'Create a vCard QR code so people can save your name, number, and email to their contacts with one scan. Free and printable.',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Jane', required: true, defaultValue: '' },
      { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe', required: true, defaultValue: '' },
      { name: 'org', label: 'Company / Organization', type: 'text', placeholder: 'Acme Studio Ltd', defaultValue: '' },
      { name: 'title', label: 'Job Title', type: 'text', placeholder: 'Design Director', defaultValue: '' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 555 123 4567', defaultValue: '' },
      { name: 'mobile', label: 'Mobile Number (optional)', type: 'tel', placeholder: '+1 555 987 6543' },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@acmestudio.com', defaultValue: '' },
      { name: 'website', label: 'Website / Portfolio', type: 'url', placeholder: 'https://acmestudio.com', defaultValue: '' },
      { name: 'street', label: 'Street Address', type: 'text', placeholder: '123 Market St, Suite 400' },
      { name: 'city', label: 'City', type: 'text', placeholder: 'San Francisco' },
      { name: 'country', label: 'Country', type: 'text', placeholder: 'United States' },
      { name: 'note', label: 'Personal Note / Tagline', type: 'text', placeholder: 'Specializing in brand identity and mobile UX' },
    ],
    defaultValues: {
      firstName: '',
      lastName: '',
      org: '',
      title: '',
      phone: '',
      mobile: '',
      email: '',
      website: '',
      street: '',
      city: '',
      country: '',
      note: '',
    },
    exampleValues: {
      firstName: 'Alex',
      lastName: 'Mercer',
      org: 'Apex Tech Ventures',
      title: 'Managing Partner',
      phone: '+1 415 555 0199',
      mobile: '+1 415 555 0188',
      email: 'alex@apextech.io',
      website: 'https://apextech.io',
      street: '500 Howard Street',
      city: 'San Francisco',
      country: 'USA',
      note: 'Seed stage technology investor',
    },
    buildPayload: (data) => {
      const fn = `${(data.firstName || '').trim()} ${(data.lastName || '').trim()}`.trim();
      const hasContent = fn || data.org || data.phone || data.email || data.website;
      if (!hasContent) return '';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${(data.lastName || '').trim()};${(data.firstName || '').trim()};;;`,
        `FN:${fn || 'Contact'}`,
      ];
      if (data.org) lines.push(`ORG:${data.org.trim()}`);
      if (data.title) lines.push(`TITLE:${data.title.trim()}`);
      if (data.phone) lines.push(`TEL;TYPE=WORK,VOICE:${data.phone.trim()}`);
      if (data.mobile) lines.push(`TEL;TYPE=CELL,VOICE:${data.mobile.trim()}`);
      if (data.email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${data.email.trim()}`);
      if (data.website) lines.push(`URL:${data.website.trim()}`);
      if (data.street || data.city || data.country) {
        lines.push(`ADR;TYPE=WORK:;;${(data.street || '').trim()};${(data.city || '').trim()};;;${(data.country || '').trim()}`);
      }
      if (data.note) lines.push(`NOTE:${data.note.trim()}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    },
    validate: (data) => {
      if (!data.firstName && !data.lastName) {
        return { valid: false, message: 'Please enter at least a first or last name.' };
      }
      if (!data.phone && !data.email) {
        return { valid: false, message: 'Please provide either a phone number or email address.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera recognizes the vCard format immediately and prompts: "Add to Contacts". One tap opens the contact screen with name, phone, email, and company pre-filled and ready to save.',
    stepsHeading: 'How to create a QR code for vCard',
    steps: [
      { title: 'Fill in your details', desc: 'Enter your name, job title, phone numbers, email address, and company website.' },
      { title: 'Add your logo or picture', desc: 'Embed your company logo in the center and choose professional brand colors.' },
      { title: 'Print on business cards', desc: 'Download vector SVG to give your graphic designer or print shop for sharp cards.' },
    ],
    useCasesHeading: 'Popular use cases for vCard QR Codes',
    useCases: [
      { title: 'Physical Business Cards', desc: 'Add to the back of paper cards so contacts can save your details without manual typing.' },
      { title: 'Conference Badges', desc: 'Let fellow attendees and exhibitors capture your contact info during quick networking.' },
      { title: 'Email Signatures', desc: 'Include a digital vCard QR in your PDF invoices and email footer banners.' },
      { title: 'Resume & Portfolio', desc: 'Make it effortless for hiring managers to save your contact information.' },
      { title: 'Trade Show Booths', desc: 'Display on table runners and banners so booth visitors can take your info with them.' },
      { title: 'Storefront Badges', desc: 'Help freelance clients and local contractors save your direct contact line quickly.' },
    ],
    tipsHeading: 'Tips for Make best vCard QR codes',
    bestPractices: [
      { title: 'Keep optional fields modest', desc: 'Only include essential fields so the QR code remains clean and quick to scan.' },
      { title: 'Print minimum 2.5 x 2.5 cm', desc: 'vCard codes store more data; ensure the printed code is at least 1 inch square.' },
      { title: 'Use Level M or Q error correction', desc: 'Provides enough fault tolerance without making the pixel grid excessively dense.' },
      { title: 'Standardize phone numbers', desc: 'Always include the international country code (e.g., +1 for USA) for traveling contacts.' },
      { title: 'Test on both platforms', desc: 'Scan with an iPhone Camera and Android Google Lens to verify contact field mapping.' },
    ],
    faqs: [
      { question: 'Do contacts need to install an app to save my card?', answer: 'No! Apple iOS and Google Android camera apps natively support vCard 3.0 files. Tapping the scan notification opens their default Contacts app.' },
      { question: 'Will this code ever expire or stop working?', answer: 'Never. Static vCard QR codes store the text locally in the image. No server hosting or subscription is involved.' },
      { question: 'What happens if my phone number changes?', answer: 'Because static QR codes store the data directly in the barcode, you will need to generate and print a new QR code if your details change.' },
      { question: 'Can I add my profile photo into the code?', answer: 'You can embed a center logo (PNG or SVG) into the QR code design, but photos cannot be embedded inside the vCard payload itself without exceeding scannable code sizes.' },
      { question: 'Does vCard work across international borders?', answer: 'Yes, as long as you format your phone numbers with the international plus sign and country code (e.g. +44 for UK, +1 for US).' },
    ],
    relatedTypes: ['email', 'phone', 'url', 'whatsapp'],
  },
  {
    id: 'whatsapp',
    slug: 'qr-code-generator-whatsapp',
    name: 'WhatsApp Chat',
    shortName: 'WhatsApp',
    icon: 'MessageSquare',
    badge: 'High Conversion',
    title: 'Free WhatsApp QR Code Generator – Direct Chat Link | QR Here',
    metaDescription: 'Create a WhatsApp QR code that launches a direct conversation with your phone number and pre-filled greeting. Free, no sign-up.',
    keywords: [
      'whatsapp qr code generator',
      'whatsapp chat link qr code',
      'create whatsapp qr code',
      'whatsapp direct message qr',
      'free whatsapp qr maker',
      'scan to whatsapp',
    ],
    h1: 'WhatsApp QR Code Generator',
    promise: 'Free · No sign-up · Direct chat link',
    intro: 'Make a WhatsApp QR code that opens a chat with your number, with an optional pre-filled message. Great for shops and support. Free.',
    fields: [
      {
        name: 'countryCode',
        label: 'Country Dial Code',
        type: 'select',
        options: COUNTRY_DIAL_CODES.map((c) => ({ value: c.code.replace('+', ''), label: `${c.flag} ${c.country} (${c.code})` })),
        defaultValue: '',
      },
      {
        name: 'phone',
        label: 'WhatsApp Phone Number',
        type: 'tel',
        placeholder: '5551234567 (digits only, no spaces)',
        help: 'Enter digits only without leading zero or plus sign.',
        required: true,
        defaultValue: '',
      },
      {
        name: 'message',
        label: 'Pre-filled Welcome Message (optional)',
        type: 'textarea',
        placeholder: 'Hi! I would like to inquire about your services...',
        help: 'This text will appear in the user’s WhatsApp message bar ready to send.',
        defaultValue: '',
      },
    ],
    defaultValues: {
      countryCode: '',
      phone: '',
      message: '',
    },
    exampleValues: {
      countryCode: '44',
      phone: '7911123456',
      message: 'Hi, I would like to book a table for 2 this Friday at 7pm.',
    },
    buildPayload: (data) => {
      const cleanCode = (data.countryCode || '').replace(/\D/g, '');
      const cleanPhone = (data.phone || '').replace(/\D/g, '').replace(/^0+/, '');
      const fullNumber = cleanPhone ? `${cleanCode}${cleanPhone}` : '';
      const msg = (data.message || '').trim();
      if (!fullNumber) {
        return '';
      }
      if (!msg) {
        return `https://wa.me/${fullNumber}`;
      }
      return `https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`;
    },
    validate: (data) => {
      const cleanPhone = (data.phone || '').replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length < 5) {
        return { valid: false, message: 'Please enter a valid WhatsApp phone number.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera displays a WhatsApp link. One tap opens WhatsApp with a new chat addressed to your number, with your pre-written welcome message already typed and ready to hit send.',
    stepsHeading: 'How to create a QR code for WhatsApp',
    steps: [
      { title: 'Enter country code & number', desc: 'Select your country code and type your active WhatsApp phone number.' },
      { title: 'Add a welcome message', desc: 'Create a pre-filled greeting so customers know how to kick off the conversation.' },
      { title: 'Download with WhatsApp logo', desc: 'Choose the WhatsApp green palette and embed the official WhatsApp icon.' },
    ],
    useCasesHeading: 'Popular use cases for WhatsApp QR Codes',
    useCases: [
      { title: 'Customer Support Desk', desc: 'Place on your website and invoices so clients get fast, personal support via chat.' },
      { title: 'Restaurant Reservations', desc: 'Let guests send quick reservation requests without waiting on busy phone lines.' },
      { title: 'Product Catalog Inquiries', desc: 'Add to product packaging so buyers can ask questions or register warranties.' },
      { title: 'Real Estate Yard Signs', desc: 'Allow house hunters to ask for listing brochures and pricing on the spot.' },
      { title: 'E-commerce Delivery Help', desc: 'Include in package boxes for immediate assistance with returns or sizing.' },
      { title: 'Local Service Quotes', desc: 'Contractors can receive job photos and quote requests straight to their phone.' },
    ],
    tipsHeading: 'Tips for Make best WhatsApp QR codes',
    bestPractices: [
      { title: 'Do not include + or spaces in number', desc: 'The wa.me protocol strictly requires clean digits with country code.' },
      { title: 'Keep greeting messages friendly', desc: 'A clear opening prompt makes it effortless for new customers to tap send.' },
      { title: 'Use the WhatsApp icon', desc: 'Adding the familiar green WhatsApp logo dramatically increases scan rates.' },
      { title: 'Verify on WhatsApp first', desc: 'Make sure the phone number has an active WhatsApp or WhatsApp Business account.' },
      { title: 'Include a "Chat with us" frame', desc: 'Frame the QR code with clear call-to-action text so users know what to expect.' },
    ],
    faqs: [
      { question: 'Does the WhatsApp QR code expire?', answer: 'No. Because it uses the official static wa.me URL format, it never expires and will function as long as your phone number remains registered on WhatsApp.' },
      { question: 'Can customers message me without saving my contact?', answer: 'Yes! That is the main power of WhatsApp QR codes. Scanning opens a direct chat window without requiring the user to add you to their address book.' },
      { question: 'Does this work with WhatsApp Business?', answer: 'Yes, it works identically with both personal WhatsApp accounts and WhatsApp Business accounts.' },
      { question: 'Can I track how many people scanned it?', answer: 'Static QR codes do not include server-side trackers. To track clicks, you can use a customized tracking link or look at incoming chat message volume.' },
      { question: 'Does QR Here charge any fees or show ads?', answer: 'No fees, no subscriptions, and no ads. QR Here is 100% free forever.' },
    ],
    relatedTypes: ['phone', 'sms', 'vcard', 'url'],
  },
  {
    id: 'email',
    slug: 'qr-code-generator-email',
    name: 'Email Message',
    shortName: 'Email',
    icon: 'Mail',
    badge: 'Lead Gen',
    title: 'Free Email QR Code Generator – Pre-filled Message | QR Here',
    metaDescription: 'Create a custom email QR code with pre-filled recipient address, subject line, and body message. Scan to send instantly. Free, private, no sign-up.',
    keywords: [
      'email qr code generator',
      'mailto qr code',
      'pre-filled email qr code',
      'scan to email qr code',
      'free email qr maker',
      'email barcode generator',
    ],
    h1: 'Email QR Code Generator',
    promise: 'Free · No sign-up · Standard mailto protocol',
    intro: 'Create an email QR code that opens a new message with the recipient, subject, and text already filled in. Free, fast, no sign-up.',
    fields: [
      { name: 'email', label: 'Recipient Email Address', type: 'email', placeholder: 'support@example.com', required: true, defaultValue: '' },
      { name: 'subject', label: 'Subject Line', type: 'text', placeholder: 'Product Inquiry / Support Request', defaultValue: '' },
      { name: 'body', label: 'Email Body Message (optional)', type: 'textarea', placeholder: 'Hi team, I would like to learn more about...', defaultValue: '' },
    ],
    defaultValues: {
      email: '',
      subject: '',
      body: '',
    },
    exampleValues: {
      email: 'orders@bakery.com',
      subject: 'Custom Cake Order Request',
      body: 'Hello,\n\nI would like to order a custom cake for an event on...',
    },
    buildPayload: (data) => {
      const email = (data.email || '').trim();
      const params = new URLSearchParams();
      if (data.subject) params.set('subject', data.subject.trim());
      if (data.body) params.set('body', data.body.trim());
      const qs = params.toString();
      if (!email && !qs) return '';
      return qs ? `mailto:${email}?${qs}` : `mailto:${email}`;
    },
    validate: (data) => {
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        return { valid: false, message: 'Please enter a valid email address.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera opens the user’s email client (Apple Mail, Gmail, Outlook) with the recipient, subject line, and body text pre-populated and ready for the user to review and send.',
    stepsHeading: 'How to create a QR code for Email',
    steps: [
      { title: 'Enter email details', desc: 'Specify recipient address, subject line, and default template text.' },
      { title: 'Style with colors', desc: 'Select matching brand colors and embed an envelope mail icon.' },
      { title: 'Export for print', desc: 'Download in SVG or PNG format to add to flyers, brochures, or packaging.' },
    ],
    useCasesHeading: 'Popular use cases for Email QR Codes',
    useCases: [
      { title: 'Customer Feedback', desc: 'Print on receipts with subject "Feedback: Store #102" for easy customer reviews.' },
      { title: 'Job Application Signs', desc: 'Let candidates quickly send an email inquiry with subject "Resume - Sales Role".' },
      { title: 'Warranty Registration', desc: 'Pre-fill model serial numbers in the email body for fast product registration.' },
      { title: 'RSVP Collection', desc: 'Enable guests to RSVP for weddings and corporate gatherings with one tap.' },
      { title: 'Direct Helpdesk Access', desc: 'Add to hardware manuals for direct access to Tier-1 technical support.' },
      { title: 'Press & Media Contact', desc: 'Include on media kits so journalists can request interviews instantly.' },
    ],
    tipsHeading: 'Tips for Make best Email QR codes',
    bestPractices: [
      { title: 'Use clear subject lines', desc: 'A descriptive subject makes it easy to organize incoming emails with mailbox filters.' },
      { title: 'Keep the body concise', desc: 'Short pre-filled messages maintain smaller, more scannable QR matrix patterns.' },
      { title: 'Double-check email spelling', desc: 'Ensure your recipient address is accurate before mass-producing printed materials.' },
      { title: 'Test across email clients', desc: 'Test scanning on both iOS Mail and Android Gmail to ensure characters format cleanly.' },
      { title: 'Add a "Scan to Email" CTA', desc: 'Use our banner frames so users immediately recognize the purpose of the code.' },
    ],
    faqs: [
      { question: 'Will scanning automatically send the email?', answer: 'No. For user security, all email clients require the user to review the pre-filled message and explicitly tap the Send button.' },
      { question: 'Which email apps are supported?', answer: 'All standard email applications (Apple Mail, Gmail, Outlook, Yahoo, Thunderbird) respond to the universal mailto protocol.' },
      { question: 'Does this code ever expire?', answer: 'No, static mailto QR codes never expire. They work indefinitely as long as your email address remains active.' },
      { question: 'Can I include multiple recipients?', answer: 'Yes, you can separate multiple email addresses with commas in the recipient field.' },
      { question: 'Is my email address harvested by QR Here?', answer: 'No. Everything is processed locally in your browser. We never collect, store, or sell email addresses.' },
    ],
    relatedTypes: ['vcard', 'phone', 'url', 'sms'],
  },
  {
    id: 'phone',
    slug: 'qr-code-generator-phone',
    name: 'Phone Call',
    shortName: 'Phone',
    icon: 'Phone',
    badge: 'Direct Call',
    title: 'Free Phone Number QR Code Generator – Scan to Call | QR Here',
    metaDescription: 'Generate a phone number QR code that opens the smartphone dialer ready to call in one scan. Free, static, and never expires.',
    keywords: [
      'phone number qr code generator',
      'call qr code',
      'scan to call qr code',
      'tel qr code',
      'free phone call qr code',
      'phone call barcode',
    ],
    h1: 'Phone Number QR Code Generator',
    promise: 'Free · No sign-up · Instant dialer launch',
    intro: 'Generate a phone number QR code that dials your number the moment it\'s scanned. Ideal for flyers, shop windows, and business cards.',
    fields: [
      {
        name: 'countryCode',
        label: 'Country Dial Code',
        type: 'select',
        options: COUNTRY_DIAL_CODES.map((c) => ({ value: c.code, label: `${c.flag} ${c.country} (${c.code})` })),
        defaultValue: '',
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '555 123 4567',
        required: true,
        defaultValue: '',
      },
    ],
    defaultValues: {
      countryCode: '',
      phone: '',
    },
    exampleValues: {
      countryCode: '+1',
      phone: '800 555 0199',
    },
    buildPayload: (data) => {
      const code = (data.countryCode || '').trim();
      const num = (data.phone || '').replace(/[^\d+]/g, '');
      if (!num) return '';
      return `tel:${code}${num.replace(/^\+/, '')}`;
    },
    validate: (data) => {
      const num = (data.phone || '').replace(/\D/g, '');
      if (!num || num.length < 5) {
        return { valid: false, message: 'Please enter a valid telephone number.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera detects the tel: protocol and prompts: "Call [Phone Number]". Tapping the prompt opens the native dialer with the number dialed and waiting for the user to press Call.',
    stepsHeading: 'How to create a QR code for Phone Numbers',
    steps: [
      { title: 'Select country & number', desc: 'Pick your country dial code and type your phone number.' },
      { title: 'Customize style', desc: 'Apply a phone handset icon and choose a callout frame.' },
      { title: 'Print on signs', desc: 'Export high-res files to put on vehicles, signs, or business cards.' },
    ],
    useCasesHeading: 'Popular use cases for Phone Number QR Codes',
    useCases: [
      { title: 'Emergency Hotlines', desc: 'Display in public facilities and job sites for quick emergency access.' },
      { title: 'Towing & Roadside Assistance', desc: 'Place on parking lot signs so stranded drivers can call immediately.' },
      { title: 'Customer Support Lines', desc: 'Print on delivery receipts and product labels for quick telephone assistance.' },
      { title: 'Takeout Ordering', desc: 'Restaurants can enable quick phone orders directly from printed flyers.' },
      { title: 'Service Fleet Vehicles', desc: 'Add to company vans so potential clients can call while on the road.' },
      { title: 'Real Estate Yard Signs', desc: 'Allow interested buyers to contact the listing agent while standing outside.' },
    ],
    tipsHeading: 'Tips for Make best Phone QR codes',
    bestPractices: [
      { title: 'Always include country code', desc: 'Ensures the number dials correctly even if the caller has an international SIM.' },
      { title: 'Ensure high phone line availability', desc: 'Make sure your phone line is staffed during hours where printed codes are visible.' },
      { title: 'Keep the code simple', desc: 'Phone numbers are short, producing minimal, highly robust QR patterns.' },
      { title: 'Add a "Call Us" CTA frame', desc: 'Clearly indicate to users that scanning will initiate a phone call.' },
      { title: 'Test the dialer prompt', desc: 'Scan with iOS and Android to verify no digits are dropped.' },
    ],
    faqs: [
      { question: 'Will scanning automatically make the phone call?', answer: 'No. Operating systems always require the user to confirm the call before initiating dialing, preventing accidental calls.' },
      { question: 'Does a phone number QR code expire?', answer: 'Never. It is a static tel: link that works indefinitely as long as your phone number remains active.' },
      { question: 'Can international callers use this code?', answer: 'Yes, because the code embeds the international + dial prefix, callers from any country can connect without dialing errors.' },
      { question: 'Is any calling data stored by QR Here?', answer: 'None. All generation runs in your browser without any server connection.' },
      { question: 'Can I add an extension number?', answer: 'Some phone systems support pauses with commas (e.g. +15551234567,101), but standard mobile dialers handle direct numbers most reliably.' },
    ],
    relatedTypes: ['sms', 'whatsapp', 'vcard', 'url'],
  },
  {
    id: 'sms',
    slug: 'qr-code-generator-sms',
    name: 'SMS Text Message',
    shortName: 'SMS',
    icon: 'MessageCircle',
    badge: 'Quick Text',
    title: 'Free SMS QR Code Generator – Pre-filled Text | QR Here',
    metaDescription: 'Create an SMS QR code that opens the phone messaging app with recipient number and text ready to send. Free, no sign-up.',
    keywords: [
      'sms qr code generator',
      'text message qr code',
      'smsto qr code',
      'scan to text qr code',
      'free sms qr maker',
      'sms barcode generator',
    ],
    h1: 'SMS QR Code Generator',
    promise: 'Free · No sign-up · Standard SMSTO format',
    intro: 'Create an SMS QR code that opens a text message with your number and message ready to send. Great for sign-ups, offers, and feedback.',
    fields: [
      {
        name: 'countryCode',
        label: 'Country Dial Code',
        type: 'select',
        options: COUNTRY_DIAL_CODES.map((c) => ({ value: c.code, label: `${c.flag} ${c.country} (${c.code})` })),
        defaultValue: '',
      },
      {
        name: 'phone',
        label: 'Recipient Phone Number',
        type: 'tel',
        placeholder: '555 123 4567',
        required: true,
        defaultValue: '',
      },
      {
        name: 'message',
        label: 'Pre-filled Text Message (optional)',
        type: 'textarea',
        placeholder: 'e.g. SUBSCRIBE or WIN2026',
        defaultValue: '',
      },
    ],
    defaultValues: {
      countryCode: '',
      phone: '',
      message: '',
    },
    exampleValues: {
      countryCode: '+1',
      phone: '8005550199',
      message: 'START - Sign me up for VIP weekly discounts',
    },
    buildPayload: (data) => {
      const code = (data.countryCode || '').trim();
      const num = (data.phone || '').replace(/[^\d+]/g, '');
      const full = num ? `${code}${num.replace(/^\+/, '')}` : '';
      const msg = (data.message || '').trim();
      if (!full && !msg) return '';
      return msg ? `SMSTO:${full}:${msg}` : `SMSTO:${full}`;
    },
    validate: (data) => {
      const num = (data.phone || '').replace(/\D/g, '');
      if (!num || num.length < 5) {
        return { valid: false, message: 'Please enter a valid phone number.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera opens the native Messages app with the recipient number in the "To" field and your text pre-populated in the message bubble, ready for one-tap sending.',
    stepsHeading: 'How to create a QR code for SMS',
    steps: [
      { title: 'Enter phone & message', desc: 'Input the recipient mobile number and optional keyword or message.' },
      { title: 'Customize frame', desc: 'Add a "Text Us" or "Scan to SMS" call-to-action banner.' },
      { title: 'Download & deploy', desc: 'Download high-res PNG or vector SVG files.' },
    ],
    useCasesHeading: 'Popular use cases for SMS QR Codes',
    useCases: [
      { title: 'SMS Marketing Opt-Ins', desc: 'Invite customers to scan and text "JOIN" for exclusive discount codes.' },
      { title: 'Contest & Sweepstake Entries', desc: 'Collect event entries by having attendees text a contest keyword.' },
      { title: 'Appointment Confirmations', desc: 'Patients or clients can text "CONFIRM" with their appointment ID.' },
      { title: 'Direct Customer Text Support', desc: 'Offer friendly, instant SMS customer service for busy retail shoppers.' },
      { title: 'Donations & Giving Campaigns', desc: 'Allow supporters to quickly text campaign keywords to charity hotlines.' },
      { title: 'Security Verification', desc: 'Provide an easy way for remote workers to text verification check-ins.' },
    ],
    tipsHeading: 'Tips for Make best SMS QR codes',
    bestPractices: [
      { title: 'Use short keywords', desc: 'Keep opt-in keywords concise (e.g. VIP, SAVE, DEMO) for clean code matrices.' },
      { title: 'Disclose standard SMS rates', desc: 'If using for commercial opt-ins, include a "Msg & data rates may apply" notice.' },
      { title: 'Ensure E.164 phone formatting', desc: 'Always maintain full country codes to avoid misdialed messages.' },
      { title: 'Test on iOS & Android', desc: 'Verify that both operating systems populate both the number and body correctly.' },
      { title: 'Provide clear visual instructions', desc: 'Pair the code with a simple instruction like "Scan with camera to text us".' },
    ],
    faqs: [
      { question: 'Will scanning automatically send the text message?', answer: 'No. Modern smartphones always require the user to hit the Send button, ensuring complete user consent.' },
      { question: 'Does an SMS QR code expire?', answer: 'No, static SMSTO QR codes never expire and continue functioning as long as your phone number accepts SMS.' },
      { question: 'Does it cost money to scan or send?', answer: 'Generating the QR code on QR Here is 100% free. When a user sends the SMS, standard carrier messaging rates may apply depending on their mobile plan.' },
      { question: 'Can I track scan conversions?', answer: 'You can track conversions by looking at the incoming message volume on your phone or SMS automation platform.' },
      { question: 'Is my phone number stored by QR Here?', answer: 'Never. Everything processes in your browser session with zero server uploads.' },
    ],
    relatedTypes: ['whatsapp', 'phone', 'email', 'vcard'],
  },
  {
    id: 'location',
    slug: 'qr-code-generator-location',
    name: 'Location & Map Pin',
    shortName: 'Location',
    icon: 'MapPin',
    badge: 'Navigation',
    title: 'Free Location QR Code Generator – Map Pin | QR Here',
    metaDescription: 'Share any exact location or address with a custom map pin QR code. Scan to open directly in Google Maps or Apple Maps. Free, static, and never expires.',
    keywords: [
      'location qr code generator',
      'google maps qr code',
      'map pin qr code',
      'gps coordinates qr code',
      'get directions qr code',
      'map link qr code',
    ],
    h1: 'Location QR Code Generator',
    promise: 'Free · No sign-up · Direct map navigation',
    intro: 'Turn any address or map pin into a location QR code. One scan opens it in their maps app for instant directions. Free to create.',
    fields: [
      { name: 'latitude', label: 'Latitude', type: 'number', placeholder: '37.7749', required: true, defaultValue: '' },
      { name: 'longitude', label: 'Longitude', type: 'number', placeholder: '-122.4194', required: true, defaultValue: '' },
      { name: 'label', label: 'Location Name / Venue Label', type: 'text', placeholder: 'Conference Center Entrance', defaultValue: '' },
      {
        name: 'format',
        label: 'Link Format',
        type: 'select',
        options: [
          { value: 'google', label: 'Google Maps Link (Universal browser & mobile)' },
          { value: 'geo', label: 'Standard Geo Protocol (geo:lat,lng)' },
        ],
        defaultValue: '',
      },
    ],
    defaultValues: {
      latitude: '',
      longitude: '',
      label: '',
      format: '',
    },
    exampleValues: {
      latitude: '40.7484',
      longitude: '-73.9857',
      label: 'Empire State Building',
      format: 'google',
    },
    buildPayload: (data) => {
      const lat = (data.latitude || '').toString().trim();
      const lng = (data.longitude || '').toString().trim();
      const label = (data.label || '').trim();
      if (!lat || !lng) return '';
      if (data.format === 'geo') {
        return label ? `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})` : `geo:${lat},${lng}`;
      }
      return `https://www.google.com/maps?q=${lat},${lng}`;
    },
    validate: (data) => {
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        return { valid: false, message: 'Please enter a valid latitude between -90 and 90.' };
      }
      if (isNaN(lng) || lng < -180 || lng > 180) {
        return { valid: false, message: 'Please enter a valid longitude between -180 and 180.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera recognizes the GPS coordinates and opens Google Maps or Apple Maps with a pin dropped on your exact spot, ready to guide turn-by-turn directions.',
    stepsHeading: 'How to create a QR code for Location',
    steps: [
      { title: 'Find your coordinates', desc: 'Right-click your location on Google Maps or use your GPS coordinates.' },
      { title: 'Add label & customize', desc: 'Name your venue and pick a map pin icon with custom brand colors.' },
      { title: 'Print on invitations', desc: 'Add to event invitations, brochures, and directional wayfinding signs.' },
    ],
    useCasesHeading: 'Popular use cases for Location QR Codes',
    useCases: [
      { title: 'Wedding & Party Invitations', desc: 'Guide guests effortlessly to remote countryside venues, farms, or beaches.' },
      { title: 'Real Estate Open Houses', desc: 'Ensure buyers navigate straight to the front driveway without getting lost.' },
      { title: 'Hiking Trails & Campgrounds', desc: 'Mark trailheads, campsite numbers, and scenic viewpoints.' },
      { title: 'Food Trucks & Pop-up Shops', desc: 'Share your moving daily parking location with your social media followers.' },
      { title: 'Parking Lot Entrances', desc: 'Direct concert or stadium attendees to the designated parking gate.' },
      { title: 'Historic Monuments', desc: 'Tour guides and landmarks can mark exact points of historical interest.' },
    ],
    tipsHeading: 'Tips for Make best Location QR codes',
    bestPractices: [
      { title: 'Test the pin on Google Maps', desc: 'Paste the coordinates into maps to verify the pin drops at the correct door.' },
      { title: 'Use the Google Maps link format', desc: 'The https:// maps link is universally compatible with every smartphone model.' },
      { title: 'Include nearby landmarks in text', desc: 'Print physical venue directions next to the code as an accessible backup.' },
      { title: 'Add a "Get Directions" frame', desc: 'Our preset directional frames make the code purpose immediately intuitive.' },
      { title: 'Keep contrast sharp', desc: 'Ensure your outdoor directional signage maintains clear contrast in bright sunlight.' },
    ],
    faqs: [
      { question: 'Does a location QR code require mobile data to open?', answer: 'Yes, opening maps and retrieving turn-by-turn routing requires mobile data or Wi-Fi on the user’s phone, though offline saved maps in Google Maps will also navigate.' },
      { question: 'How do I find my latitude and longitude?', answer: 'On Google Maps on desktop, right-click on any spot or building. The top item in the menu displays the exact latitude and longitude—click it to copy.' },
      { question: 'Does this work on Apple Maps?', answer: 'Yes. iPhone users scanning the code are automatically offered the option to open the coordinates in Apple Maps or Google Maps.' },
      { question: 'Can I change the location later?', answer: 'Static QR codes store coordinates permanently in the image. If you move your venue, generate and print a new code.' },
      { question: 'Does QR Here track where I place pins?', answer: 'No. All coordinates are handled strictly on your device inside your web browser.' },
    ],
    relatedTypes: ['event', 'url', 'vcard', 'wifi'],
  },
  {
    id: 'event',
    slug: 'qr-code-generator-event',
    name: 'Calendar Event',
    shortName: 'Event',
    icon: 'Calendar',
    badge: 'High Attendance',
    title: 'Free Event QR Code Generator – Add to Calendar | QR Here',
    metaDescription: 'Make a calendar event QR code to add dates and invites to Apple, Google, or Outlook calendar with one scan. Free, no sign-up.',
    keywords: [
      'event qr code generator',
      'calendar qr code',
      'add to calendar qr code',
      'ical qr code',
      'rsvp event qr code',
      'invite qr code',
    ],
    h1: 'Event QR Code Generator',
    promise: 'Free · No sign-up · Universal iCalendar format',
    intro: 'Make an event QR code with date, time, and venue. Guests scan once and save it to their calendar. Perfect for invitations and posters.',
    fields: [
      { name: 'title', label: 'Event Title', type: 'text', placeholder: 'Annual Summer Gala 2026', required: true, defaultValue: '' },
      { name: 'startDate', label: 'Start Date & Time', type: 'datetime-local', required: true, defaultValue: '' },
      { name: 'endDate', label: 'End Date & Time', type: 'datetime-local', required: true, defaultValue: '' },
      { name: 'allDay', label: 'All-Day Event', type: 'checkbox', defaultValue: false },
      { name: 'location', label: 'Event Location / Link', type: 'text', placeholder: 'Grand Ballroom, 100 Main St, Chicago', defaultValue: '' },
      { name: 'description', label: 'Event Description / Notes', type: 'textarea', placeholder: 'Formal attire. Keynote begins promptly at 7 PM.', defaultValue: '' },
    ],
    defaultValues: {
      title: '',
      startDate: '',
      endDate: '',
      allDay: false,
      location: '',
      description: '',
    },
    exampleValues: {
      title: 'Global Tech Summit 2026',
      startDate: '2026-10-10T09:00',
      endDate: '2026-10-12T17:00',
      allDay: false,
      location: 'Moscone Convention Center, San Francisco',
      description: 'Keynotes, workshops, and startup expo.',
    },
    buildPayload: (data) => {
      if (!data.title && !data.startDate) return '';
      const formatTime = (dtStr: string, allDay: boolean) => {
        if (!dtStr) return '';
        const d = new Date(dtStr);
        if (isNaN(d.getTime())) return '';
        if (allDay) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${y}${m}${day}`;
        }
        return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      };

      const start = formatTime(data.startDate, data.allDay);
      const end = formatTime(data.endDate || data.startDate, data.allDay);

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${(data.title || 'Event').trim()}`,
      ];

      if (data.allDay) {
        lines.push(`DTSTART;VALUE=DATE:${start}`);
        if (end) lines.push(`DTEND;VALUE=DATE:${end}`);
      } else {
        if (start) lines.push(`DTSTART:${start}`);
        if (end) lines.push(`DTEND:${end}`);
      }

      if (data.location) lines.push(`LOCATION:${data.location.trim()}`);
      if (data.description) lines.push(`DESCRIPTION:${data.description.trim()}`);
      lines.push('END:VEVENT');
      lines.push('END:VCALENDAR');
      return lines.join('\n');
    },
    validate: (data) => {
      if (!data.title || !data.title.trim()) {
        return { valid: false, message: 'Please enter an event title.' };
      }
      if (!data.startDate) {
        return { valid: false, message: 'Please enter an event start date and time.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The smartphone reads the iCalendar event and prompts: "Add to Calendar". Tapping opens the user’s default calendar with title, date, time, location, and description pre-loaded.',
    stepsHeading: 'How to create a QR code for Calendar Events',
    steps: [
      { title: 'Set date, time & details', desc: 'Enter your event name, start and end times, and venue address.' },
      { title: 'Pick an event theme', desc: 'Choose stylish calendar icons and color palettes matching your invitation.' },
      { title: 'Print on flyers & invites', desc: 'Export scalable vector SVG for print production or PNG for digital invites.' },
    ],
    useCasesHeading: 'Popular use cases for Event QR Codes',
    useCases: [
      { title: 'Wedding Invitations', desc: 'Ensure guests save your ceremony and reception times without manual calendar entry.' },
      { title: 'Concerts & Festivals', desc: 'Add to promotional posters so fans save tour dates right as they walk by.' },
      { title: 'Conferences & Workshops', desc: 'Include in agendas so attendees bookmark keynotes and breakout sessions.' },
      { title: 'School & Academic Calendars', desc: 'Distribute term start dates, parent-teacher conferences, and sports days.' },
      { title: 'Product Launches & Webinars', desc: 'Boost live stream attendance by saving the exact launch countdown in calendars.' },
      { title: 'Community Fundraisers', desc: 'Place on neighborhood banners to maximize volunteer turnout.' },
    ],
    tipsHeading: 'Tips for Make best Event QR codes',
    bestPractices: [
      { title: 'Always set end times', desc: 'Setting an end time blocks out the full duration in attendee calendars.' },
      { title: 'Include full address in location', desc: 'Allows mobile calendars to trigger automatic travel time notifications.' },
      { title: 'Add reminder notes in description', desc: 'Include parking tips, dress code, or video conference links in notes.' },
      { title: 'Use high-contrast print designs', desc: 'Event codes have moderate density; ensure crisp print sizes.' },
      { title: 'Test across calendar apps', desc: 'Scan on both iPhone and Android to verify timezone conversion.' },
    ],
    faqs: [
      { question: 'Which calendar apps work with this QR code?', answer: 'All major calendar clients, including Apple Calendar on iOS and Mac, Google Calendar on Android, Microsoft Outlook, and Yahoo Calendar.' },
      { question: 'How do timezones work?', answer: 'The event time is saved using universal UTC time formatting, meaning attendees in different timezones will see the event adjusted automatically to their local clock.' },
      { question: 'Will this code expire after the event?', answer: 'The QR code remains scannable forever. However, once the event date passes, calendars will add it to the past events archive.' },
      { question: 'Can attendees get push notifications?', answer: 'Yes! Once saved to their personal calendar, their phone will trigger default event alerts (e.g. 15 minutes before).' },
      { question: 'Is my event data collected by QR Here?', answer: 'Never. The iCalendar payload is built entirely in your browser with zero server uploads.' },
    ],
    relatedTypes: ['location', 'url', 'vcard', 'email'],
  },
  {
    id: 'paypal',
    slug: 'qr-code-generator-paypal',
    name: 'PayPal Payment',
    shortName: 'PayPal',
    icon: 'DollarSign',
    badge: 'Get Paid',
    title: 'Free PayPal QR Code Generator – Get Paid | QR Here',
    metaDescription: 'Create a PayPal.Me QR code for instant cashless payments and tips. Free, private, and connects directly to your PayPal account.',
    keywords: [
      'paypal qr code generator',
      'paypal me qr code',
      'payment qr code',
      'tip jar qr code',
      'cashless payment qr code',
      'receive money qr code',
    ],
    h1: 'PayPal QR Code Generator',
    promise: 'Free · No sign-up · Secure PayPal.Me link',
    intro: 'Create a PayPal QR code from your PayPal.Me link so customers can pay or tip you in seconds. Free, printable, and easy to use.',
    fields: [
      { name: 'username', label: 'PayPal.Me Username', type: 'text', placeholder: 'yourusername', required: true, defaultValue: '' },
      { name: 'amount', label: 'Preset Amount (optional)', type: 'number', placeholder: '25.00' },
      {
        name: 'currency',
        label: 'Currency',
        type: 'select',
        options: [
          { value: 'USD', label: 'USD ($)' },
          { value: 'EUR', label: 'EUR (€)' },
          { value: 'GBP', label: 'GBP (£)' },
          { value: 'CAD', label: 'CAD ($)' },
          { value: 'AUD', label: 'AUD ($)' },
          { value: 'JPY', label: 'JPY (¥)' },
        ],
        defaultValue: '',
      },
    ],
    defaultValues: {
      username: '',
      amount: '',
      currency: '',
    },
    exampleValues: {
      username: 'coffeestall',
      amount: '5.00',
      currency: 'USD',
    },
    buildPayload: (data) => {
      const user = (data.username || '').replace(/^@/, '').trim();
      const amt = (data.amount || '').toString().trim();
      const cur = data.currency || 'USD';
      if (!user) return '';
      if (amt && parseFloat(amt) > 0) {
        return `https://paypal.me/${user}/${amt}${cur}`;
      }
      return `https://paypal.me/${user}`;
    },
    validate: (data) => {
      const user = (data.username || '').trim();
      if (!user) {
        return { valid: false, message: 'Please enter your PayPal.Me username.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera opens your secure PayPal.Me checkout page. The user logs in to PayPal or uses a debit/credit card to complete payment in seconds.',
    stepsHeading: 'How to create a QR code for PayPal',
    steps: [
      { title: 'Enter PayPal.Me username', desc: 'Input your public PayPal.Me handle without spaces or @ symbols.' },
      { title: 'Specify optional amount', desc: 'Lock in a fixed product price or leave blank to let the customer enter any amount.' },
      { title: 'Download & collect payments', desc: 'Display at checkout counters, restaurant tip jars, or market stalls.' },
    ],
    useCasesHeading: 'Popular use cases for PayPal QR Codes',
    useCases: [
      { title: 'Farmer’s Markets & Stalls', desc: 'Accept cashless payments without renting expensive merchant card terminals.' },
      { title: 'Tip Jars & Performers', desc: 'Enable quick digital tips for musicians, baristas, valets, and tour guides.' },
      { title: 'Freelancers & Contractors', desc: 'Print on printed invoices so clients can pay balances the moment work is completed.' },
      { title: 'Garage Sales & Fundraisers', desc: 'Eliminate the need to handle cash and loose change during community sales.' },
      { title: 'Club Dues & Sports Teams', desc: 'Collect tournament registration and jersey fees effortlessly from players.' },
      { title: 'Art & Craft Fairs', desc: 'Place next to each piece of artwork so shoppers can pay immediately.' },
    ],
    tipsHeading: 'Tips for Make best PayPal QR codes',
    bestPractices: [
      { title: 'Double-check your username', desc: 'Always test-scan the code to verify your PayPal profile loads before printing.' },
      { title: 'Leave amount blank for flexible tips', desc: 'Leaving the amount field empty gives customers total freedom on payment size.' },
      { title: 'Use the PayPal blue styling', desc: 'Our PayPal design preset applies familiar colors that build trust.' },
      { title: 'Print in visible, well-lit spots', desc: 'Ensure customers have good light to scan their cameras comfortably.' },
      { title: 'State accepted payment methods', desc: 'Remind buyers that PayPal.Me accepts both PayPal balances and major credit cards.' },
    ],
    faqs: [
      { question: 'Does PayPal charge a fee for receiving money?', answer: 'Standard PayPal merchant or friends & family fees apply depending on your PayPal account type. QR Here charges 0% fees.' },
      { question: 'Do customers need a PayPal account to pay?', answer: 'In most regions, PayPal.Me allows customers to pay with a debit or credit card as a guest without creating an account.' },
      { question: 'Can I set a fixed price for an item?', answer: 'Yes. Enter an amount and currency in the generator, and the payment screen will pre-fill that exact amount.' },
      { question: 'Does a PayPal QR code expire?', answer: 'No. The PayPal.Me link is static and works indefinitely as long as your PayPal account is active.' },
      { question: 'Is my financial data secure?', answer: '100%. Only your public PayPal.Me username is stored in the QR code. No passwords or banking numbers are ever involved.' },
    ],
    relatedTypes: ['bitcoin', 'url', 'vcard', 'text'],
  },
  {
    id: 'bitcoin',
    slug: 'qr-code-generator-bitcoin',
    name: 'Bitcoin Wallet',
    shortName: 'Bitcoin',
    icon: 'Coins',
    badge: 'Crypto Direct',
    title: 'Free Bitcoin QR Code Generator – Wallet Address | QR Here',
    metaDescription: 'Generate a Bitcoin wallet QR code using the BIP-21 URI standard. Encode address, optional BTC amount, and payment memo. Free & private.',
    keywords: [
      'bitcoin qr code generator',
      'btc wallet qr code',
      'crypto qr code generator',
      'bip21 qr code',
      'scan to pay bitcoin',
      'crypto address qr code',
    ],
    h1: 'Bitcoin QR Code Generator',
    promise: 'Free · No sign-up · BIP-21 standard compliant',
    intro: 'Generate a Bitcoin QR code from your wallet address, with an optional amount. Always double-check the address before sharing.',
    fields: [
      { name: 'address', label: 'Bitcoin Wallet Address', type: 'text', placeholder: 'bc1q... or 1... or 3...', required: true, defaultValue: '' },
      { name: 'amount', label: 'Amount in BTC (optional)', type: 'number', placeholder: '0.005' },
      { name: 'label', label: 'Recipient Label / Name (optional)', type: 'text', placeholder: 'Satoshi Store', defaultValue: '' },
      { name: 'message', label: 'Payment Note / Message (optional)', type: 'text', placeholder: 'Invoice #1049', defaultValue: '' },
    ],
    defaultValues: {
      address: '',
      amount: '',
      label: '',
      message: '',
    },
    exampleValues: {
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      amount: '0.015',
      label: 'Donation Fund',
      message: 'Open source contribution',
    },
    buildPayload: (data) => {
      const addr = (data.address || '').trim();
      if (!addr) return '';
      const params = new URLSearchParams();
      if (data.amount && parseFloat(data.amount) > 0) {
        params.set('amount', data.amount.toString().trim());
      }
      if (data.label) params.set('label', data.label.trim());
      if (data.message) params.set('message', data.message.trim());
      const qs = params.toString();
      return qs ? `bitcoin:${addr}?${qs}` : `bitcoin:${addr}`;
    },
    validate: (data) => {
      const addr = (data.address || '').trim();
      if (!addr) {
        return { valid: false, message: 'Please enter a Bitcoin wallet address.' };
      }
      if (!/^(1|3|bc1|tb1)[a-zA-HJ-NP-Z0-9]{25,62}$/.test(addr)) {
        return { valid: false, message: 'Please enter a valid Bitcoin address (Legacy, SegWit, or Taproot).' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'Crypto wallet apps (Trust Wallet, BlueWallet, Coinbase, Exodus) recognize the BIP-21 URI and populate the destination address, amount in BTC, and memo automatically.',
    stepsHeading: 'How to create a QR code for Bitcoin',
    steps: [
      { title: 'Paste your BTC address', desc: 'Enter your SegWit, Taproot, or Legacy Bitcoin receiving address.' },
      { title: 'Add optional amount', desc: 'Specify requested BTC value and merchant memo.' },
      { title: 'Double check & print', desc: 'Verify the address visually, then export high-resolution vector SVG or PNG.' },
    ],
    useCasesHeading: 'Popular use cases for Bitcoin QR Codes',
    useCases: [
      { title: 'Crypto Merchant Checkouts', desc: 'Accept Bitcoin directly at retail checkout registers without middleman fees.' },
      { title: 'Donation Pages & Livestreams', desc: 'Display on YouTube or Twitch streams for direct cryptocurrency tips.' },
      { title: 'Cold Storage Paper Backups', desc: 'Print backup receiving addresses for hardware cold storage wallets.' },
      { title: 'Invoices for Remote Work', desc: 'Send clients a scannable invoice code for instant peer-to-peer settlement.' },
      { title: 'Conferences & Meetups', desc: 'Collect attendee registration fees in native Bitcoin.' },
      { title: 'Peer-to-Peer Splitting', desc: 'Split dinner tabs and travel costs with friends using mobile wallets.' },
    ],
    tipsHeading: 'Tips for Make best Bitcoin QR codes',
    bestPractices: [
      { title: 'Verify address characters', desc: 'Always compare the first and last 6 characters of the generated code with your wallet.' },
      { title: 'Use high error correction', desc: 'Set Error Correction to Level Q or H to prevent scanner misreads on paper.' },
      { title: 'Never share private keys', desc: 'Only encode your public receiving address—never input private seed phrases.' },
      { title: 'Test with a small transaction', desc: 'Scan and send a tiny test amount before distributing large print runs.' },
      { title: 'Add the official Bitcoin logo', desc: 'Our built-in Bitcoin orange preset clearly indicates cryptocurrency acceptance.' },
    ],
    faqs: [
      { question: 'Does this work with all Bitcoin wallets?', answer: 'Yes! BIP-21 is the universal standard adopted by virtually all modern cryptocurrency wallets on iOS, Android, and hardware devices.' },
      { question: 'Can I receive other cryptocurrencies?', answer: 'This generator specifically builds Bitcoin (BTC) URI payloads. Check that senders are sending native BTC to avoid lost funds.' },
      { question: 'Does a Bitcoin QR code expire?', answer: 'No. The address encoded is static and will accept funds as long as your wallet exists.' },
      { question: 'Are my wallet addresses tracked by QR Here?', answer: 'No. Everything executes in client-side JavaScript. We do not store, log, or track wallet addresses or payment amounts.' },
      { question: 'Can I leave the amount empty?', answer: 'Yes. If you omit the amount, the sender can input whatever BTC amount they choose in their wallet app.' },
    ],
    relatedTypes: ['paypal', 'url', 'text', 'vcard'],
  },
  {
    id: 'skype',
    slug: 'qr-code-generator-skype',
    name: 'Skype Call / Chat',
    shortName: 'Skype',
    icon: 'Video',
    badge: 'Video & Voice',
    title: 'Free Skype QR Code Generator – Direct Call & Chat | QR Here',
    metaDescription: 'Create a free Skype QR code that launches a direct audio call or chat with one scan. Fast, private, static barcode that never expires with no sign-up.',
    keywords: [
      'skype qr code',
      'skype qr code generator',
      'call on skype qr code',
      'skype chat qr code',
      'create skype qr code',
      'free skype barcode',
    ],
    h1: 'Skype QR Code Generator',
    promise: 'Free · No sign-up · Direct Skype launcher',
    intro: 'Create a Skype QR code that opens a chat or call with your username. Handy for business cards, websites, and email signatures.',
    fields: [
      { name: 'username', label: 'Skype Name / Username', type: 'text', placeholder: 'live:your_skype_id', required: true, defaultValue: '' },
      {
        name: 'action',
        label: 'Action on Scan',
        type: 'select',
        options: [
          { value: 'chat', label: 'Start a Chat Message' },
          { value: 'call', label: 'Start a Voice / Video Call' },
        ],
        defaultValue: '',
      },
    ],
    defaultValues: {
      username: '',
      action: '',
    },
    exampleValues: {
      username: 'live:admissions_office',
      action: 'chat',
    },
    buildPayload: (data) => {
      const user = (data.username || '').trim();
      if (!user) return '';
      const action = data.action || 'chat';
      return `skype:${user}?${action}`;
    },
    validate: (data) => {
      if (!data.username || !data.username.trim()) {
        return { valid: false, message: 'Please enter your Skype username.' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera detects the skype: protocol and launches the Skype app directly into a chat window or audio/video call connection with your profile.',
    stepsHeading: 'How to create a QR code for Skype',
    steps: [
      { title: 'Enter your Skype username', desc: 'Type your Skype name or live ID.' },
      { title: 'Choose chat or call', desc: 'Select whether the code should open a chat or initiate a direct call.' },
      { title: 'Download & share', desc: 'Export high-res files to add to websites, email footers, or printed badges.' },
    ],
    useCasesHeading: 'Popular use cases for Skype QR Codes',
    useCases: [
      { title: 'Virtual Office Hours', desc: 'Professors and tutors can allow students to join drop-in consultation chats.' },
      { title: 'International Customer Support', desc: 'Provide free worldwide voice calling options without international telephone toll charges.' },
      { title: 'Freelancer Client Meetings', desc: 'Include on client proposals so prospective leads can call you directly.' },
      { title: 'Remote Job Interviews', desc: 'Include in candidate invitation letters for rapid video call check-ins.' },
      { title: 'Corporate Contact Directories', desc: 'Place on intranet directories and desk cards for internal peer communication.' },
      { title: 'Consultancy Service Lines', desc: 'Give clients direct access to their assigned financial or legal adviser.' },
    ],
    tipsHeading: 'Tips for Make best Skype QR codes',
    bestPractices: [
      { title: 'Check your Skype privacy settings', desc: 'Ensure your Skype account allows incoming calls and messages from anyone.' },
      { title: 'Use official Skype branding', desc: 'Apply the recognizable Skype blue palette and logo preset.' },
      { title: 'Test on mobile and desktop', desc: 'Verify that Skype opens cleanly when scanned by smartphone cameras.' },
      { title: 'Label chat vs call clearly', desc: 'Let users know whether scanning initiates a message or direct call.' },
      { title: 'Include working hours', desc: 'State when your team is available to respond on Skype.' },
    ],
    faqs: [
      { question: 'Does the user need Skype installed?', answer: 'Yes. The skype: URI protocol automatically triggers the installed Skype application on iOS, Android, Windows, or Mac.' },
      { question: 'Does a Skype QR code expire?', answer: 'No. The static skype: link remains valid forever as long as your Skype username exists.' },
      { question: 'Is this free to use?', answer: 'Yes, both generating the code on QR Here and calling Skype-to-Skype are completely free.' },
      { question: 'Can I change between chat and call later?', answer: 'Because the action is encoded directly into the barcode, generate a new QR code if you want to switch actions.' },
      { question: 'Does QR Here record my Skype username?', answer: 'Never. All generation runs in your browser with zero server logging.' },
    ],
    relatedTypes: ['zoom', 'whatsapp', 'phone', 'email'],
  },
  {
    id: 'zoom',
    slug: 'qr-code-generator-zoom',
    name: 'Zoom Meeting',
    shortName: 'Zoom',
    icon: 'Video',
    badge: 'Virtual Events',
    title: 'Free Zoom Meeting QR Code Generator – 1-Click Join | QR Here',
    metaDescription: 'Generate a free Zoom QR code to let attendees join your meeting or webinar in one scan with pre-filled ID and passcode. Instant download, no sign-up.',
    keywords: [
      'zoom qr code',
      'zoom meeting qr code generator',
      'scan to join zoom meeting',
      'zoom webinar qr code',
      'create zoom qr code',
      'free zoom qr code',
    ],
    h1: 'Zoom Meeting QR Code Generator',
    promise: 'Free · No sign-up · 1-click meeting join',
    intro: 'Turn your Zoom meeting link into a QR code. Attendees scan to join on their phone, no typing needed. Great for classes and events.',
    fields: [
      { name: 'meetingId', label: 'Zoom Meeting ID', type: 'text', placeholder: '123 4567 8901 (digits only)', required: true, defaultValue: '' },
      { name: 'passcode', label: 'Meeting Passcode / Password (optional)', type: 'text', placeholder: 'Enter passcode if required', defaultValue: '' },
    ],
    defaultValues: {
      meetingId: '',
      passcode: '',
    },
    exampleValues: {
      meetingId: '98765432100',
      passcode: 'Design2026',
    },
    buildPayload: (data) => {
      const id = (data.meetingId || '').replace(/\D/g, '');
      const pwd = (data.passcode || '').trim();
      if (!id) return '';
      if (pwd) {
        return `https://zoom.us/j/${id}?pwd=${encodeURIComponent(pwd)}`;
      }
      return `https://zoom.us/j/${id}`;
    },
    validate: (data) => {
      const id = (data.meetingId || '').replace(/\D/g, '');
      if (!id || id.length < 9) {
        return { valid: false, message: 'Please enter a valid Zoom meeting ID (usually 9–11 digits).' };
      }
      return { valid: true };
    },
    whatHappensWhenScanned: 'The phone camera opens the official Zoom join link. Tapping opens the Zoom app directly into your waiting room or meeting without requiring manual ID entry.',
    stepsHeading: 'How to create a QR code for Zoom',
    steps: [
      { title: 'Enter Meeting ID & Passcode', desc: 'Paste your 9–11 digit Zoom meeting ID and optional password.' },
      { title: 'Style with Zoom blue', desc: 'Apply Zoom brand colors and embed the video meeting icon.' },
      { title: 'Share with attendees', desc: 'Embed on slide decks, event flyers, calendar invitations, or emails.' },
    ],
    useCasesHeading: 'Popular use cases for Zoom QR Codes',
    useCases: [
      { title: 'Classroom & Online Lectures', desc: 'Students can scan a printed syllabus to jump straight into morning virtual class.' },
      { title: 'Webinars & Townhalls', desc: 'Include on promotional flyers so attendees can join with one phone tap.' },
      { title: 'Physical Conference Overflow', desc: 'Let attendees in overflow halls join the interactive Q&A session on Zoom.' },
      { title: 'Hybrid Boardroom Meetings', desc: 'Place on conference table tents so participants can sync their personal devices.' },
      { title: 'Support & Onboarding Calls', desc: 'Provide a direct link in confirmation emails for quick virtual consultations.' },
      { title: 'Community Meetups', desc: 'Help remote members join local club gatherings virtually.' },
    ],
    tipsHeading: 'Tips for Make best Zoom QR codes',
    bestPractices: [
      { title: 'Include passcode in the code', desc: 'Embedding the passcode ensures attendees do not get stuck on password prompts.' },
      { title: 'Use Recurring Meeting IDs', desc: 'Use a persistent personal meeting ID if printing physical signs that will stay up for months.' },
      { title: 'Always enable a Waiting Room', desc: 'Maintain host security controls to verify participants before admitting them.' },
      { title: 'Test the join link', desc: 'Scan with your smartphone to verify the Zoom app opens into the correct session.' },
      { title: 'Pair with date and time info', desc: 'Always print the meeting date and timezone right beside the QR code.' },
    ],
    faqs: [
      { question: 'Do attendees need a Zoom account to join?', answer: 'In most configurations, attendees do not need a paid account and can join directly with their name.' },
      { question: 'Does a Zoom QR code expire?', answer: 'Static Zoom codes do not expire on their own; they remain valid as long as your Zoom meeting ID stays scheduled in your Zoom account.' },
      { question: 'Will the passcode be typed automatically?', answer: 'Yes! Because the passcode is embedded into the ?pwd= parameter, Zoom decrypts it and bypasses the password entry screen.' },
      { question: 'Can I use this for Zoom Webinars?', answer: 'Yes, this format works identically for both standard Zoom Meetings and Zoom Webinars.' },
      { question: 'Is any meeting data collected by QR Here?', answer: 'Never. All links are generated locally on your device with zero server logging.' },
    ],
    relatedTypes: ['skype', 'whatsapp', 'event', 'url'],
  },
];

export function getQRType(idOrSlug: string): QRTypeDefinition {
  const found = QR_TYPES.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
  return found || QR_TYPES[0];
}
