import { APP_STORE_BADGE_SRC, APP_STORE_URL } from "@/lib/app-store";

export function AppStoreBadge() {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Apple-hosted marketing asset */}
      <img
        src={APP_STORE_BADGE_SRC}
        alt="Download on the App Store"
        width={250}
        height={83}
        className="h-12 w-auto sm:h-14"
      />
    </a>
  );
}
