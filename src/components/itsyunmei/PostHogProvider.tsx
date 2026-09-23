"use client";

import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import type { ReactNode } from "react";

/** Non-obvious path so ad blockers don't drop funnel events or replay. */
export const POSTHOG_PROXY_PATH = "/wu-relay";

function initItsYunmeiPostHog() {
  if (typeof window === "undefined" || posthog.__loaded) return;
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return;

  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || POSTHOG_PROXY_PATH,
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_exceptions: true,
    persistence: "localStorage",
    loaded: (client) => {
      client.register({ funnel: "itsyunmei" });
    },
  });
}

initItsYunmeiPostHog();

export function ItsYunmeiAnalytics({ children }: { children: ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
