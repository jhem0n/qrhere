import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO_CONFIG, generateArticleSchema, generateBreadcrumbSchema } from '../../config/seo.config';

export const QrCodeSecurityPage: React.FC = () => {
  const breadcrumbs = [{ name: 'QR Code Security', path: '/qr-code-security' }];

  const structuredData = [
    generateArticleSchema({
      headline: 'QR Code Security Guide: How to Scan QR Codes Safely',
      description:
        'Learn how QR code phishing and quishing work, how to spot suspicious QR codes and URLs, and practical steps for safer QR code scanning.',
      canonicalPath: '/qr-code-security',
      datePublished: '2026-09-22T00:00:00Z',
      dateModified: '2026-09-22T00:00:00Z',
    }),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <SEOHead
        seo={SEO_CONFIG.qrCodeSecurity}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>QR Code Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            QR Code Security Guide: How to Scan QR Codes Safely
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Educational Security Guide • Practical Advice for Everyday Scanning
          </p>
        </header>

        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          <section className="space-y-4">
            <p>
              QR codes are convenient. You can use one to open a restaurant menu, pay for parking, join a Wi-Fi network, open a website, or get information from a poster.
            </p>
            <p>
              The problem is that a QR code does not tell you whether its destination is trustworthy.
            </p>
            <p>
              A QR code can point to a legitimate website, but it can also point to a phishing page, a fake payment form, a malicious download, or another unwanted destination.
            </p>
            <p>
              That is why QR code security is less about the square pattern itself and more about checking where the code takes you before you trust what you see.
            </p>
            <p>
              This guide explains common QR code scams, what quishing means, how to inspect a QR destination, and how to scan QR codes more safely.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              What is QR code phishing?
            </h2>
            <p>
              QR code phishing is a phishing attack that uses a QR code instead of, or alongside, a normal clickable link.
            </p>
            <p>
              The attacker creates a QR code that points to a website controlled by the attacker. The message around the QR code may pretend to come from a bank, delivery company, employer, government agency, payment service, or another organization.
            </p>
            <p>
              The goal is usually the same as traditional phishing: convince you to provide information, make a payment, download something, or take another action that benefits the attacker.
            </p>
            <p>
              The QR code itself is usually not the dangerous part. The risk comes from the destination and what you are asked to do after scanning it.
            </p>
            <p>
              The Federal Trade Commission (FTC) has warned that scammers use QR codes to send people to spoofed websites designed to steal personal and financial information. These codes can appear in unexpected emails, text messages, packages, and physical locations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              What is quishing?
            </h2>
            <p>
              Quishing is short for "QR code phishing."
            </p>
            <p>
              It works like email or SMS phishing, but the malicious link is encoded inside a QR graphic rather than presented as plain hyperlinked text.
            </p>
            <p>
              This can make the attack harder to notice because people may focus on the QR image instead of the destination URL. In enterprise environments, it can also bypass standard email security filters that inspect body links but do not decode images attached to incoming emails.
            </p>
            <p>
              For example, an attacker could send an email stating:
            </p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 font-mono text-sm text-slate-800 dark:text-slate-200">
              "Your account needs urgent verification. Scan this QR code to continue."
            </div>
            <p>
              When scanned, the QR code opens a fake login page that closely mimics the legitimate service.
            </p>
            <p>
              The FBI has documented quishing campaigns where malicious QR codes were embedded in phishing messages and unsolicited mailings to direct victims to credential-harvesting websites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              How can a QR code hide a malicious URL?
            </h2>
            <p>
              A QR code is simply a machine-readable way of storing data.
            </p>
            <p>
              That data might be:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>A normal website URL</li>
              <li>Plain text</li>
              <li>An email address</li>
              <li>A phone number</li>
              <li>Wi-Fi network credentials</li>
              <li>A payment-related link</li>
              <li>Another type of URI scheme</li>
            </ul>
            <p>
              When the QR code contains a URL, scanning it can make the destination much less visible than a normal link displayed on a webpage.
            </p>
            <p>
              For example, you might see a QR code accompanied by the message:
            </p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 font-mono text-sm text-slate-800 dark:text-slate-200">
              "Scan to confirm your account."
            </div>
            <p>
              The pixel pattern itself does not visually reveal whether the underlying destination is:
            </p>
            <div className="space-y-2 font-mono text-sm">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 p-3 text-emerald-800 dark:text-emerald-300">
                example.com (the legitimate website)
              </div>
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 p-3 text-red-800 dark:text-red-300">
                example-security-login.example (a spoofed imitation)
              </div>
            </div>
            <p>
              The safest habit is to inspect the decoded destination before opening it in your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to inspect a QR destination
            </h2>
            <p>
              Scanning a QR code does not mean you have to immediately visit the resulting website.
            </p>
            <p>
              If your QR scanner displays the destination first, take a moment to inspect it before tapping to proceed.
            </p>
            <p>
              Look closely for:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>The correct domain name:</strong> Verify the root domain and top-level domain extension.</li>
              <li><strong>Misspelled words:</strong> Watch for substituted letters, such as a numeral 1 replacing a lowercase l, or double letters where single ones belong.</li>
              <li><strong>Extra words added to a familiar brand:</strong> Scammers often append terms like "-login", "-verify", or "-support" to a well-known company name.</li>
              <li><strong>Unexpected subdomains:</strong> Ensure the legitimate company name is the actual domain, not merely a subdomain prefix of an unrelated domain.</li>
              <li><strong>Strange domains or country-code extensions:</strong> Be cautious when a local service suddenly uses an unfamiliar foreign domain extension.</li>
              <li><strong>Suspicious URL paths:</strong> Check whether the path points to an obscure file sharing or redirect script.</li>
              <li><strong>Unexpected redirects:</strong> If the initial link bounces through multiple shortened URLs before landing, treat the destination with skepticism.</li>
              <li><strong>Immediate requests for credentials:</strong> Be alert if the landing page prompts you for passwords, payment card numbers, or one-time verification codes.</li>
            </ul>
            <p>
              Remember that HTTPS does not automatically prove a website is legitimate. HTTPS encrypts the connection between your browser and the website, but scammers can easily obtain valid SSL/TLS certificates for their phishing domains.
            </p>
            <p>
              The FBI specifically advises individuals to examine URLs carefully and look out for slight misspellings or abnormal domain structures.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Fake QR-code stickers
            </h2>
            <p>
              One simple QR scam does not require sending you an email or message at all.
            </p>
            <p>
              A scammer can print adhesive stickers with their own malicious QR code and physically paste them over legitimate QR codes.
            </p>
            <p>
              This tactic has been observed in public locations such as:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Parking meters and pay stations</li>
              <li>Restaurant and cafe tables</li>
              <li>Public transit stops and kiosks</li>
              <li>Posters and public notice boards</li>
              <li>Event displays and brochures</li>
              <li>Retail payment counters</li>
            </ul>
            <p>
              The FTC has warned drivers about fraudulent QR codes pasted directly over official parking meter decals. When scanned, the replacement code directs drivers to an unauthorized payment page that steals credit card information and leaves the vehicle without a valid parking session.
            </p>
            <p>
              Before scanning a physical QR code, examine the surface around it. If a sticker appears to have been placed over an existing code, has peeling edges, looks crooked, or differs from the surrounding signage, stop and pay or verify through an official app or payment kiosk instead.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              QR codes in phishing emails and text messages
            </h2>
            <p>
              Be especially careful when a QR code arrives unexpectedly in an email, text message, or direct message.
            </p>
            <p>
              Scammers often manufacture an artificial sense of urgency to pressure you into acting before you can analyze the situation:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>"Your account will be suspended within 24 hours."</li>
              <li>"Your package could not be delivered due to an incorrect address."</li>
              <li>"Confirm your payment immediately to avoid penalties."</li>
              <li>"Unusual sign-in activity was detected on your profile."</li>
              <li>"Scan this code to settle your outstanding balance now."</li>
            </ul>
            <p>
              If you receive an unexpected QR code claiming to come from a bank, postal service, or company you use, do not scan or rely on the QR code to verify the message.
            </p>
            <p>
              Instead, open a new browser tab and navigate directly to the company's official website, or call customer service using a telephone number you already know is genuine.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Dangerous URL schemes
            </h2>
            <p>
              Not every QR code contains a standard web address starting with https.
            </p>
            <p>
              A QR code can encode various URI schemes, including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 font-mono text-sm">
              <li>https: (standard secure web address)</li>
              <li>http: (unencrypted web address)</li>
              <li>mailto: (triggers an email draft)</li>
              <li>tel: (initiates a phone dialer prompt)</li>
              <li>javascript: (executable client-side code)</li>
              <li>data: (inline encoded files or HTML markup)</li>
              <li>file: (local system file paths)</li>
            </ul>
            <p>
              While schemes like mailto: and tel: are common in legitimate contact codes, others present severe security hazards when handled carelessly by a QR scanner.
            </p>
            <p>
              For example, a javascript: URL can run arbitrary JavaScript when used as a browser navigation target. MDN documentation notes that javascript: URLs execute inline scripts in the security context of the current page, making them dangerous when untrusted input is executed.
            </p>
            <p>
              Data URLs can also package inline HTML or scripts, and security researchers have repeatedly observed them being used to obscure phishing forms.
            </p>
            <p>
              For any QR scanner, the fundamental security principle is clear: treat all decoded QR content as untrusted input. A safe scanner must never automatically execute code or navigate to dangerous schemes without displaying and sanitizing the output first.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to scan a QR code safely
            </h2>
            <p>
              Adopting a few practical habits substantially lowers your exposure to QR-based fraud:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Scan only codes from sources you have a reason to trust:</strong> Avoid scanning random codes on lampposts, flyers, or unsolicited mailers.</li>
              <li><strong>Preview the decoded destination first:</strong> Use a scanner that shows the full URL before launching it in a browser window.</li>
              <li><strong>Examine the domain name carefully:</strong> Look out for subtle misspellings, extra words, or unexpected top-level domain extensions.</li>
              <li><strong>Question urgent demands:</strong> Be skeptical of any prompt requiring immediate password entry, card details, or two-factor codes.</li>
              <li><strong>Look past professional design:</strong> Fraudulent websites and scam posters can look just as polished as legitimate ones.</li>
              <li><strong>Treat unsolicited emails and texts with suspicion:</strong> If a message from a bank or shipping service contains a QR code, verify it through official channels instead of scanning.</li>
              <li><strong>Inspect physical stickers for signs of tampering:</strong> Check whether a sticker has been pasted over an authentic code on meters, tables, or signage.</li>
              <li><strong>Keep your devices and browsers up to date:</strong> Operating system and browser updates include essential protections against known exploits and phishing sites.</li>
              <li><strong>Enable multi-factor authentication on critical accounts:</strong> Use hardware keys or authenticator apps to protect your accounts even if login details are accidentally entered on a spoofed page.</li>
              <li><strong>Navigate manually when in doubt:</strong> If a code claims to take you to a portal you use regularly, type the known web address directly into your browser address bar.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Browser-based QR scanning
            </h2>
            <p>
              A browser-based QR scanner provides a convenient way to read codes without downloading third-party scanner apps that may bundle invasive advertisements, excessive device permissions, or background tracking.
            </p>
            <p>
              With QR Here, you can use our free in-browser <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">QR code scanner</Link> to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Scan a physical code using your device's camera or webcam</li>
              <li>Decode an image, photo, or screenshot directly from your camera roll or desktop files</li>
              <li>Preview the exact decoded payload on screen before taking any action</li>
            </ul>
            <p>
              When evaluating QR scanners, how your data is handled matters. QR Here processes camera frames and uploaded photos entirely inside your browser using client-side Web APIs. Images and decoded payloads are never sent to remote servers or stored in remote databases.
            </p>
            <p>
              At the same time, remember that local processing does not guarantee that a decoded URL is harmless. A client-side scanner decodes malicious links just as efficiently as benign ones. The critical safety step is reviewing the decoded address before you choose to open it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              QR code privacy
            </h2>
            <p>
              QR codes often store information that people consider personal or sensitive. Depending on how a code is generated, the payload might include:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Private or unlisted web links</li>
              <li>Direct email addresses and phone numbers</li>
              <li>Wi-Fi network names and security passphrases</li>
              <li>Personal contact cards (vCards) with home or business addresses</li>
              <li>Payment identifiers or cryptocurrency wallet addresses</li>
              <li>Unencrypted personal notes or identifiers</li>
            </ul>
            <p>
              Think about what information you are embedding before creating a code with a <Link to="/qr-code-generator" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">QR code generator</Link> or distributing it publicly. A QR code does not encrypt data on its own. Anyone with a camera or scanner app can decode the full contents in a fraction of a second.
            </p>
            <p>
              When using online scanning tools, consider whether the service uploads your photos to external servers, logs your decoded destinations, or shares analytical data with third parties. For complete details on how QR Here protects user privacy through client-side processing, review our <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              What if you already scanned a suspicious QR code?
            </h2>
            <p>
              If you scanned a code and suspect the destination might be fraudulent, do not panic, but immediately stop interacting with the page.
            </p>
            <p>
              If you only opened the page and did not enter any credentials, submit forms, download files, or approve browser permissions, simply close the tab and clear your recent browser history.
            </p>
            <p>
              If you entered a password or account credentials:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Change the password immediately from a known safe device using the official website.</li>
              <li>Update any other accounts where you reused that same password.</li>
              <li>Turn on multi-factor authentication (MFA) on the affected account.</li>
              <li>Check account security settings for unfamiliar authorized sessions or recovery email changes.</li>
            </ul>
            <p>
              If you entered credit card or banking information:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Contact your financial institution right away using the telephone number on the back of your card.</li>
              <li>Request a card freeze or replacement to prevent unauthorized charges.</li>
              <li>Review your recent statement for unfamiliar pending charges.</li>
            </ul>
            <p>
              If a file was downloaded to your device:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Do not open, run, or execute the file.</li>
              <li>Delete the file from your downloads folder immediately.</li>
              <li>Run a scan using your operating system's built-in security software.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              A simple QR code safety checklist
            </h2>
            <p>
              Before trusting any QR code or acting on its destination, run through these quick questions:
            </p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Did I expect this code?</strong> Be wary of unsolicited codes received by email, SMS, or physical mail.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Do I trust where it is placed?</strong> Check whether physical stickers have been placed over original signs.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Does the URL match the official domain?</strong> Verify the root domain and top-level extension before visiting.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Is the domain spelled correctly?</strong> Look for subtle typos, swapped characters, or tacked-on keywords.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Is there an artificial sense of urgency?</strong> Scammers use tight deadlines to discourage careful inspection.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Is the page asking for sensitive information?</strong> Be alert if prompted for passwords, card numbers, or security codes.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Can I reach the service directly?</strong> If in doubt, open your browser and navigate to the organization's verified website.</span>
              </div>
            </div>
            <p>
              Taking five seconds to inspect a URL before interacting with it can prevent account compromises, fraudulent charges, and unnecessary headaches.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Final thoughts
            </h2>
            <p>
              QR codes are practical tools that simplify everyday tasks, but convenience should not replace basic verification habits.
            </p>
            <p>
              The most dependable approach is straightforward: verify the context of the code, inspect its decoded destination before opening, and think carefully before providing login credentials or payment information.
            </p>
            <p>
              A QR scanner reveals what is stored inside the code. It cannot determine whether the creator of that destination is honest. That final assessment remains in your hands.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Sources and further reading
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              For additional research, security advisories, and technical documentation regarding QR code security, consult the following authoritative publications:
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <span>FTC: Scammers hide harmful links in QR codes to steal your information</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumer.ftc.gov/consumer-alerts/2026/09/see-qr-code-parked-somewhere-dont-scan-ityet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <span>FTC: See a QR code parked somewhere? Don't scan it...yet!</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.fbi.gov/investigate/cyber/alerts/2025/unsolicited-packages-containing-qr-codes-used-to-initiate-fraud-schemes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <span>FBI: Unsolicited Packages Containing QR Codes Used to Initiate Fraud Schemes</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.fbi.gov/file-repository/cyber-alerts/north-korean-kimsuky-actors-leverage-malicious-qr.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <span>FBI: North Korean Kimsuky Actors Leverage Malicious QR Codes in Spearphishing Campaigns</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <span>MDN Web Docs: javascript: URLs</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
};
