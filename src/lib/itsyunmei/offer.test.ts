import { describe, expect, it } from "vitest";
import {
  getOfferRevealThreshold,
  latchOfferUnlocked,
  shouldRevealOffer,
} from "./offer";

describe("offer reveal", () => {
  it("uses 90% of duration when no timestamp is configured", () => {
    expect(getOfferRevealThreshold(100, null)).toBe(90);
    expect(shouldRevealOffer(89.9, 100, null, false)).toBe(false);
    expect(shouldRevealOffer(90, 100, null, false)).toBe(true);
  });

  it("uses an explicit timestamp when provided, including 0", () => {
    expect(getOfferRevealThreshold(120, 60)).toBe(60);
    expect(getOfferRevealThreshold(120, 0)).toBe(0);
    expect(shouldRevealOffer(0, 120, 0, false)).toBe(true);
  });

  it("clamps an explicit timestamp to the duration", () => {
    expect(getOfferRevealThreshold(50, 999)).toBe(50);
  });

  it("waits for valid metadata before calculating", () => {
    expect(getOfferRevealThreshold(0, 10)).toBeNull();
    expect(getOfferRevealThreshold(Number.NaN, 10)).toBeNull();
    expect(shouldRevealOffer(10, 0, null, false)).toBe(false);
  });

  it("reveals on ended even before the threshold", () => {
    expect(shouldRevealOffer(1, 100, 90, true)).toBe(true);
  });

  it("seeking past the threshold reveals; rewind does not hide", () => {
    const afterSeek = latchOfferUnlocked(false, 95, 100, null, false);
    expect(afterSeek).toBe(true);
    expect(latchOfferUnlocked(afterSeek, 12, 100, null, false)).toBe(true);
  });
});
