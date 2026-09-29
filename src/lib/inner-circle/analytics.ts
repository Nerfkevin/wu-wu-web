import posthog from "posthog-js";
import { readOrCreateVisitorId } from "@/lib/itsyunmei/storage";

type Props = Record<string, string | number | boolean>;

const POSTHOG_PROXY_PATH = "/wu-relay";
let started = false;
let entered = false;
const openedFaqs = new Set<string>();
let closedViewed = false;

function capture(event: string, properties?: Props) {
  if (typeof window === "undefined" || !started) return;
  posthog.capture(event, properties);
}

function markEntered() {
  if (entered) return;
  entered = true;
  const visitorId = readOrCreateVisitorId();
  posthog.identify(visitorId, {
    site: "wu-wu.com",
    visitor_id: visitorId,
  });
  posthog.register({
    funnel: "inner-circle",
    site: "wu-wu.com",
  });
  posthog.capture("$pageview", { path: window.location.pathname });
  posthog.capture("inner_circle_pageview", { path: window.location.pathname });
  posthog.setPersonProperties({
    entered_inner_circle: true,
    inner_circle_last_path: window.location.pathname,
  });
}

export function initInnerCircleAnalytics() {
  if (typeof window === "undefined") return;
  if (!window.location.pathname.startsWith("/yunmeisinnercircle")) return;
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return;

  if (posthog.__loaded) {
    started = true;
    markEntered();
    return;
  }
  if (started) return;
  started = true;
  posthog.init(token, {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "always",
    capture_exceptions: true,
    persistence: "localStorage",
    loaded: () => {
      markEntered();
    },
  });
}

export function trackCtaClicked(section: string) {
  capture("inner_circle_cta_clicked", { section });
  if (section === "explore") return;
  if (!started) return;
  posthog.setPersonProperties({
    inner_circle_cta_clicked: true,
    inner_circle_last_cta: section,
  });
}

export function trackCheckoutStarted(section: string) {
  capture("inner_circle_checkout_started", { section });
  if (!started) return;
  posthog.setPersonProperties({
    inner_circle_checkout_started: true,
    inner_circle_last_cta: section,
  });
}

export function trackFaqOpened(id: string) {
  if (openedFaqs.has(id)) return;
  openedFaqs.add(id);
  capture("inner_circle_faq_opened", { question: id });
}

export function trackClosedViewed() {
  if (closedViewed) return;
  closedViewed = true;
  capture("inner_circle_closed_viewed", { state: "closed" });
}

export function trackWaitlistClicked() {
  capture("inner_circle_waitlist_clicked", { state: "closed" });
}
