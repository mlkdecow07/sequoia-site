-- Sequoia Christian School — /info link click tracking
-- Project: lxndvssclcbabqkvurbk
-- Run in Supabase Dashboard → SQL Editor (paste CONTENTS, not this filename).

CREATE TABLE IF NOT EXISTS public.info_link_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  label text NOT NULL,
  href text NOT NULL,
  link_type text NOT NULL DEFAULT 'button'
);

CREATE INDEX IF NOT EXISTS info_link_clicks_created_at_idx
  ON public.info_link_clicks (created_at DESC);

CREATE INDEX IF NOT EXISTS info_link_clicks_label_idx
  ON public.info_link_clicks (label);

ALTER TABLE public.info_link_clicks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allowlisted admins can select info link clicks" ON public.info_link_clicks;
CREATE POLICY "Allowlisted admins can select info link clicks"
  ON public.info_link_clicks
  FOR SELECT
  TO authenticated
  USING (public.is_allowlisted_admin());
