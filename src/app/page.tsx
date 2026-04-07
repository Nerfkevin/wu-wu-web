import { MarketingHeader } from "@/components/home/MarketingHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { MobileFooterNav } from "@/components/site/MobileFooterNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-15%,rgba(139,92,246,0.28),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/50 via-zinc-950 to-zinc-950"
        aria-hidden
      />

      <MarketingHeader />

      <main className="relative z-10 flex-1">
        <HomeHero />
      </main>

      <MobileFooterNav />

      <SiteFooter />
    </div>
  );
}
