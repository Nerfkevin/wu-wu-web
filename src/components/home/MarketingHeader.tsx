import Link from "next/link";
import { LogoLockup } from "@/components/home/LogoLockup";
import { APP_STORE_URL } from "@/lib/app-store";

const navClass =
  "text-sm text-white/80 transition-colors hover:text-white";

export function MarketingHeader() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="flex h-16 w-full items-center justify-between px-6">
        <LogoLockup />
        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Site">
            <Link href="/privacy" className={navClass}>Privacy</Link>
            <Link href="/terms" className={navClass}>Terms</Link>
            <Link href="/contact" className={navClass}>Contact</Link>
          </nav>
          <a
            href="https://forms.gle/Y6n539WYqLA2n5GKA"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-[8px] bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-violet-950/20 transition hover:bg-zinc-200"
          >
            Waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
