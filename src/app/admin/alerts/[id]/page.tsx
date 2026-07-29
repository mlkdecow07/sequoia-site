import Link from "next/link";
import { notFound } from "next/navigation";
import SiteAlertForm from "@/app/admin/SiteAlertForm";
import { createClient } from "@/lib/supabase/server";
import type { SiteAlert } from "@/lib/supabase/types";

export default async function EditSiteAlertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_alerts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const alert = data as SiteAlert;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/alerts"
          className="text-sm text-teal underline-offset-2 hover:underline"
        >
          ← Alerts
        </Link>
        <h1 className="mt-3 font-heading text-3xl text-teal">Edit alert</h1>
      </div>
      <SiteAlertForm alert={alert} />
    </div>
  );
}
