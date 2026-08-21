/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',          // Required: generates the ./out folder for GitHub Pages
  basePath: '/DIGITAL-FARM-MANAGEMENT-PROTOTYPE-1',   // Must match your GitHub repo name exactly
  assetPrefix: '/DIGITAL-FARM-MANAGEMENT-PROTOTYPE-1', // Ensures JS/CSS assets load from the correct path
  images: {
    unoptimized: true,       // Required: Next.js Image Optimization is not supported in static export
  },
};

module.exports = nextConfig;
