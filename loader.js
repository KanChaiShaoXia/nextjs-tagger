const nextjsTaggerSWC = require('./swc-plugin');

/**
 * NextJS Tagger Webpack Loader
 * Transforms JSX/TSX files to add debug attributes
 * Compatible with SWC and next/font
 */
module.exports = function nextjsTaggerLoader(source) {
  // Get loader options
  const options = this.getOptions() || {};
  
  // Skip processing if file is in node_modules or matches exclude pattern
  if (this.resourcePath.includes('node_modules') || 
      (options.exclude && options.exclude.test && options.exclude.test(this.resourcePath))) {
    return source;
  }
  
  if (options.debug) {
    console.log('[nextjs-tagger-loader] Processing:', this.resourcePath);
  }
  
  // Add filename to options for better location tracking
  const transformOptions = {
    ...options,
    filename: this.resourcePath
  };

  try {
    // Transform the source code
    const result = nextjsTaggerSWC(source, transformOptions);
    
    // Return the transformed code
    return result.code;
  } catch (error) {
    // If transformation fails, return original source
    console.warn('[nextjs-tagger-loader] Transform failed:', error.message);
    return source;
  }
};