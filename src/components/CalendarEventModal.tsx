"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isNoSchoolEvent, type FlatCalendarEvent } from "@/lib/school-calendar-utils";

type CalendarEventModalProps = {
  event: FlatCalendarEvent | null;
  onClose: () => void;
};

export default function CalendarEventModal({ event, onClose }: CalendarEventModalProps) {
  const [mounted, setMounted] = useState(false);
  const open = event !== null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (keydownEvent: KeyboardEvent) => {
      if (keydownEvent.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-event-title"
    >
      <button
        type="button"
        aria-label="Close event details"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-teal/15 bg-white p-5 shadow-lg sm:p-6">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-teal/5 hover:text-teal"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            &times;
          </span>
        </button>
        <p className="pr-8 font-body text-sm text-gray-500">{event.dates}</p>
        <h3
          id="calendar-event-title"
          className={`mt-1 pr-8 font-heading text-lg leading-snug tracking-wide ${
            isNoSchoolEvent(event)
              ? "font-bold uppercase text-red-600"
              : "font-semibold text-gray-900"
          }`}
        >
          {event.title}
        </h3>
        {event.description ? (
          <p className="mt-3 font-body text-sm leading-relaxed text-gray-600">{event.description}</p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
