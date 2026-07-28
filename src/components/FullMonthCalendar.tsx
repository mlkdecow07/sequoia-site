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
import CarouselNavButton from "@/components/CarouselNavButton";
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

  return (
    <div className="w-full">
      <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      <div className="flex items-center justify-center gap-3">
        <CarouselNavButton
          direction="prev"
          label="Previous month"
          disabled={monthIndex === 0}
          onClick={() => setMonthIndex((index) => index - 1)}
        />
        <h3 className="min-w-[10rem] text-center font-heading text-lg tracking-wide text-teal sm:min-w-[12rem] sm:text-xl">
          {monthLabel(current.year, current.month)}
        </h3>
        <CarouselNavButton
          direction="next"
          label="Next month"
          disabled={monthIndex >= monthEntries.length - 1}
          onClick={() => setMonthIndex((index) => index + 1)}
        />
      </div>

      <section className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
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
      </section>
    </div>
  );
}
