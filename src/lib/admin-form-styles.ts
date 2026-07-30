/** Shared admin form control styles — 16px text avoids iOS focus-zoom. */
export const adminFieldClassName =
  "mt-1 box-border block w-full min-w-0 max-w-full rounded border border-teal/20 bg-white px-3 py-2.5 text-base text-gray-800 outline-none focus:border-teal";

/**
 * Native date/time controls have large intrinsic min-widths on mobile.
 * Force them to stay within the card on narrow viewports.
 */
export const adminDateFieldClassName = [
  adminFieldClassName,
  "appearance-none [-webkit-appearance:none]",
  "[&::-webkit-datetime-edit]:min-w-0 [&::-webkit-datetime-edit]:max-w-full",
  "[&::-webkit-date-and-time-value]:text-left",
  "[&::-webkit-calendar-picker-indicator]:ml-0 [&::-webkit-calendar-picker-indicator]:shrink-0",
].join(" ");

export const adminLoginFieldClassName =
  "block w-full min-w-0 max-w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-base text-gray-800 outline-none focus:border-teal";
