import type { ReactNode } from "react";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";

const funnelImageHrefs = [
  itsYunmeiConfig.logoSrc,
  ...itsYunmeiConfig.cardFrontImages.filter(
    (src): src is string => typeof src === "string" && src.length > 0,
  ),
];

const videoSrc = itsYunmeiConfig.videoSrc.trim();

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
      {videoSrc ? (
        <link rel="preload" as="video" href={videoSrc} fetchPriority="high" />
      ) : null}
      {children}
    </>
  );
}
