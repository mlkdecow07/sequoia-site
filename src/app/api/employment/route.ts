import { NextResponse } from "next/server";
import {
  backgroundQuestions,
  type EmployeeApplicationData,
} from "@/lib/employee-application-config";
import { resolveUploadContentType } from "@/lib/employment-uploads";
import { emailFrom, emailTo, escapeHtml, formatMultiline, resend } from "@/lib/resend";
import { createAdminClient } from "@/lib/supabase/admin";

function row(label: string, value: string | undefined | null) {
  const display = value?.trim() ? escapeHtml(value.trim()) : "—";
  return `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;font-weight:600;">${escapeHtml(label)}</td><td style="padding:4px 0;">${display}</td></tr>`;
}

function section(title: string, rows: string) {
  return `
    <h3 style="margin:24px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">${escapeHtml(title)}</h3>
    <table style="border-collapse:collapse;width:100%;">${rows}</table>
  `;
}

function buildApplicationHtml(data: EmployeeApplicationData) {
  const personal = [
    row("Full name", data.fullName),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Date of birth", data.dateOfBirth),
    row("Street", data.street),
    row("City", data.city),
    row("State", data.state),
    row("ZIP", data.zip),
    row("Country", data.country),
    row("Marital status", data.maritalStatus),
    row("Position", data.position),
    row("How did you hear about us", data.heardAbout),
  ].join("");

  const eligibility = [
    row("Related to employee", data.relatedToEmployee),
    row("Relation details", data.relationDetails),
    row("Authorized to work in US", data.authorizedToWork),
    row("Over 18", data.over18),
    row("Currently employed", data.currentlyEmployed),
    row("May contact current employer", data.contactCurrentEmployer),
    row("Available date", data.availableDate),
    row("Dismissed from a position", data.dismissedFromPosition),
    row("Dismissal explanation", data.dismissalExplanation),
    row("Activities / sports", data.activitiesSports),
  ].join("");

  const faith = [
    row("Christian testimony", data.christianTestimony),
    row("Church member", data.churchMember),
    row("Church name", data.churchName),
    row("Years at church", data.churchYears),
  ].join("");

  const education = [
    row("High school", data.highSchool),
    row("Diploma / GED", data.hasDiploma),
    row("Post-secondary", data.postSecondary),
    row("ACSI certificate", data.hasAcsiCert),
    row("ACSI details", data.acsiDetails),
    row("State certificate", data.hasStateCert),
    row("State cert state", data.stateCertState),
    row("State cert expiration", data.stateCertExpiration),
  ].join("");

  const employment = data.employmentHistory
    .map((record, index) => {
      const filled = Object.values(record).some((value) => value.trim());
      if (!filled) return "";
      return section(
        `Employment ${index + 1}`,
        [
          row("Employer", record.employerName),
          row("Position", record.position),
          row("Length of employment", record.lengthOfEmployment),
          row("Address", `${record.street}, ${record.city}, ${record.state} ${record.zip}`),
          row("Supervisor", record.supervisorName),
          row("Supervisor email", record.supervisorEmail),
          row("Supervisor phone", record.supervisorPhone),
          row("Beginning salary", record.beginningSalary),
          row("Ending salary", record.endingSalary),
          row("Reason for leaving", record.reasonForLeaving),
        ].join(""),
      );
    })
    .join("");

  const background = backgroundQuestions
    .map((question, index) => row(question, data.backgroundAnswers[index]))
    .join("");

  const agreement = [
    row("Agreement accepted", data.agreementAccepted ? "Yes" : "No"),
    row("Signature name", data.signatureName),
    row("Signature", data.signature),
    row("Signature date", data.signatureDate),
  ].join("");

  return `
    <h2>New employee application</h2>
    <p><strong>Applicant:</strong> ${escapeHtml(data.fullName)} (${escapeHtml(data.email)})</p>
    ${section("Personal information", personal)}
    ${section("Eligibility", eligibility)}
    ${section("Faith background", faith)}
    ${section("Education & credentials", education)}
    ${employment}
    ${section("Background questions", background)}
    ${section(
      "Background explanation",
      row("Explanation", data.backgroundExplanation),
    )}
    ${section("Agreement & signature", agreement)}
    <p style="margin-top:24px;"><em>Christian testimony (full text):</em></p>
    <p>${formatMultiline(data.christianTestimony || "")}</p>
  `;
}

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024; // 4MB per file (Vercel body limit ~4.5MB total)
const STORAGE_BUCKET = "employment-applications";

function fileExtension(filename: string, mimeType?: string) {
  const fromName = filename.includes(".")
    ? filename.slice(filename.lastIndexOf(".")).toLowerCase()
    : "";
  if (fromName && fromName.length <= 8) return fromName;

  const mimeMap: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
  };
  return mimeMap[mimeType ?? ""] ?? "";
}

async function parseUpload(
  entry: FormDataEntryValue | null,
  label: string,
  kind: "headshot" | "resume",
) {
  if (!entry || typeof entry === "string") {
    throw new Error(`${label} is required.`);
  }

  if (!(entry instanceof Blob) || entry.size === 0) {
    throw new Error(`${label} is required.`);
  }

  if (entry.size > MAX_ATTACHMENT_BYTES) {
    throw new Error(`${label} must be 4MB or smaller.`);
  }

  const buffer = Buffer.from(await entry.arrayBuffer());
  const filename =
    "name" in entry && typeof entry.name === "string" && entry.name.trim()
      ? entry.name.trim()
      : label.toLowerCase().replace(/\s+/g, "-");

  const contentType = resolveUploadContentType(filename, entry.type, kind);

  return {
    filename,
    buffer,
    contentType,
    // Resend JSON API requires base64 strings — raw Buffers serialize incorrectly.
    content: buffer.toString("base64"),
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawApplication = formData.get("application");

    if (typeof rawApplication !== "string") {
      return NextResponse.json(
        { error: "Application data is missing." },
        { status: 400 },
      );
    }

    const data = JSON.parse(rawApplication) as EmployeeApplicationData;

    if (!data.fullName?.trim() || !data.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const headshot = await parseUpload(
      formData.get("headshot"),
      "Headshot",
      "headshot",
    );
    const resume = await parseUpload(formData.get("resume"), "Resume", "resume");

    const supabase = createAdminClient();
    const { data: row, error: insertError } = await supabase
      .from("employment_applications")
      .insert({
        application: data,
        applicant_name: data.fullName.trim(),
        applicant_email: data.email.trim(),
      })
      .select("id")
      .single();

    if (insertError || !row) {
      console.error("employment_applications insert failed:", insertError);
      return NextResponse.json(
        { error: "Unable to save your application right now." },
        { status: 500 },
      );
    }

    const applicationId = row.id as string;
    const headshotPath = `${applicationId}/headshot${fileExtension(headshot.filename, headshot.contentType)}`;
    const resumePath = `${applicationId}/resume${fileExtension(resume.filename, resume.contentType)}`;

    const [headshotUpload, resumeUpload] = await Promise.all([
      supabase.storage.from(STORAGE_BUCKET).upload(headshotPath, headshot.buffer, {
        contentType: headshot.contentType,
        upsert: true,
      }),
      supabase.storage.from(STORAGE_BUCKET).upload(resumePath, resume.buffer, {
        contentType: resume.contentType,
        upsert: true,
      }),
    ]);

    if (headshotUpload.error || resumeUpload.error) {
      console.error("employment file upload failed:", {
        applicationId,
        headshotPath,
        resumePath,
        headshotContentType: headshot.contentType,
        resumeContentType: resume.contentType,
        headshot: headshotUpload.error,
        resume: resumeUpload.error,
      });

      // Avoid orphan rows when storage rejects files after insert.
      const { error: cleanupError } = await supabase
        .from("employment_applications")
        .delete()
        .eq("id", applicationId);
      if (cleanupError) {
        console.error("employment orphan cleanup failed:", cleanupError);
      }

      const storageMessage =
        headshotUpload.error?.message || resumeUpload.error?.message || "";
      const clientHint = /mime type|content-type/i.test(storageMessage)
        ? " One of the files has an unsupported type. Use JPG/PNG for the headshot and PDF/DOC/DOCX for the resume."
        : "";

      return NextResponse.json(
        {
          error: `Unable to upload application files right now.${clientHint}`,
        },
        { status: 500 },
      );
    }

    const { error: pathUpdateError } = await supabase
      .from("employment_applications")
      .update({
        headshot_path: headshotPath,
        resume_path: resumePath,
      })
      .eq("id", applicationId);

    if (pathUpdateError) {
      console.error("employment path update failed:", pathUpdateError);
      return NextResponse.json(
        { error: "Unable to finalize your application right now." },
        { status: 500 },
      );
    }

    const { data: result, error } = await resend.emails.send({
      from: `Sequoia Christian School <${emailFrom}>`,
      to: emailTo,
      replyTo: data.email,
      subject: `Employee application: ${data.fullName}`,
      html: buildApplicationHtml(data),
      attachments: [
        {
          filename: headshot.filename,
          content: headshot.content,
          contentType: headshot.contentType,
        },
        {
          filename: resume.filename,
          content: resume.content,
          contentType: resume.contentType,
        },
      ],
    });

    if (error) {
      console.error("employment email send failed after save:", error);
      return NextResponse.json({
        saved: true,
        emailSent: false,
        id: applicationId,
        warning: "Application saved, but email notification failed.",
      });
    }

    return NextResponse.json({
      saved: true,
      emailSent: true,
      id: applicationId,
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit your application right now.";
    const status =
      message.includes("required") ||
      message.includes("smaller") ||
      message.includes("must be a")
        ? 400
        : 500;
    if (status === 500) {
      console.error("employment route error:", error);
    }
    return NextResponse.json({ error: message }, { status });
  }
}
