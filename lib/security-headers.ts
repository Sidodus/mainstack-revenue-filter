export interface SecurityHeader {
  key: string;
  value: string;
}

export const TRUSTED_DOMAINS = {
  BACKEND_APIS: ["https://fe-task-api.mainstack.io"],
  FRONTEND_URLS: [
    process.env.NODE_ENV === "development"
      ? "https://localhost:3000"
      : "https://vercel.app",
  ],
  EXTERNAL_SERVICES: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://cdn.jsdelivr.net",
  ],
};

export const securityHeaders: SecurityHeader[] = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
      `style-src 'self' 'unsafe-inline' ${TRUSTED_DOMAINS.EXTERNAL_SERVICES.filter(
        (url) =>
          url.includes("https://fonts.googleapis.com") ||
          url.includes("https://fonts.gstatic.com") ||
          url.includes("https://cdn.jsdelivr.net")
      ).join(" ")}`,
      `font-src 'self' ${TRUSTED_DOMAINS.EXTERNAL_SERVICES.filter(
        (url) =>
          url.includes("https://fonts.googleapis.com") ||
          url.includes("https://fonts.gstatic.com")
      ).join(" ")}`,
      `img-src 'self' data: blob:`,
      `connect-src 'self' ${[
        ...TRUSTED_DOMAINS.BACKEND_APIS,
        ...TRUSTED_DOMAINS.EXTERNAL_SERVICES,
      ].join(" ")} wss: ws:`,
      `frame-src 'self'`,
      "object-src 'none'",
      "base-uri 'self'",
      `form-action 'self'`,
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      `payment=()`,
      "usb=()",
      "bluetooth=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
    ].join(", "),
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: `require-corp`,
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
  { key: "Server", value: "" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-Download-Options", value: "noopen" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

// Helper function to get client IP from various headers
export function getClientIP(request: Request): string {
  // Try multiple headers for IP detection
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  const xClientIP = request.headers.get("x-client-ip");

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) return realIP;
  if (cfConnectingIP) return cfConnectingIP;
  if (xClientIP) return xClientIP;

  // Fallback for development
  return "127.0.0.1";
}

// Get user agent safely
export function getUserAgent(request: Request): string {
  return request.headers.get("user-agent") || "unknown";
}

// Check if origin is allowed
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // Allow requests without origin (same-origin)

  return (
    TRUSTED_DOMAINS.FRONTEND_URLS.includes(origin) ||
    TRUSTED_DOMAINS.BACKEND_APIS.includes(origin)
  );
}
