import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import PrincipleApproachAccordion from "@/components/PrincipleApproachAccordion";
import { learningTools, principleApproachSections } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How We Approach Education",
};

const educationalApproachHeroImages = [
  {
    src: "/images/educational-approach/classroom.png",
    alt: "Teacher and students building with blocks in the classroom",
  },
  {
    src: "/images/educational-approach/field-day.png",
    alt: "Students and families at Sequoia field day tug-of-war",
    objectPosition: "bottom",
  },
  {
    src: "/images/educational-approach-hero.jpg",
    alt: "Students learning in the classroom",
  },
];

export default function EducationalApproachPage() {
  return (
    <>
      <HeroSection images={educationalApproachHeroImages} stackImages>
        <h2 className="max-w-3xl text-center font-heading text-xl leading-snug tracking-wide text-white sm:text-2xl md:text-3xl lg:text-4xl">
          HOW WE APPROACH EDUCATION
        </h2>
      </HeroSection>

      <article className="relative z-10 bg-cream">
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <h2 className="type-page-title">WHAT IS THE PRINCIPLE APPROACH?</h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm italic leading-relaxed text-gray-700 sm:text-base md:text-lg">
            &ldquo;America&apos;s historic Christian method of biblical reasoning which makes the
            Truths of God&apos;s Word the basis of every subject in the school curriculum.&rdquo;
          </p>
          <p className="mt-4 text-center text-xs tracking-widest text-gray-500 md:text-sm">
            ROSALIE J. SLATER
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
            <PrincipleApproachAccordion sections={principleApproachSections} />
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-teal/15 bg-white p-8 shadow-sm md:p-10">
            <h5 className="type-subsection-title">
              MANY OTHER TOOLS TO INSPIRE AND ENGAGE THE READER
            </h5>
            <ul className="type-body mt-6 list-disc space-y-3 pl-6">
              {learningTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
