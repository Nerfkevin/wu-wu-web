import Image from "next/image";
import Balatro from "@/components/ui/Balatro";

export function HomeHero() {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Balatro WebGL background */}
      <div className="absolute inset-0 z-0">
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
      <div className="relative z-20 flex flex-col items-center gap-5 px-4 pt-28 text-center">
        <h1 className="font-instrument-serif text-balance text-5xl font-normal tracking-tight text-white sm:text-6xl md:text-7xl">
          Wu-Wu.
        </h1>
        <p className="text-base text-white/75 max-w-sm px-2 text-balance text-center leading-snug sm:whitespace-nowrap sm:max-w-none sm:px-0 pb-1">
          Your thoughts shape your life. Rewire your beliefs in your own voice with Wu-Wu.
        </p>
        <a
          href="https://forms.gle/Y6n539WYqLA2n5GKA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[8px] bg-white px-7 py-3 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-white/90 active:scale-95"
        >
          Join the Waitlist
        </a>
      </div>

      {/* Hero image */}
      <div className="relative z-20 mt-6 w-full max-w-5xl self-center px-2">
        <Image
          src="/brand/hero.png"
          alt="Wu-Wu app"
          width={1400}
          height={900}
          className="w-full object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}
