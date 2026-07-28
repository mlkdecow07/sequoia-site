import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tuition & Fees",
};

const fundingSources = [
  "Through our successful, EITC funding campaign.",
  "Through generous donors who contribute to our endowment.",
  "Through on-going fundraisers.",
];

const tuitionRates = [
  {
    gradeLines: [
      "Preschool (3 year-olds)",
      "2 half days",
      "Tuesdays & Thursdays",
    ],
    tuition: 1560,
  },
  {
    gradeLines: [
      "Pre-K (4 year-olds)",
      "3 full days",
      "Monday, Wednesday, Friday",
    ],
    tuition: 4644,
  },
  {
    gradeLines: ["Elementary (K-5th)"],
    tuition: 8640,
  },
] as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function monthlyPayment(tuition: number) {
  return formatCurrency(tuition / 12);
}

export default function TuitionPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">
        TUITION & FEES
      </h2>

      <div className="mx-auto mt-10 mb-16 w-full max-w-xl overflow-hidden rounded-2xl shadow-md sm:mb-20">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/zf-3g2IMzqQ?rel=0"
            title="Variable Tuition at Sequoia Christian School"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <h3 className="type-section-title text-gray-800">
        VARIABLE TUITION
      </h3>

      <div className="type-body mx-auto mt-10 max-w-xl space-y-6">
        <p>
          At the Sequoia Christian School we provide an unmatched spiritual environment as a safe
          space for faith-centered education. You&apos;re probably wondering &ldquo;Am I really going to be
          able to afford a private Christian education?&rdquo; Historically, private education has been
          out of reach for many families. At the Sequoia Christian School we are committed to making
          high quality Christian education as accessible as possible. In fact, no students at Sequoia
          Christian School will pay 100% of the cost of their education.
        </p>

        <div>
          <p className="font-semibold text-gray-800">How do we do this?</p>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            {fundingSources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <p>
          Incredibly, every Sequoia Christian student begins with a 20% discount off the total cost
          of education. This commitment is central to our core value of making excellent Christian
          education affordable to all families. To further fulfill this commitment, we are implementing
          a new and progressive program called variable tuition. We may be the first Christian school in
          central Pennsylvania to initiate this program.
        </p>

        <p>
          Your child&apos;s tuition rate is determined with your family&apos;s unique financial position in
          mind. The tuition at Sequoia Christian is not one-size-fits-all. It&apos;s a spectrum ranging
          from 40-80% of the full cost of education. Each family submits a simple, confidential
          financial profile to a third-party service which independently determines tuition
          case-by-case. An excellent Christian education has never been more accessible.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        {tuitionRates.map((row, index) => (
          <div
            key={row.gradeLines.join("-")}
            className={index > 0 ? "border-t border-teal/10" : undefined}
          >
            <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
              <div className="flex items-start gap-4 sm:gap-6">
                <p className="shrink-0 font-heading font-semibold tracking-wide text-teal">
                  {row.gradeLines[0]}
                </p>
                {row.gradeLines.length > 1 && (
                  <div className="min-w-0">
                    {row.gradeLines.slice(1).map((line) => (
                      <p key={line} className="text-[10px] leading-snug text-gray-600 sm:text-[11px]">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-teal/10">
              <div className="px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  Tuition
                </p>
                <p className="mt-1 font-heading text-xl font-semibold text-teal">
                  {formatCurrency(row.tuition)}
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  12 Monthly Payments
                </p>
                <p className="mt-1 font-heading text-xl font-semibold text-teal">
                  {monthlyPayment(row.tuition)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-xl rounded-xl border border-teal/20 bg-white/95 p-6 shadow-sm md:p-8">
        <h3 className="type-section-title text-gray-800">
          FINANCIAL AID
        </h3>

        <div className="type-body mt-6 space-y-6">
          <p>
            Financial aid scholarships are awarded annually and based on a completed online financial
            aid application, the extent of need, and the availability of funds. Eligible families are
            encouraged to apply as early as possible to be considered for the initial round of
            financial aid.
          </p>

          <div className="space-y-4 rounded-xl border border-teal/15 bg-teal/5 px-5 py-5 text-center sm:px-6">
            <p className="font-heading text-sm font-semibold leading-relaxed tracking-wide text-teal sm:text-base">
              Financial Aid applications are accepted between February 1st and April 30th for priority
              consideration.
            </p>
            <p className="text-xs italic leading-relaxed text-gray-600 sm:text-sm">
              Applications after May 1st will be considered as funds remain available.
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-700 sm:text-xs">
              There is a $40 financial aid application fee.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href={siteConfig.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 border-2 border-teal bg-white/95 px-6 py-2.5 text-xs font-semibold tracking-wide text-teal transition hover:bg-teal/5 sm:max-w-sm sm:px-8 sm:py-3 sm:text-sm"
            >
            FINANCIAL AID APPLICATION
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
