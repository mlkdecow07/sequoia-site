"use client";

import { useEffect, useState } from "react";
import type { SiteAlert } from "@/lib/supabase/types";

function dismissKey(alert: SiteAlert) {
  return `scs-site-alert-dismissed:${alert.id}:${alert.updated_at}`;
}

export default function SiteAlertBanner({ alert }: { alert: SiteAlert }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(dismissKey(alert)) === "1") {
        setOpen(false);
        return;
      }
    } catch {
      // Show if storage unavailable.
    }
    setOpen(true);
  }, [alert]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(dismissKey(alert), "1");
    } catch {
      // Ignore.
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="enrollment-banner-enter relative mx-auto mt-6 w-full max-w-3xl px-2 sm:mt-8 sm:max-w-4xl sm:px-0 lg:max-w-5xl">
      <div
        role="status"
        className="relative rounded border border-amber-200/70 bg-amber-950/55 px-8 py-5 pr-14 text-center text-white backdrop-blur-md sm:px-10 sm:py-6 sm:pr-16"
      >
        <p className="font-heading text-lg font-semibold uppercase tracking-[0.18em] sm:text-xl">
          {alert.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/95 sm:text-base">
          {alert.message}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss alert"
          className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white sm:right-3"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>
      </div>
    </div>
  );
}
