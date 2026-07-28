import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailFrom =
  process.env.RESEND_FROM_EMAIL ?? "noreply@sequoiachristian.com";

export const emailTo = process.env.EMAIL_TO ?? "info@sequoiachristian.com";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatMultiline(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}
