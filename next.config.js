/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "production" ? "/flower-watch" : "";

const nextConfig = {
  basePath,
  assetPrefix: `${basePath}/`,
  output: "export",
  distDir: "out",
  reactStrictMode: true,
};

module.exports = nextConfig;
