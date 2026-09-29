"use client";

import {
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Gift,
  Hourglass,
  KeyRound,
  Lock,
  MessagesSquare,
  PenLine,
  Repeat,
  ShieldCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  trackCtaClicked,
  trackFaqOpened,
  trackWaitlistClicked,
} from "@/lib/inner-circle/analytics";
import {
  innerCircleAssets,
  innerCircleConfig,
} from "@/lib/inner-circle/config";
import { HourCountdown, StatusLine } from "./Countdown";
import { EnrollmentProvider, useEnrollment } from "./EnrollmentProvider";
import { JoinButton } from "./JoinButton";

const price = innerCircleConfig.priceLabel;
const compareAt = innerCircleConfig.compareAtLabel;
const savings = innerCircleConfig.savingsLabel;

const gifts = [
  {
    id: "transcript",
    number: "01",
    title: "The Weekly Sacred Transcript",
    lede: "A fresh teaching to return to each week.",
    body: "A weekly teaching from Yun Mei, with a reflection, an affirmation, and a ritual for the week.",
    format: "Weekly digital teaching · Inside the community",
    src: innerCircleAssets.gifts.transcript,
    alt: "Illustrated preview of The Weekly Sacred Transcript, a digital resource",
  },
  {
    id: "journal",
    number: "02",
    title: "Manifestation + Gratitude Journal",
    lede: "Give your intentions a place to become clear.",
    body: "A guided journal for what you want to nurture, what you’re grateful for, and affirmations in your own words.",
    format: "Digital journal · Inside the community",
    src: innerCircleAssets.gifts.journal,
    alt: "Illustrated preview of the Manifestation and Gratitude Journal, a digital resource",
  },
  {
    id: "wisdom",
    number: "03",
    title: "The Wisdom Companion",
    lede: "Something to turn to when you need a gentle reminder.",
    body: "Teachings and reminders to reopen when you want clarity or a quiet moment.",
    format: "Digital collection · Inside the community",
    src: innerCircleAssets.gifts.wisdom,
    alt: "Illustrated preview of The Wisdom Companion, a digital resource",
  },
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="ic-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#6E5730]">
      {children}
    </p>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="mx-auto max-w-2xl text-center">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`${eyebrow ? "mt-3" : ""} text-4xl leading-[1.08] text-[#35253F] sm:text-5xl`}
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-5 space-y-4 text-[17px] leading-7">{children}</div>
      ) : null}
    </div>
  );
}

function PurchaseFallback({ prominent = false }: { prominent?: boolean }) {
  const { status, waitlistUrl } = useEnrollment();
  if (status === "open") return null;

  return (
    <div className={prominent ? "space-y-3" : "space-y-2"}>
      <StatusLine className="text-sm leading-6 text-[#302B33]" />
      {waitlistUrl ? (
        <a
          href={waitlistUrl}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#35253F] px-6 py-3 text-center text-base font-semibold text-[#FAF7F1] hover:bg-[#4a3454] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#35253F] sm:w-auto"
          onClick={() => trackWaitlistClicked()}
        >
          Join the waitlist
        </a>
      ) : null}
    </div>
  );
}

function Announcement() {
  return (
    <div className="bg-[#A25939] px-4 py-3 text-center text-[#FFF8F2]">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2">
        <p className="flex items-center justify-center gap-2 text-xs font-bold leading-5 sm:text-[13px]">
          <Hourglass className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          Limited-time offer: save {savings}
        </p>
        <div className="flex items-center gap-2">
          <Hourglass className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-[10px] font-semibold tracking-[0.18em]">ENDS IN</span>
          <HourCountdown tone="dark" dividers />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header
      id="top"
      className="border-b border-[#3F3226]/10 bg-[#F9F3E7]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="min-w-0 font-ic-display text-lg leading-none text-[#3F3226] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A7562B] sm:text-[1.35rem]"
        >
          <span className="font-semibold">Yun Mei’s </span>
          <span className="font-medium italic text-[#A7562B]">Inner Circle</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Page">
          <a className="ic-nav" href="#notice">
            Notice
          </a>
          <a className="ic-nav" href="#how">
            How
          </a>
          <a className="ic-nav" href="#gifts">
            Gifts
          </a>
          <a className="ic-nav" href="#about">
            About
          </a>
          <a className="ic-nav" href="#faq">
            FAQ
          </a>
        </nav>
        <JoinButton section="header" variant="compact" className="shrink-0">
          <span className="sm:hidden">Join</span>
          <span className="hidden sm:inline">
            Join the Circle <span aria-hidden="true">→</span>
          </span>
        </JoinButton>
      </div>
    </header>
  );
}

function Hero() {
  const { status, waitlistUrl } = useEnrollment();
  const perks = ["Instant access", "Phone + desktop", "Beginner-friendly", "30-day guarantee"];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] md:gap-8 lg:gap-14">
        <div className="min-w-0">
          <p className="inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-full border border-[#E6D9C8] bg-[#FBF7F0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6E5730]">
            <span aria-hidden="true">✧</span>
            A private community by Yun Mei
          </p>
          <h1 className="ic-hero-title mt-5 max-w-full text-[#3F3226]">
            Yun Mei’s <span className="ic-hero-accent">Inner Circle</span>
          </h1>
          <p className="mt-5 max-w-md text-[17px] leading-7 text-[#5C534A]">
            A private circle for gentle guidance and a practice you can come back
            to, with three digital gifts included.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <JoinButton
              id="hero-join"
              section="hero"
              className="w-auto min-h-10 whitespace-nowrap px-4 py-2 text-sm"
            >
              Get instant access — {price}
              <span aria-hidden="true">→</span>
            </JoinButton>
            <a
              href="#gifts"
              className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-[#E4D5C4] bg-white px-4 text-sm font-semibold text-[#3F3226] hover:bg-[#FFFCF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A7562B]"
              onClick={() => trackCtaClicked("explore")}
            >
              Peek inside
            </a>
          </div>
          <ul className="mt-5 flex flex-col gap-2 text-sm text-[#5C534A] sm:flex-row sm:flex-wrap sm:gap-x-5">
            {perks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#7D8A62]" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 max-w-md rounded-2xl bg-[#E7E4D4] px-5 py-4">
            <p className="inline-flex rounded-full bg-[#F4F1E4] px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#5E6B45]">
              LIMITED-TIME PRICE
            </p>
            <p className="mt-3 font-ic-display text-xl font-semibold leading-tight text-[#3F3226] sm:text-[1.65rem]">
              Join the Circle for <span className="whitespace-nowrap">{price}</span>{" "}
              <s className="text-[0.72em] font-medium text-[#8A8178] decoration-2">
                {compareAt}
              </s>
            </p>
            <p className="mt-1 text-sm font-normal leading-6 text-[#3F3226]">
              Save {savings} on the subscription before this offer ends. Nothing is
              shipped.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.14em] text-[#5C534A]">
                OFFER ENDS IN
              </span>
              <HourCountdown />
            </div>
            {status === "closed" && waitlistUrl ? (
              <a
                href={waitlistUrl}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-[#A7562B] px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => trackWaitlistClicked()}
              >
                Join the waitlist
              </a>
            ) : null}
          </div>
        </div>
        <figure className="relative mx-auto w-full max-w-md justify-self-end pb-6 md:max-w-none">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#F3EEE4] p-3 shadow-[0_24px_50px_rgba(63,50,38,0.08)] ring-1 ring-[#E7DCCB] sm:p-3.5">
            <Image
              src={innerCircleAssets.hero}
              alt="Illustrative preview of Yun Mei with a small group in a courtyard"
              width={innerCircleAssets.heroWidth}
              height={innerCircleAssets.heroHeight}
              priority
              sizes="(min-width: 768px) 460px, 90vw"
              className="aspect-[3/4] w-full scale-[1.03] rounded-[1.35rem] object-cover object-[center_18%]"
            />
          </div>
          <p className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold leading-tight text-[#3F3226] shadow-[0_10px_24px_rgba(63,50,38,0.12)] md:left-auto md:right-6 md:translate-x-0">
            <span className="flex text-[#E0A106]" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="relative h-3.5 w-3.5">
                <Star className="h-3.5 w-3.5 fill-[#E7DCC0]" />
                <span className="absolute inset-y-0 left-0 w-[60%] overflow-hidden">
                  <Star className="h-3.5 w-3.5 fill-[#E0A106]" />
                </span>
              </span>
            </span>
            <span>
              4.6
              <span className="mt-0.5 block text-[11px] font-medium text-[#6B6258]">
                testimonials
              </span>
            </span>
          </p>
        </figure>
      </div>
    </section>
  );
}

function StatsBreak() {
  const stats = [
    { value: "4,000", label: "members worldwide" },
    { value: "4.6 / 5", label: "average rating" },
    { value: "100+", label: "pages of honest guidance included" },
    { value: "100+", label: "affirmations to repeat" },
  ];

  return (
    <section aria-label="At a glance" className="bg-[#F0E6D4]">
      <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-12 text-center sm:py-14">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="font-ic-display whitespace-nowrap text-[1.65rem] leading-none text-[#A7562B] sm:text-4xl">
              {stat.value}
            </dd>
            <dt className="mx-auto mt-2 max-w-[11rem] text-sm leading-snug text-[#6B6258]">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

const reviews = [
  {
    quote:
      "I kept saving the posts and never opening them. The weekly transcript gives me one thing to sit with, and I actually do.",
    name: "Marisol G.",
    age: 46,
    role: "back to a weekly practice",
  },
  {
    quote:
      "I thought I had missed my chance to start over. Nobody here treats a quiet month like a failure.",
    name: "Helen M.",
    age: 71,
    role: "retired librarian",
  },
  {
    quote:
      "The journal is the first one I have stayed with. Short pages, after the house is finally quiet.",
    name: "Denise R.",
    age: 54,
    role: "on her feet all day",
  },
  {
    quote:
      "I joined for the teachings and stayed for the people. It is the only place I say the small things out loud.",
    name: "Andre W.",
    age: 38,
    role: "new to journaling",
  },
  {
    quote:
      "Yun Mei writes the way a patient friend talks. I read it on Sunday and I am still using the line by Wednesday.",
    name: "Ruth P.",
    age: 80,
    role: "grandmother of four",
  },
  {
    quote:
      "I was skeptical of another community. This one is small and gentle. Showing up when I can has been enough.",
    name: "Carmen L.",
    age: 63,
    role: "skeptical at first",
  },
] as const;

function ReviewStars() {
  return (
    <span className="flex text-[#A7562B]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" />
      ))}
    </span>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-32 bg-[#F0E6D4]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro eyebrow="Member notes" title="Kind words from the Circle">
          <p>Notes sent back after living with the practice for a while.</p>
        </SectionIntro>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-[#5C534A]">
          <ReviewStars />
          <span>4.6 average from member notes</span>
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex flex-col rounded-[1.25rem] bg-[#FFFCF8] p-6 shadow-[0_12px_32px_rgba(63,50,38,0.06)] ring-1 ring-[#E7DCCB]"
            >
              <ReviewStars />
              <p className="mt-4 flex-1 text-[15px] leading-7 text-[#3F3226]">“{review.quote}”</p>
              <div className="mt-5 border-t border-[#E7DCCB] pt-4">
                <p className="font-semibold text-[#3F3226]">{review.name}</p>
                <p className="mt-0.5 text-sm text-[#6B6258]">
                  {review.age} · {review.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const notices = [
  {
    src: "/brand/itsyunmei/notice-love.png",
    label: "Love",
    title: "Softer with the people you love",
    body: "Members describe easier conversations at home, and more room to say the small true thing.",
    alt: "A couple sitting close together on a stone bench under purple flowers",
  },
  {
    src: "/brand/itsyunmei/notice-health.png",
    label: "Health",
    title: "A steadier, lighter body",
    body: "A quieter morning walk. More energy for the day. A body that feels like it belongs to you again.",
    alt: "A woman walking a garden path in warm morning light",
  },
  {
    src: "/brand/itsyunmei/notice-wealth.png",
    label: "Wealth",
    title: "Money that feels less heavy",
    body: "A calmer look at what you already have, and a little more ease around what you are building.",
    alt: "A kitchen table with tea, an open notebook, envelopes, and a small bowl of coins",
  },
  {
    src: "/brand/itsyunmei/notice-happiness.png",
    label: "Happiness",
    title: "More ordinary joy",
    body: "The day still happens. Members say they laugh sooner, and the heavy parts take up less of the room.",
    alt: "Four friends laughing together in a sunlit courtyard",
  },
] as const;

function MemberNotice() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const nearest = (root: HTMLDivElement) => {
    const cards = [...root.children] as HTMLElement[];
    let closest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - root.offsetLeft - root.scrollLeft);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    return closest;
  };

  const go = (next: number) => {
    const root = scroller.current;
    const card = root?.children[next] as HTMLElement | undefined;
    if (!root || !card) return;
    root.scrollTo({ left: card.offsetLeft - root.offsetLeft, behavior: "smooth" });
    setIndex(next);
  };

  const onScroll = () => {
    const root = scroller.current;
    if (!root) return;
    const closest = nearest(root);
    setIndex((current) => (current === closest ? current : closest));
  };

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let axis: "x" | "y" | null = null;

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      startScroll = root.scrollLeft;
      axis = null;
    };
    const onMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (axis !== "x") return;
      event.preventDefault();
      root.scrollLeft = startScroll - dx;
    };
    const onEnd = () => {
      if (axis === "x") go(nearest(root));
      axis = null;
    };

    root.addEventListener("touchstart", onStart, { passive: true });
    root.addEventListener("touchmove", onMove, { passive: false });
    root.addEventListener("touchend", onEnd);
    root.addEventListener("touchcancel", onEnd);
    return () => {
      root.removeEventListener("touchstart", onStart);
      root.removeEventListener("touchmove", onMove);
      root.removeEventListener("touchend", onEnd);
      root.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  return (
    <section id="notice" className="scroll-mt-32 bg-[#F9F3E7]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro eyebrow="What members notice" title="Gentle changes, honest results">
          <p>
            No miracle promises. The quiet shifts members describe after staying
            with the practice: love, health, wealth, and a little more happiness.
          </p>
        </SectionIntro>
        <div className="relative mt-10">
          <div
            ref={scroller}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory touch-pan-y gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {notices.map((notice) => (
              <article
                key={notice.label}
                className="w-[86%] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-[#FFFCF8] shadow-[0_16px_40px_rgba(63,50,38,0.08)] ring-1 ring-[#E7DCCB] sm:w-[calc(50%-0.5rem)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={notice.src}
                    alt={notice.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 86vw"
                    draggable={false}
                    className="pointer-events-none object-cover"
                  />
                </div>
                <p className="bg-[#EFE6D4] px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6E5730]">
                  {notice.label}
                </p>
                <div className="px-5 pb-6 pt-4">
                  <h3 className="text-2xl leading-tight text-[#35253F]">{notice.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-[#5C534A]">{notice.body}</p>
                </div>
              </article>
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            className="absolute left-2 top-[28%] hidden h-11 w-11 items-center justify-center rounded-full bg-[#E7D3C4]/90 text-[#3F3226] shadow-md disabled:opacity-40 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={index === notices.length - 1}
            onClick={() => go(index + 1)}
            className="absolute right-2 top-[28%] hidden h-11 w-11 items-center justify-center rounded-full bg-[#A7562B] text-white shadow-md disabled:opacity-40 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7D3C4] text-[#3F3226] disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {notices.map((notice, i) => (
            <button
              key={notice.label}
              type="button"
              aria-label={`Show ${notice.label}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full bg-[#A7562B] transition-all ${
                i === index ? "w-7" : "w-2.5 opacity-35"
              }`}
            />
          ))}
          <button
            type="button"
            aria-label="Next"
            disabled={index === notices.length - 1}
            onClick={() => go(index + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A7562B] text-white disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Gifts() {
  return (
    <section id="gifts" className="scroll-mt-32 bg-[#F9F3E7]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro
          eyebrow="Included with your membership"
          title="Three gifts to support the practice you’re building."
        >
          <p>
            Join during the 11:11 Portal and receive these three digital gifts at no
            additional charge with your subscription.
          </p>
        </SectionIntro>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {gifts.map((gift) => (
            <article
              key={gift.id}
              className="flex flex-col rounded-[1.75rem] bg-[#FFFCF8] p-5 shadow-[0_14px_40px_rgba(53,37,63,0.05)] ring-1 ring-[#35253F]/5 sm:p-6"
            >
              <Image
                src={gift.src}
                alt={gift.alt}
                width={innerCircleAssets.giftWidth}
                height={innerCircleAssets.giftHeight}
                sizes="(min-width: 1024px) 320px, 80vw"
                className="mx-auto h-auto w-full max-w-[240px]"
              />
              <p className="ic-sans mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6E5730]">
                Free gift {gift.number}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#35253F]">
                Digital resource — nothing is shipped
              </p>
              <h3 className="mt-3 text-[1.7rem] leading-tight text-[#35253F]">
                {gift.title}
              </h3>
              <p className="mt-3 font-instrument-serif text-xl leading-snug text-[#35253F]">
                {gift.lede}
              </p>
              <p className="mt-3 text-[17px] leading-7">{gift.body}</p>
              <p className="mt-3 text-sm leading-6 text-[#302B33]/75">{gift.format}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-[17px] leading-7">
          One membership. Three supporting gifts. Everything together in your
          private space.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4">
          <JoinButton
            section="gifts"
            className="w-auto min-h-10 whitespace-nowrap px-4 py-2 text-sm"
          >
            Join the Circle — {price}
          </JoinButton>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-[0.14em] text-[#5C534A]">
              OFFER ENDS IN
            </span>
            <HourCountdown />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-32 bg-[#F9F3E7]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.15fr)] lg:gap-16">
        <figure>
          <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_rgba(63,50,38,0.12)]">
            <Image
              src="/brand/itsyunmei/yunmei-monastery.png"
              alt="Yun Mei in the courtyard of an old wooden monastery"
              fill
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <figcaption className="mx-auto mt-3 max-w-sm text-center font-instrument-serif text-sm italic text-[#6B6258]">
            Yun Mei in the monastery courtyard, where the practice was first placed in her hands.
          </figcaption>
        </figure>
        <div>
          <Eyebrow>Yun Mei’s origin</Eyebrow>
          <h2 className="mt-3 text-4xl leading-[1.05] text-[#35253F] sm:text-5xl">
            Learned in a monastery a thousand years old
          </h2>
          <div className="mt-5 space-y-4 text-[17px] leading-7 text-[#3F3226]">
            <p>
              Yun Mei learned the old ways inside a monastery that has stood for a
              thousand years. Mornings began in silence. Teachings moved from
              teacher to student, the way a bell moves through a wooden hall:
              slowly, and only if you stay to hear it.
            </p>
            <p>
              She was taught to notice what the heart is asking for, to work
              slowly, and to return when the day pulls you away. Those lessons
              became her reflections, affirmations, and teachings: an invitation
              to make space for inner peace, self-worth, and a beginning you do
              not have to take alone.
            </p>
          </div>
          <blockquote className="mt-8 rounded-[1.25rem] border-l-4 border-[#7D8A62] bg-[#FFFCF8] px-5 py-5 shadow-[0_10px_28px_rgba(63,50,38,0.05)] sm:px-6">
            <p className="font-instrument-serif text-xl leading-snug text-[#35253F] sm:text-2xl">
              “The monastery taught me that peace is a practice. You return to it.
              Then you offer that same patience to the life in front of you.”
            </p>
            <footer className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#A7562B]">
              — Yun Mei
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {
      title: "Join the Inner Circle",
      body: "Subscribe at checkout. Your membership starts as soon as the payment goes through.",
      icon: KeyRound,
    },
    {
      title: "Step into the community",
      body: "Follow the access note after purchase and enter your private Stan Store space.",
      icon: DoorOpen,
    },
    {
      title: "Open your gifts",
      body: "The Weekly Sacred Transcript, journal, and Wisdom Companion are waiting inside.",
      icon: Gift,
    },
    {
      title: "Join discussions",
      body: "Talk with other members about the teaching, the week, and what you’re practicing.",
      icon: MessagesSquare,
    },
    {
      title: "Share a reflection",
      body: "Post a note, a win, or a moment you want to come back to.",
      icon: PenLine,
    },
    {
      title: "Return when you need it",
      body: "Open the space on your phone or desktop whenever you want to reconnect.",
      icon: Repeat,
    },
  ];

  return (
    <section id="how" className="scroll-mt-32 bg-[#F0E6D4]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro eyebrow="Start" title="How it works" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(53,37,63,0.05)] ring-1 ring-[#35253F]/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EADD] text-[#A7562B]">
                  <step.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className="font-instrument-serif text-3xl text-[#6E5730]">
                  0{index + 1}
                </p>
              </div>
              <h3 className="mt-4 text-2xl text-[#35253F]">{step.title}</h3>
              <p className="mt-3 text-[17px] leading-7">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}


function faqItems() {
  const items: { id: string; q: string; a: string }[] = [
    {
      id: "what",
      q: "What is Yun Mei’s Inner Circle?",
      a: "It is a private subscription community where Yun Mei shares reflections, affirmations, and gentle guidance around inner peace, abundance, self-worth, confidence, letting go, and starting again. Members can also share their journeys, reflections, and wins.",
    },
    {
      id: "includes",
      q: `What do I get for ${price}?`,
      a: `Your subscription includes access to the private Inner Circle community. During this 11:11 Portal opening, it also includes three free digital gifts: The Weekly Sacred Transcript, the Manifestation + Gratitude Journal, and The Wisdom Companion.`,
    },
    {
      id: "gifts-included",
      q: "Are the three gifts really included?",
      a: "Yes. They are included at no additional charge with your paid membership during this enrollment window.",
    },
    {
      id: "one-time",
      q: "Is this a one-time payment?",
      a: `No. This is a monthly subscription priced at $4.99 per month (${innerCircleConfig.currency}). Renewal terms and any applicable tax are shown at checkout before you pay.`,
    },
    {
      id: "portal-closes",
      q: "What happens when the 11:11 Portal closes?",
      a: "Enrollment closes to new members. If you want to join during this opening, subscribe before the deadline shown on this page.",
    },
  ];

  if (innerCircleConfig.existingMembersKeepAccess) {
    items.push({
      id: "keep-access",
      q: "Will I lose access when the countdown ends?",
      a: "No—the countdown marks the end of new enrollment. Your membership continues while your subscription remains active.",
    });
  }

  items.push(
    {
      id: "where",
      q: "Where do I find the community and my gifts?",
      a: "Everything is available inside your private Stan Store community after joining. Follow the access instructions provided after purchase.",
    },
    {
      id: "experience",
      q: "Do I need experience with journaling or manifestation?",
      a: "No. You can begin wherever you are. Explore a teaching, reflect on a prompt, and build a practice at your own pace.",
    },
    {
      id: "weekly",
      q: "How often do I receive a Sacred Transcript?",
      a: "A new Sacred Transcript is shared weekly, with reflections, affirmations, rituals, and guidance from Yun Mei.",
    },
    {
      id: "phone",
      q: "Can I use this on my phone?",
      a: "Yes. You can access the community and resources on your phone or desktop.",
    },
    {
      id: "coaching",
      q: "Does membership include private coaching with Yun Mei?",
      a: "The offer described here includes shared teachings and community access. Private coaching and individual replies are not listed as membership benefits.",
    },
  );

  const optional = [
    ["cancel", "How do I cancel, and what happens to my access?", innerCircleConfig.policies.cancellation],
    [
      "downloads",
      "Can I keep or download the gifts if I cancel?",
      innerCircleConfig.policies.downloadsAfterCancel,
    ],
    ["refund", "What is the refund policy?", innerCircleConfig.policies.refund],
  ] as const;

  for (const [id, q, a] of optional) {
    if (a) items.push({ id, q, a });
  }

  return items;
}

function Faq() {
  const items = faqItems();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="scroll-mt-32 bg-[#F9F3E7]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro eyebrow="Questions" title="Everything you’re wondering" />
        <div className="mt-10 divide-y divide-[#35253F]/10 border-y border-[#35253F]/10">
          {items.map((item) => {
            const expanded = open === item.id;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${item.id}`}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-instrument-serif text-xl leading-snug text-[#35253F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35253F] sm:text-2xl"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => {
                      const next = expanded ? null : item.id;
                      setOpen(next);
                      if (next) trackFaqOpened(item.id);
                    }}
                  >
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="text-2xl leading-none text-[#6E5730]">
                      {expanded ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                {expanded ? (
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${item.id}`}
                    className="pb-5 text-[17px] leading-7"
                  >
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalInvite() {
  const perks = [
    "Private Inner Circle community",
    "Weekly Sacred Transcript",
    "Manifestation + Gratitude Journal",
    "The Wisdom Companion",
    "Cancel anytime",
  ];

  return (
    <section className="bg-[#F0E6D4]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid min-w-0 overflow-hidden rounded-[1.75rem] bg-[#FBF7F0] shadow-[0_24px_60px_rgba(63,50,38,0.08)] ring-1 ring-[#E7DCCB] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0 px-4 py-8 sm:px-10 sm:py-10">
            <Eyebrow>Order today</Eyebrow>
            <h2 className="mt-3 text-4xl leading-[1.05] text-[#35253F] sm:text-5xl">
              Begin the practice tonight
            </h2>
            <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#5C534A]">
              One membership, instant access, and the gifts that come with it.
              Cancel anytime.
            </p>
            <ul className="mt-6 space-y-2.5">
              {perks.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-[#3F3226]">
                  <span className="mt-0.5 text-[#5E6B45]" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-[#F3EADD] px-5 py-5">
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#6E5730]">
                LIMITED-TIME OFFER
              </p>
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-ic-display text-3xl leading-none text-[#3F3226] sm:text-4xl">
                    {price}{" "}
                    <s className="text-[0.55em] font-medium text-[#8A8178]">{compareAt}</s>
                  </p>
                  <p className="mt-2 text-sm font-normal text-[#5C534A]">
                    Save {savings}. Cancel anytime.
                  </p>
                </div>
                <JoinButton
                  section="final"
                  className="w-full max-w-full whitespace-nowrap px-4 py-2.5 text-sm sm:w-auto"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Get instant access
                </JoinButton>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.14em] text-[#5C534A]">
                  PRICE ENDS IN
                </span>
                <HourCountdown />
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-col items-center overflow-hidden bg-[#F4EFE4] px-5 py-8 text-center sm:px-8 sm:py-10">
            <ShieldCheck className="h-8 w-8 text-[#5E6B45]" aria-hidden="true" />
            <h3 className="mt-4 text-3xl leading-tight text-[#35253F]">
              30-Day Happiness Guarantee
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#5C534A]">
              Stay with the Circle for 30 days. If it isn’t for you, write to us
              and we’ll refund every cent. Cancel anytime. No forms, no fuss.
            </p>
            <div className="relative mt-6 aspect-[3/4] w-full max-w-[9.5rem] overflow-hidden rounded-2xl shadow-[0_12px_24px_rgba(63,50,38,0.16)] sm:max-w-[11rem]">
              <Image
                src={innerCircleAssets.hero}
                alt="Yun Mei with a small group in a courtyard"
                fill
                sizes="176px"
                className="object-cover object-[center_18%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { memberSignInUrl } = useEnrollment();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F0E6D4]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-12 text-center sm:px-6">
        <p className="font-instrument-serif text-3xl text-[#35253F]">Yun Mei</p>
        <nav
          className="flex flex-col items-center gap-1 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5"
          aria-label="Footer"
        >
          <a className="ic-nav" href="#notice">
            Notice
          </a>
          <a className="ic-nav" href="#how">
            How
          </a>
          <a className="ic-nav" href="#gifts">
            Gifts
          </a>
          <a className="ic-nav" href="#about">
            About
          </a>
          <a className="ic-nav" href="#faq">
            FAQ
          </a>
          <a className="ic-nav" href={`mailto:${innerCircleConfig.supportEmail}`}>
            {innerCircleConfig.supportEmail}
          </a>
          <Link className="ic-nav" href="/terms">
            Terms
          </Link>
          <Link className="ic-nav" href="/privacy">
            Privacy
          </Link>
          <Link className="ic-nav" href="/contact">
            Support
          </Link>
          {memberSignInUrl ? (
            <a className="ic-nav" href={memberSignInUrl}>
              Existing members sign in
            </a>
          ) : null}
        </nav>
        <p className="max-w-xl text-sm leading-6 text-[#302B33]/75">
          Subscription and refund details are shown at checkout before you pay.
        </p>
        <p className="text-sm text-[#302B33]/70">© {year} Yun Mei. All rights reserved.</p>
      </div>
    </footer>
  );
}

function StickyOffer() {
  const { status } = useEnrollment();
  const [visible, setVisible] = useState(false);
  const closed = status === "closed";

  useEffect(() => {
    if (closed) return;
    const root = document.querySelector(".ic-root");
    const update = () => {
      const section = document.getElementById("notice");
      if (!section) return;
      const show = section.getBoundingClientRect().top < window.innerHeight * 0.92;
      setVisible(show);
      root?.classList.toggle("ic-sticky-on", show);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root?.classList.remove("ic-sticky-on");
    };
  }, [closed]);

  if (closed) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#E7DCCB] bg-[#FBF7F0]/95 px-3 pt-2.5 shadow-[0_-8px_24px_rgba(63,50,38,0.08)] backdrop-blur-md pb-[max(0.6rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="flex text-[#C4784A]" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <Star key={index} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="relative h-3.5 w-3.5">
              <Star className="h-3.5 w-3.5 fill-[#E7D3C4]" />
              <span className="absolute inset-y-0 left-0 w-[60%] overflow-hidden">
                <Star className="h-3.5 w-3.5 fill-[#C4784A]" />
              </span>
            </span>
          </span>
          <p className="mt-0.5 truncate text-sm font-bold leading-none text-[#3F3226]">
            {price}{" "}
            <s className="text-[0.85em] font-medium text-[#8A8178]">{compareAt}</s>
          </p>
        </div>
        <JoinButton
          section="sticky"
          className="h-9 w-auto min-h-0 shrink-0 whitespace-nowrap px-3.5 py-0 text-[13px]"
        >
          Get Instant Access <span aria-hidden="true">→</span>
        </JoinButton>
      </div>
    </div>
  );
}

function PageBody() {
  return (
    <>
      <div className="sticky top-0 z-30">
        <Announcement />
        <Header />
      </div>
      <main>
        <Hero />
        <StatsBreak />
        <MemberNotice />
        <Testimonials />
        <Gifts />
        <How />
        <About />
        <FinalInvite />
        <Faq />
      </main>
      <Footer />
      <StickyOffer />
    </>
  );
}

export function InnerCirclePage({ serverNow }: { serverNow: number }) {
  return (
    <EnrollmentProvider serverNow={serverNow}>
      <PageBody />
    </EnrollmentProvider>
  );
}
