// Distribution facts for Rasc 0.1.1 — verified 2026-10-15 against GitHub Release v0.1.1.
const RELEASE_TAG = 'v0.1.1';
const RELEASE_BASE = `https://github.com/rafaeltorresng/rasc/releases/download/${RELEASE_TAG}`;

export const launch = {
  version: '0.1.1',
  build: 7,
  filename: 'Rasc-0.1.1-unsigned.dmg',
  downloadHref: `${RELEASE_BASE}/Rasc-0.1.1-unsigned.dmg`,
  checksumHref: `${RELEASE_BASE}/Rasc-0.1.1-unsigned.dmg.sha256`,
  sha256: '812323655859a5389cbd872075e81bc51509084ac14966c6a293911b5b383973',
  installGuideHref:
    'https://github.com/rafaeltorresng/rasc/blob/main/docs/INSTALL-UNSIGNED.md',
  githubHref: 'https://github.com/rafaeltorresng/rasc',
  sourcePublic: true,
  publicReleaseReady: true,
  platform: 'Apple silicon · macOS 14+',
  refineRequirement: 'Refine needs macOS 26+ with Apple Intelligence enabled.',
  notarized: false,
} as const;
