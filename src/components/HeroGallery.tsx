"use client";

import { useState } from "react";
import Link from "next/link";
import { getEnrollmentBannerState, siteConfig } from "@/lib/site-config";
import HeroSection from "@/components/HeroSection";
import SiteAlertBanner from "@/components/SiteAlertBanner";
import VideoModal from "@/components/VideoModal";
import type { SiteAlert } from "@/lib/supabase/types";

const heroImages = [
  { src: "/images/hero/hero-1.png", alt: "Students building with blocks in the classroom" },
  { src: "/images/hero/hero-3.png", alt: "Student raising her hand in class" },
  { src: "/images/hero/hero-2.png", alt: "Students learning together at school" },
];

export default function HeroGallery({ siteAlert }: { siteAlert?: SiteAlert | null }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const enrollmentBannerState = getEnrollmentBannerState();

  const dismissBanner = () => {
    setBannerOpen(false);
  };

  const showEnrollmentBanner =
    bannerOpen && enrollmentBannerState.visible && enrollmentBannerState.schoolYearLabel;

  return (
    <>
      <HeroSection images={heroImages}>
        <p className="hero-headline max-w-full px-2 text-center font-heading leading-tight text-white sm:px-0">
          WHERE GIANT DREAMERS
          <br />
          ARE NURTURED
        </p>
        <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 px-1 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:px-0">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded border-2 border-white/80 bg-black/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-white hover:bg-black/35 sm:w-64 sm:px-10 sm:py-4 sm:text-base"
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
            className="inline-flex w-full items-center justify-center gap-2.5 rounded border-2 border-transparent bg-teal px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:w-64 sm:px-10 sm:py-4 sm:text-base"
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
        <div className="mx-auto w-full max-w-xl px-3 text-center italic text-white/95 sm:max-w-2xl sm:px-1">
          <p className="text-xs leading-snug sm:text-sm md:text-base lg:text-lg">
            He shall be like a tree planted by the rivers of water, that brings forth its fruit in
            its season, whose leaf also shall not wither; and whatever he does shall prosper.
          </p>
          <p className="mt-1.5 text-[0.65rem] tracking-widest text-white/90 not-italic sm:text-xs md:text-sm">
            PSALM 1:3
          </p>
        </div>
      </HeroSection>

      {/* Fixed viewport bottom — above page content (z-10), below alerts (z-80) / modals (z-200) */}
      {showEnrollmentBanner ? (
        <div className="enrollment-banner-enter fixed inset-x-0 bottom-0 z-40 w-full">
          <Link
            href="/enrollment"
            className="group flex w-full flex-col items-center justify-center gap-1 border-t border-teal/50 bg-teal/40 px-4 py-3.5 pr-9 text-center text-white backdrop-blur-md transition hover:border-teal/70 hover:bg-teal/55 sm:flex-row sm:gap-3 sm:px-6 sm:py-4 sm:pr-12 sm:text-left md:gap-4 md:px-8 md:py-5 md:pr-14"
          >
            <span className="max-w-[15rem] text-balance font-heading text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.08em] sm:max-w-none sm:text-xs sm:tracking-[0.1em] md:text-sm md:tracking-[0.12em] lg:text-base lg:tracking-[0.14em]">
              Enrollment is open for {enrollmentBannerState.schoolYearLabel}
            </span>
            <span className="hidden h-5 w-px bg-white/40 sm:block sm:h-6" aria-hidden="true" />
            <span className="inline-flex items-center font-heading text-[0.6rem] uppercase leading-snug tracking-[0.08em] text-white/90 transition group-hover:text-white sm:text-[0.7rem] sm:tracking-[0.1em] md:text-xs md:tracking-[0.1em] lg:text-sm lg:tracking-[0.12em]">
              View process
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="ml-1 h-[1em] w-[1em] shrink-0 transition group-hover:translate-x-0.5"
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
            className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-white/80 transition hover:bg-teal/30 hover:text-white sm:right-2 sm:h-9 sm:w-9 md:right-3"
          >
            <span aria-hidden="true" className="text-lg leading-none sm:text-xl">
              ×
            </span>
          </button>
        </div>
      ) : null}

      {siteAlert ? <SiteAlertBanner alert={siteAlert} /> : null}

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={siteConfig.youtubeVideoId}
        title="What is Sequoia Christian School?"
      />
    </>
  );
}
