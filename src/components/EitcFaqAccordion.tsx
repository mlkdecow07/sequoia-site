"use client";

import Accordion from "@/components/Accordion";
import type { ReactNode } from "react";

type FaqItem = {
  question: string;
  answer: ReactNode;
};

type EitcFaqAccordionProps = {
  items: FaqItem[];
  title?: string;
  compact?: boolean;
};

export default function EitcFaqAccordion({
  items,
  title = "FAQ'S",
  compact = false,
}: EitcFaqAccordionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div
        className={`border-b border-teal/10 bg-teal/5 ${compact ? "px-4 py-2.5" : "px-5 py-4"}`}
      >
        <p
          className={`font-heading font-semibold tracking-wide text-teal ${
            compact ? "text-sm" : ""
          }`}
        >
          {title}
        </p>
      </div>
      <Accordion
        singleOpen
        compact={compact}
        titleClassName={
          compact
            ? "font-heading text-left text-xs font-semibold uppercase tracking-wide text-teal sm:text-sm"
            : "font-heading text-left text-sm font-semibold uppercase tracking-wide text-teal sm:text-base"
        }
        contentClassName={compact ? "type-body-sm" : "type-body"}
        itemClassName={
          compact
            ? "!mb-0 !px-4 !py-2.5 border-b border-teal/10 bg-white last:border-b-0"
            : "!mb-0 border-b border-teal/10 bg-white last:border-b-0"
        }
        items={items.map((item) => ({
          id: item.question,
          title: item.question,
          content: item.answer,
        }))}
      />
    </div>
  );
}
