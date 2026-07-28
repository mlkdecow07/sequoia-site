"use client";

import { useState } from "react";
import Image from "next/image";
import ProvideIcon from "@/components/ProvideIcon";

type HighlightItem = {
  title: string;
  text: string;
};

type ProvideItem = {
  title: string;
  icon: "biblical" | "curriculum" | "teachers" | "environment" | "dreamers";
};

type HighlightSlideBase = {
  id: string;
  title: string;
  image: { src: string; alt: string };
};

export type HighlightSlide =
  | (HighlightSlideBase & {
      variant: "list";
      items: HighlightItem[];
    })
  | (HighlightSlideBase & {
      variant: "provides";
      intro: string;
      provides: ProvideItem[];
    });

function ListContent({ items }: { items: HighlightItem[] }) {
  return (
    <div>
      {items.map((item, itemIndex) => (
        <div key={item.title} className={itemIndex > 0 ? "border-t border-teal/10" : undefined}>
          <div className="border-b border-teal/10 bg-teal/5 px-5 py-3.5 sm:px-6">
            <p className="font-heading text-sm font-semibold tracking-wide text-teal">{item.title}</p>
          </div>
          <div className="px-5 py-3.5 sm:px-6">
            <p className="type-body-sm">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProvidesContent({
  intro,
  provides,
}: {
  intro: string;
  provides: ProvideItem[];
}) {
  return (
    <div>
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-3.5 sm:px-6">
        <p className="font-heading text-sm font-semibold tracking-wide text-teal">
          OUR PURPOSE AND ENVIRONMENT
        </p>
      </div>
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <p className="type-body-sm mx-auto max-w-md">{intro}</p>
        <p className="mt-10 text-center font-heading text-sm font-semibold tracking-wide text-teal sm:mt-12">
          AROUND HERE WE PROVIDE…
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-5 sm:mt-10">
          {provides.map((item) => (
            <div key={item.title} className="w-36 text-center sm:w-40">
              <ProvideIcon
                type={item.icon}
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center text-teal"
                iconClassName="h-8 w-8"
              />
              <h4 className="text-[11px] font-heading leading-snug tracking-wide text-teal sm:text-xs">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabContent({ slide }: { slide: HighlightSlide }) {
  if (slide.variant === "provides") {
    return <ProvidesContent intro={slide.intro} provides={slide.provides} />;
  }

  return <ListContent items={slide.items} />;
}

type HomeHighlightSliderProps = {
  slides: HighlightSlide[];
};

export default function HomeHighlightSlider({ slides }: HomeHighlightSliderProps) {
  const [activeId, setActiveId] = useState(slides[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    slides.findIndex((slide) => slide.id === activeId),
  );
  const activeSlide = slides[activeIndex] ?? slides[0];

  if (!activeSlide) {
    return null;
  }

  const prevSlide = slides[(activeIndex - 1 + slides.length) % slides.length];
  const nextSlide = slides[(activeIndex + 1) % slides.length];

  function goToIndex(index: number) {
    const slide = slides[index];
    if (slide) {
      setActiveId(slide.id);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pb-20 sm:pt-8">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-teal/20 bg-white shadow-md">
        <div
          role="tablist"
          aria-label="About Sequoia Christian School"
          className="flex divide-x divide-teal/15 border-b border-teal/20 bg-teal/10"
        >
          {slides.map((slide) => {
            const isActive = slide.id === activeSlide.id;

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                id={`tab-${slide.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${slide.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(slide.id)}
                className={`min-w-0 flex-1 px-2 py-3.5 font-heading text-[9px] font-semibold uppercase leading-snug tracking-wide transition sm:px-3 sm:py-4 sm:text-[11px] ${
                  isActive
                    ? "bg-white text-teal shadow-[inset_0_-2px_0_0_#408482]"
                    : "text-teal/60 hover:bg-teal/5 hover:text-teal"
                }`}
              >
                {slide.title}
              </button>
            );
          })}
        </div>

        <div className="grid">
          {slides.map((slide) => {
            const isActive = slide.id === activeSlide.id;

            return (
              <div
                key={slide.id}
                role="tabpanel"
                id={`panel-${slide.id}`}
                aria-labelledby={`tab-${slide.id}`}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 ${isActive ? "visible" : "invisible"}`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-teal/10 sm:aspect-[2/1]">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                <TabContent slide={slide} />
              </div>
            );
          })}
        </div>

        {slides.length > 1 ? (
          <div className="flex items-stretch border-t border-teal/15 bg-teal/5">
            <button
              type="button"
              onClick={() => goToIndex((activeIndex - 1 + slides.length) % slides.length)}
              className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3.5 text-left transition hover:bg-teal/10 sm:px-4"
              aria-label={`Previous: ${prevSlide.title}`}
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
                  {prevSlide.title}
                </span>
              </span>
            </button>

            <div className="flex items-center justify-center gap-1.5 border-x border-teal/15 px-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to ${slide.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-5 bg-teal" : "w-2 bg-teal/25 hover:bg-teal/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goToIndex((activeIndex + 1) % slides.length)}
              className="flex min-w-0 flex-1 items-center justify-end gap-2 px-3 py-3.5 text-right transition hover:bg-teal/10 sm:px-4"
              aria-label={`Next: ${nextSlide.title}`}
            >
              <span className="min-w-0">
                <span className="block text-[9px] font-semibold uppercase tracking-widest text-teal/50">
                  Next
                </span>
                <span className="mt-0.5 block truncate font-heading text-[10px] font-semibold uppercase tracking-wide text-teal sm:text-[11px]">
                  {nextSlide.title}
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
    </section>
  );
}
