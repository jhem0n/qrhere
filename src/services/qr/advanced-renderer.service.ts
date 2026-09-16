import QRCode from 'qrcode';
import { QRAdvancedOptions, MarkerBorderStyle, MarkerCenterStyle, PatternStyle } from '../../types/qr-advanced.types';
import { getPresetSvgDataUri } from '../../utils/qr/preset-icons';

export interface AdvancedGenerationResult {
  dataUrl: string;
  svgString: string;
  mimeType: string;
}

// Helper to load image asynchronously with safety timeout
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export class AdvancedQRRenderer {
  public static async render(
    text: string,
    options: QRAdvancedOptions
  ): Promise<AdvancedGenerationResult> {
    if (!text || !text.trim()) {
      return { dataUrl: '', svgString: '', mimeType: 'image/png' };
    }

    // Auto-bump error correction to High (H) if a logo/watermark is present
    const hasLogo = Boolean(options.logoUrl || options.logoPreset);
    const effectiveEC = hasLogo ? 'H' : options.errorCorrection;

    // Generate raw QR module matrix
    const qr = QRCode.create(text, { errorCorrectionLevel: effectiveEC });
    const moduleCount = qr.modules.size;
    const margin = Math.max(0, options.margin);
    const totalGridSize = moduleCount + margin * 2;

    // Dimensions
    const baseSize = Math.max(128, Math.min(2048, options.size));
    const cellSize = baseSize / totalGridSize;
    const qrPixelSize = baseSize;

    // Frame layout dimensions
    let totalWidth = baseSize;
    let totalHeight = baseSize;
    let qrOffsetX = 0;
    let qrOffsetY = 0;
    let bannerHeight = 0;

    if (options.frameStyle === 'bottom-banner') {
      bannerHeight = Math.round(baseSize * 0.16);
      totalHeight = baseSize + bannerHeight;
    } else if (options.frameStyle === 'top-banner') {
      bannerHeight = Math.round(baseSize * 0.16);
      totalHeight = baseSize + bannerHeight;
      qrOffsetY = bannerHeight;
    } else if (options.frameStyle === 'phone-badge') {
      bannerHeight = Math.round(baseSize * 0.18);
      totalHeight = baseSize + bannerHeight + 24;
      totalWidth = baseSize + 24;
      qrOffsetX = 12;
      qrOffsetY = 24;
    } else if (options.frameStyle === 'circular-badge') {
      bannerHeight = Math.round(baseSize * 0.14);
      totalHeight = baseSize + bannerHeight + 16;
      totalWidth = baseSize + 16;
      qrOffsetX = 8;
      qrOffsetY = 8;
    }

    // Prepare Canvas
    const canvas = document.createElement('canvas');
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas 2D context could not be initialized');
    }

    // 1. Render Background
    if (!options.isTransparentBg) {
      ctx.fillStyle = options.bgColor || '#ffffff';
      ctx.fillRect(0, 0, totalWidth, totalHeight);
    } else {
      ctx.clearRect(0, 0, totalWidth, totalHeight);
    }

    // Optional Background Image
    if (options.bgImageUrl) {
      try {
        const bgImg = await loadImage(options.bgImageUrl);
        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(1.0, options.bgImageOpacity ?? 0.3));
        ctx.drawImage(bgImg, qrOffsetX, qrOffsetY, baseSize, baseSize);
        ctx.restore();
      } catch (e) {
        console.warn('Failed to load background image:', e);
      }
    }

    // 2. Compute Finder Pattern Zones (Top-Left, Top-Right, Bottom-Left)
    const isInFinderPattern = (r: number, c: number): boolean => {
      // Top-Left: rows 0..6, cols 0..6
      if (r <= 6 && c <= 6) return true;
      // Top-Right: rows 0..6, cols (moduleCount-7)..(moduleCount-1)
      if (r <= 6 && c >= moduleCount - 7) return true;
      // Bottom-Left: rows (moduleCount-7)..(moduleCount-1), cols 0..6
      if (r >= moduleCount - 7 && c <= 6) return true;
      return false;
    };

    // 3. Compute Logo Cutout Zone
    const centerModule = moduleCount / 2;
    const logoPercent = Math.max(10, Math.min(30, options.logoSize || 20));
    const logoCutoutRadiusModules = hasLogo && options.removeBgBehindLogo
      ? (moduleCount * (logoPercent / 100) * 1.18) / 2
      : 0;

    const isInLogoCutout = (r: number, c: number): boolean => {
      if (!logoCutoutRadiusModules) return false;
      const dr = Math.abs(r + 0.5 - centerModule);
      const dc = Math.abs(c + 0.5 - centerModule);
      return Math.sqrt(dr * dr + dc * dc) <= logoCutoutRadiusModules;
    };

    // 4. Foreground Fill Style (Gradient or Solid)
    let fgStyle: string | CanvasGradient = options.fgColor || '#000000';
    if (options.isGradient && options.gradientColor2) {
      const grad = ctx.createLinearGradient(
        qrOffsetX,
        qrOffsetY,
        qrOffsetX + qrPixelSize,
        qrOffsetY + qrPixelSize
      );
      grad.addColorStop(0, options.fgColor || '#000000');
      grad.addColorStop(1, options.gradientColor2);
      fgStyle = grad;
    }

    // 5. Draw QR Body Modules
    ctx.fillStyle = fgStyle;

    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        // Skip empty modules
        if (!qr.modules.get(r, c)) continue;
        // Skip finder patterns (drawn separately with custom markers)
        if (isInFinderPattern(r, c)) continue;
        // Skip modules hidden by logo cutout
        if (isInLogoCutout(r, c)) continue;

        const x = qrOffsetX + (c + margin) * cellSize;
        const y = qrOffsetY + (r + margin) * cellSize;
        const w = cellSize;
        const h = cellSize;

        drawModule(ctx, x, y, w, h, options.pattern);
      }
    }

    // 6. Draw 3 Finder Patterns
    const markerBorderColor = options.hasCustomMarkerColor
      ? options.markerBorderColor || options.fgColor
      : fgStyle;
    const markerCenterColor = options.hasCustomMarkerColor
      ? options.markerCenterColor || options.fgColor
      : fgStyle;

    const finderLocations = [
      { r: 0, c: 0 },
      { r: 0, c: moduleCount - 7 },
      { r: moduleCount - 7, c: 0 },
    ];

    finderLocations.forEach(({ r, c }) => {
      const cornerX = qrOffsetX + (c + margin) * cellSize;
      const cornerY = qrOffsetY + (r + margin) * cellSize;
      const cornerSize = 7 * cellSize;

      drawFinderPattern(
        ctx,
        cornerX,
        cornerY,
        cornerSize,
        cellSize,
        options.markerBorder,
        options.markerCenter,
        markerBorderColor,
        markerCenterColor,
        options.bgColor || '#ffffff',
        options.isTransparentBg
      );
    });

    // 7. Draw Logo Cutout Background & Logo Image
    if (hasLogo) {
      const logoSizePx = (qrPixelSize * logoPercent) / 100;
      const logoCenterX = qrOffsetX + qrPixelSize / 2;
      const logoCenterY = qrOffsetY + qrPixelSize / 2;
      const logoX = logoCenterX - logoSizePx / 2;
      const logoY = logoCenterY - logoSizePx / 2;

      // Draw background cutout if requested
      if (options.removeBgBehindLogo) {
        ctx.save();
        const cutoutPadding = logoSizePx * 0.12;
        const cutoutSize = logoSizePx + cutoutPadding * 2;
        const cutoutRadius = cutoutSize * 0.25;

        if (options.isTransparentBg) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          drawRoundedRect(
            ctx,
            logoCenterX - cutoutSize / 2,
            logoCenterY - cutoutSize / 2,
            cutoutSize,
            cutoutSize,
            cutoutRadius
          );
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        } else {
          ctx.fillStyle = options.bgColor || '#ffffff';
          ctx.beginPath();
          drawRoundedRect(
            ctx,
            logoCenterX - cutoutSize / 2,
            logoCenterY - cutoutSize / 2,
            cutoutSize,
            cutoutSize,
            cutoutRadius
          );
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw the logo itself
      const logoSource = options.logoUrl || (options.logoPreset ? getPresetSvgDataUri(options.logoPreset) : null);
      if (logoSource) {
        try {
          const logoImg = await loadImage(logoSource);
          ctx.drawImage(logoImg, logoX, logoY, logoSizePx, logoSizePx);
        } catch (e) {
          console.warn('Failed to draw logo on QR canvas:', e);
        }
      }
    }

    // 8. Draw Frame Banners
    if (options.frameStyle && options.frameStyle !== 'none') {
      const frameColor = options.hasCustomFrameColor
        ? options.frameColor || options.fgColor
        : options.fgColor || '#000000';

      drawFrame(
        ctx,
        totalWidth,
        totalHeight,
        qrOffsetX,
        qrOffsetY,
        baseSize,
        bannerHeight,
        options.frameStyle,
        options.frameLabel || 'SCAN ME',
        options.frameFont || 'Inter, sans-serif',
        options.frameLabelSize || 14,
        frameColor,
        options.bgColor || '#ffffff'
      );
    }

    const dataUrl = canvas.toDataURL('image/png');

    // 9. Generate SVG String
    const svgString = buildSVG({
      qr,
      moduleCount,
      margin,
      cellSize,
      baseSize,
      totalWidth,
      totalHeight,
      qrOffsetX,
      qrOffsetY,
      bannerHeight,
      options,
      hasLogo,
      logoPercent,
    });

    return {
      dataUrl,
      svgString,
      mimeType: 'image/png',
    };
  }
}

// Helpers for canvas shapes
function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  style: PatternStyle
) {
  switch (style) {
    case 'dots': {
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2, (w * 0.88) / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'rounded': {
      ctx.beginPath();
      drawRoundedRect(ctx, x, y, w, h, w * 0.35);
      ctx.fill();
      break;
    }
    case 'classy': {
      // Leaf style: rounded top-left and bottom-right
      ctx.beginPath();
      const r = w * 0.5;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'diamond': {
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w, y + h / 2);
      ctx.lineTo(x + w / 2, y + h);
      ctx.lineTo(x, y + h / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'square':
    default: {
      ctx.fillRect(x, y, w, h);
      break;
    }
  }
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

function drawFinderPattern(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  cellSize: number,
  borderStyle: MarkerBorderStyle,
  centerStyle: MarkerCenterStyle,
  borderColor: string | CanvasGradient,
  centerColor: string | CanvasGradient,
  bgColor: string,
  isTransparent: boolean
) {
  // Clear the 7x7 corner region
  if (isTransparent) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(x, y, size, size);
    ctx.restore();
  } else {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, size, size);
  }

  // 1. Draw Outer Border (7x7 with 5x5 cutout)
  ctx.fillStyle = borderColor;

  if (borderStyle === 'circle') {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const outerR = size / 2;
    const innerR = (size - 2 * cellSize) / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2, false);
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  } else if (borderStyle === 'rounded') {
    const rOuter = size * 0.28;
    const rInner = size * 0.16;
    const innerX = x + cellSize;
    const innerY = y + cellSize;
    const innerSize = size - 2 * cellSize;

    ctx.beginPath();
    drawRoundedRect(ctx, x, y, size, size, rOuter);
    ctx.closePath();
    ctx.fill();

    // Cutout center
    ctx.fillStyle = isTransparent ? '#ffffff' : bgColor;
    if (isTransparent) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      drawRoundedRect(ctx, innerX, innerY, innerSize, innerSize, rInner);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else {
      ctx.beginPath();
      drawRoundedRect(ctx, innerX, innerY, innerSize, innerSize, rInner);
      ctx.closePath();
      ctx.fill();
    }
  } else if (borderStyle === 'leaf') {
    // Outer leaf: top-left & bottom-right rounded
    ctx.beginPath();
    const r = size * 0.45;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size - r);
    ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();

    // Cutout center
    const innerX = x + cellSize;
    const innerY = y + cellSize;
    const innerSize = size - 2 * cellSize;
    ctx.fillStyle = isTransparent ? '#ffffff' : bgColor;
    if (isTransparent) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(innerX, innerY, innerSize, innerSize);
      ctx.restore();
    } else {
      ctx.fillRect(innerX, innerY, innerSize, innerSize);
    }
  } else {
    // Default square outer box
    ctx.fillRect(x, y, size, size);
    const innerX = x + cellSize;
    const innerY = y + cellSize;
    const innerSize = size - 2 * cellSize;

    ctx.fillStyle = isTransparent ? '#ffffff' : bgColor;
    if (isTransparent) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(innerX, innerY, innerSize, innerSize);
      ctx.restore();
    } else {
      ctx.fillRect(innerX, innerY, innerSize, innerSize);
    }
  }

  // 2. Draw Center Dot (3x3 modules centered at row 2..4, col 2..4)
  const centerX = x + 2 * cellSize;
  const centerY = y + 2 * cellSize;
  const centerSize = 3 * cellSize;
  const midX = x + size / 2;
  const midY = y + size / 2;

  ctx.fillStyle = centerColor;

  if (centerStyle === 'circle') {
    ctx.beginPath();
    ctx.arc(midX, midY, centerSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (centerStyle === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(midX, centerY);
    ctx.lineTo(centerX + centerSize, midY);
    ctx.lineTo(midX, centerY + centerSize);
    ctx.lineTo(centerX, midY);
    ctx.closePath();
    ctx.fill();
  } else if (centerStyle === 'star') {
    drawStar(ctx, midX, midY, 5, centerSize * 0.55, centerSize * 0.25);
  } else if (centerStyle === 'heart') {
    drawHeart(ctx, midX, midY, centerSize * 0.45);
  } else {
    // Standard square center
    ctx.fillRect(centerX, centerY, centerSize, centerSize);
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.translate(cx, cy - size * 0.2);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-size, -size * 0.8, -size * 1.3, size * 0.3, 0, size * 1.2);
  ctx.bezierCurveTo(size * 1.3, size * 0.3, size, -size * 0.8, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  totalWidth: number,
  totalHeight: number,
  qrOffsetX: number,
  qrOffsetY: number,
  baseSize: number,
  bannerHeight: number,
  style: string,
  label: string,
  font: string,
  fontSize: number,
  frameColor: string,
  bgColor: string
) {
  ctx.save();
  ctx.fillStyle = frameColor;

  if (style === 'bottom-banner') {
    // Banner rectangle at bottom
    const bannerY = baseSize;
    ctx.fillRect(0, bannerY, totalWidth, bannerHeight);

    // Label Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, totalWidth / 2, bannerY + bannerHeight / 2);
  } else if (style === 'top-banner') {
    // Banner rectangle at top
    ctx.fillRect(0, 0, totalWidth, bannerHeight);

    // Label Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, totalWidth / 2, bannerHeight / 2);
  } else if (style === 'phone-badge') {
    // Phone outline
    ctx.lineWidth = 4;
    ctx.strokeStyle = frameColor;
    ctx.beginPath();
    drawRoundedRect(ctx, 4, 4, totalWidth - 8, totalHeight - 8, 24);
    ctx.stroke();

    // Phone speaker notch at top
    ctx.fillStyle = frameColor;
    ctx.beginPath();
    drawRoundedRect(ctx, totalWidth / 2 - 24, 10, 48, 6, 3);
    ctx.fill();

    // Phone bottom banner
    const bannerY = totalHeight - bannerHeight - 6;
    ctx.beginPath();
    drawRoundedRect(ctx, 12, bannerY, totalWidth - 24, bannerHeight, 14);
    ctx.fill();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, totalWidth / 2, bannerY + bannerHeight / 2);
  } else if (style === 'circular-badge') {
    // Pill outline
    ctx.lineWidth = 3;
    ctx.strokeStyle = frameColor;
    ctx.strokeRect(4, 4, totalWidth - 8, totalHeight - 8);

    // Pill badge at bottom
    const pillW = Math.min(totalWidth - 32, label.length * fontSize * 0.9 + 40);
    const pillH = bannerHeight;
    const pillX = totalWidth / 2 - pillW / 2;
    const pillY = totalHeight - pillH - 4;

    ctx.fillStyle = frameColor;
    ctx.beginPath();
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, totalWidth / 2, pillY + pillH / 2);
  }

  ctx.restore();
}

// Vector SVG Builder mirroring all custom styling
function buildSVG(params: {
  qr: any;
  moduleCount: number;
  margin: number;
  cellSize: number;
  baseSize: number;
  totalWidth: number;
  totalHeight: number;
  qrOffsetX: number;
  qrOffsetY: number;
  bannerHeight: number;
  options: QRAdvancedOptions;
  hasLogo: boolean;
  logoPercent: number;
}): string {
  const {
    qr,
    moduleCount,
    margin,
    cellSize,
    baseSize,
    totalWidth,
    totalHeight,
    qrOffsetX,
    qrOffsetY,
    options,
    hasLogo,
    logoPercent,
  } = params;

  const bgRect = !options.isTransparentBg
    ? `<rect width="${totalWidth}" height="${totalHeight}" fill="${options.bgColor || '#ffffff'}"/>`
    : '';

  // Gradient defs if needed
  let defs = '';
  let fillRef = options.fgColor || '#000000';

  if (options.isGradient && options.gradientColor2) {
    defs += `
    <linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${options.fgColor || '#000000'}"/>
      <stop offset="100%" stop-color="${options.gradientColor2}"/>
    </linearGradient>`;
    fillRef = 'url(#qr-gradient)';
  }

  // Draw modules
  const isInFinderPattern = (r: number, c: number): boolean => {
    if (r <= 6 && c <= 6) return true;
    if (r <= 6 && c >= moduleCount - 7) return true;
    if (r >= moduleCount - 7 && c <= 6) return true;
    return false;
  };

  const centerModule = moduleCount / 2;
  const logoCutoutRadiusModules = hasLogo && options.removeBgBehindLogo
    ? (moduleCount * (logoPercent / 100) * 1.18) / 2
    : 0;

  const isInLogoCutout = (r: number, c: number): boolean => {
    if (!logoCutoutRadiusModules) return false;
    const dr = Math.abs(r + 0.5 - centerModule);
    const dc = Math.abs(c + 0.5 - centerModule);
    return Math.sqrt(dr * dr + dc * dc) <= logoCutoutRadiusModules;
  };

  const modulesSvg: string[] = [];

  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (!qr.modules.get(r, c)) continue;
      if (isInFinderPattern(r, c)) continue;
      if (isInLogoCutout(r, c)) continue;

      const x = qrOffsetX + (c + margin) * cellSize;
      const y = qrOffsetY + (r + margin) * cellSize;

      if (options.pattern === 'dots') {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const rad = (cellSize * 0.88) / 2;
        modulesSvg.push(`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fillRef}"/>`);
      } else if (options.pattern === 'rounded') {
        const rad = cellSize * 0.35;
        modulesSvg.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="${rad}" fill="${fillRef}"/>`);
      } else if (options.pattern === 'diamond') {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        modulesSvg.push(`<polygon points="${cx},${y} ${x + cellSize},${cy} ${cx},${y + cellSize} ${x},${cy}" fill="${fillRef}"/>`);
      } else {
        modulesSvg.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fillRef}"/>`);
      }
    }
  }

  // Draw 3 Finders
  const markerBorderColor = options.hasCustomMarkerColor
    ? options.markerBorderColor || options.fgColor
    : fillRef;
  const markerCenterColor = options.hasCustomMarkerColor
    ? options.markerCenterColor || options.fgColor
    : fillRef;

  const finderLocations = [
    { r: 0, c: 0 },
    { r: 0, c: moduleCount - 7 },
    { r: moduleCount - 7, c: 0 },
  ];

  const findersSvg = finderLocations.map(({ r, c }) => {
    const x = qrOffsetX + (c + margin) * cellSize;
    const y = qrOffsetY + (r + margin) * cellSize;
    const s = 7 * cellSize;
    const cs = cellSize;

    return `
    <g>
      <!-- Outer Finder Frame -->
      <rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${markerBorderColor}"/>
      <rect x="${x + cs}" y="${y + cs}" width="${s - 2 * cs}" height="${s - 2 * cs}" fill="${options.bgColor || '#ffffff'}"/>
      <!-- Inner Finder Center -->
      <rect x="${x + 2 * cs}" y="${y + 2 * cs}" width="${3 * cs}" height="${3 * cs}" fill="${markerCenterColor}"/>
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
    <defs>${defs}</defs>
    ${bgRect}
    <g id="qr-modules">${modulesSvg.join('')}</g>
    <g id="qr-finders">${findersSvg.join('')}</g>
  </svg>`;
}
