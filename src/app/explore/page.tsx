import type { Metadata } from "next";
import CoreValuesTabs from "@/components/CoreValuesTabs";
import ExploreHighlightsTabs from "@/components/ExploreHighlightsTabs";
import ExploreNextStepsTabs from "@/components/ExploreNextStepsTabs";
import ExplorePromoVideo from "@/components/ExplorePromoVideo";
import ExploreWelcomeLetter from "@/components/ExploreWelcomeLetter";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">EXPLORE &amp; DISCOVER</h2>

      <ExplorePromoVideo />

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
