"use client";

import { useId, useState, type FormEvent } from "react";

const GRADE_OPTIONS = [
  "Preschool (3-year-olds)",
  "Pre-K (4-year-olds)",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
] as const;

const HEAR_ABOUT_OPTIONS = [
  "Friend or family",
  "Church / Life Center",
  "Online search",
  "Social media",
  "School event / Open House",
  "Other",
] as const;

const labelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-widest text-teal";
const fieldClassName =
  "w-full rounded border border-teal/20 bg-cream px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal focus:bg-white";
const sectionHeadingClassName =
  "font-heading text-sm font-semibold tracking-wide text-gray-800 sm:text-base";
const secondaryButtonClassName =
  "inline-flex items-center justify-center gap-2 rounded border border-teal/25 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal transition hover:border-teal/40 hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-40";

type StudentFields = {
  firstName: string;
  lastName: string;
  gradeInterest: string;
};

function RequiredMark() {
  return (
    <span className="text-teal" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function createStudentKey() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildVisitMessage(fields: {
  phone: string;
  students: StudentFields[];
  preferredVisit: string;
  hearAbout: string;
  comments: string;
}) {
  const lines = ["Campus visit inquiry", "", `Phone: ${fields.phone}`, ""];

  if (fields.students.length === 1) {
    const student = fields.students[0];
    lines.push(
      `Student: ${student.firstName} ${student.lastName}`.trim(),
      `Grade interest: ${student.gradeInterest}`,
    );
  } else {
    lines.push(`Students (${fields.students.length}):`);
    fields.students.forEach((student, index) => {
      lines.push(
        `${index + 1}. ${student.firstName} ${student.lastName}`.trim(),
        `   Grade interest: ${student.gradeInterest}`,
      );
    });
  }

  lines.push("", `Preferred visit timing: ${fields.preferredVisit}`);

  if (fields.hearAbout) {
    lines.push(`How did you hear about us: ${fields.hearAbout}`);
  }

  if (fields.comments) {
    lines.push("", "Additional comments:", fields.comments);
  }

  return lines.join("\n");
}

export default function VisitInquiryForm() {
  const idPrefix = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [studentKeys, setStudentKeys] = useState<string[]>(() => [createStudentKey()]);

  const addStudent = () => {
    setStudentKeys((prev) => [...prev, createStudentKey()]);
  };

  const removeStudent = (key: string) => {
    setStudentKeys((prev) => (prev.length <= 1 ? prev : prev.filter((k) => k !== key)));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const parentFirstName = String(formData.get("parentFirstName") ?? "").trim();
    const parentLastName = String(formData.get("parentLastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const preferredVisit = String(formData.get("preferredVisit") ?? "").trim();
    const hearAbout = String(formData.get("hearAbout") ?? "").trim();
    const comments = String(formData.get("comments") ?? "").trim();

    const firstNames = formData.getAll("studentFirstName").map((v) => String(v).trim());
    const lastNames = formData.getAll("studentLastName").map((v) => String(v).trim());
    const gradeInterests = formData.getAll("gradeInterest").map((v) => String(v).trim());

    const students: StudentFields[] = firstNames.map((firstName, index) => ({
      firstName,
      lastName: lastNames[index] ?? "",
      gradeInterest: gradeInterests[index] ?? "",
    }));

    const name = `${parentFirstName} ${parentLastName}`.trim();
    const message = buildVisitMessage({
      phone,
      students,
      preferredVisit,
      hearAbout,
      comments,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source: "visit",
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to send your message right now.");
      }

      form.reset();
      setStudentKeys([createStudentKey()]);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
    }
  };

  if (status === "sent") {
    return (
      <p
        className="rounded border border-teal/20 bg-teal/5 px-4 py-3 text-sm text-teal"
        role="status"
      >
        Thank you — your visit request has been sent. We&apos;ll follow up to arrange a time.
      </p>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <fieldset className="space-y-4">
        <legend className={sectionHeadingClassName}>Parent / Guardian Information</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-parent-first`} className={labelClassName}>
              First Name
              <RequiredMark />
            </label>
            <input
              id={`${idPrefix}-parent-first`}
              type="text"
              name="parentFirstName"
              required
              autoComplete="given-name"
              disabled={status === "sending"}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-parent-last`} className={labelClassName}>
              Last Name
              <RequiredMark />
            </label>
            <input
              id={`${idPrefix}-parent-last`}
              type="text"
              name="parentLastName"
              required
              autoComplete="family-name"
              disabled={status === "sending"}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
              Email Address
              <RequiredMark />
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              name="email"
              required
              autoComplete="email"
              disabled={status === "sending"}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
              Phone
              <RequiredMark />
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              disabled={status === "sending"}
              className={fieldClassName}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className={sectionHeadingClassName}>Student Information</legend>

        <div className="space-y-5">
          {studentKeys.map((key, index) => {
            const studentLabel =
              studentKeys.length > 1 ? `Student ${index + 1}` : null;

            return (
              <div
                key={key}
                className={
                  index > 0 ? "space-y-4 border-t border-teal/15 pt-5" : "space-y-4"
                }
              >
                {studentLabel || index > 0 ? (
                  <div className="flex items-center justify-between gap-3">
                    {studentLabel ? (
                      <p className="text-xs font-semibold uppercase tracking-widest text-teal/70">
                        {studentLabel}
                      </p>
                    ) : (
                      <span />
                    )}
                    {index > 0 ? (
                      <button
                        type="button"
                        onClick={() => removeStudent(key)}
                        disabled={status === "sending"}
                        className="shrink-0 text-xs font-medium text-gray-500 underline-offset-2 transition hover:text-teal hover:underline disabled:opacity-40"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ) : null}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${idPrefix}-student-first-${key}`}
                      className={labelClassName}
                    >
                      Student First Name
                      <RequiredMark />
                    </label>
                    <input
                      id={`${idPrefix}-student-first-${key}`}
                      type="text"
                      name="studentFirstName"
                      required
                      disabled={status === "sending"}
                      className={fieldClassName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${idPrefix}-student-last-${key}`}
                      className={labelClassName}
                    >
                      Student Last Name
                      <RequiredMark />
                    </label>
                    <input
                      id={`${idPrefix}-student-last-${key}`}
                      type="text"
                      name="studentLastName"
                      required
                      disabled={status === "sending"}
                      className={fieldClassName}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${idPrefix}-grade-${key}`} className={labelClassName}>
                      Grade Level of Interest
                      <RequiredMark />
                    </label>
                    <select
                      id={`${idPrefix}-grade-${key}`}
                      name="gradeInterest"
                      required
                      defaultValue=""
                      disabled={status === "sending"}
                      className={fieldClassName}
                    >
                      <option value="" disabled>
                        Select a grade
                      </option>
                      {GRADE_OPTIONS.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <button
            type="button"
            onClick={addStudent}
            disabled={status === "sending"}
            className={secondaryButtonClassName}
          >
            + Add Student
          </button>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className={sectionHeadingClassName}>Visit Details</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-preferred`} className={labelClassName}>
              Preferred Visit Date or Timing
              <RequiredMark />
            </label>
            <input
              id={`${idPrefix}-preferred`}
              type="text"
              name="preferredVisit"
              required
              placeholder="e.g. weekday mornings, or a specific date"
              disabled={status === "sending"}
              className={fieldClassName}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-hear`} className={labelClassName}>
              How Did You Hear About Us?
            </label>
            <select
              id={`${idPrefix}-hear`}
              name="hearAbout"
              defaultValue=""
              disabled={status === "sending"}
              className={fieldClassName}
            >
              <option value="">Select an option (optional)</option>
              {HEAR_ABOUT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-comments`} className={labelClassName}>
              Additional Comments
            </label>
            <textarea
              id={`${idPrefix}-comments`}
              name="comments"
              rows={4}
              disabled={status === "sending"}
              placeholder="Questions, other children visiting, or anything else we should know"
              className={`${fieldClassName} resize-y`}
            />
          </div>
        </div>
      </fieldset>

      {errorMessage ? (
        <p
          className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded bg-teal px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-teal-dark disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Request a Visit"}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  );
}
