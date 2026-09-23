const PREFIX = "woowoo.itsyunmei";

export type FunnelScreen = "cards" | "vsl";

function keyScreen() {
  return `${PREFIX}.screen`;
}

function keyProgress(videoVersion: string) {
  return `${PREFIX}.${videoVersion}.progress`;
}

function keyOffer(videoVersion: string) {
  return `${PREFIX}.${videoVersion}.offerUnlocked`;
}

function canUseStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const probe = `${PREFIX}.probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function readRaw(key: string): string | null {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode / quota — ignore.
  }
}

function removeRaw(key: string) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function readFunnelScreen(): FunnelScreen {
  return readRaw(keyScreen()) === "vsl" ? "vsl" : "cards";
}

export function writeFunnelScreen(screen: FunnelScreen) {
  writeRaw(keyScreen(), screen);
}

export function readVideoProgress(videoVersion: string): number {
  const raw = readRaw(keyProgress(videoVersion));
  if (raw == null) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function writeVideoProgress(videoVersion: string, seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return;
  writeRaw(keyProgress(videoVersion), String(seconds));
}

export function clearVideoProgress(videoVersion: string) {
  removeRaw(keyProgress(videoVersion));
}

export function readOfferUnlocked(videoVersion: string): boolean {
  return readRaw(keyOffer(videoVersion)) === "1";
}

export function writeOfferUnlocked(videoVersion: string, unlocked: boolean) {
  if (unlocked) writeRaw(keyOffer(videoVersion), "1");
}

export function clampProgress(seconds: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  if (!Number.isFinite(seconds) || seconds < 0) return 0;
  const max = Math.max(0, duration - 0.35);
  return Math.min(seconds, max);
}

export function isMeaningfulUnfinishedProgress(
  seconds: number,
  duration: number | null,
  minSeconds: number,
): boolean {
  if (!Number.isFinite(seconds) || seconds < minSeconds) return false;
  if (duration == null || !Number.isFinite(duration) || duration <= 0) {
    return seconds >= minSeconds;
  }
  return seconds < duration - 1 && seconds < duration * 0.98;
}
