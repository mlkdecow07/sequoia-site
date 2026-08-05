import type { SchoolCalendarEvent, SchoolCalendarMonth } from "@/lib/site-config";
import { SCHOOL_TIME_ZONE } from "@/lib/site-config";

export type FlatCalendarEvent = SchoolCalendarEvent & {
  startDate: string;
  endDate: string;
};

/** Standard calendar quarter (Jan–Mar = 1 … Oct–Dec = 4) with months present in the school calendar. */
export type CalendarQuarterGroup = {
  year: number;
  /** 1–4 */
  quarter: number;
  months: SchoolCalendarMonth[];
  /** Short nav label, e.g. "Aug · Sep" */
  shortLabel: string;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function flattenSchoolCalendar(months: SchoolCalendarMonth[]): FlatCalendarEvent[] {
  return months.flatMap((month) =>
    month.events.map((event) => ({
      ...event,
      endDate: event.endDate ?? event.startDate,
    })),
  );
}

/** Parse labels like "August 2026" without Date string parsing (Safari-safe). */
export function parseMonthName(name: string): { year: number; month: number } {
  const match = name.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) {
    throw new Error(`Unrecognized calendar month label: ${name}`);
  }

  const monthIndex = MONTH_NAMES.findIndex(
    (monthName) => monthName.toLowerCase() === match[1].toLowerCase(),
  );
  const year = Number(match[2]);

  if (monthIndex < 0 || Number.isNaN(year)) {
    throw new Error(`Unrecognized calendar month label: ${name}`);
  }

  return { year, month: monthIndex };
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function eventsOnDate(dateKey: string, events: FlatCalendarEvent[]): FlatCalendarEvent[] {
  return events.filter((event) => event.startDate <= dateKey && dateKey <= event.endDate);
}

export type CalendarCell = {
  day: number | null;
  dateKey: string | null;
  events: FlatCalendarEvent[];
};

export function buildMonthGrid(
  year: number,
  month: number,
  events: FlatCalendarEvent[],
): CalendarCell[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = firstDay.getDay();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < leadingEmpty; i += 1) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = toDateKey(new Date(year, month, day));
    cells.push({
      day,
      dateKey,
      events: eventsOnDate(dateKey, events),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  while (cells.length < 42) {
    cells.push({ day: null, dateKey: null, events: [] });
  }

  return cells;
}

export function monthLabel(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

export function formatYearMonth(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function parseYearMonth(value: string): { year: number; month: number } | null {
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;

  if (month < 0 || month > 11) return null;

  return { year, month };
}

export function getMonthEntry(
  months: SchoolCalendarMonth[],
  year: number,
  month: number,
): SchoolCalendarMonth | undefined {
  return months.find((entry) => {
    const parsed = parseMonthName(entry.name);
    return parsed.year === year && parsed.month === month;
  });
}

/** Calendar quarter 1–4 from a 0-based month index. */
export function getCalendarQuarter(monthIndex: number): number {
  return Math.floor(monthIndex / 3) + 1;
}

function getSchoolLocalYearMonth(date = new Date()): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SCHOOL_TIME_ZONE,
    year: "numeric",
    month: "numeric",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: value("year"), month: value("month") - 1 };
}

/**
 * Group school-calendar months into standard calendar quarters (Jan–Mar, Apr–Jun,
 * Jul–Sep, Oct–Dec). Only quarters that contain at least one calendar month are returned.
 */
export function groupMonthsByCalendarQuarter(
  months: SchoolCalendarMonth[],
): CalendarQuarterGroup[] {
  const groups = new Map<string, CalendarQuarterGroup>();

  for (const entry of months) {
    const { year, month } = parseMonthName(entry.name);
    const quarter = getCalendarQuarter(month);
    const key = `${year}-Q${quarter}`;
    const existing = groups.get(key);
    if (existing) {
      existing.months.push(entry);
    } else {
      groups.set(key, {
        year,
        quarter,
        months: [entry],
        shortLabel: "",
      });
    }
  }

  const ordered = Array.from(groups.values()).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.quarter - b.quarter;
  });

  for (const group of ordered) {
    group.shortLabel = group.months
      .map((entry) => entry.name.replace(/\s+\d{4}$/, ""))
      .join(" · ");
  }

  return ordered;
}

/**
 * Index of the quarter containing today (school local time), or the nearest
 * available quarter if today falls outside the calendar range.
 */
export function findDefaultQuarterIndex(
  quarters: CalendarQuarterGroup[],
  date = new Date(),
): number {
  if (quarters.length === 0) return 0;

  const { year, month } = getSchoolLocalYearMonth(date);
  const quarter = getCalendarQuarter(month);
  const exact = quarters.findIndex((group) => group.year === year && group.quarter === quarter);
  if (exact >= 0) return exact;

  const targetKey = year * 4 + quarter;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < quarters.length; index += 1) {
    const group = quarters[index];
    const distance = Math.abs(group.year * 4 + group.quarter - targetKey);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }

  return bestIndex;
}

/** Index of the month containing today, or the nearest available month. */
export function findDefaultMonthIndex(
  months: SchoolCalendarMonth[],
  date = new Date(),
): number {
  if (months.length === 0) return 0;

  const { year, month } = getSchoolLocalYearMonth(date);
  const exact = months.findIndex((entry) => {
    const parsed = parseMonthName(entry.name);
    return parsed.year === year && parsed.month === month;
  });
  if (exact >= 0) return exact;

  const targetKey = year * 12 + month;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < months.length; index += 1) {
    const parsed = parseMonthName(months[index].name);
    const distance = Math.abs(parsed.year * 12 + parsed.month - targetKey);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }

  return bestIndex;
}

export function isNoSchoolEvent(event: { title: string; description?: string }): boolean {
  const title = event.title.toLowerCase();
  const description = event.description?.toLowerCase() ?? "";

  return (
    title.includes("no school") ||
    title.includes("break") ||
    title.includes("inservice week") ||
    title.includes("professional development") ||
    title.includes("parent/teacher conferences") ||
    description.includes("no school")
  );
}

/** List-view label: red/no-school events always start with "NO SCHOOL - …". */
export function formatNoSchoolListTitle(event: { title: string; description?: string }): string {
  if (!isNoSchoolEvent(event)) {
    return event.title;
  }

  const stripped = event.title
    .replace(/^no\s*school\s*[—\-–:]?\s*/i, "")
    .trim();

  if (!stripped) {
    return "NO SCHOOL";
  }

  return `NO SCHOOL - ${stripped.toUpperCase()}`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function toIcsDate(dateKey: string): string {
  return dateKey.replace(/-/g, "");
}

/** ICS all-day DTEND is exclusive (day after the last included date). */
function addOneDay(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function icsUid(event: FlatCalendarEvent): string {
  const slug = event.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${event.startDate}-${slug}@sequoiachristian.com`;
}

export function buildSchoolCalendarIcs(months: SchoolCalendarMonth[]): string {
  const events = flattenSchoolCalendar(months);
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sequoia Christian School//School Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Sequoia Christian School Calendar",
  ];

  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${icsUid(event)}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(event.startDate)}`,
      `DTEND;VALUE=DATE:${toIcsDate(addOneDay(event.endDate))}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
    );

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
    }

    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

export function downloadSchoolCalendarIcs(
  months: SchoolCalendarMonth[],
  filename = "sequoia-christian-school-calendar.ics",
): void {
  const blob = new Blob([buildSchoolCalendarIcs(months)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadSchoolCalendarPdf(
  months: SchoolCalendarMonth[],
  schoolYear: string,
  filename = "sequoia-christian-school-calendar.pdf",
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const marginBottom = 48;
  const contentWidth = pageWidth - marginX * 2;
  let y = 56;

  const ensureSpace = (needed: number) => {
    if (y + needed <= pageHeight - marginBottom) return;
    doc.addPage();
    y = 56;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(64, 132, 130);
  doc.text("Sequoia Christian School Calendar", marginX, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(`${schoolYear} school year`, marginX, y);
  y += 28;

  for (const month of months) {
    ensureSpace(36);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(64, 132, 130);
    doc.text(month.name.toUpperCase(), marginX, y);
    y += 8;
    doc.setDrawColor(64, 132, 130);
    doc.setLineWidth(0.6);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 16;

    for (const event of month.events) {
      const dateLines = doc.splitTextToSize(event.dates, 110);
      const titleLines = doc.splitTextToSize(event.title, contentWidth - 126);
      const descriptionLines = event.description
        ? doc.splitTextToSize(event.description.replace(/\.$/, ""), contentWidth - 126)
        : [];
      const blockHeight =
        Math.max(dateLines.length, titleLines.length) * 13 + descriptionLines.length * 12 + 10;

      ensureSpace(blockHeight);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(dateLines, marginX, y);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text(titleLines, marginX + 126, y);

      let eventY = y + titleLines.length * 13;
      if (descriptionLines.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(90, 90, 90);
        doc.text(descriptionLines, marginX + 126, eventY);
        eventY += descriptionLines.length * 12;
      }

      y = Math.max(y + dateLines.length * 13, eventY) + 8;
    }

    y += 10;
  }

  ensureSpace(24);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text("Dates are subject to change.", marginX, y);

  doc.save(filename);
}

export { WEEKDAY_LABELS };
