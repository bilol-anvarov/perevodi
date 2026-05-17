// next.config.mjs
import { i18n } from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    domains: ['', ''],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'perevodin1.uz' }],
        destination: 'https://www.perevodin1.uz/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;