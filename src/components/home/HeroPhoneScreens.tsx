"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHONE_SHOTS = [
  "/brand/phone/314shots_so.png",
  "/brand/phone/455shots_so.png",
  "/brand/phone/848shots_so.png",
] as const;

const INTERVAL_MS = 1100;

const CROP_ASPECT = "aspect-[3/4]";

/**
 * All images stay mounted (no key swap) so they're all pre-loaded.
 * Visibility toggles are instant — no opacity transition — so no blank frame.
 */
export function HeroPhoneScreens() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHONE_SHOTS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`relative mx-auto w-[min(128vw,40rem)] ${CROP_ASPECT} overflow-hidden`}
    >
      {PHONE_SHOTS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Wu-Wu app preview"
          fill
          sizes="(max-width: 768px) 98vw, 0px"
          className={`absolute inset-0 object-cover object-top ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority
        />
      ))}
    </div>
  );
}
