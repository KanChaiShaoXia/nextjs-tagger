const withNextjsTagger = require('nextjs-tagger/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config
  experimental: {
    // Enable SWC for better performance
    swcMinify: true,
  },
  // Other config options...
};

// Wrap your config with the nextjs-tagger plugin
module.exports = withNextjsTagger({
  // NextJS Tagger options
  enabled: true,
  prefixName: 'wb', // or 'data-loc' or any other prefix
  debug: false,
  include: ['.tsx', '.jsx'],
  exclude: ['node_modules']
})(nextConfig);