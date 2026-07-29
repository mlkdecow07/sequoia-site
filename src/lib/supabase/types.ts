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

export type CalendarEventRow = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  dates: string;
  start_date: string;
  end_date: string | null;
  sort_order: number | null;
};

export type InfoPageView = {
  id: string;
  created_at: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
};

export type InfoLinkClick = {
  id: string;
  created_at: string;
  label: string;
  href: string;
  link_type: string;
};

export type SiteAlert = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  message: string;
  is_active: boolean;
  ends_at: string | null;
  /** 'home' = homepage only; 'all' = every public page */
  display_scope: "home" | "all";
};
