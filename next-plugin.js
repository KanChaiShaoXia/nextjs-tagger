const nextjsTaggerSWC = require("./swc-plugin");

/**
 * NextJS Tagger Next.js Plugin
 * Integrates with Next.js webpack configuration and Turbopack
 * This version is compatible with next/font and Turbopack
 *
 * @param {object} options - Plugin options
 * @returns {function} Next.js plugin function
 */
function withNextjsTagger(options = {}) {
  return (nextConfig = {}) => {
    // Check Next.js version to determine Turbopack config location
    let useStableTurbopack = false;
    try {
      const nextVersion = require("next/package.json").version;
      const [major, minor] = nextVersion.split(".").map(Number);
      // Next.js 15.3+ has stable Turbopack
      useStableTurbopack = major > 15 || (major === 15 && minor >= 3);
    } catch (e) {
      // Fallback to experimental if version detection fails
      useStableTurbopack = false;
    }

    const turbopackConfig = {
      rules: {
        "*.{js,jsx,ts,tsx}": {
          loaders: [
            {
              loader: require.resolve("./loader.js"),
              options: JSON.parse(
                JSON.stringify({
                  ...options,
                  isTurbopack: true,
                })
              ),
            },
          ],
        },
      },
    };

    return {
      ...nextConfig,
      webpack(config, { isServer, dev }) {
        // Only run in development mode by default
        const shouldEnable =
          options.enabled !== undefined ? options.enabled : dev;

        if (shouldEnable) {
          // Add a rule that runs BEFORE the default Next.js rules
          config.module.rules.unshift({
            test: /\.(jsx|tsx)$/,
            exclude: [
              /node_modules/,
              ...(options.exclude ? [options.exclude] : []),
            ],
            enforce: "pre", // This ensures it runs before other loaders
            use: [
              {
                loader: require.resolve("./loader.js"),
                options: {
                  ...options,
                  isServer,
                  dev,
                },
              },
            ],
          });
        }

        // Call the original webpack config if it exists
        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, { isServer, dev });
        }

        return config;
      },
      ...(useStableTurbopack
        ? {
            // Next.js 15.3+ stable Turbopack config
            turbopack: {
              ...nextConfig.turbopack,
              rules: {
                ...nextConfig.turbopack?.rules,
                ...turbopackConfig.rules,
              },
            },
            experimental: {
              ...nextConfig.experimental,
            },
          }
        : {
            // Next.js < 15.3 experimental Turbopack config
            experimental: {
              ...nextConfig.experimental,
              turbo: {
                ...nextConfig.experimental?.turbo,
                rules: {
                  ...nextConfig.experimental?.turbo?.rules,
                  ...turbopackConfig.rules,
                },
              },
            },
          }),
    };
  };
}

module.exports = withNextjsTagger;
