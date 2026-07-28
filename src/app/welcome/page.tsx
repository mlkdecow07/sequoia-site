import type { Metadata } from "next";
import Link from "next/link";
import { Caveat } from "next/font/google";
import HeroSection from "@/components/HeroSection";
import ScrollRevealColorImage from "@/components/ScrollRevealColorImage";
import { siteConfig } from "@/lib/site-config";

const signature = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome Letter",
};

const welcomeHeroImages = [
  { src: "/images/history-building.png", alt: "Sequoia Christian School campus" },
];

export default function WelcomePage() {
  return (
    <>
      <HeroSection images={welcomeHeroImages} mobileTripleGrayscale>
        <p className="max-w-3xl text-center font-heading text-3xl leading-tight tracking-wide text-white md:text-4xl lg:text-5xl">
          &ldquo;FOR THE PURPOSES
          <br />
          <span className="italic">OF TRAINING,</span>
          <br />
          FOR THE PURPOSES
          <br />
          <span className="italic">OF THE LITTLE CHILDREN&rdquo;</span>
        </p>
        <p className="text-center text-xs tracking-widest text-white/90 md:text-sm">
          A PROPHETIC WORD GIVEN TO LIFE CENTER
          <br />
          KIM CLEMENT · 1991
        </p>
      </HeroSection>

      <article className="relative z-10 bg-cream">
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <h2 className="type-page-title">A LETTER FROM OUR FOUNDING PASTOR</h2>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-stretch">
            <ScrollRevealColorImage
              src="/images/pastor-photo.jpg"
              alt="Charles and Ann Stock"
              sizes="(max-width: 768px) 100vw, 50vw"
              containerClassName="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md md:aspect-auto md:min-h-0 md:h-full"
            />
            <div>
              <div className="type-body space-y-4">
                <p>
                  In the midst of cultural chaos, Life Center is planting seeds. We are believing and
                  sowing for a great and multi-generational harvest with a school that will nurture and
                  educate children in eternal truth and heavenly wisdom, deeply rooted in the love of God.
                </p>
                <p>
                  The Sequoia Christian School partners with parents to cultivate each young
                  scholar&apos;s seed potential. The name is inspired by the giant sequoia tree which grows
                  from tiny seeds. Given the right environment, the mature tree is fireproof and becomes
                  the largest and longest-lived of all organisms in God&apos;s creation.
                </p>
                <p>
                  Sequoia Christian School strives to cultivate influencers and leaders, freedom-loving
                  citizens who are equipped for lifelong growth in virtue, grace, and personal knowledge
                  of God&apos;s goodness. Utilizing an exceptional curriculum and intentional activities, we
                  focus on the development of one&apos;s full humanity, preparing your sons and daughters –
                  intellectually, spiritually, and relationally – with personal habits and skills to foster
                  responsible, fruitful lives. Our desire is for our students to fulfill their
                  God-breathed, holy potential becoming a blessing to the nations.
                </p>
                <p>With great expectation,</p>
                <div className="mt-2 text-left">
                  <div className="inline-block max-w-full">
                    <p
                      className={`${signature.className} m-0 text-3xl leading-none text-teal md:text-4xl`}
                    >
                      Charles Stock
                    </p>
                    <p className="m-0 mt-1 font-heading text-xs uppercase tracking-[0.15em] text-teal sm:text-sm">
                      Founding Pastor of{" "}
                      <Link
                        href={siteConfig.lifeCenterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-teal-dark"
                      >
                        Life Center
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
