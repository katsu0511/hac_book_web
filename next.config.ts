import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  async rewrites() {
    if (!isDev) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
