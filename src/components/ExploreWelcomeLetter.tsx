import Image from "next/image";
import { Caveat } from "next/font/google";
import { welcomeLetter } from "@/lib/welcome-letter";

const signature = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export default function ExploreWelcomeLetter() {
  const wrapAt = 5;
  const paragraphsBefore = welcomeLetter.paragraphs.slice(0, wrapAt);
  const paragraphsBeside = welcomeLetter.paragraphs.slice(wrapAt);

  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
        <p className="font-heading font-semibold tracking-wide text-teal">
          WELCOME TO SEQUOIA CHRISTIAN SCHOOL.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="type-body-sm space-y-3">
          {paragraphsBefore.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="float-left mb-2 mr-4 mt-4 w-40 sm:mr-5 sm:mt-5 sm:w-52">
          <div className="relative h-52 w-full overflow-hidden rounded-lg sm:h-64">
            <Image
              src={welcomeLetter.image}
              alt={welcomeLetter.imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 160px, 208px"
            />
          </div>
        </div>

        <div className="mt-4 flex min-h-52 flex-col sm:mt-5 sm:min-h-64">
          <div className="type-body-sm space-y-3">
            {paragraphsBeside.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <p className={`${signature.className} text-2xl leading-none text-teal sm:text-3xl`}>
              {welcomeLetter.author}
            </p>
            <p className="mt-1 font-heading text-[10px] uppercase tracking-[0.15em] text-teal sm:text-xs">
              {welcomeLetter.role}
            </p>
          </div>
        </div>

        <div className="clear-both" />
      </div>
    </div>
  );
}
