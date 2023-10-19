/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "files.edgestore.dev"
    ]
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
