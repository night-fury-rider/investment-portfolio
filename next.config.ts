/** @type {import('next').NextConfig} */

const basePathOnServer =
  process.env.NODE_ENV === "production" ? "/analyzers/investments" : undefined;

const nextConfig = {
  distDir: "build",
  output: "export",
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  /* Comment out basePath and assetPrefix for testing build before uploading to server */
  basePath: basePathOnServer,
  assetPrefix: basePathOnServer,
  trailingSlash: true, // To Fix 404 on refresh
};

export default nextConfig;
