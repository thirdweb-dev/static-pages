import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: NextConfig) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "fs");
    return config;
  }
};

export default nextConfig;
