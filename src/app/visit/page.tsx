import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import VisitInquiryForm from "@/components/VisitInquiryForm";
import VisitOptionsTabs from "@/components/VisitOptionsTabs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Ways to Visit",
  description:
    "Schedule a tour of our school or attend Open House at Sequoia Christian School in Harrisburg, PA.",
};

const phoneHref = `tel:+1${siteConfig.phone.replace(/\D/g, "")}`;

const visitExpectItems = [
  "See classrooms and get a feel for daily life on campus",
  "Meet members of our team and ask questions about our programs",
  "Learn how the Principle Approach shapes learning at Sequoia",
  "Discover whether Sequoia is the right partnership for your family",
] as const;

const visitFaqs = [
  {
    question: "How do I schedule a visit?",
    answer: (
      <>
        Use the form on this page or call us at{" "}
        <a href={phoneHref} className="font-semibold text-teal hover:text-teal-dark">
          {siteConfig.phone}
        </a>
        . We&apos;ll help arrange a time that works for your family.
      </>
    ),
  },
  {
    question: "What will we see and do?",
    answer:
      "A campus visit is a chance to walk the school, peek into classrooms, meet our team, and learn how we partner with families through biblical principles and excellent academics. Tell us which grades you're exploring so we can tailor the conversation.",
  },
  {
    question: "Can I bring my children?",
    answer:
      "Yes — families are welcome. Some parents visit first on their own; others bring their children along. Either way works.",
  },
  {
    question: "What grades does Sequoia serve?",
    answer:
      "Sequoia Christian School serves preschool (3-year-olds), Pre-K (4-year-olds), and elementary kindergarten through 5th grade.",
  },
  {
    question: "Is there an Open House?",
    answer: (
      <>
        Yes. Open House dates are posted on our{" "}
        <Link href="/calendar" className="font-semibold text-teal hover:text-teal-dark">
          school calendar
        </Link>
        . You can also schedule a tour of our school anytime.
      </>
    ),
  },
  {
    question: "What comes after a visit?",
    answer: (
      <>
        When you&apos;re ready, review our{" "}
        <Link href="/enrollment" className="font-semibold text-teal hover:text-teal-dark">
          enrollment process
        </Link>
        , explore{" "}
        <Link href="/tuition" className="font-semibold text-teal hover:text-teal-dark">
          tuition &amp; access
        </Link>
        , or{" "}
        <Link href="/apply" className="font-semibold text-teal hover:text-teal-dark">
          begin an application
        </Link>
        .
      </>
    ),
  },
];

export default function VisitPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">WAYS TO VISIT</h2>

      <p className="type-body mx-auto mt-8 max-w-xl text-center">
        The best way to experience Sequoia Christian School is to come to campus. See our
        classrooms, meet our team, and get a feel for the community where giant dreamers are
        nurtured.
      </p>

      <section className="mx-auto mt-12 max-w-xl" aria-label="Visit options">
        <VisitOptionsTabs />
      </section>

      <section
        id="schedule-a-visit"
        className="mx-auto mt-12 max-w-xl scroll-mt-24 rounded-xl border border-teal/20 bg-white/95 p-6 shadow-sm md:p-8"
      >
        <h3 className="type-section-title text-teal">SCHEDULE A VISIT</h3>
        <p className="type-body mx-auto mt-6 max-w-lg text-center">
          Tell us a bit about your family and the grades you&apos;re considering. We&apos;ll follow
          up to arrange a tour of our school.
        </p>
        <ul className="type-body mx-auto mt-6 max-w-lg list-disc space-y-2 pl-6">
          {visitExpectItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mx-auto mt-8 max-w-xl">
          <VisitInquiryForm />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-xl" aria-labelledby="visit-faq-heading">
        <h3 id="visit-faq-heading" className="type-section-title text-center text-gray-800">
          FAQs
        </h3>
        <div className="mt-5">
          <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
            <div className="border-b border-teal/10 bg-teal/5 px-4 py-2.5">
              <p className="font-heading text-sm font-semibold tracking-wide text-teal">
                BEFORE YOU VISIT
              </p>
            </div>
            <Accordion
              singleOpen
              compact
              titleClassName="font-heading text-left text-xs font-semibold tracking-wide text-teal sm:text-sm"
              contentClassName="type-body-sm"
              itemClassName="!mb-0 !px-4 !py-2.5 border-b border-teal/10 bg-white last:border-b-0"
              items={visitFaqs.map((item) => ({
                id: item.question,
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
