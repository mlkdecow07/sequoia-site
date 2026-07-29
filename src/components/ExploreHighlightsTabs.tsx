"use client";

import { useId, useState } from "react";
import Link from "next/link";

const highlights = [
  {
    id: "who-we-are",
    title: "WHO WE ARE",
    text: "Sequoia Christian School is a place where giant dreamers are nurtured. We partner with families to cultivate each child's God-breathed potential through biblical principles, excellent academics, and a safe environment for growth.",
  },
  {
    id: "why-christian-education",
    title: "WHY CHRISTIAN EDUCATION",
    text: "We focus on life-long learning, godly character, and an environment where students can explore life, identity, and their creative potential. Scripture and biblical principles are foundational in everything we do.",
  },
  {
    id: "what-makes-us-unique",
    title: "WHAT MAKES US UNIQUE",
    text: "Like the sequoia seed given life by fire, we believe every student carries holy capacity. We teach with a sense of wonder and use the Principle Approach so God's Word shapes every subject.",
  },
  {
    id: "educational-approach",
    title: "OUR EDUCATIONAL APPROACH",
    text: "The Principle Approach is America's historic Christian method of biblical reasoning — making the truths of God's Word the basis of every subject in the curriculum.",
    href: "/educationalapproach",
    linkLabel: "Learn about our approach",
  },
] as const;

export default function ExploreHighlightsTabs() {
  const baseId = useId();
  const [activeId, setActiveId] = useState<(typeof highlights)[number]["id"]>(
    highlights[0].id,
  );
  const activeIndex = Math.max(
    0,
    highlights.findIndex((item) => item.id === activeId),
  );
  const activeItem = highlights[activeIndex] ?? highlights[0];

  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
        <p className="font-heading font-semibold tracking-wide text-teal">ABOUT</p>
      </div>

      <div
        role="tablist"
        aria-label="About"
        className="flex divide-x divide-teal/15 border-b border-teal/15 bg-teal/10"
      >
        {highlights.map((item) => {
          const isActive = item.id === activeItem.id;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={`min-w-0 flex-1 px-1.5 py-3.5 font-heading text-[8px] font-semibold uppercase leading-snug tracking-wide transition sm:px-2.5 sm:py-4 sm:text-[10px] ${
                isActive
                  ? "bg-white text-teal shadow-[inset_0_-2px_0_0_#408482]"
                  : "text-teal/60 hover:bg-teal/5 hover:text-teal"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {highlights.map((item) => {
          const isActive = item.id === activeItem.id;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <div
              key={item.id}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 px-5 py-5 sm:px-6 sm:py-6 ${
                isActive ? "visible" : "invisible"
              }`}
            >
              <p className="type-body">{item.text}</p>
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
                >
                  {item.linkLabel}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
