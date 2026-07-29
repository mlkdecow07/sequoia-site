import type { Metadata } from "next";
import Link from "next/link";
import BeliefStatement from "@/components/BeliefStatement";
import { siteConfig, statementOfFaith } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "What We Believe",
};

export default function StatementOfFaithPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">WHAT WE BELIEVE</h2>

      <div className="mx-auto mt-12 w-full max-w-md space-y-4 sm:max-w-lg">
        {statementOfFaith.map((belief) => (
          <BeliefStatement key={belief} belief={belief} />
        ))}
      </div>

      <div className="type-body mx-auto mt-8 w-full max-w-md text-center sm:max-w-lg">
        <p>
          Sequoia Christian School is affiliated with{" "}
          <Link
            href={siteConfig.lifeCenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal underline hover:text-teal-dark"
          >
            Life Center
          </Link>
          .
        </p>
        <p className="mt-2 italic">
          <Link href="/statement-of-beliefs" className="text-teal underline hover:text-teal-dark">
            This statement
          </Link>{" "}
          expresses the beliefs we share with our church.
        </p>
      </div>
    </article>
  );
}
