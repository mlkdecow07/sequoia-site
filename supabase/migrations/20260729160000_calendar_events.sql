-- Sequoia Christian School — Phase 2: editable school calendar
-- Project: lxndvssclcbabqkvurbk
-- Run in Supabase Dashboard → SQL Editor (MCP may point at a different project).

-- ---------------------------------------------------------------------------
-- calendar_events
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  description text,
  dates text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  sort_order int
);

CREATE INDEX IF NOT EXISTS calendar_events_start_date_idx
  ON public.calendar_events (start_date ASC);

CREATE INDEX IF NOT EXISTS calendar_events_sort_order_idx
  ON public.calendar_events (sort_order ASC NULLS LAST);

CREATE OR REPLACE FUNCTION public.set_calendar_events_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS calendar_events_set_updated_at ON public.calendar_events;
CREATE TRIGGER calendar_events_set_updated_at
  BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_calendar_events_updated_at();

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Public site: anyone can read calendar events
DROP POLICY IF EXISTS "Anyone can select calendar events" ON public.calendar_events;
CREATE POLICY "Anyone can select calendar events"
  ON public.calendar_events
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allowlisted admins: full write access
DROP POLICY IF EXISTS "Allowlisted admins can insert calendar events" ON public.calendar_events;
DROP POLICY IF EXISTS "Allowlisted admins can update calendar events" ON public.calendar_events;
DROP POLICY IF EXISTS "Allowlisted admins can delete calendar events" ON public.calendar_events;

CREATE POLICY "Allowlisted admins can insert calendar events"
  ON public.calendar_events
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can update calendar events"
  ON public.calendar_events
  FOR UPDATE
  TO authenticated
  USING (public.is_allowlisted_admin())
  WITH CHECK (public.is_allowlisted_admin());

CREATE POLICY "Allowlisted admins can delete calendar events"
  ON public.calendar_events
  FOR DELETE
  TO authenticated
  USING (public.is_allowlisted_admin());

-- ---------------------------------------------------------------------------
-- Seed from former site-config schoolCalendar (idempotent if table empty)
-- ---------------------------------------------------------------------------

INSERT INTO public.calendar_events (title, description, dates, start_date, end_date, sort_order)
SELECT *
FROM (
  VALUES
    ('Meet the Teacher', '9AM–11AM.', 'August 27', DATE '2026-08-27', NULL::date, 10),
    ('First Day of School', 'Classes begin for the 2026–2027 school year.', 'August 31', DATE '2026-08-31', NULL, 20),
    ('No School — Labor Day', NULL, 'September 4–7', DATE '2026-09-04', DATE '2026-09-07', 30),
    ('Professional Development', 'No school for students.', 'October 9', DATE '2026-10-09', NULL, 40),
    ('No School — Columbus Day', NULL, 'October 12', DATE '2026-10-12', NULL, 50),
    ('Parent/Teacher Conferences', 'No school for students.', 'November 5–6', DATE '2026-11-05', DATE '2026-11-06', 60),
    ('Veterans Day Assembly', NULL, 'November 11', DATE '2026-11-11', NULL, 70),
    ('Thanksgiving Break', 'No school for students and staff.', 'November 25–30', DATE '2026-11-25', DATE '2026-11-30', 80),
    ('Holiday Concert', 'PreK–5th grade, 6PM.', 'December 17', DATE '2026-12-17', NULL, 90),
    ('Christmas Break', 'No school for students and staff.', 'December 21 – January 1', DATE '2026-12-21', DATE '2027-01-01', 100),
    ('No School — Martin Luther King Jr. Day', NULL, 'January 18', DATE '2027-01-18', NULL, 110),
    ('Father/Daughter Dance', '7–9PM.', 'February 12', DATE '2027-02-12', NULL, 120),
    ('No School — Presidents'' Day', 'No school for students and staff.', 'February 15', DATE '2027-02-15', NULL, 130),
    ('No School', 'No school for students and staff.', 'February 26', DATE '2027-02-26', NULL, 140),
    ('Donuts & Grownups', 'Time: TBD.', 'March 6', DATE '2027-03-06', NULL, 150),
    ('Spring Break', 'No school for students and staff.', 'March 22–26', DATE '2027-03-22', DATE '2027-03-26', 160),
    ('Professional Development', 'No school for students.', 'March 26', DATE '2027-03-26', NULL, 170),
    ('Open House', '6PM.', 'April 8', DATE '2027-04-08', NULL, 180),
    ('Spring Concert', '6PM.', 'April 15', DATE '2027-04-15', NULL, 190),
    ('Professional Development', 'No school for students.', 'April 21', DATE '2027-04-21', NULL, 200),
    ('No School', 'No school for students and staff.', 'April 22–23', DATE '2027-04-22', DATE '2027-04-23', 210),
    ('Field Day', '12PM–3PM.', 'April 30', DATE '2027-04-30', NULL, 220),
    ('Mother''s Day Tea', '1PM–3PM.', 'May 7', DATE '2027-05-07', NULL, 230),
    ('Kindergarten Last Day', NULL, 'May 27', DATE '2027-05-27', NULL, 240),
    ('Kindergarten Graduation', 'Graduation at 6PM.', 'May 27', DATE '2027-05-27', NULL, 250),
    ('Last Day of School', 'Half day — dismissal at 11:45AM.', 'May 28', DATE '2027-05-28', NULL, 260)
) AS seed(title, description, dates, start_date, end_date, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.calendar_events LIMIT 1);
