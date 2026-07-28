import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { siteConfig } from "@/lib/site-config";
import ContactForm from "./ContactForm";

const socialIconClass = "h-4 w-4 sm:h-5 sm:w-5";

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: (
      <FaInstagram className={socialIconClass} aria-hidden="true" />
    ),
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: (
      <FaFacebookF className={socialIconClass} aria-hidden="true" />
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: (
      <FaYoutube className={socialIconClass} aria-hidden="true" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full overflow-hidden bg-teal text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
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
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)`,
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="text-center">
          <p className="font-heading text-sm leading-snug tracking-[0.15em] text-white sm:text-base sm:tracking-[0.18em] md:whitespace-nowrap md:text-lg md:tracking-[0.2em]">
            DISCOVERING THE POTENTIAL{" "}
            <br className="md:hidden" />
            IN EVERY SACRED SEED
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="contents md:flex md:max-w-md md:flex-col">
            <div className="order-1 w-full">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
                <Link
                  href={siteConfig.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-auto shrink-0 items-center justify-center gap-2 bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-teal transition hover:bg-cream sm:px-6 sm:py-3 sm:text-xs"
                >
                  Join Sequoia Christian School
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
                <Link
                  href={siteConfig.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-auto shrink-0 items-center justify-center gap-1.5 border-2 border-cream bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-cream transition hover:bg-cream hover:text-teal sm:px-6 sm:py-3 sm:text-xs"
                >
                  Donate
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="order-3 mt-6 flex w-full items-start gap-3 sm:gap-6 md:order-2">
              <div className="shrink-0">
                <Image
                  src="/images/crest-white.png"
                  alt="Sequoia Christian School crest"
                  width={72}
                  height={72}
                  className="h-14 w-14 opacity-95 sm:h-16 sm:w-16"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="font-heading text-[9px] uppercase leading-snug tracking-[0.12em] text-white/90 sm:text-[11px]">
                  Where Giant Dreamers Are Nurtured
                </p>
                <address className="mt-1 not-italic text-[10px] leading-snug text-white/80 sm:text-xs">
                  <span className="whitespace-pre-line">{siteConfig.address}</span>
                  <br />
                  <a href="tel:+17176141263" className="transition hover:text-white">
                    {siteConfig.phone}
                  </a>
                </address>
              </div>
            </div>
          </div>

          <div className="order-2 w-full md:max-w-sm md:shrink-0 md:self-end">
            <ContactForm variant="footer" />
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-2.5 pb-4">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-white/90 transition hover:text-white"
          >
            {link.icon}
          </Link>
        ))}
      </div>

      <div className="relative py-2.5 text-center text-[10px] uppercase tracking-wider text-white/70">
        © {new Date().getFullYear()} Sequoia Christian School. All rights reserved.
      </div>
    </footer>
  );
}
