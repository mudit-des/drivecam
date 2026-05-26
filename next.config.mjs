/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/drivecam",
  assetPrefix: "/drivecam",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
