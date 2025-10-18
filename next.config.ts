import type { NextConfig } from "next";
import { securityHeaders } from "@/lib/security-headers";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    quietDeps: true,
    silenceDeprecations: ["import", "legacy-js-api"],
  },

  // Security Headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // API routes specific headers
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://fe-task-api.mainstack.io",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, X-Requested-With, X-CSRF-Token",
          },
          { key: "Access-Control-Max-Age", value: "86400" },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        // Service Worker specific headers
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source:
          "/((?!api|_next/static|_next/image|assets|favicon|sw.js|manifest.json).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        // Manifest file headers
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
      {
        // Static assets caching
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
