import { BarcodeFormatKey } from '../services/qr/barcodeGenerator.service';

export interface BarcodeFAQItem {
  question: string;
  answer: string;
}

export interface BarcodePageConfig {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  subline?: string;
  intro: string;
  preselectedFormat?: BarcodeFormatKey;
  isBulk?: boolean;
  sections: {
    title: string;
    content?: string;
    steps?: { step: number; title?: string; text: string }[];
    table?: { headers: string[]; rows: { col1: string; col2: string; col3?: string }[] };
    subsections?: { title: string; text: string }[];
  }[];
  faqs: BarcodeFAQItem[];
  breadcrumbs: { name: string; path: string }[];
}

export const BARCODE_HUB_CONFIG: BarcodePageConfig = {
  slug: 'barcode-generator',
  path: '/barcode-generator',
  title: 'Free Barcode Generator Online - Code 128, EAN, UPC | QR Here',
  metaDescription: 'Make a barcode in seconds. Pick Code 128, EAN-13, UPC-A, Code 39 or Data Matrix, download PNG or SVG. No signup, and nothing leaves your browser.',
  h1: 'Free Online Barcode Generator',
  subline: "Type your number or text, pick a format, download. That's the whole process.",
  intro: "You don't need an account, an app or a credit card. Type what the barcode should say, choose a format, and download a clean PNG or SVG. Everything is made in your browser, so what you type never reaches our servers.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Barcode Generator', path: '/barcode-generator' },
  ],
  sections: [
    {
      title: 'Make a barcode in 3 quick steps',
      steps: [
        { step: 1, title: 'Type or paste text', text: 'Type or paste your text or number into the generator input box.' },
        { step: 2, title: 'Choose barcode type', text: 'Choose a barcode format. Not sure? Leave it on Code 128.' },
        { step: 3, title: 'Download or print', text: 'Download the PNG or SVG vector, or hit print. We check your input as you type.' },
      ],
    },
    {
      title: 'Which barcode type should you pick?',
      table: {
        headers: ['Format', 'Best Used For', 'Character Support'],
        rows: [
          { col1: 'Code 128', col2: 'Shipping labels, inventory, asset tags', col3: 'Letters, numbers, symbols' },
          { col1: 'Code 39', col2: 'Older systems, ID badges, industrial forms', col3: 'Uppercase letters, numbers, symbols' },
          { col1: 'EAN-13 / EAN-8', col2: 'Retail products sold outside North America', col3: 'Numbers (7-13 digits)' },
          { col1: 'UPC-A / UPC-E', col2: 'Retail products in the US and Canada', col3: 'Numbers (6-12 digits)' },
          { col1: 'ITF-14', col2: 'Outer cartons and shipping cases', col3: 'Numbers (even count / 14 digits)' },
          { col1: 'Data Matrix', col2: 'Tiny labels on electronics and medical parts', col3: 'High-density text & data' },
          { col1: 'PDF417', col2: 'IDs, event tickets, shipping manifests', col3: 'Stacked text & structured data' },
          { col1: 'Aztec', col2: 'Transport tickets and boarding passes', col3: 'Compact 2D matrix' },
        ],
      },
    },
    {
      title: 'Code 128: the one to use if you\'re not sure',
      content: 'Code 128 packs letters, digits and symbols into a short, sturdy barcode and nearly every scanner reads it. It\'s the usual pick for warehouse bins, parcels, and anything you label yourself. Need only this type? Go to the Code 128 barcode generator.',
    },
    {
      title: 'EAN-13 and UPC-A for products (read this before you print)',
      content: 'Quick honesty: this tool draws the barcode, it doesn\'t give you the right to use the number. Shops and marketplaces expect numbers issued by GS1. If you invent a number, it can clash with someone else\'s product. For internal stock, school projects, tests and mock-ups, go ahead. For selling in stores or on big marketplaces, get your numbers from GS1 first, then paste them here. We calculate the check digit for you.',
    },
    {
      title: 'Need a lot of barcodes? Do them in bulk',
      content: 'Paste one value per line, or upload a CSV, and we\'ll make every barcode at once. Download them as a ZIP of images or print a sheet. Handy for inventory, event tickets and asset tags.',
    },
    {
      title: 'PNG, SVG or print: get it the way you need it',
      content: 'PNG for documents and quick posts. SVG when you want it razor sharp at any size, for printing or design software. You can change size, margin, bar colour and whether the number shows underneath. Keep high contrast: dark bars on a light background scan best.',
    },
    {
      title: 'Will it actually scan? Test it right here',
      content: 'Never print a hundred labels before testing one. Open the QR Here scanner, point your camera at the screen, and check that it reads what you typed. You can also upload the PNG and scan it from the file.',
    },
  ],
  faqs: [
    { question: 'Is the barcode generator really free?', answer: 'Yes. No signup, no watermark, no limit on single barcodes.' },
    { question: 'Can I use these barcodes in shops?', answer: 'The image will scan fine. But retail needs numbers registered with GS1, so register first if you plan to sell through shops or big marketplaces.' },
    { question: 'What\'s the difference between Code 128 and Code 39?', answer: 'Code 128 is denser and handles the full keyboard. Code 39 is older, longer and limited to capital letters, numbers and a few symbols. Pick Code 128 unless your system asks for Code 39.' },
    { question: 'Is my data stored anywhere?', answer: 'No. The barcode is generated in your browser. We don\'t see or save your text.' },
    { question: 'Can I make barcodes in bulk?', answer: 'Yes. Paste a list or upload a CSV and download them all together.' },
    { question: 'My barcode won\'t scan. Why?', answer: 'Usual suspects: low contrast, too small, no blank margin around it, or a format that doesn\'t match your scanner. Make it bigger, add margin, and try Code 128.' },
  ],
};

export const BARCODE_DEDICATED_PAGES: Record<string, BarcodePageConfig> = {
  'code-128': {
    slug: 'barcode-generator/code-128',
    path: '/barcode-generator/code-128',
    title: 'Code 128 Barcode Generator - Free, Download PNG or SVG',
    metaDescription: 'Type your text and get a scannable Code 128 barcode. Download PNG or SVG. Free, no signup, and it runs in your browser.',
    h1: 'Free Code 128 Barcode Generator',
    subline: 'Create high-density Code 128 linear barcodes instantly in your browser.',
    intro: 'Code 128 is the industry workhorse for shipping, inventory control, and asset tracking. Type your text or numbers below to generate an instant, perfectly scannable Code 128 barcode.',
    preselectedFormat: 'CODE_128',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'Code 128', path: '/barcode-generator/code-128' },
    ],
    sections: [
      {
        title: 'How to make a Code 128 barcode',
        content: 'Code 128 supports the entire ASCII character set including uppercase and lowercase letters, numbers, and punctuation marks. Simply type your text into the generator above, adjust the bar width and height if needed, and click download.',
      },
      {
        title: 'Code 128A, 128B or 128C? We pick for you',
        content: 'Code 128 automatically optimizes character sets (Subset A, B, and C) behind the scenes to produce the shortest and most efficient barcode possible without requiring you to manually configure formatting subsets.',
      },
      {
        title: 'Where Code 128 is used',
        content: 'Code 128 is widely adopted across logistics, supply chain management, healthcare, warehouse management, and retail packaging due to its exceptional data density and reliability.',
      },
    ],
    faqs: [
      { question: 'What is Code 128?', answer: 'Code 128 is a high-density linear barcode symbology capable of encoding full ASCII character text.' },
      { question: 'Can Code 128 encode lowercase letters?', answer: 'Yes, Code 128 supports uppercase and lowercase letters, numbers, and symbols.' },
      { question: 'Is this generator free?', answer: 'Yes, 100% free with no registration or limits.' },
    ],
  },
  'bulk': {
    slug: 'barcode-generator/bulk',
    path: '/barcode-generator/bulk',
    title: 'Bulk Barcode Generator - Paste a List, Get Every Barcode',
    metaDescription: 'Paste up to 100 values or upload a CSV and download all your barcodes in one ZIP. Free, no signup, nothing uploaded to a server.',
    h1: 'Bulk Barcode Generator',
    subline: 'Generate up to 100 barcodes simultaneously from a text list or CSV file.',
    intro: 'Need to create multiple barcodes for inventory tags, product batches, or event badges? Paste your list of codes below or upload a CSV file and download all generated PNG or SVG barcodes in a single ZIP archive.',
    isBulk: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'Bulk Barcode', path: '/barcode-generator/bulk' },
    ],
    sections: [
      {
        title: 'Make many barcodes in three steps',
        steps: [
          { step: 1, title: 'Paste your values', text: 'Paste up to 100 text strings or numbers, one per line.' },
          { step: 2, title: 'Select format', text: 'Choose your desired barcode symbology (e.g., Code 128, Code 39).' },
          { step: 3, title: 'Download ZIP', text: 'Click generate and download your complete ZIP archive instantly.' },
        ],
      },
      {
        title: 'CSV format that works',
        content: 'Your CSV or text input can include optional custom filenames on each line separated by a comma (e.g. "SKU12345, product_label").',
      },
      {
        title: 'Print a sheet of labels',
        content: 'Use our printable grid view to print sheets of barcodes directly from your browser without cutting individual files.',
      },
    ],
    faqs: [
      { question: 'How many barcodes can I make in bulk?', answer: 'You can generate up to 100 barcodes at once in a single batch.' },
      { question: 'What file format is downloaded?', answer: 'Barcodes are bundled into a standard .zip archive containing PNG or SVG images.' },
      { question: 'Is my data uploaded to a server?', answer: 'No. All batch processing occurs entirely within your browser memory.' },
    ],
  },
  'data-matrix': {
    slug: 'barcode-generator/data-matrix',
    path: '/barcode-generator/data-matrix',
    title: 'Data Matrix Barcode Generator - Free and Instant',
    metaDescription: 'Turn any text or number into a Data Matrix code and download it as PNG or SVG. Free, no signup, runs in your browser.',
    h1: 'Free Data Matrix Barcode Generator',
    subline: 'Create high-density 2D Data Matrix codes instantly.',
    intro: 'Data Matrix codes encode large amounts of data in a very small space. Perfect for electronic components, surgical instruments, and small labels.',
    preselectedFormat: 'DATA_MATRIX',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'Data Matrix', path: '/barcode-generator/data-matrix' },
    ],
    sections: [
      { title: 'What is a Data Matrix?', content: 'A 2D matrix barcode consisting of black and white square cells arranged in either a rectangular or square pattern.' },
    ],
    faqs: [
      { question: 'What is Data Matrix used for?', answer: 'Small items, electronic parts, and medical devices.' },
    ],
  },
  'code-39': {
    slug: 'barcode-generator/code-39',
    path: '/barcode-generator/code-39',
    title: 'Code 39 Barcode Generator - Free Online Maker',
    metaDescription: 'Create a Code 39 barcode in seconds. Download PNG or SVG. No signup, works in your browser.',
    h1: 'Free Code 39 Barcode Generator',
    subline: 'Create industrial Code 39 barcodes instantly.',
    intro: 'Code 39 is widely used for industrial tracking, automotive badges, and inventory identification.',
    preselectedFormat: 'CODE_39',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'Code 39', path: '/barcode-generator/code-39' },
    ],
    sections: [
      { title: 'About Code 39', content: 'Supports uppercase letters, numbers, and basic punctuation.' },
    ],
    faqs: [
      { question: 'Does Code 39 support lowercase?', answer: 'No, Code 39 standard encodes uppercase letters.' },
    ],
  },
  'pdf417': {
    slug: 'barcode-generator/pdf417',
    path: '/barcode-generator/pdf417',
    title: 'PDF417 Barcode Generator - Free Online',
    metaDescription: 'Make a PDF417 barcode from your text and download PNG or SVG. Free, no signup, nothing leaves your browser.',
    h1: 'Free PDF417 Barcode Generator',
    subline: 'Create stacked linear PDF417 barcodes.',
    intro: 'PDF417 is a high-capacity stacked barcode symbology used on government IDs, boarding passes, and shipping documents.',
    preselectedFormat: 'PDF_417',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'PDF417', path: '/barcode-generator/pdf417' },
    ],
    sections: [
      { title: 'About PDF417', content: 'Stores hundreds of characters in a rectangular stacked bar pattern.' },
    ],
    faqs: [
      { question: 'Where is PDF417 used?', answer: 'Driver licenses, boarding passes, and logistics labels.' },
    ],
  },
  'aztec': {
    slug: 'barcode-generator/aztec',
    path: '/barcode-generator/aztec',
    title: 'Aztec Barcode Generator - Free Online',
    metaDescription: 'Create Aztec 2D barcodes instantly. Free, no signup, download PNG or SVG.',
    h1: 'Free Aztec Barcode Generator',
    subline: 'Create compact square Aztec 2D codes.',
    intro: 'Aztec code is a 2D matrix symbology featuring a distinctive central bullseye finder pattern.',
    preselectedFormat: 'AZTEC',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'Aztec', path: '/barcode-generator/aztec' },
    ],
    sections: [
      { title: 'About Aztec Code', content: 'Takes up less space than QR codes because it does not require a surrounding blank quiet zone.' },
    ],
    faqs: [
      { question: 'Where are Aztec codes used?', answer: 'Railway tickets, airline boarding passes, and vehicle registrations.' },
    ],
  },
  'upc-a': {
    slug: 'barcode-generator/upc-a',
    path: '/barcode-generator/upc-a',
    title: 'UPC-A Barcode Generator - Retail Product Barcodes',
    metaDescription: 'Generate 12-digit UPC-A retail barcodes with auto check-digit calculation. Free and instant.',
    h1: 'Free UPC-A Barcode Generator',
    subline: 'Create standard retail product barcodes for North America.',
    intro: 'UPC-A is the standard 12-digit retail product barcode used across the United States and Canada.',
    preselectedFormat: 'UPC_A',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'UPC-A', path: '/barcode-generator/upc-a' },
    ],
    sections: [
      { title: 'About UPC-A', content: 'Encodes 12 numeric digits representing consumer packaged goods.' },
    ],
    faqs: [
      { question: 'Do I need a GS1 number for retail?', answer: 'Yes, retail sales require numbers licensed through GS1.' },
    ],
  },
  'isbn': {
    slug: 'barcode-generator/isbn',
    path: '/barcode-generator/isbn',
    title: 'ISBN Barcode Generator - Book EAN-13 Barcodes',
    metaDescription: 'Generate ISBN book barcodes in EAN-13 format. Free online book barcode maker.',
    h1: 'Free ISBN Barcode Generator',
    subline: 'Create EAN-13 book barcodes from your 13-digit ISBN number.',
    intro: 'ISBN barcodes encode book International Standard Book Numbers into standard EAN-13 retail barcodes.',
    preselectedFormat: 'EAN_13',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'ISBN', path: '/barcode-generator/isbn' },
    ],
    sections: [
      { title: 'About ISBN Barcodes', content: 'Books use EAN-13 starting with 978 or 979.' },
    ],
    faqs: [
      { question: 'What format do books use?', answer: 'Books use EAN-13 barcode symbology.' },
    ],
  },
  'random': {
    slug: 'barcode-generator/random',
    path: '/barcode-generator/random',
    title: 'Random Barcode Generator - Test Barcodes in One Click',
    metaDescription: 'Get a random barcode for testing your scanner or app. Pick a format, click, download. Free and instant.',
    h1: 'Random Barcode Generator',
    subline: 'Generate sample test barcodes in one click.',
    intro: 'Need dummy barcodes to test your scanner hardware, app, or inventory software? Click to generate valid sample codes across all formats instantly.',
    preselectedFormat: 'CODE_128',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Barcode Generator', path: '/barcode-generator' },
      { name: 'Random Barcode', path: '/barcode-generator/random' },
    ],
    sections: [
      { title: 'Testing Scanners', content: 'Use random generated barcodes to verify camera scanners and handheld laser decoders.' },
    ],
    faqs: [
      { question: 'Are these barcodes real?', answer: 'They are synthetically generated sample codes for testing purposes.' },
    ],
  },
};
