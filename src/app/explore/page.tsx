import type { Metadata } from "next";
import Link from "next/link";
import CoreValuesTabs from "@/components/CoreValuesTabs";
import ExploreHighlightsTabs from "@/components/ExploreHighlightsTabs";
import ExploreNextStepsTabs from "@/components/ExploreNextStepsTabs";
import ExploreWelcomeLetter from "@/components/ExploreWelcomeLetter";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">EXPLORE SEQUOIA</h2>

      <div className="relative mx-auto mt-8 aspect-video w-full max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-black shadow-sm">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${siteConfig.youtubeVideoId}?rel=0`}
          title="What is Sequoia Christian School?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <p className="type-body mx-auto mt-8 max-w-xl text-center">
        Discover who we are, what we believe about education, and how your family can take the next
        step toward joining Sequoia Christian School.
      </p>

      <div className="mx-auto mt-12 max-w-xl">
        <ExploreWelcomeLetter />
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <ExploreHighlightsTabs />
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <CoreValuesTabs />
      </div>

      <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
          <p className="font-heading font-semibold tracking-wide text-teal">TUITION &amp; ACCESS</p>
        </div>
        <div className="space-y-4 px-5 py-5">
          <p className="type-body">
            No student at Sequoia pays 100% of the cost of education. Every student begins with a 20%
            discount, and variable tuition is set with your family&apos;s unique financial position in
            mind — typically ranging from 40–80% of the full cost.
          </p>
          <p className="type-body">
            Financial aid scholarships are also available for eligible families. Learn more on our
            tuition page, including EITC opportunities for businesses and individuals who want to
            support Christian education.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tuition"
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
            >
              Tuition &amp; Fees <span aria-hidden>→</span>
            </Link>
            <Link
              href="/eitc"
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
            >
              Learn about EITC <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <ExploreNextStepsTabs />
      </div>

      <div className="mx-auto mt-12 max-w-xl rounded-xl border border-teal/20 bg-white/95 p-6 text-center shadow-sm md:p-8">
        <p className="font-heading text-base font-semibold uppercase leading-relaxed tracking-wide text-teal sm:text-lg">
          Ready to become a giant dreamer?
        </p>
        <Link
          href={siteConfig.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded bg-teal px-6 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:px-8 sm:py-3 sm:text-sm"
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
        <p className="type-caption mx-auto mt-4 max-w-sm italic">
          A non-refundable application fee of $50 is required with each application.
        </p>
        <Link
          href="/enrollment"
          className="mt-4 inline-block text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
        >
          Or review the enrollment process →
        </Link>
      </div>
    </article>
  );
}
