"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  agreementStatements,
  backgroundQuestions,
  formSteps,
  initialApplicationData,
  maritalStatusOptions,
  positionOptions,
  type EmployeeApplicationData,
  type EmploymentRecord,
} from "@/lib/employee-application-config";
import {
  HEADSHOT_ACCEPT,
  RESUME_ACCEPT,
  resolveUploadContentType,
} from "@/lib/employment-uploads";

const inputClass =
  "w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-teal";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-800";
const sectionClass = "space-y-4";

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {children}
      {required ? <span className="text-teal"> *</span> : null}
    </label>
  );
}

function YesNoField({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: "" | "yes" | "no";
  onChange: (value: "yes" | "no") => void;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className={labelClass}>
        {label}
        {required ? <span className="text-teal"> *</span> : null}
      </legend>
      <div className="flex gap-6">
        {(["yes", "no"] as const).map((option) => (
          <label key={option} className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required && !value}
              className="h-4 w-4 accent-teal"
            />
            {option === "yes" ? "Yes" : "No"}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function EmploymentFields({
  title,
  record,
  onChange,
  required,
}: {
  title: string;
  record: EmploymentRecord;
  onChange: (record: EmploymentRecord) => void;
  required?: boolean;
}) {
  const update = (field: keyof EmploymentRecord, value: string) => {
    onChange({ ...record, [field]: value });
  };

  return (
    <div className="space-y-4 rounded border border-gray-100 bg-cream/40 p-4 sm:p-6">
      <h3 className="type-subsection-title">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required={required}>Name of Employer</FieldLabel>
          <input
            type="text"
            value={record.employerName}
            onChange={(e) => update("employerName", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required={required}>Position</FieldLabel>
          <input
            type="text"
            value={record.position}
            onChange={(e) => update("position", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel required={required}>Length of Employment</FieldLabel>
          <input
            type="text"
            value={record.lengthOfEmployment}
            onChange={(e) => update("lengthOfEmployment", e.target.value)}
            required={required}
            className={inputClass}
            placeholder="e.g. Jan 2020 – Present"
          />
        </div>
      </div>
      <div>
        <FieldLabel required={required}>Address</FieldLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={record.street}
            onChange={(e) => update("street", e.target.value)}
            required={required}
            className={inputClass}
            placeholder="Street"
          />
          <input
            type="text"
            value={record.city}
            onChange={(e) => update("city", e.target.value)}
            required={required}
            className={inputClass}
            placeholder="City"
          />
          <input
            type="text"
            value={record.state}
            onChange={(e) => update("state", e.target.value)}
            required={required}
            className={inputClass}
            placeholder="State"
          />
          <input
            type="text"
            value={record.zip}
            onChange={(e) => update("zip", e.target.value)}
            required={required}
            className={inputClass}
            placeholder="Zip Code"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required={required}>Name of Supervisor</FieldLabel>
          <input
            type="text"
            value={record.supervisorName}
            onChange={(e) => update("supervisorName", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required={required}>Supervisor&apos;s Email</FieldLabel>
          <input
            type="email"
            value={record.supervisorEmail}
            onChange={(e) => update("supervisorEmail", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required={required}>Supervisor&apos;s Phone</FieldLabel>
          <input
            type="tel"
            value={record.supervisorPhone}
            onChange={(e) => update("supervisorPhone", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required={required}>Beginning Salary</FieldLabel>
          <input
            type="number"
            value={record.beginningSalary}
            onChange={(e) => update("beginningSalary", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required={required}>Ending Salary</FieldLabel>
          <input
            type="number"
            value={record.endingSalary}
            onChange={(e) => update("endingSalary", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel required={required}>Reason for leaving</FieldLabel>
          <input
            type="text"
            value={record.reasonForLeaving}
            onChange={(e) => update("reasonForLeaving", e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

export default function EmployeeApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<EmployeeApplicationData>(initialApplicationData);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const MAX_FILE_BYTES = 4 * 1024 * 1024;

  const assignUpload = (
    setter: (file: File | null) => void,
    file: File | undefined,
    label: string,
    kind: "headshot" | "resume",
  ) => {
    if (!file) {
      setter(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setter(null);
      setStepError(`${label} must be 4MB or smaller.`);
      return;
    }
    try {
      resolveUploadContentType(file.name, file.type, kind);
    } catch (error) {
      setter(null);
      setStepError(
        error instanceof Error ? error.message : `${label} file type is not supported.`,
      );
      return;
    }
    setStepError(null);
    setter(file);
  };

  const update = <K extends keyof EmployeeApplicationData>(
    key: K,
    value: EmployeeApplicationData[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateEmployment = (index: 0 | 1 | 2, record: EmploymentRecord) => {
    setData((prev) => {
      const employmentHistory = [...prev.employmentHistory] as EmployeeApplicationData["employmentHistory"];
      employmentHistory[index] = record;
      return { ...prev, employmentHistory };
    });
  };

  const updateBackground = (index: number, value: "yes" | "no") => {
    setData((prev) => {
      const backgroundAnswers = [...prev.backgroundAnswers];
      backgroundAnswers[index] = value;
      return { ...prev, backgroundAnswers };
    });
  };

  const anyBackgroundYes = data.backgroundAnswers.some((answer) => answer === "yes");

  const failStep = (message: string) => {
    setStepError(message);
    return false;
  };

  const validateCurrentStep = () => {
    setStepError(null);
    const stepEl = stepRef.current;
    if (!stepEl) return true;

    const fields = stepEl.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea",
    );

    for (const field of fields) {
      if (field.disabled || field.type === "file" || field.type === "radio" || field.type === "checkbox") {
        continue;
      }
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    const validateYesNo = (value: "" | "yes" | "no", message: string) => {
      if (!value) return failStep(message);
      return true;
    };

    if (step === 1) {
      if (!validateYesNo(data.relatedToEmployee, "Please answer whether you are related to a current employee.")) return false;
      if (data.relatedToEmployee === "yes" && !data.relationDetails.trim()) {
        return failStep("Please describe your relation to the current employee.");
      }
      if (!validateYesNo(data.authorizedToWork, "Please answer whether you are authorized to work in the United States.")) return false;
      if (!validateYesNo(data.over18, "Please answer whether you are over the age of 18.")) return false;
      if (!validateYesNo(data.currentlyEmployed, "Please answer whether you are currently employed.")) return false;
      if (data.currentlyEmployed === "yes" && !validateYesNo(data.contactCurrentEmployer, "Please answer whether we may contact your present employer.")) return false;
      if (!data.availableDate) {
        return failStep("Please enter the date you would be available to work.");
      }
      if (!validateYesNo(data.dismissedFromPosition, "Please answer the question about dismissal from a position.")) return false;
      if (data.dismissedFromPosition === "yes" && !data.dismissalExplanation.trim()) {
        return failStep("Please explain your dismissal from a position.");
      }
    }

    if (step === 3) {
      if (!validateYesNo(data.churchMember, "Please answer whether you are a member of a local church.")) return false;
      if (data.churchMember === "yes") {
        if (!data.churchName.trim()) {
          return failStep("Please enter the name of your local church.");
        }
        if (!data.churchYears.trim()) {
          return failStep("Please enter how many years you have attended your church.");
        }
      }
    }

    if (step === 4) {
      if (!validateYesNo(data.hasDiploma, "Please answer whether you earned a high school diploma or GED.")) return false;
      if (!validateYesNo(data.hasAcsiCert, "Please answer whether you have an ACSI Teaching Certificate.")) return false;
      if (data.hasAcsiCert === "yes" && !data.acsiDetails.trim()) {
        return failStep("Please list your ACSI certificate expiration date and level.");
      }
      if (!validateYesNo(data.hasStateCert, "Please answer whether you have a State Teaching Certificate.")) return false;
      if (data.hasStateCert === "yes") {
        if (!data.stateCertState.trim()) {
          return failStep("Please enter the state for your teaching certificate.");
        }
        if (!data.stateCertExpiration) {
          return failStep("Please enter the expiration date for your teaching certificate.");
        }
      }
    }

    if (step === 7) {
      for (let i = 0; i < data.backgroundAnswers.length; i++) {
        if (!data.backgroundAnswers[i]) {
          return failStep(`Please answer: ${backgroundQuestions[i]}`);
        }
      }
      if (anyBackgroundYes && !data.backgroundExplanation.trim()) {
        return failStep("Please explain your yes answer(s) on the background questions.");
      }
    }

    if (step === 8 && !data.agreementAccepted) {
      return failStep("Please check I AGREE to continue.");
    }

    if (step === 2 && !headshot) {
      return failStep("Please upload your headshot.");
    }

    if (step === 4 && !resume) {
      return failStep("Please upload your resume.");
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep() || isSubmitting) return;

    setIsSubmitting(true);
    setStepError(null);

    try {
      const formData = new FormData();
      formData.append("application", JSON.stringify(data));
      if (headshot) formData.append("headshot", headshot, headshot.name);
      if (resume) formData.append("resume", resume, resume.name);

      const response = await fetch("/api/employment", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to submit your application right now.");
      }

      setSubmitted(true);
    } catch (error) {
      setStepError(
        error instanceof Error
          ? error.message
          : "Unable to submit your application right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded border border-teal/20 bg-teal/5 px-6 py-10 text-center">
        <h3 className="type-subsection-title text-teal">Application Submitted</h3>
        <p className="type-body mt-4">
          Thank you for your interest in joining the Sequoia Christian School team. We have received
          your application and will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="employee-application-form"
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl"
      noValidate
    >
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs text-gray-500 sm:text-sm">
          <span>
            Step {step + 1} of {formSteps.length}
          </span>
          <span>{formSteps[step].title}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-teal transition-all duration-300"
            style={{ width: `${((step + 1) / formSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <div ref={stepRef}>
      {step === 0 && (
        <div className={sectionClass}>
          <div>
            <FieldLabel required>Full Name</FieldLabel>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Email</FieldLabel>
              <input
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <FieldLabel required>Date of Birth</FieldLabel>
            <input
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <FieldLabel required>Address</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={data.street}
                onChange={(e) => update("street", e.target.value)}
                required
                className={inputClass}
                placeholder="Street"
              />
              <input
                type="text"
                value={data.city}
                onChange={(e) => update("city", e.target.value)}
                required
                className={inputClass}
                placeholder="City"
              />
              <input
                type="text"
                value={data.state}
                onChange={(e) => update("state", e.target.value)}
                required
                className={inputClass}
                placeholder="State"
              />
              <input
                type="text"
                value={data.zip}
                onChange={(e) => update("zip", e.target.value)}
                required
                className={inputClass}
                placeholder="Zip Code"
              />
            </div>
            <input
              type="text"
              value={data.country}
              readOnly
              className={`${inputClass} mt-3 bg-gray-50 text-gray-500`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Marital Status</FieldLabel>
              <select
                value={data.maritalStatus}
                onChange={(e) => update("maritalStatus", e.target.value)}
                required
                className={inputClass}
              >
                <option value="">Select...</option>
                {maritalStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel required>What position are you applying for?</FieldLabel>
              <select
                value={data.position}
                onChange={(e) => update("position", e.target.value)}
                required
                className={inputClass}
              >
                <option value="">Select...</option>
                {positionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <FieldLabel required>How did you hear about this position?</FieldLabel>
            <input
              type="text"
              value={data.heardAbout}
              onChange={(e) => update("heardAbout", e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className={sectionClass}>
          <YesNoField
            label="Are you related to anyone currently employed by Sequoia Christian School?"
            name="relatedToEmployee"
            value={data.relatedToEmployee}
            onChange={(value) => update("relatedToEmployee", value)}
            required
          />
          {data.relatedToEmployee === "yes" && (
            <div>
              <FieldLabel required>What is their name and what is your relation to them?</FieldLabel>
              <input
                type="text"
                value={data.relationDetails}
                onChange={(e) => update("relationDetails", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          )}
          <YesNoField
            label="Are you authorized to work in the United States?"
            name="authorizedToWork"
            value={data.authorizedToWork}
            onChange={(value) => update("authorizedToWork", value)}
            required
          />
          <YesNoField
            label="Are you over the age of 18?"
            name="over18"
            value={data.over18}
            onChange={(value) => update("over18", value)}
            required
          />
          <YesNoField
            label="Are you currently employed?"
            name="currentlyEmployed"
            value={data.currentlyEmployed}
            onChange={(value) => update("currentlyEmployed", value)}
            required
          />
          {data.currentlyEmployed === "yes" && (
            <YesNoField
              label="May we contact your present employer?"
              name="contactCurrentEmployer"
              value={data.contactCurrentEmployer}
              onChange={(value) => update("contactCurrentEmployer", value)}
              required
            />
          )}
          <div>
            <FieldLabel required>On what date would you be available to work?</FieldLabel>
            <input
              type="date"
              value={data.availableDate}
              onChange={(e) => update("availableDate", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <YesNoField
            label="Have you ever been dismissed, resigned to avoid being dismissed, or been asked to resign from a position?"
            name="dismissedFromPosition"
            value={data.dismissedFromPosition}
            onChange={(value) => update("dismissedFromPosition", value)}
            required
          />
          {data.dismissedFromPosition === "yes" && (
            <div>
              <FieldLabel required>Please explain</FieldLabel>
              <textarea
                value={data.dismissalExplanation}
                onChange={(e) => update("dismissalExplanation", e.target.value)}
                required
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className={sectionClass}>
          <div>
            <FieldLabel required>
              Please list activities or sports in which you are knowledgeable and would be competent
              and willing to direct, sponsor, or coach. Indicate grade or ability level:
            </FieldLabel>
            <textarea
              value={data.activitiesSports}
              onChange={(e) => update("activitiesSports", e.target.value)}
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <FieldLabel required>Please Upload Your Headshot</FieldLabel>
            <input
              type="file"
              accept={HEADSHOT_ACCEPT}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                assignUpload(setHeadshot, e.target.files?.[0], "Headshot", "headshot")
              }
              className="block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-dark"
            />
            <p className="mt-1 text-xs text-gray-500">JPG, PNG, WEBP, GIF, or HEIC — 4MB max.</p>
            {headshot ? (
              <p className="mt-2 text-sm text-gray-600">Selected: {headshot.name}</p>
            ) : null}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={sectionClass}>
          <h3 className="type-subsection-title">Christian Background</h3>
          <div>
            <FieldLabel required>Please briefly describe your Christian testimony.</FieldLabel>
            <textarea
              value={data.christianTestimony}
              onChange={(e) => update("christianTestimony", e.target.value)}
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>
          <YesNoField
            label="Are you a member of a local church?"
            name="churchMember"
            value={data.churchMember}
            onChange={(value) => update("churchMember", value)}
            required
          />
          {data.churchMember === "yes" && (
            <>
              <div>
                <FieldLabel required>What local church do you attend?</FieldLabel>
                <input
                  type="text"
                  value={data.churchName}
                  onChange={(e) => update("churchName", e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel required>How many years have you attended this church?</FieldLabel>
                <input
                  type="number"
                  min="0"
                  value={data.churchYears}
                  onChange={(e) => update("churchYears", e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </>
          )}
        </div>
      )}

      {step === 4 && (
        <div className={sectionClass}>
          <h3 className="type-subsection-title">Educational History &amp; Professional Qualifications</h3>
          <div>
            <FieldLabel required>Where did you attend high school?</FieldLabel>
            <input
              type="text"
              value={data.highSchool}
              onChange={(e) => update("highSchool", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <YesNoField
            label="Did you earn a high school diploma or GED?"
            name="hasDiploma"
            value={data.hasDiploma}
            onChange={(value) => update("hasDiploma", value)}
            required
          />
          <div>
            <FieldLabel required>
              List all post secondary schools, degrees, and dates attended.
            </FieldLabel>
            <textarea
              value={data.postSecondary}
              onChange={(e) => update("postSecondary", e.target.value)}
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
          <YesNoField
            label="Do you have an ACSI Teaching Certificate?"
            name="hasAcsiCert"
            value={data.hasAcsiCert}
            onChange={(value) => update("hasAcsiCert", value)}
            required
          />
          {data.hasAcsiCert === "yes" && (
            <div>
              <FieldLabel required>Please list the Expiration Date and Level:</FieldLabel>
              <input
                type="text"
                value={data.acsiDetails}
                onChange={(e) => update("acsiDetails", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          )}
          <YesNoField
            label="Do you have a State Teaching Certificate?"
            name="hasStateCert"
            value={data.hasStateCert}
            onChange={(value) => update("hasStateCert", value)}
            required
          />
          {data.hasStateCert === "yes" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel required>State</FieldLabel>
                <input
                  type="text"
                  value={data.stateCertState}
                  onChange={(e) => update("stateCertState", e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel required>Expiration Date</FieldLabel>
                <input
                  type="date"
                  value={data.stateCertExpiration}
                  onChange={(e) => update("stateCertExpiration", e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          )}
          <div>
            <FieldLabel required>Please Upload Your Resume</FieldLabel>
            <input
              type="file"
              accept={RESUME_ACCEPT}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                assignUpload(setResume, e.target.files?.[0], "Resume", "resume")
              }
              className="block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-dark"
            />
            <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX — 4MB max.</p>
            {resume ? (
              <p className="mt-2 text-sm text-gray-600">Selected: {resume.name}</p>
            ) : null}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className={sectionClass}>
          <h3 className="type-subsection-title">Employment History</h3>
          <p className="type-body-sm">
            Begin with your most recent position, and please include the previous three places of
            employment.
          </p>
          <EmploymentFields
            title="Most Recent Employer"
            record={data.employmentHistory[0]}
            onChange={(record) => updateEmployment(0, record)}
            required
          />
        </div>
      )}

      {step === 6 && (
        <div className={sectionClass}>
          <p className="type-body-sm mb-2">
            Additional employment history (optional — leave blank if not applicable).
          </p>
          <EmploymentFields
            title="Previous Employer (2)"
            record={data.employmentHistory[1]}
            onChange={(record) => updateEmployment(1, record)}
          />
          <EmploymentFields
            title="Previous Employer (3)"
            record={data.employmentHistory[2]}
            onChange={(record) => updateEmployment(2, record)}
          />
        </div>
      )}

      {step === 7 && (
        <div className={sectionClass}>
          <h3 className="type-subsection-title">Background Information</h3>
          {backgroundQuestions.map((question, index) => (
            <YesNoField
              key={question}
              label={question}
              name={`background-${index}`}
              value={data.backgroundAnswers[index]}
              onChange={(value) => updateBackground(index, value)}
              required
            />
          ))}
          {anyBackgroundYes && (
            <div>
              <FieldLabel required>
                If you answered yes to any of the questions above, please explain.
              </FieldLabel>
              <textarea
                value={data.backgroundExplanation}
                onChange={(e) => update("backgroundExplanation", e.target.value)}
                required
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          )}
        </div>
      )}

      {step === 8 && (
        <div className={sectionClass}>
          <h3 className="type-subsection-title">Certification &amp; Agreement</h3>
          <div className="space-y-4 rounded border border-gray-200 bg-cream/30 p-4 sm:p-6">
            {agreementStatements.map((statement) => (
              <p key={statement} className="type-body-sm text-gray-700">
                {statement}
              </p>
            ))}
          </div>
          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={data.agreementAccepted}
              onChange={(e) => update("agreementAccepted", e.target.checked)}
              required
              className="mt-1 h-4 w-4 accent-teal"
            />
            <span className="font-semibold tracking-wide">I AGREE</span>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Name</FieldLabel>
              <input
                type="text"
                value={data.signatureName}
                onChange={(e) => update("signatureName", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel required>Date</FieldLabel>
              <input
                type="date"
                value={data.signatureDate}
                onChange={(e) => update("signatureDate", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <FieldLabel required>Signature</FieldLabel>
            <input
              type="text"
              value={data.signature}
              onChange={(e) => update("signature", e.target.value)}
              required
              className={`${inputClass} font-[family-name:var(--font-heading)] italic`}
              placeholder="Type your full name"
            />
          </div>
        </div>
      )}
      </div>

      {stepError ? (
        <p className="mt-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {stepError}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setStepError(null);
            setStep((current) => Math.max(0, current - 1));
          }}
          disabled={step === 0 || isSubmitting}
          className="rounded border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        {step < formSteps.length - 1 ? (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              if (!validateCurrentStep()) return;
              setStep((current) => Math.min(formSteps.length - 1, current + 1));
            }}
            className="rounded bg-teal px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-teal-dark disabled:cursor-wait disabled:opacity-70"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={(e) => {
              if (!validateCurrentStep()) {
                e.preventDefault();
              }
            }}
            className="rounded bg-teal px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-teal-dark disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Submitting…" : "Submit Application"}
          </button>
        )}
      </div>
    </form>
  );
}
