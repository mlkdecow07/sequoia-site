/**
 * Parse an HTML date (YYYY-MM-DD) as noon in the user's local timezone.
 * `timezoneOffsetMinutes` is from Date#getTimezoneOffset() (UTC − local, in minutes).
 */
export function parseDateLocalToIso(
  value: string,
  timezoneOffsetMinutes: number,
): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) {
    throw new Error("Display date is invalid.");
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utcMs =
    Date.UTC(year, month - 1, day, 12, 0, 0, 0) +
    timezoneOffsetMinutes * 60_000;
  const date = new Date(utcMs);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Display date is invalid.");
  }
  return date.toISOString();
}

/**
 * Parse an HTML datetime-local (YYYY-MM-DDTHH:mm) as wall time in the user's timezone.
 */
export function parseDateTimeLocalToIso(
  value: string,
  timezoneOffsetMinutes: number,
): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value.trim());
  if (!match) {
    throw new Error("Auto-expire time is invalid.");
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const utcMs =
    Date.UTC(year, month - 1, day, hour, minute, 0, 0) +
    timezoneOffsetMinutes * 60_000;
  const date = new Date(utcMs);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Auto-expire time is invalid.");
  }
  return date.toISOString();
}

export function midnightTomorrowLocalIso(timezoneOffsetMinutes: number): string {
  // Build "tomorrow at 00:00" in the user's local calendar day.
  const nowUtc = Date.now();
  const localNow = new Date(nowUtc - timezoneOffsetMinutes * 60_000);
  const y = localNow.getUTCFullYear();
  const m = localNow.getUTCMonth();
  const d = localNow.getUTCDate() + 1;
  const utcMs = Date.UTC(y, m, d, 0, 0, 0, 0) + timezoneOffsetMinutes * 60_000;
  return new Date(utcMs).toISOString();
}
