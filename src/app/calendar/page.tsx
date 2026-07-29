import type { Metadata } from "next";
import SchoolCalendarView from "@/components/SchoolCalendarView";
import { getSchoolCalendarMonths } from "@/lib/calendar-data";
import { getCurrentSchoolYear, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "School Calendar",
};

export const revalidate = 60;

export default async function CalendarPage() {
  const schoolYear = getCurrentSchoolYear();
  const months = await getSchoolCalendarMonths();

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">SCHOOL CALENDAR</h2>

      <p className="type-body mx-auto mt-8 max-w-3xl text-center">
        Important dates for the {schoolYear} school year.
      </p>

      <SchoolCalendarView months={months} />

      <div className="mx-auto mt-12 max-w-3xl space-y-2 text-center">
        <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs">
          Dates are subject to change.
        </p>
        <p className="type-caption italic">
          For the most current information, please contact the school office at{" "}
          <a href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`} className="text-teal underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
