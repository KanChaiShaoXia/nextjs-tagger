# nextjs-tagger

[![npm version](https://badge.fury.io/js/nextjs-tagger.svg)](https://badge.fury.io/js/nextjs-tagger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Babel plugin that automatically adds debug attributes to HTML elements in Next.js projects for easier AI-assisted development.

Perfect for AI coding assistants, code navigation, and debugging! When you click on an element in the browser, you can quickly tell an AI exactly which file and line to modify.

## 🌟 Features

- 🎯 **Precise Code Location**: Adds `data-loc-id="file:line:column"` to HTML elements
- 🚀 **Zero Runtime Cost**: Only active in development mode
- ⚡ **Lightweight**: Minimal impact on build time
- 🔧 **Highly Configurable**: Customize prefixes, file patterns, and more
- 🎨 **HTML Elements Only**: Skips React components, focuses on DOM elements
- 📦 **Static Export Compatible**: Works with `output: 'export'`
- 🤖 **AI-Friendly**: Perfect for AI-assisted development workflows

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

### 1. Create or update `.babelrc.js`

```javascript
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'nextjs-tagger',
      {
        enabled: process.env.NODE_ENV === 'development',
        prefixName: 'data-loc',
        debug: false
      }
    ]
  ]
};
```

### 2. Update your `.gitignore` (recommended)

Make sure your `.gitignore` includes Next.js build outputs:

```gitignore
# Next.js
.next/
out/
node_modules/
```

### 3. Restart your development server

```bash
npm run dev
```

### 4. Inspect elements in your browser

Your HTML elements will now have debug attributes:

```html
<div data-loc-id="components/Header.tsx:15:4">
  <h1 data-loc-id="components/Header.tsx:16:6">Welcome</h1>
  <button data-loc-id="components/Header.tsx:17:6">Click me</button>
</div>
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `process.env.NODE_ENV === 'development'` | Whether to enable the plugin |
| `prefixName` | `string` | `'data-loc'` | Prefix for the debug attribute |
| `debug` | `boolean` | `false` | Enable debug logging |
| `include` | `string[]` | `['.tsx', '.jsx']` | File extensions to process |
| `exclude` | `string[]` | `['node_modules']` | Patterns to exclude |

### Advanced Configuration

```javascript
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'nextjs-tagger',
      {
        enabled: true,
        prefixName: 'data-debug',
        debug: true,
        include: ['.tsx', '.jsx', '.js'],
        exclude: ['node_modules', 'dist', '.next']
      }
    ]
  ]
};
```

## 🤖 AI Integration Example

Once installed, you can easily communicate with AI assistants:

```
🧑 "I want to modify the button at data-loc-id='components/Header.tsx:17:6'"

🤖 "I'll help you modify the button in components/Header.tsx at line 17, column 6"
```

The AI can instantly locate the exact file and position to make changes!

## 📱 Real-world Example

**Before** (original JSX):
```jsx
export default function HomePage() {
  return (
    <div className="container">
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
    <div className="container" data-loc-id="pages/index.tsx:3:4">
      <h1 data-loc-id="pages/index.tsx:4:6">Welcome to my site</h1>
      <button onClick={handleClick} data-loc-id="pages/index.tsx:5:6">Click me</button>
    </div>
  );
}
```

## 🔄 Environment-based Configuration

Only enable in development and staging:

```javascript
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'nextjs-tagger',
      {
        enabled: ['development', 'staging'].includes(process.env.NODE_ENV),
        prefixName: 'data-loc',
        debug: process.env.NODE_ENV === 'development'
      }
    ]
  ]
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

1. **Check your Babel config**: Ensure `.babelrc.js` is in your project root
2. **Restart dev server**: Changes to Babel config require restart
3. **Enable debug mode**: Set `debug: true` to see console output
4. **Check browser inspector**: Look for `data-loc-id` attributes

### next/font conflicts?

If you see font-related errors:

```javascript
// Temporarily comment out next/font imports for testing
// import { Inter } from 'next/font/google';
```

### Build errors?

The plugin only runs in development by default. For production builds:

```javascript
{
  enabled: false // Explicitly disable for production
}
```

## 📊 Performance Impact

- **Development**: Minimal impact, only processes JSX files
- **Production**: Zero impact (disabled by default)
- **Bundle size**: No runtime code added

## 🔧 Static Export Compatibility

Works perfectly with Next.js static export:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  // ... other config
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [KanChaiShaoXia](https://github.com/KanChaiShaoXia)

## 🙏 Acknowledgments

- Built with ❤️ for the AI-assisted development community
- Inspired by the need for better code navigation tools
- Special thanks to the Next.js and Babel teams

---

**Happy coding with AI! 🤖✨**