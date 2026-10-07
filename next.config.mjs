/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: GitHub Pages serves plain HTML from the out folder.
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig