import Image from "next/image";
import { AppStoreBadge } from "@/components/home/AppStoreBadge";
import Balatro from "@/components/ui/Balatro";

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* LiquidChrome WebGL background */}
      <div className="absolute inset-0 z-0">
        <Balatro
          color1="#59006b"
          color2="#000000"
          color3="#0d000f"
          pixelFilter={1700}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-6 px-4 pt-10 pb-0 text-center">
        <h1 className="font-instrument-serif text-balance text-5xl font-normal tracking-tight text-white sm:text-6xl md:text-7xl">
          Wu-Wu
        </h1>
        <p className="text-base text-white/75 max-w-sm px-2 text-balance text-center leading-snug sm:whitespace-nowrap sm:max-w-none sm:px-0">
          Your thoughts shape your life. Rewire your beliefs in your own voice with Wu-Wu.
        </p>
        <AppStoreBadge />
      </div>

      {/* Hero image */}
      <div className="relative z-20 mt-6 w-full max-w-4xl px-4">
        <Image
          src="/brand/hero.png"
          alt="Wu-Wu app"
          width={1200}
          height={800}
          className="w-full object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}
