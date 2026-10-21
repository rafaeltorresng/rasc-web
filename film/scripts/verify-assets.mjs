import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
const { assets } = JSON.parse(await readFile('assets-manifest.json', 'utf8'));
const seen = new Set();
for (const asset of assets) {
  assert(!path.isAbsolute(asset.path) && !asset.path.split('/').includes('..'));
  assert(!seen.has(asset.path), `Duplicate asset: ${asset.path}`); seen.add(asset.path);
  const bytes = await readFile(path.join('public', asset.path));
  assert.equal(bytes.length, asset.bytes, asset.path);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
}
console.log(`Verified ${assets.length} exact production assets; no image conversion.`);
