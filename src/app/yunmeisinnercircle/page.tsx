import type { Metadata, Viewport } from "next";
import { InnerCircleAnalytics } from "@/components/inner-circle/Analytics";
import { innerCircleDisplay, innerCircleFont } from "@/components/inner-circle/font";
import { InnerCirclePage } from "@/components/inner-circle/InnerCirclePage";
import { innerCircleConfig } from "@/lib/inner-circle/config";
import "@/components/inner-circle/inner-circle.css";

const path = "/yunmeisinnercircle";
const offerConfigured = Boolean(
  innerCircleConfig.closesAt && innerCircleConfig.timeZone,
);

export const metadata: Metadata = {
  title: "Yun Mei’s Inner Circle",
  description:
    "A private community for gentle guidance, meaningful reflection, and a more consistent practice of coming back to yourself. $4.99/month during the 11:11 Portal, with three digital gifts included.",
  alternates: { canonical: `https://wu-wu.com${path}` },
  robots: offerConfigured ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F9F3E7",
  width: "device-width",
  initialScale: 1,
};

export const dynamic = "force-dynamic";

export default function YunMeiInnerCirclePage() {
  return (
    <InnerCircleAnalytics>
      <div
        className={`${innerCircleFont.variable} ${innerCircleDisplay.variable} ${innerCircleFont.className} ic-root antialiased`}
      >
        <InnerCirclePage serverNow={Date.now()} />
      </div>
    </InnerCircleAnalytics>
  );
}
