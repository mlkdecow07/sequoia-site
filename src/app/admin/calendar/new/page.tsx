import Link from "next/link";
import CalendarEventForm from "@/app/admin/CalendarEventForm";

export default function AdminCalendarNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">
          <Link href="/admin" className="text-teal underline-offset-2 hover:underline">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/admin/calendar"
            className="text-teal underline-offset-2 hover:underline"
          >
            Calendar
          </Link>
          <span className="mx-2">/</span>
          New
        </p>
        <h1 className="mt-2 font-heading text-3xl text-teal">Add calendar event</h1>
      </div>

      <CalendarEventForm />
    </div>
  );
}
