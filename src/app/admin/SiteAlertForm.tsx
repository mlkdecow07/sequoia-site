"use client";

import { useState } from "react";
import {
  createSiteAlert,
  deleteSiteAlert,
  updateSiteAlert,
} from "@/app/admin/actions";
import type { SiteAlert } from "@/lib/supabase/types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalInputValue(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Midnight at the start of tomorrow, local time, as datetime-local value. */
function midnightTomorrowLocal() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00`;
}

export default function SiteAlertForm({ alert }: { alert?: SiteAlert }) {
  const isEdit = Boolean(alert);
  const [pendingDelete, setPendingDelete] = useState(false);

  const action = isEdit
    ? updateSiteAlert.bind(null, alert!.id)
    : createSiteAlert;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <form
        action={action}
        className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5"
        autoComplete="off"
      >
        <div>
          <label
            htmlFor="title"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. School closed tomorrow"
            defaultValue={alert?.title ?? ""}
            className="mt-1 w-full rounded border border-teal/20 px-3 py-2 text-sm text-gray-800 outline-none focus:border-teal"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Details for families…"
            defaultValue={alert?.message ?? ""}
            className="mt-1 w-full rounded border border-teal/20 px-3 py-2 text-sm text-gray-800 outline-none focus:border-teal"
          />
        </div>

        <div>
          <label
            htmlFor="created_at"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Display date
          </label>
          <input
            id="created_at"
            name="created_at"
            type="datetime-local"
            required
            defaultValue={
              isEdit
                ? toLocalInputValue(alert?.created_at)
                : toLocalInputValue(new Date().toISOString())
            }
            className="mt-1 w-full rounded border border-teal/20 px-3 py-2 text-sm text-gray-800 outline-none focus:border-teal"
          />
          <p className="mt-1 text-xs text-gray-500">
            Shown on the homepage alert (defaults to now; editable).
          </p>
        </div>

        <div>
          <label
            htmlFor="ends_at"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Auto-expire
          </label>
          <input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            required
            defaultValue={
              isEdit && alert?.ends_at
                ? toLocalInputValue(alert.ends_at)
                : midnightTomorrowLocal()
            }
            className="mt-1 w-full rounded border border-teal/20 px-3 py-2 text-sm text-gray-800 outline-none focus:border-teal"
          />
          <p className="mt-1 text-xs text-gray-500">
            Defaults to midnight at the start of tomorrow.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={alert?.is_active ?? true}
            className="rounded border-teal/30 text-teal focus:ring-teal"
          />
          Show on homepage
        </label>

        <button
          type="submit"
          className="rounded bg-teal px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-teal-dark"
        >
          {isEdit ? "Save alert" : "Create alert"}
        </button>
      </form>

      {isEdit ? (
        <div className="flex justify-center">
          {pendingDelete ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <p className="text-sm text-gray-600">Delete this alert?</p>
              <form action={deleteSiteAlert.bind(null, alert!.id)}>
                <button
                  type="submit"
                  className="w-fit rounded border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  Confirm delete
                </button>
              </form>
              <button
                type="button"
                onClick={() => setPendingDelete(false)}
                className="w-fit rounded border border-teal/25 px-4 py-2 text-sm text-teal hover:bg-teal/5"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPendingDelete(true)}
              className="w-fit rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
