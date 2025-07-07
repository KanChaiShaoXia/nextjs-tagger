const withNextjsTagger = require('../next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = withNextjsTagger({
  enabled: true,
  prefixName: 'wb',
  debug: true
})(nextConfig);