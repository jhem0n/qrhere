export interface BarcodeFAQ {
  question: string;
  answer: string;
}

export interface BarcodePageSection {
  title: string;
  intro?: string;
  steps?: {
    step: number;
    title?: string;
    text: string;
  }[];
  paragraphs?: string[];
  subsections?: {
    title: string;
    text: string;
  }[];
  table?: {
    headers: string[];
    rows: { col1: string; col2: string; col3?: string }[];
  };
  callout?: string;
}

export interface BarcodePageDefinition {
  id: string;
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  breadcrumbName: string;
  sections: BarcodePageSection[];
  faqs: BarcodeFAQ[];
  keywords?: string[];
}

export const BARCODE_PAGES: BarcodePageDefinition[] = [
  // 1. Scan Barcode from Image
  {
    id: 'barcode-reader-from-image',
    slug: 'barcode-reader-from-image',
    path: '/barcode-reader-from-image',
    title: 'Scan Barcode from Image – Free Online Reader | QR Here',
    metaDescription:
      'Upload a photo or screenshot and read the barcode instantly. Free online barcode reader from image. Supports UPC, EAN, Code 128, QR. Nothing is uploaded.',
    h1: 'Scan Barcode from Image Online',
    intro:
      'Upload a JPG, PNG or WebP image and decode the barcode in seconds. Works with photos, screenshots and saved images, and your file never leaves your device.',
    breadcrumbName: 'Scan Barcode from Image',
    sections: [
      {
        title: 'How to Read a Barcode from an Image',
        intro:
          'Reading a barcode from a digital photo or screenshot is quick and requires no specialized software. Follow these four simple steps:',
        steps: [
          {
            step: 1,
            title: 'Open the reader and click Upload',
            text: 'Navigate to this page on your phone, tablet, or desktop and select the "Upload Image" option or drop your file into the box.',
          },
          {
            step: 2,
            title: 'Select your barcode image',
            text: 'Choose any photo, screenshot, or graphic file containing a barcode from your photo library or computer folders.',
          },
          {
            step: 3,
            title: 'Instant in-browser decoding',
            text: 'The browser engine analyzes pixel contrast and reads the encoded numbers or text directly in local memory within milliseconds.',
          },
          {
            step: 4,
            title: 'View and copy the decoded data',
            text: 'The extracted barcode content appears on screen ready to be copied to your clipboard with a single tap.',
          },
        ],
      },
      {
        title: 'Tips for a Successful Scan',
        paragraphs: [
          'For reliable image decoding, make sure the photo is sharp and properly focused. Motion blur or camera lens smudges make it difficult for optical algorithms to distinguish fine bar lines.',
          'Crop out excessive background clutter before uploading. While the scanner can search across wider scenes, focusing on the barcode area speeds up processing and eliminates background visual noise.',
          'Always preserve the quiet zone. Barcodes require an uninterrupted white margin on both sides of the vertical stripes so the decoder can detect the boundary of the code pattern.',
          'Avoid severe JPEG compression and direct reflections on glossy packaging. If a low-resolution screenshot fails to decode, upload an uncompressed original image or use our free online barcode scanner with your camera.',
        ],
      },
      {
        title: 'Common Sources',
        intro:
          'You can scan barcodes from virtually any digital image format or captured document, including:',
        subsections: [
          {
            title: 'Product Photos',
            text: 'Snap photos of items on grocery shelves, warehouse bins, or consumer boxes to extract product numbers on your computer.',
          },
          {
            title: 'Screenshots from Emails and Websites',
            text: 'Capture digital barcodes from confirmation emails, event tickets, airline check-ins, or loyalty cards on your screen.',
          },
          {
            title: 'Shipping and Return Labels',
            text: 'Upload photos of package delivery labels, postal manifests, and tracking slips to copy tracking numbers accurately.',
          },
          {
            title: 'Saved Gallery Images',
            text: 'Scan receipts, warranty tags, or document scans previously saved to your iPhone, Android, or desktop photo album.',
          },
        ],
      },
      {
        title: 'Supported Image and Barcode Types',
        intro:
          'Our client-side reader processes all major web image formats and decodes standard linear and matrix symbologies:',
        table: {
          headers: ['Category', 'Supported Standards'],
          rows: [
            {
              col1: 'Image File Formats',
              col2: 'JPG, JPEG, PNG, and WebP (up to 10 MB file size).',
            },
            {
              col1: 'Retail 1D Barcodes',
              col2: 'UPC-A, UPC-E, EAN-13, and EAN-8 supermarket barcodes.',
            },
            {
              col1: 'Logistics 1D Barcodes',
              col2: 'Code 128, Code 39, ITF (Interleaved 2 of 5), and Codabar.',
            },
            {
              col1: '2D Matrix Symbologies',
              col2: 'QR Code and Data Matrix high-density codes.',
            },
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Can I scan a barcode from a screenshot?',
        answer:
          'Yes. Take a screenshot on your phone, tablet, or desktop computer, save it as an image, and upload or drag it directly into the tool for instant decoding.',
      },
      {
        question: 'Which image formats are supported?',
        answer:
          'Our image scanner supports standard web image formats including JPG, PNG, and WebP files up to 10 MB in file size.',
      },
      {
        question: 'Why does my image not decode?',
        answer:
          'Images fail to decode when they are blurry, heavily compressed, obscured by glare, or cropped too tightly without the surrounding white margin (quiet zone). Try uploading a clearer, higher-resolution picture.',
      },
      {
        question: 'Is my image uploaded to a server?',
        answer:
          'No. All decoding runs entirely inside your web browser using client-side algorithms. Your photos and screenshots never leave your device and are never transmitted to external servers.',
      },
    ],
    keywords: [
      'scan barcode from image',
      'barcode reader from image',
      'read barcode from photo',
      'decode barcode image online',
      'screenshot barcode scanner',
    ],
  },

  // 2. Free UPC & EAN Barcode Scanner
  {
    id: 'upc-ean-scanner',
    slug: 'upc-ean-scanner',
    path: '/upc-ean-scanner',
    title: 'Free UPC & EAN Barcode Scanner Online | QR Here',
    metaDescription:
      'Scan UPC-A, UPC-E, EAN-13 and EAN-8 product barcodes free with your camera or an image. No app, no sign-up. Processed in your browser.',
    h1: 'Free UPC & EAN Barcode Scanner',
    intro:
      'Read the numbers on any retail product barcode. This scanner decodes UPC-A, UPC-E, EAN-13 and EAN-8 codes using your camera or an image upload, entirely in your browser.',
    breadcrumbName: 'UPC & EAN Scanner',
    sections: [
      {
        title: 'What Are UPC and EAN Barcodes?',
        paragraphs: [
          'UPC (Universal Product Code) and EAN (European or International Article Number) are standard point-of-sale barcodes found on packaged retail goods across the globe.',
          'UPC-A features 12 numerical digits and is the primary barcode format on consumer goods in the United States and Canada. EAN-13 features 13 numerical digits and is standard on retail products, books, and groceries worldwide.',
          'In international database standards, a 12-digit UPC-A is identical to an EAN-13 with a leading zero added. Both symbologies encode numbers using alternating black and white bars with specific module widths.',
          'UPC-E (6 digits) and EAN-8 (8 digits) are zero-suppressed, compact versions engineered for small packages such as chewing gum, cosmetics, or pharmaceuticals where full-sized 12 or 13-digit labels will not fit.',
        ],
      },
      {
        title: 'How to Scan a UPC or EAN Code',
        intro:
          'You can scan retail barcodes using your smartphone camera, computer webcam, or an uploaded photo:',
        subsections: [
          {
            title: 'Scan with Camera',
            text: 'Click "Open Camera", allow browser camera permissions, and point the lens at the retail product. Align the red guidance line across the full width of the vertical bars, and click "Capture" to read the numbers.',
          },
          {
            title: 'Scan from an Image',
            text: 'Switch to the "Upload Image" tab and select or drop a clear photo of the product package barcode. The scanner decodes the numerical digits immediately without uploading the picture to any server.',
          },
        ],
      },
      {
        title: 'Understanding the Number',
        paragraphs: [
          'Retail barcodes have a standardized structure designed for global logistics and automated checkout accuracy.',
          'The final digit on the far right is a mathematical check digit. It is calculated from the preceding digits using a modulo-10 algorithm. Scanners use this check digit to verify that every bar was read accurately, eliminating transcription typos.',
          'The leading digits identify the country licensing authority and the manufacturer prefix assigned by GS1. The middle digits represent the specific item reference code chosen by the manufacturer to identify that particular size, color, or formulation.',
        ],
      },
      {
        title: 'What This Scanner Does Not Do',
        paragraphs: [
          'This scanner decodes the exact numerical sequence printed within the barcode stripes. It does not look up product names, commercial store prices, or consumer reviews from retail inventory databases.',
          'Keeping the tool focused strictly on optical barcode decoding ensures 100% privacy, zero tracking, and immediate client-side performance without external database dependencies. For general scanning needs, use our free online barcode scanner.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between UPC and EAN?',
        answer:
          'UPC-A codes have 12 digits and are standard on retail packaging in North America, while EAN-13 codes have 13 digits and are used globally. A 12-digit UPC-A is compatible with EAN systems by adding a leading zero.',
      },
      {
        question: 'Can I scan a UPC code with my phone camera?',
        answer:
          'Yes. Tap "Open Camera", grant browser camera permissions, and align the product barcode in the viewfinder to capture and decode the digits.',
      },
      {
        question: 'Does it show product details or prices?',
        answer:
          'No. This tool decodes the raw 12-digit or 13-digit barcode number. It does not look up product descriptions, retail pricing, or store reviews, which guarantees complete privacy.',
      },
      {
        question: 'Why is the code 12 digits on some products and 13 on others?',
        answer:
          'Products packaged for the North American market use 12-digit UPC-A codes, while products manufactured or distributed internationally use 13-digit EAN-13 codes.',
      },
    ],
    keywords: [
      'UPC scanner',
      'EAN scanner',
      'UPC barcode scanner',
      'EAN-13 reader',
      'scan retail barcode online',
    ],
  },

  // 3. Webcam Barcode Scanner Online
  {
    id: 'webcam-barcode-scanner',
    slug: 'webcam-barcode-scanner',
    path: '/webcam-barcode-scanner',
    title: 'Webcam Barcode Scanner Online – Free | QR Here',
    metaDescription:
      'Use your laptop or PC webcam to scan barcodes online. Free, no software to install, works in your browser. Camera stays on your device.',
    h1: 'Webcam Barcode Scanner Online',
    intro:
      'Scan barcodes with the webcam on your laptop or desktop. No driver, no software and no handheld scanner needed. Just allow camera access and show the barcode.',
    breadcrumbName: 'Webcam Barcode Scanner',
    sections: [
      {
        title: 'How to Use a Webcam to Scan Barcodes',
        intro:
          'Using your computer webcam as a barcode reader is straightforward and requires no extra hardware:',
        steps: [
          {
            step: 1,
            title: 'Open the page on your computer',
            text: 'Access this tool on any laptop, Mac, Chromebook, or desktop PC running a modern web browser.',
          },
          {
            step: 2,
            title: 'Click Open Camera and grant access',
            text: 'Click the "Open Camera" button and select "Allow" when your browser requests permission to access your webcam.',
          },
          {
            step: 3,
            title: 'Select your preferred camera',
            text: 'If your computer has multiple video devices connected (such as an internal webcam and an external USB camera), switch to your preferred lens.',
          },
          {
            step: 4,
            title: 'Hold the barcode steady',
            text: 'Position the barcode 10 to 20 cm (4 to 8 inches) in front of the webcam lens, keeping it flat and aligned inside the guide frame.',
          },
          {
            step: 5,
            title: 'Capture and view results',
            text: 'Click "Capture" or let the live scanning loop detect the code automatically to display the decoded characters.',
          },
        ],
      },
      {
        title: 'Getting Better Results with a Webcam',
        paragraphs: [
          'Built-in laptop webcams often feature fixed-focus lenses rather than smartphone autofocus macro sensors. Following a few practical tips ensures high scan accuracy:',
          'Ensure strong, even front lighting on the barcode. Dim room lighting causes webcams to increase digital gain, creating graininess that obscures thin barcode stripes.',
          'Avoid glare and reflections from overhead desk lamps and glossy product laminate. Tilt the package slightly to keep reflections away from the camera lens.',
          'Gently clean the webcam lens with a microfiber cloth. Smudges or dust soften the image and prevent sharp line recognition.',
          'Hold the barcode flat and parallel to the screen. If your laptop webcam struggles with tiny codes, snap a close-up photo with your phone and use our free online barcode scanner upload feature instead.',
        ],
      },
      {
        title: 'Fixing Camera Permission Problems',
        intro:
          'If your webcam does not activate when requested, check these common configuration settings:',
        subsections: [
          {
            title: 'Check Browser Permissions',
            text: 'Click the padlock or camera icon in your browser URL address bar and verify that Camera permissions are set to "Allow" for qrhere.online.',
          },
          {
            title: 'Close Competing Applications',
            text: 'Ensure other video programs such as Zoom, Microsoft Teams, Google Meet, or FaceTime are closed so they do not hold an exclusive lock on your webcam hardware.',
          },
          {
            title: 'Use Supported Browsers',
            text: 'Run the scanner in modern browsers with HTML5 media stream capabilities, including Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari.',
          },
          {
            title: 'Reload the Web Page',
            text: 'After updating device or operating system camera permissions, refresh the web page to re-initialize camera detection.',
          },
        ],
      },
      {
        title: 'Why Use a Browser Scanner',
        paragraphs: [
          'Eliminates the expense and clutter of dedicated USB handheld barcode scanners for occasional scanning tasks.',
          'Works seamlessly across all desktop operating systems including Windows, macOS, Linux, and ChromeOS without installing drivers.',
          'Guarantees complete confidentiality: all video frames are processed exclusively inside local browser memory with zero server uploads.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I use my laptop camera as a barcode scanner?',
        answer:
          'Yes. Modern web browsers support direct camera access, letting you use your built-in laptop camera or external USB webcam to scan barcodes without installing software.',
      },
      {
        question: 'Do I need to install anything?',
        answer:
          'No. QR Here runs completely inside your web browser. There are no drivers, browser extensions, or apps to download.',
      },
      {
        question: 'Why is my webcam not working?',
        answer:
          'Check that your browser has permission to access the webcam, verify that another app (like Zoom or Teams) is not locking the camera, and refresh the page.',
      },
      {
        question: 'Is the video sent to a server?',
        answer:
          'No. Camera video frames are processed locally inside your web browser using client-side algorithms. Your webcam feed is never recorded, transmitted, or uploaded.',
      },
    ],
    keywords: [
      'webcam barcode scanner',
      'laptop barcode scanner',
      'pc barcode reader',
      'scan barcode with webcam',
      'online webcam scanner',
    ],
  },

  // 4. Barcode Decoder Online
  {
    id: 'barcode-decoder-online',
    slug: 'barcode-decoder-online',
    path: '/barcode-decoder-online',
    title: 'Barcode Decoder Online – Read Any Barcode | QR Here',
    metaDescription:
      'Decode barcodes online and see the data and format. Free barcode decoder for UPC, EAN, Code 128, QR and Data Matrix. Works in your browser.',
    h1: 'Barcode Decoder Online',
    intro:
      'Turn a barcode into readable text. Upload an image or use your camera to decode the data and see which barcode format it uses.',
    breadcrumbName: 'Barcode Decoder',
    sections: [
      {
        title: 'What a Barcode Decoder Does',
        paragraphs: [
          'A barcode decoder is software that translates visual optical patterns—parallel lines, varying bar widths, or 2D matrix cells—into standard alphanumeric characters, numbers, or URLs.',
          'The decoding engine locates the start and stop guard patterns, measures the relative widths of bars and spaces, extracts the encoded data bits, verifies the parity and checksum, and reconstructs the original character payload.',
          'Unlike simple photo viewers, our online decoder interprets the underlying symbology rules and tells you both what the barcode says and what format was detected.',
        ],
      },
      {
        title: 'How to Decode a Barcode',
        intro:
          'You can decode any barcode using an existing image file or your device camera:',
        subsections: [
          {
            title: 'Decode from an Image File',
            text: 'Click "Upload Image" and choose a photo, screenshot, or digital label in JPG, PNG, or WebP format. The decoding algorithm processes the image pixels immediately.',
          },
          {
            title: 'Decode Using Camera',
            text: 'Click "Open Camera", point your camera or webcam at the code, and tap "Capture" to extract the data on screen. You can also visit our free online barcode scanner for general tools.',
          },
        ],
      },
      {
        title: '1D vs 2D Barcodes',
        intro:
          'Barcodes fall into two primary structural families with distinct capacities and applications:',
        table: {
          headers: ['Feature', '1D Linear Barcodes', '2D Matrix Codes'],
          rows: [
            {
              col1: 'Data Encoding',
              col2: 'Horizontal parallel stripes and spaces along one axis.',
              col3: 'Grid of geometric cells along horizontal and vertical axes.',
            },
            {
              col1: 'Storage Capacity',
              col2: 'Typically 8 to 30 alphanumeric characters.',
              col3: 'Up to 3,000+ characters, binary data, or long URLs.',
            },
            {
              col1: 'Common Formats',
              col2: 'UPC-A, UPC-E, EAN-13, EAN-8, Code 128, Code 39, ITF.',
              col3: 'QR Code and Data Matrix.',
            },
            {
              col1: 'Typical Use',
              col2: 'Retail checkouts, packaging cartons, inventory tags.',
              col3: 'Website links, Wi-Fi keys, digital payments, medical parts.',
            },
          ],
        },
      },
      {
        title: 'Reading the Result',
        paragraphs: [
          'Once decoding completes, the tool displays an organized output panel with several key details:',
          'The detected format badge identifies the specific symbology, such as "EAN-13 Detected", "Code 128 Detected", or "QR Code Detected", helping you understand the standard used.',
          'The scanning source tag confirms whether the result originated via camera or image upload.',
          'The full decoded character string is displayed inside a selectable monospace field with a one-click "Copy Data" button. If the decoded payload is a verified URL, an "Open Link" button lets you visit the destination safely.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a barcode decoder?',
        answer:
          'A barcode decoder is software that translates visual barcode patterns into readable numbers, letters, or website URLs by analyzing bar widths and matrix arrangements.',
      },
      {
        question: 'What is the difference between a barcode scanner and a decoder?',
        answer:
          'Technically, a scanner captures the optical image or light reflection of the barcode, while the decoder processes that image to translate it into alphanumeric characters. Our tool performs both scanning and decoding simultaneously.',
      },
      {
        question: 'Which formats can it decode?',
        answer:
          'It decodes common 1D barcodes including UPC-A, UPC-E, EAN-13, EAN-8, Code 128, Code 39, and ITF, as well as 2D matrix symbologies like QR Code and Data Matrix.',
      },
      {
        question: 'Can it decode damaged barcodes?',
        answer:
          'It can decode slightly damaged, smudged, or scratched barcodes thanks to mathematical error detection algorithms, but barcodes with missing guard patterns or extreme blur may fail to decode.',
      },
    ],
    keywords: [
      'barcode decoder online',
      'decode barcode',
      'free barcode decoder',
      'barcode translator',
      'read barcode format',
    ],
  },
];
