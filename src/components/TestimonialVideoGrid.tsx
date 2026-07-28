"use client";

import { useState } from "react";
import Image from "next/image";
import CarouselNavButton from "@/components/CarouselNavButton";
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

  function goToSlide(nextIndex: number, slideDirection: SlideDirection) {
    setDirection(slideDirection);
    setIndex(nextIndex);
  }

  return (
    <>
      <div className="mx-auto mt-12 max-w-xl px-2">
        <div className="overflow-hidden">
          <div
            key={testimonial.videoId}
            className={direction === "next" ? "testimonial-enter-next" : "testimonial-enter-prev"}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(testimonial)}
              className="group relative block w-full overflow-hidden rounded-xl shadow-md transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
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
          <div className="mt-6 flex items-center justify-center gap-3">
            <CarouselNavButton
              direction="prev"
              label="Previous testimonial"
              disabled={index === 0}
              onClick={() => goToSlide(index - 1, "prev")}
            />
            <p className="min-w-16 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
              {index + 1} / {total}
            </p>
            <CarouselNavButton
              direction="next"
              label="Next testimonial"
              disabled={index >= total - 1}
              onClick={() => goToSlide(index + 1, "next")}
            />
          </div>
        ) : null}
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
