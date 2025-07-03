// File: apps/frontend/next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployments
  output: 'standalone',
  
  // Experimental features
  experimental: {
    // Enable server components logging
    logging: {
      level: 'verbose',
    },
    // Output file tracing for monorepo
    outputFileTracingRoot: path.join(__dirname, '../../'),
    // Server actions
    serverActions: true,
  },

  // Transpile packages from the monorepo
  transpilePackages: [
    '@erp/shared-types',
    '@erp/ui-components'
  ],

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // Image optimization
  images: {
    domains: [
      'erp.sbrosenterpriseerp.com',
      'api.sbrosenterpriseerp.com',
      'files.sbrosenterpriseerp.com',
      'cdn.sbrosenterpriseerp.com',
      'images.clerk.dev',
      'img.clerk.com',
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.sbrosenterpriseerp.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https:",
              "connect-src 'self' https://api.sbrosenterpriseerp.com https://clerk.sbrosenterpriseerp.com https://api.stripe.com wss:",
              "frame-src 'self' https://js.stripe.com https://clerk.sbrosenterpriseerp.com",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ];
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/hr',
        destination: '/hr/dashboard',
        permanent: true,
      },
      {
        source: '/finance',
        destination: '/finance/dashboard',
        permanent: true,
      },
      {
        source: '/employee',
        destination: '/employee/dashboard',
        permanent: true,
      },
      {
        source: '/supervisor',
        destination: '/supervisor/dashboard',
        permanent: true,
      }
    ];
  },

  // Rewrites for API proxy (if needed)
  async rewrites() {
    return [
      {
        source: '/api/trpc/:path*',
        destination: 'https://api.sbrosenterpriseerp.com/trpc/:path*',
      },
      {
        source: '/api/webhooks/:path*',
        destination: 'https://api.sbrosenterpriseerp.com/webhooks/:path*',
      }
    ];
  },

  // Webpack configuration for production optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Power by header removal
  poweredByHeader: false,

  // Compression
  compress: true,

  // Generate etags for caching
  generateEtags: true,

  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Trailing slash
  trailingSlash: false,

  // React strict mode
  reactStrictMode: true,

  // SWC minify
  swcMinify: true,

  // Production source maps (disabled for security)
  productionBrowserSourceMaps: false,

  // Bundle analyzer (enable when needed)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }
      return config;
    },
  }),
};

module.exports = nextConfig;