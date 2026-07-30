import { NextResponse } from "next/server";
import {
  backgroundQuestions,
  type EmployeeApplicationData,
  type EmploymentRecord,
} from "@/lib/employee-application-config";
import { resolveUploadContentType } from "@/lib/employment-uploads";
import { emailFrom, emailTo, escapeHtml, formatMultiline, resend } from "@/lib/resend";
import { createAdminClient } from "@/lib/supabase/admin";

const TEAL = "#408482";
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

type UploadLinks = {
  headshotUrl?: string | null;
  resumeUrl?: string | null;
  headshotFilename?: string;
  resumeFilename?: string;
};

function displayValue(value: string | undefined | null) {
  const trimmed = value?.trim();
  if (!trimmed) return "—";
  if (trimmed === "yes") return "Yes";
  if (trimmed === "no") return "No";
  return trimmed;
}

function formatAddress(parts: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}) {
  const line1 = parts.street?.trim() ?? "";
  const city = parts.city?.trim() ?? "";
  const stateZip = [parts.state?.trim(), parts.zip?.trim()].filter(Boolean).join(" ");
  const line2 = [city, stateZip].filter(Boolean).join(", ");
  const country = parts.country?.trim() ?? "";
  return [line1, line2, country].filter(Boolean).join("\n");
}

function row(label: string, value: string | undefined | null, multiline = false) {
  const raw = displayValue(value);
  const display =
    raw === "—"
      ? "—"
      : multiline
        ? formatMultiline(raw)
        : escapeHtml(raw);
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;vertical-align:top;width:38%;color:#555;font-size:13px;line-height:1.4;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;vertical-align:top;color:#222;font-size:14px;line-height:1.5;font-family:Arial,Helvetica,sans-serif;${multiline ? "white-space:pre-wrap;" : ""}">
        ${display}
      </td>
    </tr>`;
}

function section(title: string, body: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border:1px solid #e5e7eb;border-radius:6px;background:#ffffff;">
      <tr>
        <td style="padding:14px 18px;border-bottom:1px solid #e5e7eb;background:#f8faf9;">
          <h3 style="margin:0;font-size:15px;line-height:1.3;color:${TEAL};font-family:Arial,Helvetica,sans-serif;font-weight:700;">
            ${escapeHtml(title)}
          </h3>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 18px 12px;">
          ${body}
        </td>
      </tr>
    </table>`;
}

function rowsTable(rows: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
}

function linkButton(label: string, url: string) {
  return `
    <a href="${escapeHtml(url)}"
       style="display:inline-block;margin:0 10px 10px 0;padding:10px 16px;background:${TEAL};color:#ffffff;text-decoration:none;border-radius:4px;font-size:13px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">
      ${escapeHtml(label)}
    </a>`;
}

function employmentFilled(record: EmploymentRecord) {
  return Object.values(record).some((value) => value.trim());
}

function buildEmploymentHtml(data: EmployeeApplicationData) {
  const blocks = data.employmentHistory
    .map((record, index) => {
      if (!employmentFilled(record)) return "";
      return `
        <div style="margin:${index === 0 ? "0" : "16px"} 0 0;padding:${index === 0 ? "0" : "16px"} 0 0;border-top:${index === 0 ? "none" : "1px solid #eee"};">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#333;font-family:Arial,Helvetica,sans-serif;">
            Employer ${index + 1}${index === 0 ? " (most recent)" : ""}
          </p>
          ${rowsTable(
            [
              row("Employer", record.employerName),
              row("Position", record.position),
              row("Length of employment", record.lengthOfEmployment),
              row("Address", formatAddress(record), true),
              row("Supervisor", record.supervisorName),
              row("Supervisor email", record.supervisorEmail),
              row("Supervisor phone", record.supervisorPhone),
              row("Beginning salary", record.beginningSalary),
              row("Ending salary", record.endingSalary),
              row("Reason for leaving", record.reasonForLeaving, true),
            ].join(""),
          )}
        </div>`;
    })
    .filter(Boolean);

  if (blocks.length === 0) {
    return rowsTable(row("Employment history", "No employers listed"));
  }
  return blocks.join("");
}

function buildUploadsHtml(uploads: UploadLinks) {
  const parts: string[] = [];

  if (uploads.headshotUrl) {
    parts.push(linkButton("View headshot", uploads.headshotUrl));
  } else {
    parts.push(
      `<p style="margin:0 0 8px;font-size:14px;color:#555;font-family:Arial,Helvetica,sans-serif;">Headshot: attached to this email${uploads.headshotFilename ? ` (${escapeHtml(uploads.headshotFilename)})` : ""}</p>`,
    );
  }

  if (uploads.resumeUrl) {
    parts.push(linkButton("View resume", uploads.resumeUrl));
  } else {
    parts.push(
      `<p style="margin:0 0 8px;font-size:14px;color:#555;font-family:Arial,Helvetica,sans-serif;">Resume: attached to this email${uploads.resumeFilename ? ` (${escapeHtml(uploads.resumeFilename)})` : ""}</p>`,
    );
  }

  parts.push(
    `<p style="margin:12px 0 0;font-size:12px;color:#777;font-family:Arial,Helvetica,sans-serif;">Files are also attached to this email. Signed links expire in 7 days.</p>`,
  );

  return parts.join("");
}

function buildApplicationHtml(
  data: EmployeeApplicationData,
  uploads: UploadLinks = {},
) {
  const personal = rowsTable(
    [
      row("Full name", data.fullName),
      row("Email", data.email),
      row("Phone", data.phone),
      row("Date of birth", data.dateOfBirth),
      row("Address", formatAddress(data), true),
      row("Marital status", data.maritalStatus),
    ].join(""),
  );

  const position = rowsTable(
    [
      row("Position applied for", data.position),
      row("How did you hear about us", data.heardAbout),
    ].join(""),
  );

  const eligibility = rowsTable(
    [
      row("Related to employee", data.relatedToEmployee),
      row("Relation details", data.relationDetails, true),
      row("Authorized to work in US", data.authorizedToWork),
      row("Over 18", data.over18),
      row("Currently employed", data.currentlyEmployed),
      row("May contact current employer", data.contactCurrentEmployer),
      row("Available date", data.availableDate),
      row("Dismissed from a position", data.dismissedFromPosition),
      row("Dismissal explanation", data.dismissalExplanation, true),
      row("Activities / sports", data.activitiesSports, true),
    ].join(""),
  );

  const faith = `
    ${rowsTable(
      [
        row("Church member", data.churchMember),
        row("Church name", data.churchName),
        row("Years at church", data.churchYears),
      ].join(""),
    )}
    <p style="margin:16px 0 6px;font-size:13px;color:#555;font-family:Arial,Helvetica,sans-serif;">Christian testimony</p>
    <div style="padding:12px 14px;background:#f8faf9;border:1px solid #e5e7eb;border-radius:4px;font-size:14px;line-height:1.55;color:#222;font-family:Arial,Helvetica,sans-serif;">
      ${data.christianTestimony?.trim() ? formatMultiline(data.christianTestimony.trim()) : "—"}
    </div>`;

  const education = rowsTable(
    [
      row("High school", data.highSchool),
      row("Diploma / GED", data.hasDiploma),
      row("Post-secondary", data.postSecondary, true),
      row("ACSI certificate", data.hasAcsiCert),
      row("ACSI details", data.acsiDetails, true),
      row("State certificate", data.hasStateCert),
      row("State cert state", data.stateCertState),
      row("State cert expiration", data.stateCertExpiration),
    ].join(""),
  );

  const background = rowsTable(
    [
      ...backgroundQuestions.map((question, index) =>
        row(question, data.backgroundAnswers[index]),
      ),
      row("Additional explanation", data.backgroundExplanation, true),
    ].join(""),
  );

  const agreement = rowsTable(
    [
      row("Agreement accepted", data.agreementAccepted ? "Yes" : "No"),
      row("Signature name", data.signatureName),
      row("Signature", data.signature),
      row("Signature date", data.signatureDate),
    ].join(""),
  );

  return `
    <div style="margin:0;padding:0;background:#f3f4f6;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;">
        <tr>
          <td style="padding:24px 12px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              <tr>
                <td style="padding:28px 24px;background:${TEAL};">
                  <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.85);font-family:Arial,Helvetica,sans-serif;font-weight:700;">
                    Sequoia Christian School
                  </p>
                  <h1 style="margin:0 0 8px;font-size:22px;line-height:1.25;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
                    New employment application
                  </h1>
                  <p style="margin:0;font-size:16px;line-height:1.4;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
                    ${escapeHtml(data.fullName)}
                  </p>
                  <p style="margin:6px 0 0;font-size:13px;line-height:1.4;color:rgba(255,255,255,0.9);font-family:Arial,Helvetica,sans-serif;">
                    ${escapeHtml(displayValue(data.position))}
                    ${data.email?.trim() ? ` · ${escapeHtml(data.email.trim())}` : ""}
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px;">
                  ${section("Personal information", personal)}
                  ${section("Position", position)}
                  ${section("Eligibility", eligibility)}
                  ${section("Faith background", faith)}
                  ${section("Education & credentials", education)}
                  ${section("Experience", buildEmploymentHtml(data))}
                  ${section("Background information", background)}
                  ${section("Certification & agreement", agreement)}
                  ${section("Uploads", buildUploadsHtml(uploads))}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`;
}

function textRow(label: string, value: string | undefined | null) {
  return `${label}: ${displayValue(value)}`;
}

function buildApplicationText(data: EmployeeApplicationData, uploads: UploadLinks = {}) {
  const lines: string[] = [
    "New employment application",
    data.fullName,
    `${displayValue(data.position)} · ${displayValue(data.email)}`,
    "",
    "— Personal information —",
    textRow("Full name", data.fullName),
    textRow("Email", data.email),
    textRow("Phone", data.phone),
    textRow("Date of birth", data.dateOfBirth),
    textRow("Address", formatAddress(data)),
    textRow("Marital status", data.maritalStatus),
    "",
    "— Position —",
    textRow("Position applied for", data.position),
    textRow("How did you hear about us", data.heardAbout),
    "",
    "— Eligibility —",
    textRow("Related to employee", data.relatedToEmployee),
    textRow("Relation details", data.relationDetails),
    textRow("Authorized to work in US", data.authorizedToWork),
    textRow("Over 18", data.over18),
    textRow("Currently employed", data.currentlyEmployed),
    textRow("May contact current employer", data.contactCurrentEmployer),
    textRow("Available date", data.availableDate),
    textRow("Dismissed from a position", data.dismissedFromPosition),
    textRow("Dismissal explanation", data.dismissalExplanation),
    textRow("Activities / sports", data.activitiesSports),
    "",
    "— Faith background —",
    textRow("Church member", data.churchMember),
    textRow("Church name", data.churchName),
    textRow("Years at church", data.churchYears),
    "Christian testimony:",
    displayValue(data.christianTestimony),
    "",
    "— Education & credentials —",
    textRow("High school", data.highSchool),
    textRow("Diploma / GED", data.hasDiploma),
    textRow("Post-secondary", data.postSecondary),
    textRow("ACSI certificate", data.hasAcsiCert),
    textRow("ACSI details", data.acsiDetails),
    textRow("State certificate", data.hasStateCert),
    textRow("State cert state", data.stateCertState),
    textRow("State cert expiration", data.stateCertExpiration),
    "",
    "— Experience —",
  ];

  data.employmentHistory.forEach((record, index) => {
    if (!employmentFilled(record)) return;
    lines.push(
      "",
      `Employer ${index + 1}${index === 0 ? " (most recent)" : ""}`,
      textRow("Employer", record.employerName),
      textRow("Position", record.position),
      textRow("Length of employment", record.lengthOfEmployment),
      textRow("Address", formatAddress(record)),
      textRow("Supervisor", record.supervisorName),
      textRow("Supervisor email", record.supervisorEmail),
      textRow("Supervisor phone", record.supervisorPhone),
      textRow("Beginning salary", record.beginningSalary),
      textRow("Ending salary", record.endingSalary),
      textRow("Reason for leaving", record.reasonForLeaving),
    );
  });

  lines.push("", "— Background information —");
  backgroundQuestions.forEach((question, index) => {
    lines.push(textRow(question, data.backgroundAnswers[index]));
  });
  lines.push(textRow("Additional explanation", data.backgroundExplanation));

  lines.push(
    "",
    "— Certification & agreement —",
    textRow("Agreement accepted", data.agreementAccepted ? "Yes" : "No"),
    textRow("Signature name", data.signatureName),
    textRow("Signature", data.signature),
    textRow("Signature date", data.signatureDate),
    "",
    "— Uploads —",
    uploads.headshotUrl
      ? `Headshot: ${uploads.headshotUrl}`
      : `Headshot: attached${uploads.headshotFilename ? ` (${uploads.headshotFilename})` : ""}`,
    uploads.resumeUrl
      ? `Resume: ${uploads.resumeUrl}`
      : `Resume: attached${uploads.resumeFilename ? ` (${uploads.resumeFilename})` : ""}`,
  );

  return lines.join("\n");
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

    const [headshotSigned, resumeSigned] = await Promise.all([
      supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(headshotPath, SIGNED_URL_TTL_SECONDS),
      supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(resumePath, SIGNED_URL_TTL_SECONDS),
    ]);

    if (headshotSigned.error) {
      console.error("employment headshot signed URL failed:", headshotSigned.error);
    }
    if (resumeSigned.error) {
      console.error("employment resume signed URL failed:", resumeSigned.error);
    }

    const uploads: UploadLinks = {
      headshotUrl: headshotSigned.data?.signedUrl ?? null,
      resumeUrl: resumeSigned.data?.signedUrl ?? null,
      headshotFilename: headshot.filename,
      resumeFilename: resume.filename,
    };

    const applicantName = data.fullName.trim();
    const positionLabel = data.position?.trim();
    const subject = positionLabel
      ? `New employment application: ${applicantName} (${positionLabel})`
      : `New employment application: ${applicantName}`;

    const { data: result, error } = await resend.emails.send({
      from: `Sequoia Christian School <${emailFrom}>`,
      to: emailTo,
      replyTo: data.email,
      subject,
      html: buildApplicationHtml(data, uploads),
      text: buildApplicationText(data, uploads),
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
