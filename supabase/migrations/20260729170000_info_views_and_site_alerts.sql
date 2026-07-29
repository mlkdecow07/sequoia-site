-- Sequoia Christian School — /info page views + homepage site alerts
-- Project: lxndvssclcbabqkvurbk
-- Run in Supabase Dashboard → SQL Editor (paste CONTENTS, not this filename).

-- ---------------------------------------------------------------------------
-- info_page_views
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.info_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  path text NOT NULL DEFAULT '/info',
  referrer text,
  user_agent text
);

CREATE INDEX IF NOT EXISTS info_page_views_created_at_idx
  ON public.info_page_views (created_at DESC);

ALTER TABLE public.info_page_views ENABLE ROW LEVEL SECURITY;

-- No public SELECT. Inserts go through service-role API route.
-- Allowlisted admins can read for stats.
DROP POLICY IF EXISTS "Allowlisted admins can select info page views" ON public.info_page_views;
CREATE POLICY "Allowlisted admins can select info page views"
  ON public.info_page_views
  FOR SELECT
  TO authenticated
  USING (public.is_allowlisted_admin());

-- ---------------------------------------------------------------------------
-- site_alerts (homepage closure / weather banner)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  message text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  ends_at timestamptz
);

CREATE INDEX IF NOT EXISTS site_alerts_active_idx
  ON public.site_alerts (is_active, updated_at DESC);

CREATE OR REPLACE FUNCTION public.set_site_alerts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS site_alerts_set_updated_at ON public.site_alerts;
CREATE TRIGGER site_alerts_set_updated_at
  BEFORE UPDATE ON public.site_alerts
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_site_alerts_updated_at();

ALTER TABLE public.site_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can select site alerts" ON public.site_alerts;
CREATE POLICY "Anyone can select site alerts"
  ON public.site_alerts
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allowlisted admins can insert site alerts" ON public.site_alerts;
DROP POLICY IF EXISTS "Allowlisted admins can update site alerts" ON public.site_alerts;
DROP POLICY IF EXISTS "Allowlisted admins can delete site alerts" ON public.site_alerts;

CREATE POLICY "Allowlisted admins can insert site alerts"
  ON public.site_alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can update site alerts"
  ON public.site_alerts
  FOR UPDATE
  TO authenticated
  USING (public.is_allowlisted_admin())
  WITH CHECK (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can delete site alerts"
  ON public.site_alerts
  FOR DELETE
  TO authenticated
  USING (public.is_allowlisted_admin());
