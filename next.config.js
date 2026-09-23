/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/wu-relay/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/wu-relay/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/wu-relay/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
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
