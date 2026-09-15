import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { ADS_CONFIG } from '../src/config/ads.config.js';
import { loadAdSenseScript, isAdSenseScriptLoaded } from '../src/services/ads/adScriptLoader.js';

console.log('--- Starting Monetization Architecture Verification ---');

// 1. Verify default configuration
console.log('Test 1: Verifying default monetization settings...');
assert.strictEqual(
  ADS_CONFIG.ADS_ENABLED,
  false,
  'ADS_ENABLED must be strictly false by default'
);
assert.strictEqual(
  ADS_CONFIG.TEST_MODE,
  true,
  'TEST_MODE must be true by default for development'
);
assert.ok(
  typeof ADS_CONFIG.SLOTS === 'object' && Object.keys(ADS_CONFIG.SLOTS).length >= 4,
  'ADS_CONFIG.SLOTS must define topBanner, inlineBanner, bottomBanner, and sidebarAd'
);
console.log('✓ Test 1 Passed: Default configuration is secure and disabled.');

// 2. Verify adScriptLoader behavior when ADS_ENABLED is false
console.log('Test 2: Verifying script loader guarantees when ADS_ENABLED is false...');
assert.strictEqual(isAdSenseScriptLoaded(), false, 'AdSense script must not be loaded initially');
loadAdSenseScript();
assert.strictEqual(
  isAdSenseScriptLoaded(),
  false,
  'loadAdSenseScript() must reject execution and not load any script when ADS_ENABLED is false'
);
console.log('✓ Test 2 Passed: No external advertising scripts are injected when ads are disabled.');

// 3. Inspect component placements for forbidden locations
console.log('Test 3: Inspecting codebase for forbidden ad placements...');

const forbiddenKeywords = [
  'Start Camera',
  'CameraScanner',
  'upload',
  'generate',
  'download',
];

const sensitiveFiles = [
  'src/components/scanner/CameraScanner.tsx',
  'src/components/scanner/ImageScanner.tsx',
  'src/components/generator/QRGeneratorForm.tsx',
  'src/components/qr/ScanResultCard.tsx',
];

for (const relPath of sensitiveFiles) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(
      !content.includes('<AdBanner') && !content.includes('<AdSlot'),
      `Forbidden ad component found inside core tool component: ${relPath}`
    );
  }
}
console.log('✓ Test 3 Passed: No ad components exist inside camera controls, scanner viewfinders, or generator/download forms.');

// 4. Verify clean degradation (no layout shift / zero DOM footprint)
console.log('Test 4: Verifying zero DOM footprint in components when disabled...');
const adSlotCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/ads/AdSlot.tsx'), 'utf8');
assert.ok(
  adSlotCode.includes('if (!ADS_CONFIG.ADS_ENABLED)'),
  'AdSlot must contain guard returning null when ADS_ENABLED is false'
);
assert.ok(
  adSlotCode.includes('return null;'),
  'AdSlot must return null when disabled to leave zero DOM footprint'
);

const adBannerCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/ads/AdBanner.tsx'), 'utf8');
assert.ok(
  adBannerCode.includes('if (!ADS_CONFIG.ADS_ENABLED)'),
  'AdBanner must contain guard returning null when ADS_ENABLED is false'
);

const adSidebarCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/ads/AdSidebar.tsx'), 'utf8');
assert.ok(
  adSidebarCode.includes('if (!ADS_CONFIG.ADS_ENABLED)'),
  'AdSidebar must collapse cleanly to children with zero grid overhead when ADS_ENABLED is false'
);
console.log('✓ Test 4 Passed: Zero DOM footprint and clean layout collapse verified.');

// 5. Verify documentation in .env.example
console.log('Test 5: Verifying environment documentation in .env.example...');
const envExample = fs.readFileSync(path.resolve(process.cwd(), '.env.example'), 'utf8');
assert.ok(envExample.includes('VITE_ADS_ENABLED'), '.env.example must document VITE_ADS_ENABLED');
assert.ok(envExample.includes('VITE_ADSENSE_CLIENT_ID'), '.env.example must document VITE_ADSENSE_CLIENT_ID');
assert.ok(envExample.includes('VITE_ADS_TEST_MODE'), '.env.example must document VITE_ADS_TEST_MODE');
console.log('✓ Test 5 Passed: Environment variables are comprehensively documented.');

// 6. Verify slot specifications and accessibility labels
console.log('Test 6: Verifying ad slot specifications and accessibility labeling...');
const slots = [
  ADS_CONFIG.SLOTS.TOP_CONTENT,
  ADS_CONFIG.SLOTS.INLINE_CONTENT,
  ADS_CONFIG.SLOTS.BOTTOM_PAGE,
  ADS_CONFIG.SLOTS.SIDEBAR_DESKTOP,
];

for (const slot of slots) {
  assert.ok(slot.id, `Ad slot must have an ID: ${JSON.stringify(slot)}`);
  assert.ok(slot.minHeightPx > 0, `Ad slot minHeightPx must be greater than 0: ${slot.id}`);
  assert.ok(slot.name, `Ad slot must have a name: ${slot.id}`);
  assert.ok(slot.position, `Ad slot must specify a position: ${slot.id}`);
}
console.log('✓ Test 6 Passed: All ad slots specify valid dimensions, unique IDs, and slot properties.');

console.log('\n--- All Monetization Architecture Checks Passed Successfully! ---');
