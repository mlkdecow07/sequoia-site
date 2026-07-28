"use client";

import { useState } from "react";
import type { SchoolCalendarMonth } from "@/lib/site-config";
import {
  WEEKDAY_LABELS,
  buildMonthGrid,
  flattenSchoolCalendar,
  isNoSchoolEvent,
  monthLabel,
  parseMonthName,
  type FlatCalendarEvent,
} from "@/lib/school-calendar-utils";
import CarouselNavButton from "@/components/CarouselNavButton";
import CalendarEventModal from "@/components/CalendarEventModal";
import FullMonthCalendar from "@/components/FullMonthCalendar";

type CalendarView = "list" | "grid" | "month";

type SchoolCalendarViewProps = {
  months: SchoolCalendarMonth[];
};

function ViewToggle({
  view,
  onChange,
}: {
  view: CalendarView;
  onChange: (view: CalendarView) => void;
}) {
  const options: { id: CalendarView; label: string }[] = [
    { id: "month", label: "Month" },
    { id: "grid", label: "Year" },
    { id: "list", label: "List" },
  ];

  return (
    <div className="flex justify-center px-2">
      <div
        className="inline-flex w-full max-w-[18rem] overflow-hidden rounded-full border border-teal/25 bg-white shadow-sm sm:max-w-[20rem]"
        role="group"
        aria-label="Calendar display mode"
      >
        {options.map((option, index) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={view === option.id}
            onClick={() => onChange(option.id)}
            className={`flex-1 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-widest transition-colors sm:px-4 sm:text-xs ${
              index < options.length - 1 ? "border-r border-teal/15" : ""
            } ${
              view === option.id ? "bg-teal text-white" : "bg-white text-teal hover:bg-teal/5"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListView({ months }: { months: SchoolCalendarMonth[] }) {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      {months.map((month, monthIndex) => (
        <div key={month.name}>
          {monthIndex > 0 ? <div className="border-t border-teal/10" aria-hidden="true" /> : null}
          <div className="bg-teal/5 px-4 py-2 sm:px-5">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-teal">
              {month.name}
            </h3>
          </div>
          {month.events.map((event, eventIndex) => (
            <div
              key={`${month.name}-${event.title}`}
              className={`flex gap-3 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-3 ${
                eventIndex < month.events.length - 1 ? "border-b border-teal/10" : ""
              }`}
            >
              <p className="w-24 shrink-0 font-body text-xs font-normal leading-snug text-gray-500 sm:w-28 md:text-sm md:text-gray-400">
                {event.dates}
              </p>
              <div className="min-w-0 flex-1">
                <p
                  className={`font-heading text-sm leading-snug tracking-wide ${
                    isNoSchoolEvent(event)
                      ? "font-bold uppercase text-red-600"
                      : "font-semibold text-gray-900"
                  }`}
                >
                  {event.title}
                </p>
                {event.description ? (
                  <p className="mt-0.5 text-sm leading-snug text-gray-600">
                    {event.description.replace(/\.$/, "")}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MonthCalendar({
  month,
  events,
  onEventSelect,
}: {
  month: SchoolCalendarMonth;
  events: ReturnType<typeof flattenSchoolCalendar>;
  onEventSelect: (event: FlatCalendarEvent) => void;
}) {
  const { year, month: monthIndex } = parseMonthName(month.name);
  const cells = buildMonthGrid(year, monthIndex, events);

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-lg border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-3 py-2 text-center">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-teal">
          {monthLabel(year, monthIndex)}
        </h3>
      </div>

      <div className="grid grid-cols-7 border-b border-teal/10 bg-teal/5">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-1 text-center text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:text-[10px]"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6">
        {cells.map((cell, index) => (
          <div
            key={`${month.name}-${index}`}
            className={`h-14 overflow-hidden border-b border-r border-teal/10 p-0.5 sm:h-16 sm:p-1 ${
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
                      onClick={() => onEventSelect(event)}
                      className={`block w-full truncate text-left text-[8px] leading-tight transition-colors hover:underline sm:text-[9px] ${
                        isNoSchoolEvent(event)
                          ? "font-bold uppercase text-red-600"
                          : "font-normal text-teal hover:text-teal/80"
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
  );
}

function GridView({ months }: { months: SchoolCalendarMonth[] }) {
  const monthsPerPage = 3;
  const [page, setPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<FlatCalendarEvent | null>(null);
  const events = flattenSchoolCalendar(months);
  const totalPages = Math.ceil(months.length / monthsPerPage);
  const pageStart = page * monthsPerPage;
  const visibleMonths = months.slice(pageStart, pageStart + monthsPerPage);

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        {visibleMonths.map((month) => (
          <MonthCalendar
            key={month.name}
            month={month}
            events={events}
            onEventSelect={setSelectedEvent}
          />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3">
          <CarouselNavButton
            direction="prev"
            label="Previous months"
            disabled={page === 0}
            onClick={() => setPage((current) => current - 1)}
          />
          <p className="min-w-16 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
            {page + 1} / {totalPages}
          </p>
          <CarouselNavButton
            direction="next"
            label="Next months"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((current) => current + 1)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function SchoolCalendarView({ months }: SchoolCalendarViewProps) {
  const [view, setView] = useState<CalendarView>("month");

  return (
    <div className="mt-12 space-y-8">
      <ViewToggle view={view} onChange={setView} />
      {view === "list" ? (
        <ListView months={months} />
      ) : view === "month" ? (
        <div className="mx-auto max-w-3xl px-2">
          <FullMonthCalendar months={months} />
        </div>
      ) : (
        <GridView months={months} />
      )}
    </div>
  );
}
