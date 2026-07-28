"use client";

import Accordion from "@/components/Accordion";

type Section = {
  title: string;
  text: string;
};

type PrincipleApproachAccordionProps = {
  sections: Section[];
};

export default function PrincipleApproachAccordion({
  sections,
}: PrincipleApproachAccordionProps) {
  return (
    <Accordion
      variant="belief"
      wrapTitles
      items={sections.map((section) => ({
        id: section.title,
        title: section.title,
        content: section.text,
      }))}
    />
  );
}
