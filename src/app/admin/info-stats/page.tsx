import { createClient } from "@/lib/supabase/server";

const KNOWN_LINKS = [
  { label: "Apply", linkType: "button" },
  { label: "Explore", linkType: "button" },
  { label: "Tuition & Fees", linkType: "button" },
  { label: "Enrollment Process", linkType: "button" },
  { label: "Instagram", linkType: "social" },
  { label: "Facebook", linkType: "social" },
  { label: "YouTube", linkType: "social" },
  { label: "Crest / Home", linkType: "brand" },
  { label: "Website footer", linkType: "brand" },
] as const;

function startOfDaysAgo(days: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default async function AdminInfoStatsPage() {
  const supabase = await createClient();
  const since30 = startOfDaysAgo(29);
  const since7 = startOfDaysAgo(6);

  const [
    { count: totalAll, error: errAll },
    { count: total7 },
    { count: total30 },
    { data: recentRows, error: errRecent },
    { data: last30Rows, error: err30 },
    { data: clickRows, error: errClicks },
    { data: recentClicks, error: errRecentClicks },
  ] = await Promise.all([
    supabase.from("info_page_views").select("*", { count: "exact", head: true }),
    supabase
      .from("info_page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since7),
    supabase
      .from("info_page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since30),
    supabase
      .from("info_page_views")
      .select("id, created_at, referrer")
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("info_page_views")
      .select("created_at")
      .gte("created_at", since30)
      .order("created_at", { ascending: true }),
    supabase.from("info_link_clicks").select("label, link_type, created_at"),
    supabase
      .from("info_link_clicks")
      .select("id, created_at, label, href")
      .order("created_at", { ascending: false })
      .limit(25),
  ]);

  const byDay = new Map<string, number>();
  for (let i = 29; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay.set(key, 0);
  }
  for (const row of last30Rows ?? []) {
    const key = String(row.created_at).slice(0, 10);
    if (byDay.has(key)) {
      byDay.set(key, (byDay.get(key) ?? 0) + 1);
    }
  }

  const daily = Array.from(byDay.entries()).map(([day, count]) => ({
    day,
    count,
  }));
  const maxDay = Math.max(1, ...daily.map((d) => d.count));

  const clickCounts = new Map<string, { all: number; last7: number; last30: number }>();
  for (const known of KNOWN_LINKS) {
    clickCounts.set(known.label, { all: 0, last7: 0, last30: 0 });
  }
  for (const row of clickRows ?? []) {
    const label = String(row.label);
    const current = clickCounts.get(label) ?? { all: 0, last7: 0, last30: 0 };
    current.all += 1;
    const created = String(row.created_at);
    if (created >= since7) current.last7 += 1;
    if (created >= since30) current.last30 += 1;
    clickCounts.set(label, current);
  }

  const clickBreakdown = [
    ...KNOWN_LINKS.map((known) => ({
      label: known.label,
      linkType: known.linkType,
      ...(clickCounts.get(known.label) ?? { all: 0, last7: 0, last30: 0 }),
    })),
    ...Array.from(clickCounts.entries())
      .filter(([label]) => !KNOWN_LINKS.some((k) => k.label === label))
      .map(([label, counts]) => ({
        label,
        linkType: "other",
        ...counts,
      })),
  ].sort((a, b) => b.all - a.all || a.label.localeCompare(b.label));

  const maxClicks = Math.max(1, ...clickBreakdown.map((row) => row.all));
  const totalClicks = clickBreakdown.reduce((sum, row) => sum + row.all, 0);

  const loadError = errAll || errRecent || err30 || errClicks || errRecentClicks;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl uppercase tracking-widest text-teal">
          Social Traffic
        </h1>
      </div>

      {loadError ? (
        <p className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Could not load stats. Run the latest SQL migration if tables are missing.{" "}
          ({loadError.message})
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-teal/15 bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Views · 7 days
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">{total7 ?? 0}</p>
        </div>
        <div className="rounded border border-teal/15 bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Views · 30 days
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">{total30 ?? 0}</p>
        </div>
        <div className="rounded border border-teal/15 bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Views · all time
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">{totalAll ?? 0}</p>
        </div>
        <div className="rounded border border-teal/15 bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            Clicks · all time
          </p>
          <p className="mt-2 font-heading text-3xl text-gray-800">{totalClicks}</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-heading text-xl text-teal">Link clicks</h2>
        <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
          {clickBreakdown.every((row) => row.all === 0) ? (
            <li className="px-4 py-6 text-sm text-gray-500">
              No link clicks recorded yet.
            </li>
          ) : (
            clickBreakdown.map((row) => (
              <li key={row.label} className="px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-gray-800">
                    {row.label}
                    <span className="ml-2 text-xs font-normal uppercase tracking-widest text-gray-400">
                      {row.linkType}
                    </span>
                  </span>
                  <span className="tabular-nums text-gray-600">
                    {row.last7} / 7d · {row.last30} / 30d · {row.all} total
                  </span>
                </div>
                <div className="mt-2 h-2 rounded bg-cream">
                  <div
                    className="h-2 rounded bg-teal/70"
                    style={{ width: `${(row.all / maxClicks) * 100}%` }}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl text-teal">Daily views (30 days)</h2>
        <ul className="space-y-2 rounded border border-teal/15 bg-white px-4 py-4">
          {daily.map(({ day, count }) => (
            <li key={day} className="flex items-center gap-3 text-sm">
              <span className="w-28 shrink-0 text-gray-600">{formatDay(day)}</span>
              <div className="h-2 flex-1 rounded bg-cream">
                <div
                  className="h-2 rounded bg-teal/70"
                  style={{ width: `${(count / maxDay) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right tabular-nums text-gray-800">{count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl text-teal">Recent clicks</h2>
        <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
          {(recentClicks ?? []).length === 0 ? (
            <li className="px-4 py-6 text-sm text-gray-500">No clicks yet.</li>
          ) : (
            (recentClicks ?? []).map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm"
              >
                <span className="font-medium text-gray-800">{row.label}</span>
                <span className="text-xs text-gray-500">
                  {formatDateTime(row.created_at)}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl text-teal">Recent views</h2>
        <ul className="divide-y divide-teal/10 overflow-hidden rounded border border-teal/15 bg-white">
          {(recentRows ?? []).length === 0 ? (
            <li className="px-4 py-6 text-sm text-gray-500">No views recorded yet.</li>
          ) : (
            (recentRows ?? []).map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm"
              >
                <span className="text-gray-800">{formatDateTime(row.created_at)}</span>
                <span className="truncate text-xs text-gray-500">
                  {row.referrer ? row.referrer : "Direct / unknown"}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
