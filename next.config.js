/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Enable source maps in development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Enable React DevTools in development
  reactStrictMode: true,
  // Enable detailed error messages
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig; 