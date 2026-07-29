import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminEmploymentListPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("employment_applications")
    .select(
      "id, created_at, applicant_name, applicant_email, status, headshot_path, resume_path",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        Unable to load employment applications: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">
          <Link href="/admin" className="text-teal underline-offset-2 hover:underline">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          Employment Forms
        </p>
        <h1 className="mt-2 font-heading text-3xl uppercase tracking-widest text-teal">
          Employment Forms
        </h1>
      </div>

      <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
        {(data ?? []).length === 0 ? (
          <li className="px-4 py-8 text-sm text-gray-500">No applications yet.</li>
        ) : (
          (data ?? []).map((item) => (
            <li key={item.id}>
              <Link
                href={`/admin/employment/${item.id}`}
                className="block px-4 py-4 hover:bg-cream/60"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-gray-800">
                    {item.applicant_name ?? "Unknown"}
                    {item.status === "new" ? (
                      <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-teal">
                        New
                      </span>
                    ) : (
                      <span className="ml-2 text-xs uppercase tracking-widest text-gray-400">
                        {item.status}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(item.created_at)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {item.applicant_email ?? "—"}
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
