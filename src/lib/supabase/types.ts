export type SubmissionStatus = "new" | "read" | "archived";

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  source: string | null;
  status: SubmissionStatus;
};

export type EmploymentApplication = {
  id: string;
  created_at: string;
  application: Record<string, unknown>;
  applicant_name: string | null;
  applicant_email: string | null;
  headshot_path: string | null;
  resume_path: string | null;
  status: SubmissionStatus;
};
