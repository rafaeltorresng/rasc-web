// Distribution facts for Rasc 0.1.0 — verified 2026-10-14 against GitHub Release v0.1.0.
const RELEASE_TAG = 'v0.1.0';
const RELEASE_BASE = `https://github.com/rafaeltorresng/rasc/releases/download/${RELEASE_TAG}`;

export const launch = {
  version: '0.1.0',
  build: 6,
  filename: 'Rasc-0.1.0-unsigned.dmg',
  downloadHref: `${RELEASE_BASE}/Rasc-0.1.0-unsigned.dmg`,
  checksumHref: `${RELEASE_BASE}/Rasc-0.1.0-unsigned.dmg.sha256`,
  sha256: 'c14f5ad965b6eb963311e0548cf6d42a24c1e086545b49f741a404a3e47e3853',
  installGuideHref:
    'https://github.com/rafaeltorresng/rasc/blob/main/docs/INSTALL-UNSIGNED.md',
  githubHref: 'https://github.com/rafaeltorresng/rasc',
  sourcePublic: true,
  publicReleaseReady: true,
  platform: 'Apple silicon · macOS 14+',
  refineRequirement: 'Refine needs macOS 26+ with Apple Intelligence enabled.',
  notarized: false,
} as const;
