import { MarketingHeader } from "@/components/home/MarketingHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MobileFooterNav } from "@/components/site/MobileFooterNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950">
      <MarketingHeader />

      <main className="relative z-10 flex-1">
        <HomeHero />
        <HowItWorks />
      </main>

      <MobileFooterNav />
      <SiteFooter />
    </div>
  );
}
