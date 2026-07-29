import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export default function AdminNav({ email }: { email?: string | null }) {
  return (
    <header className="border-b border-teal/15 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/admin" className="font-heading text-lg text-teal">
            SCS ADMIN
          </Link>
          <nav className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest">
            <Link
              href="/admin/alerts"
              className="text-gray-700 underline-offset-2 hover:text-teal hover:underline"
            >
              Alerts
            </Link>
            <Link
              href="/admin/calendar"
              className="text-gray-700 underline-offset-2 hover:text-teal hover:underline"
            >
              Calendar
            </Link>
            <Link
              href="/admin/contact"
              className="text-gray-700 underline-offset-2 hover:text-teal hover:underline"
            >
              Contact Forms
            </Link>
            <Link
              href="/admin/employment"
              className="text-gray-700 underline-offset-2 hover:text-teal hover:underline"
            >
              Employment Forms
            </Link>
            <Link
              href="/admin/info-stats"
              className="text-gray-700 underline-offset-2 hover:text-teal hover:underline"
            >
              Social Traffic
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {email ? <span className="hidden sm:inline">{email}</span> : null}
          <form action={signOut}>
            <button
              type="submit"
              className="rounded border border-teal/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal hover:bg-teal/5"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
