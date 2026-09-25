import posthog from "posthog-js";

type Props = Record<string, string | number | boolean>;

const WATCH_MILESTONES = [10, 25, 50, 75, 90, 100] as const;

const shownCtas = new Set<string>();
const firedMilestones = new Set<number>();
let maxSeconds = 0;
let lastDuration = 0;
let lastFlushedMax = -1;
let lastPersonPercent = -1;

export function trackFunnelEvent(event: string, properties?: Props) {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}

export function trackCtaShown(source: "inline" | "end") {
  if (shownCtas.has(source)) return;
  shownCtas.add(source);
  trackFunnelEvent("cta_shown", { source });
  posthog.setPersonProperties({
    cta_shown: true,
    last_cta_shown_source: source,
    ...(source === "inline"
      ? { inline_cta_shown: true }
      : { popup_cta_shown: true }),
  });
}

export function trackButtonClicked(button: string, properties?: Props) {
  trackFunnelEvent("button_clicked", { button, ...properties });
  posthog.setPersonProperties({ last_button: button });
}

export function trackCheckoutClicked(source: "inline" | "end") {
  const button = source === "inline" ? "checkout_inline" : "checkout_popup";
  trackFunnelEvent("checkout_clicked", { source, button });
  trackFunnelEvent("button_clicked", { button, source });
  posthog.setPersonProperties({
    checkout_clicked: true,
    last_cta_source: source,
    last_button: button,
    ...(source === "inline"
      ? { inline_cta_clicked: true }
      : { popup_cta_clicked: true }),
  });
}

export function trackWatchProgress(currentTime: number, duration: number) {
  if (typeof window === "undefined") return;
  if (!Number.isFinite(duration) || duration <= 0) return;
  if (!Number.isFinite(currentTime) || currentTime < 0) return;

  lastDuration = duration;
  if (currentTime > maxSeconds) maxSeconds = currentTime;

  const percent = Math.min(100, Math.round((maxSeconds / duration) * 100));
  posthog.register({
    vsl_max_percent: percent,
    vsl_max_seconds: Math.round(maxSeconds),
  });
  if (percent !== lastPersonPercent) {
    lastPersonPercent = percent;
    posthog.setPersonProperties({
      vsl_max_percent: percent,
      vsl_max_seconds: Math.round(maxSeconds),
    });
  }

  for (const milestone of WATCH_MILESTONES) {
    if (percent < milestone || firedMilestones.has(milestone)) continue;
    firedMilestones.add(milestone);
    trackFunnelEvent("vsl_progress", {
      percent: milestone,
      seconds: Math.round(maxSeconds),
      duration: Math.round(duration),
    });
  }
}

export function flushWatchDepth(reason: "hidden" | "ended") {
  if (typeof window === "undefined") return;
  if (lastDuration <= 0 || maxSeconds < 1) return;
  const maxPercent = Math.min(
    100,
    Math.round((maxSeconds / lastDuration) * 100),
  );
  if (maxSeconds === lastFlushedMax && reason !== "ended") return;
  lastFlushedMax = maxSeconds;
  trackFunnelEvent("vsl_watch_depth", {
    max_seconds: Math.round(maxSeconds),
    max_percent: maxPercent,
    duration: Math.round(lastDuration),
    reason,
  });
}
