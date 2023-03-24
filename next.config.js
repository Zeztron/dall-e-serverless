/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'links.papareact.com',
      'dall-e-serverless-s3-dev.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
