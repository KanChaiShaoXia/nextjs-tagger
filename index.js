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
 * NextJS Tagger Babel Plugin
 * Automatically adds debug attributes to HTML elements for AI-assisted development
 * 
 * @param {object} babel - Babel instance
 * @returns {object} Babel plugin configuration
 */
module.exports = function nextjsTagger(babel) {
  const { types: t } = babel;
  
  return {
    name: 'nextjs-tagger',
    visitor: {
      JSXOpeningElement(nodePath, state) {
        try {
          const { opts = {} } = state;
          const {
            enabled,
            prefixName = 'data-loc',
            debug = false,
            include = ['.tsx', '.jsx'],
            exclude = ['node_modules']
          } = opts;
          
          // Check if plugin is enabled
          const shouldEnable = enabled !== undefined 
            ? enabled 
            : process.env.NODE_ENV === 'development';
          
          if (!shouldEnable) return;
          
          // Get file path
          const filename = state.filename || state.file?.opts?.filename;
          if (!filename || typeof filename !== 'string') return;
          
          // Check file extensions
          if (!include.some(ext => filename.endsWith(ext))) return;
          
          // Check exclude patterns
          if (exclude.some(pattern => filename.includes(pattern))) return;
          
          const node = nodePath.node;
          let elementName;
          
          // Get element name
          if (node.name && node.name.type === 'JSXIdentifier') {
            elementName = node.name.name;
          } else {
            return;
          }
          
          // Skip Fragment and React components (capitalized)
          if (elementName === 'Fragment' || elementName[0] !== elementName[0].toLowerCase()) {
            return;
          }
          
          // Check if main attribute already exists
          const mainAttrName = `${prefixName}-id`;
          const hasMainAttr = node.attributes && node.attributes.some(attr => 
            attr.type === 'JSXAttribute' && 
            attr.name && attr.name.type === 'JSXIdentifier' && 
            attr.name.name === mainAttrName
          );
          
          if (hasMainAttr) return;
          
          // Get position information
          const line = node.loc?.start?.line || 0;
          const col = node.loc?.start?.column || 0;
          const relativePath = getRelativePath(filename);
          
          // Build main ID
          const locationId = `${relativePath}:${line}:${col}`;
          
          // Add debug attribute
          const newAttribute = t.jsxAttribute(
            t.jsxIdentifier(mainAttrName),
            t.stringLiteral(locationId)
          );
          
          // Add attribute to element
          if (!node.attributes) {
            node.attributes = [];
          }
          node.attributes.push(newAttribute);
          
          if (debug) {
            console.log(`[nextjs-tagger] Added ${mainAttrName}="${locationId}" to <${elementName}>`);
          }
        } catch (error) {
          // Silently handle errors to avoid breaking the build
          if (state.opts?.debug) {
            console.warn('[nextjs-tagger] Error processing JSX element:', error.message);
          }
        }
      }
    }
  };
};