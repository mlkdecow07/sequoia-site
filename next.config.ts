import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/variabletuition",
        destination: "/tuition",
        permanent: true,
      },
      {
        source: "/our-faculty",
        destination: "/faculty",
        permanent: true,
      },
      {
        source: "/812-2",
        destination: "/enrollment",
        permanent: true,
      },
      {
        source: "/corevalues",
        destination: "/",
        permanent: true,
      },
      {
        source: "/links",
        destination: "/info",
        permanent: true,
      },
      {
        source: "/social",
        destination: "/info",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
