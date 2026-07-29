import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      referrer?: string;
      path?: string;
    };

    const referrer =
      typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null;
    const path =
      typeof body.path === "string" && body.path.startsWith("/")
        ? body.path.slice(0, 200)
        : "/info";
    const userAgent = request.headers.get("user-agent")?.slice(0, 300) ?? null;

    const supabase = createAdminClient();
    const { error } = await supabase.from("info_page_views").insert({
      path,
      referrer,
      user_agent: userAgent,
    });

    if (error) {
      console.error("info_page_views insert failed:", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("info-view error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
