"use client";

import { useId, useState } from "react";
import Link from "next/link";

const options = [
  {
    id: "campus-visit",
    label: "Campus Visit",
    description:
      "Reach out and we'll arrange a time for your family to visit. When possible, we recommend coming during the school day so you can see learning in action and get a clearer sense of classroom life at Sequoia.",
    href: "#schedule-a-visit",
    linkLabel: "Schedule a visit",
  },
  {
    id: "open-house",
    label: "Open House",
    description:
      "Join us for Open House — a welcoming way to meet our team, see classrooms, and learn more about life at Sequoia. Check the school calendar for the next date.",
    href: "/calendar",
    linkLabel: "View school calendar",
  },
] as const;

export default function VisitOptionsTabs() {
  const baseId = useId();
  const [activeId, setActiveId] = useState<(typeof options)[number]["id"]>(options[0].id);
  const activeIndex = Math.max(
    0,
    options.findIndex((item) => item.id === activeId),
  );
  const activeItem = options[activeIndex] ?? options[0];

  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div
        role="tablist"
        aria-label="Visit options"
        className="flex divide-x divide-teal/15 border-b border-teal/15 bg-teal/10"
      >
        {options.map((item) => {
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
              className={`min-w-0 flex-1 px-2 py-3.5 font-heading text-sm font-semibold tracking-wide transition sm:px-3 sm:py-4 sm:text-base ${
                isActive
                  ? "bg-white text-teal shadow-[inset_0_-2px_0_0_#408482]"
                  : "text-teal/55 hover:bg-teal/5 hover:text-teal"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {options.map((item) => {
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
              className={`col-start-1 row-start-1 space-y-4 px-5 py-5 sm:px-6 sm:py-6 ${
                isActive ? "visible" : "invisible"
              }`}
            >
              <p className="type-body">{item.description}</p>
              {item.href.startsWith("#") ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
                >
                  {item.linkLabel} <span aria-hidden>→</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
                >
                  {item.linkLabel} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
