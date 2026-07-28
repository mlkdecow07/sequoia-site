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
    <Accordion
      variant="belief"
      wrapTitles
      singleColumn
      items={items.map((item) => ({
        id: item.question,
        title: item.question,
        content: item.answer,
      }))}
    />
  );
}
