import Link from "next/link";
import { notFound } from "next/navigation";
import StatusForm from "@/app/admin/StatusForm";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionStatus } from "@/lib/supabase/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

const STORAGE_BUCKET = "employment-applications";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return JSON.stringify(value, null, 2);
}

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-widest text-teal">
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-800">
        {displayValue(value)}
      </dd>
    </div>
  );
}

export default async function AdminEmploymentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("employment_applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const application = (data.application ?? {}) as Record<string, unknown>;

  let headshotUrl: string | null = null;
  let resumeUrl: string | null = null;

  if (data.headshot_path) {
    const { data: signed } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(data.headshot_path, 60 * 60);
    headshotUrl = signed?.signedUrl ?? null;
  }

  if (data.resume_path) {
    const { data: signed } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(data.resume_path, 60 * 60);
    resumeUrl = signed?.signedUrl ?? null;
  }

  const employmentHistory = Array.isArray(application.employmentHistory)
    ? application.employmentHistory
    : [];
  const backgroundAnswers = Array.isArray(application.backgroundAnswers)
    ? application.backgroundAnswers
    : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">
          <Link href="/admin" className="text-teal underline-offset-2 hover:underline">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/admin/employment"
            className="text-teal underline-offset-2 hover:underline"
          >
            Employment
          </Link>
        </p>
        <h1 className="mt-2 font-heading text-3xl text-teal">
          {data.applicant_name ?? "Application"}
        </h1>
        <p className="mt-1 text-sm text-gray-600">{formatDate(data.created_at)}</p>
      </div>

      <StatusForm
        id={data.id}
        status={data.status as SubmissionStatus}
        kind="employment"
      />

      <section className="space-y-3 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Files</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {headshotUrl ? (
            <a
              href={headshotUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-teal/25 px-3 py-1.5 font-semibold uppercase tracking-widest text-teal hover:bg-teal/5"
            >
              Download headshot
            </a>
          ) : (
            <span className="text-gray-500">No headshot</span>
          )}
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-teal/25 px-3 py-1.5 font-semibold uppercase tracking-widest text-teal hover:bg-teal/5"
            >
              Download resume
            </a>
          ) : (
            <span className="text-gray-500">No resume</span>
          )}
        </div>
      </section>

      <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Personal</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={application.fullName} />
          <Field label="Email" value={application.email ?? data.applicant_email} />
          <Field label="Phone" value={application.phone} />
          <Field label="Date of birth" value={application.dateOfBirth} />
          <Field label="Street" value={application.street} />
          <Field label="City" value={application.city} />
          <Field label="State" value={application.state} />
          <Field label="ZIP" value={application.zip} />
          <Field label="Country" value={application.country} />
          <Field label="Marital status" value={application.maritalStatus} />
          <Field label="Position" value={application.position} />
          <Field label="How heard about us" value={application.heardAbout} />
        </dl>
      </section>

      <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Eligibility</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Related to employee" value={application.relatedToEmployee} />
          <Field label="Relation details" value={application.relationDetails} />
          <Field label="Authorized to work" value={application.authorizedToWork} />
          <Field label="Over 18" value={application.over18} />
          <Field label="Currently employed" value={application.currentlyEmployed} />
          <Field
            label="Contact current employer"
            value={application.contactCurrentEmployer}
          />
          <Field label="Available date" value={application.availableDate} />
          <Field
            label="Dismissed from a position"
            value={application.dismissedFromPosition}
          />
          <Field label="Dismissal explanation" value={application.dismissalExplanation} />
          <Field label="Activities / sports" value={application.activitiesSports} />
        </dl>
      </section>

      <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Faith</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Church member" value={application.churchMember} />
          <Field label="Church name" value={application.churchName} />
          <Field label="Years at church" value={application.churchYears} />
          <div className="sm:col-span-2">
            <Field label="Christian testimony" value={application.christianTestimony} />
          </div>
        </dl>
      </section>

      <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Education</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="High school" value={application.highSchool} />
          <Field label="Diploma / GED" value={application.hasDiploma} />
          <Field label="Post-secondary" value={application.postSecondary} />
          <Field label="ACSI certificate" value={application.hasAcsiCert} />
          <Field label="ACSI details" value={application.acsiDetails} />
          <Field label="State certificate" value={application.hasStateCert} />
          <Field label="State cert state" value={application.stateCertState} />
          <Field label="State cert expiration" value={application.stateCertExpiration} />
        </dl>
      </section>

      {employmentHistory.length > 0 ? (
        <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
          <h2 className="font-heading text-xl text-teal">Employment history</h2>
          <div className="space-y-6">
            {employmentHistory.map((record, index) => {
              if (!record || typeof record !== "object") return null;
              const r = record as Record<string, unknown>;
              return (
                <dl key={index} className="grid gap-4 border-t border-teal/10 pt-4 sm:grid-cols-2">
                  <Field label="Employer" value={r.employerName} />
                  <Field label="Position" value={r.position} />
                  <Field label="Length" value={r.lengthOfEmployment} />
                  <Field
                    label="Address"
                    value={[r.street, r.city, r.state, r.zip].filter(Boolean).join(", ")}
                  />
                  <Field label="Supervisor" value={r.supervisorName} />
                  <Field label="Supervisor email" value={r.supervisorEmail} />
                  <Field label="Supervisor phone" value={r.supervisorPhone} />
                  <Field label="Beginning salary" value={r.beginningSalary} />
                  <Field label="Ending salary" value={r.endingSalary} />
                  <Field label="Reason for leaving" value={r.reasonForLeaving} />
                </dl>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Background</h2>
        <dl className="space-y-4">
          {backgroundAnswers.map((answer, index) => (
            <Field key={index} label={`Question ${index + 1}`} value={answer} />
          ))}
          <Field label="Explanation" value={application.backgroundExplanation} />
        </dl>
      </section>

      <section className="space-y-4 rounded border border-teal/15 bg-white px-5 py-5">
        <h2 className="font-heading text-xl text-teal">Agreement</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Accepted" value={application.agreementAccepted} />
          <Field label="Signature name" value={application.signatureName} />
          <Field label="Signature" value={application.signature} />
          <Field label="Signature date" value={application.signatureDate} />
        </dl>
      </section>
    </div>
  );
}
