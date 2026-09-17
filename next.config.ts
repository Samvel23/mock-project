import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Forward browser requests from this app to the local API server. This
  // avoids CORS failures when the Next.js dev server uses another port.
  async rewrites() {
    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"
    ).replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
