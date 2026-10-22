// Distribution facts for Rasc 0.1.3 — verified 2026-10-22 against GitHub Release v0.1.3.
const RELEASE_TAG = 'v0.1.3';
const RELEASE_BASE = `https://github.com/rafaeltorresng/rasc/releases/download/${RELEASE_TAG}`;

export const launch = {
  version: '0.1.3',
  build: 9,
  filename: 'Rasc-0.1.3-unsigned.dmg',
  downloadHref: `${RELEASE_BASE}/Rasc-0.1.3-unsigned.dmg`,
  checksumHref: `${RELEASE_BASE}/Rasc-0.1.3-unsigned.dmg.sha256`,
  sha256: 'a3ee1b99cfd8839238a589aee2a8d68768bb2c021e8a7efbe2557b22df969ee1',
  installGuideHref:
    `${import.meta.env.BASE_URL}install/`,
  githubHref: 'https://github.com/rafaeltorresng/rasc',
  sourcePublic: true,
  publicReleaseReady: true,
  platform: 'Apple silicon · macOS 14+',
  refineRequirement:
    'Refine requires macOS 26+, a compatible Mac, and Apple Intelligence enabled and ready. Capture, Keep, Home, and Search work without it.',
  notarized: false,
} as const;
