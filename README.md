# Sequoia Christian School Website

A Next.js replica of [sequoiachristian.com](https://sequoiachristian.com).

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in Resend + Supabase values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Send contact / employment emails |
| `RESEND_FROM_EMAIL` | From address (defaults to info@…) |
| `EMAIL_TO` | Inbox for form notifications |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (browser + SSR auth) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for form inserts / file uploads |

### Supabase setup

1. Use the Sequoia-dedicated project: `https://lxndvssclcbabqkvurbk.supabase.co`.
2. Copy **Project URL**, **anon/public** key, and **service_role** key from Supabase → Project Settings → API into `.env.local` (and Vercel env for production). Never commit `.env.local`.
3. Apply schema once: run these in the Dashboard SQL Editor (or after reconnecting MCP to project `lxndvssclcbabqkvurbk`):
   - `supabase/migrations/20260729150000_sequoia_phase1_schema.sql` — contact, employment, admin allowlist, storage
   - `supabase/migrations/20260729160000_calendar_events.sql` — public calendar table + seed events
4. Create the first staff user in Supabase → Authentication → Users → **Add user** (email + password). Do not commit passwords.
5. Add that user to `admin_users` (link `user_id` to the Auth user UUID) so RLS allowlists them:

```sql
insert into public.admin_users (user_id, email)
values ('AUTH_USER_UUID', 'staff@example.com');
```

6. Sign in at `/admin/login`. Manage calendar at `/admin/calendar`.

Form APIs save to Supabase first, then send Resend email as best-effort. Public `/calendar` reads from `calendar_events` (falls back to hardcoded data if the table is empty or unavailable).

## Pages

- `/` — Home
- `/history` — Our History
- `/faculty` — Faculty
- `/educationalapproach` — Educational Approach
- `/tuition` — Tuition
- `/eitc` — EITC Program
- `/enrollment` — Enrollment Process
- `/testimonials` — Testimonials
- `/apply` — Application portal
- `/employment` — Employment
- `/admin` — Staff dashboard (auth required)

## Build

```bash
npm run build
npm start
```
