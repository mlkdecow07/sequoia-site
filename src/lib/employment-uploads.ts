/** Allowed headshot MIME types (must match storage.buckets.allowed_mime_types). */
export const HEADSHOT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
] as const;

/** Allowed resume MIME types (must match storage.buckets.allowed_mime_types). */
export const RESUME_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const HEADSHOT_ACCEPT =
  ".jpg,.jpeg,.png,.webp,.gif,.heic,.heif,image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif";

export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const MIME_ALIASES: Record<string, string> = {
  "image/jpg": "image/jpeg",
  "image/pjpeg": "image/jpeg",
};

function fileExtension(filename: string) {
  const idx = filename.lastIndexOf(".");
  if (idx < 0) return "";
  const ext = filename.slice(idx).toLowerCase();
  return ext.length <= 8 ? ext : "";
}

function normalizeMime(mimeType?: string | null) {
  const raw = mimeType?.split(";")[0]?.trim().toLowerCase() ?? "";
  if (!raw) return "";
  return MIME_ALIASES[raw] ?? raw;
}

/**
 * Resolve a storage-safe Content-Type for an employment upload.
 * Infers from extension when the browser sends empty/octet-stream types.
 */
export function resolveUploadContentType(
  filename: string,
  mimeType: string | undefined,
  kind: "headshot" | "resume",
): string {
  const allowed =
    kind === "headshot" ? HEADSHOT_MIME_TYPES : RESUME_MIME_TYPES;
  const allowedSet = new Set<string>(allowed);

  const normalized = normalizeMime(mimeType);
  if (normalized && allowedSet.has(normalized)) {
    return normalized;
  }

  const fromExt = EXT_TO_MIME[fileExtension(filename)];
  if (fromExt && allowedSet.has(fromExt)) {
    return fromExt;
  }

  const hint =
    kind === "headshot"
      ? "JPG, PNG, WEBP, GIF, or HEIC"
      : "PDF, DOC, or DOCX";
  throw new Error(
    `${kind === "headshot" ? "Headshot" : "Resume"} must be a ${hint} file.`,
  );
}
