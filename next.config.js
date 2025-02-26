/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.WP_IMAGES_URL],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
  