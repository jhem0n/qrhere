import QRCode from 'qrcode';
import { QREccLevel } from '../../types/generator.types';

export interface QRMatrixResult {
  size: number;
  data: boolean[][];
  version: number;
}

/**
 * Generates a 2D boolean array representing dark (true) and light (false) QR modules
 */
export function generateQRMatrix(text: string, ecc: QREccLevel = 'M'): QRMatrixResult {
  const qr = QRCode.create(text || 'https://qrhere.online', {
    errorCorrectionLevel: ecc,
  });

  const size = qr.modules.size;
  const data: boolean[][] = [];

  for (let r = 0; r < size; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < size; c++) {
      row.push(Boolean(qr.modules.get(r, c)));
    }
    data.push(row);
  }

  return {
    size,
    data,
    version: qr.version,
  };
}
