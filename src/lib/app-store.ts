/** Wu-Wu App Store id */
export const APP_STORE_ID = "6760009072" as const;

/** HTTPS — works everywhere; iOS usually hands off to the App Store app */
export const APP_STORE_URL =
  `https://apps.apple.com/app/id${APP_STORE_ID}` as const;

/**
 * Native App Store scheme — opens the App Store app directly on iOS.
 * Instagram’s in-app browser sometimes blocks this; HTTPS is the fallback.
 */
export const APP_STORE_ITMS_URL =
  `itms-apps://apps.apple.com/app/id${APP_STORE_ID}` as const;

/** Local marketing badge (public/) */
export const APP_STORE_BADGE_SRC = "/brand/appstore.png" as const;
