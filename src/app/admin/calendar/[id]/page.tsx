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
        <h1 className="font-heading text-3xl text-teal">{event.title}</h1>
      </div>

      <CalendarEventForm event={event} />
    </div>
  );
}
