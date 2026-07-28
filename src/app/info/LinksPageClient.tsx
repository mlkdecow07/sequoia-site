import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { getCurrentSchoolYear, siteConfig } from "@/lib/site-config";

const links = [
  {
    label: "Apply",
    description: `${getCurrentSchoolYear()} school year`,
    href: siteConfig.applyUrl,
    external: true,
  },
  {
    label: "Explore",
    description: "Who we are and what we believe",
    href: "/explore",
  },
  {
    label: "Tuition & Fees",
    description: "Variable tuition and financial aid",
    href: "/tuition",
  },
  {
    label: "Enrollment Process",
    description: "Four steps to join Sequoia",
    href: "/enrollment",
  },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: FaInstagram },
  { label: "Facebook", href: siteConfig.social.facebook, icon: FaFacebookF },
  { label: "YouTube", href: siteConfig.social.youtube, icon: FaYoutube },
];

export default function LinksPageClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-teal">
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
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/crest-white.png"
            alt="Sequoia Christian School"
            width={128}
            height={128}
            className="h-28 w-28 sm:h-32 sm:w-32"
            priority
          />
          <p className="mt-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white sm:text-sm">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-white/20 bg-black shadow-md">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${siteConfig.youtubeVideoId}?rel=0`}
            title="What is Sequoia Christian School?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {links.map((link) => {
            const className =
              "flex w-full items-center gap-4 border border-white bg-white px-5 py-3.5 text-left shadow-sm transition hover:border-cream hover:bg-cream sm:py-4";

            const content = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block text-xs tracking-wide text-gray-600">
                    {link.description}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </>
            );

            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={link.label} href={link.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:border-white hover:bg-white hover:text-teal"
            >
              <social.icon className="h-5 w-5" aria-hidden />
            </a>
          ))}
        </div>

        <div className="mt-auto pt-10 text-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-widest text-white/70 transition hover:text-white"
          >
            sequoiachristianschool.org
          </Link>
          <p className="mt-3 text-[10px] uppercase tracking-wider text-white/55">
            © {new Date().getFullYear()} Sequoia Christian School
          </p>
        </div>
      </div>
    </div>
  );
}
