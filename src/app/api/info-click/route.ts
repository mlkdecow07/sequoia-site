import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      label?: string;
      href?: string;
      linkType?: string;
    };

    const label =
      typeof body.label === "string" ? body.label.trim().slice(0, 120) : "";
    const href =
      typeof body.href === "string" ? body.href.trim().slice(0, 500) : "";
    const linkType =
      typeof body.linkType === "string"
        ? body.linkType.trim().slice(0, 40)
        : "button";

    if (!label || !href) {
      return NextResponse.json({ ok: false, error: "Missing label or href" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("info_link_clicks").insert({
      label,
      href,
      link_type: linkType || "button",
    });

    if (error) {
      console.error("info_link_clicks insert failed:", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("info-click error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
