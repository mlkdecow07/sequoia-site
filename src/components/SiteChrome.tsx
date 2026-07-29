"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLinksPage = pathname === "/info" || pathname.startsWith("/info/");
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isLinksPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="relative z-10 bg-cream/95">{children}</main>
      <Footer />
    </>
  );
}
