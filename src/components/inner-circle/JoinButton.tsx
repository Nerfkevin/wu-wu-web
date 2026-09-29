"use client";

import type { ReactNode } from "react";
import { trackCheckoutStarted, trackCtaClicked } from "@/lib/inner-circle/analytics";
import { innerCircleConfig } from "@/lib/inner-circle/config";
import { cn } from "@/lib/utils";
import { useEnrollment } from "./EnrollmentProvider";

const variants = {
  primary:
    "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#A7562B] px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_10px_24px_rgba(167,86,43,0.28)] transition hover:bg-[#8E4824] sm:w-auto",
  compact:
    "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#A7562B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8E4824]",
  sticky:
    "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#A7562B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8E4824]",
  onDark:
    "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#FAF7F1] px-6 py-3.5 text-center text-base font-semibold text-[#3F3226] hover:bg-white",
} as const;

export function JoinButton({
  section,
  children,
  variant = "primary",
  id,
  className,
}: {
  section: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  id?: string;
  className?: string;
}) {
  const { status } = useEnrollment();
  if (status === "closed") return null;

  return (
    <a
      id={id}
      href={innerCircleConfig.checkoutUrl}
      className={cn(
        variants[variant],
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#35253F]",
        variant === "onDark" && "focus-visible:outline-[#FAF7F1]",
        className,
      )}
      onClick={() => {
        trackCtaClicked(section);
        trackCheckoutStarted(section);
      }}
    >
      {children}
    </a>
  );
}
