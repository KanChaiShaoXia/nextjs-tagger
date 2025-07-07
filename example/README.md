# NextJS Tagger Example

This is a minimal example demonstrating how to use the `nextjs-tagger` plugin with **SWC version** (supports `next/font`).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Open browser developer tools and inspect any HTML element

5. Look for the `data-wb-id` attributes that show the exact file location!

## What to look for

Every HTML element will have a `data-wb-id` attribute like:
- `data-wb-id="app/page.tsx:3:5"`
- `data-wb-id="app/page.tsx:15:8"`
- `data-wb-id="app/layout.tsx:12:5"`

This tells you the exact file, line, and column where each element is defined.

## Configuration

This example uses the **SWC version** of nextjs-tagger, configured in `next.config.js`:

```javascript
const withNextjsTagger = require('../next-plugin');

module.exports = withNextjsTagger({
  enabled: true,
  prefixName: 'wb',        // Creates data-wb-id attributes
  debug: true              // Shows console output
})(nextConfig);
```

## Key Features Demonstrated

✅ **SWC Compatibility**: Works with Next.js 15+ and SWC compiler  
✅ **next/font Support**: No conflicts with Google Fonts  
✅ **Static Export**: Builds successfully with `output: 'export'`  
✅ **HTML Compliance**: Uses proper `data-*` attributes  

## Alternative: Babel Version

If you prefer the Babel version (no `next/font` support), create a `.babelrc.js`:

```javascript
module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['nextjs-tagger', {
      enabled: true,
      prefixName: 'wb',  // Creates data-wb-id attributes
      debug: true
    }]
  ]
};
```

And remove the SWC configuration from `next.config.js`.