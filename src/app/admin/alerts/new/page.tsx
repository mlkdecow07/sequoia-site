import Link from "next/link";
import SiteAlertForm from "@/app/admin/SiteAlertForm";

export default function NewSiteAlertPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/alerts"
          className="text-sm text-teal underline-offset-2 hover:underline"
        >
          ← Alerts
        </Link>
        <h1 className="mt-3 font-heading text-3xl text-teal">New alert</h1>
      </div>
      <SiteAlertForm />
    </div>
  );
}
