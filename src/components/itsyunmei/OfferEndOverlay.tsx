"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";
import { itsYunmeiFont } from "./font";
import { OfferCTA } from "./OfferCTA";

const copy = itsYunmeiConfig.copy.offer;

export function OfferEndOverlay({
  open,
  onKeepWatching,
}: {
  open: boolean;
  onKeepWatching: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      titleRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onKeepWatching();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
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
  }, [open, onKeepWatching]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`${itsYunmeiFont.variable} ${itsYunmeiFont.className} iy-modal-root iy-end-overlay`}
      role="presentation"
    >
      <div className="iy-modal-backdrop" aria-hidden />
      <div
        ref={panelRef}
        className="iy-modal-panel iy-end-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <h2 ref={titleRef} id={titleId} tabIndex={-1} className="iy-end-title">
          {copy.heading}
        </h2>
        <p id={descId} className="iy-end-body">
          {copy.body}
        </p>
        <OfferCTA className="iy-end-cta" source="end" />
        <button
          type="button"
          className="iy-text-btn iy-end-dismiss"
          onClick={onKeepWatching}
        >
          {copy.keepWatching}
        </button>
      </div>
    </div>,
    document.body,
  );
}
