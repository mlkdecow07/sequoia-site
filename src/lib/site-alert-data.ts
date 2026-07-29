import { createPublicClient } from "@/lib/supabase/public";
import type { SiteAlert } from "@/lib/supabase/types";

export async function getActiveSiteAlert(): Promise<SiteAlert | null> {
  try {
    const supabase = createPublicClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("site_alerts")
      .select("*")
      .eq("is_active", true)
      .order("updated_at", { ascending: false })
      .limit(5);

    if (error || !data?.length) {
      if (error) {
        console.error("Failed to load site alerts:", error.message);
      }
      return null;
    }

    const active = (data as SiteAlert[]).find((alert) => {
      if (!alert.ends_at) return true;
      return alert.ends_at > now;
    });

    if (!active) return null;

    return {
      ...active,
      display_scope: active.display_scope === "all" ? "all" : "home",
    };
  } catch (error) {
    console.error("Failed to load site alerts:", error);
    return null;
  }
}
