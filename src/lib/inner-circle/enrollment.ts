export type EnrollmentStatus = "unconfigured" | "upcoming" | "open" | "closed";

export type LaunchWindow = {
  opensAt: string | null;
  closesAt: string | null;
  timeZone: string | null;
  checkoutUrl: string | null;
};

export type EnrollmentSnapshot = {
  status: EnrollmentStatus;
  now: number;
  opensAtMs: number | null;
  closesAtMs: number | null;
  remainingMs: number;
  timeZone: string | null;
};

export function isHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(0);
    return true;
  } catch {
    return false;
  }
}

function parseIso(value: string | null): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export function resolveEnrollment(
  now: number,
  config: LaunchWindow,
): EnrollmentSnapshot {
  const timeZone =
    config.timeZone && isValidTimeZone(config.timeZone) ? config.timeZone : null;
  const closesAtMs = timeZone ? parseIso(config.closesAt) : null;
  const opensAtMs = timeZone ? parseIso(config.opensAt) : null;
  const empty: EnrollmentSnapshot = {
    status: "unconfigured",
    now,
    opensAtMs: null,
    closesAtMs: null,
    remainingMs: 0,
    timeZone: null,
  };

  if (!Number.isFinite(now) || !isHttpUrl(config.checkoutUrl)) return empty;
  if (!timeZone || closesAtMs == null) return empty;
  if (opensAtMs != null && opensAtMs >= closesAtMs) return empty;

  if (opensAtMs != null && now < opensAtMs) {
    return {
      status: "upcoming",
      now,
      opensAtMs,
      closesAtMs,
      remainingMs: 0,
      timeZone,
    };
  }

  if (now >= closesAtMs) {
    return {
      status: "closed",
      now,
      opensAtMs,
      closesAtMs,
      remainingMs: 0,
      timeZone,
    };
  }

  return {
    status: "open",
    now,
    opensAtMs,
    closesAtMs,
    remainingMs: closesAtMs - now,
    timeZone,
  };
}

export function splitRemaining(ms: number) {
  const total = Math.floor(Math.max(0, ms) / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function formatDeadline(ms: number, timeZone: string): string {
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(ms);
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(ms);
  return `${date} at ${time}`;
}
