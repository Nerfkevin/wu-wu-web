import posthog from "posthog-js";

type Props = Record<string, string | number | boolean>;

export function trackFunnelEvent(event: string, properties?: Props) {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}
