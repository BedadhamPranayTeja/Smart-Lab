import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("./"), // force root to current project folder
  },
};

export default nextConfig;
