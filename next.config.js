/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
          },
        ],        
      },
    experimental: {
      serverActions: true,
    },
    reactStrictMode: false,
}

module.exports = nextConfig
