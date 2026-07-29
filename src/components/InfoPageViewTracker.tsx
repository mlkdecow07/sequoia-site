"use client";

import { useEffect } from "react";

const SESSION_KEY = "scs-info-view-tracked";

export default function InfoPageViewTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Ignore storage failures; still attempt to record a view.
    }

    void fetch("/api/info-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/info",
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {
      // Tracking should never break the page.
    });
  }, []);

  return null;
}
