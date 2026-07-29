"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import HeroSection from "@/components/HeroSection";
import VideoModal from "@/components/VideoModal";

const heroImages = [
  { src: "/images/hero/hero-1.png", alt: "Students building with blocks in the classroom" },
  { src: "/images/hero/hero-3.png", alt: "Student raising her hand in class" },
  { src: "/images/hero/hero-2.png", alt: "Students learning together at school" },
];

export default function HeroGallery() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);

  const dismissBanner = () => {
    setBannerOpen(false);
  };

  return (
    <>
      <HeroSection images={heroImages}>
        <p className="text-center font-heading text-xl leading-tight tracking-wide text-white sm:text-3xl md:text-5xl lg:text-6xl">
          WHERE GIANT DREAMERS
          <br />
          ARE NURTURED
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded border-2 border-white/80 bg-black/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-white hover:bg-black/35 sm:w-64 sm:px-10 sm:py-4 sm:text-base"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            WATCH VIDEO
          </button>
          <Link
            href={siteConfig.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded border-2 border-transparent bg-teal px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:w-64 sm:px-10 sm:py-4 sm:text-base"
          >
            JOIN SCS
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
        <div className="mx-auto max-w-xl px-1 text-center italic text-white/95 sm:max-w-2xl">
          <p className="text-sm leading-snug md:text-base lg:text-lg">
            He shall be like a tree planted by the rivers of water, that brings forth its fruit in
            its season, whose leaf also shall not wither; and whatever he does shall prosper.
          </p>
          <p className="mt-1.5 text-xs tracking-widest text-white/90 not-italic md:text-sm">
            PSALM 1:3
          </p>
        </div>

        {bannerOpen ? (
          <div className="enrollment-banner-enter relative mx-auto mt-8 w-full max-w-3xl px-2 sm:mt-10 sm:max-w-4xl sm:px-0 md:mt-12 lg:max-w-5xl">
            <Link
              href="/enrollment"
              className="group flex w-full items-center justify-center gap-4 rounded border border-teal/50 bg-teal/40 px-9 py-6 pr-14 text-white backdrop-blur-md transition hover:border-teal/70 hover:bg-teal/55 sm:gap-6 sm:px-12 sm:py-8 sm:pr-16"
            >
              <span className="font-heading text-xl font-semibold uppercase leading-relaxed tracking-[0.2em] sm:text-2xl">
                Enrollment is open for 2026–2027
              </span>
              <span className="h-8 w-px bg-white/40 sm:h-10" aria-hidden="true" />
              <span className="inline-flex items-center font-heading text-base uppercase leading-relaxed tracking-[0.16em] text-white/90 transition group-hover:text-white sm:text-xl">
                View process
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="ml-1.5 h-[1.1em] w-[1.1em] shrink-0 transition group-hover:translate-x-0.5"
                >
                  <path
                    d="M7 4.5 13 10l-6 5.5"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <button
              type="button"
              onClick={dismissBanner}
              aria-label="Dismiss enrollment banner"
              className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-white/80 transition hover:bg-teal/30 hover:text-white sm:right-3"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                ×
              </span>
            </button>
          </div>
        ) : null}
      </HeroSection>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={siteConfig.youtubeVideoId}
        title="What is Sequoia Christian School?"
      />
    </>
  );
}
