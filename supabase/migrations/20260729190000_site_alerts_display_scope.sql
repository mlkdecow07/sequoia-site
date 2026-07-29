-- Add display_scope to site_alerts: 'home' | 'all'
-- Project: lxndvssclcbabqkvurbk
-- Run in Supabase Dashboard → SQL Editor (paste CONTENTS, not this filename).

ALTER TABLE public.site_alerts
  ADD COLUMN IF NOT EXISTS display_scope text NOT NULL DEFAULT 'home';

ALTER TABLE public.site_alerts
  DROP CONSTRAINT IF EXISTS site_alerts_display_scope_check;

ALTER TABLE public.site_alerts
  ADD CONSTRAINT site_alerts_display_scope_check
  CHECK (display_scope IN ('home', 'all'));
