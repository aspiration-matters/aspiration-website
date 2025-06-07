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


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "d325619y0vqtbb.cloudfront.net",
//       "d2fb4ej07m2mkt.cloudfront.net",
//     ],
//   },
// };

// export default nextConfig;


// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'd325619y0vqtbb.cloudfront.net',
//       },
//       {
//         protocol: 'https',
//         hostname: 'd2fb4ej07m2mkt.cloudfront.net',
//       },
//     ],
//   },
// };

// export default nextConfig;


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd325619y0vqtbb.cloudfront.net',
        pathname: '/**', // allow all image paths from this CloudFront
      },
      {
        protocol: 'https',
        hostname: 'd2fb4ej07m2mkt.cloudfront.net',
        pathname: '/**', // allow all paths from this one too
      },
    ],
  },
};

export default nextConfig;
