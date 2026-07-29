import { NextResponse } from "next/server";
import { emailTo, escapeHtml, formatMultiline, resend } from "@/lib/resend";
import { createAdminClient } from "@/lib/supabase/admin";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const source = body.source?.trim() || null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message, source });

    if (insertError) {
      console.error("contact_submissions insert failed:", insertError);
      return NextResponse.json(
        { error: "Unable to save your message right now." },
        { status: 500 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "info@sequoiachristian.com",
      to: emailTo,
      replyTo: email,
      subject: `Website contact from ${name}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${source ? `<p><strong>Source:</strong> ${escapeHtml(source)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${formatMultiline(message)}</p>
      `,
    });

    if (error) {
      console.error("contact email send failed after save:", error);
      return NextResponse.json({
        saved: true,
        emailSent: false,
        warning: "Message saved, but email notification failed.",
      });
    }

    return NextResponse.json({ saved: true, emailSent: true, data });
  } catch (error) {
    console.error("contact route error:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
