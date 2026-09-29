"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trackClosedViewed } from "@/lib/inner-circle/analytics";
import { innerCircleConfig } from "@/lib/inner-circle/config";
import {
  formatDeadline,
  isHttpUrl,
  resolveEnrollment,
  splitRemaining,
  type EnrollmentStatus,
} from "@/lib/inner-circle/enrollment";

type EnrollmentContextValue = {
  status: EnrollmentStatus;
  remaining: ReturnType<typeof splitRemaining> | null;
  deadlineLabel: string | null;
  opensLabel: string | null;
  canPurchase: boolean;
  waitlistUrl: string | null;
  memberSignInUrl: string | null;
};

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

export function EnrollmentProvider({
  serverNow,
  children,
}: {
  serverNow: number;
  children: ReactNode;
}) {
  const [now, setNow] = useState(serverNow);

  useEffect(() => {
    let offset = 0;
    let timer = 0;

    const apply = (server: number) => {
      offset = server - Date.now();
      setNow(Date.now() + offset);
    };

    const sync = async () => {
      try {
        const res = await fetch("/yunmeisinnercircle/time", { cache: "no-store" });
        if (!res.ok) return;
        const data: { now?: unknown } = await res.json();
        if (typeof data.now === "number" && Number.isFinite(data.now)) {
          apply(data.now);
        }
      } catch {
        /* keep the last verified instant */
      }
    };

    timer = window.setInterval(() => {
      setNow(Date.now() + offset);
    }, 1000);

    const onVisibility = () => {
      if (document.visibilityState === "visible") void sync();
    };

    document.addEventListener("visibilitychange", onVisibility);
    void sync();

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const snapshot = resolveEnrollment(now, innerCircleConfig);

  useEffect(() => {
    const root = document.querySelector(".ic-root");
    if (!root) return;
    if (snapshot.status === "open") root.setAttribute("data-offer", "open");
    else root.removeAttribute("data-offer");
  }, [snapshot.status]);

  useEffect(() => {
    if (snapshot.status === "closed") trackClosedViewed();
  }, [snapshot.status]);

  const value = useMemo<EnrollmentContextValue>(() => {
    const deadlineLabel =
      snapshot.closesAtMs != null && snapshot.timeZone
        ? formatDeadline(snapshot.closesAtMs, snapshot.timeZone)
        : null;
    const opensLabel =
      snapshot.status === "upcoming" &&
      snapshot.opensAtMs != null &&
      snapshot.timeZone
        ? formatDeadline(snapshot.opensAtMs, snapshot.timeZone)
        : null;
    return {
      status: snapshot.status,
      remaining: snapshot.status === "open" ? splitRemaining(snapshot.remainingMs) : null,
      deadlineLabel,
      opensLabel,
      canPurchase: snapshot.status === "open",
      waitlistUrl:
        snapshot.status === "closed" && isHttpUrl(innerCircleConfig.waitlistUrl)
          ? innerCircleConfig.waitlistUrl
          : null,
      memberSignInUrl: isHttpUrl(innerCircleConfig.memberSignInUrl)
        ? innerCircleConfig.memberSignInUrl
        : null,
    };
  }, [snapshot]);

  return (
    <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const value = useContext(EnrollmentContext);
  if (!value) throw new Error("useEnrollment must be used inside EnrollmentProvider");
  return value;
}
