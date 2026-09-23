"use client";

import Link from "next/link";

export function FunnelFooter({ line }: { line: string }) {
  return (
    <footer className="mt-auto w-full pt-5 text-center sm:pt-10">
      <p className="text-xs leading-5 text-[#62566f]">{line}</p>
      <nav
        className="mt-3 flex items-center justify-center gap-4 text-xs"
        aria-label="Legal"
      >
        <Link
          href="/privacy"
          className="min-h-11 px-1 py-2 text-[#62566f] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9428ff]"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="min-h-11 px-1 py-2 text-[#62566f] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9428ff]"
        >
          Terms
        </Link>
      </nav>
    </footer>
  );
}
