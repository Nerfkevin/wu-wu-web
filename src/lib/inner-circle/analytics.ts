import posthog from "posthog-js";

type Props = Record<string, string | number | boolean>;

const POSTHOG_PROXY_PATH = "/wu-relay";
let started = false;
const openedFaqs = new Set<string>();
let closedViewed = false;

function capture(event: string, properties?: Props) {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.capture(event, properties);
}

export function initInnerCircleAnalytics() {
  if (typeof window === "undefined" || started || posthog.__loaded) return;
  if (!window.location.pathname.startsWith("/yunmeisinercircle")) return;
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return;
  started = true;
  posthog.init(token, {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "always",
    capture_exceptions: true,
    persistence: "localStorage",
    loaded: (client) => {
      client.register({
        funnel: "inner-circle",
        site: "wu-wu.com",
      });
    },
  });
}

export function trackCtaClicked(section: string) {
  capture("inner_circle_cta_clicked", { section });
}

export function trackCheckoutStarted(section: string) {
  capture("inner_circle_checkout_started", { section });
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
