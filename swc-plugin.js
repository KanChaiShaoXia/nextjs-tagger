const path = require('path');

/**
 * Get relative path from absolute path
 * @param {string} absolutePath - The absolute file path
 * @returns {string} The relative path
 */
function getRelativePath(absolutePath) {
  if (!absolutePath || typeof absolutePath !== 'string') {
    return 'unknown';
  }
  try {
    const cwd = process.cwd();
    return path.relative(cwd, absolutePath).replace(/\\/g, '/');
  } catch (error) {
    return 'unknown';
  }
}

/**
 * NextJS Tagger SWC Transform
 * Automatically adds debug attributes to HTML elements for AI-assisted development
 * This version is compatible with next/font
 * 
 * @param {object} source - The source code
 * @param {object} opts - Transform options
 * @returns {object} Transform result
 */
module.exports = function nextjsTaggerSWC(source, opts = {}) {
  const {
    enabled,
    prefixName = 'loc',
    debug = false,
    include = ['.tsx', '.jsx'],
    exclude = ['node_modules']
  } = opts;

  // Check if plugin is enabled
  const shouldEnable = enabled !== undefined 
    ? enabled 
    : process.env.NODE_ENV === 'development';

  if (!shouldEnable) {
    return { code: source };
  }

  // Simple approach: match and replace <tagname with <tagname data-wb-id="..."
  const lines = source.split('\n');
  const transformedLines = lines.map((line, lineIndex) => {
    // Match <tagname followed by space, > or end of line
    return line.replace(/<([a-z][a-z0-9]*)(?=\s|>|$)/g, (match, tagName, offset) => {
      // Skip if our attribute already exists on this line
      if (line.includes(`data-${prefixName}-id=`)) {
        return match;
      }
      
      // Create location ID
      const filename = opts.filename || 'unknown';
      const relativePath = getRelativePath(filename);
      const lineNumber = lineIndex + 1;
      const columnNumber = offset + 1;
      const locationId = `${relativePath}:${lineNumber}:${columnNumber}`;
      
      // Add our attribute right after the tag name
      const newAttribute = `data-${prefixName}-id="${locationId}"`;
      
      if (debug) {
        console.log(`[nextjs-tagger-swc] Added data-${prefixName}-id="${locationId}" to <${tagName}>`);
      }
      
      // Simply replace <tagname with <tagname data-wb-id="..."
      return `<${tagName} ${newAttribute}`;
    });
  });

  return { code: transformedLines.join('\n') };
};