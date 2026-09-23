"use client";

import type { RefObject } from "react";
import {
  CARD_COUNT,
  MAX_SELECTIONS,
  itsYunmeiConfig,
} from "@/lib/itsyunmei/config";
import { revealIndexForPosition } from "@/lib/itsyunmei/selection";
import { BrandLockup } from "./BrandLockup";
import { FunnelFooter } from "./FunnelFooter";
import { HighlightedParts } from "./HighlightedParts";
import { TarotCard } from "./TarotCard";

const copy = itsYunmeiConfig.copy.cards;

export function CardSelection({
  headingRef,
  selected,
  reducedMotion,
  showViewMessage,
  onSelect,
  onViewMessage,
  viewMessageRef,
}: {
  headingRef: RefObject<HTMLHeadingElement>;
  selected: number[];
  reducedMotion: boolean;
  showViewMessage: boolean;
  onSelect: (position: number) => void;
  onViewMessage: () => void;
  viewMessageRef: RefObject<HTMLButtonElement>;
}) {
  const complete = selected.length >= MAX_SELECTIONS;

  return (
    <section className="iy-screen w-full max-w-[440px]" aria-label="Choose three cards">
      <BrandLockup />

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="max-w-[21.5rem] text-balance text-center text-[22px] font-bold leading-[1.2] text-[#191126] outline-none sm:max-w-[24rem] sm:text-[28px] sm:leading-[1.15]"
      >
        <HighlightedParts parts={copy.headline} />
      </h1>

      <p className="mt-3 inline-block max-w-full rounded-full border border-dashed border-[#c9a4ff] bg-white/70 px-3 py-1.5 text-center text-[12px] font-medium leading-4 text-[#62566f] sm:mt-5 sm:px-4 sm:py-2 sm:text-[13px] sm:leading-5">
        <HighlightedParts parts={copy.pill} />
      </p>

      <p
        className={`iy-tap-hint mt-4 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#62566f] sm:mt-5 sm:mb-3 sm:text-[12px]${
          reducedMotion ? "" : " is-animated"
        }`}
      >
        <span className="iy-tap-finger" aria-hidden>
          👇
        </span>
        {copy.tapLabel}
        <span className="iy-tap-finger" aria-hidden>
          👇
        </span>
      </p>

      <div className="iy-spread">
        {Array.from({ length: CARD_COUNT }, (_, position) => {
          const revealIndex = revealIndexForPosition(selected, position);
          const revealed = revealIndex != null;
          return (
            <TarotCard
              key={position}
              position={position}
              total={CARD_COUNT}
              revealed={revealed}
              muted={complete && !revealed}
              title={
                revealIndex != null
                  ? itsYunmeiConfig.cardTitles[revealIndex]
                  : null
              }
              backSrc={itsYunmeiConfig.cardBackImage}
              frontSrc={
                revealIndex != null
                  ? itsYunmeiConfig.cardFrontImages[revealIndex]
                  : null
              }
              reducedMotion={reducedMotion}
              onSelect={onSelect}
            />
          );
        })}
      </div>

      <div className="mt-3 flex flex-col items-center gap-2 sm:mt-5">
        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: MAX_SELECTIONS }, (_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full"
              style={{
                background:
                  i < selected.length ? "#9428ff" : "rgba(148, 40, 255, 0.22)",
              }}
            />
          ))}
        </div>
        <p
          className="text-[13px] leading-5 text-[#62566f]"
          aria-live="polite"
          aria-atomic="true"
        >
          {copy.progress(selected.length)}
        </p>
      </div>

      {showViewMessage ? (
        <button
          ref={viewMessageRef}
          type="button"
          className="iy-btn mx-auto mt-6 max-w-[320px]"
          onClick={onViewMessage}
        >
          {copy.viewMessage}
        </button>
      ) : null}

      <FunnelFooter line={copy.footer} />
    </section>
  );
}
