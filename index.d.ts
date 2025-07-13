/**
 * Configuration options for the nextjs-tagger Babel plugin
 */
export interface NextjsTaggerOptions {
  /**
   * Whether to enable the plugin
   * @default process.env.NODE_ENV === 'development'
   */
  enabled?: boolean;

  /**
   * Prefix for the debug attribute
   * @default 'data-loc'
   */
  prefixName?: string;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;

  /**
   * File extensions to process
   * @default ['.tsx', '.jsx']
   */
  include?: string[];

  /**
   * Patterns to exclude from processing
   * @default ['node_modules']
   */
  exclude?: (string | RegExp)[];
}

/**
 * NextJS Tagger Babel Plugin
 * 
 * Automatically adds debug attributes to HTML elements for AI-assisted development.
 * 
 * @example
 * ```javascript
 * // .babelrc.js
 * module.exports = {
 *   presets: ['next/babel'],
 *   plugins: [
 *     [
 *       'nextjs-tagger',
 *       {
 *         enabled: process.env.NODE_ENV === 'development',
 *         prefixName: 'data-loc',
 *         debug: false
 *       }
 *     ]
 *   ]
 * };
 * ```
 * 
 * @param babel - The Babel instance
 * @returns Babel plugin configuration
 */
declare function nextjsTagger(babel: any): {
  name: string;
  visitor: {
    JSXOpeningElement(nodePath: any, state: any): void;
  };
};

export = nextjsTagger;