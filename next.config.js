/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:['cdn.shopify.com','www.google.com']
  }
}

module.exports = nextConfig

