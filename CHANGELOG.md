# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-07

### Added
- Initial release of nextjs-tagger
- Automatic debug attribute injection for HTML elements
- Configurable prefix names and file patterns
- TypeScript type definitions
- Comprehensive documentation and examples
- Development-only mode by default
- Support for Next.js static export
- AI-friendly code location attributes

### Features
- Adds `data-loc-id="file:line:column"` attributes to HTML elements
- Skips React components, only tags HTML elements
- Highly configurable via Babel plugin options
- Zero runtime overhead in production
- Compatible with Next.js 13+ and static exports

### Documentation
- Complete README with installation and usage instructions
- TypeScript definitions for better IDE support
- Example project demonstrating plugin usage
- Troubleshooting guide for common issues