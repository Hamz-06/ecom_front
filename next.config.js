/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['cdn.shopify.com', 'www.google.com', 'files.stripe.com']
  },
}

module.exports = nextConfig

