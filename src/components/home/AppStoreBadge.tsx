"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

import {
  APP_STORE_BADGE_SRC,
  APP_STORE_ITMS_URL,
  APP_STORE_URL,
} from "@/lib/app-store";

const sizeClass = {
  sm: "h-9 w-auto",
  md: "h-12 w-auto sm:h-14",
} as const;

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function AppStoreBadge({ size = "md" }: { size?: "sm" | "md" }) {
  function openAppStore(e: MouseEvent<HTMLAnchorElement>) {
    if (!isIOS()) return;

    // Same-window + itms-apps is more reliable than target=_blank in
    // Instagram / TikTok in-app browsers (they often trap https tabs).
    e.preventDefault();
    const started = Date.now();
    window.location.href = APP_STORE_ITMS_URL;

    // Only fall back if the page is still foreground (scheme blocked).
    window.setTimeout(() => {
      if (document.hidden || Date.now() - started > 1200) return;
      window.location.href = APP_STORE_URL;
    }, 500);
  }

  return (
    <a
      href={APP_STORE_URL}
      // Same-window: better App Store handoff from IG/TikTok in-app browsers.
      rel="noopener noreferrer"
      onClick={openAppStore}
      className="inline-block shrink-0 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
    >
      <Image
        src={APP_STORE_BADGE_SRC}
        alt="Download on the App Store"
        width={899}
        height={228}
        className={sizeClass[size]}
        priority
      />
    </a>
  );
}
