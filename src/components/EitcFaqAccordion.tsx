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
};

export default function EitcFaqAccordion({
  items,
  title = "FAQ'S",
}: EitcFaqAccordionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
        <p className="font-heading font-semibold tracking-wide text-teal">{title}</p>
      </div>
      <Accordion
        singleOpen
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
