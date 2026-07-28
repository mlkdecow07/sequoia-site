"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation, pagesWithFullHero } from "@/lib/site-config";
import { HERO_SCROLL_END_SELECTOR } from "@/lib/hero-config";

const desktopNavItemClass =
  "inline-flex shrink-0 items-center gap-1 whitespace-nowrap border-b border-transparent pb-px font-heading text-xs uppercase tracking-wide text-white transition-colors duration-300 ease-out hover:border-white/80 hover:text-white/80 sm:text-[13px]";

const mobileNavItemClass =
  "inline-flex items-center gap-2 whitespace-nowrap border-b border-transparent pb-px font-heading text-[15px] uppercase tracking-wide text-gray-700 transition-colors duration-300 ease-out hover:border-teal hover:text-teal";

const HEADER_FADE_DISTANCE = 72;

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

type NavAnchorProps = {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function NavAnchor({ href, className, children, onClick }: NavAnchorProps) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} prefetch={false}>
      {children}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const hasFullHero = pagesWithFullHero.includes(
    pathname as (typeof pagesWithFullHero)[number],
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [desktopOpenLabel, setDesktopOpenLabel] = useState<string | null>(null);
  const [headerProgress, setHeaderProgress] = useState(hasFullHero ? 0 : 1);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hasFullHero) {
      setHeaderProgress(1);
      return;
    }

    const updateHeroState = () => {
      const heroEnd = document.querySelector(HERO_SCROLL_END_SELECTOR);
      if (!heroEnd) {
        setHeaderProgress(1);
        return;
      }

      const { bottom } = heroEnd.getBoundingClientRect();

      if (bottom > HEADER_FADE_DISTANCE) {
        setHeaderProgress(0);
        return;
      }

      if (bottom <= 0) {
        setHeaderProgress(1);
        return;
      }

      setHeaderProgress(1 - bottom / HEADER_FADE_DISTANCE);
    };

    updateHeroState();
    window.addEventListener("scroll", updateHeroState, { passive: true });
    window.addEventListener("resize", updateHeroState);

    return () => {
      window.removeEventListener("scroll", updateHeroState);
      window.removeEventListener("resize", updateHeroState);
    };
  }, [hasFullHero, pathname]);

  const headerSolid = !hasFullHero || headerProgress >= 1;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setOpenSections({});
    }
  }, [menuOpen]);

  useEffect(() => {
    setDesktopOpenLabel(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopOpenLabel) {
      return;
    }

    const closeDesktopMenu = () => setDesktopOpenLabel(null);

    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDesktopMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDesktopMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [desktopOpenLabel]);

  const toggleSection = (label: string) => {
    setOpenSections((current) => ({
      ...current,
      [label]: !current[label],
    }));
  };

  const toggleDesktopSection = (label: string) => {
    setDesktopOpenLabel((current) => (current === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-teal transition-[opacity,box-shadow] duration-500 ease-in-out ${
            headerSolid ? "rounded-b-2xl shadow-sm md:rounded-none" : "shadow-none"
          }`}
          style={{ opacity: hasFullHero ? headerProgress : 1 }}
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-6 px-6 py-1.5 md:px-10 md:py-2">
            <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)} prefetch={false}>
              <Image
                src="/images/combo-logo.png"
                alt="Sequoia Christian School"
                width={280}
                height={80}
                className="h-10 w-auto md:h-12"
                priority
              />
            </Link>

            <nav ref={navRef} className="relative z-20 hidden md:block">
              <ul className="flex flex-nowrap items-center justify-end gap-6 lg:gap-8">
                {navigation.map((item, index) =>
                  item.children ? (
                    <li key={item.label} className="relative shrink-0">
                      <button
                        type="button"
                        aria-expanded={desktopOpenLabel === item.label}
                        aria-haspopup="true"
                        onClick={() => toggleDesktopSection(item.label)}
                        className="bg-transparent p-0"
                      >
                        <span
                          className={`${desktopNavItemClass} ${
                            desktopOpenLabel === item.label ? "border-white/80" : ""
                          }`}
                        >
                          {item.label}
                          <span className="text-[10px] leading-none" aria-hidden>
                            ▾
                          </span>
                        </span>
                      </button>
                      {desktopOpenLabel === item.label ? (
                        <ul
                          className={`absolute top-full z-50 mt-2 min-w-[220px] border border-gray-100 bg-white/95 py-2 shadow-lg ${
                            index === navigation.length - 1 ? "right-0" : "left-0"
                          }`}
                        >
                          {item.children.map((child) => (
                            <li key={`${item.label}-${child.label}`}>
                              <NavAnchor
                                href={child.href}
                                onClick={() => setDesktopOpenLabel(null)}
                                className="block px-4 py-2 text-xs text-gray-700 transition hover:bg-cream hover:text-teal hover:underline hover:underline-offset-2"
                              >
                                {child.label}
                              </NavAnchor>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ) : (
                    <li key={item.href} className="shrink-0">
                      <NavAnchor href={item.href} className={desktopNavItemClass}>
                        {item.label}
                      </NavAnchor>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu-mobile"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1 border border-white/30 bg-white/10 transition hover:bg-white/20 md:hidden"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>

          {desktopOpenLabel ? (
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-10 hidden cursor-default bg-transparent md:block"
              onClick={() => setDesktopOpenLabel(null)}
            />
          ) : null}

          {menuOpen ? (
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 top-0 z-40 bg-black/20 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
          ) : null}

          <nav
            id="site-menu-mobile"
            className={`absolute right-4 top-full z-50 mt-2 w-[calc(100%-2rem)] overflow-hidden border border-gray-100 bg-white/95 shadow-xl transition-all duration-300 ease-out md:hidden sm:right-6 sm:w-80 ${
              menuOpen
                ? "visible max-h-[80vh] translate-y-0 opacity-100"
                : "invisible max-h-0 -translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <ul className="max-h-[80vh] overflow-y-auto py-2">
              {navigation.map((item) =>
                item.children ? (
                  <li key={item.label} className="border-b border-gray-100 last:border-0">
                    <button
                      type="button"
                      aria-expanded={!!openSections[item.label]}
                      onClick={() => toggleSection(item.label)}
                      className="w-full px-5 py-3.5 text-left transition hover:bg-cream"
                    >
                      <span
                        className={`${mobileNavItemClass} ${
                          openSections[item.label] ? "border-teal text-teal" : ""
                        }`}
                      >
                        {item.label}
                        <span
                          className={`text-xs text-teal transition ${openSections[item.label] ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          ▾
                        </span>
                      </span>
                    </button>
                    {openSections[item.label] ? (
                      <ul className="border-t border-gray-100 bg-cream/40 pb-2">
                        {item.children.map((child) => (
                          <li key={`${item.label}-${child.label}`}>
                            <NavAnchor
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              className="block px-7 py-2.5 font-heading text-[14px] uppercase tracking-wide text-gray-700 transition hover:bg-cream hover:text-teal hover:underline hover:underline-offset-4"
                            >
                              {child.label}
                            </NavAnchor>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-gray-100 last:border-0">
                    <NavAnchor
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-5 py-3.5 font-heading text-[15px] uppercase tracking-wide text-gray-700 transition hover:bg-cream hover:text-teal"
                    >
                      <span className={`${mobileNavItemClass} hover:border-teal`}>
                        {item.label}
                      </span>
                    </NavAnchor>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
