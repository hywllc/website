import type { NextConfig } from "next";

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
