/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static GitHub Pages

  // 1. Fixes the "buffering" by disabling the server-side image optimization
  // that doesn't exist on GitHub Pages.
  images: {
    unoptimized: true,
  },

  // 2. Fixes 404 errors when refreshing the "Contact" page. 
  // It ensures URLs end with a slash so GitHub can find the folder.
  trailingSlash: true,

  // 3. Since your URL is 'hereishardi.github.io', leave these as empty strings.
  // GitHub serves user sites from the root directory.
  basePath: '',
  assetPrefix: '',
}

export default nextConfig;