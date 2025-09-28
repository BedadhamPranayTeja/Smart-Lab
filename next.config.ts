import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("./"), // force root to current project folder
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ allows deployment even if ESLint errors exist
  },
};

export default nextConfig;
