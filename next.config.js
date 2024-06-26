/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.spoonacular.com',
        protocol: 'https',
      },
      {
        hostname: 'spoonacular.com',
        protocol: 'https',
      },
      {
        hostname: 'v2.exercisedb.io',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
