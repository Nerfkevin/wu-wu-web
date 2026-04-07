/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/wuwu/privacy", destination: "/privacy", permanent: true },
      { source: "/wuwu/terms", destination: "/terms", permanent: true },
      { source: "/wuwu/contact", destination: "/contact", permanent: true },
    ];
  },
};

module.exports = nextConfig;
