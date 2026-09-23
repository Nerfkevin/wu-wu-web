"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";
import { HighlightedParts } from "./HighlightedParts";

const copy = itsYunmeiConfig.copy.modal;

export function ConnectionModal({
  connecting,
  open,
  onContinue,
}: {
  connecting: boolean;
  open: boolean;
  onContinue: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const continueLock = useRef(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open && !connecting) {
      continueLock.current = false;
      return;
    }

    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      if (open) titleRef.current?.focus();
      else panel?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        return;
      }
      if (!open || event.key !== "Tab") return;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, connecting]);

  if ((!open && !connecting) || typeof document === "undefined") return null;

  const handleContinue = () => {
    if (continueLock.current) return;
    continueLock.current = true;
    onContinue();
  };

  return createPortal(
    <div className="iy-modal-root">
      <div className="iy-modal-backdrop" aria-hidden />
      {connecting ? (
        <div
          ref={panelRef}
          role="status"
          aria-live="polite"
          aria-label={copy.connecting}
          tabIndex={-1}
          className="iy-connecting"
        >
          <span className="iy-connecting-spin" aria-hidden />
          <p className="iy-connecting-label">{copy.connecting}</p>
        </div>
      ) : (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          className="iy-modal-panel"
        >
          <p className="mb-1 text-center text-[18px] leading-none sm:mb-2 sm:text-[22px]" aria-hidden>
            ⚠️
          </p>

          <h2
            id={titleId}
            ref={titleRef}
            tabIndex={-1}
            className="text-center text-[16px] font-extrabold uppercase leading-tight tracking-[0.03em] text-[#9428ff] outline-none sm:text-[22px]"
          >
            {copy.title}
          </h2>
          <div
            id={descId}
            className="iy-modal-copy mt-4 flex flex-col gap-4 text-center text-[13px] leading-[1.7] text-[#3d3348] sm:mt-4 sm:gap-5 sm:text-[16px] sm:leading-[1.75]"
          >
            {copy.body.map((paragraph, i) => (
              <p key={i}>
                <HighlightedParts parts={paragraph} />
              </p>
            ))}
          </div>

          <button
            type="button"
            className="iy-btn iy-modal-cta mt-5 shrink-0 sm:mt-6"
            onClick={handleContinue}
          >
            <span className="iy-modal-cta-star" aria-hidden>
              ⭐
            </span>
            <span className="iy-modal-cta-label">{copy.cta}</span>
          </button>
        </div>
      )}
    </div>,
    document.body,
  );
}
