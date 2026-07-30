import SiteAlertForm from "@/app/admin/SiteAlertForm";

export default function NewSiteAlertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl uppercase tracking-widest text-teal">
          New Alert
        </h1>
      </div>
      <SiteAlertForm />
    </div>
  );
}
