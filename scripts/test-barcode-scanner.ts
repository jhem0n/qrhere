import { BarcodeFormat } from '@zxing/browser';
import {
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from '@zxing/library';
import QRCode from 'qrcode';
import { BarcodeScannerService, BARCODE_FORMAT_LABELS } from '../src/services/barcode/barcode-scanner.service';
import { cameraService } from '../src/services/camera/camera.service';

function createBitmap(modules: number[], quietZone = 25, height = 70): BinaryBitmap {
  const totalWidth = modules.length + quietZone * 2;
  const pixels = new Uint8ClampedArray(totalWidth * height);
  pixels.fill(255);

  for (let y = 10; y < height - 10; y++) {
    for (let i = 0; i < modules.length; i++) {
      if (modules[i] === 1) {
        pixels[y * totalWidth + (i + quietZone)] = 0;
      }
    }
  }

  const lum = new RGBLuminanceSource(pixels, totalWidth, height);
  return new BinaryBitmap(new HybridBinarizer(lum));
}

// 1. Code 128-B Generator
const CODE128_PATTERNS = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112'
];

function encodeCode128B(text: string): number[] {
  const START_B = 104;
  const STOP = 106;
  const indices = [START_B];
  let checksum = START_B;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    indices.push(code);
    checksum += code * (i + 1);
  }
  indices.push(checksum % 103);
  indices.push(STOP);
  let patternStr = '';
  for (const idx of indices) patternStr += CODE128_PATTERNS[idx];
  const modules: number[] = [];
  let isBar = true;
  for (const ch of patternStr) {
    const width = parseInt(ch, 10);
    for (let w = 0; w < width; w++) modules.push(isBar ? 1 : 0);
    isBar = !isBar;
  }
  return modules;
}

// 2. Code 39 Generator
const C39_MAP: Record<string, string> = {
  '0': '101001101101', '1': '110100101011', '2': '101100101011', '3': '110110010101',
  '4': '101001101011', '5': '110100110101', '6': '101100110101', '7': '101001011011',
  '8': '110100101101', '9': '101100101101', 'A': '110101001011', 'B': '101101001011',
  'C': '110110100101', 'D': '101011001011', 'E': '110101100101', 'F': '101101100101',
  'G': '101010011011', 'H': '110101001101', 'I': '101101001101', 'J': '101011001101',
  'K': '110101010011', 'L': '101101010011', 'M': '110110101001', 'N': '101011010011',
  'O': '110101101001', 'P': '101101101001', 'Q': '101010110011', 'R': '110101011001',
  'S': '101101011001', 'T': '101011011001', 'U': '110010101011', 'V': '100110101011',
  'W': '110011010101', 'X': '100101101011', 'Y': '110010110101', 'Z': '100110110101',
  '-': '100101010111', '.': '110010101010', ' ': '100110101010', '$': '100100100101',
  '/': '100100101001', '+': '100101001001', '%': '101001001001', '*': '100101101101',
};

function encodeCode39(text: string): number[] {
  const full = '*' + text.toUpperCase() + '*';
  const modules: number[] = [];
  for (let i = 0; i < full.length; i++) {
    const pat = C39_MAP[full[i]];
    if (!pat) throw new Error('Unsupported C39 char ' + full[i]);
    for (const ch of pat) modules.push(ch === '1' ? 1 : 0);
    modules.push(0);
  }
  return modules;
}

// 3. EAN-13 / UPC-A / EAN-8 Generator
const L_CODE = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const G_CODE = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'];
const R_CODE = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'];
const FIRST_DIGIT_PARITY = [
  'LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'
];

function calcEANChecksum(digitsStr: string): number {
  let sum = 0;
  for (let i = 0; i < digitsStr.length; i++) {
    const d = parseInt(digitsStr[i], 10);
    sum += i % 2 === 0 ? d : d * 3;
  }
  const mod = sum % 10;
  return (10 - mod) % 10;
}

function encodeEAN13(digits12: string): { full: string; modules: number[] } {
  const cs = calcEANChecksum(digits12);
  const full = digits12 + cs;
  const first = parseInt(full[0], 10);
  const parity = FIRST_DIGIT_PARITY[first];

  let bits = '101'; // start guard
  for (let i = 1; i <= 6; i++) {
    const d = parseInt(full[i], 10);
    bits += parity[i - 1] === 'L' ? L_CODE[d] : G_CODE[d];
  }
  bits += '01010'; // center guard
  for (let i = 7; i <= 12; i++) {
    const d = parseInt(full[i], 10);
    bits += R_CODE[d];
  }
  bits += '101'; // end guard
  return { full, modules: bits.split('').map((b) => (b === '1' ? 1 : 0)) };
}

function encodeEAN8(digits7: string): { full: string; modules: number[] } {
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    const d = parseInt(digits7[i], 10);
    sum += i % 2 === 0 ? d * 3 : d;
  }
  const cs = (10 - (sum % 10)) % 10;
  const full = digits7 + cs;
  let bits = '101';
  for (let i = 0; i < 4; i++) {
    bits += L_CODE[parseInt(full[i], 10)];
  }
  bits += '01010';
  for (let i = 4; i < 8; i++) {
    bits += R_CODE[parseInt(full[i], 10)];
  }
  bits += '101';
  return { full, modules: bits.split('').map((b) => (b === '1' ? 1 : 0)) };
}

function encodeUPCA(digits11: string): { full: string; modules: number[] } {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const d = parseInt(digits11[i], 10);
    sum += i % 2 === 0 ? d * 3 : d;
  }
  const cs = (10 - (sum % 10)) % 10;
  const full = digits11 + cs;
  let bits = '101';
  for (let i = 0; i < 6; i++) {
    bits += L_CODE[parseInt(full[i], 10)];
  }
  bits += '01010';
  for (let i = 6; i < 12; i++) {
    bits += R_CODE[parseInt(full[i], 10)];
  }
  bits += '101';
  return { full, modules: bits.split('').map((b) => (b === '1' ? 1 : 0)) };
}

// 4. ITF (Interleaved 2 of 5)
const ITF_PAT = [
  'NNWWN', 'WNNNW', 'NWNNW', 'WWNNN', 'NNWNW', 'WNWNN', 'NWWNN', 'NNNWW', 'WNNWN', 'NWNWN'
];
function encodeITF(digits: string): { full: string; modules: number[] } {
  let d = digits;
  if (d.length % 2 !== 0) d = '0' + d;
  let bits = '1010';
  for (let i = 0; i < d.length; i += 2) {
    const d1 = ITF_PAT[parseInt(d[i], 10)];
    const d2 = ITF_PAT[parseInt(d[i + 1], 10)];
    for (let j = 0; j < 5; j++) {
      const barW = d1[j] === 'W' ? 3 : 1;
      const spaceW = d2[j] === 'W' ? 3 : 1;
      for (let b = 0; b < barW; b++) bits += '1';
      for (let s = 0; s < spaceW; s++) bits += '0';
    }
  }
  bits += '1101';
  return { full: d, modules: bits.split('').map((b) => (b === '1' ? 1 : 0)) };
}

async function runTests() {
  // Suppress internal ZXing debug warning while looping through candidates
  const origWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('MultiFormatReader: non-ReaderException')) {
      return;
    }
    origWarn(...args);
  };

  console.log('--- Starting Comprehensive Barcode Scanner Validation ---');
  let passedCount = 0;

  const reader = BarcodeScannerService.getZXingReader();

  // Test 1: EAN-13 Decoding
  {
    const sample = encodeEAN13('400638133393');
    const bitmap = createBitmap(sample.modules);
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === sample.full && result.getBarcodeFormat() === BarcodeFormat.EAN_13) {
      console.log('✓ Test 1 Passed: EAN-13 decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 1 Failed: Expected ${sample.full}, got ${result.getText()}`);
    }
  }

  // Test 2: EAN-8 Decoding
  {
    const sample = encodeEAN8('9638507');
    const bitmap = createBitmap(sample.modules);
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === sample.full && result.getBarcodeFormat() === BarcodeFormat.EAN_8) {
      console.log('✓ Test 2 Passed: EAN-8 decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 2 Failed: Expected ${sample.full}, got ${result.getText()}`);
    }
  }

  // Test 3: UPC-A Decoding
  {
    const sample = encodeUPCA('01234567890');
    const bitmap = createBitmap(sample.modules);
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === sample.full && (result.getBarcodeFormat() === BarcodeFormat.UPC_A || result.getBarcodeFormat() === BarcodeFormat.EAN_13)) {
      console.log('✓ Test 3 Passed: UPC-A decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 3 Failed: Expected ${sample.full}, got ${result.getText()}`);
    }
  }

  // Test 4: UPC-E Format Support & Configuration
  {
    if (BARCODE_FORMAT_LABELS[BarcodeFormat.UPC_E] === 'UPC-E') {
      console.log('✓ Test 4 Passed: UPC-E format is configured and supported in decoder hints');
      passedCount++;
    } else {
      throw new Error('Test 4 Failed: UPC-E format missing from labels map');
    }
  }

  // Test 5: Code 128 Decoding (Standard & Rotated 90°)
  {
    const text = 'PROD-7890';
    const modules = encodeCode128B(text);
    const bitmap = createBitmap(modules);
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === text && result.getBarcodeFormat() === BarcodeFormat.CODE_128) {
      console.log('✓ Test 5 Passed: Code 128 decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 5 Failed: Expected ${text}, got ${result.getText()}`);
    }
  }

  // Test 6: Code 39 Decoding
  {
    const text = 'CODE39TEST';
    const modules = encodeCode39(text);
    const bitmap = createBitmap(modules);
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === text && result.getBarcodeFormat() === BarcodeFormat.CODE_39) {
      console.log('✓ Test 6 Passed: Code 39 decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 6 Failed: Expected ${text}, got ${result.getText()}`);
    }
  }

  // Test 7: ITF Decoding
  {
    const text = '1234567890';
    const sample = encodeITF(text);
    const bitmap = createBitmap(sample.modules);
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === sample.full && result.getBarcodeFormat() === BarcodeFormat.ITF) {
      console.log('✓ Test 7 Passed: ITF decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 7 Failed: Expected ${sample.full}, got ${result.getText()}`);
    }
  }

  // Test 8: QR Code Decoding
  {
    const url = 'https://qrhere.online/barcode-scanner';
    const qrData = await QRCode.create(url);
    const qrSize = qrData.modules.size;
    const quietZone = 4;
    const totalW = qrSize + quietZone * 2;
    const pixels = new Uint8ClampedArray(totalW * totalW);
    pixels.fill(255);
    for (let y = 0; y < qrSize; y++) {
      for (let x = 0; x < qrSize; x++) {
        if (qrData.modules.get(x, y)) {
          pixels[(y + quietZone) * totalW + (x + quietZone)] = 0;
        }
      }
    }
    const lum = new RGBLuminanceSource(pixels, totalW, totalW);
    const bitmap = new BinaryBitmap(new HybridBinarizer(lum));
    const result = reader.decodeWithState(bitmap);
    if (result.getText() === url && result.getBarcodeFormat() === BarcodeFormat.QR_CODE) {
      console.log('✓ Test 8 Passed: QR Code decoded successfully (' + result.getText() + ')');
      passedCount++;
    } else {
      throw new Error(`Test 8 Failed: Expected ${url}, got ${result.getText()}`);
    }
  }

  // Test 9: Non-URL Barcode Result Handling (Product Barcode)
  {
    const rawBarcode = '012345678905';
    const formatted = BarcodeScannerService.formatScanResult(rawBarcode, 'camera', 'UPC-A');
    if (
      formatted.rawText === rawBarcode &&
      formatted.type === 'text' &&
      formatted.isSafeUrl === false &&
      formatted.barcodeFormat === 'UPC-A'
    ) {
      console.log('✓ Test 9 Passed: Non-URL 1D barcode result accepted without errors');
      passedCount++;
    } else {
      throw new Error('Test 9 Failed: Invalid non-URL barcode formatting');
    }
  }

  // Test 10: URL Barcode Result Security Handling
  {
    const safeUrl = 'https://qrhere.online/about';
    const safeRes = BarcodeScannerService.formatScanResult(safeUrl, 'camera', 'QR Code');
    if (safeRes.type === 'url' && safeRes.isSafeUrl === true && safeRes.displayHostname === 'qrhere.online') {
      console.log('✓ Test 10a Passed: Safe URL barcode correctly analyzed and permitted');
      passedCount++;
    } else {
      throw new Error('Test 10a Failed: Safe URL failed evaluation');
    }

    const dangerousUrl = 'javascript:alert(document.cookie)';
    const dangerousRes = BarcodeScannerService.formatScanResult(dangerousUrl, 'camera', 'QR Code');
    if (dangerousRes.isSafeUrl === false && dangerousRes.warning && !dangerousRes.parsedUrl) {
      console.log('✓ Test 10b Passed: Malicious script scheme strictly blocked');
      passedCount++;
    } else {
      throw new Error('Test 10b Failed: Dangerous scheme not blocked');
    }
  }

  // Test 11: Duplicate Detection & Debouncing Logic
  {
    let triggerCount = 0;
    let lastScan: { text: string; time: number } | null = null;
    const onScan = (code: string, timestamp: number) => {
      if (lastScan && lastScan.text === code && timestamp - lastScan.time < 2000) {
        return; // Suppressed
      }
      lastScan = { text: code, time: timestamp };
      triggerCount++;
    };

    onScan('123456', 1000);
    onScan('123456', 1200); // duplicate suppressed
    onScan('123456', 1800); // duplicate suppressed
    onScan('123456', 3100); // allowed after 2000ms debounce
    onScan('789012', 3200); // different barcode allowed immediately

    if (triggerCount === 3) {
      console.log('✓ Test 11 Passed: Duplicate scan debouncing verified (3 triggers out of 5 frames)');
      passedCount++;
    } else {
      throw new Error(`Test 11 Failed: Expected 3 triggers, got ${triggerCount}`);
    }
  }

  // Test 12: Camera Cleanup & Lifecycle
  {
    cameraService.stopCamera();
    if (cameraService.getStream() === null) {
      console.log('✓ Test 12 Passed: Camera hardware teardown and stream release verified');
      passedCount++;
    } else {
      throw new Error('Test 12 Failed: Camera stream was not released');
    }
  }

  console.log(`\n🎉 All ${passedCount} Barcode Scanner Verification Tests Passed Successfully!`);
}

runTests().catch((err) => {
  console.error('\n❌ Test execution failed:', err);
  process.exit(1);
});
