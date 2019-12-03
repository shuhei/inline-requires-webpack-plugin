## Development build

```shell
webpack --mode development index.js
```

```js
(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      // ID
      i: moduleId,
      // Loaded
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;

    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is module id, require it
  // mode & 2: merge all properties of vlaue into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function(value, mode) {
   // ...
  }

  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";

  return __webpack_require__(__webpack_require__.s = "./index.js");
})({
  "./bar.js": function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("...");

    // The eval's content:
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "bar", function() { return bar; });
    function bar() {
      console.log("bar");
    }
  },
  "./foo.js": function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("...");

    // The eval's content:
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "default", function() { return foo; });
    function foo() {
      console.log("foo");
    }
  },
  // Entry point
  "./index.js": function(module, __webpack_exports__, __webpack_require__) {}
    "use strict";
    eval("...");
    // The eval's content:
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _foo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foo */ "./foo.js");
    /* harmony import */
    var _bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar */ "./bar.js");

    function main() {
      Object(_foo__WEBPACK_IMPORTED_MODULE_0__["default"])();
      Object(_bar__WEBPACK_IMPORTED_MODULE_1__["bar"])();
    }
});
```

In a nutshell:

```js
(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {}
  return __webpack_require__("./index.js");
})({
  "./bar.js": getBar,
  "./foo.js": getFoo,
  "./index.js": getIndex
});
```

webpack's `lib/javascript/JavascriptModulesPlugin.js` is taking care of generating the modules.

## Production build

The same structure as the development build except that the `modules` is an array instead of an object. Module IDs are numbers instead of strings.

## Inline require

I want to change this:

```js
function(e, t, n) {
  "use strict";
  n.r(t);
  var r = n(0);
  window.addEventListener("load", function() {
    console.log("foo"), console.log("bar", r);
  });
}
```

to:

```js
function(e, t, n) {
  "use strict";
  n.r(t);
  window.addEventListener("load", function() {
    console.log("foo"), console.log("bar", n(0));
  });
}
```
