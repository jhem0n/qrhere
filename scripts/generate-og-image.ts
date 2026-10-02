import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function generateOgImage() {
  const svgContent = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e40af" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Subtle Decorative Grid Elements -->
  <g opacity="0.1" stroke="#ffffff" stroke-width="1.5">
    <line x1="0" y1="105" x2="1200" y2="105" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="525" x2="1200" y2="525" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Inner Glass Panel -->
  <rect x="80" y="70" width="1040" height="490" rx="32" fill="url(#card-grad)" stroke="#ffffff" stroke-width="2" stroke-opacity="0.25" />

  <!-- QR Here Logo Icon Box -->
  <g transform="translate(140, 155)">
    <!-- Squircle container -->
    <rect width="180" height="180" rx="42" fill="#ffffff" />
    <g transform="translate(20, 20) scale(0.273)">
      <!-- QR Pattern in Blue -->
      <rect x="0" y="0" width="140" height="140" rx="28" fill="none" stroke="#2563eb" stroke-width="28" />
      <rect x="48" y="48" width="44" height="44" rx="12" fill="#2563eb" />

      <rect x="372" y="0" width="140" height="140" rx="28" fill="none" stroke="#2563eb" stroke-width="28" />
      <rect x="420" y="48" width="44" height="44" rx="12" fill="#2563eb" />

      <rect x="0" y="372" width="140" height="140" rx="28" fill="none" stroke="#2563eb" stroke-width="28" />
      <rect x="48" y="420" width="44" height="44" rx="12" fill="#2563eb" />

      <!-- Dots -->
      <rect x="180" y="10" width="36" height="36" rx="8" fill="#2563eb" />
      <rect x="180" y="100" width="36" height="36" rx="8" fill="#2563eb" />
      <rect x="10" y="180" width="36" height="36" rx="8" fill="#2563eb" />
      <rect x="100" y="180" width="36" height="36" rx="8" fill="#2563eb" />
      <rect x="180" y="180" width="36" height="36" rx="8" fill="#2563eb" />

      <rect x="270" y="180" width="42" height="42" rx="10" fill="#2563eb" />
      <rect x="380" y="180" width="42" height="42" rx="10" fill="#2563eb" />
      <rect x="180" y="290" width="42" height="90" rx="10" fill="#2563eb" />
      <rect x="290" y="290" width="90" height="42" rx="10" fill="#2563eb" />
      <rect x="290" y="380" width="42" height="42" rx="10" fill="#2563eb" />
      <rect x="380" y="380" width="42" height="42" rx="10" fill="#2563eb" />

      <!-- Laser Beam -->
      <rect x="-20" y="246" width="552" height="20" rx="10" fill="#60a5fa" opacity="0.95" />
    </g>
  </g>

  <!-- Content Text -->
  <!-- Brand Name Pill -->
  <g transform="translate(370, 160)">
    <rect width="140" height="38" rx="19" fill="#ffffff" fill-opacity="0.2" />
    <text x="70" y="25" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" text-anchor="middle" letter-spacing="1">QR HERE</text>
  </g>

  <!-- Main Headline -->
  <text x="370" y="260" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" letter-spacing="-1">
    QR Code Scanner Online
  </text>

  <!-- Subheadline specified by user: "Free QR Code Scanner and Generator" -->
  <text x="370" y="325" fill="#dbeafe" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="600">
    Free QR Code Scanner and Generator
  </text>

  <!-- Feature Bullet Badges -->
  <g transform="translate(370, 385)">
    <!-- Badge 1 -->
    <rect x="0" y="0" width="165" height="42" rx="12" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
    <text x="82" y="26" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" text-anchor="middle">Camera Scanner</text>

    <!-- Badge 2 -->
    <rect x="180" y="0" width="155" height="42" rx="12" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
    <text x="257" y="26" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" text-anchor="middle">Image Upload</text>

    <!-- Badge 3 -->
    <rect x="350" y="0" width="170" height="42" rx="12" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
    <text x="435" y="26" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" text-anchor="middle">No App Needed</text>

    <!-- Badge 4 -->
    <rect x="535" y="0" width="145" height="42" rx="12" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
    <text x="607" y="26" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" text-anchor="middle">100% Private</text>
  </g>

  <!-- Domain Branding Bottom Right -->
  <text x="1070" y="525" fill="#93c5fd" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" text-anchor="end">
    https://qrhere.online
  </text>
</svg>
`;

  const outputPath = path.resolve(process.cwd(), 'public/og-image.png');
  await sharp(Buffer.from(svgContent))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log(`OG Image successfully created at: ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
