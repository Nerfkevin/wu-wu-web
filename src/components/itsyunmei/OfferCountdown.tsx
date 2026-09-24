"use client";

import { useEffect, useState } from "react";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";
import { latchOfferDeadline } from "@/lib/itsyunmei/storage";

const copy = itsYunmeiConfig.copy.offer;

export function formatOfferClock(msLeft: number): string {
  const total = Math.max(0, Math.ceil(msLeft / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function OfferCountdown({
  kind,
  durationMs,
  enabled,
}: {
  kind: "inline" | "end";
  durationMs: number;
  enabled: boolean;
}) {
  const [msLeft, setMsLeft] = useState(durationMs);

  useEffect(() => {
    if (!enabled) return;
    const endsAt = latchOfferDeadline(
      itsYunmeiConfig.videoVersion,
      kind,
      durationMs,
    );
    const tick = () => setMsLeft(Math.max(0, endsAt - Date.now()));
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [durationMs, enabled, kind]);

  if (!enabled) return null;

  const clock = formatOfferClock(msLeft);

  return (
    <p className="iy-offer-ends" aria-live="polite">
      {copy.endsIn}{" "}
      <time dateTime={`PT${Math.ceil(msLeft / 1000)}S`}>{clock}</time>
    </p>
  );
}
