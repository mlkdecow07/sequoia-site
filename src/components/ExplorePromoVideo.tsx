"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";
import { siteConfig } from "@/lib/site-config";

const promoImage = {
  src: "/images/history-building.png",
  alt: "Sequoia Christian School campus",
};

export default function ExplorePromoVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mx-auto mt-8 block w-full max-w-xl overflow-hidden rounded-xl shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        aria-label="Watch video: What is Sequoia Christian School?"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={promoImage.src}
            alt={promoImage.alt}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 576px"
            priority
          />
          <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-black/30 text-white backdrop-blur-sm transition group-hover:border-white group-hover:bg-black/45 sm:h-14 sm:w-14">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>
      </button>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        videoId={siteConfig.youtubeVideoId}
        title="What is Sequoia Christian School?"
      />
    </>
  );
}
