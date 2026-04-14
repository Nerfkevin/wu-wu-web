import Image from "next/image";

const steps = [
  {
    id: 1,
    image: "/brand/fraghand.png",
    text: "your mind is looping old beliefs, pulling you away from the ",
    boldText: "life you desire.",
  },
  {
    id: 2,
    image: "/brand/orb1.png",
    text: null,
    boldText: "Wu–Wu",
    textAfter: " helps you manifest your dream life.",
  },
  {
    id: 3,
    image: "/brand/fraghandorb.png",
    text: "it's ",
    boldText: "simple.",
    textAfter: " everyday, listen to affirmations in your own voice.",
  },
  {
    id: 4,
    image: "/brand/orb.png",
    text: "once you've rewired your subconcious beliefs, watch as your dream life ",
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
          How It Works
        </p>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-6 text-center"
            >
              {/* Image */}
              <div className="relative h-36 w-36 flex-shrink-0">
                <Image
                  src={step.image}
                  alt={`Step ${step.id}`}
                  fill
                  className="object-contain drop-shadow-[0_0_24px_rgba(139,92,246,0.4)]"
                />
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
