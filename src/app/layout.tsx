import type { Metadata } from "next";
import { Aleo, Source_Sans_3 } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteChrome from "@/components/SiteChrome";
import { getActiveSiteAlert } from "@/lib/site-alert-data";
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
  metadataBase: new URL("https://www.sequoiachristian.com"),
  title: {
    default: "Sequoia Christian School",
    template: "%s - Sequoia Christian School",
  },
  description: "Where Giant Dreamers Are Nurtured — Sequoia Christian School in Harrisburg, PA",
  openGraph: {
    title: "Sequoia Christian School",
    description: "Where Giant Dreamers Are Nurtured — Sequoia Christian School in Harrisburg, PA",
    url: "https://www.sequoiachristian.com",
    siteName: "Sequoia Christian School",
    images: [
      {
        url: "/images/og-share.png",
        width: 646,
        height: 1024,
        alt: "Where Giant Dreamers Are Nurtured — Sequoia Christian School",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sequoia Christian School",
    description: "Where Giant Dreamers Are Nurtured — Sequoia Christian School in Harrisburg, PA",
    images: ["/images/og-share.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteAlert = await getActiveSiteAlert();

  return (
    <html lang="en">
      <body className={`${aleo.variable} ${sourceSans3.variable} antialiased`}>
        <div className="site-shell min-h-screen bg-cream/95">
          <SiteChrome siteAlert={siteAlert}>{children}</SiteChrome>
        </div>
        <GoogleAnalytics gaId="G-WENHKFB909" />
      </body>
    </html>
  );
}
