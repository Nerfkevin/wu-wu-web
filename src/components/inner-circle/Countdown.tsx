"use client";

import { Fragment, useEffect, useState } from "react";
import { useEnrollment } from "./EnrollmentProvider";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const OFFER_MS = 60 * 60 * 1000;
let offerEndsAt = 0;

function offerDeadline() {
  if (!offerEndsAt) offerEndsAt = Date.now() + OFFER_MS;
  return offerEndsAt;
}

function splitClock(ms: number) {
  const total = Math.floor(Math.max(0, ms) / 1000);
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** One hour from each page load. Shared by the banner and the price card. */
export function HourCountdown({
  tone = "light",
  dividers = false,
}: {
  tone?: "light" | "dark";
  dividers?: boolean;
}) {
  const [remainingMs, setRemainingMs] = useState(OFFER_MS);

  useEffect(() => {
    const end = offerDeadline();
    const tick = () => setRemainingMs(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { hours, minutes, seconds } = splitClock(remainingMs);
  const units = [
    ["Hrs", pad(hours)],
    ["Min", pad(minutes)],
    ["Sec", pad(seconds)],
  ] as const;
  const circle =
    tone === "dark"
      ? "border border-white/35 bg-white/10 text-white"
      : "bg-white text-[#3F3226] shadow-[0_4px_10px_rgba(63,50,38,0.06)]";
  const label = tone === "dark" ? "text-white/75" : "text-[#8A8178]";

  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {units.map(([name, value], index) => (
        <Fragment key={name}>
          {dividers && index > 0 ? (
            <span className={tone === "dark" ? "text-white/80" : "text-[#8A8178]"}>:</span>
          ) : null}
          <div
            className={`flex flex-col items-center justify-center rounded-full ${
              dividers ? "h-10 w-10" : "h-11 w-11"
            } ${circle}`}
          >
            <span
              className={`font-ic-display font-semibold leading-none tabular-nums ${
                dividers ? "text-[13px]" : "text-[15px]"
              }`}
            >
              {value}
            </span>
            <span
              className={`mt-0.5 font-bold tracking-[0.08em] ${label} ${
                dividers ? "text-[7px]" : "text-[8px]"
              }`}
            >
              {name.toUpperCase()}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export function Countdown({
  tone = "light",
  variant = "boxes",
}: {
  tone?: "light" | "dark";
  variant?: "boxes" | "inline" | "circles";
}) {
  const { status, remaining } = useEnrollment();

  if (status === "closed") {
    return <p className="text-sm font-semibold">The 11:11 Portal has closed.</p>;
  }

  if (status !== "open" || !remaining) return null;

  if (variant === "circles") {
    const units =
      remaining.days > 0
        ? [
            ["Days", String(remaining.days)],
            ["Hrs", pad(remaining.hours)],
            ["Min", pad(remaining.minutes)],
          ]
        : [
            ["Hrs", pad(remaining.hours)],
            ["Min", pad(remaining.minutes)],
            ["Sec", pad(remaining.seconds)],
          ];
    const circle =
      tone === "dark"
        ? "border border-white/35 bg-white/10 text-white"
        : "bg-white text-[#3F3226] shadow-[0_4px_10px_rgba(63,50,38,0.06)]";
    const label = tone === "dark" ? "text-white/75" : "text-[#8A8178]";

    return (
      <div className="flex gap-1.5" aria-hidden="true">
        {units.map(([name, value]) => (
          <div
            key={name}
            className={`flex h-11 w-11 flex-col items-center justify-center rounded-full ${circle}`}
          >
            <span className="font-ic-display text-[15px] font-semibold leading-none tabular-nums">
              {value}
            </span>
            <span className={`mt-0.5 text-[8px] font-bold tracking-[0.08em] ${label}`}>
              {name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    const parts = [
      `${remaining.days}d`,
      `${pad(remaining.hours)}h`,
      `${pad(remaining.minutes)}m`,
      `${pad(remaining.seconds)}s`,
    ];
    return (
      <span
        className={`font-instrument-serif text-lg tabular-nums tracking-normal ${
          tone === "dark" ? "text-[#FAF7F1]" : "text-[#35253F]"
        }`}
        aria-hidden="true"
      >
        {parts.join(" ")}
      </span>
    );
  }

  const units = [
    ["Days", String(remaining.days)],
    ["Hours", pad(remaining.hours)],
    ["Minutes", pad(remaining.minutes)],
    ["Seconds", pad(remaining.seconds)],
  ] as const;

  const valueClass =
    tone === "dark" ? "text-[#FAF7F1]" : "text-[#35253F]";
  const labelClass =
    tone === "dark" ? "text-[#FAF7F1]/75" : "text-[#302B33]/70";
  const boxClass =
    tone === "dark"
      ? "rounded-xl bg-white/10"
      : "rounded-xl bg-[#FAF7F1] shadow-[0_8px_20px_rgba(53,37,63,0.06)]";

  return (
    <div className="ic-clock" aria-hidden="true">
      {units.map(([label, value]) => (
        <div key={label} className={`ic-clock-unit px-1.5 py-1.5 ${boxClass}`}>
          <strong className={`ic-clock-value font-instrument-serif text-xl ${valueClass}`}>
            {value}
          </strong>
          <span className={`mt-1 block text-[10px] font-semibold leading-tight tracking-normal ${labelClass}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function StatusLine({ className = "" }: { className?: string }) {
  const { status, deadlineLabel, opensLabel, waitlistUrl } = useEnrollment();

  if (status === "open" && deadlineLabel) {
    return (
      <p className={className}>Enrollment closes {deadlineLabel}.</p>
    );
  }

  if (status === "upcoming" && opensLabel) {
    return <p className={className}>Enrollment opens {opensLabel}.</p>;
  }

  if (status === "closed") {
    return (
      <p className={className}>
        {waitlistUrl
          ? "The 11:11 Portal has closed."
          : "This enrollment window has ended."}
      </p>
    );
  }

  return (
    <p className={className}>Enrollment timing is being confirmed.</p>
  );
}
