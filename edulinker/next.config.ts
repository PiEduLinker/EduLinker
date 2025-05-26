import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    // permite qualquer URL vindo de res.cloudinary.com
    domains: ['res.cloudinary.com'],
  },
}

export default nextConfig
