"use client";

import { useEffect, useState } from "react";
import type { SiteAlert } from "@/lib/supabase/types";

function dismissKey(alert: SiteAlert) {
  return `scs-site-alert-dismissed:${alert.id}:${alert.updated_at}`;
}

function formatAlertDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

type SiteAlertBannerProps = {
  alert: SiteAlert;
  onOpenChange?: (open: boolean) => void;
  /** hero = replace homepage hero content; overlay = fixed panel on other pages */
  variant?: "hero" | "overlay";
};

export default function SiteAlertBanner({
  alert,
  onOpenChange,
  variant = "hero",
}: SiteAlertBannerProps) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let nextOpen = true;
    try {
      if (sessionStorage.getItem(dismissKey(alert)) === "1") {
        nextOpen = false;
      }
    } catch {
      // Show if storage unavailable.
    }
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }, [alert, onOpenChange]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(dismissKey(alert), "1");
    } catch {
      // Ignore.
    }
    setOpen(false);
    onOpenChange?.(false);
  };

  if (!open) return null;

  const panel = (
    <div
      role="status"
      className="relative flex min-h-[min(70vh,36rem)] w-full max-w-5xl flex-col items-center justify-center rounded border border-red-300/90 bg-red-600/85 px-6 py-10 text-center text-white backdrop-blur-md sm:min-h-[min(72vh,40rem)] sm:px-12 sm:py-14 md:px-16"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-50 sm:text-sm">
        {formatAlertDate(alert.created_at)}
      </p>
      <p className="mt-4 font-heading text-3xl font-semibold uppercase leading-tight tracking-[0.12em] sm:text-4xl md:text-5xl lg:text-6xl">
        {alert.title}
      </p>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/95 sm:mt-6 sm:text-xl md:text-2xl">
        {alert.message}
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss alert"
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white sm:right-4 sm:top-4 sm:h-11 sm:w-11"
      >
        <span aria-hidden="true" className="text-3xl leading-none">
          ×
        </span>
      </button>
    </div>
  );

  if (variant === "overlay") {
    return (
      <div className="enrollment-banner-enter fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        {panel}
      </div>
    );
  }

  return (
    <div className="enrollment-banner-enter relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-3 sm:px-6">
      {panel}
    </div>
  );
}
