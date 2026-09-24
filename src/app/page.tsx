import type { Metadata } from "next";
import { MarketingHeader } from "@/components/home/MarketingHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MobileFooterNav } from "@/components/site/MobileFooterNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  // Safari Smart App Banner — home only, not the Yun Mei funnel
  other: {
    "apple-itunes-app": "app-id=6760009072",
  },
};

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
