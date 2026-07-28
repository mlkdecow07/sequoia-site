"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type ContactFormProps = {
  variant?: "footer" | "default";
};

export default function ContactForm({ variant = "default" }: ContactFormProps) {
  const isFooter = variant === "footer";
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const adjustMessageHeight = () => {
    const textarea = messageRef.current;
    if (!textarea) return;

    const maxHeight = isFooter ? 160 : 256;

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(() => {
    adjustMessageHeight();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to send your message right now.");
      }

      form.reset();
      adjustMessageHeight();
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
    }
  };

  if (status === "sent") {
    return (
      <p
        className={
          isFooter
            ? "text-center text-xs text-white/90"
            : "rounded border border-teal/20 bg-teal/5 px-4 py-3 text-sm text-teal"
        }
        role="status"
      >
        Thank you — your message has been sent.
      </p>
    );
  }

  return (
    <form
      className={isFooter ? "space-y-2" : "space-y-4"}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          disabled={status === "sending"}
          className={`w-full outline-none ${
            isFooter
              ? "border border-white/25 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/60 focus:border-white/60"
              : "rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-teal"
          }`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          disabled={status === "sending"}
          className={`w-full outline-none ${
            isFooter
              ? "border border-white/25 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/60 focus:border-white/60"
              : "rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-teal"
          }`}
        />
      </div>
      <textarea
        ref={messageRef}
        name="message"
        placeholder="Message"
        rows={isFooter ? 2 : 3}
        required
        disabled={status === "sending"}
        onInput={adjustMessageHeight}
        className={`w-full resize-none outline-none ${
          isFooter
            ? "border border-white/25 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/60 focus:border-white/60"
            : "rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-teal"
        }`}
      />
      {errorMessage ? (
        <p
          className={
            isFooter
              ? "text-center text-[11px] text-red-200"
              : "rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          }
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
      <div className={isFooter ? "text-center" : undefined}>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`inline-flex items-center gap-2 font-semibold uppercase tracking-widest transition disabled:cursor-wait disabled:opacity-70 ${
            isFooter
              ? "bg-white px-4 py-2 text-[10px] text-teal hover:bg-cream"
              : "rounded bg-teal px-5 py-2.5 text-xs text-white hover:bg-teal-dark"
          }`}
        >
          {status === "sending" ? "Sending…" : "Send us a message"}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isFooter ? "h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" : "h-4 w-4 shrink-0"}
            aria-hidden="true"
          >
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  );
}
