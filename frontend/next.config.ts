import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "www.gravatar.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Remove the invalid 'appDir' property from the experimental config
  // If you want to enable the app directory, use the 'app' directory at the project root
};

export default nextConfig;
