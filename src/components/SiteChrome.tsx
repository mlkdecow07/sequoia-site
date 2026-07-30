"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteAlertBanner from "@/components/SiteAlertBanner";
import type { SiteAlert } from "@/lib/supabase/types";

export default function SiteChrome({
  children,
  siteAlert = null,
}: {
  children: React.ReactNode;
  siteAlert?: SiteAlert | null;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isLinksPage = pathname === "/info" || pathname.startsWith("/info/");
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

  const showSitewideOverlay =
    Boolean(siteAlert) &&
    siteAlert!.display_scope === "all" &&
    !isAdminPage &&
    !isHome;

  const chrome = isLinksPage || isAdminPage ? (
    <>{children}</>
  ) : (
    <>
      <Header />
      <main className="relative z-10 bg-cream/95">{children}</main>
      <Footer />
    </>
  );

  return (
    <>
      {showSitewideOverlay && siteAlert ? <SiteAlertBanner alert={siteAlert} /> : null}
      {chrome}
    </>
  );
}
