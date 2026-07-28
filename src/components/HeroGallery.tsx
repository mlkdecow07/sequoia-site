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

  return (
    <>
      <HeroSection images={heroImages}>
        <p className="text-center font-heading text-xl leading-tight tracking-wide text-white sm:text-3xl md:text-5xl lg:text-6xl">
          WHERE GIANT DREAMERS
          <br />
          ARE NURTURED
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="inline-flex w-48 items-center justify-center gap-2 border-2 border-white/80 bg-black/20 px-6 py-2.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-white hover:bg-black/35 sm:px-8 sm:py-3 sm:text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
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
            className="inline-flex w-48 items-center justify-center gap-2 border-2 border-transparent bg-teal px-6 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:px-8 sm:py-3 sm:text-sm"
          >
            JOIN SCS
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
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
