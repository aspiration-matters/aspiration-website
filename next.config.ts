// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["davxwabdnxl03.cloudfront.net"], // ✅ Allow external image domain
//   },
// };

// export default nextConfig;
// next.config.js or next.config.mjs (depending on your setup)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "davxwabdnxl03.cloudfront.net",
      "d2r1adni3q9xni.cloudfront.net", // ✅ This is the one you need
    ],
  },
};

export default nextConfig;
