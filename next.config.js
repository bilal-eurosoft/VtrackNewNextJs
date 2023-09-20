/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["vtracksolutions.s3.eu-west-2.amazonaws.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
