import Link from "next/link";
import { AppStoreBadge } from "@/components/home/AppStoreBadge";
import { LogoLockup } from "@/components/home/LogoLockup";

const navClass =
  "text-sm text-white/80 transition-colors hover:text-white";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex h-16 w-full items-center justify-between px-6">
        <LogoLockup />
        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Site">
            <Link href="/privacy" className={navClass}>Privacy</Link>
            <Link href="/terms" className={navClass}>Terms</Link>
            <Link href="/contact" className={navClass}>Contact</Link>
          </nav>
          <AppStoreBadge size="sm" />
        </div>
      </div>
    </header>
  );
}
