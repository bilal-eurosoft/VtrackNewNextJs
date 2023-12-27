/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {},
  images: {
    domains: ["vtracksolutions.s3.eu-west-2.amazonaws.com"],
  },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
