import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // All media is first-party and local (public/media, public/brand, public/icons).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // Preserve legacy WordPress form-confirmation duplicates
      { source: "/thank-you-callback-2", destination: "/thank-you-callback", permanent: true },
      { source: "/thank-you-insurance-2", destination: "/thank-you-insurance", permanent: true },
      // /programs was a near-verbatim duplicate of /conditions; treatment programs live under /treatment
      { source: "/programs", destination: "/treatment", permanent: true },
    ];
  },
};

export default nextConfig;
