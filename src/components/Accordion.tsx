"use client";

import { useState, type ReactNode } from "react";

export type AccordionEntry = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionEntry[];
  titleClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  separated?: boolean;
  variant?: "default" | "belief";
  wrapTitles?: boolean;
  singleColumn?: boolean;
  singleOpen?: boolean;
  compact?: boolean;
};

function AccordionIcon({ isOpen, compact = false }: { isOpen: boolean; compact?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-teal text-teal ${
        compact ? "h-5 w-5" : "mt-0.5 h-7 w-7 sm:h-8 sm:w-8"
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        className={`origin-center transition-transform duration-300 ease-in-out ${
          compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5 sm:h-4 sm:w-4"
        } ${isOpen ? "rotate-45" : "rotate-0"}`}
      >
        <path d="M3 8h10" strokeLinecap="round" />
        <path d="M8 3v10" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Accordion({
  items,
  titleClassName = "font-heading text-base tracking-wide sm:text-lg",
  contentClassName = "type-body",
  itemClassName,
  separated = false,
  variant = "default",
  wrapTitles = false,
  singleColumn = false,
  singleOpen = false,
  compact = false,
}: AccordionProps) {
  const isBelief = variant === "belief";
  const beliefTitleClassName = `min-w-0 flex-1 font-heading text-[11px] font-semibold uppercase tracking-wide text-teal sm:text-xs md:text-[10px] md:tracking-normal lg:text-[11px] xl:text-xs${
    wrapTitles ? "" : " whitespace-nowrap"
  }`;
  const resolvedTitleClassName = isBelief ? beliefTitleClassName : titleClassName;
  const resolvedContentClassName = isBelief
    ? "type-body-sm pl-2.5 md:pl-3"
    : contentClassName;

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((current) => {
      const nextOpen = !current[id];
      if (singleOpen) {
        return nextOpen ? { [id]: true } : {};
      }
      return {
        ...current,
        [id]: nextOpen,
      };
    });
  };

  return (
    <div
      className={
        isBelief
          ? `grid grid-cols-1 items-start gap-3${singleColumn ? "" : " md:grid-cols-2"}`
          : separated
            ? "space-y-3"
            : undefined
      }
    >
      {items.map((item) => {
        const isOpen = !!openItems[item.id];

        return (
          <div
            key={item.id}
            className={
              isBelief
                ? "group relative mx-auto w-full rounded-lg border border-teal/15 border-l-[3px] border-l-teal/20 bg-white px-3 py-2.5 shadow-sm transition duration-200 hover:border-teal/35 hover:border-l-teal md:px-4 md:py-3"
                : separated
                  ? `rounded-lg border border-teal/15 p-5 shadow-sm transition-colors ${
                      itemClassName ?? "bg-white"
                    }${isOpen ? " relative z-[1]" : ""}`
                  : `mb-2.5 transition-colors last:mb-0 ${
                      compact ? "px-4 py-2.5" : "p-5"
                    } ${
                      itemClassName
                        ? `${itemClassName}${isOpen ? " relative z-[1]" : ""}`
                        : isOpen
                          ? "relative z-[1] bg-white/95"
                          : "bg-cream/95"
                    }`
            }
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id)}
              className={`flex w-full items-center justify-between gap-2 text-left${
                isBelief ? " pl-2.5 md:pl-3" : ""
              }`}
            >
              <h5
                className={`text-left transition-colors duration-300 ${resolvedTitleClassName}${
                  isBelief || separated ? "" : isOpen ? " text-gray-900" : " text-gray-600"
                }`}
              >
                {item.title}
              </h5>
              <AccordionIcon isOpen={isOpen} compact={isBelief || compact} />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`${resolvedContentClassName}${
                    isOpen ? (compact ? " pt-2" : " pt-3") : ""
                  }`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
