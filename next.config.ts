import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_TMDB_BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || "",
    NEXT_PUBLIC_TMDB_IMAGE_SERVICE: process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE || "",
    NEXT_PUBLIC_TMDB_API_TOKEN: process.env.NEXT_PUBLIC_TMDB_API_TOKEN || "",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
