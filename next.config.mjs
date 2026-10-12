/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: `npm run build` writes a plain site to /out that any static host can serve.
  output: "export",
  // Trailing slashes give /privacy/index.html, which works on hosts without rewrite rules.
  trailingSlash: true,
  // The image optimizer needs a server; images are pre-sized by hand instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
