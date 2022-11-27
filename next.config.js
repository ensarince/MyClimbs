

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
  },
  experimental: {appDir: true}
};

module.exports = nextConfig;
