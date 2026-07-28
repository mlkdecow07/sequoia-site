import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentSchoolYear, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Enrollment Process",
};

const steps = [
  {
    title: "STEP 1: APPLY ONLINE",
    text: "Complete and submit your child's application. A non-refundable fee of $50 must be submitted with each application. You will pay this via credit card upon completion of the application in FACTS.",
  },
  {
    title: "STEP 2: FAMILY INTERVIEW",
    text: "We want to partner with parents/guardians in the education, formation, and training of their child. After the application is received, we will set up a meeting with parents.",
  },
  {
    title: "STEP 3: ACCEPTANCE",
    text: "You will receive notification of your acceptance or denial via FACTS. If you are accepted, you will receive an online acceptance letter and enrollment packet to complete.",
  },
  {
    title: "STEP 4: ENROLLMENT",
    text: "After receiving acceptance, parents will be provided with a link to complete the online enrollment process through FACTS. During enrollment, all parents will need to create an Online Payment Account through FACTS. Any family requesting financial aid will need to complete the Financial Aid and Grant Request portion of FACTS.",
  },
];

export default function EnrollmentPage() {
  const schoolYear = getCurrentSchoolYear();

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">
        ENROLLMENT PROCESS
      </h2>
      <p className="type-body mx-auto mt-8 max-w-xl text-center">
        Sequoia Christian School commits to providing a safe environment for students to explore
        life, identity and their God-breathed creative potential building godly character and
        becoming life-long learners.
      </p>

      <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={index > 0 ? "border-t border-teal/10" : undefined}
          >
            <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
              <p className="font-heading font-semibold tracking-wide text-teal">
                {step.title}
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="type-body">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-xl rounded-xl border border-teal/20 bg-white/95 p-6 shadow-sm md:p-8">
        <div className="text-center">
          <p className="font-heading text-base font-semibold uppercase leading-relaxed tracking-wide text-teal sm:text-lg">
            We are currently accepting applications
            <br />
            for the {schoolYear} school year.
          </p>

          <Link
            href={siteConfig.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-teal px-6 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-dark sm:px-8 sm:py-3 sm:text-sm"
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

          <p className="type-body-sm mx-auto mt-4 whitespace-nowrap italic text-gray-600 max-sm:origin-center max-sm:scale-[0.82]">
            A non-refundable application fee of $50 is required with each application.
          </p>

          <p className="mx-auto mt-8 max-w-xl text-center text-[10px] leading-relaxed text-gray-500 sm:text-xs">
            <span className="font-semibold uppercase tracking-wider">Please Note:</span> New
            students will be charged a $100 enrollment fee per student.
          </p>
        </div>
      </div>

      <p className="type-legal mx-auto mt-8 max-w-xl text-center">
        Sequoia Christian School admits students of any race, color, national and ethnic origin to
        all the rights, privileges, programs, and activities generally accorded or made available to
        students at the school.
      </p>
    </article>
  );
}
