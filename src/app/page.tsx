import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-15%,rgba(139,92,246,0.28),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/50 via-zinc-950 to-zinc-950"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <h1
          className={cn(
            "text-balance bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl",
          )}
        >
          Wu-Wu
        </h1>
        <p className="text-lg text-zinc-400 sm:text-xl">Welcome</p>
      </div>
    </div>
  );
}
