import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { SiteAlert } from "@/lib/supabase/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminAlertsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_alerts")
    .select("*")
    .order("updated_at", { ascending: false });

  const alerts = (data ?? []) as SiteAlert[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl uppercase tracking-widest text-teal">
            Alerts
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Weather closures and other urgent notices shown on the homepage only.
          </p>
        </div>
        <Link
          href="/admin/alerts/new"
          className="rounded bg-teal px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white hover:bg-teal-dark"
        >
          New alert
        </Link>
      </div>

      {error ? (
        <p className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Could not load alerts. Run the latest SQL migration if tables are missing.{" "}
          ({error.message})
        </p>
      ) : null}

      <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
        {alerts.length === 0 ? (
          <li className="px-4 py-8 text-sm text-gray-500">No alerts yet.</li>
        ) : (
          alerts.map((alert) => (
            <li key={alert.id}>
              <Link
                href={`/admin/alerts/${alert.id}`}
                className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 hover:bg-cream/60"
              >
                <span className="font-medium text-gray-800">
                  {alert.title}
                  {alert.is_active ? (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-teal">
                      Active
                    </span>
                  ) : null}
                </span>
                <span className="text-xs text-gray-500">
                  Updated {formatDate(alert.updated_at)}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
