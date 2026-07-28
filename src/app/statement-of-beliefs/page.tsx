import type { Metadata } from "next";
import BeliefStatement from "@/components/BeliefStatement";
import { statementOfBeliefs } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Statement of Beliefs",
};

export default function StatementOfBeliefsPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">STATEMENT OF BELIEFS</h2>

      <div className="mx-auto mt-12 w-full max-w-md space-y-4 sm:max-w-lg">
        {statementOfBeliefs.map((belief) => (
          <BeliefStatement key={belief} belief={belief} />
        ))}
      </div>
    </article>
  );
}
