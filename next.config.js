/** @type {import('next').NextConfig} */
const basePathValue =
  process.env.NODE_ENV === "production" ? "/flower-watch" : "";

const nextConfig = {
  basePath: basePathValue,
  assetPrefix: `${basePathValue}/`,
  output: "export",
  distDir: "out",
  reactStrictMode: true,
  optimizeFont: false,
};

module.exports = nextConfig;
