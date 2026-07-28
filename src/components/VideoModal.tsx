"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
};

export default function VideoModal({ open, onClose, videoId, title }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close video"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl shadow-2xl">
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/50 bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>
      </div>
    </div>,
    document.body,
  );
}
