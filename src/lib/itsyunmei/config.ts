export const CARD_COUNT = 7;
export const MAX_SELECTIONS = 3;

export const TIMING = {
  flipMs: 600,
  postFlipPauseMs: 400,
  connectingMs: 2000,
  screenFadeOutMs: 250,
  screenFadeInMs: 350,
  vslPlayDelayMs: 500,
  progressSaveMs: 5000,
  reducedMotionMs: 80,
} as const;

export const MEANINGFUL_PROGRESS_SECONDS = 3;

/**
 * Drop final assets here. Use null/"" for anything missing — the UI
 * always renders a placeholder instead of a broken image/player.
 */
export const itsYunmeiConfig = {
  cardBackImage: null as string | null,
  cardFrontImages: [
    "/brand/itsyunmei/the-intention.jpg",
    "/brand/itsyunmei/the-possibility.jpg",
    "/brand/itsyunmei/the-becoming.jpg",
  ] as [string | null, string | null, string | null],
  /** Accessible names for the three reveals (also used on placeholders). */
  cardTitles: ["The Intention", "The Possibility", "The Becoming"] as [
    string,
    string,
    string,
  ],
  videoSrc: "https://pub-1158c95d6eae4a40b9a4f882921bde94.r2.dev/hls/v1/master.m3u8",
  videoPoster: null as string | null,
  captionsSrc: null as string | null,
  /** CSS aspect-ratio, e.g. "16 / 9" or "9 / 16". */
  videoAspectRatio: "9 / 16",
  stanCheckoutUrl:
    "https://stan.store/itsyunmei/p/the-weekly-sacred-transcript-3-free-gifts",
  /** If set, reveal the offer at this playback time. Otherwise 90% of duration. */
  offerRevealAtSeconds: 18 * 60 + 20,
  inlineOfferCountdownMs: 10 * 60 * 1000,
  endOfferCountdownMs: 5 * 60 * 1000,
  /** Bump this when the VSL file changes so saved progress/unlock stay separate. */
  videoVersion: "v1",

  logoSrc: "/brand/itsyunmei/logo.jpg",

  copy: {
    brand: "Yun Mei",
    cards: {
      headline: [
        { text: "Something " },
        { text: "POWERFUL", highlight: true },
        { text: " wants to speak to you about 2026." },
      ],
      pill: [
        { text: "Tap 3 cards", highlight: true },
        { text: " to unlock your special message" },
      ],
      tapLabel: "Tap a card to reveal",
      progress: (n: number) => `${n} of 3 cards revealed`,
      viewMessage: "View your message",
      footer: "A moment to reflect. A new possibility to explore.",
    },
    modal: {
      title: "Connection established!",
      body: [
        [
          { text: "UNBELIEVABLE:", highlight: true },
          { text: " a " },
          { text: "DIRECT CONNECTION", highlight: true },
          { text: " has been established. This message is " },
          { text: "EXCLUSIVE", highlight: true },
          { text: " — meant only for you." },
        ],
        [
          { text: "This happens to " },
          { text: "VERY FEW PEOPLE", highlight: true },
          { text: "." },
        ],
        [
          { text: "Your message is being transmitted " },
          { text: "RIGHT NOW", highlight: true },
          { text: "." },
        ],
      ],
      cta: "Get your special message →",
      connecting: "Establishing connection…",
    },
    vsl: {
      badge: "✦ Private reading · Prepared for you",
      headlineBefore: "Your ",
      headlineHighlight: "Final Revelation",
      headlineAfter: "",
      support: "The truth is about to be revealed.",
      chooseCardsAgain: "← Back to card reading",
      footer: "Yun Mei",
    },
    video: {
      placeholder: "Your video will appear here.",
      error: "This video couldn’t be loaded. Please try again later.",
      resumeTitle: "You have already started watching this video",
      continueWatching: "Continue watching?",
      startOver: "Start from beginning?",
    },
    offer: {
      heading: "Your next chapter is waiting.",
      body: "Step into the Weekly Sacred Transcript — and keep this energy with you.",
      cta: "Begin Your Journey 👉",
      keepWatching: "Keep watching",
      supporting: "View the full offer and pricing at checkout.",
      endsIn: "This offer ends in",
    },
  },
} as const;

export type ItsYunmeiConfig = typeof itsYunmeiConfig;

export function hasAsset(
  value: string | null | undefined,
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
