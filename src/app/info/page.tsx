import type { Metadata } from "next";
import LinksPageClient from "./LinksPageClient";

export const metadata: Metadata = {
  title: "Info",
  description: "Quick links for Sequoia Christian School — apply, explore, tuition, and more.",
};

export default function LinksPage() {
  return <LinksPageClient />;
}
