/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['connectable-events.s3.ap-northeast-2.amazonaws.com', 'user-images.githubusercontent.com'],
  },
};

module.exports = nextConfig;
