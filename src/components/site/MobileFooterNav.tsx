import Link from "next/link";

export function MobileFooterNav() {
  return (
    <div className="relative z-10 md:hidden">
      <nav
        className="flex justify-center gap-6 border-t border-white/10 py-4 text-sm text-zinc-500"
        aria-label="Site"
      >
        <Link href="/privacy" className="hover:text-violet-300">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-violet-300">
          Terms
        </Link>
        <Link href="/contact" className="hover:text-violet-300">
          Contact
        </Link>
      </nav>
    </div>
  );
}
