import type { CSSProperties } from "react";

export function parseAspectRatio(value: string): { w: number; h: number } {
  const parts = value.split("/").map((part) => Number(part.trim()));
  if (
    parts.length === 2 &&
    Number.isFinite(parts[0]) &&
    Number.isFinite(parts[1]) &&
    parts[0] > 0 &&
    parts[1] > 0
  ) {
    return { w: parts[0], h: parts[1] };
  }
  return { w: 16, h: 9 };
}

export function getPlayerWrapStyle(aspect: string): CSSProperties {
  const { w, h } = parseAspectRatio(aspect);
  return {
    marginInline: "auto",
    width: "100%",
    maxWidth: `min(100%, 760px, calc(min(80svh, 820px) * ${w} / ${h}))`,
    aspectRatio: `${w} / ${h}`,
  };
}

/** Stronger = faster start / slower finish inside the 15-minute exponential stretch. */
export const TIMELINE_EASING = 3;

export const TIMELINE_SEGMENTS = [
  { seconds: 30, fill: 0.15, ease: "linear" },
  { seconds: 90, fill: 0.3, ease: "linear" },
  { seconds: 15 * 60, fill: 0.9, ease: "exp" },
] as const;

type EaseKind = "linear" | "exp";

type Knot = {
  time: number;
  fill: number;
  ease: EaseKind;
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function easeOutExp(t: number, k = TIMELINE_EASING): number {
  const u = clamp01(t);
  const denom = 1 - Math.exp(-k);
  if (denom <= 0) return u;
  return (1 - Math.exp(-k * u)) / denom;
}

function easeOutExpInverse(visual: number, k = TIMELINE_EASING): number {
  const v = clamp01(visual);
  const denom = 1 - Math.exp(-k);
  if (denom <= 0) return v;
  return Math.min(1, Math.max(0, -Math.log(1 - v * denom) / k));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function timelineKnots(duration: number): Knot[] {
  if (!Number.isFinite(duration) || duration <= 0) {
    return [
      { time: 0, fill: 0, ease: "linear" },
      { time: 0, fill: 1, ease: "linear" },
    ];
  }

  const knots: Knot[] = [{ time: 0, fill: 0, ease: "linear" }];
  let time = 0;

  for (const spec of TIMELINE_SEGMENTS) {
    if (time >= duration) break;
    const next = Math.min(duration, time + spec.seconds);
    knots.push({
      time: next,
      fill: next >= duration ? 1 : spec.fill,
      ease: spec.ease,
    });
    time = next;
  }

  if (time < duration) {
    knots.push({ time: duration, fill: 1, ease: "linear" });
  }

  return knots;
}

function interpolateFill(
  from: Knot,
  to: Knot,
  time: number,
): number {
  const span = to.time - from.time;
  if (span <= 0) return to.fill;
  const u = (time - from.time) / span;
  if (to.ease === "exp") return lerp(from.fill, to.fill, easeOutExp(u));
  return lerp(from.fill, to.fill, u);
}

function interpolateTime(
  from: Knot,
  to: Knot,
  fill: number,
): number {
  const span = to.fill - from.fill;
  if (span <= 0) return to.time;
  const w = (fill - from.fill) / span;
  const u = to.ease === "exp" ? easeOutExpInverse(w) : w;
  return lerp(from.time, to.time, u);
}

/** Map playback seconds → bar fill 0–1. */
export function linearToTimeline(seconds: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const time = Math.min(
    duration,
    Math.max(0, Number.isFinite(seconds) ? seconds : 0),
  );
  const knots = timelineKnots(duration);
  for (let i = 1; i < knots.length; i += 1) {
    const to = knots[i];
    if (time <= to.time || i === knots.length - 1) {
      return interpolateFill(knots[i - 1], to, time);
    }
  }
  return 1;
}

/** Inverse of linearToTimeline — bar click position → playback seconds. */
export function timelineToLinear(visual: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const v = clamp01(visual);
  const knots = timelineKnots(duration);
  for (let i = 1; i < knots.length; i += 1) {
    const to = knots[i];
    if (v <= to.fill || i === knots.length - 1) {
      return interpolateTime(knots[i - 1], to, v);
    }
  }
  return duration;
}
