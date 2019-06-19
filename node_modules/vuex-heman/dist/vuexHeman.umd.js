(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuexHeman"] = factory();
	else
		root["vuexHeman"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getters_namespaceObject = {};
__webpack_require__.r(getters_namespaceObject);
__webpack_require__.d(getters_namespaceObject, "getArrayElWIdxByIdFactory", function() { return getArrayElWIdxByIdFactory; });
var mutations_namespaceObject = {};
__webpack_require__.r(mutations_namespaceObject);
__webpack_require__.d(mutations_namespaceObject, "setPropVal", function() { return setPropVal; });
__webpack_require__.d(mutations_namespaceObject, "setProps", function() { return setProps; });
__webpack_require__.d(mutations_namespaceObject, "setArrayElPropsByIdFactory", function() { return setArrayElPropsByIdFactory; });
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "passThruActionsFactory", function() { return passThruActionsFactory; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./projects/common/vuexHeman/src/getters.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getArrayElWIdxById(container, index, noResult) {
  return function (id) {
    var idx = index[id];

    if (typeof idx !== "number") {
      return noResult;
    }

    return container[idx];
  };
}

var getArrayElWIdxByIdFactory = function getArrayElWIdxByIdFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  var noResult = "noResult" in settings ? settings.noResult : null;
  return function generatedGetArrayElWIdxById(state) {
    if (_typeof(state[index]) !== "object") {
      throw new Error("Name of index does not point to an object in state: " + index);
    }

    if (_typeof(state[container]) !== "object") {
      throw new Error("Name of container does not point to an object in state: " + container);
    }

    return getArrayElWIdxById(state[container], state[index], noResult);
  };
};
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/mutations.js
function mutations_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { mutations_typeof = function _typeof(obj) { return typeof obj; }; } else { mutations_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return mutations_typeof(obj); }

var setPropVal = function setPropVal(state, data) {
  if (typeof data === "undefined" || !("prop" in data) || !("val" in data)) {
    throw new Error("Missing property on data parameter: provide 'prop' and 'val'.");
  }

  if (!(data.prop in state)) {
    throw new Error("Tried to set non-existing property: " + data.prop);
  }

  state[data.prop] = data.val;
};
var setProps = function setProps(state, data) {
  var err = [];

  for (var prop in data) {
    if (!(prop in state)) {
      err.push(prop);
      continue;
    }

    state[prop] = data[prop];
  }

  if (err.length > 0) {
    throw new Error("Tried to set at least one non-existing property: " + err.join(","));
  }
};

function setArrayElPropsById(container, index, props) {
  var id = props.id;

  if (typeof id === "undefined") {
    throw new Error("Missing id on data parameter.");
  }

  var idx = index[id];

  if (typeof idx === "undefined") {
    throw new Error("Id not found in index while setting prop/s on element: " + JSON.stringify(props));
  }

  var el = container[idx];
  var err = [];
  delete props.id;

  for (var p in props) {
    if (p in el) {
      el[p] = props[p];
    } else {
      err.push(p);
    }
  }

  if (err.length > 0) {
    throw new Error("Tried to set at least one non-existing property: " + err.toString(","));
  }
}

var setArrayElPropsByIdFactory = function setArrayElPropsByIdFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  return function generatedSetArrayElPropsById(state, data) {
    if (mutations_typeof(state[index]) !== "object") {
      throw new Error("Name of index does not point to an object in state: " + index);
    }

    if (mutations_typeof(state[container]) !== "object") {
      throw new Error("Name of container does not point to an object in state: " + container);
    }

    setArrayElPropsById(state[container], state[index], data);
  };
};
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/actions.js
function actions_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { actions_typeof = function _typeof(obj) { return typeof obj; }; } else { actions_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return actions_typeof(obj); }

function passThruAction(command, store, data) {
  store.commit(command, data);
}

var passThruActionsFactory = function passThruActionsFactory(names) {
  if (typeof names === "string") {
    return function generatedPassThruAction(store, data) {
      passThruAction(names, store, data);
    };
  }

  if (names instanceof Array) {
    var obj = {};
    names.forEach(function (name) {
      if (typeof name !== "string") {
        throw new Error("Expected element of array to be of type string. Got: " + actions_typeof(name));
      }

      obj[name] = function generatedPassThruAction(store, data) {
        passThruAction(name, store, data);
      };
    });
    return obj;
  }

  if (actions_typeof(names) === "object") {
    var _loop = function _loop(name) {
      var methodName = name;
      var commandName = names[name];

      names[methodName] = function generatedPassThruAction(store, data) {
        passThruAction(commandName, store, data);
      };
    };

    for (var name in names) {
      _loop(name);
    }

    return names;
  }

  throw new Error("Expected parameter to be of type string, object or array. Got: " + actions_typeof(names));
};
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/index.js



var getters = getters_namespaceObject;
var mutations = mutations_namespaceObject;
var actions = actions_namespaceObject;
var vuexHeman = {
  getters: getters,
  mutations: mutations,
  actions: actions
};
/* harmony default export */ var src = (vuexHeman);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport getters */__webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* concated harmony reexport mutations */__webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* concated harmony reexport actions */__webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* concated harmony reexport vuexHeman */__webpack_require__.d(__webpack_exports__, "vuexHeman", function() { return vuexHeman; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
});