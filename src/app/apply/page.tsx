import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apply",
};

export default function ApplyPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16 text-center">
      <h2 className="type-page-title">APPLY TO SEQUOIA CHRISTIAN SCHOOL</h2>

      <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        <div className="space-y-5 px-5 py-8 sm:px-8 sm:py-10">
          <p className="font-heading text-base font-semibold uppercase leading-relaxed tracking-wide text-teal sm:text-lg">
            Ready to become a giant dreamer?
          </p>
          <p className="type-body">
            Complete your application online through our secure FACTS enrollment portal.
          </p>
          <Link
            href={siteConfig.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-teal px-8 py-3 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:px-10 sm:py-4 sm:text-sm"
          >
            START YOUR APPLICATION
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
          <p className="type-caption mx-auto max-w-sm italic">
            A non-refundable application fee of $50 is required with each application.
          </p>
        </div>
      </div>
    </article>
  );
}
