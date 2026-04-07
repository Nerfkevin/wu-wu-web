import Link from "next/link";
import { LogoLockup } from "@/components/home/LogoLockup";
import { APP_STORE_URL } from "@/lib/app-store";

const navClass =
  "text-sm text-zinc-400 transition-colors hover:text-violet-300";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/75 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/55">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        <LogoLockup />
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Site"
        >
          <Link href="/privacy" className={navClass}>
            Privacy
          </Link>
          <Link href="/terms" className={navClass}>
            Terms
          </Link>
          <Link href="/contact" className={navClass}>
            Contact
          </Link>
        </nav>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-violet-950/20 transition hover:bg-zinc-200"
        >
          Download
        </a>
      </div>
    </header>
  );
}
