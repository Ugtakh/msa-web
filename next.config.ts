import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "sfo.cloud.appwrite.io",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "*/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
