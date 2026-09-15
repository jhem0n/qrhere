import { APP_CONFIG } from '../../config/app.config';

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  fileType?: 'png' | 'jpeg' | 'webp';
}

const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']);
const ALLOWED_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp']);

/**
 * Validates uploaded image file securely on client side before processing.
 * Checks MIME type, file extension, file size, and verifies magic bytes.
 */
export async function validateImageFile(file: File): Promise<FileValidationResult> {
  // 1. File existence check
  if (!file) {
    return { valid: false, error: 'No file was provided.' };
  }

  // 2. File size check
  const maxBytes = APP_CONFIG.limits.maxImageFileSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File size exceeds the ${APP_CONFIG.limits.maxImageFileSizeMB}MB limit (File is ${(
        file.size /
        (1024 * 1024)
      ).toFixed(1)}MB).`,
    };
  }

  if (file.size < 12) {
    return { valid: false, error: 'The uploaded file is empty or too small to be a valid image.' };
  }

  // 3. File extension check
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload a PNG, JPG, JPEG, or WEBP image.',
    };
  }

  // 4. Browser MIME type check
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file MIME type (${file.type}). Supported formats: PNG, JPG, WEBP.`,
    };
  }

  // 5. Magic Byte Inspection (Header check)
  try {
    const headerBuffer = await readFileSlice(file, 0, 12);
    const bytes = new Uint8Array(headerBuffer);

    // PNG: 89 50 4E 47
    const isPng =
      bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;

    // JPEG: FF D8 FF
    const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

    // WebP: RIFF ... WEBP (bytes 0-3: 52 49 46 46, bytes 8-11: 57 45 42 50)
    const isWebp =
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50;

    if (!isPng && !isJpeg && !isWebp) {
      return {
        valid: false,
        error: 'File signature does not match a valid PNG, JPEG, or WebP image.',
      };
    }

    return {
      valid: true,
      fileType: isPng ? 'png' : isJpeg ? 'jpeg' : 'webp',
    };
  } catch {
    return {
      valid: false,
      error: 'Failed to read file headers. The file may be corrupt or inaccessible.',
    };
  }
}

/**
 * Reads a slice of the file as an ArrayBuffer
 */
async function readFileSlice(file: File, start: number, end: number): Promise<ArrayBuffer> {
  const blob = file.slice(start, end);
  if (typeof blob.arrayBuffer === 'function') {
    return await blob.arrayBuffer();
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Safely revokes an object URL to prevent memory leaks
 */
export function safeRevokeObjectURL(url: string | null | undefined): void {
  if (url && url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // Ignore cleanup error
    }
  }
}
