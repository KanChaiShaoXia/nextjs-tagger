# nextjs-tagger

[![npm version](https://badge.fury.io/js/nextjs-tagger.svg)](https://badge.fury.io/js/nextjs-tagger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight plugin that automatically adds debug attributes to HTML elements in Next.js projects for easier AI-assisted development.

Perfect for AI coding assistants, code navigation, and debugging! When you click on an element in the browser, you can quickly tell an AI exactly which file and line to modify.

## 🌟 Features

- 🎯 **Precise Code Location**: Adds `data-wb-id="file:line:column"` to HTML elements
- 🚀 **Zero Runtime Cost**: Only active in development mode
- ⚡ **Lightweight**: Minimal impact on build time
- 🔧 **Highly Configurable**: Customize prefixes, file patterns, and more
- 🎨 **HTML Elements Only**: Skips React components, focuses on DOM elements
- 📦 **Static Export Compatible**: Works with `output: 'export'`
- 🤖 **AI-Friendly**: Perfect for AI-assisted development workflows
- ✨ **Full Next.js Compatibility**: Works with SWC, next/font, and Turbopack
- 🚀 **Turbopack Support**: Full compatibility with Next.js Turbopack mode

## 📦 Installation

```bash
npm install --save-dev nextjs-tagger
```

or

```bash
yarn add -D nextjs-tagger
```

or

```bash
pnpm add -D nextjs-tagger
```

## 🚀 Quick Start

### Next.js Plugin (Recommended)

**1. Update your `next.config.js`:**

```javascript
const withNextjsTagger = require("nextjs-tagger/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config...
};

module.exports = withNextjsTagger({
  enabled: true,
  prefixName: "wb",
  debug: false,
})(nextConfig);
```

**2. Restart your development server**

**3. Works with both standard mode and Turbopack:**

```bash
# Standard mode
npm run dev

# Turbopack mode (also supported)
npm run dev -- --turbopack
```

### Babel Plugin (Alternative)

**1. Create or update `.babelrc.js`:**

```javascript
module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "nextjs-tagger",
      {
        enabled: process.env.NODE_ENV === "development",
        prefixName: "wb",
        debug: false,
      },
    ],
  ],
};
```

**2. Restart your development server**

## ⚙️ Configuration Options

| Option       | Type                     | Default                                  | Description                                                         |
| ------------ | ------------------------ | ---------------------------------------- | ------------------------------------------------------------------- |
| `enabled`    | `boolean`                | `process.env.NODE_ENV === 'development'` | Whether to enable the plugin                                        |
| `prefixName` | `string`                 | `'wb'`                                   | Prefix for the debug attribute (will become `data-{prefixName}-id`) |
| `debug`      | `boolean`                | `false`                                  | Enable debug logging                                                |
| `include`    | `string[]`               | `['.tsx', '.jsx']`                       | File extensions to process                                          |
| `exclude`    | `string[]` or `RegExp[]` | `['node_modules']`                       | File patterns or paths to exclude from processing                   |

## 🤖 AI Integration Example

Once installed, you can easily communicate with AI assistants:

```
🧑 "I want to modify the button at data-wb-id='components/Header.tsx:17:6'"

🤖 "I'll help you modify the button in components/Header.tsx at line 17, column 6"
```

The AI can instantly locate the exact file and position to make changes!

## 📱 Real-world Example

**Before** (original JSX):

```jsx
export default function HomePage() {
  return (
    <div className='container'>
      <h1>Welcome to my site</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

**After** (with nextjs-tagger in development):

```jsx
export default function HomePage() {
  return (
    <div className='container' data-wb-id='pages/index.tsx:3:4'>
      <h1 data-wb-id='pages/index.tsx:4:6'>Welcome to my site</h1>
      <button onClick={handleClick} data-wb-id='pages/index.tsx:5:6'>
        Click me
      </button>
    </div>
  );
}
```

## 🔄 Environment-based Configuration

### Next.js Plugin

```javascript
const withNextjsTagger = require("nextjs-tagger/next");

module.exports = withNextjsTagger({
  enabled: process.env.NODE_ENV === "development",
  prefixName: "wb",
  debug: process.env.NODE_ENV === "development",
})(nextConfig);
```

### Babel Plugin

```javascript
module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "nextjs-tagger",
      {
        enabled: ["development", "staging"].includes(process.env.NODE_ENV),
        prefixName: "wb",
        debug: process.env.NODE_ENV === "development",
      },
    ],
  ],
};
```

## 🚫 What Gets Tagged

✅ **Tagged (HTML elements)**:

- `<div>`, `<span>`, `<button>`, `<input>`, etc.
- Any lowercase JSX element

❌ **Not Tagged**:

- React components (`<MyComponent>`)
- Fragments (`<>` or `<React.Fragment>`)
- Elements in `node_modules`

## 🛠 Troubleshooting

### Plugin not working?

**Next.js Plugin:**

1. Check `next.config.js` configuration
2. Restart dev server
3. Enable debug mode
4. Check browser inspector for attributes

**Babel Plugin:**

1. Check `.babelrc.js` exists in project root
2. Restart dev server after config changes
3. Enable debug mode: `debug: true`
4. Check browser inspector for attributes

### ✅ Turbopack Support

The plugin now fully supports Next.js Turbopack mode! You can use it with or without the `--turbopack` flag:

```bash
# ✅ Both work now
next dev --turbopack
next dev
```

**How it works**: The plugin automatically detects and configures both webpack and Turbopack bundlers, ensuring seamless compatibility across all Next.js build modes.

### TypeScript errors?

```typescript
// Add to your global.d.ts or env.d.ts
declare namespace JSX {
  interface HTMLAttributes<T> {
    "data-wb-id"?: string;
  }
}
```

## 📊 Performance Impact

- **Development**: Minimal impact, only processes JSX files
- **Production**: Zero impact (disabled by default)
- **Bundle size**: No runtime code added

## 🔧 Advanced Examples

### Custom Attribute Names

```javascript
// Will generate: custom-debug-id="file:line:col"
const withNextjsTagger = require("nextjs-tagger/next");
module.exports = withNextjsTagger({
  prefixName: "custom-debug",
})(nextConfig);
```

### Multiple Environments

```javascript
const withNextjsTagger = require("nextjs-tagger/next");

const isDev = process.env.NODE_ENV === "development";
const isStaging = process.env.NODE_ENV === "staging";

module.exports = withNextjsTagger({
  enabled: isDev || isStaging,
  prefixName: isDev ? "dev" : "staging",
  debug: isDev,
})(nextConfig);
```

### Custom Exclude Patterns

```javascript
const withNextjsTagger = require("nextjs-tagger/next");

module.exports = withNextjsTagger({
  enabled: true,
  prefixName: "wb",
  exclude: [
    /node_modules/, // RegExp pattern
  ],
})(nextConfig);
```

### Static Export Compatibility

```javascript
// next.config.js
const withNextjsTagger = require("nextjs-tagger/next");

module.exports = withNextjsTagger({
  enabled: true,
  prefixName: "wb",
})({
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [KanChaiShaoXia](https://github.com/KanChaiShaoXia)

## 🙏 Acknowledgments

- Built with ❤️ for the AI-assisted development community
- Inspired by the need for better code navigation tools
- Special thanks to the Next.js, Babel, and SWC teams

---

**Happy coding with AI! 🤖✨**
