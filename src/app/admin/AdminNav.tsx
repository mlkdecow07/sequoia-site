"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const links = [
  { href: "/admin/alerts", label: "Alerts" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/contact", label: "Contact Forms" },
  { href: "/admin/employment", label: "Employment Forms" },
  { href: "/admin/info-stats", label: "Social Traffic" },
] as const;

function linkClass(pathname: string, href: string) {
  const active =
    pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
  return [
    "block rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-widest transition",
    active
      ? "bg-teal/10 text-teal"
      : "text-gray-700 hover:bg-teal/5 hover:text-teal",
  ].join(" ");
}

export default function AdminNav({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-teal/15 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/admin"
          className="font-heading text-lg text-teal"
          onClick={() => setMenuOpen(false)}
        >
          SCS ADMIN
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(pathname, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-3 flex items-center gap-3 border-l border-teal/15 pl-3 text-sm text-gray-600">
            {email ? <span className="max-w-[12rem] truncate">{email}</span> : null}
            <form action={signOut}>
              <button
                type="submit"
                className="rounded border border-teal/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal hover:bg-teal/5"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-teal/25 text-teal lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="admin-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          ) : (
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="admin-mobile-menu"
          className="border-t border-teal/10 bg-white lg:hidden"
        >
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-3 py-3 sm:px-5">
            <Link
              href="/admin"
              className={linkClass(pathname, "/admin")}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(pathname, link.href)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mx-auto flex max-w-5xl flex-col gap-3 border-t border-teal/10 px-4 py-4 sm:px-6">
            {email ? (
              <p className="truncate text-sm text-gray-600">{email}</p>
            ) : null}
            <form action={signOut}>
              <button
                type="submit"
                className="w-full rounded border border-teal/25 px-3 py-3 text-xs font-semibold uppercase tracking-widest text-teal hover:bg-teal/5"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </header>
  );
}
