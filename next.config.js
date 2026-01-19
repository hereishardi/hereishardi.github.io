/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  images: {
    unoptimized: true,
  },
  // If your repo is hereishardi.github.io, leave these as empty strings or remove them
  basePath: '',
  assetPrefix: '',
}

export default nextConfig;