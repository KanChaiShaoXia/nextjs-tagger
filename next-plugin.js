const nextjsTaggerSWC = require('./swc-plugin');

/**
 * NextJS Tagger Next.js Plugin
 * Integrates with Next.js webpack configuration and experimental Turbopack
 * This version is compatible with next/font and Turbopack
 * 
 * @param {object} options - Plugin options
 * @returns {function} Next.js plugin function
 */
function withNextjsTagger(options = {}) {
  return (nextConfig = {}) => {
    return {
      ...nextConfig,
      webpack(config, { isServer, dev }) {
        // Only run in development mode by default
        const shouldEnable = options.enabled !== undefined 
          ? options.enabled 
          : dev;

        if (shouldEnable) {
          // Add a rule that runs BEFORE the default Next.js rules
          config.module.rules.unshift({
            test: /\.(jsx|tsx)$/,
            exclude: /node_modules/,
            enforce: 'pre', // This ensures it runs before other loaders
            use: [
              {
                loader: require.resolve('./loader.js'),
                options: {
                  ...options,
                  isServer,
                  dev
                }
              }
            ]
          });
        }

        // Call the original webpack config if it exists
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, { isServer, dev });
        }

        return config;
      },
      experimental: {
        ...nextConfig.experimental,
        turbo: {
          ...nextConfig.experimental?.turbo,
          rules: {
            ...nextConfig.experimental?.turbo?.rules,
            '*.{js,jsx,ts,tsx}': {
              loaders: [
                ...(nextConfig.experimental?.turbo?.rules?.['*.{js,jsx,ts,tsx}']?.loaders || []),
                {
                  loader: require.resolve('./loader.js'),
                  options: {
                    ...options,
                    isTurbopack: true
                  }
                }
              ]
            }
          }
        }
      }
    };
  };
}

module.exports = withNextjsTagger;