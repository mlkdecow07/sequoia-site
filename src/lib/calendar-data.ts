import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { CalendarEventRow } from "@/lib/supabase/types";
import type { SchoolCalendarEvent, SchoolCalendarMonth } from "@/lib/site-config";
import { schoolCalendar as fallbackCalendar } from "@/lib/site-config";
import { monthLabel, parseMonthName } from "@/lib/school-calendar-utils";

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

export function rowToSchoolEvent(row: CalendarEventRow): SchoolCalendarEvent {
  return {
    dates: row.dates,
    title: row.title,
    description: row.description ?? undefined,
    startDate: row.start_date,
    endDate: row.end_date ?? undefined,
  };
}

/** Group flat event rows into month buckets matching SchoolCalendarMonth[]. */
export function groupEventsByMonth(rows: CalendarEventRow[]): SchoolCalendarMonth[] {
  const buckets = new Map<string, SchoolCalendarEvent[]>();

  for (const row of rows) {
    const [yearStr, monthStr] = row.start_date.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    if (Number.isNaN(year) || month < 0 || month > 11) continue;

    const name = monthLabel(year, month);
    const list = buckets.get(name) ?? [];
    list.push(rowToSchoolEvent(row));
    buckets.set(name, list);
  }

  return Array.from(buckets.entries())
    .map(([name, events]) => ({ name, events }))
    .sort((a, b) => {
      const pa = parseMonthName(a.name);
      const pb = parseMonthName(b.name);
      return pa.year !== pb.year ? pa.year - pb.year : pa.month - pb.month;
    });
}

/**
 * Load school calendar months from Supabase (anon SELECT).
 * Falls back to hardcoded site-config data if the table is empty or unreachable
 * (useful while the Phase 2 migration is being applied).
 */
export async function getSchoolCalendarMonths(): Promise<SchoolCalendarMonth[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("calendar_events")
      .select(
        "id, created_at, updated_at, title, description, dates, start_date, end_date, sort_order",
      )
      .order("start_date", { ascending: true })
      .order("sort_order", { ascending: true, nullsFirst: false });

    if (error) {
      console.error("calendar_events fetch failed:", error.message);
      return fallbackCalendar;
    }

    if (!data || data.length === 0) {
      return fallbackCalendar;
    }

    return groupEventsByMonth(data as CalendarEventRow[]);
  } catch (err) {
    console.error("calendar_events fetch error:", err);
    return fallbackCalendar;
  }
}

export async function getCalendarEventRows(): Promise<CalendarEventRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calendar_events")
    .select(
      "id, created_at, updated_at, title, description, dates, start_date, end_date, sort_order",
    )
    .order("start_date", { ascending: true })
    .order("sort_order", { ascending: true, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CalendarEventRow[];
}

export async function getCalendarEventById(
  id: string,
): Promise<CalendarEventRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calendar_events")
    .select(
      "id, created_at, updated_at, title, description, dates, start_date, end_date, sort_order",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as CalendarEventRow | null;
}

/** Suggest a display `dates` string from start/end ISO dates (YYYY-MM-DD). */
export function suggestDatesLabel(startDate: string, endDate?: string | null): string {
  const start = parseIsoDate(startDate);
  if (!start) return startDate;

  const end = endDate ? parseIsoDate(endDate) : null;
  if (!end || endDate === startDate) {
    return formatDisplayDay(start);
  }

  if (start.year === end.year && start.month === end.month) {
    return `${MONTH_NAMES[start.month]} ${start.day}–${end.day}`;
  }

  if (start.year === end.year) {
    return `${MONTH_NAMES[start.month]} ${start.day} – ${MONTH_NAMES[end.month]} ${end.day}`;
  }

  return `${MONTH_NAMES[start.month]} ${start.day}, ${start.year} – ${MONTH_NAMES[end.month]} ${end.day}, ${end.year}`;
}

function parseIsoDate(
  value: string,
): { year: number; month: number; day: number } | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3]),
  };
}

function formatDisplayDay(parts: { year: number; month: number; day: number }): string {
  return `${MONTH_NAMES[parts.month]} ${parts.day}`;
}
