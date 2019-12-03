const { RawSource } = require("webpack-sources");

const PLUGIN_NAME = "InlineRequirePlugin";

function getImportPattern() {
  return /(\/\* [^*]+ \*\/\s+)?var (_[^ ]+__WEBPACK_IMPORTED_MODULE_[^ ]+) = ([^;]+);/g;
}

function collectRequires(src) {
  // Collect require variables
  const requireVariables = new Map();
  const pattern = getImportPattern();
  let match;
  while ((match = pattern.exec(src))) {
    const variableDeclaration = match[0];
    const variableName = match[2];
    const requireExpression = match[3];

    // TODO: Handle scopes.
    if (requireVariables.has(variableName)) {
      console.log(
        "Duplicated webpack require variable",
        variableName,
        match.index,
        requireVariables.get(variableName)
      );
    } else {
      requireVariables.set(variableName, {
        variableDeclaration,
        variableName,
        requireExpression,
        position: match.index
      });
    }
  }
  return requireVariables;
}

class InlineRequirePlugin {
  constructor(options = {}) {
    this.options = {};
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.optimizeChunkAssets.tapPromise(
        PLUGIN_NAME,
        async chunks => {
          for (const chunk of chunks) {
            for (const file of chunk.files) {
              compilation.updateAsset(file, old => {
                let src = old.source();

                // Collect require variables
                const requireVariables = collectRequires(src);

                // Remove variable declarations.
                src = src.replace(getImportPattern(), "");

                // Replace variable names.
                for (const [
                  variableName,
                  { requireExpression }
                ] of requireVariables.entries()) {
                  while (src.includes(variableName)) {
                    src = src.replace(variableName, requireExpression);
                  }
                }

                // TODO: Maintain source map.
                return new RawSource(src);
              });
            }
          }
        }
      );
    });
  }
}

module.exports = InlineRequirePlugin;
