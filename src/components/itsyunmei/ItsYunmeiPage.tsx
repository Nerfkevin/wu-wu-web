"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackFunnelEvent } from "@/lib/itsyunmei/analytics";
import { MAX_SELECTIONS, TIMING } from "@/lib/itsyunmei/config";
import {
  resetSelection,
  selectPosition,
  unlockSelection,
  type CardSelectionState,
} from "@/lib/itsyunmei/selection";
import {
  readFunnelScreen,
  writeFunnelScreen,
  type FunnelScreen,
} from "@/lib/itsyunmei/storage";
import { CardSelection } from "./CardSelection";
import { ConnectionModal } from "./ConnectionModal";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { VslScreen } from "./VslScreen";

export function ItsYunmeiPage() {
  const reducedMotion = usePrefersReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<FunnelScreen>("cards");
  const [opacity, setOpacity] = useState(1);
  const [selection, setSelection] = useState<CardSelectionState>(resetSelection);
  const [modalOpen, setModalOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);

  const vslHeadingRef = useRef<HTMLHeadingElement>(null);
  const cardsHeadingRef = useRef<HTMLHeadingElement>(null);
  const viewMessageRef = useRef<HTMLButtonElement>(null);
  const autoOpenedRef = useRef(false);
  const continueLock = useRef(false);
  const fadeLock = useRef(false);
  const prevSelectedLen = useRef(0);
  const vslViewedRef = useRef(false);
  const cardsViewedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScreen(readFunnelScreen());
    setHydrated(true);
    const html = document.documentElement;
    const previousScheme = html.style.colorScheme;
    html.style.colorScheme = "light";
    return () => {
      html.style.colorScheme = previousScheme;
      // Clear whichever fade timers are pending at unmount.
      // eslint-disable-next-line react-hooks/exhaustive-deps -- snapshot would miss timers queued after mount
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    if (modalOpen || connecting) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }, [modalOpen, connecting]);

  useEffect(() => {
    if (!hydrated || screen !== "cards" || cardsViewedRef.current) return;
    cardsViewedRef.current = true;
    trackFunnelEvent("cards_screen_viewed");
  }, [hydrated, screen]);

  useEffect(() => {
    if (!hydrated || screen !== "vsl" || vslViewedRef.current) return;
    vslViewedRef.current = true;
    trackFunnelEvent("vsl_screen_viewed");
  }, [hydrated, screen]);

  useEffect(() => {
    const len = selection.selected.length;
    if (len > prevSelectedLen.current) {
      trackFunnelEvent("card_selected", { selection_number: len });
      if (len === MAX_SELECTIONS) trackFunnelEvent("reading_completed");
    }
    prevSelectedLen.current = len;
  }, [selection.selected.length]);

  useEffect(() => {
    if (!selection.locked) return;
    const ms = reducedMotion ? TIMING.reducedMotionMs : TIMING.flipMs;
    const id = window.setTimeout(() => {
      setSelection((prev) => unlockSelection(prev));
    }, ms);
    return () => window.clearTimeout(id);
  }, [selection.locked, selection.selected.length, reducedMotion]);

  useEffect(() => {
    if (
      selection.selected.length !== MAX_SELECTIONS ||
      screen !== "cards" ||
      autoOpenedRef.current ||
      modalDismissed
    ) {
      return;
    }
    const delay =
      (reducedMotion ? TIMING.reducedMotionMs : TIMING.flipMs) +
      TIMING.postFlipPauseMs;
    const id = window.setTimeout(() => {
      autoOpenedRef.current = true;
      setConnecting(true);
    }, delay);
    return () => window.clearTimeout(id);
  }, [selection.selected.length, screen, modalDismissed, reducedMotion]);

  useEffect(() => {
    if (!connecting) return;
    const id = window.setTimeout(() => {
      setConnecting(false);
      setModalOpen(true);
    }, TIMING.connectingMs);
    return () => window.clearTimeout(id);
  }, [connecting]);

  useEffect(() => {
    if (!modalOpen) return;
    trackFunnelEvent("message_modal_opened");
  }, [modalOpen]);

  const fadeTo = useCallback(
    (next: FunnelScreen) => {
      if (fadeLock.current) return;
      fadeLock.current = true;
      const outMs = reducedMotion ? 0 : TIMING.screenFadeOutMs;
      const inMs = reducedMotion ? 0 : TIMING.screenFadeInMs;
      setOpacity(0);
      const outId = window.setTimeout(() => {
        setScreen(next);
        writeFunnelScreen(next);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setOpacity(1);
            const target =
              next === "vsl" ? vslHeadingRef.current : cardsHeadingRef.current;
            target?.focus({ preventScroll: true });
            const inId = window.setTimeout(() => {
              fadeLock.current = false;
            }, inMs);
            timersRef.current.push(inId);
          });
        });
      }, outMs);
      timersRef.current.push(outId);
    },
    [reducedMotion],
  );

  const handleSelect = useCallback((position: number) => {
    setSelection((prev) => selectPosition(prev, position));
  }, []);

  const handleContinue = useCallback(() => {
    if (continueLock.current || fadeLock.current) return;
    continueLock.current = true;
    trackFunnelEvent("message_continued");
    setModalOpen(false);
    setConnecting(false);
    setModalDismissed(false);
    fadeTo("vsl");
  }, [fadeTo]);

  const handleChooseCardsAgain = useCallback(() => {
    autoOpenedRef.current = false;
    continueLock.current = false;
    vslViewedRef.current = false;
    cardsViewedRef.current = false;
    trackFunnelEvent("cards_restarted");
    setSelection(resetSelection());
    setModalOpen(false);
    setConnecting(false);
    setModalDismissed(false);
    fadeTo("cards");
  }, [fadeTo]);

  if (!hydrated) {
    return <div className="iy-page" />;
  }

  return (
    <div className="iy-page">
      <div
        ref={mainRef}
        className="iy-main"
        aria-hidden={modalOpen || connecting || undefined}
        style={
          opacity === 1
            ? undefined
            : {
                opacity,
                pointerEvents: "none",
                transition: reducedMotion
                  ? "none"
                  : `opacity ${
                      opacity === 0
                        ? TIMING.screenFadeOutMs
                        : TIMING.screenFadeInMs
                    }ms ease`,
              }
        }
      >
        {screen === "cards" ? (
          <CardSelection
            headingRef={cardsHeadingRef}
            selected={selection.selected}
            reducedMotion={reducedMotion}
            showViewMessage={
              modalDismissed &&
              selection.selected.length === MAX_SELECTIONS &&
              !modalOpen &&
              !connecting
            }
            onSelect={handleSelect}
            onViewMessage={() => setConnecting(true)}
            viewMessageRef={viewMessageRef}
          />
        ) : (
          <VslScreen
            headingRef={vslHeadingRef}
            onChooseCardsAgain={handleChooseCardsAgain}
          />
        )}
      </div>

      <ConnectionModal
        connecting={connecting && screen === "cards"}
        open={modalOpen && screen === "cards"}
        onContinue={handleContinue}
      />
    </div>
  );
}
