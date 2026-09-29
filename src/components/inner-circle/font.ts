import { Fraunces, Nunito_Sans } from "next/font/google";

export const innerCircleFont = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-inner-circle",
});

export const innerCircleDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ic-display",
});
