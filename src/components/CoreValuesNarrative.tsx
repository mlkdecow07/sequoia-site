import Image from "next/image";

type CoreValuesNarrativeProps = {
  /** Which portion to render. Default: full copy. */
  part?: "full" | "intro" | "mid" | "rest";
};

export default function CoreValuesNarrative({
  part = "full",
}: CoreValuesNarrativeProps) {
  const intro = (
    <p className="max-w-3xl border-l-4 border-teal pl-5 text-left font-heading text-xl font-semibold leading-snug tracking-wide text-teal sm:pl-6 sm:text-2xl md:text-3xl">
      The formative years of every child is sacred, and hidden in each tender heart is the
      God-breathed holy potential of a bright future.
    </p>
  );

  const mid = (
    <>
      <p className="type-body text-left">
        Sequoia Christian School is committed to creating a safe environment to explore life, a safe
        environment to explore their identity, and a safe environment to explore their creative
        dreams.
      </p>
      <p className="type-body text-left">
        At the heart of our school are our incredible teachers who daily carry the message and vision
        of Sequoia with joy, passion and care. THEY are our living curriculum — each one fulfilling
        their own call to inspire, instruct and impart to the next generation.
      </p>
      <p className="type-body text-left">
        All of our core values serve to prepare your sons and daughters — intellectually, spiritually,
        and relationally. This prayerfully formatted environment will cultivate influencers, leaders
        and freedom-loving citizens, steeped in the goodness of God. In addition to excellent
        academics and a biblical foundation, we are intentional about providing programs like Music,
        Physical Education, Robotics, Home Economics, Art, and real life business to create a space
        for students to apply themselves in different ways.
      </p>
    </>
  );

  const rest = (
    <div className="relative w-full overflow-hidden">
      <Image
        src="/images/sequoia-canopy.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
              <filter id='n'>
                <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>
                <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/>
              </filter>
              <rect width='100%' height='100%' filter='url(#n)'/>
            </svg>`,
          )}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative flex min-h-[36vh] items-center justify-center px-6 py-16 text-center sm:min-h-[40vh] sm:px-10 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:gap-10">
          <div className="space-y-4 sm:space-y-5">
            <p className="font-heading text-xl font-semibold uppercase leading-snug tracking-[0.12em] text-white sm:text-2xl md:text-3xl md:leading-snug lg:text-4xl">
              The DNA of the magnificent Sequoia tree is coded in every tiny seed…
            </p>
            <p className="font-heading text-xl font-semibold uppercase leading-snug tracking-[0.12em] text-white sm:text-2xl md:text-3xl md:leading-snug lg:text-4xl">
              And within the seed contains the holy capacity of giant dreams.
            </p>
          </div>
          <p className="font-heading text-sm font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/90 sm:text-base md:text-lg">
            Sequoia Christian School
            <span className="mt-2 block tracking-[0.14em]">Where Giant Dreamers Are Nurtured.</span>
          </p>
        </div>
      </div>
    </div>
  );

  if (part === "rest") {
    return rest;
  }

  const alignClass = part === "full" ? "text-center" : "text-left";

  return (
    <div className={`type-body mx-auto max-w-3xl space-y-5 ${alignClass}`}>
      {(part === "full" || part === "intro") && intro}
      {(part === "full" || part === "mid") && mid}
      {part === "full" && rest}
    </div>
  );
}
