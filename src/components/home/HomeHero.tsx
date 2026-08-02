import Image from "next/image";
import Balatro from "@/components/ui/Balatro";
import { AppStoreBadge } from "@/components/home/AppStoreBadge";
import { HeroPhoneScreens } from "@/components/home/HeroPhoneScreens";

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden md:min-h-[min(100svh,56rem)]">
      {/* Balatro WebGL background — inset-0 + isolate so it sits behind z-10/20 content */}
      <div className="absolute inset-0 z-0 min-h-full w-full">
        <Balatro
          mouseInteraction
          color1="#59006b"
          color2="#000000"
          color3="#0d000f"
          pixelFilter={1700}
        />
      </div>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Top content */}
      <div className="relative z-20 flex flex-col items-center gap-5 px-4 pt-10 text-center sm:pt-12">
        <h1 className="font-instrument-serif text-balance text-5xl font-normal tracking-tight text-white sm:text-6xl md:text-7xl">
          Wu-Wu.
        </h1>
        <p className="text-sm text-white/75 max-w-sm px-2 text-balance text-center leading-snug sm:whitespace-nowrap sm:max-w-none sm:px-0 my-3">
          Your thoughts shape your life. Manifest your dream life in your own voice with Wu-Wu.
        </p>
        <AppStoreBadge />
      </div>

      {/* Phone: cycling screenshots on mobile; desktop keeps static hero */}
      <div className="relative z-20 mt-auto flex w-full items-end justify-center px-2 pt-3 md:mt-0 md:flex-1 md:pt-0">
        <div className="w-full -mt-3 md:mt-0 md:hidden">
          <HeroPhoneScreens />
        </div>
        <div className="hidden w-full md:block">
          <Image
            src="/brand/hero.png"
            alt="Wu-Wu app"
            width={1400}
            height={900}
            className="w-full object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
