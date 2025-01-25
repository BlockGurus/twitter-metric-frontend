/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove static export to allow API routes
  // output: 'export',
};

module.exports = nextConfig;