import assert from 'node:assert/strict';
import { test } from 'node:test';
import { detectDownloadPlatform, currentDownloadPlatform } from '../src/lib/downloadPlatform.ts';

const mac = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/26.0 Safari/605.1.15';
const windows = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36';
const linux = 'Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0';

const cases = [
  ['Safari on Mac (including Apple silicon with Intel UA)', { userAgent: mac, platform: 'MacIntel', maxTouchPoints: 0 }, 'mac'],
  ['Chrome on Mac with client hints', { userAgent: mac, platform: 'MacIntel', userAgentData: { platform: 'macOS', mobile: false } }, 'mac'],
  ['Firefox on Mac without client hints', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:140.0) Gecko/20100101 Firefox/140.0' }, 'mac'],
  ['Mac platform only', { platform: 'MacIntel' }, 'mac'],
  ['Mac client hints only', { userAgentData: { platform: 'macOS' } }, 'mac'],
  ['iPhone Safari', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1', platform: 'iPhone', maxTouchPoints: 5 }, 'mobile'],
  ['iPhone Chrome', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 CriOS/140.0.0.0 Mobile/15E148 Safari/604.1' }, 'mobile'],
  ['iPhone Firefox', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) FxiOS/140.0 Mobile/15E148 Safari/605.1.15' }, 'mobile'],
  ['iPad mobile mode', { userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148', platform: 'iPad', maxTouchPoints: 5 }, 'mobile'],
  ['iPad desktop mode with keyboard/trackpad', { userAgent: mac, platform: 'MacIntel', maxTouchPoints: 5 }, 'mobile'],
  ['iPhone requesting desktop website', { userAgent: mac, platform: 'MacIntel', maxTouchPoints: 5 }, 'mobile'],
  ['Mac-like UA with mobile client hints', { userAgent: mac, userAgentData: { platform: 'macOS', mobile: true } }, 'mobile'],
  ['iOS client hints only', { userAgentData: { platform: 'iOS', mobile: false } }, 'mobile'],
  ['Android phone', { userAgent: 'Mozilla/5.0 (Linux; Android 16; K) AppleWebKit/537.36 Chrome/140.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' }, 'mobile'],
  ['Android tablet without Mobile token', { userAgent: 'Mozilla/5.0 (Linux; Android 16; Tablet) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36' }, 'mobile'],
  ['Android requesting desktop with client hints', { userAgent: linux, userAgentData: { platform: 'Android', mobile: false } }, 'mobile'],
  ['Kindle tablet', { userAgent: 'Mozilla/5.0 (X11; Linux) AppleWebKit/537.36 Silk/140.1 Safari/537.36' }, 'mobile'],
  ['Windows Chrome', { userAgent: windows, platform: 'Win32', userAgentData: { platform: 'Windows', mobile: false } }, 'other'],
  ['Windows touch laptop', { userAgent: windows, platform: 'Win32', maxTouchPoints: 10 }, 'other'],
  ['Windows Firefox without hints', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0' }, 'other'],
  ['Linux Firefox', { userAgent: linux, platform: 'Linux x86_64' }, 'other'],
  ['Linux client hints', { userAgentData: { platform: 'Linux', mobile: false } }, 'other'],
  ['ChromeOS with legacy Linux platform', { userAgent: 'Mozilla/5.0 (X11; CrOS x86_64 16267.0.0) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36', platform: 'Linux x86_64', userAgentData: { platform: 'Chrome OS' } }, 'other'],
  ['ChromeOS without conflicting legacy Linux signal', { userAgentData: { platform: 'Chrome OS' } }, 'other'],
  ['FreeBSD', { userAgent: 'Mozilla/5.0 (X11; FreeBSD amd64; rv:140.0) Gecko/20100101 Firefox/140.0' }, 'other'],
  ['empty identity', {}, 'unknown'],
  ['unrecognized embedded browser', { userAgent: 'CustomBrowser/1.0', platform: '' }, 'unknown'],
  ['empty client hints fall back to Safari identity', { userAgent: mac, userAgentData: { platform: '' } }, 'mac'],
  ['contradictory client hints do not assert Mac compatibility', { userAgent: windows, userAgentData: { platform: 'macOS' } }, 'unknown'],
  ['contradictory legacy platform', { userAgent: mac, platform: 'Win32' }, 'unknown'],
  ['touch capability alone is not mobile detection', { maxTouchPoints: 10 }, 'unknown'],
];

for (const [name, signals, expected] of cases) {
  test(name, () => assert.equal(detectDownloadPlatform(signals), expected));
}

test('hidden browser signals fall back without throwing', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', { configurable: true, get() { throw new Error('unavailable'); } });
  try { assert.equal(currentDownloadPlatform(), 'unknown'); }
  finally {
    if (original) Object.defineProperty(globalThis, 'navigator', original);
    else delete globalThis.navigator;
  }
});
