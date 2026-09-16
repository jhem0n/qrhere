import {
  DataType,
  LinkData,
  TextData,
  EmailData,
  LocationData,
  PhoneData,
  SmsData,
  WhatsAppData,
  SkypeData,
  ZoomData,
  WifiData,
  VCardData,
  EventData,
  PayPalData,
  BitcoinData,
} from '../../types/qr-advanced.types';

function formatICalDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function formatPayload(
  type: DataType,
  data: {
    link: LinkData;
    text: TextData;
    email: EmailData;
    location: LocationData;
    phone: PhoneData;
    sms: SmsData;
    whatsapp: WhatsAppData;
    skype: SkypeData;
    zoom: ZoomData;
    wifi: WifiData;
    vcard: VCardData;
    event: EventData;
    paypal: PayPalData;
    bitcoin: BitcoinData;
  }
): string {
  switch (type) {
    case 'link': {
      const url = data.link.url.trim();
      return url;
    }

    case 'text': {
      return data.text.text;
    }

    case 'email': {
      const { to, subject, body } = data.email;
      const cleanTo = to.trim();
      if (!cleanTo) return '';
      const params = new URLSearchParams();
      if (subject.trim()) params.append('subject', subject.trim());
      if (body.trim()) params.append('body', body.trim());
      const query = params.toString();
      return query ? `mailto:${cleanTo}?${query}` : `mailto:${cleanTo}`;
    }

    case 'location': {
      const { latitude, longitude, address } = data.location;
      const lat = latitude.trim();
      const lng = longitude.trim();
      const addr = address.trim();
      if (lat && lng) {
        return addr ? `geo:${lat},${lng}?q=${encodeURIComponent(addr)}` : `geo:${lat},${lng}`;
      }
      if (addr) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
      }
      return '';
    }

    case 'phone': {
      const phone = data.phone.phone.trim();
      return phone ? `tel:${phone}` : '';
    }

    case 'sms': {
      const { phone, message } = data.sms;
      const p = phone.trim();
      const m = message.trim();
      if (!p) return '';
      return m ? `smsto:${p}:${m}` : `smsto:${p}`;
    }

    case 'whatsapp': {
      const { phone, message } = data.whatsapp;
      const cleanPhone = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
      if (!cleanPhone) return '';
      const m = message.trim();
      return m
        ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(m)}`
        : `https://wa.me/${cleanPhone}`;
    }

    case 'skype': {
      const { username, action } = data.skype;
      const u = username.trim();
      if (!u) return '';
      return `skype:${u}?${action || 'call'}`;
    }

    case 'zoom': {
      const { meetingId, password, joinUrl } = data.zoom;
      if (joinUrl && joinUrl.trim()) {
        return joinUrl.trim();
      }
      const mId = meetingId.replace(/\s+/g, '');
      if (!mId) return '';
      const pwd = password ? password.trim() : '';
      return pwd ? `https://zoom.us/j/${mId}?pwd=${encodeURIComponent(pwd)}` : `https://zoom.us/j/${mId}`;
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = data.wifi;
      const s = ssid.trim();
      if (!s) return '';
      const enc = encryption || 'WPA';
      const escapeVal = (val: string) => val.replace(/([\\;,:"])/g, '\\$1');
      return `WIFI:T:${enc};S:${escapeVal(s)};P:${escapeVal(password)};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'vcard': {
      const { firstName, lastName, phone, email, company, jobTitle, address, website } = data.vcard;
      const fn = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
      if (!fn && !phone.trim() && !email.trim()) return '';

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName.trim()};${firstName.trim()};;;`,
        `FN:${fn}`,
      ];

      if (company.trim()) lines.push(`ORG:${company.trim()}`);
      if (jobTitle.trim()) lines.push(`TITLE:${jobTitle.trim()}`);
      if (phone.trim()) lines.push(`TEL;TYPE=CELL:${phone.trim()}`);
      if (email.trim()) lines.push(`EMAIL:${email.trim()}`);
      if (address.trim()) lines.push(`ADR;TYPE=WORK:;;${address.trim()};;;;`);
      if (website.trim()) lines.push(`URL:${website.trim()}`);

      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'event': {
      const { title, location, startDate, endDate, description } = data.event;
      const t = title.trim();
      if (!t) return '';

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${t}`,
      ];

      if (location.trim()) lines.push(`LOCATION:${location.trim()}`);
      if (description.trim()) lines.push(`DESCRIPTION:${description.trim()}`);
      if (startDate) {
        const startFormatted = formatICalDate(startDate);
        if (startFormatted) lines.push(`DTSTART:${startFormatted}`);
      }
      if (endDate) {
        const endFormatted = formatICalDate(endDate);
        if (endFormatted) lines.push(`DTEND:${endFormatted}`);
      }

      lines.push('END:VEVENT', 'END:VCALENDAR');
      return lines.join('\n');
    }

    case 'paypal': {
      const { type: pType, account, amount } = data.paypal;
      const acc = account.trim();
      if (!acc) return '';
      const cleanAmt = amount ? amount.trim() : '';

      if (pType === 'me' || acc.includes('paypal.me/')) {
        const username = acc.replace(/.*paypal\.me\//, '');
        return cleanAmt ? `https://paypal.me/${username}/${cleanAmt}` : `https://paypal.me/${username}`;
      }

      return cleanAmt
        ? `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(acc)}&amount=${cleanAmt}`
        : `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(acc)}`;
    }

    case 'bitcoin': {
      const { address, amount } = data.bitcoin;
      const addr = address.trim();
      if (!addr) return '';
      const amt = amount ? amount.trim() : '';
      return amt ? `bitcoin:${addr}?amount=${amt}` : `bitcoin:${addr}`;
    }

    default:
      return '';
  }
}
