import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true,
  },
  images: {
    remotePatterns: [
      { hostname: "todofy.blob.core.windows.net" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
}

export default nextConfig
