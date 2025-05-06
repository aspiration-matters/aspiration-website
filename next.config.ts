// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["davxwabdnxl03.cloudfront.net"], // ✅ Allow external image domain
  },
};

export default nextConfig;
