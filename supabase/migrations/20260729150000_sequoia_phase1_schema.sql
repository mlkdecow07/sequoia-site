-- Sequoia Christian School — Phase 1 schema for dedicated project lxndvssclcbabqkvurbk
-- Run in Supabase Dashboard → SQL Editor (or after reconnecting MCP to this project).

-- ---------------------------------------------------------------------------
-- Contact + employment submissions
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  source text,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'read', 'archived'))
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON public.contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_status_idx
  ON public.contact_submissions (status);

CREATE TABLE IF NOT EXISTS public.employment_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  application jsonb NOT NULL,
  applicant_name text,
  applicant_email text,
  headshot_path text,
  resume_path text,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'read', 'archived'))
);

CREATE INDEX IF NOT EXISTS employment_applications_created_at_idx
  ON public.employment_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS employment_applications_status_idx
  ON public.employment_applications (status);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_applications ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Admin allowlist (RLS gate for /admin reads + status updates)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_allowlisted_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_allowlisted_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_allowlisted_admin() TO authenticated;

-- Admins can see their own allowlist row (optional self-check)
DROP POLICY IF EXISTS "Allowlisted admins can select admin_users" ON public.admin_users;
CREATE POLICY "Allowlisted admins can select admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_allowlisted_admin());

-- Anon: no client access (API writes use service role, which bypasses RLS)
-- Authenticated allowlisted admins: SELECT + UPDATE (status)

DROP POLICY IF EXISTS "Allowlisted admins can select contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allowlisted admins can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allowlisted admins can select employment applications" ON public.employment_applications;
DROP POLICY IF EXISTS "Allowlisted admins can update employment applications" ON public.employment_applications;

CREATE POLICY "Allowlisted admins can select contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_allowlisted_admin())
  WITH CHECK (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can select employment applications"
  ON public.employment_applications
  FOR SELECT
  TO authenticated
  USING (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can update employment applications"
  ON public.employment_applications
  FOR UPDATE
  TO authenticated
  USING (public.is_allowlisted_admin())
  WITH CHECK (public.is_allowlisted_admin());

-- ---------------------------------------------------------------------------
-- Private storage bucket for employment files
-- ---------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'employment-applications',
  'employment-applications',
  false,
  5242880,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allowlisted admins can read employment application files" ON storage.objects;
CREATE POLICY "Allowlisted admins can read employment application files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'employment-applications' AND public.is_allowlisted_admin());
