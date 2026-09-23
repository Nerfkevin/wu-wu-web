export function getOfferRevealThreshold(
  duration: number,
  offerRevealAtSeconds: number | null,
): number | null {
  if (!Number.isFinite(duration) || duration <= 0) return null;
  if (
    offerRevealAtSeconds != null &&
    Number.isFinite(offerRevealAtSeconds)
  ) {
    return Math.min(Math.max(0, offerRevealAtSeconds), duration);
  }
  return duration * 0.9;
}

export function shouldRevealOffer(
  currentTime: number,
  duration: number,
  offerRevealAtSeconds: number | null,
  ended: boolean,
): boolean {
  if (ended) return true;
  const threshold = getOfferRevealThreshold(duration, offerRevealAtSeconds);
  if (threshold == null) return false;
  if (!Number.isFinite(currentTime) || currentTime < 0) return false;
  return currentTime >= threshold;
}

export function latchOfferUnlocked(
  alreadyUnlocked: boolean,
  currentTime: number,
  duration: number,
  offerRevealAtSeconds: number | null,
  ended: boolean,
): boolean {
  return (
    alreadyUnlocked ||
    shouldRevealOffer(currentTime, duration, offerRevealAtSeconds, ended)
  );
}
