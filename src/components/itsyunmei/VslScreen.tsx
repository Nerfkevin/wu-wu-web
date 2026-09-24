"use client";

import type { Ref, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackFunnelEvent } from "@/lib/itsyunmei/analytics";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";
import { latchOfferUnlocked } from "@/lib/itsyunmei/offer";
import {
  readOfferUnlocked,
  writeOfferUnlocked,
} from "@/lib/itsyunmei/storage";
import { FunnelFooter } from "./FunnelFooter";
import { OfferCTA } from "./OfferCTA";
import { OfferCountdown } from "./OfferCountdown";
import { OfferEndOverlay } from "./OfferEndOverlay";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";

const copy = itsYunmeiConfig.copy.vsl;

export function VslScreen({
  headingRef,
  playerRef,
  active,
  onChooseCardsAgain,
}: {
  headingRef: RefObject<HTMLHeadingElement>;
  playerRef: Ref<VideoPlayerHandle>;
  active: boolean;
  onChooseCardsAgain: () => void;
}) {
  const [offerUnlocked, setOfferUnlocked] = useState(false);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const unlockedRef = useRef(false);
  const revealedEventRef = useRef(false);

  useEffect(() => {
    const already = readOfferUnlocked(itsYunmeiConfig.videoVersion);
    unlockedRef.current = already;
    setOfferUnlocked(already);
  }, []);

  const considerOffer = useCallback(
    (currentTime: number, duration: number, ended: boolean) => {
      const next = latchOfferUnlocked(
        unlockedRef.current,
        currentTime,
        duration,
        itsYunmeiConfig.offerRevealAtSeconds,
        ended,
      );
      if (next && !unlockedRef.current) {
        unlockedRef.current = true;
        setOfferUnlocked(true);
        writeOfferUnlocked(itsYunmeiConfig.videoVersion, true);
        if (!revealedEventRef.current) {
          revealedEventRef.current = true;
          trackFunnelEvent("offer_revealed");
        }
      }
    },
    [],
  );

  return (
    <section
      className="iy-screen w-full max-w-[760px]"
      aria-label="Your Yun Mei message"
    >
      <p className="inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-full border border-[#e0ccff] bg-white/80 px-2.5 py-1 text-center text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9428ff] sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.12em]">
        {copy.badge}
      </p>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 text-center text-[22px] font-bold leading-[1.2] text-[#191126] outline-none sm:mt-5 sm:text-[28px]"
      >
        {copy.headlineBefore}
        <span className="text-[#9428ff]">{copy.headlineHighlight}</span>
        {copy.headlineAfter}
      </h1>

      <p className="mt-2 text-pretty text-center text-[13px] leading-[1.4] text-[#62566f] sm:mt-3 sm:text-[15px]">
        {copy.support}
      </p>

      <div className="mt-5 flex w-full justify-center sm:mt-7">
        <VideoPlayer
          ref={playerRef}
          active={active}
          onPlayback={considerOffer}
          onEnded={() => {
            considerOffer(1, 1, true);
            setShowEndOverlay(true);
          }}
        />
      </div>

      {offerUnlocked ? (
        <div className="iy-offer-slot">
          <OfferCountdown
            kind="inline"
            durationMs={itsYunmeiConfig.inlineOfferCountdownMs}
            enabled
          />
          <OfferCTA source="inline" />
        </div>
      ) : null}

      <OfferEndOverlay
        open={showEndOverlay}
        onKeepWatching={() => setShowEndOverlay(false)}
      />

      <button
        type="button"
        className="iy-text-btn mt-6"
        onClick={onChooseCardsAgain}
      >
        {copy.chooseCardsAgain}
      </button>

      <FunnelFooter line={copy.footer} />
    </section>
  );
}
