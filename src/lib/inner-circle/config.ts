/**
 * Launch inputs. Checkout and the countdown stay off until closesAt,
 * timeZone, and checkoutUrl are all set to confirmed values.
 * closesAt is an ISO timestamp with a numeric offset, for example
 * "2026-11-11T23:11:00-05:00". timeZone is the IANA zone used to print it.
 */
export const innerCircleConfig = {
  priceLabel: "$4.99",
  /** Shown struck through beside the offer price. */
  compareAtLabel: "$29.99",
  savingsLabel: "$25",
  currency: "USD",
  checkoutUrl: "https://v2.stan.store/itsyunmei/itsyunmei_store/page/5465593",
  waitlistUrl: null as string | null,
  memberSignInUrl: null as string | null,
  opensAt: null as string | null,
  closesAt: null as string | null,
  timeZone: null as string | null,
  supportEmail: "hello@98goats.com",
  /**
   * Working assumption from the brief: closing stops new enrollment;
   * current subscribers keep access while the subscription is active.
   */
  existingMembersKeepAccess: true,
  /** Customer-facing policy copy. Null items are omitted, not shown as notes. */
  policies: {
    renewal: null as string | null,
    cancellation: null as string | null,
    downloadsAfterCancel: null as string | null,
    refund: null as string | null,
  },
} as const;

export const innerCircleAssets = {
  hero: "/brand/itsyunmei/heroimage.png",
  heroWidth: 941,
  heroHeight: 1672,
  portrait: "/brand/itsyunmei/logo.jpg",
  portraitSize: 128,
  gifts: {
    transcript: "/brand/itsyunmei/weekly-sacred-transcript-3d.png",
    journal: "/brand/itsyunmei/manifestation-gratitude-journal-3d.png",
    wisdom: "/brand/itsyunmei/wisdom-companion-3d.png",
  },
  giftWidth: 1147,
  giftHeight: 1372,
} as const;
