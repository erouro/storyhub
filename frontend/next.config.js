/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone'  // IMPORTANT for Cloudflare SSR
};

module.exports = nextConfig;


