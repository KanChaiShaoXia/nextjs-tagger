# NextJS Tagger Example

This is a minimal example demonstrating how to use the `nextjs-tagger` plugin.

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

5. Look for the `data-loc-id` attributes that show the exact file location!

## What to look for

Every HTML element will have a `data-loc-id` attribute like:
- `data-loc-id="app/page.tsx:3:4"`
- `data-loc-id="app/page.tsx:15:8"`

This tells you the exact file, line, and column where each element is defined.

## Configuration

See `.babelrc.js` for the plugin configuration used in this example.