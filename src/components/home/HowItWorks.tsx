import Image from "next/image";

const steps = [
  {
    id: 1,
    image: "/brand/fraghand.png",
    imageBoxClass: "h-36 w-36",
    text: "your mind is looping old beliefs, pulling you away from your ",
    boldText: "dream life.",
  },
  {
    id: 2,
    image: "/brand/orb1.png",
    imageBoxClass: "h-28 w-28",
    text: null,
    boldText: "Wu–Wu",
    textAfter: " helps you manifest your dream life.",
  },
  {
    id: 3,
    image: "/brand/fraghandorb.png",
    imageBoxClass: "h-40 w-40",
    text: "it's ",
    boldText: "simple.",
    textAfter: " everyday, listen to affirmations in your own voice.",
  },
  {
    id: 4,
    image: "/brand/orb.png",
    imageBoxClass: "h-36 w-36",
    text: "rewire your subconcious beliefs, and watch your dream life ",
    boldText: "unfold.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#6B2AAE] py-16">
      {/* Mesh gradient — light vibrant purples, no dark spots */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 0% 0%,   #9B4FDE 0%, transparent 55%),
            radial-gradient(ellipse 55% 50% at 50% 0%,  #C050D0 0%, transparent 50%),
            radial-gradient(ellipse 60% 55% at 100% 0%, #BD4A8A 0%, transparent 55%),
            radial-gradient(ellipse 65% 55% at 0% 50%,  #7A3ABE 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 45% 42%, #9B40B0 0%, transparent 45%),
            radial-gradient(ellipse 60% 50% at 100% 50%,#AB3A80 0%, transparent 50%),
            radial-gradient(ellipse 55% 55% at 0% 100%, #7B4ECA 0%, transparent 50%),
            radial-gradient(ellipse 55% 50% at 50% 100%,#8B3EBA 0%, transparent 50%),
            radial-gradient(ellipse 55% 55% at 100% 100%,#6B2AAE 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section label */}
        <p className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          WHAT IS THIS
        </p>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-6 text-center"
            >
              {/* Fixed-height slot so copy lines up across columns */}
              <div className="flex h-48 w-full flex-shrink-0 items-center justify-center">
                <div
                  className={`hover-wobble relative cursor-default ${step.imageBoxClass}`}
                >
                  <Image
                    src={step.image}
                    alt={`Step ${step.id}`}
                    fill
                    className="object-contain drop-shadow-[0_0_24px_rgba(139,92,246,0.4)]"
                  />
                </div>
              </div>

              {/* Text */}
              <p className="font-instrument-serif text-xl leading-relaxed text-white">
                {step.text && <span>{step.text}</span>}
                {step.boldText && (
                  <span className="font-bold text-white">{step.boldText}</span>
                )}
                {step.textAfter && <span>{step.textAfter}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
