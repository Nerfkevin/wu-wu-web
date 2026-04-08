import { AppStoreBadge } from "@/components/home/AppStoreBadge";

export function HomeHero() {
  return (
    <section className="relative px-4 pb-24 pt-10 sm:pb-32 sm:pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400/90">
          Now on iOS
        </p>
        <h1 className="font-instrument-serif text-balance text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-transparent">
            Wu-Wu
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
          A playful space to create and share. Get the app and jump in.
        </p>
        <div className="mt-10 flex justify-center">
          <AppStoreBadge />
        </div>
      </div>
    </section>
  );
}
