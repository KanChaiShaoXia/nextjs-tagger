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

  // Use a conservative approach - only process single-line JSX tags
  // This is safer and avoids syntax errors
  const lines = source.split('\n');
  const transformedLines = lines.map((line, lineIndex) => {
    // Only match complete JSX tags on a single line
    const singleLineJsxRegex = /<([a-z]+)(\s[^>]*?)?\s*(\/?)>/g;
    
    return line.replace(singleLineJsxRegex, (match, tagName, attributes = '', selfClosing) => {
      // Skip if our attribute already exists
      if (attributes.includes(`data-${prefixName}-id=`)) {
        return match;
      }
      
      // Create location ID
      const filename = opts.filename || 'unknown';
      const relativePath = getRelativePath(filename);
      const lineNumber = lineIndex + 1;
      const columnNumber = line.indexOf(match) + 1;
      const locationId = `${relativePath}:${lineNumber}:${columnNumber}`;
      
      // Add our attribute
      const newAttribute = `data-${prefixName}-id="${locationId}"`;
      
      // Build result
      let result;
      const trimmedAttributes = attributes.trim();
      const isSelfClosing = selfClosing === '/';
      
      if (isSelfClosing) {
        // Self-closing tag
        if (trimmedAttributes) {
          result = `<${tagName} ${trimmedAttributes} ${newAttribute} />`;
        } else {
          result = `<${tagName} ${newAttribute} />`;
        }
      } else {
        // Regular opening tag
        if (trimmedAttributes) {
          result = `<${tagName} ${trimmedAttributes} ${newAttribute}>`;
        } else {
          result = `<${tagName} ${newAttribute}>`;
        }
      }
      
      if (debug) {
        console.log(`[nextjs-tagger-swc] Added data-${prefixName}-id="${locationId}" to <${tagName}>`);
      }
      
      return result;
    });
  });

  return { code: transformedLines.join('\n') };
};