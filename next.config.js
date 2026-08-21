/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport && {
    output: 'export',
    basePath: '/DIGITAL-FARM-MANAGEMENT-PROTOTYPE-1',
    assetPrefix: '/DIGITAL-FARM-MANAGEMENT-PROTOTYPE-1',
    images: {
      unoptimized: true,
    },
  }),
};

module.exports = nextConfig;

