import Link from "next/link";
import { notFound } from "next/navigation";
import CalendarEventForm from "@/app/admin/CalendarEventForm";
import { getCalendarEventById } from "@/lib/calendar-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminCalendarEditPage({ params }: PageProps) {
  const { id } = await params;

  let event;
  try {
    event = await getCalendarEventById(id);
  } catch {
    notFound();
  }

  if (!event) {
    notFound();
  }

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
        </p>
        <h1 className="mt-2 font-heading text-3xl text-teal">{event.title}</h1>
      </div>

      <CalendarEventForm event={event} />
    </div>
  );
}
