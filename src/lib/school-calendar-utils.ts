import type { SchoolCalendarEvent, SchoolCalendarMonth } from "@/lib/site-config";

export type FlatCalendarEvent = SchoolCalendarEvent & {
  startDate: string;
  endDate: string;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function flattenSchoolCalendar(months: SchoolCalendarMonth[]): FlatCalendarEvent[] {
  return months.flatMap((month) =>
    month.events.map((event) => ({
      ...event,
      endDate: event.endDate ?? event.startDate,
    })),
  );
}

/** Parse labels like "August 2026" without Date string parsing (Safari-safe). */
export function parseMonthName(name: string): { year: number; month: number } {
  const match = name.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) {
    throw new Error(`Unrecognized calendar month label: ${name}`);
  }

  const monthIndex = MONTH_NAMES.findIndex(
    (monthName) => monthName.toLowerCase() === match[1].toLowerCase(),
  );
  const year = Number(match[2]);

  if (monthIndex < 0 || Number.isNaN(year)) {
    throw new Error(`Unrecognized calendar month label: ${name}`);
  }

  return { year, month: monthIndex };
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function eventsOnDate(dateKey: string, events: FlatCalendarEvent[]): FlatCalendarEvent[] {
  return events.filter((event) => event.startDate <= dateKey && dateKey <= event.endDate);
}

export type CalendarCell = {
  day: number | null;
  dateKey: string | null;
  events: FlatCalendarEvent[];
};

export function buildMonthGrid(
  year: number,
  month: number,
  events: FlatCalendarEvent[],
): CalendarCell[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = firstDay.getDay();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < leadingEmpty; i += 1) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = toDateKey(new Date(year, month, day));
    cells.push({
      day,
      dateKey,
      events: eventsOnDate(dateKey, events),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  while (cells.length < 42) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  return cells;
}

export function monthLabel(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

export function formatYearMonth(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function parseYearMonth(value: string): { year: number; month: number } | null {
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;

  if (month < 0 || month > 11) return null;

  return { year, month };
}

export function getMonthEntry(
  months: SchoolCalendarMonth[],
  year: number,
  month: number,
): SchoolCalendarMonth | undefined {
  return months.find((entry) => {
    const parsed = parseMonthName(entry.name);
    return parsed.year === year && parsed.month === month;
  });
}

export function isNoSchoolEvent(event: { title: string; description?: string }): boolean {
  const title = event.title.toLowerCase();
  const description = event.description?.toLowerCase() ?? "";

  return (
    title.includes("no school") ||
    title.includes("break") ||
    title.includes("inservice week") ||
    title.includes("professional development") ||
    title.includes("parent/teacher conferences") ||
    description.includes("no school")
  );
}

export { WEEKDAY_LABELS };
