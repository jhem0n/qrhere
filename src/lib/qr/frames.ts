export interface FrameDefinition {
  id: string;
  name: string;
  defaultText: string;
  category: 'Popular' | 'Business' | 'Creative';
  render: (params: {
    qrSvgContent: string;
    qrSize: number;
    text: string;
    textColor: string;
    frameColor: string;
    fontWeight?: string;
  }) => {
    width: number;
    height: number;
    svgString: string;
  };
}

export const FRAMES: FrameDefinition[] = [
  {
    id: 'none',
    name: 'No Frame',
    defaultText: '',
    category: 'Popular',
    render: ({ qrSvgContent, qrSize }) => ({
      width: qrSize,
      height: qrSize,
      svgString: qrSvgContent,
    }),
  },
  {
    id: 'bottom-banner',
    name: 'Bottom Banner',
    defaultText: 'SCAN ME',
    category: 'Popular',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const padding = 24;
      const bannerHeight = 64;
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + bannerHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="28" fill="${frameColor}" />
          <rect x="${padding}" y="${padding}" width="${qrSize}" height="${qrSize}" rx="20" fill="#ffffff" />
          <g transform="translate(${padding}, ${padding})">
            ${qrSvgContent}
          </g>
          <text x="${totalWidth / 2}" y="${totalHeight - padding + 2}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="22" fill="${textColor}" letter-spacing="1">
            ${escapeXml(text || 'SCAN ME')}
          </text>
        `,
      };
    },
  },
  {
    id: 'top-banner',
    name: 'Top Banner',
    defaultText: 'SCAN HERE',
    category: 'Popular',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const padding = 24;
      const bannerHeight = 64;
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + bannerHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="28" fill="${frameColor}" />
          <text x="${totalWidth / 2}" y="${bannerHeight - 16}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="22" fill="${textColor}" letter-spacing="1">
            ${escapeXml(text || 'SCAN HERE')}
          </text>
          <rect x="${padding}" y="${padding + bannerHeight}" width="${qrSize}" height="${qrSize}" rx="20" fill="#ffffff" />
          <g transform="translate(${padding}, ${padding + bannerHeight})">
            ${qrSvgContent}
          </g>
        `,
      };
    },
  },
  {
    id: 'pill',
    name: 'Pill Frame',
    defaultText: 'Scan to Connect',
    category: 'Popular',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const padding = 20;
      const pillHeight = 44;
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + pillHeight / 2 + 10;
      const pillWidth = Math.min(totalWidth - 30, Math.max(160, (text || '').length * 12 + 40));

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight - pillHeight / 2}" rx="24" fill="#ffffff" stroke="${frameColor}" stroke-width="4" />
          <g transform="translate(${padding}, ${padding})">
            ${qrSvgContent}
          </g>
          <rect x="${(totalWidth - pillWidth) / 2}" y="${totalHeight - pillHeight - 2}" width="${pillWidth}" height="${pillHeight}" rx="${pillHeight / 2}" fill="${frameColor}" />
          <text x="${totalWidth / 2}" y="${totalHeight - pillHeight / 2 + 5}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="16" fill="${textColor}">
            ${escapeXml(text || 'Scan to Connect')}
          </text>
        `,
      };
    },
  },
  {
    id: 'phone-badge',
    name: 'Phone Badge',
    defaultText: 'Point Camera at Code',
    category: 'Creative',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '600' }) => {
      const padX = 28;
      const padTop = 50;
      const padBottom = 60;
      const totalWidth = qrSize + padX * 2;
      const totalHeight = qrSize + padTop + padBottom;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="40" fill="#0f172a" />
          <!-- Phone Screen -->
          <rect x="12" y="12" width="${totalWidth - 24}" height="${totalHeight - 24}" rx="32" fill="#ffffff" />
          <!-- Camera Notch -->
          <rect x="${totalWidth / 2 - 40}" y="18" width="80" height="12" rx="6" fill="#0f172a" />
          <g transform="translate(${padX}, ${padTop})">
            ${qrSvgContent}
          </g>
          <text x="${totalWidth / 2}" y="${totalHeight - 26}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="14" fill="${frameColor}">
            ${escapeXml(text || 'Point Camera at Code')}
          </text>
        `,
      };
    },
  },
  {
    id: 'card-shadow',
    name: 'Card with Shadow',
    defaultText: 'SCAN ME',
    category: 'Business',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const padding = 24;
      const barHeight = 48;
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + barHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
          <g transform="translate(${padding}, ${padding})">
            ${qrSvgContent}
          </g>
          <rect x="${padding}" y="${qrSize + padding + 6}" width="${qrSize}" height="${barHeight - 12}" rx="12" fill="${frameColor}" />
          <text x="${totalWidth / 2}" y="${qrSize + padding + 30}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="15" fill="${textColor}" letter-spacing="1">
            ${escapeXml(text || 'SCAN ME')}
          </text>
        `,
      };
    },
  },
  {
    id: 'ticket',
    name: 'Ticket / Voucher',
    defaultText: 'ADMIT ONE',
    category: 'Creative',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const pad = 24;
      const stubHeight = 56;
      const totalWidth = qrSize + pad * 2;
      const totalHeight = qrSize + pad * 2 + stubHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="20" fill="${frameColor}" />
          <!-- Notch cutouts -->
          <circle cx="0" cy="${qrSize + pad + 6}" r="14" fill="#ffffff" />
          <circle cx="${totalWidth}" cy="${qrSize + pad + 6}" r="14" fill="#ffffff" />
          <line x1="20" y1="${qrSize + pad + 6}" x2="${totalWidth - 20}" y2="${qrSize + pad + 6}" stroke="#ffffff" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
          <rect x="${pad}" y="${pad}" width="${qrSize}" height="${qrSize}" rx="14" fill="#ffffff" />
          <g transform="translate(${pad}, ${pad})">
            ${qrSvgContent}
          </g>
          <text x="${totalWidth / 2}" y="${totalHeight - 20}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="18" fill="${textColor}" letter-spacing="2">
            ${escapeXml(text || 'ADMIT ONE')}
          </text>
        `,
      };
    },
  },
  {
    id: 'speech-bubble',
    name: 'Speech Bubble',
    defaultText: 'Scan me!',
    category: 'Creative',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const pad = 24;
      const headerHeight = 54;
      const pointerHeight = 24;
      const totalWidth = qrSize + pad * 2;
      const totalHeight = qrSize + pad * 2 + headerHeight + pointerHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <!-- Main Bubble -->
          <rect width="${totalWidth}" height="${totalHeight - pointerHeight}" rx="28" fill="${frameColor}" />
          <!-- Pointer -->
          <polygon points="${totalWidth / 2 - 16},${totalHeight - pointerHeight - 1} ${totalWidth / 2},${totalHeight} ${totalWidth / 2 + 16},${totalHeight - pointerHeight - 1}" fill="${frameColor}" />
          <text x="${totalWidth / 2}" y="${headerHeight - 18}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="20" fill="${textColor}">
            ${escapeXml(text || 'Scan me!')}
          </text>
          <rect x="${pad}" y="${headerHeight}" width="${qrSize}" height="${qrSize}" rx="16" fill="#ffffff" />
          <g transform="translate(${pad}, ${headerHeight})">
            ${qrSvgContent}
          </g>
        `,
      };
    },
  },
  {
    id: 'circle-badge',
    name: 'Circular Badge',
    defaultText: 'SCAN WITH PHONE CAMERA',
    category: 'Creative',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '600' }) => {
      const radius = (qrSize * 1.45) / 2;
      const size = radius * 2;
      const offset = (size - qrSize) / 2;

      return {
        width: size,
        height: size,
        svgString: `
          <circle cx="${radius}" cy="${radius}" r="${radius}" fill="${frameColor}" />
          <circle cx="${radius}" cy="${radius}" r="${radius - 12}" fill="#ffffff" />
          <g transform="translate(${offset}, ${offset})">
            ${qrSvgContent}
          </g>
          <text x="${radius}" y="${size - 18}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="12" fill="${textColor}" letter-spacing="1">
            ${escapeXml(text || 'SCAN TO VIEW')}
          </text>
        `,
      };
    },
  },
  {
    id: 'table-tent',
    name: 'Table Tent / Menu',
    defaultText: 'Scan to View Menu & Order',
    category: 'Business',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const pad = 24;
      const topHeight = 70;
      const totalWidth = qrSize + pad * 2;
      const totalHeight = qrSize + pad * 2 + topHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="24" fill="#ffffff" stroke="${frameColor}" stroke-width="4" />
          <rect x="0" y="0" width="${totalWidth}" height="${topHeight}" rx="20" fill="${frameColor}" />
          <text x="${totalWidth / 2}" y="34" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="17" fill="${textColor}">
            WELCOME
          </text>
          <text x="${totalWidth / 2}" y="56" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="12" fill="${textColor}" opacity="0.9">
            ${escapeXml(text || 'Scan to View Menu')}
          </text>
          <g transform="translate(${pad}, ${topHeight + 14})">
            ${qrSvgContent}
          </g>
        `,
      };
    },
  },
  {
    id: 'polaroid',
    name: 'Polaroid Photo',
    defaultText: 'Our Story & Photos',
    category: 'Creative',
    render: ({ qrSvgContent, qrSize, text, frameColor, fontWeight = '600' }) => {
      const padSide = 24;
      const padTop = 24;
      const padBottom = 72;
      const totalWidth = qrSize + padSide * 2;
      const totalHeight = qrSize + padTop + padBottom;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <rect x="${padSide - 4}" y="${padTop - 4}" width="${qrSize + 8}" height="${qrSize + 8}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
          <g transform="translate(${padSide}, ${padTop})">
            ${qrSvgContent}
          </g>
          <text x="${totalWidth / 2}" y="${totalHeight - 32}" text-anchor="middle" font-family="'Caveat', 'Segoe Script', cursive, sans-serif" font-weight="${fontWeight}" font-size="24" fill="${frameColor}">
            ${escapeXml(text || 'Our Story')}
          </text>
        `,
      };
    },
  },
  {
    id: 'business-card',
    name: 'Business Card Layout',
    defaultText: 'Scan to Save Contact',
    category: 'Business',
    render: ({ qrSvgContent, qrSize, text, frameColor, fontWeight = '600' }) => {
      const padding = 20;
      const bannerHeight = 44;
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + bannerHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="16" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
          <g transform="translate(${padding}, ${padding})">
            ${qrSvgContent}
          </g>
          <line x1="${padding}" y1="${qrSize + padding + 6}" x2="${totalWidth - padding}" y2="${qrSize + padding + 6}" stroke="#e2e8f0" stroke-width="1.5" />
          <text x="${totalWidth / 2}" y="${totalHeight - 16}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="13" fill="${frameColor}">
            ${escapeXml(text || 'Scan to Save Contact')}
          </text>
        `,
      };
    },
  },
  {
    id: 'gradient-border',
    name: 'Gradient Outline',
    defaultText: 'Scan Here',
    category: 'Popular',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const strokeWidth = 8;
      const padding = 16;
      const pillHeight = 36;
      const totalWidth = qrSize + padding * 2 + strokeWidth * 2;
      const totalHeight = qrSize + padding * 2 + strokeWidth * 2 + pillHeight / 2;
      const pillWidth = Math.max(130, (text || '').length * 10 + 36);

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect x="${strokeWidth / 2}" y="${strokeWidth / 2}" width="${totalWidth - strokeWidth}" height="${totalHeight - pillHeight / 2 - strokeWidth}" rx="24" fill="#ffffff" stroke="${frameColor}" stroke-width="${strokeWidth}" />
          <g transform="translate(${padding + strokeWidth}, ${padding + strokeWidth})">
            ${qrSvgContent}
          </g>
          <rect x="${(totalWidth - pillWidth) / 2}" y="${totalHeight - pillHeight - strokeWidth}" width="${pillWidth}" height="${pillHeight}" rx="${pillHeight / 2}" fill="${frameColor}" />
          <text x="${totalWidth / 2}" y="${totalHeight - strokeWidth - pillHeight / 2 + 4}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="14" fill="${textColor}">
            ${escapeXml(text || 'Scan Here')}
          </text>
        `,
      };
    },
  },
  {
    id: 'arrow-callout',
    name: 'Arrow Callout',
    defaultText: 'Scan With Camera!',
    category: 'Creative',
    render: ({ qrSvgContent, qrSize, text, textColor, frameColor, fontWeight = '700' }) => {
      const padding = 20;
      const bannerHeight = 60;
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + bannerHeight;

      return {
        width: totalWidth,
        height: totalHeight,
        svgString: `
          <rect width="${totalWidth}" height="${totalHeight}" rx="24" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
          <rect x="${padding}" y="${padding}" width="${qrSize}" height="${qrSize}" rx="16" fill="#ffffff" />
          <g transform="translate(${padding}, ${padding})">
            ${qrSvgContent}
          </g>
          <!-- Curved Arrow & Text -->
          <g transform="translate(${padding}, ${qrSize + padding + 10})">
            <path d="M20 22 C 35 32, 50 12, 65 24" fill="none" stroke="${frameColor}" stroke-width="3" stroke-linecap="round" />
            <polygon points="68,24 60,20 62,28" fill="${frameColor}" />
            <text x="80" y="26" font-family="Inter, system-ui, sans-serif" font-weight="${fontWeight}" font-size="15" fill="${frameColor}">
              ${escapeXml(text || 'Scan With Camera!')}
            </text>
          </g>
        `,
      };
    },
  },
];

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function getFrame(id: string): FrameDefinition {
  return FRAMES.find((f) => f.id === id) || FRAMES[0];
}
