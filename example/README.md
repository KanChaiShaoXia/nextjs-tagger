# NextJS Tagger Example

This example demonstrates how to use the `nextjs-tagger` plugin with Next.js.

## Installation

1. Install the plugin:
```bash
npm install nextjs-tagger
```

2. Install dependencies:
```bash
npm install
```

## Usage

Configure the plugin in your `next.config.js`:

```javascript
const withNextjsTagger = require('nextjs-tagger/next-plugin');

module.exports = withNextjsTagger({
  enabled: true,
  prefixName: 'wb',        // Creates data-wb-id attributes
  debug: false             // Shows console output
})(nextConfig);
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Open browser developer tools and inspect any HTML element

4. Look for the `data-wb-id` attributes that show the exact file location!

## What it does

Every HTML element will have a `data-wb-id` attribute like:
- `data-wb-id="app/page.tsx:3:5"`
- `data-wb-id="app/page.tsx:15:8"`
- `data-wb-id="app/layout.tsx:12:5"`

This tells you the exact file, line, and column where each element is defined, making debugging and development easier.

## Configuration Options

- `enabled`: Enable/disable the plugin (default: `true`)
- `prefixName`: Custom prefix for data attributes (default: `'wb'`)
- `debug`: Show console output during compilation (default: `false`)