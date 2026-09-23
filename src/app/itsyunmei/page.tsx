import type { Metadata, Viewport } from "next";
import { ItsYunmeiAnalytics } from "@/components/itsyunmei/PostHogProvider";
import { ItsYunmeiPage } from "@/components/itsyunmei/ItsYunmeiPage";
import { itsYunmeiFont } from "@/components/itsyunmei/font";
import "@/components/itsyunmei/itsyunmei.css";

export const metadata: Metadata = {
  title: "Your next chapter | Yun Mei",
  description:
    "Take a breath. Think about what you want to welcome into your life. Then choose 3 cards.",
};

export const viewport: Viewport = {
  themeColor: "#EAD9FC",
  width: "device-width",
  initialScale: 1,
};

export default function ItsYunmeiRoutePage() {
  return (
    <ItsYunmeiAnalytics>
      <div
        className={`${itsYunmeiFont.variable} ${itsYunmeiFont.className} itsyunmei-root antialiased`}
      >
        <ItsYunmeiPage />
      </div>
    </ItsYunmeiAnalytics>
  );
}
