import { svgToCanvas } from './exportPng';

export interface PdfPrintSheetOptions {
  paperSize: 'a4' | 'letter';
  qrSizeCm: number; // e.g. 3, 5, 7, 10 cm
  copiesPerPage: number;
  label?: string;
  fileName?: string;
}

/**
 * Generates an A4 or Letter multi-copy PDF print sheet with cut guidelines and labels
 */
export async function generatePdfPrintSheet(
  svgString: string,
  options: PdfPrintSheetOptions
): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const { paperSize = 'a4', qrSizeCm = 5, copiesPerPage = 6, label = '', fileName = 'qr-print-sheet' } = options;

  // Paper dimensions in mm
  const isA4 = paperSize === 'a4';
  const pageWidthMm = isA4 ? 210 : 215.9;
  const pageHeightMm = isA4 ? 297 : 279.4;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: paperSize,
  });

  // Rasterize QR at high print DPI
  const canvas = await svgToCanvas(svgString, 1200);
  const imgData = canvas.toDataURL('image/png');

  const qrSizeMm = qrSizeCm * 10;
  const marginMm = 15;
  const usableWidth = pageWidthMm - marginMm * 2;
  const usableHeight = pageHeightMm - marginMm * 2;

  // Calculate grid columns and rows based on requested size and available space
  const cellWidth = qrSizeMm + 10;
  const cellHeight = qrSizeMm + (label ? 16 : 8);

  const cols = Math.max(1, Math.floor(usableWidth / cellWidth));
  const rows = Math.max(1, Math.floor(usableHeight / cellHeight));
  const maxPerPage = cols * rows;
  const actualCopies = Math.min(copiesPerPage, maxPerPage);

  const colSpacing = (usableWidth - cols * qrSizeMm) / (cols > 1 ? cols - 1 : 1);
  const rowSpacing = (usableHeight - rows * cellHeight) / (rows > 1 ? rows - 1 : 1);

  // Draw header brand note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated with QR Here (https://qrhere.online) — High-Resolution Print Sheet', marginMm, 8);

  for (let i = 0; i < actualCopies; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = cols === 1 ? (pageWidthMm - qrSizeMm) / 2 : marginMm + col * (qrSizeMm + colSpacing);
    const y = marginMm + row * (cellHeight + Math.max(4, rowSpacing));

    // Draw cut-guide bounding box (subtle dotted outline)
    doc.setDrawColor(220, 225, 235);
    doc.setLineDashPattern([1.5, 1.5], 0);
    doc.rect(x - 2, y - 2, qrSizeMm + 4, cellHeight, 'S');

    // Insert QR Code image
    doc.addImage(imgData, 'PNG', x, y, qrSizeMm, qrSizeMm);

    // Optional label text
    if (label) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      const textX = x + qrSizeMm / 2;
      const textY = y + qrSizeMm + 5;
      doc.text(label, textX, textY, { align: 'center' });
    }
  }

  doc.save(`${fileName}.pdf`);
}
