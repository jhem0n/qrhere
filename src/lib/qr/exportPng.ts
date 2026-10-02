export interface ExportOptions {
  format: 'png' | 'jpeg' | 'webp' | 'svg';
  size: number; // e.g. 300, 1024, 2048, 4096
  quality?: number; // 0.8 to 1.0
  fileName?: string;
}

/**
 * Converts an SVG string to an HTMLCanvasElement at the requested pixel resolution
 */
export async function svgToCanvas(svgString: string, targetSize: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    // Parse SVG to get aspect ratio
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');

    let viewBoxWidth = targetSize;
    let viewBoxHeight = targetSize;

    if (svgEl) {
      const viewBox = svgEl.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/\s+/).map(Number);
        if (parts.length === 4) {
          viewBoxWidth = parts[2];
          viewBoxHeight = parts[3];
        }
      }
    }

    const scale = targetSize / viewBoxWidth;
    const canvasWidth = Math.round(targetSize);
    const canvasHeight = Math.round(viewBoxHeight * scale);

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get 2D canvas context'));
      return;
    }

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

/**
 * Downloads the QR code as PNG, JPG, WebP, or SVG file
 */
export async function downloadQrCode(svgString: string, options: ExportOptions): Promise<void> {
  const { format, size, quality = 0.95, fileName = 'qr-code' } = options;

  if (format === 'svg') {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    triggerDownload(blob, `${fileName}.svg`);
    return;
  }

  const canvas = await svgToCanvas(svgString, size);
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
  const ext = format === 'jpeg' ? 'jpg' : format;

  canvas.toBlob(
    (blob) => {
      if (blob) {
        triggerDownload(blob, `${fileName}.${ext}`);
      }
    },
    mimeType,
    quality
  );
}

/**
 * Copies the rasterized PNG QR code directly to system clipboard
 */
export async function copyQrToClipboard(svgString: string, size = 1024): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      return false;
    }
    const canvas = await svgToCanvas(svgString, size);
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}

/**
 * Triggers native Web Share API on mobile devices
 */
export async function shareQrCode(svgString: string, title = 'QR Code'): Promise<boolean> {
  if (!navigator.share) return false;
  try {
    const canvas = await svgToCanvas(svgString, 1024);
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          const file = new File([blob], 'qr-code.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title,
              files: [file],
            });
            resolve(true);
          } else {
            await navigator.share({
              title,
              url: window.location.href,
            });
            resolve(true);
          }
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}

function triggerDownload(blob: Blob, fileName: string): void {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
