import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { coreValues } from "@/lib/core-values-config";

export const metadata: Metadata = {
  title: "Explore",
};

const highlights = [
  {
    title: "WHO WE ARE",
    text: "Sequoia Christian School is a place where giant dreamers are nurtured. We partner with families to cultivate each child's God-breathed potential through biblical principles, excellent academics, and a safe environment for growth.",
  },
  {
    title: "WHY CHRISTIAN EDUCATION",
    text: "We focus on life-long learning, godly character, and an environment where students can explore life, identity, and their creative potential. Scripture and biblical principles are foundational in everything we do.",
  },
  {
    title: "WHAT MAKES US UNIQUE",
    text: "Like the sequoia seed given life by fire, we believe every student carries holy capacity. We teach with a sense of wonder and use the Principle Approach so God's Word shapes every subject.",
  },
  {
    title: "OUR EDUCATIONAL APPROACH",
    text: "The Principle Approach is America's historic Christian method of biblical reasoning — making the truths of God's Word the basis of every subject in the curriculum.",
    href: "/educationalapproach",
    linkLabel: "Learn about our approach",
  },
];

const nextSteps = [
  { label: "Tuition & Fees", href: "/tuition", description: "Variable tuition and financial aid" },
  { label: "Enrollment Process", href: "/enrollment", description: "Four steps from apply to enroll" },
  { label: "Welcome Letter", href: "/welcome", description: "A letter from our founding pastor" },
  { label: "Testimonials", href: "/testimonials", description: "Hear from Sequoia families" },
];

export default function ExplorePage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="type-page-title">EXPLORE SEQUOIA</h2>
      <p className="type-body mx-auto mt-8 max-w-xl text-center">
        Discover who we are, what we believe about education, and how your family can take the next
        step toward joining Sequoia Christian School.
      </p>

      <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        {highlights.map((item, index) => (
          <div
            key={item.title}
            className={index > 0 ? "border-t border-teal/10" : undefined}
          >
            <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
              <p className="font-heading font-semibold tracking-wide text-teal">{item.title}</p>
            </div>
            <div className="px-5 py-4">
              <p className="type-body">{item.text}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-teal transition hover:text-teal-dark"
                >
                  {item.linkLabel}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
          <p className="font-heading font-semibold tracking-wide text-teal">OUR CORE VALUES</p>
        </div>
        <ul className="divide-y divide-teal/10">
          {coreValues.map((value) => (
            <li key={value.title} className="px-5 py-3.5">
              <p className="font-heading text-sm font-semibold tracking-wide text-teal">
                {value.title}
              </p>
              <p className="type-body-sm mt-1">{value.text}</p>
            </li>
          ))}
        </ul>
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

      <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
        <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
          <p className="font-heading font-semibold tracking-wide text-teal">NEXT STEPS</p>
        </div>
        <ul className="divide-y divide-teal/10">
          {nextSteps.map((step) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-teal/5"
              >
                <span>
                  <span className="block font-heading text-sm font-semibold tracking-wide text-teal">
                    {step.label}
                  </span>
                  <span className="type-body-sm mt-0.5 block text-gray-600">{step.description}</span>
                </span>
                <span className="shrink-0 text-teal" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
