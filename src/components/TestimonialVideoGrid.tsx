"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";
import { parentTestimonials } from "@/lib/site-config";

type SlideDirection = "prev" | "next";

export default function TestimonialVideoGrid() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [activeVideo, setActiveVideo] = useState<(typeof parentTestimonials)[number] | null>(
    null,
  );

  const testimonial = parentTestimonials[index];
  const total = parentTestimonials.length;
  const prevTestimonial =
    parentTestimonials[(index - 1 + total) % total] ?? parentTestimonials[0];
  const nextTestimonial = parentTestimonials[(index + 1) % total] ?? parentTestimonials[0];

  function goToSlide(nextIndex: number, slideDirection: SlideDirection) {
    setDirection(slideDirection);
    setIndex(nextIndex);
  }

  if (!testimonial || !prevTestimonial || !nextTestimonial) {
    return null;
  }

  const sideButtonClass =
    "flex h-10 w-8 shrink-0 items-center justify-center self-center rounded border border-teal/20 bg-white text-teal shadow-sm transition hover:bg-teal/5 sm:h-12 sm:w-9";

  return (
    <>
      <div className="mx-auto mt-12 flex w-full max-w-2xl items-stretch gap-2 px-2 sm:gap-3">
        {total > 1 ? (
          <button
            type="button"
            onClick={() => goToSlide((index - 1 + total) % total, "prev")}
            className={sideButtonClass}
            aria-label={`Previous: ${prevTestimonial.title}`}
          >
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        ) : (
          <span className="w-8 shrink-0 sm:w-9" aria-hidden="true" />
        )}

        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-teal/20 bg-white shadow-md">
          <div className="overflow-hidden p-4 sm:p-5">
            <div
              key={testimonial.videoId}
              className={
                direction === "next" ? "testimonial-enter-next" : "testimonial-enter-prev"
              }
            >
              <button
                type="button"
                onClick={() => setActiveVideo(testimonial)}
                className="group relative block w-full overflow-hidden rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                aria-label={`Watch video: ${testimonial.title}`}
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.imageAlt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                  <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-black/30 text-white backdrop-blur-sm transition group-hover:border-white group-hover:bg-black/45 sm:h-11 sm:w-11">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
              </button>

              <p className="mt-4 text-center font-heading text-xs font-semibold tracking-wide text-gray-800 whitespace-nowrap sm:text-sm">
                {testimonial.title}
              </p>
            </div>
          </div>

          {total > 1 ? (
            <div className="flex items-stretch border-t border-teal/15 bg-teal/5">
              <button
                type="button"
                onClick={() => goToSlide((index - 1 + total) % total, "prev")}
                className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3.5 text-left transition hover:bg-teal/10 sm:px-4"
                aria-label={`Previous: ${prevTestimonial.title}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-teal"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-widest text-teal/50">
                    Previous
                  </span>
                  <span className="mt-0.5 block truncate font-heading text-[10px] font-semibold uppercase tracking-wide text-teal sm:text-[11px]">
                    {prevTestimonial.title}
                  </span>
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 border-x border-teal/15 px-3">
                {parentTestimonials.map((item, slideIndex) => (
                  <button
                    key={item.videoId}
                    type="button"
                    aria-label={`Go to ${item.title}`}
                    aria-current={slideIndex === index ? "true" : undefined}
                    onClick={() =>
                      goToSlide(slideIndex, slideIndex > index ? "next" : "prev")
                    }
                    className={`h-2 rounded-full transition-all ${
                      slideIndex === index ? "w-5 bg-teal" : "w-2 bg-teal/25 hover:bg-teal/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToSlide((index + 1) % total, "next")}
                className="flex min-w-0 flex-1 items-center justify-end gap-2 px-3 py-3.5 text-right transition hover:bg-teal/10 sm:px-4"
                aria-label={`Next: ${nextTestimonial.title}`}
              >
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-widest text-teal/50">
                    Next
                  </span>
                  <span className="mt-0.5 block truncate font-heading text-[10px] font-semibold uppercase tracking-wide text-teal sm:text-[11px]">
                    {nextTestimonial.title}
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-teal"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        {total > 1 ? (
          <button
            type="button"
            onClick={() => goToSlide((index + 1) % total, "next")}
            className={sideButtonClass}
            aria-label={`Next: ${nextTestimonial.title}`}
          >
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        ) : (
          <span className="w-8 shrink-0 sm:w-9" aria-hidden="true" />
        )}
      </div>

      <VideoModal
        open={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoId={activeVideo?.videoId ?? ""}
        title={activeVideo?.title ?? "Parent testimonial video"}
      />
    </>
  );
}
