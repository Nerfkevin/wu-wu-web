"use client";

import type { ReactNode } from "react";
import { initInnerCircleAnalytics } from "@/lib/inner-circle/analytics";

initInnerCircleAnalytics();

export function InnerCircleAnalytics({ children }: { children: ReactNode }) {
  return children;
}
