import type { NextConfig } from "next";
const config: NextConfig = {
  async redirects() {
    return [
      {
        source: "/noticias/:path*",
        destination: "/noticias-y-eventos/:path*",
        permanent: true,
      },
      {
        source: "/news/:path*",
        destination: "/news-and-events/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL || "http://127.0.0.1:3001"}/api/:path*`,
      },
    ];
  },
};
export default config;
