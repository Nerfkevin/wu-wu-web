/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/brand/favicon.ico" },
    ];
  },
  async redirects() {
    return [
      { source: "/wuwu/privacy", destination: "/privacy", permanent: true },
      { source: "/wuwu/terms", destination: "/terms", permanent: true },
      { source: "/wuwu/contact", destination: "/contact", permanent: true },
    ];
  },
};

module.exports = nextConfig;
