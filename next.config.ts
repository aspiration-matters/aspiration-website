

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
