"use client";

import { useMemo, useState } from "react";
import type { SchoolCalendarMonth } from "@/lib/site-config";
import { getCurrentSchoolYear } from "@/lib/site-config";
import {
  WEEKDAY_LABELS,
  buildMonthGrid,
  downloadSchoolCalendarIcs,
  downloadSchoolCalendarPdf,
  findDefaultQuarterIndex,
  flattenSchoolCalendar,
  groupMonthsByCalendarQuarter,
  isNoSchoolEvent,
  monthLabel,
  parseMonthName,
  formatNoSchoolListTitle,
  type FlatCalendarEvent,
} from "@/lib/school-calendar-utils";
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
    { id: "grid", label: "Quarter" },
    { id: "list", label: "List" },
  ];

  return (
    <div className="flex justify-center px-2">
      <div
        className="inline-flex w-full max-w-[18rem] divide-x divide-teal/15 overflow-hidden rounded border border-teal/15 bg-teal/10 sm:max-w-[20rem]"
        role="group"
        aria-label="Calendar display mode"
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={view === option.id}
            onClick={() => onChange(option.id)}
            className={`min-w-0 flex-1 px-3 py-2.5 text-center font-heading text-[10px] font-semibold uppercase tracking-wide transition sm:px-4 sm:text-xs ${
              view === option.id
                ? "bg-white text-teal shadow-[inset_0_-2px_0_0_#408482]"
                : "text-teal/60 hover:bg-teal/5 hover:text-teal"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CalendarDownloadButtons({ months }: { months: SchoolCalendarMonth[] }) {
  const schoolYear = getCurrentSchoolYear();
  const downloadButtonClass =
    "inline-flex items-center gap-2 rounded border border-teal/20 bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-teal transition hover:bg-teal/5 sm:text-xs";

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-heading text-[10px] font-semibold uppercase tracking-widest text-teal sm:text-xs">
        Download
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => downloadSchoolCalendarIcs(months)}
          aria-label="Download calendar as .ics"
          className={downloadButtonClass}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          .ics
        </button>
        <button
          type="button"
          onClick={() => {
            void downloadSchoolCalendarPdf(months, schoolYear);
          }}
          aria-label="Download calendar as PDF"
          className={downloadButtonClass}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6" />
            <path d="m9 15 3 3 3-3" />
          </svg>
          PDF
        </button>
      </div>
    </div>
  );
}

function ListView({ months }: { months: SchoolCalendarMonth[] }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
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
                    {isNoSchoolEvent(event)
                      ? formatNoSchoolListTitle(event)
                      : event.title}
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
    </div>
  );
}

function MonthCalendarHeader({ month }: { month: SchoolCalendarMonth }) {
  const { year, month: monthIndex } = parseMonthName(month.name);

  return (
    <div className="border-b border-teal/15 bg-teal/5 pt-2">
      <h3 className="px-3 pb-1.5 text-center font-heading text-sm font-semibold uppercase tracking-wide text-teal">
        {monthLabel(year, monthIndex)}
      </h3>
      <div className="grid grid-cols-7 pb-1">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-0.5 text-center text-[9px] font-semibold uppercase tracking-wide text-teal/70 sm:text-[10px]"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthCalendarGrid({
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
    <div className="grid grid-cols-7 grid-rows-6 bg-white">
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
  );
}

function quarterGridColsClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  return "grid-cols-3";
}

function GridView({ months }: { months: SchoolCalendarMonth[] }) {
  const quarters = useMemo(() => groupMonthsByCalendarQuarter(months), [months]);
  const [page, setPage] = useState(() => findDefaultQuarterIndex(quarters));
  const [selectedEvent, setSelectedEvent] = useState<FlatCalendarEvent | null>(null);
  const events = flattenSchoolCalendar(months);
  const totalPages = quarters.length;
  const currentQuarter = quarters[page] ?? quarters[0];
  const visibleMonths = currentQuarter?.months ?? [];
  const prevPage = totalPages > 0 ? (page - 1 + totalPages) % totalPages : 0;
  const nextPage = totalPages > 0 ? (page + 1) % totalPages : 0;
  const prevLabel = quarters[prevPage]?.shortLabel ?? "";
  const nextLabel = quarters[nextPage]?.shortLabel ?? "";
  const desktopCols = quarterGridColsClass(visibleMonths.length);

  const sideButtonClass =
    "flex h-10 w-8 shrink-0 items-center justify-center self-center rounded border border-teal/20 bg-white text-teal shadow-sm transition hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-35 sm:h-12 sm:w-9";

  return (
    <div className="mx-auto flex w-full max-w-6xl items-stretch gap-2 sm:gap-3">
      <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      {totalPages > 1 ? (
        <button
          type="button"
          onClick={() => setPage(prevPage)}
          className={sideButtonClass}
          aria-label={`Previous quarter: ${prevLabel}`}
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      ) : (
        <span className="w-8 shrink-0 sm:w-9" aria-hidden="true" />
      )}

      <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-teal/20 bg-white shadow-md">
        {/* Mobile: stacked months with cream only between date grids */}
        <div className="md:hidden">
          {visibleMonths.map((month, index) => (
            <div key={month.name}>
              <MonthCalendarHeader month={month} />
              <MonthCalendarGrid
                month={month}
                events={events}
                onEventSelect={setSelectedEvent}
              />
              {index < visibleMonths.length - 1 ? (
                <div className="h-2 bg-cream/80" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Desktop: continuous headers; cream gap only between date grids */}
        <div className="hidden md:block">
          <div className={`grid ${desktopCols}`}>
            {visibleMonths.map((month) => (
              <MonthCalendarHeader key={`header-${month.name}`} month={month} />
            ))}
          </div>
          <div className={`grid ${desktopCols} gap-2 bg-cream/80`}>
            {visibleMonths.map((month) => (
              <MonthCalendarGrid
                key={`grid-${month.name}`}
                month={month}
                events={events}
                onEventSelect={setSelectedEvent}
              />
            ))}
          </div>
        </div>

        {totalPages > 1 ? (
          <div className="flex items-stretch border-t border-teal/15 bg-teal/5">
            <button
              type="button"
              onClick={() => setPage(prevPage)}
              className="flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5 text-left transition hover:bg-teal/10 sm:px-2.5"
              aria-label={`Previous quarter: ${prevLabel}`}
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
              {quarters.map((quarter, index) => (
                <button
                  key={`${quarter.year}-Q${quarter.quarter}`}
                  type="button"
                  aria-label={`Go to ${quarter.shortLabel}`}
                  aria-current={index === page ? "true" : undefined}
                  onClick={() => setPage(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === page ? "w-3.5 bg-teal" : "w-1.5 bg-teal/25 hover:bg-teal/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPage(nextPage)}
              className="flex min-w-0 flex-1 items-center justify-end gap-1.5 px-2 py-1.5 text-right transition hover:bg-teal/10 sm:px-2.5"
              aria-label={`Next quarter: ${nextLabel}`}
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
      </div>

      {totalPages > 1 ? (
        <button
          type="button"
          onClick={() => setPage(nextPage)}
          className={sideButtonClass}
          aria-label={`Next quarter: ${nextLabel}`}
        >
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      ) : (
        <span className="w-8 shrink-0 sm:w-9" aria-hidden="true" />
      )}
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
        <div className="mx-auto max-w-4xl px-2">
          <FullMonthCalendar months={months} />
        </div>
      ) : (
        <GridView months={months} />
      )}
      <CalendarDownloadButtons months={months} />
    </div>
  );
}
