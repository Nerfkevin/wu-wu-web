import Image from "next/image";

import { APP_STORE_BADGE_SRC, APP_STORE_URL } from "@/lib/app-store";

const sizeClass = {
  sm: "h-9 w-auto",
  md: "h-12 w-auto sm:h-14",
} as const;

export function AppStoreBadge({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
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
