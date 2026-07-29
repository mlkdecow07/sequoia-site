import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const since7 = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - 6);
    return d.toISOString();
  })();

  const [
    { count: contactNew },
    { count: contactTotal },
    { count: employmentNew },
    { count: employmentTotal },
    { count: calendarTotal },
    { count: alertActive },
    { count: alertTotal },
    { count: infoViews7 },
    { data: recentContact },
    { data: recentEmployment },
  ] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("employment_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("employment_applications")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("calendar_events")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("site_alerts")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase.from("site_alerts").select("*", { count: "exact", head: true }),
    supabase
      .from("info_page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since7),
    supabase
      .from("contact_submissions")
      .select("id, created_at, name, email, status, source")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("employment_applications")
      .select("id, created_at, applicant_name, applicant_email, status")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-3xl text-teal">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review submissions, calendar, homepage alerts, and /info traffic.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/alerts"
          className="rounded border border-teal/15 bg-white px-5 py-4 transition hover:border-teal/40"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Alerts
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">
            {alertActive ?? 0}
            <span className="ml-2 text-base font-normal text-gray-500">
              active / {alertTotal ?? 0} total
            </span>
          </p>
        </Link>
        <Link
          href="/admin/calendar"
          className="rounded border border-teal/15 bg-white px-5 py-4 transition hover:border-teal/40"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Calendar
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">
            {calendarTotal ?? 0}
            <span className="ml-2 text-base font-normal text-gray-500">events</span>
          </p>
        </Link>
        <Link
          href="/admin/contact"
          className="rounded border border-teal/15 bg-white px-5 py-4 transition hover:border-teal/40"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Contact Forms
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">
            {contactNew ?? 0}
            <span className="ml-2 text-base font-normal text-gray-500">
              new / {contactTotal ?? 0} total
            </span>
          </p>
        </Link>
        <Link
          href="/admin/employment"
          className="rounded border border-teal/15 bg-white px-5 py-4 transition hover:border-teal/40"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Employment Forms
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">
            {employmentNew ?? 0}
            <span className="ml-2 text-base font-normal text-gray-500">
              new / {employmentTotal ?? 0} total
            </span>
          </p>
        </Link>
        <Link
          href="/admin/info-stats"
          className="rounded border border-teal/15 bg-white px-5 py-4 transition hover:border-teal/40"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Social Traffic
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">
            {infoViews7 ?? 0}
            <span className="ml-2 text-base font-normal text-gray-500">last 7 days</span>
          </p>
        </Link>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl text-teal">Recent contact</h2>
          <Link
            href="/admin/contact"
            className="text-sm text-teal underline-offset-2 hover:underline"
          >
            View all
          </Link>
        </div>
        <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
          {(recentContact ?? []).length === 0 ? (
            <li className="px-4 py-6 text-sm text-gray-500">No contact submissions yet.</li>
          ) : (
            (recentContact ?? []).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/contact/${item.id}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 hover:bg-cream/60"
                >
                  <span className="font-medium text-gray-800">
                    {item.name}
                    {item.status === "new" ? (
                      <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-teal">
                        New
                      </span>
                    ) : null}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(item.created_at)}
                    {item.source ? ` · ${item.source}` : ""}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl text-teal">Recent applications</h2>
          <Link
            href="/admin/employment"
            className="text-sm text-teal underline-offset-2 hover:underline"
          >
            View all
          </Link>
        </div>
        <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
          {(recentEmployment ?? []).length === 0 ? (
            <li className="px-4 py-6 text-sm text-gray-500">
              No employment applications yet.
            </li>
          ) : (
            (recentEmployment ?? []).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/employment/${item.id}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 hover:bg-cream/60"
                >
                  <span className="font-medium text-gray-800">
                    {item.applicant_name ?? "Unknown"}
                    {item.status === "new" ? (
                      <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-teal">
                        New
                      </span>
                    ) : null}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(item.created_at)}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
