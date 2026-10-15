export type DownloadPlatform = 'mac' | 'mobile' | 'other' | 'unknown';

export interface PlatformSignals {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
  userAgentData?: { platform?: string; mobile?: boolean };
}

type DesktopSystem = 'mac' | 'windows' | 'linux' | 'chromeos';

function desktopSystem(value: string): DesktopSystem | undefined {
  if (/\bCrOS\b|^Chrome OS$/i.test(value)) return 'chromeos';
  if (/\bWindows\b|^Win(?:32|64|CE)$/i.test(value)) return 'windows';
  if (/\bMacintosh\b|\bMac OS X\b|^Mac(?:Intel|PPC|68K|OS)?$/i.test(value)) return 'mac';
  if (/\bLinux\b|\bX11\b|BSD|SunOS/i.test(value)) return 'linux';
}

// These are download hints, never proof of OS version or Apple silicon support.
// Keep this synchronous: the correct CTA renders on the first client render.
export function detectDownloadPlatform(signals: PlatformSignals): DownloadPlatform {
  const ua = signals.userAgent ?? '';
  const platform = signals.platform ?? '';
  const hints = signals.userAgentData;
  const identity = `${ua} ${platform} ${hints?.platform ?? ''}`;

  // Mobile tokens win over desktop tokens (e.g. Android contains "Linux",
  // iPhone contains "Mac OS X", and Windows Phone contains "Windows").
  if (/Android|iPhone|iPad|iPod|Windows Phone|IEMobile|BlackBerry|BB10|webOS|KaiOS|Silk\/|Mobile|Tablet|\biOS\b/i.test(identity)
    || hints?.mobile === true) return 'mobile';

  const systems = [desktopSystem(ua), desktopSystem(platform), desktopSystem(hints?.platform ?? '')]
    .filter((system): system is DesktopSystem => system !== undefined);

  // iPadOS desktop browsing identifies as Mac. Do this before accepting Mac
  // hints, including when a keyboard/trackpad is attached. Viewport is irrelevant.
  if (systems.includes('mac') && (signals.maxTouchPoints ?? 0) > 1) return 'mobile';

  if (systems.length === 0) return 'unknown';
  const hasMac = systems.includes('mac');
  if (hasMac && systems.some(system => system !== 'mac')) return 'unknown';
  return hasMac ? 'mac' : 'other';
}

export function currentDownloadPlatform(): DownloadPlatform {
  try {
    if (typeof navigator === 'undefined') return 'unknown';
    return detectDownloadPlatform(navigator as Navigator & PlatformSignals);
  } catch {
    // Privacy tools or embedded browsers may hide navigator signals.
    return 'unknown';
  }
}
