"use client";

import { useId, useState } from "react";
import CoreValueIconSvg from "@/components/CoreValueIcon";
import { coreValues } from "@/lib/core-values-config";

export default function CoreValuesTabs() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeValue = coreValues[activeIndex] ?? coreValues[0];

  if (!activeValue) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
        <p className="font-heading font-semibold tracking-wide text-teal">OUR CORE VALUES</p>
      </div>

      <div
        role="tablist"
        aria-label="Core values"
        className="grid grid-cols-6 divide-x divide-teal/15 border-b border-teal/15 bg-teal/10"
      >
        {coreValues.map((value, index) => {
          const isActive = index === activeIndex;
          const tabId = `${baseId}-tab-${value.icon}`;
          const panelId = `${baseId}-panel-${value.icon}`;

          return (
            <button
              key={value.title}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              aria-label={value.title}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`flex aspect-square items-center justify-center p-2 transition sm:p-2.5 ${
                isActive
                  ? "bg-white shadow-[inset_0_-2px_0_0_#408482]"
                  : "opacity-55 hover:bg-teal/5 hover:opacity-90"
              }`}
            >
              <CoreValueIconSvg
                type={value.icon}
                className="h-9 w-9 sm:h-11 sm:w-11"
              />
            </button>
          );
        })}
      </div>

      <div className="grid">
        {coreValues.map((value, index) => {
          const isActive = index === activeIndex;
          const tabId = `${baseId}-tab-${value.icon}`;
          const panelId = `${baseId}-panel-${value.icon}`;

          return (
            <div
              key={value.title}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 px-5 py-5 sm:px-6 sm:py-6 ${
                isActive ? "visible" : "invisible"
              }`}
            >
              <p className="font-heading text-sm font-semibold tracking-wide text-teal sm:text-base">
                {value.title}
              </p>
              <p className="type-body-sm mt-2">{value.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
