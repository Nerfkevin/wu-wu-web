import type { ReactNode } from "react";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";

const funnelImageHrefs = [
  itsYunmeiConfig.logoSrc,
  ...itsYunmeiConfig.cardFrontImages.filter(
    (src): src is string => typeof src === "string" && src.length > 0,
  ),
];

export default function ItsYunmeiLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {funnelImageHrefs.map((href) => (
        <link
          key={href}
          rel="preload"
          as="image"
          href={href}
          fetchPriority="high"
        />
      ))}
      {children}
    </>
  );
}
