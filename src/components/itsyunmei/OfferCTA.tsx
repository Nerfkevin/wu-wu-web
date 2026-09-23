"use client";

import { hasAsset, itsYunmeiConfig } from "@/lib/itsyunmei/config";
import { trackFunnelEvent } from "@/lib/itsyunmei/analytics";
import { itsYunmeiFont } from "./font";

const copy = itsYunmeiConfig.copy.offer;

export function OfferCTA({
  className = "",
  source,
}: {
  className?: string;
  source: "inline" | "end";
}) {
  const url = hasAsset(itsYunmeiConfig.stanCheckoutUrl)
    ? itsYunmeiConfig.stanCheckoutUrl.trim()
    : null;

  const classNames = `${itsYunmeiFont.variable} ${itsYunmeiFont.className} iy-cta-pill${className ? ` ${className}` : ""}`;

  if (!url) {
    return (
      <span className={classNames} aria-disabled="true">
        {copy.cta}
      </span>
    );
  }

  return (
    <a
      href={url}
      className={classNames}
      onClick={() => trackFunnelEvent("checkout_clicked", { source })}
    >
      {copy.cta}
    </a>
  );
}
