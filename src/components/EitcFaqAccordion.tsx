"use client";

import Accordion from "@/components/Accordion";
import type { ReactNode } from "react";

type FaqItem = {
  question: string;
  answer: ReactNode;
};

type EitcFaqAccordionProps = {
  items: FaqItem[];
};

export default function EitcFaqAccordion({ items }: EitcFaqAccordionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <Accordion
        titleClassName="font-heading text-left text-sm font-semibold uppercase tracking-wide text-teal sm:text-base"
        contentClassName="type-body"
        itemClassName="!mb-0 border-b border-teal/10 bg-white last:border-b-0"
        items={items.map((item) => ({
          id: item.question,
          title: item.question,
          content: item.answer,
        }))}
      />
    </div>
  );
}
