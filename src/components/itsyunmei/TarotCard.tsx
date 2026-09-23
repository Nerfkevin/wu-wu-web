"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { hasAsset, TIMING } from "@/lib/itsyunmei/config";

export function TarotCard({
  position,
  total,
  revealed,
  muted,
  title,
  backSrc,
  frontSrc,
  reducedMotion,
  onSelect,
}: {
  position: number;
  total: number;
  revealed: boolean;
  muted: boolean;
  title: string | null;
  backSrc: string | null;
  frontSrc: string | null;
  reducedMotion: boolean;
  onSelect: (position: number) => void;
}) {
  const label = revealed && title
    ? `Card ${position + 1} of ${total}, ${title}`
    : `Card ${position + 1} of ${total}, face down`;

  return (
    <button
      type="button"
      className={`iy-card-btn${revealed ? " is-revealed is-flipped" : ""}${
        muted ? " is-muted" : ""
      }`}
      aria-label={label}
      aria-pressed={revealed}
      tabIndex={muted ? -1 : undefined}
      onClick={() => onSelect(position)}
      style={{
        transitionDuration: reducedMotion ? "0ms" : undefined,
      }}
    >
      <span
        className="iy-card-inner"
        style={{
          transitionDuration: reducedMotion
            ? `${TIMING.reducedMotionMs}ms`
            : `${TIMING.flipMs}ms`,
        }}
      >
        <span className="iy-card-face iy-card-back">
          <CardFaceImage
            src={backSrc}
            alt=""
            fallback={<CardBackPlaceholder id={`iy-back-${position}`} />}
          />
        </span>
        <span className="iy-card-face iy-card-front">
          <CardFaceImage
            src={frontSrc}
            alt=""
            fallback={
              <CardFrontPlaceholder title={title ?? "Revealed card"} />
            }
          />
        </span>
      </span>
    </button>
  );
}

function CardFaceImage({
  src,
  alt,
  fallback,
}: {
  src: string | null;
  alt: string;
  fallback: ReactNode;
}) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [src]);

  const showImage = hasAsset(src) && !broken;

  if (!showImage) return fallback;

  return (
    // Native img so arbitrary future asset URLs never need a Next image host.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setBroken(true)} />
  );
}

function CardBackPlaceholder({ id }: { id: string }) {
  return (
    <span className="iy-card-placeholder" aria-hidden>
      <svg viewBox="0 0 80 120" className="h-[72%] w-[72%]">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect
          x="8"
          y="10"
          width="64"
          height="100"
          rx="10"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.4"
        />
        <rect
          x="13"
          y="15"
          width="54"
          height="90"
          rx="8"
          fill="none"
          stroke="rgba(148,40,255,0.35)"
          strokeWidth="1"
        />
        <circle cx="40" cy="60" r="18" fill="none" stroke={`url(#${id})`} strokeWidth="1.4" />
        <circle cx="40" cy="60" r="10" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        <path
          d="M40 44 L43 54 L54 54 L45 61 L48 72 L40 65 L32 72 L35 61 L26 54 L37 54 Z"
          fill="rgba(255,255,255,0.92)"
        />
        <circle cx="24" cy="32" r="1.6" fill="rgba(148,40,255,0.55)" />
        <circle cx="56" cy="32" r="1.6" fill="rgba(148,40,255,0.55)" />
        <circle cx="24" cy="88" r="1.6" fill="rgba(148,40,255,0.55)" />
        <circle cx="56" cy="88" r="1.6" fill="rgba(148,40,255,0.55)" />
      </svg>
    </span>
  );
}

function CardFrontPlaceholder({ title }: { title: string }) {
  return (
    <span className="iy-card-placeholder">
      <Sparkles className="h-3.5 w-3.5 text-[#9428ff]" aria-hidden />
      <span className="iy-card-placeholder-title">{title}</span>
    </span>
  );
}
