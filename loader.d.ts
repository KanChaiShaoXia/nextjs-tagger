/**
 * Configuration options for the nextjs-tagger webpack loader
 */
export interface LoaderOptions {
  /**
   * Whether to enable the loader
   * @default process.env.NODE_ENV === 'development'
   */
  enabled?: boolean;

  /**
   * Prefix for the debug attribute
   * @default 'loc'
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
  exclude?: string[];
}

/**
 * NextJS Tagger Webpack Loader
 * 
 * Transforms JSX/TSX files to add debug attributes.
 * Compatible with SWC and next/font.
 * 
 * @param source - The source code to transform
 * @returns Transformed source code
 */
declare function nextjsTaggerLoader(source: string): string;

export = nextjsTaggerLoader;