// next.config.ts

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'foodistaan.pannalabs.ai',
            pathname: '/images/**',
          },
        ],
        // Add this as a fallback
        domains: ['foodistaan.pannalabs.ai'],
      },
    webpack(config, options) {
        config.module?.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

export default nextConfig