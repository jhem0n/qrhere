import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  ADS_CONFIG,
  isValidAdSenseClientId,
  normalizeAdSenseClientId,
  canLoadLiveAutoAds,
} from '../src/config/ads.config.js';
import {
  loadGoogleAutoAdsScript,
  isAdSenseAutoAdsInjected,
} from '../src/services/ads/adScriptLoader.js';

console.log('--- Starting Google AdSense Auto Ads Verification ---');

// 1. Verify Client ID Validator and Normalizer
console.log('Test 1: Verifying client ID validation and normalization...');
assert.strictEqual(isValidAdSenseClientId(''), false, 'Empty string is invalid');
assert.strictEqual(isValidAdSenseClientId('ca-pub-XXXXXXXXXXXX'), false, 'Placeholder with X is invalid');
assert.strictEqual(isValidAdSenseClientId('G-LJDCL6XYYB'), false, 'Google Analytics ID must NOT be accepted as AdSense ID');
assert.strictEqual(isValidAdSenseClientId('ca-pub-1234567890123456'), true, 'ca-pub-16-digits is valid');
assert.strictEqual(isValidAdSenseClientId('pub-1234567890123456'), true, 'pub-16-digits is valid');
assert.strictEqual(
  normalizeAdSenseClientId('pub-1234567890123456'),
  'ca-pub-1234567890123456',
  'normalizeAdSenseClientId must prepend ca- if missing'
);
console.log('✓ Test 1 Passed: Client ID format validation and normalization are robust.');

// 2. Verify script loader behavior
console.log('Test 2: Verifying Auto ads loader behavior...');
assert.strictEqual(isAdSenseAutoAdsInjected(), false, 'Auto ads script must not be injected in test environment');
assert.strictEqual(canLoadLiveAutoAds(), false, 'canLoadLiveAutoAds must return false without valid client ID');
console.log('✓ Test 2 Passed: Auto ads loader safely prevents unauthorized or empty execution.');

// 3. Inspect pages and components for ZERO manual ad units or <ins> tags
console.log('Test 3: Verifying absolute absence of manual ad units and <ins> tags...');
const srcDir = path.resolve(process.cwd(), 'src');

function scanDirectory(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(
        !content.includes('<ins'),
        `Forbidden manual ad tag <ins> found in ${path.relative(process.cwd(), fullPath)}`
      );
      assert.ok(
        !content.includes('AdBanner') && !content.includes('AdSlot') && !content.includes('AdSidebar'),
        `Forbidden manual ad component reference found in ${path.relative(process.cwd(), fullPath)}`
      );
    }
  }
}

scanDirectory(srcDir);
console.log('✓ Test 3 Passed: Zero manual ad units, zero <ins> tags, and zero custom ad containers in entire src/ tree.');

// 4. Verify ads.txt exists and is accessible in public/
console.log('Test 4: Verifying ads.txt configuration...');
const adsTxtPath = path.resolve(process.cwd(), 'public/ads.txt');
assert.ok(fs.existsSync(adsTxtPath), 'public/ads.txt must exist');
const adsTxtContent = fs.readFileSync(adsTxtPath, 'utf8');
assert.ok(adsTxtContent.includes('google.com'), 'ads.txt must include google.com seller specification');
assert.ok(adsTxtContent.includes('pub-6935522846608744'), 'ads.txt must include exact publisher ID pub-6935522846608744');
assert.ok(adsTxtContent.includes('DIRECT'), 'ads.txt must include DIRECT relationship type');
assert.ok(adsTxtContent.includes('f08c47fec0942fa0'), 'ads.txt must include official Google AdSense certification authority ID');
console.log('✓ Test 4 Passed: ads.txt is properly deployed in public/ for production accessibility at /ads.txt.');

// 5. Verify documentation in .env.example
console.log('Test 5: Verifying environment variables documentation in .env.example...');
const envExample = fs.readFileSync(path.resolve(process.cwd(), '.env.example'), 'utf8');
assert.ok(envExample.includes('VITE_ADS_ENABLED'), '.env.example must document VITE_ADS_ENABLED');
assert.ok(envExample.includes('VITE_ADSENSE_CLIENT_ID'), '.env.example must document VITE_ADSENSE_CLIENT_ID');
assert.ok(envExample.includes('VITE_ADS_TEST_MODE'), '.env.example must document VITE_ADS_TEST_MODE');
assert.ok(envExample.includes('VITE_SITE_URL'), '.env.example must document VITE_SITE_URL');
console.log('✓ Test 5 Passed: Environment variables are comprehensively documented.');

console.log('\n--- All Google AdSense Auto Ads Verification Checks Passed! ---');
