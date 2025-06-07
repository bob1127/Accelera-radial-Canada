/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,          // ✅ Partial Prerendering
    useCache: true,     // ✅ cacheTag / cacheLife 支援
    inlineCss: true,    // ✅ 內嵌 CSS 支援
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
};

module.exports = nextConfig;
