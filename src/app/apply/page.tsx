import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apply",
};

export default function ApplyPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16 text-center">
      <h2 className="type-page-title">
        APPLY TO SEQUOIA CHRISTIAN SCHOOL
      </h2>
      <p className="type-lead mx-auto mt-10 max-w-2xl text-center">
        Ready to become a giant dreamer?
      </p>
      <p className="type-body mx-auto mt-4 max-w-2xl">
        Complete your application online through our secure FACTS enrollment portal.
      </p>
      <Link
        href={siteConfig.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded bg-teal px-8 py-3 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:px-10 sm:py-4 sm:text-sm md:text-base"
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
      <p className="type-caption mx-auto mt-8 max-w-xl italic">
        A non-refundable application fee of $50 is required with each application.
      </p>
    </article>
  );
}
