import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "https://image.tmdb.org/t/p/" }],
  },
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || "",
    TMDB_IMAGE_SERVICE: process.env.TMDB_IMAGE_SERVICE || "",
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN || "",
  },
};

export default nextConfig;
