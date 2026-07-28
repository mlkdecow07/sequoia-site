import { NextResponse } from "next/server";
import { emailFrom, emailTo, escapeHtml, formatMultiline, resend } from "@/lib/resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: `Sequoia Christian School <${emailFrom}>`,
      to: emailTo,
      replyTo: email,
      subject: `Website contact from ${name}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${formatMultiline(message)}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
