"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionStatus } from "@/lib/supabase/types";

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
