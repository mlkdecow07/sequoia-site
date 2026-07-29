import { updateContactStatus, updateEmploymentStatus } from "@/app/admin/actions";
import type { SubmissionStatus } from "@/lib/supabase/types";

type StatusFormProps = {
  id: string;
  status: SubmissionStatus;
  kind: "contact" | "employment";
};

export default function StatusForm({ id, status, kind }: StatusFormProps) {
  async function markRead() {
    "use server";
    if (kind === "contact") {
      await updateContactStatus(id, "read");
    } else {
      await updateEmploymentStatus(id, "read");
    }
  }

  async function markArchived() {
    "use server";
    if (kind === "contact") {
      await updateContactStatus(id, "archived");
    } else {
      await updateEmploymentStatus(id, "archived");
    }
  }

  async function markNew() {
    "use server";
    if (kind === "contact") {
      await updateContactStatus(id, "new");
    } else {
      await updateEmploymentStatus(id, "new");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Status: {status}
      </span>
      {status !== "read" ? (
        <form action={markRead}>
          <button
            type="submit"
            className="rounded border border-teal/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal hover:bg-teal/5"
          >
            Mark read
          </button>
        </form>
      ) : null}
      {status !== "archived" ? (
        <form action={markArchived}>
          <button
            type="submit"
            className="rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-gray-50"
          >
            Archive
          </button>
        </form>
      ) : null}
      {status !== "new" ? (
        <form action={markNew}>
          <button
            type="submit"
            className="rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-gray-50"
          >
            Mark new
          </button>
        </form>
      ) : null}
    </div>
  );
}
