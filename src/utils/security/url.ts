import { QRContentType } from '../../types/qr.types';

/**
 * Permitted web protocols for opening external links.
 * Strictly limited to standard secure and unsecure HTTP protocols.
 */
export const ALLOWED_WEB_PROTOCOLS = new Set(['https:', 'http:']);
export const ALLOWED_ACTION_PROTOCOLS = new Set(['mailto:', 'tel:', 'sms:']);

/**
 * Explicit blocklist of dangerous, executable, or system access URI schemes.
 */
export const DANGEROUS_SCHEMES = new Set([
  'javascript:',
  'vbscript:',
  'data:',
  'file:',
  'blob:',
  'about:',
  'chrome:',
  'intent:',
  'ms-windows-store:',
  'disk:',
  'jar:',
  'filesystem:',
  'view-source:',
  'feed:',
  'ws:',
  'wss:',
]);

/**
 * Unicode Bidirectional Override and directional control characters used in spoofing attacks
 */
const BIDI_CONTROL_REGEX = /[\u200E\u200F\u202A-\u202E\u2066-\u2069]/;

/**
 * Checks if an IP or hostname points to a private, loopback, or internal cloud network
 */
export function isPrivateOrInternalHost(hostname: string): boolean {
  if (!hostname) return false;
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '').trim();

  // Loopback hostnames
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.lan')) {
    return true;
  }

  // IPv4 Loopback (127.0.0.0/8) & Unspecified (0.0.0.0)
  if (host === '0.0.0.0' || host.startsWith('127.')) {
    return true;
  }

  // IPv4 Link-local / Cloud metadata (169.254.0.0/16)
  if (host.startsWith('169.254.')) {
    return true;
  }

  // IPv4 Private Class A: 10.0.0.0/8
  if (host.startsWith('10.')) {
    return true;
  }

  // IPv4 Private Class B: 172.16.0.0/12 (172.16 - 172.31)
  const classBMatch = host.match(/^172\.(\d+)\./);
  if (classBMatch) {
    const octet = parseInt(classBMatch[1], 10);
    if (octet >= 16 && octet <= 31) {
      return true;
    }
  }

  // IPv4 Private Class C: 192.168.0.0/16
  if (host.startsWith('192.168.')) {
    return true;
  }

  // IPv6 Loopback & Link-local
  if (host === '::1' || host === '::' || host.startsWith('fe80:') || host.startsWith('fc00:') || host.startsWith('fd00:')) {
    return true;
  }

  return false;
}

export interface URLSafetyAnalysis {
  isUrl: boolean;
  isValid: boolean;
  isSafe: boolean;
  url?: URL;
  sanitizedHref?: string;
  displayHostname?: string;
  protocol?: string;
  dangerReason?: string;
  isPrivateNetwork?: boolean;
  isPunycode?: boolean;
  isInsecureHttp?: boolean;
  hasCredentials?: boolean;
  isBiDiSpoof?: boolean;
  type: QRContentType;
}

/**
 * Quick helper to evaluate URL safety and detect dangerous schemes
 */
export function isUrlSafe(rawText: string): { isSafe: boolean; reason?: string } {
  const analysis = analyzeQRContent(rawText);
  return {
    isSafe: analysis.isSafe && analysis.isUrl,
    reason: analysis.dangerReason,
  };
}

/**
 * Centralized URL analysis and safety verification.
 * NEVER trusts user-provided strings.
 * Enforces strict protocol allowlisting, control character stripping, and safe scheme validation.
 */
export function analyzeQRContent(rawText: string): URLSafetyAnalysis {
  if (!rawText || typeof rawText !== 'string') {
    return {
      isUrl: false,
      isValid: false,
      isSafe: true,
      type: 'text',
    };
  }

  const trimmed = rawText.trim();

  // 1. Detect Wi-Fi configuration format (WIFI:T:WPA;S:MySSID;P:password;;)
  if (/^WIFI:/i.test(trimmed)) {
    return {
      isUrl: false,
      isValid: true,
      isSafe: true,
      type: 'wifi',
    };
  }

  // 2. Check for dangerous control characters or null bytes
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(trimmed)) {
    return {
      isUrl: false,
      isValid: false,
      isSafe: false,
      dangerReason: 'Content contains illegal control characters or null bytes.',
      type: 'text',
    };
  }

  // 3. Check for Unicode Bidirectional Override (RLO Spoofing)
  if (BIDI_CONTROL_REGEX.test(trimmed)) {
    return {
      isUrl: true,
      isValid: false,
      isSafe: false,
      isBiDiSpoof: true,
      dangerReason: 'Suspicious URL contains Unicode Bidirectional Override characters (RLO spoofing attack).',
      type: 'url',
    };
  }

  // 4. Extract URI scheme if present (e.g. "javascript:", "https:", "data:", "custom:")
  // Strip non-printable or whitespace characters that might be used for evasion (e.g., "jav\tascript:")
  const normalizedForScheme = trimmed.replace(/[\s\x00-\x1F]/g, '');
  const schemeMatch = normalizedForScheme.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);

  if (schemeMatch) {
    const rawScheme = schemeMatch[1].toLowerCase() + ':';

    // 4a. Explicit block of dangerous script or file execution schemes
    if (
      DANGEROUS_SCHEMES.has(rawScheme) ||
      rawScheme.startsWith('javascript') ||
      rawScheme.startsWith('vbscript') ||
      rawScheme.startsWith('data')
    ) {
      return {
        isUrl: true,
        isValid: false,
        isSafe: false,
        protocol: rawScheme,
        dangerReason: `Dangerous URI scheme detected ("${rawScheme}"). Execution and opening are strictly blocked to protect your device from unauthorized code execution.`,
        type: 'url',
      };
    }

    // 4b. Handle Email (mailto:)
    if (rawScheme === 'mailto:') {
      try {
        // Disallow CRLF or Header Injection
        if (/%0[ad]/i.test(trimmed) || /[\r\n]/.test(trimmed)) {
          return {
            isUrl: true,
            isValid: false,
            isSafe: false,
            protocol: 'mailto:',
            type: 'email',
            dangerReason: 'Email link contains illegal newline or carriage return characters (potential SMTP header injection).',
          };
        }

        const parsed = new URL(trimmed);
        const emailAddress = parsed.pathname;
        const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(emailAddress);

        // Disallow dangerous parameters
        let hasDangerousParam = false;
        parsed.searchParams.forEach((_, key) => {
          const lower = key.toLowerCase();
          if (lower === 'attach' || lower === 'attachment') {
            hasDangerousParam = true;
          }
        });

        if (hasDangerousParam) {
          return {
            isUrl: true,
            isValid: false,
            isSafe: false,
            protocol: 'mailto:',
            type: 'email',
            dangerReason: 'Email link contains disallowed attachment parameters.',
          };
        }

        return {
          isUrl: true,
          isValid: validEmail,
          isSafe: validEmail,
          sanitizedHref: validEmail ? parsed.href : undefined,
          protocol: 'mailto:',
          type: 'email',
          dangerReason: validEmail ? undefined : 'Malformed email address format in mailto link.',
        };
      } catch {
        return {
          isUrl: true,
          isValid: false,
          isSafe: false,
          protocol: 'mailto:',
          dangerReason: 'Malformed email link could not be parsed safely.',
          type: 'email',
        };
      }
    }

    // 4c. Handle Phone (tel:)
    if (rawScheme === 'tel:') {
      const cleanPhone = trimmed.replace(/^tel:/i, '').trim();
      const validPhone = /^[+]?[0-9\s().-]{3,30}$/.test(cleanPhone);
      return {
        isUrl: true,
        isValid: validPhone,
        isSafe: validPhone,
        sanitizedHref: validPhone ? `tel:${cleanPhone.replace(/[\s().-]/g, '')}` : undefined,
        protocol: 'tel:',
        type: 'tel',
        dangerReason: validPhone ? undefined : 'Invalid telephone number format. Allowed characters: digits, +, parentheses, hyphens.',
      };
    }

    // 4d. Handle SMS (sms: or smsto:)
    if (rawScheme === 'sms:' || rawScheme === 'smsto:') {
      let rawPhone = '';
      let rawBody = '';

      if (/^smsto:/i.test(trimmed)) {
        const withoutPrefix = trimmed.replace(/^smsto:/i, '');
        const colonIndex = withoutPrefix.indexOf(':');
        if (colonIndex !== -1) {
          rawPhone = withoutPrefix.slice(0, colonIndex).trim();
          rawBody = withoutPrefix.slice(colonIndex + 1);
        } else {
          rawPhone = withoutPrefix.trim();
        }
      } else {
        // sms:1234?body=hello
        const withoutPrefix = trimmed.replace(/^sms:/i, '');
        const qIndex = withoutPrefix.indexOf('?');
        if (qIndex !== -1) {
          rawPhone = withoutPrefix.slice(0, qIndex).trim();
          const qs = withoutPrefix.slice(qIndex + 1);
          try {
            const params = new URLSearchParams(qs);
            rawBody = params.get('body') || '';
          } catch {
            rawBody = '';
          }
        } else {
          rawPhone = withoutPrefix.trim();
        }
      }

      const validPhone = /^[+]?[0-9\s().-]{3,30}$/.test(rawPhone);
      const safeBody = !/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(rawBody);

      if (!validPhone || !safeBody) {
        return {
          isUrl: true,
          isValid: false,
          isSafe: false,
          protocol: 'sms:',
          dangerReason: 'Invalid SMS recipient number or malformed message syntax.',
          type: 'sms',
        };
      }

      const cleanDigits = rawPhone.replace(/[\s().-]/g, '');
      const sanitizedHref = rawBody ? `sms:${cleanDigits}?body=${encodeURIComponent(rawBody)}` : `sms:${cleanDigits}`;

      return {
        isUrl: true,
        isValid: true,
        isSafe: true,
        sanitizedHref,
        protocol: 'sms:',
        type: 'sms',
      };
    }

    // 4e. Handle standard Web URLs (http: or https:)
    if (ALLOWED_WEB_PROTOCOLS.has(rawScheme)) {
      // Disallow backslashes in URL (phishing / path ambiguity trick)
      if (trimmed.includes('\\')) {
        return {
          isUrl: true,
          isValid: false,
          isSafe: false,
          protocol: rawScheme,
          dangerReason: 'Suspicious URL contains backslashes, which can be used to obfuscate destinations.',
          type: 'url',
        };
      }

      try {
        const parsed = new URL(trimmed);
        if (!parsed.hostname || parsed.hostname.length === 0) {
          return {
            isUrl: true,
            isValid: false,
            isSafe: false,
            protocol: rawScheme,
            dangerReason: 'URL has an empty or invalid hostname.',
            type: 'url',
          };
        }

        // Credential Phishing check (@ symbol in authority)
        if (parsed.username || parsed.password) {
          return {
            isUrl: true,
            isValid: false,
            isSafe: false,
            hasCredentials: true,
            protocol: rawScheme,
            dangerReason: 'Deceptive URL detected: Contains embedded user credentials or misleading authority prefix (@) commonly used in phishing attacks.',
            type: 'url',
          };
        }

        // Private / Local network detection
        const isPrivate = isPrivateOrInternalHost(parsed.hostname);
        if (isPrivate) {
          return {
            isUrl: true,
            isValid: true,
            isSafe: false,
            isPrivateNetwork: true,
            url: parsed,
            sanitizedHref: undefined,
            displayHostname: parsed.hostname,
            protocol: parsed.protocol,
            dangerReason: `Restricted Destination: "${parsed.hostname}" points to a local, loopback, or private internal network. Opening internal addresses from untrusted QR codes is blocked to prevent local network attacks.`,
            type: 'url',
          };
        }

        // Punycode / IDN Homograph check
        const isPunycode = parsed.hostname.startsWith('xn--') || parsed.hostname.includes('.xn--');

        // Unencrypted HTTP check
        const isInsecureHttp = parsed.protocol === 'http:';

        return {
          isUrl: true,
          isValid: true,
          isSafe: true,
          isPunycode,
          isInsecureHttp,
          url: parsed,
          sanitizedHref: parsed.href,
          displayHostname: parsed.hostname,
          protocol: parsed.protocol,
          dangerReason: isPunycode
            ? 'Advisory: This domain uses Internationalized Domain Characters (Punycode), which can be used for visual look-alike spoofing.'
            : isInsecureHttp
            ? 'Advisory: This link uses unencrypted HTTP rather than secure HTTPS.'
            : undefined,
          type: 'url',
        };
      } catch {
        return {
          isUrl: true,
          isValid: false,
          isSafe: false,
          protocol: rawScheme,
          dangerReason: 'Malformed web URL could not be parsed safely.',
          type: 'url',
        };
      }
    }

    // 4f. Any other arbitrary scheme (e.g. ftp:, ssh:, market:, app:, etc.)
    return {
      isUrl: true,
      isValid: false,
      isSafe: false,
      protocol: rawScheme,
      dangerReason: `Unsupported URI protocol "${rawScheme}". Only standard web links (https:// or http://) are allowed to be opened.`,
      type: 'url',
    };
  }

  // 5. String has no scheme: Check if it resembles a web address (e.g., "example.com", "www.test.org/page")
  const domainPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+(\/[^\s]*)?$/i;
  if (domainPattern.test(trimmed) && !trimmed.includes('\\')) {
    try {
      const parsed = new URL(`https://${trimmed}`);
      const isPrivate = isPrivateOrInternalHost(parsed.hostname);

      if (isPrivate) {
        return {
          isUrl: true,
          isValid: true,
          isSafe: false,
          isPrivateNetwork: true,
          displayHostname: parsed.hostname,
          protocol: 'https:',
          dangerReason: `Restricted Destination: "${parsed.hostname}" points to a local or internal network.`,
          type: 'url',
        };
      }

      const isPunycode = parsed.hostname.startsWith('xn--') || parsed.hostname.includes('.xn--');

      return {
        isUrl: true,
        isValid: true,
        isSafe: true,
        isPunycode,
        url: parsed,
        sanitizedHref: parsed.href,
        displayHostname: parsed.hostname,
        protocol: 'https:',
        type: 'url',
      };
    } catch {
      // Fall through to plain text
    }
  }

  // 6. Default fallback: Plain Text
  return {
    isUrl: false,
    isValid: true,
    isSafe: true,
    type: 'text',
  };
}
