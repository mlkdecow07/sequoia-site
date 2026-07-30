import Link from "next/link";
import { getCalendarEventRows } from "@/lib/calendar-data";
import type { CalendarEventRow } from "@/lib/supabase/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function AdminCalendarListPage() {
  let events: CalendarEventRow[] = [];
  let loadError: string | null = null;

  try {
    events = await getCalendarEventRows();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unable to load calendar events.";
    events = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl uppercase tracking-widest text-teal">
            Calendar
          </h1>
        </div>
        <Link
          href="/admin/calendar/new"
          className="rounded bg-teal px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-teal-dark"
        >
          Add event
        </Link>
      </div>

      {loadError ? (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Unable to load calendar events: {loadError}. Apply{" "}
          <code className="text-xs">supabase/migrations/20260729160000_calendar_events.sql</code>{" "}
          in the Supabase SQL Editor if the table is missing.
        </p>
      ) : null}

      <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
        {events.length === 0 && !loadError ? (
          <li className="px-4 py-8 text-sm text-gray-500">
            No events yet.{" "}
            <Link href="/admin/calendar/new" className="text-teal underline-offset-2 hover:underline">
              Add the first event
            </Link>
            .
          </li>
        ) : (
          events.map((item) => (
            <li key={item.id}>
              <Link
                href={`/admin/calendar/${item.id}`}
                className="block px-4 py-4 hover:bg-cream/60"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.start_date)}
                    {item.end_date && item.end_date !== item.start_date
                      ? ` – ${formatDate(item.end_date)}`
                      : ""}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-600">{item.dates}</p>
                {item.description ? (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-700">{item.description}</p>
                ) : null}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
