"use client";

import { useState } from "react";
import {
  createSiteAlert,
  deleteSiteAlert,
  updateSiteAlert,
} from "@/app/admin/actions";
import {
  adminDateFieldClassName,
  adminFieldClassName,
} from "@/lib/admin-form-styles";
import type { SiteAlert } from "@/lib/supabase/types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalDateValue(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function todayLocalDateValue() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function midnightTomorrowParts() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: "00:00",
  };
}

function toLocalTimeValue(iso: string | null | undefined) {
  if (!iso) return "00:00";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "00:00";
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function SiteAlertForm({ alert }: { alert?: SiteAlert }) {
  const isEdit = Boolean(alert);
  const [pendingDelete, setPendingDelete] = useState(false);
  const tomorrow = midnightTomorrowParts();

  const action = isEdit
    ? updateSiteAlert.bind(null, alert!.id)
    : createSiteAlert;

  return (
    <div className="mx-auto w-full min-w-0 max-w-xl space-y-6">
      <form
        action={action}
        className="min-w-0 max-w-full space-y-4 overflow-x-hidden rounded border border-teal/15 bg-white px-4 py-5 sm:px-5"
        autoComplete="off"
      >
        <input
          type="hidden"
          name="tz_offset_minutes"
          value={String(new Date().getTimezoneOffset())}
        />
        <div className="min-w-0">
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
            className={adminFieldClassName}
          />
        </div>

        <div className="min-w-0">
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
            className={adminFieldClassName}
          />
        </div>

        <div className="min-w-0 max-w-full overflow-x-hidden">
          <label
            htmlFor="created_at"
            className="text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Display date
          </label>
          <input
            id="created_at"
            name="created_at"
            type="date"
            required
            defaultValue={
              isEdit ? toLocalDateValue(alert?.created_at) : todayLocalDateValue()
            }
            className={adminDateFieldClassName}
          />
          <p className="mt-1 text-xs text-gray-500">
            Shown on the alert (defaults to today; editable).
          </p>
        </div>

        <div className="min-w-0 max-w-full space-y-3 overflow-x-hidden">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Auto-expire
          </p>
          <div className="grid min-w-0 max-w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 max-w-full overflow-x-hidden">
              <label htmlFor="ends_at_date" className="sr-only">
                Expire date
              </label>
              <input
                id="ends_at_date"
                name="ends_at_date"
                type="date"
                required
                defaultValue={
                  isEdit && alert?.ends_at
                    ? toLocalDateValue(alert.ends_at)
                    : tomorrow.date
                }
                className={adminDateFieldClassName}
              />
            </div>
            <div className="min-w-0 max-w-full overflow-x-hidden">
              <label htmlFor="ends_at_time" className="sr-only">
                Expire time
              </label>
              <input
                id="ends_at_time"
                name="ends_at_time"
                type="time"
                required
                defaultValue={
                  isEdit && alert?.ends_at
                    ? toLocalTimeValue(alert.ends_at)
                    : tomorrow.time
                }
                className={adminDateFieldClassName}
              />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Defaults to midnight at the start of tomorrow.
          </p>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-xs font-semibold uppercase tracking-widest text-teal">
            Display on
          </legend>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input
              type="radio"
              name="display_scope"
              value="home"
              defaultChecked={(alert?.display_scope ?? "home") === "home"}
              className="border-teal/30 text-teal focus:ring-teal"
            />
            Homepage only
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input
              type="radio"
              name="display_scope"
              value="all"
              defaultChecked={alert?.display_scope === "all"}
              className="border-teal/30 text-teal focus:ring-teal"
            />
            All pages
          </label>
        </fieldset>

        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={alert?.is_active ?? true}
            className="rounded border-teal/30 text-teal focus:ring-teal"
          />
          Active
        </label>

        <button
          type="submit"
          className="w-full rounded bg-teal px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-teal-dark sm:w-auto sm:py-2.5"
        >
          {isEdit ? "Save alert" : "Create alert"}
        </button>
      </form>

      {isEdit ? (
        <div className="flex justify-center px-2">
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
