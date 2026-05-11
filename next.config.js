/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'bolt.new' },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
};

module.exports = nextConfig;
