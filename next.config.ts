import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true,
  },
  images: {
    remotePatterns: [{ hostname: "todofy.blob.core.windows.net" }],
  },
}

export default nextConfig
