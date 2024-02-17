const basePathValue =
  process.env.NODE_ENV === "production" ? "/flower-watch" : "";

const nextConfig = {
  basePath: basePathValue,
  assetPrefix: `${basePathValue}/`,
  output: "export",
  optimizeFonts: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
