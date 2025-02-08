/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  output: "export",
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  eslint: {
    // To Ignore ESLint errors. DEPLOYMENT BUILD SHOULD NOT HAVE THIS FLAG ENABLED.
    // ignoreDuringBuilds: true,
  },
  /* Comment out basePath and assetPrefix for testing build before uploading to server */
  basePath:
    process.env.NODE_ENV === "production"
      ? "/analyzers/investments-v2"
      : undefined,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "/analyzers/investments-v2/"
      : undefined,
};

export default nextConfig;
