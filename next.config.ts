import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/apk/PassVerse.apk",
        destination:
          "https://github.com/Yemiklein/passverse-web/releases/latest/download/PassVerse.apk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
