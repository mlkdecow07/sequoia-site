import CalendarEventForm from "@/app/admin/CalendarEventForm";

export default function AdminCalendarNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-teal">Add calendar event</h1>
      </div>

      <CalendarEventForm />
    </div>
  );
}
