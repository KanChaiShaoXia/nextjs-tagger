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

  // More robust regex-based approach for SWC compatibility
  // Handle both opening tags and self-closing tags
  const jsxElementRegex = /<([a-z][a-zA-Z0-9]*)\s*([^>]*?)\s*(\/?)>/g;
  const attributeRegex = new RegExp(`data-${prefixName}-id=`, 'g');
  
  let transformedCode = source;
  
  transformedCode = transformedCode.replace(jsxElementRegex, (match, tagName, attributes, selfClosing, offset) => {
    // Skip if attribute already exists
    if (attributeRegex.test(attributes)) {
      return match;
    }
    
    // Calculate line number
    const beforeMatch = source.substring(0, offset);
    const currentLineNumber = (beforeMatch.match(/\n/g) || []).length + 1;
    
    // Get column (approximate)
    const lastNewline = beforeMatch.lastIndexOf('\n');
    const columnNumber = lastNewline === -1 ? offset + 1 : offset - lastNewline;
    
    // Create location ID
    const filename = opts.filename || 'unknown';
    const relativePath = getRelativePath(filename);
    const locationId = `${relativePath}:${currentLineNumber}:${columnNumber}`;
    
    // Add our attribute
    const newAttribute = `data-${prefixName}-id="${locationId}"`;
    
    // Handle spacing properly
    let result;
    const trimmedAttributes = attributes.trim();
    const closing = selfClosing ? ' />' : '>';
    
    if (trimmedAttributes) {
      result = `<${tagName} ${trimmedAttributes} ${newAttribute}${closing}`;
    } else {
      result = `<${tagName} ${newAttribute}${closing}`;
    }
    
    if (debug) {
      console.log(`[nextjs-tagger-swc] Added data-${prefixName}-id="${locationId}" to <${tagName}>`);
    }
    
    return result;
  });

  return { code: transformedCode };
};