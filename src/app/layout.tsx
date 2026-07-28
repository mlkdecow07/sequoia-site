import type { Metadata } from "next";
import { Aleo, Source_Sans_3 } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const aleo = Aleo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Sequoia Christian School",
    template: "%s - Sequoia Christian School",
  },
  description: "Where Giant Dreamers Are Nurtured — Sequoia Christian School in Harrisburg, PA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aleo.variable} ${sourceSans3.variable} antialiased`}>
        <div className="site-shell min-h-screen bg-cream/95">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
