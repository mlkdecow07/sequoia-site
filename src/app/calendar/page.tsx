import type { Metadata } from "next";
import SchoolCalendarView from "@/components/SchoolCalendarView";
import { getCurrentSchoolYear, schoolCalendar, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "School Calendar",
};

export default function CalendarPage() {
  const schoolYear = getCurrentSchoolYear();

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">SCHOOL CALENDAR</h2>

      <p className="type-body mx-auto mt-8 max-w-3xl text-center">
        Important dates for the {schoolYear} school year at Sequoia Christian School.
      </p>

      <SchoolCalendarView months={schoolCalendar} />

      <p className="type-caption mx-auto mt-12 max-w-3xl text-center italic">
        Dates are subject to change. For the most current information, please contact the school
        office at{" "}
        <a href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`} className="text-teal underline">
          {siteConfig.phone}
        </a>
        .
      </p>
    </article>
  );
}
