/**
 * Configuration options for the nextjs-tagger SWC plugin
 */
export interface NextjsTaggerSWCOptions {
  /**
   * Whether to enable the plugin
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

  /**
   * The filename being processed
   */
  filename?: string;
}

/**
 * Transform result from SWC plugin
 */
export interface TransformResult {
  code: string;
}

/**
 * NextJS Tagger SWC Transform
 * 
 * Automatically adds debug attributes to HTML elements for AI-assisted development.
 * This version is compatible with next/font.
 * 
 * @param source - The source code to transform
 * @param opts - Transform options
 * @returns Transform result with modified code
 */
declare function nextjsTaggerSWC(source: string, opts?: NextjsTaggerSWCOptions): TransformResult;

export = nextjsTaggerSWC;