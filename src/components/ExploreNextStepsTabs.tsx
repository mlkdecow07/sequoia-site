"use client";

import { useId, useState } from "react";
import Link from "next/link";

const nextSteps = [
  { label: "Tuition & Fees", href: "/tuition", description: "Variable tuition and financial aid" },
  {
    label: "Enrollment Process",
    href: "/enrollment",
    description: "Four steps from apply to enroll",
  },
  {
    label: "Welcome Letter",
    href: "/welcome",
    description: "A letter from our founding pastor",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    description: "Hear from Sequoia families",
  },
] as const;

export default function ExploreNextStepsTabs() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
        <p className="font-heading font-semibold tracking-wide text-teal">NEXT STEPS</p>
      </div>

      <div
        role="tablist"
        aria-label="Next steps"
        className="flex divide-x divide-teal/15 border-b border-teal/15 bg-teal/10"
      >
        {nextSteps.map((step, index) => {
          const isActive = index === activeIndex;
          const number = String(index + 1);
          const tabId = `${baseId}-tab-${number}`;
          const panelId = `${baseId}-panel-${number}`;

          return (
            <button
              key={step.href}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              aria-label={`Step ${number}: ${step.label}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`flex min-w-0 flex-1 items-center justify-center py-3.5 font-heading text-lg font-semibold tracking-wide transition sm:py-4 sm:text-xl ${
                isActive
                  ? "bg-white text-teal shadow-[inset_0_-2px_0_0_#408482]"
                  : "text-teal/55 hover:bg-teal/5 hover:text-teal"
              }`}
            >
              {number}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {nextSteps.map((step, index) => {
          const isActive = index === activeIndex;
          const number = String(index + 1);
          const tabId = `${baseId}-tab-${number}`;
          const panelId = `${baseId}-panel-${number}`;

          return (
            <div
              key={step.href}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 px-5 py-5 sm:px-6 sm:py-6 ${
                isActive ? "visible" : "invisible"
              }`}
            >
              <Link
                href={step.href}
                className="group flex items-center justify-between gap-4 transition"
              >
                <span>
                  <span className="block font-heading text-sm font-semibold tracking-wide text-teal group-hover:text-teal-dark sm:text-base">
                    {step.label}
                  </span>
                  <span className="type-body-sm mt-1 block text-gray-600">{step.description}</span>
                </span>
                <span className="shrink-0 text-teal group-hover:text-teal-dark" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
