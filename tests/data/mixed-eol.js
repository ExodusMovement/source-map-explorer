var __BUNDLE_START_TIME__=this.nativePerformanceNow?nativePerformanceNow():Date.now(),__DEV__=false,process=this.process||{},__METRO_GLOBAL_PREFIX__='';process.env=process.env||{};process.env.NODE_ENV=process.env.NODE_ENV||"production";
(function (global) {
  "use strict";
  global.__r = metroRequire;
  global[__METRO_GLOBAL_PREFIX__ + "__d"] = define;
  global.__c = clear;
  global.__registerSegment = registerSegment;
  var modules = clear();
  var EMPTY = {};
  var CYCLE_DETECTED = {};
  var _ref = {},
    hasOwnProperty = _ref.hasOwnProperty;
  function clear() {
    modules = Object.create(null);
    return modules;
  }
  function define(factory, moduleId, dependencyMap) {
    if (modules[moduleId] != null) {
      return;
    }
    var mod = {
      dependencyMap: dependencyMap,
      factory: factory,
      hasError: false,
      importedAll: EMPTY,
      importedDefault: EMPTY,
      isInitialized: false,
      publicModule: {
        exports: {}
      }
    };
    modules[moduleId] = mod;
  }
  function metroRequire(moduleId) {
    var moduleIdReallyIsNumber = moduleId;
    var module = modules[moduleIdReallyIsNumber];
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleIdReallyIsNumber, module);
  }
  function metroImportDefault(moduleId) {
    var moduleIdReallyIsNumber = moduleId;
    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedDefault !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedDefault;
    }
    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedDefault = exports && exports.__esModule ? exports.default : exports;
    return modules[moduleIdReallyIsNumber].importedDefault = importedDefault;
  }
  metroRequire.importDefault = metroImportDefault;
  function metroImportAll(moduleId) {
    var moduleIdReallyIsNumber = moduleId;
    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedAll !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedAll;
    }
    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedAll;
    if (exports && exports.__esModule) {
      importedAll = exports;
    } else {
      importedAll = {};
      if (exports) {
        for (var key in exports) {
          if (hasOwnProperty.call(exports, key)) {
            importedAll[key] = exports[key];
          }
        }
      }
      importedAll.default = exports;
    }
    return modules[moduleIdReallyIsNumber].importedAll = importedAll;
  }
  metroRequire.importAll = metroImportAll;
  metroRequire.context = function fallbackRequireContext() {
    throw new Error("The experimental Metro feature `require.context` is not enabled in your project.");
  };
  var inGuard = false;
  function guardedLoadModule(moduleId, module) {
    if (!inGuard && global.ErrorUtils) {
      inGuard = true;
      var returnValue;
      try {
        returnValue = loadModuleImplementation(moduleId, module);
      } catch (e) {
        global.ErrorUtils.reportFatalError(e);
      }
      inGuard = false;
      return returnValue;
    } else {
      return loadModuleImplementation(moduleId, module);
    }
  }
  var ID_MASK_SHIFT = 16;
  var LOCAL_ID_MASK = 65535;
  function unpackModuleId(moduleId) {
    var segmentId = moduleId >>> ID_MASK_SHIFT;
    var localId = moduleId & LOCAL_ID_MASK;
    return {
      segmentId: segmentId,
      localId: localId
    };
  }
  metroRequire.unpackModuleId = unpackModuleId;
  function packModuleId(value) {
    return (value.segmentId << ID_MASK_SHIFT) + value.localId;
  }
  metroRequire.packModuleId = packModuleId;
  var moduleDefinersBySegmentID = [];
  var definingSegmentByModuleID = new Map();
  function registerSegment(segmentId, moduleDefiner, moduleIds) {
    moduleDefinersBySegmentID[segmentId] = moduleDefiner;
    if (moduleIds) {
      moduleIds.forEach(function (moduleId) {
        if (!modules[moduleId] && !definingSegmentByModuleID.has(moduleId)) {
          definingSegmentByModuleID.set(moduleId, segmentId);
        }
      });
    }
  }
  function loadModuleImplementation(moduleId, module) {
    if (!module && moduleDefinersBySegmentID.length > 0) {
      var _definingSegmentByMod;
      var segmentId = (_definingSegmentByMod = definingSegmentByModuleID.get(moduleId)) !== null && _definingSegmentByMod !== undefined ? _definingSegmentByMod : 0;
      var definer = moduleDefinersBySegmentID[segmentId];
      if (definer != null) {
        definer(moduleId);
        module = modules[moduleId];
        definingSegmentByModuleID.delete(moduleId);
      }
    }
    var nativeRequire = global.nativeRequire;
    if (!module && nativeRequire) {
      var _unpackModuleId = unpackModuleId(moduleId),
        _segmentId = _unpackModuleId.segmentId,
        localId = _unpackModuleId.localId;
      nativeRequire(localId, _segmentId);
      module = modules[moduleId];
    }
    if (!module) {
      throw unknownModuleError(moduleId);
    }
    if (module.hasError) {
      throw module.error;
    }
    module.isInitialized = true;
    var _module = module,
      factory = _module.factory,
      dependencyMap = _module.dependencyMap;
    try {
      var moduleObject = module.publicModule;
      moduleObject.id = moduleId;
      factory(global, metroRequire, metroImportDefault, metroImportAll, moduleObject, moduleObject.exports, dependencyMap);
      {
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      return moduleObject.exports;
    } catch (e) {
      module.hasError = true;
      module.error = e;
      module.isInitialized = false;
      module.publicModule.exports = undefined;
      throw e;
    } finally {}
  }
  function unknownModuleError(id) {
    var message = 'Requiring unknown module "' + id + '".';
    return Error(message);
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  var inspect = function () {
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        formatValueCalls: 0,
        stylize: stylizeNoColor
      };
      return formatValue(ctx, obj, opts.depth);
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function (val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      ctx.formatValueCalls++;
      if (ctx.formatValueCalls > 200) {
        return "[TOO BIG formatValueCalls " + ctx.formatValueCalls + " exceeded limit of 200]";
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = '',
        array = false,
        braces = ['{', '}'];
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = ' ' + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function (key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value)) return ctx.stylize('' + value, 'number');
      if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
      if (isNull(value)) return ctx.stylize('null', 'null');
    }
    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
      };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function (line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function (line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
      return name + ': ' + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function (prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }
    function isArray(ar) {
      return Array.isArray(ar);
    }
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    function isNull(arg) {
      return arg === null;
    }
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    function isString(arg) {
      return typeof arg === 'string';
    }
    function isUndefined(arg) {
      return arg === undefined;
    }
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    return inspect;
  }();
  var OBJECT_COLUMN_NAME = '(index)';
  var LOG_LEVELS = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  var INSPECTOR_LEVELS = [];
  INSPECTOR_LEVELS[LOG_LEVELS.trace] = 'debug';
  INSPECTOR_LEVELS[LOG_LEVELS.info] = 'log';
  INSPECTOR_LEVELS[LOG_LEVELS.warn] = 'warning';
  INSPECTOR_LEVELS[LOG_LEVELS.error] = 'error';
  var INSPECTOR_FRAMES_TO_SKIP = 1;
  function getNativeLogFunction(level) {
    return function () {
      var str;
      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        str = arguments[0];
      } else {
        str = Array.prototype.map.call(arguments, function (arg) {
          return inspect(arg, {
            depth: 10
          });
        }).join(', ');
      }
      var firstArg = arguments[0];
      var logLevel = level;
      if (typeof firstArg === 'string' && firstArg.slice(0, 9) === 'Warning: ' && logLevel >= LOG_LEVELS.error) {
        logLevel = LOG_LEVELS.warn;
      }
      if (global.__inspectorLog) {
        global.__inspectorLog(INSPECTOR_LEVELS[logLevel], str, [].slice.call(arguments), INSPECTOR_FRAMES_TO_SKIP);
      }
      if (groupStack.length) {
        str = groupFormat('', str);
      }
      global.nativeLoggingHook(str, logLevel);
    };
  }
  function repeat(element, n) {
    return Array.apply(null, Array(n)).map(function () {
      return element;
    });
  }
  function consoleTablePolyfill(rows) {
    if (!Array.isArray(rows)) {
      var data = rows;
      rows = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var row = data[key];
          row[OBJECT_COLUMN_NAME] = key;
          rows.push(row);
        }
      }
    }
    if (rows.length === 0) {
      global.nativeLoggingHook('', LOG_LEVELS.info);
      return;
    }
    var columns = Object.keys(rows[0]).sort();
    var stringRows = [];
    var columnWidths = [];
    columns.forEach(function (k, i) {
      columnWidths[i] = k.length;
      for (var j = 0; j < rows.length; j++) {
        var cellStr = (rows[j][k] || '?').toString();
        stringRows[j] = stringRows[j] || [];
        stringRows[j][i] = cellStr;
        columnWidths[i] = Math.max(columnWidths[i], cellStr.length);
      }
    });
    function joinRow(row, space) {
      var cells = row.map(function (cell, i) {
        var extraSpaces = repeat(' ', columnWidths[i] - cell.length).join('');
        return cell + extraSpaces;
      });
      space = space || ' ';
      return cells.join(space + '|' + space);
    }
    var separators = columnWidths.map(function (columnWidth) {
      return repeat('-', columnWidth).join('');
    });
    var separatorRow = joinRow(separators, '-');
    var header = joinRow(columns);
    var table = [header, separatorRow];
    for (var i = 0; i < rows.length; i++) {
      table.push(joinRow(stringRows[i]));
    }
    global.nativeLoggingHook('\n' + table.join('\n'), LOG_LEVELS.info);
  }
  var GROUP_PAD = "\u2502";
  var GROUP_OPEN = "\u2510";
  var GROUP_CLOSE = "\u2518";
  var groupStack = [];
  function groupFormat(prefix, msg) {
    return groupStack.join('') + prefix + ' ' + (msg || '');
  }
  function consoleGroupPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_OPEN, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupCollapsedPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupEndPolyfill() {
    groupStack.pop();
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE), LOG_LEVELS.info);
  }
  function consoleAssertPolyfill(expression, label) {
    if (!expression) {
      global.nativeLoggingHook('Assertion failed: ' + label, LOG_LEVELS.error);
    }
  }
  if (global.nativeLoggingHook) {
    var originalConsole = global.console;
    global.console = {
      error: getNativeLogFunction(LOG_LEVELS.error),
      info: getNativeLogFunction(LOG_LEVELS.info),
      log: getNativeLogFunction(LOG_LEVELS.info),
      warn: getNativeLogFunction(LOG_LEVELS.warn),
      trace: getNativeLogFunction(LOG_LEVELS.trace),
      debug: getNativeLogFunction(LOG_LEVELS.trace),
      table: consoleTablePolyfill,
      group: consoleGroupPolyfill,
      groupEnd: consoleGroupEndPolyfill,
      groupCollapsed: consoleGroupCollapsedPolyfill,
      assert: consoleAssertPolyfill
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  } else if (!global.console) {
    var stub = function stub() {};
    var log = global.print || stub;
    global.console = {
      debug: log,
      error: log,
      info: log,
      log: log,
      trace: log,
      warn: log,
      assert: function assert(expression, label) {
        if (!expression) {
          log('Assertion failed: ' + label);
        }
      },
      clear: stub,
      dir: stub,
      dirxml: stub,
      group: stub,
      groupCollapsed: stub,
      groupEnd: stub,
      profile: stub,
      profileEnd: stub,
      table: stub
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  var _inGuard = 0;
  var _globalHandler = function onError(e, isFatal) {
    throw e;
  };
  var ErrorUtils = {
    setGlobalHandler: function setGlobalHandler(fun) {
      _globalHandler = fun;
    },
    getGlobalHandler: function getGlobalHandler() {
      return _globalHandler;
    },
    reportError: function reportError(error) {
      _globalHandler && _globalHandler(error, false);
    },
    reportFatalError: function reportFatalError(error) {
      _globalHandler && _globalHandler(error, true);
    },
    applyWithGuard: function applyWithGuard(fun, context, args, unused_onError, unused_name) {
      try {
        _inGuard++;
        return fun.apply(context, args);
      } catch (e) {
        ErrorUtils.reportError(e);
      } finally {
        _inGuard--;
      }
      return null;
    },
    applyWithGuardIfNeeded: function applyWithGuardIfNeeded(fun, context, args) {
      if (ErrorUtils.inGuard()) {
        return fun.apply(context, args);
      } else {
        ErrorUtils.applyWithGuard(fun, context, args);
      }
      return null;
    },
    inGuard: function inGuard() {
      return !!_inGuard;
    },
    guard: function guard(fun, name, context) {
      var _ref;
      if (typeof fun !== 'function') {
        console.warn('A function must be passed to ErrorUtils.guard, got ', fun);
        return null;
      }
      var guardName = (_ref = name != null ? name : fun.name) != null ? _ref : '<generated guard>';
      function guarded() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return ErrorUtils.applyWithGuard(fun, context != null ? context : this, args, null, guardName);
      }
      return guarded;
    }
  };
  global.ErrorUtils = ErrorUtils;
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  (function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (typeof Object.entries !== 'function') {
      Object.entries = function (object) {
        if (object == null) {
          throw new TypeError('Object.entries called on non-object');
        }
        var entries = [];
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            entries.push([key, object[key]]);
          }
        }
        return entries;
      };
    }
    if (typeof Object.values !== 'function') {
      Object.values = function (object) {
        if (object == null) {
          throw new TypeError('Object.values called on non-object');
        }
        var values = [];
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            values.push(object[key]);
          }
        }
        return values;
      };
    }
  })();
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  (0, _$$_REQUIRE(_dependencyMap[0]).sha3_512)('Message to hash');
},0,[1]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.5.7
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2016
   * @license MIT
   */(function () {
    'use strict';

    var INPUT_ERROR = 'input is invalid type';
    var FINALIZE_ERROR = 'finalize already called';
    var WINDOW = typeof window === 'object';
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
      root = global;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === 'object' && module.exports;
    var AMD = typeof define === 'function' && define.amd;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
    var CSHAKE_BYTEPAD = {
      '128': 168,
      '256': 136
    };
    var isArray = root.JS_SHA3_NO_NODE_JS || !Array.isArray ? function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    } : Array.isArray;
    var isView = ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) ? function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    } : ArrayBuffer.isView;
    var formatMessage = function formatMessage(message) {
      var type = typeof message;
      if (type === 'string') {
        return [message, true];
      }
      if (type !== 'object' || message === null) {
        throw new Error(INPUT_ERROR);
      }
      if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
        return [new Uint8Array(message), false];
      }
      if (!isArray(message) && !isView(message)) {
        throw new Error(INPUT_ERROR);
      }
      return [message, false];
    };
    var empty = function empty(message) {
      return formatMessage(message)[0].length === 0;
    };
    var cloneArray = function cloneArray(array) {
      var newArray = [];
      for (var i = 0; i < array.length; ++i) {
        newArray[i] = array[i];
      }
      return newArray;
    };
    var createOutputMethod = function createOutputMethod(bits, padding, outputType) {
      return function (message) {
        return new Keccak(bits, padding, bits).update(message)[outputType]();
      };
    };
    var createShakeOutputMethod = function createShakeOutputMethod(bits, padding, outputType) {
      return function (message, outputBits) {
        return new Keccak(bits, padding, outputBits).update(message)[outputType]();
      };
    };
    var createCshakeOutputMethod = function createCshakeOutputMethod(bits, padding, outputType) {
      return function (message, outputBits, n, s) {
        return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
      };
    };
    var createKmacOutputMethod = function createKmacOutputMethod(bits, padding, outputType) {
      return function (key, message, outputBits, s) {
        return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
      };
    };
    var createOutputMethods = function createOutputMethods(method, createMethod, bits, padding) {
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        method[type] = createMethod(bits, padding, type);
      }
      return method;
    };
    var createMethod = function createMethod(bits, padding) {
      var method = createOutputMethod(bits, padding, 'hex');
      method.create = function () {
        return new Keccak(bits, padding, bits);
      };
      method.update = function (message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits, padding);
    };
    var createShakeMethod = function createShakeMethod(bits, padding) {
      var method = createShakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits) {
        return new Keccak(bits, padding, outputBits);
      };
      method.update = function (message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits, padding);
    };
    var createCshakeMethod = function createCshakeMethod(bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createCshakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits, n, s) {
        if (empty(n) && empty(s)) {
          return methods['shake' + bits].create(outputBits);
        } else {
          return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
        }
      };
      method.update = function (message, outputBits, n, s) {
        return method.create(outputBits, n, s).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
    };
    var createKmacMethod = function createKmacMethod(bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createKmacOutputMethod(bits, padding, 'hex');
      method.create = function (key, outputBits, s) {
        return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
      };
      method.update = function (key, message, outputBits, s) {
        return method.create(key, outputBits, s).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits, padding);
    };
    var algorithms = [{
      name: 'keccak',
      padding: KECCAK_PADDING,
      bits: BITS,
      createMethod: createMethod
    }, {
      name: 'sha3',
      padding: PADDING,
      bits: BITS,
      createMethod: createMethod
    }, {
      name: 'shake',
      padding: SHAKE_PADDING,
      bits: SHAKE_BITS,
      createMethod: createShakeMethod
    }, {
      name: 'cshake',
      padding: CSHAKE_PADDING,
      bits: SHAKE_BITS,
      createMethod: createCshakeMethod
    }, {
      name: 'kmac',
      padding: CSHAKE_PADDING,
      bits: SHAKE_BITS,
      createMethod: createKmacMethod
    }];
    var methods = {},
      methodNames = [];
    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits = algorithm.bits;
      for (var j = 0; j < bits.length; ++j) {
        var methodName = algorithm.name + '_' + bits[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
        if (algorithm.name !== 'sha3') {
          var newMethodName = algorithm.name + bits[j];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }
    function Keccak(bits, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = 1600 - (bits << 1) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;
      for (var i = 0; i < 50; ++i) {
        this.s[i] = 0;
      }
    }
    Keccak.prototype.update = function (message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var result = formatMessage(message);
      message = result[0];
      var isString = result[1];
      var blocks = this.blocks,
        byteCount = this.byteCount,
        length = message.length,
        blockCount = this.blockCount,
        index = 0,
        s = this.s,
        i,
        code;
      while (index < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i = 1; i < blockCount + 1; ++i) {
            blocks[i] = 0;
          }
        }
        if (isString) {
          for (i = this.start; index < length && i < byteCount; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            }
          }
        } else {
          for (i = this.start; index < length && i < byteCount; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
        this.lastByteIndex = i;
        if (i >= byteCount) {
          this.start = i - byteCount;
          this.block = blocks[blockCount];
          for (i = 0; i < blockCount; ++i) {
            s[i] ^= blocks[i];
          }
          f(s);
          this.reset = true;
        } else {
          this.start = i;
        }
      }
      return this;
    };
    Keccak.prototype.encode = function (x, right) {
      var o = x & 255,
        n = 1;
      var bytes = [o];
      x = x >> 8;
      o = x & 255;
      while (o > 0) {
        bytes.unshift(o);
        x = x >> 8;
        o = x & 255;
        ++n;
      }
      if (right) {
        bytes.push(n);
      } else {
        bytes.unshift(n);
      }
      this.update(bytes);
      return bytes.length;
    };
    Keccak.prototype.encodeString = function (str) {
      var result = formatMessage(str);
      str = result[0];
      var isString = result[1];
      var bytes = 0,
        length = str.length;
      if (isString) {
        for (var i = 0; i < str.length; ++i) {
          var code = str.charCodeAt(i);
          if (code < 0x80) {
            bytes += 1;
          } else if (code < 0x800) {
            bytes += 2;
          } else if (code < 0xd800 || code >= 0xe000) {
            bytes += 3;
          } else {
            code = 0x10000 + ((code & 0x3ff) << 10 | str.charCodeAt(++i) & 0x3ff);
            bytes += 4;
          }
        }
      } else {
        bytes = length;
      }
      bytes += this.encode(bytes * 8);
      this.update(str);
      return bytes;
    };
    Keccak.prototype.bytepad = function (strs, w) {
      var bytes = this.encode(w);
      for (var i = 0; i < strs.length; ++i) {
        bytes += this.encodeString(strs[i]);
      }
      var paddingBytes = (w - bytes % w) % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };
    Keccak.prototype.finalize = function () {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks,
        i = this.lastByteIndex,
        blockCount = this.blockCount,
        s = this.s;
      blocks[i >> 2] |= this.padding[i & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      blocks[blockCount - 1] |= 0x80000000;
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
    };
    Keccak.prototype.toString = Keccak.prototype.hex = function () {
      this.finalize();
      var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
      var hex = '',
        block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          block = s[i];
          hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
        }
        if (j % blockCount === 0) {
          s = cloneArray(s);
          f(s);
          i = 0;
        }
      }
      if (extraBytes) {
        block = s[i];
        hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F];
        if (extraBytes > 1) {
          hex += HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F];
        }
      }
      return hex;
    };
    Keccak.prototype.arrayBuffer = function () {
      this.finalize();
      var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
      var bytes = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer(outputBlocks + 1 << 2);
      } else {
        buffer = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer);
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          array[j] = s[i];
        }
        if (j % blockCount === 0) {
          s = cloneArray(s);
          f(s);
        }
      }
      if (extraBytes) {
        array[j] = s[i];
        buffer = buffer.slice(0, bytes);
      }
      return buffer;
    };
    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
    Keccak.prototype.digest = Keccak.prototype.array = function () {
      this.finalize();
      var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
      var array = [],
        offset,
        block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          offset = j << 2;
          block = s[i];
          array[offset] = block & 0xFF;
          array[offset + 1] = block >> 8 & 0xFF;
          array[offset + 2] = block >> 16 & 0xFF;
          array[offset + 3] = block >> 24 & 0xFF;
        }
        if (j % blockCount === 0) {
          s = cloneArray(s);
          f(s);
        }
      }
      if (extraBytes) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        if (extraBytes > 1) {
          array[offset + 1] = block >> 8 & 0xFF;
        }
        if (extraBytes > 2) {
          array[offset + 2] = block >> 16 & 0xFF;
        }
      }
      return array;
    };
    function Kmac(bits, padding, outputBits) {
      Keccak.call(this, bits, padding, outputBits);
    }
    Kmac.prototype = new Keccak();
    Kmac.prototype.finalize = function () {
      this.encode(this.outputBits, true);
      return Keccak.prototype.finalize.call(this);
    };
    var f = function f(s) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
        c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
        c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
        c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
        c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
        c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
        c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
        c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
        c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
        c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
        h = c8 ^ (c2 << 1 | c3 >>> 31);
        l = c9 ^ (c3 << 1 | c2 >>> 31);
        s[0] ^= h;
        s[1] ^= l;
        s[10] ^= h;
        s[11] ^= l;
        s[20] ^= h;
        s[21] ^= l;
        s[30] ^= h;
        s[31] ^= l;
        s[40] ^= h;
        s[41] ^= l;
        h = c0 ^ (c4 << 1 | c5 >>> 31);
        l = c1 ^ (c5 << 1 | c4 >>> 31);
        s[2] ^= h;
        s[3] ^= l;
        s[12] ^= h;
        s[13] ^= l;
        s[22] ^= h;
        s[23] ^= l;
        s[32] ^= h;
        s[33] ^= l;
        s[42] ^= h;
        s[43] ^= l;
        h = c2 ^ (c6 << 1 | c7 >>> 31);
        l = c3 ^ (c7 << 1 | c6 >>> 31);
        s[4] ^= h;
        s[5] ^= l;
        s[14] ^= h;
        s[15] ^= l;
        s[24] ^= h;
        s[25] ^= l;
        s[34] ^= h;
        s[35] ^= l;
        s[44] ^= h;
        s[45] ^= l;
        h = c4 ^ (c8 << 1 | c9 >>> 31);
        l = c5 ^ (c9 << 1 | c8 >>> 31);
        s[6] ^= h;
        s[7] ^= l;
        s[16] ^= h;
        s[17] ^= l;
        s[26] ^= h;
        s[27] ^= l;
        s[36] ^= h;
        s[37] ^= l;
        s[46] ^= h;
        s[47] ^= l;
        h = c6 ^ (c0 << 1 | c1 >>> 31);
        l = c7 ^ (c1 << 1 | c0 >>> 31);
        s[8] ^= h;
        s[9] ^= l;
        s[18] ^= h;
        s[19] ^= l;
        s[28] ^= h;
        s[29] ^= l;
        s[38] ^= h;
        s[39] ^= l;
        s[48] ^= h;
        s[49] ^= l;
        b0 = s[0];
        b1 = s[1];
        b32 = s[11] << 4 | s[10] >>> 28;
        b33 = s[10] << 4 | s[11] >>> 28;
        b14 = s[20] << 3 | s[21] >>> 29;
        b15 = s[21] << 3 | s[20] >>> 29;
        b46 = s[31] << 9 | s[30] >>> 23;
        b47 = s[30] << 9 | s[31] >>> 23;
        b28 = s[40] << 18 | s[41] >>> 14;
        b29 = s[41] << 18 | s[40] >>> 14;
        b20 = s[2] << 1 | s[3] >>> 31;
        b21 = s[3] << 1 | s[2] >>> 31;
        b2 = s[13] << 12 | s[12] >>> 20;
        b3 = s[12] << 12 | s[13] >>> 20;
        b34 = s[22] << 10 | s[23] >>> 22;
        b35 = s[23] << 10 | s[22] >>> 22;
        b16 = s[33] << 13 | s[32] >>> 19;
        b17 = s[32] << 13 | s[33] >>> 19;
        b48 = s[42] << 2 | s[43] >>> 30;
        b49 = s[43] << 2 | s[42] >>> 30;
        b40 = s[5] << 30 | s[4] >>> 2;
        b41 = s[4] << 30 | s[5] >>> 2;
        b22 = s[14] << 6 | s[15] >>> 26;
        b23 = s[15] << 6 | s[14] >>> 26;
        b4 = s[25] << 11 | s[24] >>> 21;
        b5 = s[24] << 11 | s[25] >>> 21;
        b36 = s[34] << 15 | s[35] >>> 17;
        b37 = s[35] << 15 | s[34] >>> 17;
        b18 = s[45] << 29 | s[44] >>> 3;
        b19 = s[44] << 29 | s[45] >>> 3;
        b10 = s[6] << 28 | s[7] >>> 4;
        b11 = s[7] << 28 | s[6] >>> 4;
        b42 = s[17] << 23 | s[16] >>> 9;
        b43 = s[16] << 23 | s[17] >>> 9;
        b24 = s[26] << 25 | s[27] >>> 7;
        b25 = s[27] << 25 | s[26] >>> 7;
        b6 = s[36] << 21 | s[37] >>> 11;
        b7 = s[37] << 21 | s[36] >>> 11;
        b38 = s[47] << 24 | s[46] >>> 8;
        b39 = s[46] << 24 | s[47] >>> 8;
        b30 = s[8] << 27 | s[9] >>> 5;
        b31 = s[9] << 27 | s[8] >>> 5;
        b12 = s[18] << 20 | s[19] >>> 12;
        b13 = s[19] << 20 | s[18] >>> 12;
        b44 = s[29] << 7 | s[28] >>> 25;
        b45 = s[28] << 7 | s[29] >>> 25;
        b26 = s[38] << 8 | s[39] >>> 24;
        b27 = s[39] << 8 | s[38] >>> 24;
        b8 = s[48] << 14 | s[49] >>> 18;
        b9 = s[49] << 14 | s[48] >>> 18;
        s[0] = b0 ^ ~b2 & b4;
        s[1] = b1 ^ ~b3 & b5;
        s[10] = b10 ^ ~b12 & b14;
        s[11] = b11 ^ ~b13 & b15;
        s[20] = b20 ^ ~b22 & b24;
        s[21] = b21 ^ ~b23 & b25;
        s[30] = b30 ^ ~b32 & b34;
        s[31] = b31 ^ ~b33 & b35;
        s[40] = b40 ^ ~b42 & b44;
        s[41] = b41 ^ ~b43 & b45;
        s[2] = b2 ^ ~b4 & b6;
        s[3] = b3 ^ ~b5 & b7;
        s[12] = b12 ^ ~b14 & b16;
        s[13] = b13 ^ ~b15 & b17;
        s[22] = b22 ^ ~b24 & b26;
        s[23] = b23 ^ ~b25 & b27;
        s[32] = b32 ^ ~b34 & b36;
        s[33] = b33 ^ ~b35 & b37;
        s[42] = b42 ^ ~b44 & b46;
        s[43] = b43 ^ ~b45 & b47;
        s[4] = b4 ^ ~b6 & b8;
        s[5] = b5 ^ ~b7 & b9;
        s[14] = b14 ^ ~b16 & b18;
        s[15] = b15 ^ ~b17 & b19;
        s[24] = b24 ^ ~b26 & b28;
        s[25] = b25 ^ ~b27 & b29;
        s[34] = b34 ^ ~b36 & b38;
        s[35] = b35 ^ ~b37 & b39;
        s[44] = b44 ^ ~b46 & b48;
        s[45] = b45 ^ ~b47 & b49;
        s[6] = b6 ^ ~b8 & b0;
        s[7] = b7 ^ ~b9 & b1;
        s[16] = b16 ^ ~b18 & b10;
        s[17] = b17 ^ ~b19 & b11;
        s[26] = b26 ^ ~b28 & b20;
        s[27] = b27 ^ ~b29 & b21;
        s[36] = b36 ^ ~b38 & b30;
        s[37] = b37 ^ ~b39 & b31;
        s[46] = b46 ^ ~b48 & b40;
        s[47] = b47 ^ ~b49 & b41;
        s[8] = b8 ^ ~b0 & b2;
        s[9] = b9 ^ ~b1 & b3;
        s[18] = b18 ^ ~b10 & b12;
        s[19] = b19 ^ ~b11 & b13;
        s[28] = b28 ^ ~b20 & b22;
        s[29] = b29 ^ ~b21 & b23;
        s[38] = b38 ^ ~b30 & b32;
        s[39] = b39 ^ ~b31 & b33;
        s[48] = b48 ^ ~b40 & b42;
        s[49] = b49 ^ ~b41 & b43;
        s[0] ^= RC[n];
        s[1] ^= RC[n + 1];
      }
    };
    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
      if (AMD) {
        define(function () {
          return methods;
        });
      }
    }
  })();
},1,[]);
__r(0);
//# sourceMappingURL=mixed-eol.js.map
