import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import EitcFaqAccordion from "@/components/EitcFaqAccordion";

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
];

const stepIconClassName = "mt-0.5 shrink-0 text-gray-900";

const stepIcons = [
  (
    <span key="step-1" className={stepIconClassName} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ),
  (
    <span key="step-2" className={stepIconClassName} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 6-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ),
  (
    <span key="step-3" className={stepIconClassName} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4 12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ),
];

export default function EitcPage() {
  const currentYear = new Date().getFullYear();

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
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

      <div className="mx-auto mt-16 max-w-xl space-y-10">
        <section className="rounded-xl border border-teal/20 bg-white/95 p-6 shadow-sm md:p-8">
          <h4 className="type-subsection-title">HOW CAN I PARTICIPATE?</h4>
          <p className="type-body mt-2 font-semibold text-gray-800">IT&apos;S SIMPLE!!</p>
          <div className="type-body mt-4 space-y-5">
            <div className="flex items-start gap-4">
              {stepIcons[0]}
              <div>
                <p>
                  <strong>STEP 1: RESERVE YOUR CREDITS</strong>
                </p>
                <p className="mt-2">
                  Complete a{" "}
                  <Link
                    href="https://secure.rightsignature.com/signers/6e354775-4a76-45a6-b67e-4cecb6a833b8/sign?access_token=Ca1cTtXYmLAWxviQF7kk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal underline"
                  >
                    Children&apos;s Tuition Fund Reservation Form
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              {stepIcons[1]}
              <div>
                <p>
                  <strong>STEP 2: CONTRIBUTE YOUR TAXES</strong>
                </p>
                <p className="mt-2">
                  Scan and email reservation form to Catherine Long{" "}
                  <em>(Manager, ACSI Children&apos;s Tuition Fund).</em>
                </p>
                <p className="type-caption mt-3 border-l-2 border-teal/30 pl-3 italic">
                  Please copy{" "}
                  <a href="mailto:eitc@sequoiachristian.com" className="text-teal underline not-italic">
                    eitc@sequoiachristian.com
                  </a>{" "}
                  for purpose of record keeping and helping to ensure you receive your credits.
                </p>
                <a
                  href="mailto:catherine_long@acsi.org,eitc@sequoiachristian.com?subject=EITC%20Reservation%20Form%3A%20Sequoia%20Christian%20School"
                  className="mt-4 inline-flex items-center gap-2 rounded border-2 border-teal bg-white/95 px-5 py-2.5 text-sm font-semibold tracking-wide text-teal transition hover:bg-teal/5"
                >
                  SEND RESERVATION FORM
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
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              {stepIcons[2]}
              <div>
                <p>
                  <strong>STEP 3: RECEIVE A 90% TAX CREDIT</strong>
                </p>
                <p className="mt-2">
                  After CTF receives your reservation form and the credits from the state of
                  Pennsylvania, you will receive an email asking you to complete a similar form{" "}
                  <em>(called a &ldquo;joinder&rdquo;)</em> online. This can be several days to several months after
                  you complete your reservation form. Once you complete the online joinder, you will
                  have 15 to 20 days to make your contribution either by secure ACH or check.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full overflow-hidden rounded-2xl shadow-md">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/k39rZzZ2Ryk?rel=0"
              title="Funding through EITC"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <section>
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="type-subsection-title block w-full text-center">
              PA TAX CREDIT SCHOLARSHIP PROGRAM
            </span>
            <span className="block font-heading text-sm font-normal uppercase tracking-[0.25em] text-gray-500 sm:text-base md:text-lg md:tracking-[0.3em]">
              FAQ&apos;S
            </span>
          </div>
          <div className="mx-auto mt-8 w-full">
            <EitcFaqAccordion items={eitcFaqItems} />
          </div>
        </section>

        <div className="mx-auto max-w-xl rounded-xl bg-teal px-6 py-8 text-center text-white shadow-xl ring-1 ring-black/5 md:px-10 md:py-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
            Opportunity in {currentYear}
          </p>
          <p className="mt-2 font-heading text-2xl font-bold uppercase tracking-wide sm:text-3xl md:text-4xl">
            Is NOW!
          </p>
          <div className="type-body mx-auto mt-6 max-w-xl space-y-3 text-white/95">
            <p>
              ACSI Children&apos;s Tuition Fund currently has $8.3 million in tax credits.
            </p>
            <p>There is a tremendous opportunity to participate this year.</p>
            <p className="pt-2 text-base font-bold uppercase tracking-wide text-white sm:text-lg">
              Reserve your credits today!
            </p>
          </div>
        </div>

        <section className="text-center">
          <h4 className="type-subsection-title">WHAT IF I HAVE MORE QUESTIONS?</h4>
          <p className="type-body mx-auto mt-4 max-w-xl">
            Please don&apos;t hesitate to reach out if you have questions or need assistance as you
            explore redirecting your state income taxes to Sequoia Christian School.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <ContactForm />
          </div>
        </section>
      </div>
    </article>
  );
}
