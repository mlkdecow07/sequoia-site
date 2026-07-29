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
      <h2 className="type-page-title">EXPLORE &amp; DISCOVER</h2>

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

      <div className="mx-auto mt-12 max-w-xl">
        <ExploreNextStepsTabs />
      </div>
    </article>
  );
}
