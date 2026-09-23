import { describe, expect, it } from "vitest";
import {
  linearToTimeline,
  parseAspectRatio,
  timelineToLinear,
} from "./media";
import {
  clampProgress,
  isMeaningfulUnfinishedProgress,
} from "./storage";

describe("aspect ratio", () => {
  it("parses landscape and portrait values", () => {
    expect(parseAspectRatio("16 / 9")).toEqual({ w: 16, h: 9 });
    expect(parseAspectRatio("9/16")).toEqual({ w: 9, h: 16 });
  });

  it("falls back to 16/9", () => {
    expect(parseAspectRatio("nope")).toEqual({ w: 16, h: 9 });
  });
});

describe("eased timeline", () => {
  const duration = 1260;

  it("hits the four designed hinges", () => {
    expect(linearToTimeline(0, duration)).toBe(0);
    expect(linearToTimeline(30, duration)).toBeCloseTo(0.15, 8);
    expect(linearToTimeline(120, duration)).toBeCloseTo(0.3, 8);
    expect(linearToTimeline(1020, duration)).toBeCloseTo(0.9, 8);
    expect(linearToTimeline(duration, duration)).toBeCloseTo(1, 8);
  });

  it("moves linearly through the first two hinges", () => {
    expect(linearToTimeline(15, duration)).toBeCloseTo(0.075, 8);
    expect(linearToTimeline(75, duration)).toBeCloseTo(0.225, 8);
  });

  it("eases the 15-minute stretch toward 90%", () => {
    const start = 120;
    const end = 1020;
    const mid = start + (end - start) * 0.25;
    const linearMid = 0.3 + 0.6 * 0.25;
    expect(linearToTimeline(mid, duration)).toBeGreaterThan(linearMid);
  });

  it("inverts click position back to seconds", () => {
    for (const seconds of [0, 15, 30, 75, 120, 400, 1020, 1140, 1260]) {
      expect(
        timelineToLinear(linearToTimeline(seconds, duration), duration),
      ).toBeCloseTo(seconds, 6);
    }
  });
});

describe("progress restore", () => {
  it("clamps restored progress to the current duration", () => {
    expect(clampProgress(80, 50)).toBe(49.65);
    expect(clampProgress(-4, 50)).toBe(0);
  });

  it("treats near-end progress as finished", () => {
    expect(isMeaningfulUnfinishedProgress(12, 100, 3)).toBe(true);
    expect(isMeaningfulUnfinishedProgress(2, 100, 3)).toBe(false);
    expect(isMeaningfulUnfinishedProgress(99.5, 100, 3)).toBe(false);
  });
});
