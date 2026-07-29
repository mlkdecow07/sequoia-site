"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionStatus } from "@/lib/supabase/types";

function revalidateCalendarPaths() {
  revalidatePath("/calendar");
  revalidatePath("/calendar/month", "layout");
  revalidatePath("/admin/calendar");
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    redirect("/admin/login?error=" + encodeURIComponent("Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      "/admin/login?error=" +
        encodeURIComponent(error.message) +
        (next && next !== "/admin" ? `&next=${encodeURIComponent(next)}` : ""),
    );
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateContactStatus(id: string, status: SubmissionStatus) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/contact");
  revalidatePath(`/admin/contact/${id}`);
}

export async function updateEmploymentStatus(
  id: string,
  status: SubmissionStatus,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { error } = await supabase
    .from("employment_applications")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/employment");
  revalidatePath(`/admin/employment/${id}`);
}

async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

function readCalendarForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const dates = String(formData.get("dates") ?? "").trim();
  const startDate = String(formData.get("start_date") ?? "").trim();
  const endDateRaw = String(formData.get("end_date") ?? "").trim();
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const sortOrderRaw = String(formData.get("sort_order") ?? "").trim();

  if (!title || !dates || !startDate) {
    throw new Error("Title, dates display string, and start date are required.");
  }

  const endDate = endDateRaw || null;
  if (endDate && endDate < startDate) {
    throw new Error("End date must be on or after the start date.");
  }

  let sortOrder: number | null = null;
  if (sortOrderRaw) {
    const parsed = Number(sortOrderRaw);
    if (Number.isNaN(parsed)) {
      throw new Error("Sort order must be a number.");
    }
    sortOrder = parsed;
  }

  return {
    title,
    dates,
    start_date: startDate,
    end_date: endDate,
    description: descriptionRaw || null,
    sort_order: sortOrder,
  };
}

export async function createCalendarEvent(formData: FormData) {
  const supabase = await requireAdminUser();
  const payload = readCalendarForm(formData);

  const { error } = await supabase.from("calendar_events").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCalendarPaths();
  revalidatePath("/admin");
  redirect("/admin/calendar");
}

export async function updateCalendarEvent(id: string, formData: FormData) {
  const supabase = await requireAdminUser();
  const payload = readCalendarForm(formData);

  const { error } = await supabase
    .from("calendar_events")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCalendarPaths();
  revalidatePath(`/admin/calendar/${id}`);
  redirect("/admin/calendar");
}

export async function deleteCalendarEvent(id: string) {
  const supabase = await requireAdminUser();

  const { error } = await supabase.from("calendar_events").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateCalendarPaths();
  revalidatePath("/admin");
  redirect("/admin/calendar");
}

function revalidateAlertPaths() {
  revalidatePath("/");
  revalidatePath("/admin/alerts");
}

function readAlertForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const isActive = formData.get("is_active") === "on";
  const endsAtRaw = String(formData.get("ends_at") ?? "").trim();

  if (!title || !message) {
    throw new Error("Title and message are required.");
  }

  return {
    title,
    message,
    is_active: isActive,
    ends_at: endsAtRaw ? new Date(endsAtRaw).toISOString() : null,
  };
}

export async function createSiteAlert(formData: FormData) {
  const supabase = await requireAdminUser();
  const payload = readAlertForm(formData);

  if (payload.is_active) {
    await supabase.from("site_alerts").update({ is_active: false }).eq("is_active", true);
  }

  const { error } = await supabase.from("site_alerts").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidateAlertPaths();
  revalidatePath("/admin");
  redirect("/admin/alerts");
}

export async function updateSiteAlert(id: string, formData: FormData) {
  const supabase = await requireAdminUser();
  const payload = readAlertForm(formData);

  if (payload.is_active) {
    await supabase
      .from("site_alerts")
      .update({ is_active: false })
      .eq("is_active", true)
      .neq("id", id);
  }

  const { error } = await supabase
    .from("site_alerts")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateAlertPaths();
  revalidatePath(`/admin/alerts/${id}`);
  redirect("/admin/alerts");
}

export async function deleteSiteAlert(id: string) {
  const supabase = await requireAdminUser();

  const { error } = await supabase.from("site_alerts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateAlertPaths();
  revalidatePath("/admin");
  redirect("/admin/alerts");
}
