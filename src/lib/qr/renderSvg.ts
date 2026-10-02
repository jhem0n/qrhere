import { QRDesignState } from '../../types/generator.types';
import { QRMatrixResult } from './matrix';
import { PRESET_ICONS } from './icons';
import { getFrame } from './frames';

export interface RenderedSvgResult {
  svgString: string;
  width: number;
  height: number;
  rawQrSvg: string;
  qrSizePx: number;
}

export function renderSvg(matrix: QRMatrixResult, state: QRDesignState): RenderedSvgResult {
  const { size: matrixSize, data } = matrix;
  const margin = Math.max(0, state.margin);
  const totalModules = matrixSize + margin * 2;
  const baseSize = 400; // coordinate space
  const moduleSize = baseSize / totalModules;

  // 1. Identify Finder Patterns (Top-Left, Top-Right, Bottom-Left)
  const isFinder = (r: number, c: number): boolean => {
    // Top-left 7x7 plus 1 module buffer
    if (r < 8 && c < 8) return true;
    // Top-right
    if (r < 8 && c >= matrixSize - 8) return true;
    // Bottom-left
    if (r >= matrixSize - 8 && c < 8) return true;
    return false;
  };

  // 2. Identify Center Logo Knockout Box
  const hasLogo = Boolean(state.logo.src || state.logo.preset);
  let logoStartModule = -1;
  let logoEndModule = -1;

  if (hasLogo && state.logo.knockout) {
    const coverageFactor = (state.logo.size || 22) / 100;
    const logoModuleSpan = Math.ceil(matrixSize * coverageFactor);
    // ensure odd span for perfect centering
    const span = logoModuleSpan % 2 === 0 ? logoModuleSpan + 1 : logoModuleSpan;
    const center = Math.floor(matrixSize / 2);
    const half = Math.floor(span / 2);
    logoStartModule = center - half;
    logoEndModule = center + half;
  }

  const isLogoKnockout = (r: number, c: number): boolean => {
    if (!hasLogo || !state.logo.knockout) return false;
    return r >= logoStartModule && r <= logoEndModule && c >= logoStartModule && c <= logoEndModule;
  };

  // 3. Definitions (Gradients & Filters)
  const gradientId = 'qr-grad-' + Math.random().toString(36).substring(2, 9);
  let defs = '';

  const fgFill = state.gradient.on ? `url(#${gradientId})` : state.fg;
  const eyeOuterFill = state.eyeColors.on ? state.eyeColors.outer : fgFill;
  const eyeInnerFill = state.eyeColors.on ? state.eyeColors.inner : fgFill;

  if (state.gradient.on) {
    if (state.gradient.kind === 'radial') {
      defs += `
        <radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${state.gradient.from}" />
          <stop offset="100%" stop-color="${state.gradient.to}" />
        </radialGradient>
      `;
    } else {
      const angle = state.gradient.angle || 45;
      const rad = (angle * Math.PI) / 180;
      const x1 = Math.round(50 - Math.cos(rad) * 50);
      const y1 = Math.round(50 - Math.sin(rad) * 50);
      const x2 = Math.round(50 + Math.cos(rad) * 50);
      const y2 = Math.round(50 + Math.sin(rad) * 50);

      defs += `
        <linearGradient id="${gradientId}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" stop-color="${state.gradient.from}" />
          <stop offset="100%" stop-color="${state.gradient.to}" />
        </linearGradient>
      `;
    }
  }

  // 4. Background
  let bgElement = '';
  if (!state.transparent) {
    bgElement = `<rect width="${baseSize}" height="${baseSize}" fill="${state.bg}" />`;
  }
  if (state.bgImage && state.bgImage.src) {
    const opacity = state.bgImage.opacity ?? 0.2;
    bgElement += `<image href="${state.bgImage.src}" width="${baseSize}" height="${baseSize}" preserveAspectRatio="xMidYMid slice" opacity="${opacity}" />`;
  }

  // 5. Draw Data Modules
  let dataModulesSvg = '';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (!data[r][c]) continue;
      if (isFinder(r, c)) continue;
      if (isLogoKnockout(r, c)) continue;

      const x = (c + margin) * moduleSize;
      const y = (r + margin) * moduleSize;

      switch (state.body) {
        case 'dots': {
          const cx = x + moduleSize / 2;
          const cy = y + moduleSize / 2;
          const radius = moduleSize * 0.44;
          dataModulesSvg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fgFill}" />`;
          break;
        }
        case 'rounded': {
          const rx = moduleSize * 0.28;
          dataModulesSvg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${rx}" fill="${fgFill}" />`;
          break;
        }
        case 'extra-rounded': {
          const rx = moduleSize * 0.46;
          dataModulesSvg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${rx}" fill="${fgFill}" />`;
          break;
        }
        case 'classy': {
          // Asymmetric rounding: top-left & bottom-right rounded
          const rx = moduleSize * 0.45;
          dataModulesSvg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${rx}" fill="${fgFill}" />`;
          break;
        }
        case 'diamond': {
          const cx = x + moduleSize / 2;
          const cy = y + moduleSize / 2;
          const d = moduleSize * 0.48;
          dataModulesSvg += `<polygon points="${cx},${cy - d} ${cx + d},${cy} ${cx},${cy + d} ${cx - d},${cy}" fill="${fgFill}" />`;
          break;
        }
        case 'vertical': {
          const rx = moduleSize * 0.35;
          dataModulesSvg += `<rect x="${x + moduleSize * 0.1}" y="${y}" width="${moduleSize * 0.8}" height="${moduleSize}" rx="${rx}" fill="${fgFill}" />`;
          break;
        }
        case 'horizontal': {
          const rx = moduleSize * 0.35;
          dataModulesSvg += `<rect x="${x}" y="${y + moduleSize * 0.1}" width="${moduleSize}" height="${moduleSize * 0.8}" rx="${rx}" fill="${fgFill}" />`;
          break;
        }
        case 'small-squares': {
          const s = moduleSize * 0.72;
          const offset = (moduleSize - s) / 2;
          dataModulesSvg += `<rect x="${x + offset}" y="${y + offset}" width="${s}" height="${s}" rx="${s * 0.15}" fill="${fgFill}" />`;
          break;
        }
        case 'square':
        default:
          dataModulesSvg += `<rect x="${x}" y="${y}" width="${moduleSize + 0.05}" height="${moduleSize + 0.05}" fill="${fgFill}" />`;
          break;
      }
    }
  }

  // 6. Draw Finder Patterns (3 Eyes)
  const drawEye = (originR: number, originC: number) => {
    const x = (originC + margin) * moduleSize;
    const y = (originR + margin) * moduleSize;
    const eyeSize = 7 * moduleSize;
    let eyeSvg = '';

    // Outer Frame (7x7 modules)
    switch (state.eyeOuter) {
      case 'circle': {
        const cx = x + eyeSize / 2;
        const cy = y + eyeSize / 2;
        const rOuter = eyeSize / 2;
        const rInner = (eyeSize - 2 * moduleSize) / 2;
        eyeSvg += `
          <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="${eyeOuterFill}" />
          <circle cx="${cx}" cy="${cy}" r="${rInner}" fill="${state.transparent ? '#ffffff' : state.bg}" />
        `;
        break;
      }
      case 'rounded': {
        const rx = moduleSize * 1.8;
        eyeSvg += `
          <rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" rx="${rx}" fill="${eyeOuterFill}" />
          <rect x="${x + moduleSize}" y="${y + moduleSize}" width="${eyeSize - 2 * moduleSize}" height="${eyeSize - 2 * moduleSize}" rx="${rx * 0.7}" fill="${state.transparent ? '#ffffff' : state.bg}" />
        `;
        break;
      }
      case 'leaf': {
        // Leaf shape: top-left & bottom-right round, top-right & bottom-left squared
        const rBig = eyeSize * 0.45;
        eyeSvg += `
          <path d="M ${x + rBig} ${y} L ${x + eyeSize} ${y} L ${x + eyeSize} ${y + eyeSize - rBig} A ${rBig} ${rBig} 0 0 1 ${x + eyeSize - rBig} ${y + eyeSize} L ${x} ${y + eyeSize} L ${x} ${y + rBig} A ${rBig} ${rBig} 0 0 1 ${x + rBig} ${y} Z" fill="${eyeOuterFill}" />
          <rect x="${x + moduleSize}" y="${y + moduleSize}" width="${eyeSize - 2 * moduleSize}" height="${eyeSize - 2 * moduleSize}" rx="${rBig * 0.5}" fill="${state.transparent ? '#ffffff' : state.bg}" />
        `;
        break;
      }
      case 'dotted': {
        // Outer border composed of dots
        const dotRadius = moduleSize * 0.45;
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 7; j++) {
            if (i === 0 || i === 6 || j === 0 || j === 6) {
              const dx = x + (j + 0.5) * moduleSize;
              const dy = y + (i + 0.5) * moduleSize;
              eyeSvg += `<circle cx="${dx}" cy="${dy}" r="${dotRadius}" fill="${eyeOuterFill}" />`;
            }
          }
        }
        break;
      }
      case 'square':
      default: {
        eyeSvg += `
          <rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" fill="${eyeOuterFill}" />
          <rect x="${x + moduleSize}" y="${y + moduleSize}" width="${eyeSize - 2 * moduleSize}" height="${eyeSize - 2 * moduleSize}" fill="${state.transparent ? '#ffffff' : state.bg}" />
        `;
        break;
      }
    }

    // Inner Center Dot (3x3 modules)
    const inX = x + 2 * moduleSize;
    const inY = y + 2 * moduleSize;
    const inSize = 3 * moduleSize;
    const inCx = inX + inSize / 2;
    const inCy = inY + inSize / 2;

    switch (state.eyeInner) {
      case 'circle': {
        eyeSvg += `<circle cx="${inCx}" cy="${inCy}" r="${inSize / 2}" fill="${eyeInnerFill}" />`;
        break;
      }
      case 'diamond': {
        const d = inSize * 0.48;
        eyeSvg += `<polygon points="${inCx},${inCy - d} ${inCx + d},${inCy} ${inCx},${inCy + d} ${inCx - d},${inCy}" fill="${eyeInnerFill}" />`;
        break;
      }
      case 'star': {
        const rOuter = inSize * 0.5;
        const rInner = inSize * 0.22;
        let starPoints = '';
        for (let s = 0; s < 10; s++) {
          const rCur = s % 2 === 0 ? rOuter : rInner;
          const a = (s * Math.PI) / 5 - Math.PI / 2;
          const px = inCx + rCur * Math.cos(a);
          const py = inCy + rCur * Math.sin(a);
          starPoints += `${px},${py} `;
        }
        eyeSvg += `<polygon points="${starPoints.trim()}" fill="${eyeInnerFill}" />`;
        break;
      }
      case 'heart': {
        const s = inSize * 0.04;
        eyeSvg += `
          <g transform="translate(${inCx}, ${inCy}) scale(${s}) translate(-12, -12)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${eyeInnerFill}" />
          </g>
        `;
        break;
      }
      case 'flower': {
        const rPetal = inSize * 0.28;
        eyeSvg += `
          <circle cx="${inCx - rPetal / 2}" cy="${inCy}" r="${rPetal}" fill="${eyeInnerFill}" opacity="0.9" />
          <circle cx="${inCx + rPetal / 2}" cy="${inCy}" r="${rPetal}" fill="${eyeInnerFill}" opacity="0.9" />
          <circle cx="${inCx}" cy="${inCy - rPetal / 2}" r="${rPetal}" fill="${eyeInnerFill}" opacity="0.9" />
          <circle cx="${inCx}" cy="${inCy + rPetal / 2}" r="${rPetal}" fill="${eyeInnerFill}" opacity="0.9" />
          <circle cx="${inCx}" cy="${inCy}" r="${inSize * 0.2}" fill="${eyeInnerFill}" />
        `;
        break;
      }
      case 'square':
      default: {
        const rx = moduleSize * 0.5;
        eyeSvg += `<rect x="${inX}" y="${inY}" width="${inSize}" height="${inSize}" rx="${rx}" fill="${eyeInnerFill}" />`;
        break;
      }
    }

    return eyeSvg;
  };

  const eyesSvg = `
    ${drawEye(0, 0)}
    ${drawEye(0, matrixSize - 7)}
    ${drawEye(matrixSize - 7, 0)}
  `;

  // 7. Center Logo / Watermark
  let logoSvg = '';
  if (hasLogo) {
    const sizePercent = Math.min(30, Math.max(10, state.logo.size || 22)) / 100;
    const logoAreaSize = baseSize * sizePercent;
    const logoX = (baseSize - logoAreaSize) / 2;
    const logoY = (baseSize - logoAreaSize) / 2;
    const padding = logoAreaSize * 0.12;

    // Knockout background
    if (state.logo.knockout) {
      if (state.logo.mask === 'round') {
        const cx = baseSize / 2;
        const cy = baseSize / 2;
        logoSvg += `<circle cx="${cx}" cy="${cy}" r="${logoAreaSize / 2 + padding / 2}" fill="${state.transparent ? '#ffffff' : state.bg}" />`;
      } else {
        const rx = logoAreaSize * 0.22;
        logoSvg += `
          <rect x="${logoX - padding / 2}" y="${logoY - padding / 2}" width="${logoAreaSize + padding}" height="${logoAreaSize + padding}" rx="${rx}" fill="${state.transparent ? '#ffffff' : state.bg}" />
        `;
      }
    }

    // Icon or Image
    if (state.logo.preset) {
      const preset = PRESET_ICONS.find((p) => p.id === state.logo.preset);
      if (preset) {
        const scale = logoAreaSize / 24;
        const groupAttrs = preset.isFilled
          ? `color="${fgFill}" fill="${fgFill}" stroke="none"`
          : `color="${fgFill}" stroke="${fgFill}" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
        logoSvg += `
          <g transform="translate(${logoX}, ${logoY}) scale(${scale})" ${groupAttrs}>
            ${preset.svgPath}
          </g>
        `;
      }
    } else if (state.logo.src) {
      logoSvg += `
        <image href="${state.logo.src}" x="${logoX}" y="${logoY}" width="${logoAreaSize}" height="${logoAreaSize}" preserveAspectRatio="xMidYMid meet" />
      `;
    }
  }

  // 8. Assemble Core QR SVG
  const rawQrSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${baseSize} ${baseSize}" width="${baseSize}" height="${baseSize}">
      <defs>${defs}</defs>
      ${bgElement}
      <g id="qr-data-modules">${dataModulesSvg}</g>
      <g id="qr-finder-eyes">${eyesSvg}</g>
      <g id="qr-center-logo">${logoSvg}</g>
    </svg>
  `;

  // 9. Frame Application
  const frameDef = getFrame(state.frame.id || 'none');
  const framed = frameDef.render({
    qrSvgContent: `
      <defs>${defs}</defs>
      ${bgElement}
      <g id="qr-data-modules">${dataModulesSvg}</g>
      <g id="qr-finder-eyes">${eyesSvg}</g>
      <g id="qr-center-logo">${logoSvg}</g>
    `,
    qrSize: baseSize,
    text: state.frame.text,
    textColor: state.frame.textColor || '#ffffff',
    frameColor: state.frame.color || state.fg || '#1F5BFF',
    fontWeight: state.frame.fontWeight || '700',
  });

  const fullSvgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${framed.width} ${framed.height}" width="${framed.width}" height="${framed.height}">
      ${framed.svgString}
    </svg>
  `;

  return {
    svgString: fullSvgString.trim(),
    width: framed.width,
    height: framed.height,
    rawQrSvg: rawQrSvg.trim(),
    qrSizePx: baseSize,
  };
}
