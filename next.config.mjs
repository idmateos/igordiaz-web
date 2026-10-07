/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: GitHub Pages serves plain HTML from the out folder.
  output: 'export',
  // Project Pages serve the site under /igordiaz-web; drop this (and the
  // comment) when a custom domain serves it from the root.
  basePath: '/igordiaz-web',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
