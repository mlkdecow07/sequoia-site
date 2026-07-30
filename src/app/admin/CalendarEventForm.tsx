"use client";

import { useState } from "react";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from "@/app/admin/actions";
import { adminFieldClassName } from "@/lib/admin-form-styles";
import type { CalendarEventRow } from "@/lib/supabase/types";

type CalendarEventFormProps = {
  event?: CalendarEventRow;
};

export default function CalendarEventForm({ event }: CalendarEventFormProps) {
  const isEdit = Boolean(event);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [endDate, setEndDate] = useState(() =>
    isEdit ? (event?.end_date ?? "") : "",
  );

  const action = isEdit
    ? updateCalendarEvent.bind(null, event!.id)
    : createCalendarEvent;

  return (
    <div className="mx-auto w-full min-w-0 max-w-xl space-y-6">
      <form
        action={action}
        className="min-w-0 space-y-4 overflow-hidden rounded border border-teal/15 bg-white px-4 py-5 sm:px-5"
        autoComplete="off"
      >
        <div className="min-w-0">
          <label htmlFor="title" className="text-xs font-semibold uppercase tracking-widest text-teal">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={event?.title ?? ""}
            className={adminFieldClassName}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="dates"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Dates (display)
          </label>
          <input
            id="dates"
            name="dates"
            required
            placeholder="e.g. September 4–7"
            defaultValue={event?.dates ?? ""}
            className={adminFieldClassName}
          />
          <p className="mt-1 text-xs text-gray-500">
            Shown on the public calendar list (keep the school&apos;s preferred wording).
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="start_date"
              className="text-xs font-semibold uppercase tracking-widest text-teal"
            >
              Start date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              required
              defaultValue={event?.start_date ?? ""}
              className={adminFieldClassName}
            />
          </div>
          <div className="min-w-0">
            <label
              htmlFor="end_date"
              className="text-xs font-semibold uppercase tracking-widest text-teal"
            >
              End date
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              autoComplete="off"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={adminFieldClassName}
            />
            <p className="mt-1 text-xs text-gray-500">Leave blank for a single-day event.</p>
          </div>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="description"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={event?.description ?? ""}
            className={adminFieldClassName}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="sort_order"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Sort order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={event?.sort_order ?? ""}
            className={`${adminFieldClassName} max-w-full sm:max-w-[12rem]`}
          />
          <p className="mt-1 text-xs text-gray-500">
            Optional tie-breaker when events share a start date.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-teal px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-teal-dark sm:w-auto sm:py-2"
        >
          {isEdit ? "Save changes" : "Create event"}
        </button>
      </form>

      {isEdit ? (
        <div className="rounded border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-800">Delete this event from the public calendar.</p>
          {!pendingDelete ? (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => setPendingDelete(true)}
                className="w-fit rounded border border-red-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-700 hover:bg-red-100"
              >
                Delete…
              </button>
            </div>
          ) : (
            <form
              action={deleteCalendarEvent.bind(null, event!.id)}
              className="mt-3 flex flex-wrap justify-center gap-2"
            >
              <button
                type="submit"
                className="w-fit rounded bg-red-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-800"
              >
                Confirm delete
              </button>
              <button
                type="button"
                onClick={() => setPendingDelete(false)}
                className="w-fit rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-white"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
}
