import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { FAQItemSchema } from '../../config/seo.config';

export const GENERATOR_FAQS: FAQItemSchema[] = [
  {
    question: 'What does QR code stand for?',
    answer:
      'QR code stands for Quick Response Code. These are two-dimensional (2D) matrix barcodes composed of a square pattern inside a protective quiet zone border. You can embed significantly more information in them than in traditional linear barcodes. No external hardware scanner is needed to read them—they can easily be scanned using any modern smartphone camera or our free online QR code scanner.',
  },
  {
    question: 'How to make a QR code?',
    answer:
      'To make a QR code, open our free QR code generator. First, choose the type of code you want to generate (such as URL, Wi-Fi, vCard, or Text). Next, add your information inside the required fields. Optionally customize the design with frames, brand colors, custom logos, and error correction levels. Finally, download your QR code as high-resolution PNG or vector SVG and use it as needed.',
  },
  {
    question: 'How to create a QR code for a link?',
    answer:
      'Select the "URL" option in our QR code maker. Paste your complete website or webpage address into the URL input box (e.g. https://yourwebsite.com). The tool will generate the QR code in real time. Once generated, customize the colors or frame if desired, and click download.',
  },
  {
    question: 'Do static QR codes ever expire?',
    answer:
      'No. Static QR codes generated with QR Here never expire. The destination URL or data is encoded directly into the black-and-white square pattern. Because there are no intermediate redirect servers or subscription dependencies, your QR code will work permanently as long as your destination link remains online.',
  },
  {
    question: 'Is this QR code creator 100% free?',
    answer:
      'Yes, QR Here is completely free to use. There are no subscriptions, no monthly charges, no scan limits, and no watermarks on your generated codes. You can generate and download as many high-resolution QR codes as you need without signing up.',
  },
  {
    question: 'Can I add my business logo to the center of the QR code?',
    answer:
      'Yes. Our QR creator allows you to embed popular platform icons or upload your own company logo. You can also adjust the logo size slider and toggle a clean white background knockout to ensure the code remains 100% scannable.',
  },
  {
    question: 'Which file format should I download for printing?',
    answer:
      'For physical print production—such as flyers, banners, business cards, signs, and menus—always choose the vector SVG format. SVG files can be scaled to any size without losing sharpness or becoming pixelated. For screens, emails, and social media, download high-resolution PNG.',
  },
  {
    question: 'How do I test my newly created QR code?',
    answer:
      'Always test your newly created QR code before printing or sharing. Point your smartphone camera at the screen preview or use our free in-browser online QR code scanner to confirm that the decoded link or content opens accurately.',
  },
];

export const GeneratorGuide: React.FC = () => {
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="mt-16 sm:mt-24 border-t border-slate-200 dark:border-slate-800 pt-12 sm:pt-16 space-y-16 max-w-4xl mx-auto text-slate-800 dark:text-slate-200 leading-relaxed">
      {/* SECTION 1: Free QR Code Generator Introduction */}
      <section className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free QR Code Generator
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Use this free QR code generator to turn any link, text, Wi-Fi network, or contact card into a scannable QR code. Our QR code creator is simple and requires no sign-up.
        </p>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          With our QR code maker, you can generate QR codes with custom designs very easily. You just enter your data, and the tool will create your QR code in real time.
        </p>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Once generated, you can copy and download them for free. When someone scans the QR code, they will instantly see the content you added.
        </p>
      </section>

      {/* SECTION 2: What is a QR Code? */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          What is a QR Code?
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The full form of QR is Quick Response, and it is a two-dimensional barcode with small square codes. They can store information that can be decoded by scanning them. Businesses use QR codes to connect offline users to online content.
        </p>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          QR codes can be scanned with smartphones that have QR code scanning. Also, they can be scanned to retrieve the information using an{' '}
          <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">
            online QR code scanner
          </Link>
          . When someone scans a QR code, the code opens the content linked to it.
        </p>
      </section>

      {/* SECTION 3: How to Create a QR Code */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How to Create a QR Code?
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Our QR code creator makes creating QR codes very easy. No technical skills are required. Just follow these steps to create a QR code with our tool.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step 1: Choose a Type
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Once you open our QR code generator, you will see different types of codes you can generate. Start by selecting the type of QR code you want to create (such as URL, vCard, Text, Email, SMS, WiFi, WhatsApp, Phone, Location, or Event Card).
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step 2: Enter Your Data
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              After choosing the type, the tool will ask you to input the data. Inputs vary with the type of code you selected to create. Fill in the required fields with your information, such as your website link, network credentials, or contact details.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step 3: Customize If Needed
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Our QR code maker lets you customize the code before generating and downloading it. You can customize the following before generating a QR code:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-base text-slate-600 dark:text-slate-300">
              <li>Frame</li>
              <li>Shape and color</li>
              <li>Background</li>
              <li>Logo</li>
              <li>Level</li>
              <li>Size</li>
            </ul>
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              This step is optional, but customization helps your QR code align with your brand.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step 4: Download or Copy
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When you enter data or customize the tool, changes appear in real time, and your QR code generates automatically. You can see the code in the output box.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Once you are done entering data or making customizations, choose a file type (PNG, JPG, WebP, PDF, or SVG) and click the <strong>download</strong> button. You can also copy the code directly or copy the SVG code.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Design Custom QRs With Our Online QR Generator */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design Custom QRs With Our Online QR Generator
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            What sets our QR code generator apart is that you can create custom-designed QR codes. Here are the customization features that you can use for free:
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. Frame */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. Frame
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Choose from multiple ready-made frame styles to make your QR code stand out. Once a frame is selected, you can:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-base text-slate-600 dark:text-slate-300">
              <li>Add your own call to action text (such as "SCAN ME" or "CONNECT").</li>
              <li>Change the frame color and text color to match your brand.</li>
              <li>Pick a single background color or use a gradient.</li>
              <li>Enable a transparent background.</li>
            </ul>
          </div>

          {/* 2. Shape and Color */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. Shape and Color
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              You can choose from multiple shape styles for the code pattern and other elements. You can change the shape design for:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-base text-slate-600 dark:text-slate-300">
              <li>Main code pattern (square, rounded, dots, classy patterns)</li>
              <li>Outer eye style</li>
              <li>Inner eye style</li>
              <li>Body and corner eye colors</li>
            </ul>
          </div>

          {/* 3. Background */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. Background
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Set a single background color, apply a gradient, or switch to a transparent background so the code blends cleanly into any design, brochure, or packaging.
            </p>
          </div>

          {/* 4. Logo */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. Logo
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              You can also add a logo to the center of a QR code when creating one. You can choose from popular platform icons available on the generator (WhatsApp, Instagram, LinkedIn, TikTok, YouTube, PayPal, etc.) or upload your own custom logo. Our QR creator also lets you control the size of the center logo and toggle background knockout padding.
            </p>
          </div>

          {/* 5. Level */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. Level
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Our QR code generator also lets you choose the error correction level. You can choose one based on how you plan to use your QR code:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-base text-slate-600 dark:text-slate-300">
              <li><strong>Level L</strong> – 7% recovery</li>
              <li><strong>Level M</strong> – 15% recovery (standard recommended)</li>
              <li><strong>Level Q</strong> – 25% recovery</li>
              <li><strong>Level H</strong> – 30% recovery (best when adding a logo or printing for outdoors)</li>
            </ul>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Higher levels allow the QR code to stay scannable even if part of it gets damaged, smudged, or covered by a center logo.
            </p>
          </div>

          {/* 6. Size */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6. Size
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              With our generator, you can generate a QR code in different sizes and resolutions. Available export sizes include:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-base text-slate-600 dark:text-slate-300">
              <li>50 × 50 px</li>
              <li>100 × 100 px</li>
              <li>150 × 150 px</li>
              <li>200 × 200 px</li>
              <li>250 × 250 px</li>
              <li>500 × 500 px</li>
              <li>1000 × 1000 px (up to 2048 × 2048 px ultra-high definition)</li>
              <li>Vector SVG (infinitely scalable with zero loss in print quality)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: Types of Codes Our QR Code Creator Can Make */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Types of Codes Our QR Code Creator Can Make
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            With our QR code creator, you can generate multiple types of QR codes, all for free. Popular types of QR codes you can generate include:
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              1. URL
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              With our QR code maker, you can create a QR code for a URL that links to any website or webpage.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              2. VCard
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              A vCard QR code can include your name, phone number, email, company name, and address. You can create a vCard QR code by selecting the VCard type.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Text
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              You can also create a QR code from text. To do this, select the Text option in our QR code generator, enter the text, and download your code.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Wifi
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Our QR code generator also lets you create a WiFi QR code. Select the WiFi option, enter the credentials, and download your code. Users scan the code and connect automatically. No manual entry needed.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Location
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              If you want to generate a QR code for a specific location, select the 'Location' option. Enter the Latitude and Longitude information and download the code. Upon scanning, users will be guided to the specific place you embedded inside.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Other Types
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              This free QR code generator also lets you generate many other types of QR codes, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-base text-slate-600 dark:text-slate-300">
              <li>QR code for emails (with pre-filled subject and body)</li>
              <li>QR code for phone numbers (instant click-to-call)</li>
              <li>QR code for SMS text messages</li>
              <li>WhatsApp click-to-chat QR codes</li>
              <li>Event card QR codes for adding dates to calendars</li>
              <li>PayPal and cryptocurrency payment QR codes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: Features of Our QR Code Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Features of Our QR Code Generator
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>100% free to use</li>
          <li>No sign-up required</li>
          <li>Supports multiple QR code types</li>
          <li>Custom frame styles with editable call-to-action text</li>
          <li>Full shape and color customization</li>
          <li>Adjustable logo size with white knockout padding</li>
          <li>Multiple error correction levels (L, M, Q, H)</li>
          <li>Free download &amp; copy available (PNG, SVG, PDF print sheet)</li>
          <li>Automated contrast check for guaranteed scannability</li>
          <li>100% client-side privacy with zero server storage</li>
        </ul>
      </section>

      {/* SECTION 7: Frequently Asked Questions (FAQs) */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="space-y-3">
          {GENERATOR_FAQS.map((faq, index) => {
            const isOpen = openFaqIndexes.includes(index);
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
