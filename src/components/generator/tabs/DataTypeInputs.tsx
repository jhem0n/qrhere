import React from 'react';
import { DataType, AllQRFormData } from '../../../types/qr-advanced.types';

interface DataTypeInputsProps {
  activeType: DataType;
  data: AllQRFormData;
  onChange: React.Dispatch<React.SetStateAction<AllQRFormData>>;
  onInputChange?: () => void;
}

export const DataTypeInputs: React.FC<DataTypeInputsProps> = ({
  activeType,
  data,
  onChange,
  onInputChange,
}) => {
  const handleFieldChange = (section: keyof typeof data, field: string, value: any) => {
    if (onInputChange) onInputChange();
    onChange((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const inputClass =
    'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition';
  const labelClass = 'block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5';

  switch (activeType) {
    case 'link':
      return (
        <div className="space-y-2">
          <label htmlFor="input-link-url" className={labelClass}>
            Target Website URL
          </label>
          <input
            type="url"
            id="input-link-url"
            value={data.link.url}
            onChange={(e) => handleFieldChange('link', 'url', e.target.value)}
            placeholder="https://example.com"
            className={inputClass}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      );

    case 'text':
      return (
        <div className="space-y-2">
          <label htmlFor="input-text-content" className={labelClass}>
            Plain Text Content
          </label>
          <textarea
            id="input-text-content"
            rows={4}
            value={data.text.text}
            onChange={(e) => handleFieldChange('text', 'text', e.target.value)}
            placeholder="Enter any raw text, notes, or instructions to encode..."
            className={inputClass}
            spellCheck="false"
          />
        </div>
      );

    case 'email':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-email-to" className={labelClass}>
              Recipient Email Address
            </label>
            <input
              type="email"
              id="input-email-to"
              value={data.email.to}
              onChange={(e) => handleFieldChange('email', 'to', e.target.value)}
              placeholder="user@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-email-subject" className={labelClass}>
              Subject
            </label>
            <input
              type="text"
              id="input-email-subject"
              value={data.email.subject}
              onChange={(e) => handleFieldChange('email', 'subject', e.target.value)}
              placeholder="Inquiry / Feedback"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-email-body" className={labelClass}>
              Message Body
            </label>
            <textarea
              id="input-email-body"
              rows={3}
              value={data.email.body}
              onChange={(e) => handleFieldChange('email', 'body', e.target.value)}
              placeholder="Write your email message..."
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'location':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-loc-lat" className={labelClass}>
                Latitude
              </label>
              <input
                type="text"
                id="input-loc-lat"
                value={data.location.latitude}
                onChange={(e) => handleFieldChange('location', 'latitude', e.target.value)}
                placeholder="37.7749"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="input-loc-lng" className={labelClass}>
                Longitude
              </label>
              <input
                type="text"
                id="input-loc-lng"
                value={data.location.longitude}
                onChange={(e) => handleFieldChange('location', 'longitude', e.target.value)}
                placeholder="-122.4194"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="input-loc-address" className={labelClass}>
              Or Street Address / Place Name
            </label>
            <input
              type="text"
              id="input-loc-address"
              value={data.location.address}
              onChange={(e) => handleFieldChange('location', 'address', e.target.value)}
              placeholder="e.g. Empire State Building, New York"
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'phone':
      return (
        <div className="space-y-2">
          <label htmlFor="input-phone-num" className={labelClass}>
            Phone Number
          </label>
          <input
            type="tel"
            id="input-phone-num"
            value={data.phone.phone}
            onChange={(e) => handleFieldChange('phone', 'phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={inputClass}
          />
        </div>
      );

    case 'sms':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-sms-phone" className={labelClass}>
              Recipient Phone Number
            </label>
            <input
              type="tel"
              id="input-sms-phone"
              value={data.sms.phone}
              onChange={(e) => handleFieldChange('sms', 'phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-sms-msg" className={labelClass}>
              Prefilled SMS Text
            </label>
            <textarea
              id="input-sms-msg"
              rows={3}
              value={data.sms.message}
              onChange={(e) => handleFieldChange('sms', 'message', e.target.value)}
              placeholder="Hi, I am interested in..."
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'whatsapp':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-wa-phone" className={labelClass}>
              WhatsApp Phone Number (with Country Code)
            </label>
            <input
              type="tel"
              id="input-wa-phone"
              value={data.whatsapp.phone}
              onChange={(e) => handleFieldChange('whatsapp', 'phone', e.target.value)}
              placeholder="+14155552671"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-wa-msg" className={labelClass}>
              Prefilled Chat Message
            </label>
            <textarea
              id="input-wa-msg"
              rows={3}
              value={data.whatsapp.message}
              onChange={(e) => handleFieldChange('whatsapp', 'message', e.target.value)}
              placeholder="Hello! Let's connect on WhatsApp."
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'skype':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-skype-user" className={labelClass}>
              Skype Username or Email
            </label>
            <input
              type="text"
              id="input-skype-user"
              value={data.skype.username}
              onChange={(e) => handleFieldChange('skype', 'username', e.target.value)}
              placeholder="echo123"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Action Type</label>
            <div className="flex gap-2">
              {(['call', 'chat'] as const).map((act) => (
                <button
                  key={act}
                  type="button"
                  onClick={() => handleFieldChange('skype', 'action', act)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer ${
                    data.skype.action === act
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    case 'zoom':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-zoom-id" className={labelClass}>
              Zoom Meeting ID
            </label>
            <input
              type="text"
              id="input-zoom-id"
              value={data.zoom.meetingId}
              onChange={(e) => handleFieldChange('zoom', 'meetingId', e.target.value)}
              placeholder="123 456 7890"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-zoom-pwd" className={labelClass}>
              Meeting Passcode (Optional)
            </label>
            <input
              type="text"
              id="input-zoom-pwd"
              value={data.zoom.password || ''}
              onChange={(e) => handleFieldChange('zoom', 'password', e.target.value)}
              placeholder="Passcode"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-zoom-url" className={labelClass}>
              Or Direct Zoom Join Link
            </label>
            <input
              type="url"
              id="input-zoom-url"
              value={data.zoom.joinUrl || ''}
              onChange={(e) => handleFieldChange('zoom', 'joinUrl', e.target.value)}
              placeholder="https://zoom.us/j/..."
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'wifi':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-wifi-ssid" className={labelClass}>
              Network Name (SSID)
            </label>
            <input
              type="text"
              id="input-wifi-ssid"
              value={data.wifi.ssid}
              onChange={(e) => handleFieldChange('wifi', 'ssid', e.target.value)}
              placeholder="MyHomeWiFi"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-wifi-pwd" className={labelClass}>
              Wi-Fi Password
            </label>
            <input
              type="text"
              id="input-wifi-pwd"
              value={data.wifi.password}
              onChange={(e) => handleFieldChange('wifi', 'password', e.target.value)}
              placeholder="Network Password"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-wifi-enc" className={labelClass}>
                Encryption
              </label>
              <select
                id="input-wifi-enc"
                value={data.wifi.encryption}
                onChange={(e) => handleFieldChange('wifi', 'encryption', e.target.value)}
                className={inputClass}
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open)</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.wifi.hidden}
                  onChange={(e) => handleFieldChange('wifi', 'hidden', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span>Hidden Network</span>
              </label>
            </div>
          </div>
        </div>
      );

    case 'vcard':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-vcard-first" className={labelClass}>
                First Name
              </label>
              <input
                type="text"
                id="input-vcard-first"
                value={data.vcard.firstName}
                onChange={(e) => handleFieldChange('vcard', 'firstName', e.target.value)}
                placeholder="John"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="input-vcard-last" className={labelClass}>
                Last Name
              </label>
              <input
                type="text"
                id="input-vcard-last"
                value={data.vcard.lastName}
                onChange={(e) => handleFieldChange('vcard', 'lastName', e.target.value)}
                placeholder="Doe"
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-vcard-phone" className={labelClass}>
                Phone
              </label>
              <input
                type="tel"
                id="input-vcard-phone"
                value={data.vcard.phone}
                onChange={(e) => handleFieldChange('vcard', 'phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="input-vcard-email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="input-vcard-email"
                value={data.vcard.email}
                onChange={(e) => handleFieldChange('vcard', 'email', e.target.value)}
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-vcard-company" className={labelClass}>
                Company
              </label>
              <input
                type="text"
                id="input-vcard-company"
                value={data.vcard.company}
                onChange={(e) => handleFieldChange('vcard', 'company', e.target.value)}
                placeholder="Acme Corp"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="input-vcard-title" className={labelClass}>
                Job Title
              </label>
              <input
                type="text"
                id="input-vcard-title"
                value={data.vcard.jobTitle}
                onChange={(e) => handleFieldChange('vcard', 'jobTitle', e.target.value)}
                placeholder="Product Director"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="input-vcard-addr" className={labelClass}>
              Address
            </label>
            <input
              type="text"
              id="input-vcard-addr"
              value={data.vcard.address}
              onChange={(e) => handleFieldChange('vcard', 'address', e.target.value)}
              placeholder="123 Market St, Suite 400, San Francisco, CA"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-vcard-web" className={labelClass}>
              Website URL
            </label>
            <input
              type="url"
              id="input-vcard-web"
              value={data.vcard.website}
              onChange={(e) => handleFieldChange('vcard', 'website', e.target.value)}
              placeholder="https://example.com"
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'event':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-evt-title" className={labelClass}>
              Event Title
            </label>
            <input
              type="text"
              id="input-evt-title"
              value={data.event.title}
              onChange={(e) => handleFieldChange('event', 'title', e.target.value)}
              placeholder="Annual Community Conference"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-evt-loc" className={labelClass}>
              Event Location
            </label>
            <input
              type="text"
              id="input-evt-loc"
              value={data.event.location}
              onChange={(e) => handleFieldChange('event', 'location', e.target.value)}
              placeholder="Grand Ballroom / Zoom"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-evt-start" className={labelClass}>
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                id="input-evt-start"
                value={data.event.startDate}
                onChange={(e) => handleFieldChange('event', 'startDate', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="input-evt-end" className={labelClass}>
                End Date & Time
              </label>
              <input
                type="datetime-local"
                id="input-evt-end"
                value={data.event.endDate}
                onChange={(e) => handleFieldChange('event', 'endDate', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="input-evt-desc" className={labelClass}>
              Event Description
            </label>
            <textarea
              id="input-evt-desc"
              rows={3}
              value={data.event.description}
              onChange={(e) => handleFieldChange('event', 'description', e.target.value)}
              placeholder="Keynotes, networking sessions, and live demos."
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'paypal':
      return (
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Account Type</label>
            <div className="flex gap-2">
              {(['me', 'email'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleFieldChange('paypal', 'type', t)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase border cursor-pointer ${
                    data.paypal.type === t
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t === 'me' ? 'PayPal.me Username' : 'PayPal Email'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="input-paypal-acc" className={labelClass}>
              {data.paypal.type === 'me' ? 'PayPal.me Handle' : 'PayPal Email'}
            </label>
            <input
              type="text"
              id="input-paypal-acc"
              value={data.paypal.account}
              onChange={(e) => handleFieldChange('paypal', 'account', e.target.value)}
              placeholder={data.paypal.type === 'me' ? 'username' : 'payments@domain.com'}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-paypal-amt" className={labelClass}>
              Fixed Amount (Optional)
            </label>
            <input
              type="number"
              step="0.01"
              id="input-paypal-amt"
              value={data.paypal.amount || ''}
              onChange={(e) => handleFieldChange('paypal', 'amount', e.target.value)}
              placeholder="25.00"
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'bitcoin':
      return (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-btc-addr" className={labelClass}>
              Bitcoin Wallet Address
            </label>
            <input
              type="text"
              id="input-btc-addr"
              value={data.bitcoin.address}
              onChange={(e) => handleFieldChange('bitcoin', 'address', e.target.value)}
              placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="input-btc-amt" className={labelClass}>
              Amount in BTC (Optional)
            </label>
            <input
              type="number"
              step="0.0001"
              id="input-btc-amt"
              value={data.bitcoin.amount || ''}
              onChange={(e) => handleFieldChange('bitcoin', 'amount', e.target.value)}
              placeholder="0.005"
              className={inputClass}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};
