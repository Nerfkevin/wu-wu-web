import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { MarketingHeader } from "@/components/home/MarketingHeader";
import { MobileFooterNav } from "@/components/site/MobileFooterNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export function LegalShell({
  title,
  effectiveDate,
  icon: Icon,
  children,
}: {
  title: string;
  effectiveDate?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950">
      {/* Purple gradient wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(139,92,246,0.35),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-950/80 via-zinc-950 to-fuchsia-950/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl"
        aria-hidden
      />

      <div className="absolute left-8 top-28 text-violet-500/40 animate-float sm:left-14">
        <Sparkles className="h-6 w-6" aria-hidden />
      </div>
      <div
        className="absolute bottom-40 right-10 text-fuchsia-500/35 animate-float sm:right-16"
        style={{ animationDelay: "1.2s" }}
      >
        <Sparkles className="h-5 w-5" aria-hidden />
      </div>

      <MarketingHeader />

      <main className="relative z-10 flex-1 px-4 py-8 sm:py-12">
        <article className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/85 p-8 shadow-2xl shadow-violet-950/40 backdrop-blur-sm sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 ring-1 ring-white/10">
              <Icon className="h-8 w-8 text-violet-300" aria-hidden />
            </div>
            <h1 className="font-instrument-serif bg-gradient-to-r from-violet-300 via-fuchsia-300 to-purple-300 bg-clip-text text-3xl font-normal text-transparent">
              {title}
            </h1>
            {effectiveDate ? (
              <p className="mt-2 text-sm text-zinc-500">
                Effective date: {effectiveDate}
              </p>
            ) : null}
          </div>
          <div className="legal-prose text-zinc-300">{children}</div>
        </article>
      </main>

      <MobileFooterNav />

      <SiteFooter />
    </div>
  );
}
