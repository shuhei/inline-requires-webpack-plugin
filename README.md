# Inline Requires Webpack Plugin

PoC for inline requires with Webpack.

This is **INCOMPLETE** and its implementation is **TERRIBLE**. I'll improve it if I can verify that the idea is worth pursuing.

## Motivation

I learned the idea of inline requires at [Making instagram.com faster: Code size and execution optimizations (Part 4)](https://instagram-engineering.com/making-instagram-com-faster-code-size-and-execution-optimizations-part-4-57668be796a8). Instagram is using Metro for bundling, and Metro seems to be using [inline-requires Babel plugin in fbjs](https://github.com/facebook/fbjs/blob/master/packages/babel-preset-fbjs/plugins/inline-requires.js) for inlining `require()`s.

I can't use the Babel plugin that works with CommonJS modules because I want to use ES modules for tree shaking—I wonder how Instagram is eliminating dead code, but probably they have their own solution. This Webpack plugin inlines `__webpack_require__()` calls after Webpack understands ES modules so that it doesn't break tree shaking.

## License

MIT
