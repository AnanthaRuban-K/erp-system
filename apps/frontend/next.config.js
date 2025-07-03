/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Disable strict mode if you have compatibility issues
  reactStrictMode: true,
  
  // Configure environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configure experimental features if needed
  experimental: {
    // Enable if you need server actions
    serverActions: true,
  },
}

module.exports = nextConfig