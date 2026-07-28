import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FullMonthCalendar from "@/components/FullMonthCalendar";
import { getCurrentSchoolYear, schoolCalendar, siteConfig } from "@/lib/site-config";
import {
  formatYearMonth,
  getMonthEntry,
  monthLabel,
  parseMonthName,
  parseYearMonth,
} from "@/lib/school-calendar-utils";

type CalendarMonthPageProps = {
  params: Promise<{ yearMonth: string }>;
};

export function generateStaticParams() {
  return schoolCalendar.map((month) => {
    const parsed = parseMonthName(month.name);
    return { yearMonth: formatYearMonth(parsed.year, parsed.month) };
  });
}

export async function generateMetadata({ params }: CalendarMonthPageProps): Promise<Metadata> {
  const { yearMonth } = await params;
  const parsed = parseYearMonth(yearMonth);

  if (!parsed) {
    return { title: "School Calendar" };
  }

  return {
    title: `${monthLabel(parsed.year, parsed.month)} Calendar`,
  };
}

export default async function CalendarMonthPage({ params }: CalendarMonthPageProps) {
  const { yearMonth } = await params;
  const parsed = parseYearMonth(yearMonth);

  if (!parsed || !getMonthEntry(schoolCalendar, parsed.year, parsed.month)) {
    notFound();
  }

  const schoolYear = getCurrentSchoolYear();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-6 text-center">
        <Link
          href="/calendar"
          className="text-xs font-semibold uppercase tracking-widest text-teal underline decoration-teal/30 underline-offset-4 transition hover:text-teal-dark"
        >
          Back to school calendar
        </Link>
      </div>

      <h2 className="type-page-title">SCHOOL CALENDAR</h2>

      <p className="type-body mx-auto mt-8 max-w-3xl text-center">
        {monthLabel(parsed.year, parsed.month)} — {schoolYear} school year at Sequoia Christian
        School.
      </p>

      <div className="mt-12">
        <FullMonthCalendar
          months={schoolCalendar}
          initialYear={parsed.year}
          initialMonth={parsed.month}
        />
      </div>

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
