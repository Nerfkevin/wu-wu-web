import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-zinc-950/60 py-8 backdrop-blur-md">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-zinc-500 sm:text-left">
          © {new Date().getFullYear()} Wu-Wu. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm sm:justify-end">
          <Link
            href="/contact"
            className="text-zinc-400 transition-colors hover:text-violet-300"
          >
            Contact
          </Link>
          <Link
            href="/terms"
            className="text-zinc-400 transition-colors hover:text-violet-300"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-zinc-400 transition-colors hover:text-violet-300"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
