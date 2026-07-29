"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function ExploreNextStepsTabs() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    { id: "tuition", label: "Tuition & Access" },
    { id: "enrollment", label: "Enrollment Process" },
    { id: "apply", label: "Ready to become a giant dreamer?" },
  ] as const;

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
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const number = String(index + 1);
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              aria-label={`Step ${number}: ${tab.label}`}
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
        <div
          role="tabpanel"
          id={`${baseId}-panel-tuition`}
          aria-labelledby={`${baseId}-tab-tuition`}
          aria-hidden={activeIndex !== 0}
          className={`col-start-1 row-start-1 space-y-4 px-5 py-5 sm:px-6 sm:py-6 ${
            activeIndex === 0 ? "visible" : "invisible"
          }`}
        >
          <p className="font-heading text-sm font-semibold tracking-wide text-teal sm:text-base">
            Tuition &amp; Access
          </p>
          <p className="type-body-sm">
            No student at Sequoia pays 100% of the cost of education. Every student begins with a 20%
            discount, and variable tuition is set with your family&apos;s unique financial position in
            mind — typically ranging from 40–80% of the full cost.
          </p>
          <p className="type-body-sm">
            Financial aid scholarships are also available for eligible families. Learn more on our
            tuition page, including EITC opportunities for businesses and individuals who want to
            support Christian education.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tuition"
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
            >
              Tuition &amp; Fees <span aria-hidden>→</span>
            </Link>
            <Link
              href="/eitc"
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
            >
              Learn about EITC <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-enrollment`}
          aria-labelledby={`${baseId}-tab-enrollment`}
          aria-hidden={activeIndex !== 1}
          className={`col-start-1 row-start-1 space-y-4 px-5 py-5 sm:px-6 sm:py-6 ${
            activeIndex === 1 ? "visible" : "invisible"
          }`}
        >
          <p className="font-heading text-sm font-semibold tracking-wide text-teal sm:text-base">
            Enrollment Process
          </p>
          <ol className="space-y-2">
            <li className="font-heading text-sm font-semibold tracking-wide text-black sm:text-base">
              Step 1: Apply Online
            </li>
            <li className="font-heading text-sm font-semibold tracking-wide text-black sm:text-base">
              Step 2: Family Interview
            </li>
            <li className="font-heading text-sm font-semibold tracking-wide text-black sm:text-base">
              Step 3: Acceptance
            </li>
            <li className="font-heading text-sm font-semibold tracking-wide text-black sm:text-base">
              Step 4: Enrollment
            </li>
          </ol>
          <Link
            href="/enrollment"
            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
          >
            View full enrollment details <span aria-hidden>→</span>
          </Link>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-apply`}
          aria-labelledby={`${baseId}-tab-apply`}
          aria-hidden={activeIndex !== 2}
          className={`col-start-1 row-start-1 space-y-4 px-5 py-5 text-center sm:px-6 sm:py-6 ${
            activeIndex === 2 ? "visible" : "invisible"
          }`}
        >
          <p className="font-heading text-sm font-semibold tracking-wide text-teal sm:text-base">
            Application
          </p>
          <p className="font-heading text-base font-semibold uppercase leading-relaxed tracking-wide text-teal sm:text-lg">
            Ready to become a giant dreamer?
          </p>
          <Link
            href={siteConfig.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-teal px-6 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:px-8 sm:py-3 sm:text-sm"
          >
            START YOUR APPLICATION
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
          <p className="type-caption mx-auto max-w-sm italic">
            A non-refundable application fee of $50 is required with each application.
          </p>
          <p className="type-body-sm mx-auto max-w-sm text-gray-600">
            Please Note: New students will be charged a $100 enrollment fee per student.
          </p>
        </div>
      </div>
    </div>
  );
}
