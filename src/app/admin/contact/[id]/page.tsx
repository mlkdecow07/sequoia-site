import { notFound } from "next/navigation";
import StatusForm from "@/app/admin/StatusForm";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionStatus } from "@/lib/supabase/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminContactDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-teal">{data.name}</h1>
        <p className="mt-1 text-sm text-gray-600">{formatDate(data.created_at)}</p>
      </div>

      <StatusForm
        id={data.id}
        status={data.status as SubmissionStatus}
        kind="contact"
      />

      <dl className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-teal">
            Email
          </dt>
          <dd className="mt-1">
            <a
              href={`mailto:${data.email}`}
              className="text-teal underline-offset-2 hover:underline"
            >
              {data.email}
            </a>
          </dd>
        </div>
        {data.source ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-teal">
              Source
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{data.source}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-teal">
            Message
          </dt>
          <dd className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {data.message}
          </dd>
        </div>
      </dl>
    </div>
  );
}
