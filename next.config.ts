import type { NextConfig } from "next";

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
