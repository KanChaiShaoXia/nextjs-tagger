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
 * Common HTML elements that should be tagged
 */
const HTML_ELEMENTS = new Set([
  // Document structure
  'html', 'head', 'body', 'title', 'meta', 'link', 'style', 'script', 'noscript', 'base',
  // Content sectioning
  'header', 'nav', 'main', 'article', 'section', 'aside', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Text content
  'div', 'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption',
  // Inline text semantics
  'a', 'em', 'strong', 'small', 'cite', 'q', 'dfn', 'abbr', 'ruby', 'rt', 'rp', 'data', 'time',
  'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u', 's', 'mark', 'bdi', 'bdo', 'span', 'br', 'wbr',
  // Image and multimedia
  'img', 'picture', 'source', 'iframe', 'embed', 'object', 'param', 'video', 'audio', 'track', 'map', 'area',
  // Table content
  'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th',
  // Forms
  'form', 'label', 'input', 'button', 'select', 'datalist', 'optgroup', 'option', 'textarea',
  'keygen', 'output', 'progress', 'meter', 'fieldset', 'legend',
  // Interactive elements
  'details', 'summary', 'dialog',
  // Web components
  'slot', 'template'
]);

/**
 * Check if a tag name is a valid HTML element
 */
function isHTMLElement(tagName) {
  return HTML_ELEMENTS.has(tagName.toLowerCase());
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

  // Check if file should be excluded
  const filename = opts.filename || '';
  if (exclude && exclude.length > 0) {
    for (const pattern of exclude) {
      if (typeof pattern === 'string') {
        if (filename.includes(pattern)) {
          return { code: source };
        }
      } else if (pattern instanceof RegExp) {
        if (pattern.test(filename)) {
          return { code: source };
        }
      }
    }
  }

  // Check if plugin is enabled
  const shouldEnable = enabled !== undefined 
    ? enabled 
    : process.env.NODE_ENV === 'development';

  if (!shouldEnable) {
    return { code: source };
  }

  // Process line by line with a more reliable approach
  const lines = source.split('\n');
  const transformedLines = lines.map((line, lineIndex) => {
    // Skip if our attribute already exists on this line
    if (line.includes(`data-${prefixName}-id=`)) {
      return line;
    }
    
    // Use a more precise regex that matches JSX opening tags
    // This pattern matches: <tagname followed by space, >, or />
    // But excludes things inside strings, comments, and complex expressions
    let transformedLine = line;
    
    // Pattern to match potential JSX opening tags
    const jsxTagPattern = /<([a-z][a-z0-9-]*)\b(?=\s|>|\/)/g;
    
    transformedLine = line.replace(jsxTagPattern, (match, tagName, offset) => {
      // Only process if it's a known HTML element
      if (!isHTMLElement(tagName)) {
        return match;
      }
      
      // Check if this is inside a string or comment
      const beforeMatch = line.substring(0, offset);
      const inString = (beforeMatch.split('"').length - 1) % 2 !== 0 || 
                      (beforeMatch.split("'").length - 1) % 2 !== 0 ||
                      (beforeMatch.split('`').length - 1) % 2 !== 0;
      const inComment = beforeMatch.includes('//') || beforeMatch.includes('/*');
      
      if (inString || inComment) {
        return match;
      }
      
      // Check if this looks like a type definition or generic constraint
      const lineUpToMatch = line.substring(0, offset);
      const isInTypeDefinition = /:\s*$|&\s*$|extends\s*$|typeof\s*$/.test(lineUpToMatch.trim());
      
      if (isInTypeDefinition) {
        return match;
      }
      
      const filename = opts.filename || 'unknown';
      const relativePath = getRelativePath(filename);
      const lineNumber = lineIndex + 1;
      const columnNumber = offset + 1;
      const locationId = `${relativePath}:${lineNumber}:${columnNumber}`;
      const newAttribute = `data-${prefixName}-id="${locationId}"`;
      
      if (debug) {
        console.log(`[nextjs-tagger-swc] Added data-${prefixName}-id="${locationId}" to <${tagName}>`);
      }
      
      return `<${tagName} ${newAttribute}`;
    });
    
    return transformedLine;
  });

  return { code: transformedLines.join('\n') };
};