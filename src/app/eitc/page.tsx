import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import EitcFaqAccordion from "@/components/EitcFaqAccordion";
import EitcParticipateTabs from "@/components/EitcParticipateTabs";

export const metadata: Metadata = {
  title: "EITC",
};

const eitcFaqs = [
  {
    question:
      "CAN I REALLY TURN MY PA STATE TAXES INTO A NEED-BASED SCHOLARSHIP THAT HELPS STUDENTS?",
    answer:
      "Yes. Individuals and businesses (Sole Proprietorships, Partnerships, LLCs, S-Corps, C-Corps) can control their PA State income taxes, direct them to a scholarship organization, and use them to fund need-based student scholarships at a Christian school of their choosing. Yes, money an individual already must pay can be directed to support a student.",
  },
  {
    question: "HOW DOES IT WORK?",
    answer:
      "The individual or business completes a one-page non-binding reservation form and submits it to a scholarship organization. When credits are available, the scholarship organization will ask the supporter to complete a one-page joinder (like the reservation form) and makes their contribution to the scholarship organization's Special Purpose Entity (SPE). The scholarship organization will send that contribution to the school of the supporter's designation in the form of need-based student scholarships. The following February, the contributor will receive a 90% tax credit (Form K-1) to file with their State Taxes. In cases where individuals have made payroll withholdings or quarterly tax payments, they will likely receive a state tax refund in July or August in time to pay the following year's taxes to the SPE. And the cycle repeats.",
  },
  {
    question: "WHAT IS A SPECIAL PURPOSE ENTITY (SPE)?",
    answer:
      "An SPE is a legal entity, in which individuals and businesses may participate, that is established to fulfill a narrow, specific, or temporary objective. Life Center Ministries is currently partnering with ACSI (Association of Christian Schools International) Children's Tuition Fund of PA (CTF). The requirement is now $2,000 (a combined income of $65,147 to participate). CTF awards 95% of the contribution to the school and retains 5% to support their legal and legislative efforts to promote the state tax credit program and to protect religious liberty.",
  },
  {
    question: "HOW MUCH CAN I CONTRIBUTE?",
    answer:
      "Individuals and businesses may contribute up to the full amount of their state income tax liability.",
  },
];

const eitcFaqItems = [
  ...eitcFaqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  })),
  {
    question: "HOW CAN I GET STARTED?",
    answer: (
      <>
        You must reserve your credits. Complete the ACSI Children&apos;s Tuition Fund&apos;s
        one-page, non-binding reservation form and submit it to ACSI Children&apos;s Tuition
        Fund&apos;s Catherine Long at{" "}
        <a href="mailto:catherine_long@acsi.org" className="text-teal underline">
          catherine_long@acsi.org
        </a>
        .{" "}
        <span className="mt-2 block text-[10px] tracking-wide text-gray-400 sm:text-xs">
          (For tracking and projecting purposes, we ask that a copy also be sent to{" "}
          <a href="mailto:eitc@sequoiachristian.com" className="text-teal underline">
            eitc@sequoiachristian.com
          </a>
          ).
        </span>
      </>
    ),
  },
  {
    question: "WHAT IF I HAVE MORE QUESTIONS?",
    answer: (
      <div className="space-y-6">
        <p>
          Please don&apos;t hesitate to reach out if you have questions or need assistance as you
          explore redirecting your state income taxes to Sequoia Christian School.
        </p>
        <div className="max-w-md">
          <ContactForm variant="inset" />
        </div>
      </div>
    ),
  },
];

export default function EitcPage() {
  const currentYear = new Date().getFullYear();

  return (
    <article className="py-16">
      <div className="mx-auto max-w-6xl px-6">
      <h2 className="type-page-title">
        WHAT IS EITC?
      </h2>

      <div className="mx-auto mt-10 mb-16 w-full max-w-xl overflow-hidden rounded-2xl shadow-md">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/zf-3g2IMzqQ?rel=0"
            title="What is Variable Tuition?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mx-auto max-w-xl">
        <h3 className="type-section-title text-gray-800">
          EDUCATIONAL IMPROVEMENT TAX CREDIT PROGRAM
        </h3>

        <div className="type-body mt-6 space-y-4">
          <p>
            Thank you for your interest in EITC. Before we begin, here are three questions to ask
            yourself:
          </p>
          <ol className="space-y-2 pl-6">
            <li>
              <strong>PHILOSOPHICAL</strong> – Would I rather my state income taxes{" "}
              <em>(money I already must pay)</em> go to the Department of Revenue or to a
              child&apos;s Christian education?
            </li>
            <li>
              <strong>PRACTICAL</strong> – Can I know what my yearly state income tax liability is for
              the current tax year?
            </li>
            <li>
              <strong>FINANCIAL</strong> – Do I have the cash liquidity to make an upfront
              contribution to the SPE?
            </li>
          </ol>
          <p>
            The EITC program allows individuals and businesses to simply{" "}
            <strong>REDIRECT</strong> their state income taxes to support Sequoia Christian School.
            Because the state of Pennsylvania has awarded the Association of Christian Schools
            International&apos;s{" "}
            <Link
              href="https://childrenstuitionfund.org/states/pennsylvania/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline hover:text-teal-dark"
            >
              Children&apos;s Tuition Fund
            </Link>{" "}
            $8.3 million in credits, there is no better time
            to participate and to secure your tax credits than <strong>RIGHT NOW!</strong>
          </p>

          <div className="pt-2">
            <h4 className="type-subsection-title">
              HOW DOES THE PROGRAM WORK?
            </h4>
            <p className="mt-4">
              An individual and/or business (Sole Proprietorships, Partnerships, LLCs, S-Corps,
              C-Corps) can donate, up to their full state income tax liability, to a scholarship
              organization (
              <Link
                href="https://childrenstuitionfund.org/states/pennsylvania/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal underline hover:text-teal-dark"
              >
                Children&apos;s Tuition Fund
              </Link>
              ) and in return receive a 90% tax credit. That
              scholarship organization will <strong>REDIRECT</strong> your contribution to a Christian
              school of your choice.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-xl">
        <EitcParticipateTabs />
      </div>
      </div>

      <aside
        aria-label="Call to action"
        className="relative mt-16 w-full overflow-hidden bg-teal px-6 py-12 text-center text-white shadow-2xl md:py-14"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.28em] text-white/85 sm:text-base">
            Opportunity in {currentYear}
          </p>
          <p className="eitc-now-attention mt-3 font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl md:text-6xl">
            Is NOW!
          </p>
          <div className="mx-auto mt-8 w-full max-w-xl overflow-hidden rounded-xl shadow-lg ring-1 ring-white/20">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/k39rZzZ2Ryk?rel=0"
                title="Funding through EITC"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="type-body mx-auto mt-6 max-w-xl space-y-3 text-white/95">
            <p>
              ACSI Children&apos;s Tuition Fund currently has $8.3 million in tax credits.
            </p>
            <p>There is a tremendous opportunity to participate this year.</p>
          </div>
          <Link
            href="https://secure.rightsignature.com/signers/6e354775-4a76-45a6-b67e-4cecb6a833b8/sign?access_token=Ca1cTtXYmLAWxviQF7kk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-teal shadow-md transition hover:bg-cream"
          >
            Reserve your credits today
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
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </aside>

      <div className="mx-auto mt-16 max-w-xl px-6">
        <section>
          <h3 className="type-section-title text-center text-gray-800">FAQ&apos;S</h3>
          <div className="mx-auto mt-8 w-full">
            <EitcFaqAccordion items={eitcFaqItems} title="PA TAX CREDIT SCHOLARSHIP PROGRAM" />
          </div>
        </section>
      </div>
    </article>
  );
}
