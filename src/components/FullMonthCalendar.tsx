"use client";

import { useMemo, useState } from "react";
import type { SchoolCalendarMonth } from "@/lib/site-config";
import {
  WEEKDAY_LABELS,
  buildMonthGrid,
  flattenSchoolCalendar,
  formatYearMonth,
  isNoSchoolEvent,
  monthLabel,
  parseMonthName,
  type FlatCalendarEvent,
} from "@/lib/school-calendar-utils";
import CalendarEventModal from "@/components/CalendarEventModal";

type FullMonthCalendarProps = {
  months: SchoolCalendarMonth[];
  initialYear?: number;
  initialMonth?: number;
};

export default function FullMonthCalendar({
  months,
  initialYear,
  initialMonth,
}: FullMonthCalendarProps) {
  const monthEntries = useMemo(
    () =>
      months.map((entry) => {
        const parsed = parseMonthName(entry.name);
        return { entry, year: parsed.year, month: parsed.month };
      }),
    [months],
  );

  const defaultIndex = useMemo(() => {
    if (initialYear !== undefined && initialMonth !== undefined) {
      const matchIndex = monthEntries.findIndex(
        (entry) => entry.year === initialYear && entry.month === initialMonth,
      );
      if (matchIndex >= 0) return matchIndex;
    }
    return 0;
  }, [initialMonth, initialYear, monthEntries]);

  const [monthIndex, setMonthIndex] = useState(defaultIndex);
  const [selectedEvent, setSelectedEvent] = useState<FlatCalendarEvent | null>(null);

  const events = useMemo(() => flattenSchoolCalendar(months), [months]);
  const current = monthEntries[monthIndex];
  const cells = buildMonthGrid(current.year, current.month, events);
  const yearMonth = formatYearMonth(current.year, current.month);
  const total = monthEntries.length;
  const prevMonth = monthEntries[(monthIndex - 1 + total) % total] ?? current;
  const nextMonth = monthEntries[(monthIndex + 1) % total] ?? current;
  const prevLabel = monthLabel(prevMonth.year, prevMonth.month);
  const nextLabel = monthLabel(nextMonth.year, nextMonth.month);

  function goToMonth(nextIndex: number) {
    setMonthIndex(nextIndex);
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      <section className="overflow-hidden rounded-xl border border-teal/20 bg-white shadow-md">
        <div className="border-b border-teal/10 bg-teal/5 px-4 py-3 text-center">
          <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-teal sm:text-xl">
            {monthLabel(current.year, current.month)}
          </h3>
        </div>

        <div className="grid grid-cols-7 border-b border-teal/10 bg-teal/5">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="py-1.5 text-center text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:text-[10px]"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-6">
          {cells.map((cell, index) => (
            <div
              key={`${yearMonth}-${index}`}
              className={`min-h-[4.5rem] border-b border-r border-teal/10 p-1 sm:min-h-20 sm:p-1.5 md:min-h-24 ${
                cell.events.length > 0 ? "bg-teal/5" : "bg-white"
              }`}
            >
              {cell.day ? (
                <>
                  <p className="text-right text-[10px] font-semibold text-gray-700 sm:text-xs">
                    {cell.day}
                  </p>
                  <div className="mt-0.5 space-y-0.5">
                    {cell.events.map((event) => (
                      <button
                        key={`${cell.dateKey}-${event.title}`}
                        type="button"
                        onClick={() => setSelectedEvent(event)}
                        className={`block w-full truncate rounded px-0.5 py-0.5 text-left text-[9px] leading-snug transition hover:bg-white/80 sm:text-[10px] ${
                          isNoSchoolEvent(event)
                            ? "font-bold uppercase text-red-600"
                            : "font-medium text-teal hover:text-teal-dark"
                        }`}
                        aria-label={`${event.title}. Tap for details.`}
                      >
                        {event.title}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {total > 1 ? (
          <div className="flex items-stretch border-t border-teal/15 bg-teal/5">
            <button
              type="button"
              onClick={() => goToMonth((monthIndex - 1 + total) % total)}
              className="flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5 text-left transition hover:bg-teal/10 sm:px-2.5"
              aria-label={`Previous: ${prevLabel}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 shrink-0 text-teal"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="min-w-0">
                <span className="block text-[8px] font-semibold uppercase tracking-widest text-teal/50">
                  Previous
                </span>
                <span className="mt-0.5 block truncate font-heading text-[9px] font-semibold uppercase tracking-wide text-teal">
                  {prevLabel}
                </span>
              </span>
            </button>

            <div className="flex items-center justify-center gap-1 border-x border-teal/15 px-2">
              {monthEntries.map((entry, index) => (
                <button
                  key={`${entry.year}-${entry.month}`}
                  type="button"
                  aria-label={`Go to ${monthLabel(entry.year, entry.month)}`}
                  aria-current={index === monthIndex ? "true" : undefined}
                  onClick={() => goToMonth(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === monthIndex ? "w-3.5 bg-teal" : "w-1.5 bg-teal/25 hover:bg-teal/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goToMonth((monthIndex + 1) % total)}
              className="flex min-w-0 flex-1 items-center justify-end gap-1.5 px-2 py-1.5 text-right transition hover:bg-teal/10 sm:px-2.5"
              aria-label={`Next: ${nextLabel}`}
            >
              <span className="min-w-0">
                <span className="block text-[8px] font-semibold uppercase tracking-widest text-teal/50">
                  Next
                </span>
                <span className="mt-0.5 block truncate font-heading text-[9px] font-semibold uppercase tracking-wide text-teal">
                  {nextLabel}
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 shrink-0 text-teal"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
