(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@jellyfish-dev/membrane-webrtc-js/dist/mediaEvent.js
  var require_mediaEvent = __commonJS({
    "node_modules/@jellyfish-dev/membrane-webrtc-js/dist/mediaEvent.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generateCustomEvent = exports.generateMediaEvent = exports.deserializeMediaEvent = exports.serializeMediaEvent = void 0;
      function serializeMediaEvent(mediaEvent) {
        return JSON.stringify(mediaEvent);
      }
      exports.serializeMediaEvent = serializeMediaEvent;
      function deserializeMediaEvent(serializedMediaEvent) {
        return JSON.parse(serializedMediaEvent);
      }
      exports.deserializeMediaEvent = deserializeMediaEvent;
      function generateMediaEvent(type, data2) {
        var event = { type };
        if (data2) {
          event = __spreadProps(__spreadValues({}, event), { data: data2 });
        }
        return event;
      }
      exports.generateMediaEvent = generateMediaEvent;
      function generateCustomEvent(data2) {
        return generateMediaEvent("custom", data2);
      }
      exports.generateCustomEvent = generateCustomEvent;
    }
  });

  // node_modules/uuid/dist/esm-browser/rng.js
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  var getRandomValues, rnds8;
  var init_rng = __esm({
    "node_modules/uuid/dist/esm-browser/rng.js"() {
      rnds8 = new Uint8Array(16);
    }
  });

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default;
  var init_regex = __esm({
    "node_modules/uuid/dist/esm-browser/regex.js"() {
      regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    }
  });

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default;
  var init_validate = __esm({
    "node_modules/uuid/dist/esm-browser/validate.js"() {
      init_regex();
      validate_default = validate;
    }
  });

  // node_modules/uuid/dist/esm-browser/stringify.js
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var byteToHex, i, stringify_default;
  var init_stringify = __esm({
    "node_modules/uuid/dist/esm-browser/stringify.js"() {
      init_validate();
      byteToHex = [];
      for (i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).substr(1));
      }
      stringify_default = stringify;
    }
  });

  // node_modules/uuid/dist/esm-browser/v1.js
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
    if (node == null || clockseq == null) {
      var seedBytes = options.random || (options.rng || rng)();
      if (node == null) {
        node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
      }
      if (clockseq == null) {
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
      }
    }
    var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
    var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
    if (dt < 0 && options.clockseq === void 0) {
      clockseq = clockseq + 1 & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
      nsecs = 0;
    }
    if (nsecs >= 1e4) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 122192928e5;
    var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255;
    var tmh = msecs / 4294967296 * 1e4 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255;
    b[i++] = tmh >>> 24 & 15 | 16;
    b[i++] = tmh >>> 16 & 255;
    b[i++] = clockseq >>> 8 | 128;
    b[i++] = clockseq & 255;
    for (var n = 0; n < 6; ++n) {
      b[i + n] = node[n];
    }
    return buf || stringify_default(b);
  }
  var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
  var init_v1 = __esm({
    "node_modules/uuid/dist/esm-browser/v1.js"() {
      init_rng();
      init_stringify();
      _lastMSecs = 0;
      _lastNSecs = 0;
      v1_default = v1;
    }
  });

  // node_modules/uuid/dist/esm-browser/parse.js
  function parse(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    var v;
    var arr = new Uint8Array(16);
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 255;
    arr[2] = v >>> 8 & 255;
    arr[3] = v & 255;
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 255;
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 255;
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 255;
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
    arr[11] = v / 4294967296 & 255;
    arr[12] = v >>> 24 & 255;
    arr[13] = v >>> 16 & 255;
    arr[14] = v >>> 8 & 255;
    arr[15] = v & 255;
    return arr;
  }
  var parse_default;
  var init_parse = __esm({
    "node_modules/uuid/dist/esm-browser/parse.js"() {
      init_validate();
      parse_default = parse;
    }
  });

  // node_modules/uuid/dist/esm-browser/v35.js
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }
  function v35_default(name, version2, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
      if (typeof value === "string") {
        value = stringToBytes(value);
      }
      if (typeof namespace === "string") {
        namespace = parse_default(namespace);
      }
      if (namespace.length !== 16) {
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      }
      var bytes = new Uint8Array(16 + value.length);
      bytes.set(namespace);
      bytes.set(value, namespace.length);
      bytes = hashfunc(bytes);
      bytes[6] = bytes[6] & 15 | version2;
      bytes[8] = bytes[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return stringify_default(bytes);
    }
    try {
      generateUUID.name = name;
    } catch (err) {
    }
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
  }
  var DNS, URL;
  var init_v35 = __esm({
    "node_modules/uuid/dist/esm-browser/v35.js"() {
      init_stringify();
      init_parse();
      DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    }
  });

  // node_modules/uuid/dist/esm-browser/md5.js
  function md5(bytes) {
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = new Uint8Array(msg.length);
      for (var i = 0; i < msg.length; ++i) {
        bytes[i] = msg.charCodeAt(i);
      }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
  }
  function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = "0123456789abcdef";
    for (var i = 0; i < length32; i += 8) {
      var x = input[i >> 5] >>> i % 32 & 255;
      var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
      output.push(hex);
    }
    return output;
  }
  function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
  }
  function wordsToMd5(x, len) {
    x[len >> 5] |= 128 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  function bytesToWords(input) {
    if (input.length === 0) {
      return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for (var i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input[i / 8] & 255) << i % 32;
    }
    return output;
  }
  function safeAdd(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  var md5_default;
  var init_md5 = __esm({
    "node_modules/uuid/dist/esm-browser/md5.js"() {
      md5_default = md5;
    }
  });

  // node_modules/uuid/dist/esm-browser/v3.js
  var v3, v3_default;
  var init_v3 = __esm({
    "node_modules/uuid/dist/esm-browser/v3.js"() {
      init_v35();
      init_md5();
      v3 = v35_default("v3", 48, md5_default);
      v3_default = v3;
    }
  });

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default;
  var init_v4 = __esm({
    "node_modules/uuid/dist/esm-browser/v4.js"() {
      init_rng();
      init_stringify();
      v4_default = v4;
    }
  });

  // node_modules/uuid/dist/esm-browser/sha1.js
  function f(s, x, y, z) {
    switch (s) {
      case 0:
        return x & y ^ ~x & z;
      case 1:
        return x ^ y ^ z;
      case 2:
        return x & y ^ x & z ^ y & z;
      case 3:
        return x ^ y ^ z;
    }
  }
  function ROTL(x, n) {
    return x << n | x >>> 32 - n;
  }
  function sha1(bytes) {
    var K = [1518500249, 1859775393, 2400959708, 3395469782];
    var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = [];
      for (var i = 0; i < msg.length; ++i) {
        bytes.push(msg.charCodeAt(i));
      }
    } else if (!Array.isArray(bytes)) {
      bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(128);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for (var _i = 0; _i < N; ++_i) {
      var arr = new Uint32Array(16);
      for (var j = 0; j < 16; ++j) {
        arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
      }
      M[_i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
    for (var _i2 = 0; _i2 < N; ++_i2) {
      var W = new Uint32Array(80);
      for (var t = 0; t < 16; ++t) {
        W[t] = M[_i2][t];
      }
      for (var _t = 16; _t < 80; ++_t) {
        W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
      }
      var a = H[0];
      var b = H[1];
      var c = H[2];
      var d = H[3];
      var e = H[4];
      for (var _t2 = 0; _t2 < 80; ++_t2) {
        var s = Math.floor(_t2 / 20);
        var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
        e = d;
        d = c;
        c = ROTL(b, 30) >>> 0;
        b = a;
        a = T;
      }
      H[0] = H[0] + a >>> 0;
      H[1] = H[1] + b >>> 0;
      H[2] = H[2] + c >>> 0;
      H[3] = H[3] + d >>> 0;
      H[4] = H[4] + e >>> 0;
    }
    return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
  }
  var sha1_default;
  var init_sha1 = __esm({
    "node_modules/uuid/dist/esm-browser/sha1.js"() {
      sha1_default = sha1;
    }
  });

  // node_modules/uuid/dist/esm-browser/v5.js
  var v5, v5_default;
  var init_v5 = __esm({
    "node_modules/uuid/dist/esm-browser/v5.js"() {
      init_v35();
      init_sha1();
      v5 = v35_default("v5", 80, sha1_default);
      v5_default = v5;
    }
  });

  // node_modules/uuid/dist/esm-browser/nil.js
  var nil_default;
  var init_nil = __esm({
    "node_modules/uuid/dist/esm-browser/nil.js"() {
      nil_default = "00000000-0000-0000-0000-000000000000";
    }
  });

  // node_modules/uuid/dist/esm-browser/version.js
  function version(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.substr(14, 1), 16);
  }
  var version_default;
  var init_version = __esm({
    "node_modules/uuid/dist/esm-browser/version.js"() {
      init_validate();
      version_default = version;
    }
  });

  // node_modules/uuid/dist/esm-browser/index.js
  var esm_browser_exports = {};
  __export(esm_browser_exports, {
    NIL: () => nil_default,
    parse: () => parse_default,
    stringify: () => stringify_default,
    v1: () => v1_default,
    v3: () => v3_default,
    v4: () => v4_default,
    v5: () => v5_default,
    validate: () => validate_default,
    version: () => version_default
  });
  var init_esm_browser = __esm({
    "node_modules/uuid/dist/esm-browser/index.js"() {
      init_v1();
      init_v3();
      init_v4();
      init_v5();
      init_nil();
      init_version();
      init_validate();
      init_stringify();
      init_parse();
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/@jellyfish-dev/membrane-webrtc-js/dist/const.js
  var require_const = __commonJS({
    "node_modules/@jellyfish-dev/membrane-webrtc-js/dist/const.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.defaultSimulcastBitrates = exports.defaultBitrates = exports.simulcastTransceiverConfig = void 0;
      exports.simulcastTransceiverConfig = {
        direction: "sendonly",
        sendEncodings: [
          {
            rid: "l",
            active: false,
            scaleResolutionDownBy: 4
          },
          {
            rid: "m",
            active: false,
            scaleResolutionDownBy: 2
          },
          {
            rid: "h",
            active: false
          }
        ]
      };
      exports.defaultBitrates = { audio: 5e4, video: 25e5 };
      exports.defaultSimulcastBitrates = {
        h: 25e5,
        m: 5e5,
        l: 15e4
      };
    }
  });

  // node_modules/@jellyfish-dev/membrane-webrtc-js/dist/membraneWebRTC.js
  var require_membraneWebRTC = __commonJS({
    "node_modules/@jellyfish-dev/membrane-webrtc-js/dist/membraneWebRTC.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MembraneWebRTC = void 0;
      var mediaEvent_1 = require_mediaEvent();
      var uuid_1 = (init_esm_browser(), esm_browser_exports);
      var events_1 = require_events();
      var const_1 = require_const();
      var vadStatuses = ["speech", "silence"];
      var TrackContextImpl = class extends events_1.EventEmitter {
        constructor(peer, trackId, metadata) {
          super();
          this.track = null;
          this.stream = null;
          this.maxBandwidth = 0;
          this.vadStatus = "silence";
          this.negotiationStatus = "awaiting";
          this.pendingMetadataUpdate = false;
          this.peer = peer;
          this.trackId = trackId;
          this.metadata = metadata;
        }
      };
      var MembraneWebRTC2 = class extends events_1.EventEmitter {
        constructor(config) {
          super();
          this.localTracksWithStreams = [];
          this.trackIdToTrack = new Map();
          this.idToPeer = new Map();
          this.localPeer = {
            id: "",
            metadata: {},
            trackIdToMetadata: new Map()
          };
          this.localTrackIdToTrack = new Map();
          this.midToTrackId = new Map();
          this.disabledTrackEncodings = new Map();
          this.rtcConfig = {
            iceServers: [],
            iceTransportPolicy: "relay"
          };
          this.join = (peerMetadata) => {
            var _a, _b;
            try {
              this.localPeer.metadata = peerMetadata;
              let mediaEvent = (0, mediaEvent_1.generateMediaEvent)("join", {
                metadata: peerMetadata
              });
              this.sendMediaEvent(mediaEvent);
            } catch (e) {
              (_b = (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onConnectionError) === null || _b === void 0 ? void 0 : _b.call(_a, e);
              this.emit("onConnectionError", e);
              this.leave();
            }
          };
          this.receiveMediaEvent = (mediaEvent) => {
            var _a, _b, _c, _d;
            const deserializedMediaEvent = (0, mediaEvent_1.deserializeMediaEvent)(mediaEvent);
            switch (deserializedMediaEvent.type) {
              case "peerAccepted":
                this.localPeer.id = deserializedMediaEvent.data.id;
                (_b = (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onJoinSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, deserializedMediaEvent.data.id, deserializedMediaEvent.data.peersInRoom);
                this.emit("onJoinSuccess", deserializedMediaEvent.data.id, deserializedMediaEvent.data.peersInRoom);
                let peers = deserializedMediaEvent.data.peersInRoom;
                peers.forEach((peer) => {
                  this.addPeer(peer);
                });
                peers.forEach((peer) => {
                  Array.from(peer.trackIdToMetadata.entries()).forEach(([trackId, metadata]) => {
                    var _a2, _b2;
                    const ctx = new TrackContextImpl(peer, trackId, metadata);
                    this.trackIdToTrack.set(trackId, ctx);
                    (_b2 = (_a2 = this.callbacks) === null || _a2 === void 0 ? void 0 : _a2.onTrackAdded) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, ctx);
                    this.emit("onTrackAdded", ctx);
                  });
                });
                break;
              case "peerDenied":
                (_d = (_c = this.callbacks) === null || _c === void 0 ? void 0 : _c.onJoinError) === null || _d === void 0 ? void 0 : _d.call(_c, deserializedMediaEvent.data);
                this.emit("onJoinError", deserializedMediaEvent.data);
                break;
              default:
                if (this.localPeer.id != null)
                  this.handleMediaEvent(deserializedMediaEvent);
            }
          };
          this.handleMediaEvent = (deserializedMediaEvent) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            let peer;
            let data2;
            switch (deserializedMediaEvent.type) {
              case "offerData":
                const turnServers = deserializedMediaEvent.data.integratedTurnServers;
                this.setTurns(turnServers);
                const offerData = new Map(Object.entries(deserializedMediaEvent.data.tracksTypes));
                this.onOfferData(offerData);
                break;
              case "tracksAdded":
                data2 = deserializedMediaEvent.data;
                if (this.getPeerId() === data2.peerId)
                  return;
                data2.trackIdToMetadata = new Map(Object.entries(data2.trackIdToMetadata));
                peer = this.idToPeer.get(data2.peerId);
                const oldTrackIdToMetadata = peer.trackIdToMetadata;
                peer.trackIdToMetadata = new Map([
                  ...peer.trackIdToMetadata,
                  ...data2.trackIdToMetadata
                ]);
                this.idToPeer.set(peer.id, peer);
                Array.from(peer.trackIdToMetadata.entries()).forEach(([trackId2, metadata]) => {
                  var _a2, _b2;
                  if (!oldTrackIdToMetadata.has(trackId2)) {
                    const ctx = new TrackContextImpl(peer, trackId2, metadata);
                    this.trackIdToTrack.set(trackId2, ctx);
                    (_b2 = (_a2 = this.callbacks) === null || _a2 === void 0 ? void 0 : _a2.onTrackAdded) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, ctx);
                    this.emit("onTrackAdded", ctx);
                  }
                });
                break;
              case "tracksRemoved":
                data2 = deserializedMediaEvent.data;
                const peerId = data2.peerId;
                if (this.getPeerId() === data2.peerId)
                  return;
                const trackIds = data2.trackIds;
                trackIds.forEach((trackId2) => {
                  var _a2, _b2;
                  const trackContext2 = this.trackIdToTrack.get(trackId2);
                  (_b2 = (_a2 = this.callbacks) === null || _a2 === void 0 ? void 0 : _a2.onTrackRemoved) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, trackContext2);
                  this.emit("onTrackRemoved", trackContext2);
                  this.eraseTrack(trackId2, peerId);
                });
                break;
              case "sdpAnswer":
                this.midToTrackId = new Map(Object.entries(deserializedMediaEvent.data.midToTrackId));
                for (let trackId2 of Object.values(deserializedMediaEvent.data.midToTrackId)) {
                  const track = this.localTrackIdToTrack.get(trackId2);
                  if (track) {
                    track.negotiationStatus = "done";
                    if (track.pendingMetadataUpdate) {
                      const mediaEvent = (0, mediaEvent_1.generateMediaEvent)("updateTrackMetadata", {
                        trackId: trackId2,
                        trackMetadata: track.metadata
                      });
                      this.sendMediaEvent(mediaEvent);
                    }
                    track.pendingMetadataUpdate = false;
                  }
                }
                this.onAnswer(deserializedMediaEvent.data);
                break;
              case "candidate":
                this.onRemoteCandidate(deserializedMediaEvent.data);
                break;
              case "peerJoined":
                peer = deserializedMediaEvent.data.peer;
                if (peer.id === this.getPeerId())
                  return;
                this.addPeer(peer);
                (_b = (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onPeerJoined) === null || _b === void 0 ? void 0 : _b.call(_a, peer);
                this.emit("onPeerJoined", peer);
                break;
              case "peerLeft":
                peer = this.idToPeer.get(deserializedMediaEvent.data.peerId);
                if (peer === void 0)
                  return;
                Array.from(peer.trackIdToMetadata.keys()).forEach((trackId2) => {
                  var _a2, _b2;
                  (_b2 = (_a2 = this.callbacks) === null || _a2 === void 0 ? void 0 : _a2.onTrackRemoved) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, this.trackIdToTrack.get(trackId2));
                  this.emit("onTrackRemoved", this.trackIdToTrack.get(trackId2));
                });
                this.erasePeer(peer);
                (_d = (_c = this.callbacks) === null || _c === void 0 ? void 0 : _c.onPeerLeft) === null || _d === void 0 ? void 0 : _d.call(_c, peer);
                this.emit("onPeerLeft", peer);
                break;
              case "peerUpdated":
                if (this.getPeerId() === deserializedMediaEvent.data.peerId)
                  return;
                peer = this.idToPeer.get(deserializedMediaEvent.data.peerId);
                peer.metadata = deserializedMediaEvent.data.metadata;
                this.addPeer(peer);
                (_f = (_e = this.callbacks) === null || _e === void 0 ? void 0 : _e.onPeerUpdated) === null || _f === void 0 ? void 0 : _f.call(_e, peer);
                this.emit("onPeerUpdated", peer);
                break;
              case "peerRemoved":
                if (this.getPeerId() !== deserializedMediaEvent.data.peerId) {
                  console.error("Received onRemoved media event, but it does not refer to the local peer");
                  return;
                }
                (_h = (_g = this.callbacks) === null || _g === void 0 ? void 0 : _g.onRemoved) === null || _h === void 0 ? void 0 : _h.call(_g, deserializedMediaEvent.data.reason);
                this.emit("onRemoved", deserializedMediaEvent.data.reason);
                break;
              case "trackUpdated": {
                if (this.getPeerId() === deserializedMediaEvent.data.peerId)
                  return;
                peer = this.idToPeer.get(deserializedMediaEvent.data.peerId);
                if (peer == null)
                  throw `Peer with id: ${deserializedMediaEvent.data.peerId} doesn't exist`;
                const trackId2 = deserializedMediaEvent.data.trackId;
                const trackMetadata = deserializedMediaEvent.data.metadata;
                peer.trackIdToMetadata.set(trackId2, trackMetadata);
                const trackContext2 = this.trackIdToTrack.get(trackId2);
                trackContext2.metadata = trackMetadata;
                (_k = (_j = this.callbacks) === null || _j === void 0 ? void 0 : _j.onTrackUpdated) === null || _k === void 0 ? void 0 : _k.call(_j, trackContext2);
                this.emit("onTrackUpdated", trackContext2);
                break;
              }
              case "tracksPriority":
                const enabledTracks = deserializedMediaEvent.data.tracks.map((trackId2) => this.trackIdToTrack.get(trackId2));
                const disabledTracks = Array.from(this.trackIdToTrack.values()).filter((track) => !enabledTracks.includes(track));
                (_m = (_l = this.callbacks) === null || _l === void 0 ? void 0 : _l.onTracksPriorityChanged) === null || _m === void 0 ? void 0 : _m.call(_l, enabledTracks, disabledTracks);
                this.emit("onTracksPriorityChanged", enabledTracks, disabledTracks);
              case "encodingSwitched":
                const trackId = deserializedMediaEvent.data.trackId;
                const trackContext = this.trackIdToTrack.get(trackId);
                trackContext.encoding = deserializedMediaEvent.data.encoding;
                trackContext.encodingReason = deserializedMediaEvent.data.reason;
                (_o = trackContext.onEncodingChanged) === null || _o === void 0 ? void 0 : _o.call(trackContext);
                trackContext.emit("onEncodingChanged", trackContext);
                (_q = (_p = this.callbacks) === null || _p === void 0 ? void 0 : _p.onTrackEncodingChanged) === null || _q === void 0 ? void 0 : _q.call(_p, trackContext.peer.id, trackId, trackContext.encoding);
                this.emit("onTrackEncodingChanged", trackContext.peer.id, trackId, trackContext.encoding);
                break;
              case "custom":
                this.handleMediaEvent(deserializedMediaEvent.data);
                break;
              case "error":
                (_s = (_r = this.callbacks) === null || _r === void 0 ? void 0 : _r.onConnectionError) === null || _s === void 0 ? void 0 : _s.call(_r, deserializedMediaEvent.data.message);
                this.emit("onConnectionError", deserializedMediaEvent.data.message);
                this.leave();
                break;
              case "vadNotification": {
                const trackId2 = deserializedMediaEvent.data.trackId;
                const ctx = this.trackIdToTrack.get(trackId2);
                const vadStatus = deserializedMediaEvent.data.status;
                if (vadStatuses.includes(vadStatus)) {
                  ctx.vadStatus = vadStatus;
                  (_t = ctx.onVoiceActivityChanged) === null || _t === void 0 ? void 0 : _t.call(ctx);
                  ctx.emit("onVoiceActivityChanged", ctx);
                } else {
                  console.warn("Received unknown vad status: ", vadStatus);
                }
                break;
              }
              case "bandwidthEstimation": {
                const estimation = deserializedMediaEvent.data.estimation;
                (_v = (_u = this.callbacks) === null || _u === void 0 ? void 0 : _u.onBandwidthEstimationChanged) === null || _v === void 0 ? void 0 : _v.call(_u, estimation);
                this.emit("onBandwidthEstimationChanged", estimation);
                break;
              }
              default:
                console.warn("Received unknown media event: ", deserializedMediaEvent.type);
                break;
            }
          };
          this.addTrackToConnection = (trackContext) => {
            let transceiverConfig = this.createTransceiverConfig(trackContext);
            const track = trackContext.track;
            this.connection.addTransceiver(track, transceiverConfig);
          };
          this.updatePeerMetadata = (peerMetadata) => {
            let mediaEvent = (0, mediaEvent_1.generateMediaEvent)("updatePeerMetadata", {
              metadata: peerMetadata
            });
            this.sendMediaEvent(mediaEvent);
          };
          this.updateTrackMetadata = (trackId, trackMetadata) => {
            const trackContext = this.localTrackIdToTrack.get(trackId);
            trackContext.metadata = trackMetadata;
            this.localTrackIdToTrack.set(trackId, trackContext);
            this.localPeer.trackIdToMetadata.set(trackId, trackMetadata);
            const mediaEvent = (0, mediaEvent_1.generateMediaEvent)("updateTrackMetadata", {
              trackId,
              trackMetadata
            });
            switch (trackContext.negotiationStatus) {
              case "done":
                this.sendMediaEvent(mediaEvent);
                break;
              case "offered":
                trackContext.pendingMetadataUpdate = true;
                break;
              case "awaiting":
                break;
            }
          };
          this.getMidToTrackId = () => {
            const localTrackMidToTrackId = {};
            if (!this.connection)
              return null;
            this.connection.getTransceivers().forEach((transceiver) => {
              var _a;
              const localTrackId = (_a = transceiver.sender.track) === null || _a === void 0 ? void 0 : _a.id;
              const mid = transceiver.mid;
              if (localTrackId && mid) {
                const trackContext = Array.from(this.localTrackIdToTrack.values()).find((trackContext2) => trackContext2.track.id === localTrackId);
                localTrackMidToTrackId[mid] = trackContext.trackId;
              }
            });
            return localTrackMidToTrackId;
          };
          this.leave = () => {
            let mediaEvent = (0, mediaEvent_1.generateMediaEvent)("leave");
            this.sendMediaEvent(mediaEvent);
            this.cleanUp();
          };
          this.cleanUp = () => {
            if (this.connection) {
              this.connection.onicecandidate = null;
              this.connection.ontrack = null;
              this.connection.onconnectionstatechange = null;
              this.connection.onicecandidateerror = null;
              this.connection.oniceconnectionstatechange = null;
            }
            this.localTracksWithStreams = [];
            this.connection = void 0;
          };
          this.sendMediaEvent = (mediaEvent) => {
            var _a;
            const serializedMediaEvent = (0, mediaEvent_1.serializeMediaEvent)(mediaEvent);
            (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onSendMediaEvent(serializedMediaEvent);
            this.emit("onSendMediaEvent", serializedMediaEvent);
          };
          this.onAnswer = (answer) => __async(this, null, function* () {
            this.connection.ontrack = this.onTrack();
            try {
              yield this.connection.setRemoteDescription(answer);
              this.disabledTrackEncodings.forEach((encodings, trackId) => {
                encodings.forEach((encoding) => this.disableTrackEncoding(trackId, encoding));
              });
            } catch (err) {
              console.log(err);
            }
          });
          this.addTransceiversIfNeeded = (serverTracks) => {
            var _a;
            const recvTransceivers = this.connection.getTransceivers().filter((elem) => elem.direction === "recvonly");
            let toAdd = [];
            const getNeededTransceiversTypes = (type) => {
              let typeNumber = serverTracks.get(type);
              typeNumber = typeNumber !== void 0 ? typeNumber : 0;
              const typeTransceiversNumber = recvTransceivers.filter((elem) => elem.receiver.track.kind === type).length;
              return Array(typeNumber - typeTransceiversNumber).fill(type);
            };
            const audio = getNeededTransceiversTypes("audio");
            const video = getNeededTransceiversTypes("video");
            toAdd = toAdd.concat(audio);
            toAdd = toAdd.concat(video);
            for (let kind of toAdd)
              (_a = this.connection) === null || _a === void 0 ? void 0 : _a.addTransceiver(kind, { direction: "recvonly" });
          };
          this.getTrackIdToMetadata = () => {
            const trackIdToMetadata = {};
            Array.from(this.localPeer.trackIdToMetadata.entries()).forEach(([trackId, metadata]) => {
              trackIdToMetadata[trackId] = metadata;
            });
            return trackIdToMetadata;
          };
          this.getTrackBitrates = (trackId) => {
            const trackContext = this.localTrackIdToTrack.get(trackId);
            if (!trackContext)
              throw "Track with id ${trackId} not present in 'localTrackIdToTrack'";
            const kind = trackContext.track.kind;
            const sender = this.findSender(trackContext.track.id);
            const encodings = sender.getParameters().encodings;
            if (encodings.length == 1 && !encodings[0].rid)
              return encodings[0].maxBitrate || const_1.defaultBitrates[kind];
            else if (kind == "audio")
              throw "Audio track cannot have multiple encodings";
            let bitrates = {};
            encodings.filter((encoding) => encoding.rid).forEach((encoding) => {
              const rid = encoding.rid;
              bitrates[rid] = encoding.maxBitrate || const_1.defaultSimulcastBitrates[rid];
            });
            return bitrates;
          };
          this.getTrackIdToTrackBitrates = () => {
            const trackIdToTrackBitrates = {};
            Array.from(this.localPeer.trackIdToMetadata.entries()).forEach(([trackId, _metadata]) => {
              trackIdToTrackBitrates[trackId] = this.getTrackBitrates(trackId);
            });
            return trackIdToTrackBitrates;
          };
          this.checkIfTrackBelongToPeer = (trackId, peer) => Array.from(peer.trackIdToMetadata.keys()).some((track) => trackId.startsWith(track));
          this.onOfferData = (offerData) => __async(this, null, function* () {
            if (!this.connection) {
              this.connection = new RTCPeerConnection(this.rtcConfig);
              this.connection.onicecandidate = this.onLocalCandidate();
              this.connection.onicecandidateerror = this.onIceCandidateError;
              this.connection.onconnectionstatechange = this.onConnectionStateChange;
              this.connection.oniceconnectionstatechange = this.onIceConnectionStateChange;
              Array.from(this.localTrackIdToTrack.values()).forEach((trackContext) => this.addTrackToConnection(trackContext));
              this.connection.getTransceivers().forEach((transceiver) => transceiver.direction = "sendonly");
            } else {
              yield this.connection.restartIce();
            }
            this.addTransceiversIfNeeded(offerData);
            yield this.createAndSendOffer();
          });
          this.onRemoteCandidate = (candidate) => {
            try {
              const iceCandidate = new RTCIceCandidate(candidate);
              if (!this.connection) {
                throw new Error("Received new remote candidate but RTCConnection is undefined");
              }
              this.connection.addIceCandidate(iceCandidate);
            } catch (error) {
              console.error(error);
            }
          };
          this.onLocalCandidate = () => {
            return (event) => {
              if (event.candidate) {
                let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
                  type: "candidate",
                  data: {
                    candidate: event.candidate.candidate,
                    sdpMLineIndex: event.candidate.sdpMLineIndex
                  }
                });
                this.sendMediaEvent(mediaEvent);
              }
            };
          };
          this.onIceCandidateError = (event) => {
            console.warn(event);
          };
          this.onConnectionStateChange = (event) => {
            var _a, _b, _c;
            if (((_a = this.connection) === null || _a === void 0 ? void 0 : _a.connectionState) === "failed") {
              const message = "Connection failed";
              (_c = (_b = this.callbacks) === null || _b === void 0 ? void 0 : _b.onConnectionError) === null || _c === void 0 ? void 0 : _c.call(_b, message);
              this.emit("onConnectionError", message);
            }
          };
          this.onIceConnectionStateChange = (event) => {
            var _a, _b, _c;
            const errorMessages = "Ice connection failed";
            switch ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.iceConnectionState) {
              case "disconnected":
                console.warn("ICE connection: disconnected");
                break;
              case "failed":
                (_c = (_b = this.callbacks) === null || _b === void 0 ? void 0 : _b.onConnectionError) === null || _c === void 0 ? void 0 : _c.call(_b, errorMessages);
                this.emit("onConnectionError", errorMessages);
                break;
            }
          };
          this.onTrack = () => {
            return (event) => {
              var _a, _b;
              const [stream] = event.streams;
              const mid = event.transceiver.mid;
              const trackId = this.midToTrackId.get(mid);
              if (this.checkIfTrackBelongToPeer(trackId, this.localPeer))
                return;
              const trackContext = this.trackIdToTrack.get(trackId);
              trackContext.stream = stream;
              trackContext.track = event.track;
              (_b = (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onTrackReady) === null || _b === void 0 ? void 0 : _b.call(_a, trackContext);
              this.emit("onTrackReady", trackContext);
            };
          };
          this.setTurns = (turnServers) => {
            turnServers.forEach((turnServer) => {
              var transport, uri;
              if (turnServer.transport == "tls") {
                transport = "tcp";
                uri = "turns";
              } else {
                transport = turnServer.transport;
                uri = "turn";
              }
              const rtcIceServer = {
                credential: turnServer.password,
                urls: uri.concat(":", turnServer.serverAddr, ":", turnServer.serverPort, "?transport=", transport),
                username: turnServer.username
              };
              this.rtcConfig.iceServers.push(rtcIceServer);
            });
          };
          this.addPeer = (peer) => {
            if (peer.hasOwnProperty("trackIdToMetadata"))
              peer.trackIdToMetadata = new Map(Object.entries(peer.trackIdToMetadata));
            else
              peer.trackIdToMetadata = new Map();
            this.idToPeer.set(peer.id, peer);
          };
          this.erasePeer = (peer) => {
            const tracksId = Array.from(peer.trackIdToMetadata.keys());
            tracksId.forEach((trackId) => this.trackIdToTrack.delete(trackId));
            Array.from(this.midToTrackId.entries()).forEach(([mid, trackId]) => {
              if (tracksId.includes(trackId))
                this.midToTrackId.delete(mid);
            });
            this.idToPeer.delete(peer.id);
          };
          this.eraseTrack = (trackId, peerId) => {
            this.trackIdToTrack.delete(trackId);
            const midToTrackId = Array.from(this.midToTrackId.entries());
            const [mid, _trackId] = midToTrackId.find(([mid2, mapTrackId]) => mapTrackId === trackId);
            this.midToTrackId.delete(mid);
            this.idToPeer.get(peerId).trackIdToMetadata.delete(trackId);
            this.disabledTrackEncodings.delete(trackId);
          };
          this.getPeerId = () => this.localPeer.id;
          this.callbacks = config === null || config === void 0 ? void 0 : config.callbacks;
        }
        addTrack(track, stream, trackMetadata = new Map(), simulcastConfig = { enabled: false, active_encodings: [] }, maxBandwidth = 0) {
          if (!simulcastConfig.enabled && !(typeof maxBandwidth === "number"))
            throw "Invalid type of `maxBandwidth` argument for a non-simulcast track, expected: number";
          if (this.getPeerId() === "")
            throw "Cannot add tracks before being accepted by the server";
          const trackId = this.getTrackId((0, uuid_1.v4)());
          this.localTracksWithStreams.push({ track, stream });
          this.localPeer.trackIdToMetadata.set(trackId, trackMetadata);
          const trackContext = new TrackContextImpl(this.localPeer, trackId, trackMetadata);
          trackContext.track = track;
          trackContext.stream = stream;
          trackContext.simulcastConfig = simulcastConfig;
          trackContext.maxBandwidth = maxBandwidth;
          this.localTrackIdToTrack.set(trackId, trackContext);
          if (this.connection) {
            this.addTrackToConnection(trackContext);
            this.connection.getTransceivers().forEach((transceiver) => transceiver.direction = transceiver.direction === "sendrecv" ? "sendonly" : transceiver.direction);
          }
          let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({ type: "renegotiateTracks" });
          this.sendMediaEvent(mediaEvent);
          return trackId;
        }
        createTransceiverConfig(trackContext) {
          let transceiverConfig;
          if (trackContext.track.kind === "audio") {
            transceiverConfig = this.createAudioTransceiverConfig(trackContext);
          } else {
            transceiverConfig = this.createVideoTransceiverConfig(trackContext);
          }
          return transceiverConfig;
        }
        createAudioTransceiverConfig(_trackContext) {
          return { direction: "sendonly" };
        }
        createVideoTransceiverConfig(trackContext) {
          var _a;
          let transceiverConfig;
          if (trackContext.simulcastConfig.enabled) {
            transceiverConfig = const_1.simulcastTransceiverConfig;
            const trackActiveEncodings = trackContext.simulcastConfig.active_encodings;
            let disabledTrackEncodings = [];
            (_a = transceiverConfig.sendEncodings) === null || _a === void 0 ? void 0 : _a.forEach((encoding) => {
              if (trackActiveEncodings.includes(encoding.rid)) {
                encoding.active = true;
              } else {
                disabledTrackEncodings.push(encoding.rid);
              }
            });
            this.disabledTrackEncodings.set(trackContext.trackId, disabledTrackEncodings);
          } else {
            transceiverConfig = {
              direction: "sendonly",
              sendEncodings: [
                {
                  active: true
                }
              ]
            };
          }
          if (trackContext.maxBandwidth && transceiverConfig.sendEncodings)
            this.applyBandwidthLimitation(transceiverConfig.sendEncodings, trackContext.maxBandwidth);
          return transceiverConfig;
        }
        applyBandwidthLimitation(encodings, max_bandwidth) {
          if (typeof max_bandwidth === "number") {
            this.splitBandwidth(encodings, max_bandwidth * 1024);
          } else {
            encodings.filter((encoding) => encoding.rid).forEach((encoding) => {
              const limit = max_bandwidth.get(encoding.rid) || 0;
              if (limit > 0) {
                encoding.maxBitrate = limit * 1024;
              } else
                delete encoding.maxBitrate;
            });
          }
        }
        splitBandwidth(encodings, bandwidth) {
          if (bandwidth === 0) {
            encodings.forEach((encoding) => delete encoding.maxBitrate);
            return;
          }
          if (encodings.length == 0) {
            console.error("Attempted to limit bandwidth of the track that doesn't have any encodings");
            return;
          }
          const firstScaleDownBy = encodings[0].scaleResolutionDownBy || 1;
          const bitrate_parts = encodings.reduce((acc, value) => acc + (firstScaleDownBy / (value.scaleResolutionDownBy || 1)) ** 2, 0);
          const x = bandwidth / bitrate_parts;
          encodings.forEach((value) => {
            value.maxBitrate = x * (firstScaleDownBy / (value.scaleResolutionDownBy || 1)) ** 2;
          });
        }
        replaceTrack(trackId, newTrack, newTrackMetadata) {
          return __async(this, null, function* () {
            const trackContext = this.localTrackIdToTrack.get(trackId);
            const sender = this.findSender(trackContext.track.id);
            if (sender) {
              return sender.replaceTrack(newTrack).then(() => {
                const trackMetadata = newTrackMetadata || this.localTrackIdToTrack.get(trackId).metadata;
                trackContext.track = newTrack;
                this.updateTrackMetadata(trackId, trackMetadata);
                return true;
              }).catch(() => false);
            }
            return false;
          });
        }
        setTrackBandwidth(trackId, bandwidth) {
          const trackContext = this.localTrackIdToTrack.get(trackId);
          if (!trackContext) {
            return Promise.reject(`Track '${trackId}' doesn't exist`);
          }
          const sender = this.findSender(trackContext.track.id);
          const parameters = sender.getParameters();
          if (parameters.encodings.length === 0) {
            parameters.encodings = [{}];
          } else {
            this.applyBandwidthLimitation(parameters.encodings, bandwidth);
          }
          return sender.setParameters(parameters).then(() => {
            let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
              type: "trackVariantBitrates",
              data: {
                trackId,
                variantBitrates: this.getTrackBitrates(trackId)
              }
            });
            this.sendMediaEvent(mediaEvent);
            return true;
          }).catch((_error) => false);
        }
        setEncodingBandwidth(trackId, rid, bandwidth) {
          const trackContext = this.localTrackIdToTrack.get(trackId);
          if (!trackContext) {
            return Promise.reject(`Track '${trackId}' doesn't exist`);
          }
          const sender = this.findSender(trackContext.track.id);
          const parameters = sender.getParameters();
          const encoding = parameters.encodings.find((encoding2) => encoding2.rid === rid);
          if (!encoding) {
            return Promise.reject(`Encoding with rid '${rid}' doesn't exist`);
          } else if (bandwidth === 0) {
            delete encoding.maxBitrate;
          } else {
            encoding.maxBitrate = bandwidth * 1024;
          }
          return sender.setParameters(parameters).then(() => {
            let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
              type: "trackVariantBitrates",
              data: {
                trackId,
                variantBitrates: this.getTrackBitrates(trackId)
              }
            });
            this.sendMediaEvent(mediaEvent);
            return true;
          }).catch((_error) => false);
        }
        removeTrack(trackId) {
          const trackContext = this.localTrackIdToTrack.get(trackId);
          const sender = this.findSender(trackContext.track.id);
          this.connection.removeTrack(sender);
          let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({ type: "renegotiateTracks" });
          this.sendMediaEvent(mediaEvent);
          this.localTrackIdToTrack.delete(trackId);
          this.localPeer.trackIdToMetadata.delete(trackId);
        }
        prioritizeTrack(trackId) {
          let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
            type: "prioritizeTrack",
            data: { trackId }
          });
          this.sendMediaEvent(mediaEvent);
        }
        unprioritizeTrack(trackId) {
          let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
            type: "unprioritizeTrack",
            data: { trackId }
          });
          this.sendMediaEvent(mediaEvent);
        }
        setPreferedVideoSizes(bigScreens, smallScreens, mediumScreens = 0, allSameSize = false) {
          let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
            type: "preferedVideoSizes",
            data: { bigScreens, mediumScreens, smallScreens, allSameSize }
          });
          this.sendMediaEvent(mediaEvent);
        }
        setTargetTrackEncoding(trackId, encoding) {
          let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
            type: "setTargetTrackVariant",
            data: {
              trackId,
              variant: encoding
            }
          });
          this.sendMediaEvent(mediaEvent);
        }
        enableTrackEncoding(trackId, encoding) {
          var _a, _b, _c;
          let track = (_a = this.localTrackIdToTrack.get(trackId)) === null || _a === void 0 ? void 0 : _a.track;
          let newDisabledTrackEncodings = (_b = this.disabledTrackEncodings.get(trackId)) === null || _b === void 0 ? void 0 : _b.filter((en) => en !== encoding);
          this.disabledTrackEncodings.set(trackId, newDisabledTrackEncodings);
          let sender = (_c = this.connection) === null || _c === void 0 ? void 0 : _c.getSenders().filter((sender2) => sender2.track === track)[0];
          let params = sender === null || sender === void 0 ? void 0 : sender.getParameters();
          params.encodings.filter((en) => en.rid == encoding)[0].active = true;
          sender === null || sender === void 0 ? void 0 : sender.setParameters(params);
        }
        disableTrackEncoding(trackId, encoding) {
          var _a, _b;
          let track = (_a = this.localTrackIdToTrack.get(trackId)) === null || _a === void 0 ? void 0 : _a.track;
          this.disabledTrackEncodings.get(trackId).push(encoding);
          let sender = (_b = this.connection) === null || _b === void 0 ? void 0 : _b.getSenders().filter((sender2) => sender2.track === track)[0];
          let params = sender === null || sender === void 0 ? void 0 : sender.getParameters();
          params.encodings.filter((en) => en.rid == encoding)[0].active = false;
          sender === null || sender === void 0 ? void 0 : sender.setParameters(params);
        }
        findSender(trackId) {
          return this.connection.getSenders().find((sender) => sender.track && sender.track.id === trackId);
        }
        getTrackId(uuid) {
          return `${this.getPeerId()}:${uuid}`;
        }
        createAndSendOffer() {
          return __async(this, null, function* () {
            if (!this.connection)
              return;
            try {
              const offer = yield this.connection.createOffer();
              yield this.connection.setLocalDescription(offer);
              let mediaEvent = (0, mediaEvent_1.generateCustomEvent)({
                type: "sdpOffer",
                data: {
                  sdpOffer: offer,
                  trackIdToTrackMetadata: this.getTrackIdToMetadata(),
                  trackIdToTrackBitrates: this.getTrackIdToTrackBitrates(),
                  midToTrackId: this.getMidToTrackId()
                }
              });
              this.sendMediaEvent(mediaEvent);
              for (let track of this.localTrackIdToTrack.values()) {
                track.negotiationStatus = "offered";
              }
            } catch (error) {
              console.error(error);
            }
          });
        }
      };
      exports.MembraneWebRTC = MembraneWebRTC2;
    }
  });

  // node_modules/@jellyfish-dev/membrane-webrtc-js/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@jellyfish-dev/membrane-webrtc-js/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MembraneWebRTC = void 0;
      var membraneWebRTC_1 = require_membraneWebRTC();
      Object.defineProperty(exports, "MembraneWebRTC", { enumerable: true, get: function() {
        return membraneWebRTC_1.MembraneWebRTC;
      } });
    }
  });

  // js/room.js
  var import_membrane_webrtc_js = __toModule(require_dist());

  // node_modules/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure2 = function() {
        return value;
      };
      return closure2;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      this.ajax("POST", body, () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), "application/json", body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data2 = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data2 };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data2 = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data2 };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data2 = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data2 };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data2) {
      this.logger(kind, msg, data2);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data2) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data2;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data2, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data2, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // js/room.js
  var videos = document.querySelector("#videos");
  function addVideoElement(id) {
    const video = document.createElement("video");
    video.id = id;
    video.autoplay = true;
    video.playsInline = true;
    videos.appendChild(video);
  }
  function removeVideoElement(id) {
    const video = document.getElementById(id);
    videos.removeChild(video);
  }
  function setErrorMessage(error) {
    console.error(error);
  }
  var Room = class {
    constructor(localStream, simulcast) {
      __publicField(this, "addTrack", (track) => {
        let trackId = !this.simulcast || track.kind == "audio" ? this.webrtc.addTrack(track, this.localStream) : this.webrtc.addTrack(track, this.localStream, {}, { enabled: true, active_encodings: this.encodings }, new Map([
          ["h", 1500],
          ["m", 500],
          ["l", 100]
        ]));
        if (track.kind == "audio") {
          this.audioTrack = [trackId, track];
          this.webrtc.updateTrackMetadata(this.audioTrack[0], {
            type: "audio",
            active: true
          });
        } else {
          this.videoTrack = [trackId, track];
          this.webrtc.updateTrackMetadata(this.videoTrack[0], {
            type: "camera",
            active: true
          });
        }
      });
      __publicField(this, "init", () => __async(this, null, function* () {
        yield this.phoenixChannelPushResult(this.webrtcChannel.join());
      }));
      __publicField(this, "join", () => {
        this.webrtc.join({ displayName: this.displayName });
      });
      __publicField(this, "leave", () => {
        this.webrtc.leave();
        this.webrtcChannel.leave();
        this.socket.off(this.webrtcSocketRefs);
        while (this.webrtcSocketRefs.length > 0) {
          this.webrtcSocketRefs.pop();
        }
      });
      __publicField(this, "updateParticipantsList", () => {
        const participantsNames = this.peers.map((p) => p.metadata.displayName);
        if (this.displayName) {
          participantsNames.push(this.displayName);
        }
      });
      __publicField(this, "phoenixChannelPushResult", (push) => __async(this, null, function* () {
        return new Promise((resolve, reject) => {
          push.receive("ok", (response) => resolve(response)).receive("error", (response) => reject(response));
        });
      }));
      __publicField(this, "disableSimulcastEncoding", (encoding) => {
        this.webrtc.disableTrackEncoding(this.videoTrack[0], encoding);
      });
      __publicField(this, "enableSimulcastEncoding", (encoding) => {
        this.webrtc.enableTrackEncoding(this.videoTrack[0], encoding);
      });
      __publicField(this, "selectPeerSimulcastEncoding", (encoding) => {
        const peer = this.peers[0];
        const trackIds = Array.from(peer.trackIdToMetadata.keys());
        const videoTrackIds = trackIds.filter((trackId) => this.remoteTracks.get(trackId).track.kind == "video");
        videoTrackIds.forEach((trackId) => this.webrtc.setTargetTrackEncoding(trackId, encoding));
      });
      __publicField(this, "getPeerEncoding", () => {
        return this.peerEncoding;
      });
      __publicField(this, "updateMetadata", () => this.webrtc.updatePeerMetadata("test"));
      __publicField(this, "updateTrackMetadata", () => this.webrtc.updateTrackMetadata(this.videoTrack[0], "trackMetadata"));
      this.localStream = localStream;
      this.peers = [];
      this.socket = new Socket("/socket");
      this.socket.connect();
      this.displayName = "web";
      this.webrtcChannel = this.socket.channel("room:room");
      this.videoTrack = null;
      this.audioTrack = null;
      this.peerEncoding = "m";
      this.encodings = ["l", "m", "h"];
      this.peerMetadata = null;
      this.trackMetadata = null;
      this.selfId = null;
      this.simulcast = simulcast;
      this.remoteTracks = new Map();
      this.webrtcSocketRefs = [];
      this.webrtcSocketRefs.push(this.socket.onError(this.leave));
      this.webrtcSocketRefs.push(this.socket.onClose(this.leave));
      this.webrtc = new import_membrane_webrtc_js.MembraneWebRTC({
        callbacks: {
          onSendMediaEvent: (mediaEvent) => {
            console.log("SEND MEDIA EVENT", mediaEvent);
            this.webrtcChannel.push("mediaEvent", { data: mediaEvent });
          },
          onConnectionError: setErrorMessage,
          onJoinSuccess: (peerId, peersInRoom) => {
            console.log("ON JOIN SUCCESS");
            this.selfId = peerId;
            if (this.localStream) {
              this.localStream.getTracks().forEach((track) => this.addTrack(track));
            }
            this.peers = peersInRoom;
            this.peers.forEach((peer) => {
              addVideoElement(peer.id);
            });
            this.updateParticipantsList();
          },
          onJoinError: (metadata) => {
            throw `Peer denied.`;
          },
          onTrackReady: (ctx) => {
            const video = document.getElementById(ctx.peer.id);
            video.srcObject = ctx.stream;
            this.remoteTracks.set(ctx.trackId, ctx);
          },
          onTrackAdded: (ctx) => {
            console.log(this.selfId, " track added ", ctx.trackId);
          },
          onTrackRemoved: (ctx) => {
            this.remoteTracks.delete(ctx.trackId);
          },
          onPeerJoined: (peer) => {
            this.peers.push(peer);
            this.updateParticipantsList();
            addVideoElement(peer.id, peer.metadata.displayName, false);
          },
          onPeerLeft: (peer) => {
            this.peers = this.peers.filter((p) => p.id !== peer.id);
            removeVideoElement(peer.id);
            this.updateParticipantsList();
          },
          onPeerUpdated: (ctx) => {
            this.peerMetadata = ctx.metadata;
          },
          onTrackUpdated: (ctx) => {
            this.trackMetadata = ctx.metadata;
          },
          onTrackEncodingChanged: (peerId, trackId, encoding) => {
            console.log(this.selfId, "received info that ", peerId, "changed encoding to ", encoding);
            this.peerEncoding = encoding;
          }
        }
      });
      this.webrtcChannel.on("mediaEvent", (event) => this.webrtc.receiveMediaEvent(event.data));
    }
  };
  var room_default = Room;

  // js/stats.js
  var checkInterval = 200;
  function detectBrowser() {
    if (typeof InstallTrigger !== void 0)
      return "firefox";
    if (window.chrome !== void 0)
      return "chrome";
    throw new Error("Unknown browser type");
  }
  function sleep(interval) {
    return __async(this, null, function* () {
      return new Promise((resolve, _reject) => {
        setTimeout(resolve, interval);
      });
    });
  }
  function extractStatEntry(stats, prefix) {
    for (let [key, value] of stats) {
      if (key.startsWith(prefix)) {
        return value;
      }
    }
    return void 0;
  }
  function isVideoPlayingChrome(peerConnection, videoTrack2) {
    return __async(this, null, function* () {
      const videoFramedDecoded2 = (track) => __async(this, null, function* () {
        if (!track)
          return -1;
        const videoStats = yield peerConnection.getStats(track);
        const inboundVideoStats = extractStatEntry(videoStats, "RTCInboundRTPVideoStream");
        return inboundVideoStats ? inboundVideoStats.framesDecoded : -1;
      });
      const videoFramesStart = yield videoFramedDecoded2(videoTrack2);
      yield sleep(checkInterval);
      const videoFramesEnd = yield videoFramedDecoded2(videoTrack2);
      return videoFramesStart >= 0 && videoFramesEnd >= 0 ? videoFramesEnd > videoFramesStart : false;
    });
  }
  function isAudioPlayingChrome(peerConnection, audioTrack) {
    return __async(this, null, function* () {
      const audioTotalEnergy = (track) => __async(this, null, function* () {
        if (!track)
          return -1;
        const audioStats = yield peerConnection.getStats(track);
        const inboundAudioStats = extractStatEntry(audioStats, "RTCInboundRTPAudioStream");
        return inboundAudioStats ? inboundAudioStats.totalAudioEnergy : -1;
      });
      const audioTotalEnergyStart = yield videoFramedDecoded(videoTrack);
      yield sleep(checkInterval);
      const audioTotalEnergyEnd = yield audioTotalEnergy(audioTrack);
      return audioTotalEnergyStart >= 0 && audioTotalEnergyEnd >= 0 ? audioTotalEnergyEnd > audioTotalEnergyStart : false;
    });
  }
  function isVideoPlayingFirefox(peerConnection, videoTrack2) {
    return __async(this, null, function* () {
      const packetsReceived = (stats) => {
        const [, value] = Array.from(stats).find(([_key, value2]) => value2.mediaType === "video");
        return value.packetsReceived;
      };
      const packetsStart = packetsReceived(yield peerConnection.getStats(videoTrack2));
      yield sleep(checkInterval);
      const packetsEnd = packetsReceived(yield peerConnection.getStats(videoTrack2));
      return packetsStart > 0 && packetsEnd > 0 && packetsEnd > packetsStart;
    });
  }
  function isAudioPlayingFirefox(peerConnection, audioTrack) {
    return __async(this, null, function* () {
      const packetsReceived = (stats) => {
        const [, value] = Array.from(stats).find(([_key, value2]) => value2.mediaType === "audio");
        return value.packetsReceived;
      };
      const packetsStart = packetsReceived(yield peerConnection.getStats(audioTrack));
      yield sleep(checkInterval);
      const packetsEnd = packetsReceived(yield peerConnection.getStats(audioTrack));
      return packetsStart > 0 && packetsEnd > 0 && packetsEnd > packetsStart;
    });
  }
  function inboundSimulcastStreamStats(peerConnection) {
    return __async(this, null, function* () {
      const stats = yield peerConnection.getStats();
      let data2 = { height: null, width: null, framesPerSecond: 0 };
      for (let [_key, report] of stats) {
        if (report.type == "inbound-rtp") {
          data2 = getDataFromReport(report);
          data2.framesReceived = report.framesReceived;
        }
      }
      return data2;
    });
  }
  function outboundSimulcastStreamStats(peerConnection) {
    return __async(this, null, function* () {
      const stats = yield peerConnection.getStats();
      let streams = { "l": null, "m": null, "h": null };
      for (let [_key, report] of stats) {
        if (report.type == "outbound-rtp") {
          let rid = report.rid;
          streams[rid] = getDataFromReport(report);
          streams[rid].framesSent = report.framesSent;
          streams[rid].qualityLimitationDuration = report["qualityLimitationDurations"];
          streams[rid].qualityLimitationReason = report["qualityLimitationReason"];
        }
      }
      return streams;
    });
  }
  function getDataFromReport(values) {
    let data2 = { height: null, width: null, framesPerSecond: 0 };
    data2.height = values.frameHeight;
    data2.width = values.frameWidth;
    data2.framesPerSecond = values.framesPerSecond != null ? values.framesPerSecond : 0;
    return data2;
  }
  function remoteStreamsStats(peerConnection) {
    return __async(this, null, function* () {
      const streams = peerConnection.getRemoteStreams();
      const firefoxTrackActive = peerConnection.getReceivers().map(({ track }) => track).filter((track) => !track.muted).map(({ id }) => id);
      const stats = streams.map((stream) => __async(this, null, function* () {
        const [audioTrack = void 0] = stream.getAudioTracks();
        const [videoTrack2 = void 0] = stream.getVideoTracks();
        let data2 = { streamId: stream.id, isAudioPlaying: false, isVideoPlaying: false };
        switch (detectBrowser()) {
          case "chrome": {
            data2.isAudioPlaying = yield isAudioPlayingChrome(peerConnection, audioTrack);
            data2.isVideoPlaying = yield isVideoPlayingChrome(peerConnection, audioTrack);
            break;
          }
          case "firefox": {
            const isStreamActive = audioTrack && firefoxTrackActive.includes(audioTrack.id) || videoTrack2 && firefoxTrackActive.includes(videoTrack2.id);
            if (!isStreamActive) {
              data2.active = false;
            }
            data2.isAudioPlaying = audioTrack !== void 0 && (yield isAudioPlayingFirefox(peerConnection, audioTrack));
            data2.isVideoPlaying = videoTrack2 !== void 0 && (yield isVideoPlayingFirefox(peerConnection, videoTrack2));
          }
        }
        return data2;
      }));
      return (yield Promise.all(stats)).filter((data2) => data2.active === void 0);
    });
  }

  // js/app.js
  console.log("LOGGING WORKS?");
  var videos2 = document.querySelector("#videos");
  var localVideo = document.querySelector("video#local-video");
  var data = document.querySelector("div#data");
  var getButtonsWithPrefix = (types, prefix) => {
    return types.map((type) => document.querySelector(`button#${prefix}-${type}`));
  };
  var startButtons = getButtonsWithPrefix(["simulcast", "all", "mic-only", "camera-only", "none"], "start");
  var simulcastButtons = getButtonsWithPrefix([
    "local-low-encoding",
    "local-medium-encoding",
    "local-high-encoding",
    "peer-low-encoding",
    "peer-medium-encoding",
    "peer-high-encoding",
    "inbound-stats",
    "outbound-stats"
  ], "simulcast");
  var metadataButtons = getButtonsWithPrefix(["update-peer", "update-track", "peer", "track"], "metadata");
  var [
    startSimulcastButton,
    startAllButton,
    startMicOnlyButton,
    startCameraOnlyButton,
    startNoneButton
  ] = startButtons;
  var [
    localLowEncodingButton,
    localMediumEncodingButton,
    localHighEncodingButton,
    peerLowEncodingButton,
    peerMediumEncodingButton,
    peerHighEncodingButton,
    inboundSimulcastStatsButton,
    outboundSimulcastStatsButton
  ] = simulcastButtons;
  var [
    updatePeerMetadataButton,
    updateTrackMetadataButton,
    peerMetadataButton,
    trackMetadataButton
  ] = metadataButtons;
  var stopButton = document.querySelector("button#stop");
  var statsButton = document.querySelector("button#stats");
  startButtons.forEach((button) => button.disabled = false);
  metadataButtons.forEach((button) => button.disabled = false);
  simulcastButtons.forEach((button) => button.disabled = true);
  stopButton.disabled = true;
  statsButton.disabled = false;
  var room;
  var simulcastPreferences = {
    width: { max: 1280, ideal: 1280, min: 1280 },
    height: { max: 720, ideal: 720, min: 720 },
    frameRate: { max: 30, ideal: 24 }
  };
  function start(media, simulcast = false) {
    return __async(this, null, function* () {
      console.log("START CLICKED", media);
      if (room)
        return;
      const useVideo = ["all", "camera"].includes(media);
      if (simulcast) {
        simulcastButtons.map((elem) => elem.disabled = false);
      }
      const preferences = {
        audio: ["all", "mic"].includes(media),
        video: useVideo && simulcast ? simulcastPreferences : useVideo
      };
      console.log("PREFERENCES: ", preferences);
      let localStream = void 0;
      if (preferences.audio || preferences.video) {
        console.log("GETTING USER MEDIA");
        localStream = yield navigator.mediaDevices.getUserMedia(preferences);
        console.log("GOT USER MEDIA");
        window.stream = localStream;
      }
      localVideo.srcObject = localStream;
      startButtons.forEach((button) => button.disabled = true);
      stopButton.disabled = false;
      console.log("CREATING ROOM");
      room = new room_default(localStream, simulcast);
      yield room.init();
      console.log("JOINING");
      yield room.join();
      console.log("JOINED");
    });
  }
  function stop() {
    return __async(this, null, function* () {
      if (!room)
        return;
      room.leave();
      while (videos2.children.length > 1) {
        videos2.removeChild(videos2.lastChild);
      }
      room = void 0;
      startButtons.forEach((button) => button.disabled = false);
      stopButton.disabled = true;
    });
  }
  function putStats(stats) {
    data.innerHTML = JSON.stringify(stats);
    data.dataset.version = parseInt(data.dataset.version) + 1;
  }
  function refreshStats(statsFunction) {
    return __async(this, null, function* () {
      if (!room || !room.webrtc || !room.webrtc.connection) {
        data.innerHTML = `Room error. One of objects doesn't exists: Room ${!room}, WebRTC ${!room.webrtc}, PeerConnection ${!room.webrtc.connection}`;
        return;
      }
      const stats = yield statsFunction(room.webrtc.connection);
      putStats(stats);
    });
  }
  var toggleSimulcastEncoding = function(button, encoding) {
    const isEnabled = button.textContent.startsWith("Disable");
    let text = button.textContent;
    if (isEnabled) {
      room.disableSimulcastEncoding(encoding);
      text = text.replace("Disable", "Enable");
    } else {
      room.enableSimulcastEncoding(encoding);
      text = text.replace("Enable", "Disable");
    }
    button.textContent = text;
  };
  startSimulcastButton.onclick = () => start("all", true);
  startAllButton.onclick = () => start("all");
  startAllButton.onclick = () => start("all");
  startMicOnlyButton.onclick = () => start("mic");
  startCameraOnlyButton.onclick = () => start("camera");
  startNoneButton.onclick = () => start("none");
  stopButton.onclick = stop;
  statsButton.onclick = () => {
    refreshStats(remoteStreamsStats);
  };
  updatePeerMetadataButton.onclick = () => {
    room.updateMetadata();
  };
  updateTrackMetadataButton.onclick = () => {
    room.updateTrackMetadata();
  };
  peerMetadataButton.onclick = () => {
    putStats(room.peerMetadata);
  };
  trackMetadataButton.onclick = () => {
    putStats(room.trackMetadata);
  };
  localLowEncodingButton.onclick = () => {
    toggleSimulcastEncoding(localLowEncodingButton, "l");
  };
  localMediumEncodingButton.onclick = () => {
    toggleSimulcastEncoding(localMediumEncodingButton, "m");
  };
  localHighEncodingButton.onclick = () => {
    toggleSimulcastEncoding(localHighEncodingButton, "h");
  };
  peerLowEncodingButton.onclick = () => {
    room.selectPeerSimulcastEncoding("l");
  };
  peerMediumEncodingButton.onclick = () => {
    room.selectPeerSimulcastEncoding("m");
  };
  peerHighEncodingButton.onclick = () => {
    room.selectPeerSimulcastEncoding("h");
  };
  inboundSimulcastStatsButton.onclick = () => {
    refreshStats((connection) => __async(void 0, null, function* () {
      let stats = yield inboundSimulcastStreamStats(connection);
      stats.encoding = room.getPeerEncoding();
      return stats;
    }));
  };
  outboundSimulcastStatsButton.onclick = () => {
    refreshStats(outboundSimulcastStreamStats);
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AamVsbHlmaXNoLWRldi9tZW1icmFuZS13ZWJydGMtanMvZGlzdC9tZWRpYUV2ZW50LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjEuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcGFyc2UuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjM1LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL21kNS5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92My5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zaGExLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y1LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25pbC5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92ZXJzaW9uLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL2luZGV4LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0BqZWxseWZpc2gtZGV2L21lbWJyYW5lLXdlYnJ0Yy1qcy9kaXN0L2NvbnN0LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQGplbGx5ZmlzaC1kZXYvbWVtYnJhbmUtd2VicnRjLWpzL2Rpc3QvbWVtYnJhbmVXZWJSVEMuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AamVsbHlmaXNoLWRldi9tZW1icmFuZS13ZWJydGMtanMvZGlzdC9pbmRleC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvcm9vbS5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvdXRpbHMuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2NvbnN0YW50cy5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvcHVzaC5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvdGltZXIuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2NoYW5uZWwuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2FqYXguanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2xvbmdwb2xsLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wcmVzZW5jZS5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvc2VyaWFsaXplci5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvc29ja2V0LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9qcy9zdGF0cy5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvYXBwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVDdXN0b21FdmVudCA9IGV4cG9ydHMuZ2VuZXJhdGVNZWRpYUV2ZW50ID0gZXhwb3J0cy5kZXNlcmlhbGl6ZU1lZGlhRXZlbnQgPSBleHBvcnRzLnNlcmlhbGl6ZU1lZGlhRXZlbnQgPSB2b2lkIDA7XG5mdW5jdGlvbiBzZXJpYWxpemVNZWRpYUV2ZW50KG1lZGlhRXZlbnQpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVkaWFFdmVudCk7XG59XG5leHBvcnRzLnNlcmlhbGl6ZU1lZGlhRXZlbnQgPSBzZXJpYWxpemVNZWRpYUV2ZW50O1xuZnVuY3Rpb24gZGVzZXJpYWxpemVNZWRpYUV2ZW50KHNlcmlhbGl6ZWRNZWRpYUV2ZW50KSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc2VyaWFsaXplZE1lZGlhRXZlbnQpO1xufVxuZXhwb3J0cy5kZXNlcmlhbGl6ZU1lZGlhRXZlbnQgPSBkZXNlcmlhbGl6ZU1lZGlhRXZlbnQ7XG5mdW5jdGlvbiBnZW5lcmF0ZU1lZGlhRXZlbnQodHlwZSwgZGF0YSkge1xuICAgIHZhciBldmVudCA9IHsgdHlwZSB9O1xuICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGV2ZW50ID0geyAuLi5ldmVudCwgZGF0YSB9O1xuICAgIH1cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5leHBvcnRzLmdlbmVyYXRlTWVkaWFFdmVudCA9IGdlbmVyYXRlTWVkaWFFdmVudDtcbmZ1bmN0aW9uIGdlbmVyYXRlQ3VzdG9tRXZlbnQoZGF0YSkge1xuICAgIHJldHVybiBnZW5lcmF0ZU1lZGlhRXZlbnQoXCJjdXN0b21cIiwgZGF0YSk7XG59XG5leHBvcnRzLmdlbmVyYXRlQ3VzdG9tRXZlbnQgPSBnZW5lcmF0ZUN1c3RvbUV2ZW50O1xuIiwgIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCAiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsICJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCAiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwgImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7IC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG5cbnZhciBfY2xvY2tzZXE7IC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuXG5cbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDsgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcblxuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbc2VlZEJ5dGVzWzBdIHwgMHgwMSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuICAgIH1cblxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfSAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cblxuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpOyAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG5cbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxOyAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG5cbiAgdmFyIGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIHZhciB0bWggPSBtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDAgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7IC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG5cbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmOyAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcblxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7IC8vIGBjbG9ja19zZXFfbG93YFxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjsgLy8gYG5vZGVgXG5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHN0cmluZ2lmeShiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjE7IiwgImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHZhciB2O1xuICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBQYXJzZSAjIyMjIyMjIy0uLi4uLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbMF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMCwgOCksIDE2KSkgPj4+IDI0O1xuICBhcnJbMV0gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsyXSA9IHYgPj4+IDggJiAweGZmO1xuICBhcnJbM10gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tIyMjIy0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzRdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDksIDEzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzVdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tIyMjIy0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls2XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxNCwgMTgpLCAxNikpID4+PiA4O1xuICBhcnJbN10gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLSMjIyMtLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzhdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE5LCAyMyksIDE2KSkgPj4+IDg7XG4gIGFycls5XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tLi4uLi0jIyMjIyMjIyMjIyNcbiAgLy8gKFVzZSBcIi9cIiB0byBhdm9pZCAzMi1iaXQgdHJ1bmNhdGlvbiB3aGVuIGJpdC1zaGlmdGluZyBoaWdoLW9yZGVyIGJ5dGVzKVxuXG4gIGFyclsxMF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMjQsIDM2KSwgMTYpKSAvIDB4MTAwMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTFdID0gdiAvIDB4MTAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzEyXSA9IHYgPj4+IDI0ICYgMHhmZjtcbiAgYXJyWzEzXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzE0XSA9IHYgPj4+IDggJiAweGZmO1xuICBhcnJbMTVdID0gdiAmIDB4ZmY7XG4gIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlOyIsICJpbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLmpzJztcblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIHZhciBieXRlcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZXM7XG59XG5cbmV4cG9ydCB2YXIgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgdmFyIFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24sIGhhc2hmdW5jKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlVVVJRCh2YWx1ZSwgbmFtZXNwYWNlLCBidWYsIG9mZnNldCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHN0cmluZ1RvQnl0ZXModmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gcGFyc2UobmFtZXNwYWNlKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZ2lmeShieXRlcyk7XG4gIH0gLy8gRnVuY3Rpb24jbmFtZSBpcyBub3Qgc2V0dGFibGUgb24gc29tZSBwbGF0Zm9ybXMgKCMyNzApXG5cblxuICB0cnkge1xuICAgIGdlbmVyYXRlVVVJRC5uYW1lID0gbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gIH0gY2F0Y2ggKGVycikge30gLy8gRm9yIENvbW1vbkpTIGRlZmF1bHQgZXhwb3J0IHN1cHBvcnRcblxuXG4gIGdlbmVyYXRlVVVJRC5ETlMgPSBETlM7XG4gIGdlbmVyYXRlVVVJRC5VUkwgPSBVUkw7XG4gIHJldHVybiBnZW5lcmF0ZVVVSUQ7XG59IiwgIi8qXG4gKiBCcm93c2VyLWNvbXBhdGlibGUgSmF2YVNjcmlwdCBNRDVcbiAqXG4gKiBNb2RpZmljYXRpb24gb2YgSmF2YVNjcmlwdCBNRDVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cbmZ1bmN0aW9uIG1kNShieXRlcykge1xuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWQ1VG9IZXhFbmNvZGVkQXJyYXkod29yZHNUb01kNShieXRlc1RvV29yZHMoYnl0ZXMpLCBieXRlcy5sZW5ndGggKiA4KSk7XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVUb0hleEVuY29kZWRBcnJheShpbnB1dCkge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBsZW5ndGgzMiA9IGlucHV0Lmxlbmd0aCAqIDMyO1xuICB2YXIgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIHZhciB4ID0gaW5wdXRbaSA+PiA1XSA+Pj4gaSAlIDMyICYgMHhmZjtcbiAgICB2YXIgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldE91dHB1dExlbmd0aChpbnB1dExlbmd0aDgpIHtcbiAgcmV0dXJuIChpbnB1dExlbmd0aDggKyA2NCA+Pj4gOSA8PCA0KSArIDE0ICsgMTtcbn1cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICovXG5cblxuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICB2YXIgYSA9IDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAyNzE3MzM4Nzg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgYSA9IHNhZmVBZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVBZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVBZGQoZCwgb2xkZCk7XG4gIH1cblxuICByZXR1cm4gW2EsIGIsIGMsIGRdO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgYnl0ZXMgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cblxuXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBsZW5ndGg4ID0gaW5wdXQubGVuZ3RoICogODtcbiAgdmFyIG91dHB1dCA9IG5ldyBVaW50MzJBcnJheShnZXRPdXRwdXRMZW5ndGgobGVuZ3RoOCkpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XG4gICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0W2kgLyA4XSAmIDB4ZmYpIDw8IGkgJSAzMjtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuXG5cbmZ1bmN0aW9uIHNhZmVBZGQoeCwgeSkge1xuICB2YXIgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiBtc3cgPDwgMTYgfCBsc3cgJiAweGZmZmY7XG59XG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5cblxuZnVuY3Rpb24gYml0Um90YXRlTGVmdChudW0sIGNudCkge1xuICByZXR1cm4gbnVtIDw8IGNudCB8IG51bSA+Pj4gMzIgLSBjbnQ7XG59XG4vKlxuICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gIHJldHVybiBzYWZlQWRkKGJpdFJvdGF0ZUxlZnQoc2FmZUFkZChzYWZlQWRkKGEsIHEpLCBzYWZlQWRkKHgsIHQpKSwgcyksIGIpO1xufVxuXG5mdW5jdGlvbiBtZDVmZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiAmIGMgfCB+YiAmIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVnZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiAmIGQgfCBjICYgfmQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGMgXiAoYiB8IH5kKSwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1kNTsiLCAiaW1wb3J0IHYzNSBmcm9tICcuL3YzNS5qcyc7XG5pbXBvcnQgbWQ1IGZyb20gJy4vbWQ1LmpzJztcbnZhciB2MyA9IHYzNSgndjMnLCAweDMwLCBtZDUpO1xuZXhwb3J0IGRlZmF1bHQgdjM7IiwgImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsICIvLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IE47ICsrX2kpIHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQzMkFycmF5KDE2KTtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgYXJyW2pdID0gYnl0ZXNbX2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMl0gPDwgOCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1bX2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBOOyArK19pMikge1xuICAgIHZhciBXID0gbmV3IFVpbnQzMkFycmF5KDgwKTtcblxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfdCA9IDE2OyBfdCA8IDgwOyArK190KSB7XG4gICAgICBXW190XSA9IFJPVEwoV1tfdCAtIDNdIF4gV1tfdCAtIDhdIF4gV1tfdCAtIDE0XSBeIFdbX3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIHZhciBhID0gSFswXTtcbiAgICB2YXIgYiA9IEhbMV07XG4gICAgdmFyIGMgPSBIWzJdO1xuICAgIHZhciBkID0gSFszXTtcbiAgICB2YXIgZSA9IEhbNF07XG5cbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hhMTsiLCAiaW1wb3J0IHYzNSBmcm9tICcuL3YzNS5qcyc7XG5pbXBvcnQgc2hhMSBmcm9tICcuL3NoYTEuanMnO1xudmFyIHY1ID0gdjM1KCd2NScsIDB4NTAsIHNoYTEpO1xuZXhwb3J0IGRlZmF1bHQgdjU7IiwgImV4cG9ydCBkZWZhdWx0ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnOyIsICJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5cbmZ1bmN0aW9uIHZlcnNpb24odXVpZCkge1xuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnN1YnN0cigxNCwgMSksIDE2KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmVyc2lvbjsiLCAiZXhwb3J0IHsgZGVmYXVsdCBhcyB2MSB9IGZyb20gJy4vdjEuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2MyB9IGZyb20gJy4vdjMuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2NCB9IGZyb20gJy4vdjQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2NSB9IGZyb20gJy4vdjUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOSUwgfSBmcm9tICcuL25pbC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2YWxpZGF0ZSB9IGZyb20gJy4vdmFsaWRhdGUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlIH0gZnJvbSAnLi9wYXJzZS5qcyc7IiwgIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHRTaW11bGNhc3RCaXRyYXRlcyA9IGV4cG9ydHMuZGVmYXVsdEJpdHJhdGVzID0gZXhwb3J0cy5zaW11bGNhc3RUcmFuc2NlaXZlckNvbmZpZyA9IHZvaWQgMDtcbi8vIGNvbnN0IFRFTVBPUkFMX0xBWUVSU19DT1VOVCA9IDI7XG5leHBvcnRzLnNpbXVsY2FzdFRyYW5zY2VpdmVyQ29uZmlnID0ge1xuICAgIGRpcmVjdGlvbjogXCJzZW5kb25seVwiLFxuICAgIC8vIGtlZXAgdGhpcyBhcnJheSBmcm9tIGxvdyByZXNvbHV0aW9uIHRvIGhpZ2ggcmVzb2x1dGlvblxuICAgIC8vIGluIG90aGVyIGNhc2UgbG93ZXIgcmVzb2x1dGlvbiBlbmNvZGluZyBjYW4gZ2V0XG4gICAgLy8gaGlnaGVyIG1heF9iaXRyYXRlXG4gICAgc2VuZEVuY29kaW5nczogW1xuICAgICAgICB7XG4gICAgICAgICAgICByaWQ6IFwibFwiLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIG1heEJpdHJhdGU6IDRfMDAwXzAwMCxcbiAgICAgICAgICAgIHNjYWxlUmVzb2x1dGlvbkRvd25CeTogNC4wLFxuICAgICAgICAgICAgLy8gICBzY2FsYWJpbGl0eU1vZGU6IFwiTDFUXCIgKyBURU1QT1JBTF9MQVlFUlNfQ09VTlQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJpZDogXCJtXCIsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2NhbGVSZXNvbHV0aW9uRG93bkJ5OiAyLjAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJpZDogXCJoXCIsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gbWF4Qml0cmF0ZTogNF8wMDBfMDAwLFxuICAgICAgICAgICAgLy8gc2NhbGFiaWxpdHlNb2RlOiBcIkwxVFwiICsgVEVNUE9SQUxfTEFZRVJTX0NPVU5ULFxuICAgICAgICB9LFxuICAgIF0sXG59O1xuZXhwb3J0cy5kZWZhdWx0Qml0cmF0ZXMgPSB7IGF1ZGlvOiA1MDAwMCwgdmlkZW86IDI1MDAwMDAgfTtcbmV4cG9ydHMuZGVmYXVsdFNpbXVsY2FzdEJpdHJhdGVzID0ge1xuICAgIGg6IDI1MDAwMDAsXG4gICAgbTogNTAwMDAwLFxuICAgIGw6IDE1MDAwMCxcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lbWJyYW5lV2ViUlRDID0gdm9pZCAwO1xuY29uc3QgbWVkaWFFdmVudF8xID0gcmVxdWlyZShcIi4vbWVkaWFFdmVudFwiKTtcbmNvbnN0IHV1aWRfMSA9IHJlcXVpcmUoXCJ1dWlkXCIpO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0XCIpO1xuY29uc3QgdmFkU3RhdHVzZXMgPSBbXCJzcGVlY2hcIiwgXCJzaWxlbmNlXCJdO1xuY2xhc3MgVHJhY2tDb250ZXh0SW1wbCBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGVlciwgdHJhY2tJZCwgbWV0YWRhdGEpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RyZWFtID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXhCYW5kd2lkdGggPSAwO1xuICAgICAgICB0aGlzLnZhZFN0YXR1cyA9IFwic2lsZW5jZVwiO1xuICAgICAgICB0aGlzLm5lZ290aWF0aW9uU3RhdHVzID0gXCJhd2FpdGluZ1wiO1xuICAgICAgICAvLyBJbmRpY2F0ZXMgdGhhdCBtZXRhZGF0YSB3ZXJlIGNoYW5nZWQgd2hlbiBpbiBcIm9mZmVyZWRcIiBuZWdvdGlhdGlvblN0YXR1c1xuICAgICAgICAvLyBhbmQgYHVwZGF0ZVRyYWNrTWV0YWRhdGFgIE1lZGlhIEV2ZW50IHNob3VsZCBiZSBzZW50IGFmdGVyIHRoZSB0cmFuc2l0aW9uIHRvIFwiZG9uZVwiXG4gICAgICAgIHRoaXMucGVuZGluZ01ldGFkYXRhVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGVlciA9IHBlZXI7XG4gICAgICAgIHRoaXMudHJhY2tJZCA9IHRyYWNrSWQ7XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICB9XG59XG4vKipcbiAqIE1haW4gY2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgY29ubmVjdGluZyB0byB0aGUgUlRDIEVuZ2luZSwgc2VuZGluZyBhbmQgcmVjZWl2aW5nIG1lZGlhLlxuICovXG5jbGFzcyBNZW1icmFuZVdlYlJUQyBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubG9jYWxUcmFja3NXaXRoU3RyZWFtcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYWNrSWRUb1RyYWNrID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmlkVG9QZWVyID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmxvY2FsUGVlciA9IHtcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgbWV0YWRhdGE6IHt9LFxuICAgICAgICAgICAgdHJhY2tJZFRvTWV0YWRhdGE6IG5ldyBNYXAoKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1pZFRvVHJhY2tJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFRyYWNrRW5jb2RpbmdzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJ0Y0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGljZVNlcnZlcnM6IFtdLFxuICAgICAgICAgICAgaWNlVHJhbnNwb3J0UG9saWN5OiBcInJlbGF5XCIsXG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmllcyB0byBqb2luIHRvIHRoZSBSVEMgRW5naW5lLiBJZiB1c2VyIGlzIGFjY2VwdGVkIHRoZW4ge0BsaW5rIENhbGxiYWNrcy5vbkpvaW5TdWNjZXNzfVxuICAgICAgICAgKiB3aWxsIGJlIGNhbGxlZC4gSW4gb3RoZXIgY2FzZSB7QGxpbmsgQ2FsbGJhY2tzLm9uSm9pbkVycm9yfSBpcyBpbnZva2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gcGVlck1ldGFkYXRhIC0gQW55IGluZm9ybWF0aW9uIHRoYXQgb3RoZXIgcGVlcnMgd2lsbCByZWNlaXZlIGluIHtAbGluayBDYWxsYmFja3Mub25QZWVySm9pbmVkfVxuICAgICAgICAgKiBhZnRlciBhY2NlcHRpbmcgdGhpcyBwZWVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGBgYHRzXG4gICAgICAgICAqIGxldCB3ZWJydGMgPSBuZXcgTWVtYnJhbmVXZWJSVEMoLi4uKVxuICAgICAgICAgKiB3ZWJydGMuam9pbih7ZGlzcGxheU5hbWU6IFwiQm9iXCJ9KVxuICAgICAgICAgKiBgYGBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuam9pbiA9IChwZWVyTWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxQZWVyLm1ldGFkYXRhID0gcGVlck1ldGFkYXRhO1xuICAgICAgICAgICAgICAgIGxldCBtZWRpYUV2ZW50ID0gKDAsIG1lZGlhRXZlbnRfMS5nZW5lcmF0ZU1lZGlhRXZlbnQpKFwiam9pblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBwZWVyTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5jYWxsYmFja3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vbkNvbm5lY3Rpb25FcnJvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm9uQ29ubmVjdGlvbkVycm9yXCIsIGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubGVhdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZlZWRzIG1lZGlhIGV2ZW50IHJlY2VpdmVkIGZyb20gUlRDIEVuZ2luZSB0byB7QGxpbmsgTWVtYnJhbmVXZWJSVEN9LlxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgc29tZSBtZWRpYSBldmVudCBmcm9tIFJUQyBFbmdpbmVcbiAgICAgICAgICogd2FzIHJlY2VpdmVkIGFuZCBjYW4gcmVzdWx0IGluIHtAbGluayBNZW1icmFuZVdlYlJUQ30gZ2VuZXJhdGluZyBzb21lIG90aGVyXG4gICAgICAgICAqIG1lZGlhIGV2ZW50cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG1lZGlhRXZlbnQgLSBTdHJpbmcgZGF0YSByZWNlaXZlZCBvdmVyIGN1c3RvbSBzaWduYWxsaW5nIGxheWVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBUaGlzIGV4YW1wbGUgYXNzdW1lcyBwaGVvbml4IGNoYW5uZWxzIGFzIHNpZ25hbGxpbmcgbGF5ZXIuXG4gICAgICAgICAqIEFzIHBob2VuaXggY2hhbm5lbHMgcmVxdWlyZSBvYmplY3RzLCBSVEMgRW5naW5lIGVuY2Fwc3VsYXRlcyBiaW5hcnkgZGF0YSBpbnRvXG4gICAgICAgICAqIG1hcCB3aXRoIG9uZSBmaWVsZCB0aGF0IGlzIGNvbnZlcnRlZCB0byBvYmplY3Qgd2l0aCBvbmUgZmllbGQgb24gdGhlIFRTIHNpZGUuXG4gICAgICAgICAqIGBgYHRzXG4gICAgICAgICAqIHdlYnJ0Y0NoYW5uZWwub24oXCJtZWRpYUV2ZW50XCIsIChldmVudCkgPT4gd2VicnRjLnJlY2VpdmVNZWRpYUV2ZW50KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgICogYGBgXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY2VpdmVNZWRpYUV2ZW50ID0gKG1lZGlhRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgIGNvbnN0IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQgPSAoMCwgbWVkaWFFdmVudF8xLmRlc2VyaWFsaXplTWVkaWFFdmVudCkobWVkaWFFdmVudCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGRlc2VyaWFsaXplZE1lZGlhRXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwZWVyQWNjZXB0ZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbFBlZXIuaWQgPSBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IChfYSA9IHRoaXMuY2FsbGJhY2tzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub25Kb2luU3VjY2VzcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5pZCwgZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJzSW5Sb29tKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25Kb2luU3VjY2Vzc1wiLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEuaWQsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVyc0luUm9vbSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVycyA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVyc0luUm9vbTtcbiAgICAgICAgICAgICAgICAgICAgcGVlcnMuZm9yRWFjaCgocGVlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcGVlcnMuZm9yRWFjaCgocGVlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbShwZWVyLnRyYWNrSWRUb01ldGFkYXRhLmVudHJpZXMoKSkuZm9yRWFjaCgoW3RyYWNrSWQsIG1ldGFkYXRhXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3R4ID0gbmV3IFRyYWNrQ29udGV4dEltcGwocGVlciwgdHJhY2tJZCwgbWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2tJZFRvVHJhY2suc2V0KHRyYWNrSWQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5jYWxsYmFja3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vblRyYWNrQWRkZWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm9uVHJhY2tBZGRlZFwiLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVlckRlbmllZFwiOlxuICAgICAgICAgICAgICAgICAgICAoX2QgPSAoX2MgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm9uSm9pbkVycm9yKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuY2FsbChfYywgZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25Kb2luRXJyb3JcIiwgZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxQZWVyLmlkICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1lZGlhRXZlbnQoZGVzZXJpYWxpemVkTWVkaWFFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlTWVkaWFFdmVudCA9IChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdCwgX3UsIF92O1xuICAgICAgICAgICAgbGV0IHBlZXI7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIHN3aXRjaCAoZGVzZXJpYWxpemVkTWVkaWFFdmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9mZmVyRGF0YVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0dXJuU2VydmVycyA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5pbnRlZ3JhdGVkVHVyblNlcnZlcnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHVybnModHVyblNlcnZlcnMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZmZlckRhdGEgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS50cmFja3NUeXBlcykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uT2ZmZXJEYXRhKG9mZmVyRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFja3NBZGRlZFwiOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQZWVySWQoKSA9PT0gZGF0YS5wZWVySWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGRhdGEudHJhY2tJZFRvTWV0YWRhdGEgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKGRhdGEudHJhY2tJZFRvTWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgcGVlciA9IHRoaXMuaWRUb1BlZXIuZ2V0KGRhdGEucGVlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkVHJhY2tJZFRvTWV0YWRhdGEgPSBwZWVyLnRyYWNrSWRUb01ldGFkYXRhO1xuICAgICAgICAgICAgICAgICAgICBwZWVyLnRyYWNrSWRUb01ldGFkYXRhID0gbmV3IE1hcChbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wZWVyLnRyYWNrSWRUb01ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YS50cmFja0lkVG9NZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWRUb1BlZXIuc2V0KHBlZXIuaWQsIHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHBlZXIudHJhY2tJZFRvTWV0YWRhdGEuZW50cmllcygpKS5mb3JFYWNoKChbdHJhY2tJZCwgbWV0YWRhdGFdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvbGRUcmFja0lkVG9NZXRhZGF0YS5oYXModHJhY2tJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHggPSBuZXcgVHJhY2tDb250ZXh0SW1wbChwZWVyLCB0cmFja0lkLCBtZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja0lkVG9UcmFjay5zZXQodHJhY2tJZCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9uVHJhY2tBZGRlZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25UcmFja0FkZGVkXCIsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidHJhY2tzUmVtb3ZlZFwiOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwZWVySWQgPSBkYXRhLnBlZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGVlcklkKCkgPT09IGRhdGEucGVlcklkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFja0lkcyA9IGRhdGEudHJhY2tJZHM7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrSWRzLmZvckVhY2goKHRyYWNrSWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSB0aGlzLnRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChfYiA9IChfYSA9IHRoaXMuY2FsbGJhY2tzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub25UcmFja1JlbW92ZWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0cmFja0NvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25UcmFja1JlbW92ZWRcIiwgdHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJhc2VUcmFjayh0cmFja0lkLCBwZWVySWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNkcEFuc3dlclwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZFRvVHJhY2tJZCA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXMoZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLm1pZFRvVHJhY2tJZCkpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB0cmFja0lkIG9mIE9iamVjdC52YWx1ZXMoZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLm1pZFRvVHJhY2tJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGlzIGxvY2FsIHRyYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjay5uZWdvdGlhdGlvblN0YXR1cyA9IFwiZG9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFjay5wZW5kaW5nTWV0YWRhdGFVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVkaWFFdmVudCA9ICgwLCBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVNZWRpYUV2ZW50KShcInVwZGF0ZVRyYWNrTWV0YWRhdGFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrTWV0YWRhdGE6IHRyYWNrLm1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2sucGVuZGluZ01ldGFkYXRhVXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkFuc3dlcihkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FuZGlkYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZW1vdGVDYW5kaWRhdGUoZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBlZXJKb2luZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgcGVlciA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVlci5pZCA9PT0gdGhpcy5nZXRQZWVySWQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9uUGVlckpvaW5lZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJvblBlZXJKb2luZWRcIiwgcGVlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwZWVyTGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICBwZWVyID0gdGhpcy5pZFRvUGVlci5nZXQoZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZWVyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20ocGVlci50cmFja0lkVG9NZXRhZGF0YS5rZXlzKCkpLmZvckVhY2goKHRyYWNrSWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9uVHJhY2tSZW1vdmVkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdGhpcy50cmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25UcmFja1JlbW92ZWRcIiwgdGhpcy50cmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcmFzZVBlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IChfYyA9IHRoaXMuY2FsbGJhY2tzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Mub25QZWVyTGVmdCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNhbGwoX2MsIHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJvblBlZXJMZWZ0XCIsIHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVlclVwZGF0ZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGVlcklkKCkgPT09IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVySWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHBlZXIgPSB0aGlzLmlkVG9QZWVyLmdldChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucGVlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgcGVlci5tZXRhZGF0YSA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5tZXRhZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICAoX2YgPSAoX2UgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLm9uUGVlclVwZGF0ZWQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWxsKF9lLCBwZWVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25QZWVyVXBkYXRlZFwiLCBwZWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBlZXJSZW1vdmVkXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBlZXJJZCgpICE9PSBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucGVlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVjZWl2ZWQgb25SZW1vdmVkIG1lZGlhIGV2ZW50LCBidXQgaXQgZG9lcyBub3QgcmVmZXIgdG8gdGhlIGxvY2FsIHBlZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKF9oID0gKF9nID0gdGhpcy5jYWxsYmFja3MpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5vblJlbW92ZWQpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5jYWxsKF9nLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25SZW1vdmVkXCIsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidHJhY2tVcGRhdGVkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGVlcklkKCkgPT09IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVySWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHBlZXIgPSB0aGlzLmlkVG9QZWVyLmdldChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucGVlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGBQZWVyIHdpdGggaWQ6ICR7ZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJJZH0gZG9lc24ndCBleGlzdGA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrSWQgPSBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEudHJhY2tJZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2tNZXRhZGF0YSA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5tZXRhZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgcGVlci50cmFja0lkVG9NZXRhZGF0YS5zZXQodHJhY2tJZCwgdHJhY2tNZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMudHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB0cmFja0NvbnRleHQubWV0YWRhdGEgPSB0cmFja01ldGFkYXRhO1xuICAgICAgICAgICAgICAgICAgICAoX2sgPSAoX2ogPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLm9uVHJhY2tVcGRhdGVkKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2suY2FsbChfaiwgdHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25UcmFja1VwZGF0ZWRcIiwgdHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFja3NQcmlvcml0eVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmFibGVkVHJhY2tzID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnRyYWNrcy5tYXAoKHRyYWNrSWQpID0+IHRoaXMudHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzYWJsZWRUcmFja3MgPSBBcnJheS5mcm9tKHRoaXMudHJhY2tJZFRvVHJhY2sudmFsdWVzKCkpLmZpbHRlcigodHJhY2spID0+ICFlbmFibGVkVHJhY2tzLmluY2x1ZGVzKHRyYWNrKSk7XG4gICAgICAgICAgICAgICAgICAgIChfbSA9IChfbCA9IHRoaXMuY2FsbGJhY2tzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wub25UcmFja3NQcmlvcml0eUNoYW5nZWQpID09PSBudWxsIHx8IF9tID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbS5jYWxsKF9sLCBlbmFibGVkVHJhY2tzLCBkaXNhYmxlZFRyYWNrcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm9uVHJhY2tzUHJpb3JpdHlDaGFuZ2VkXCIsIGVuYWJsZWRUcmFja3MsIGRpc2FibGVkVHJhY2tzKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW5jb2RpbmdTd2l0Y2hlZFwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFja0lkID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnRyYWNrSWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMudHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB0cmFja0NvbnRleHQuZW5jb2RpbmcgPSBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEuZW5jb2Rpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQ29udGV4dC5lbmNvZGluZ1JlYXNvbiA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5yZWFzb247XG4gICAgICAgICAgICAgICAgICAgIChfbyA9IHRyYWNrQ29udGV4dC5vbkVuY29kaW5nQ2hhbmdlZCkgPT09IG51bGwgfHwgX28gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vLmNhbGwodHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tDb250ZXh0LmVtaXQoXCJvbkVuY29kaW5nQ2hhbmdlZFwiLCB0cmFja0NvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxuICAgICAgICAgICAgICAgICAgICAoX3EgPSAoX3AgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wLm9uVHJhY2tFbmNvZGluZ0NoYW5nZWQpID09PSBudWxsIHx8IF9xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcS5jYWxsKF9wLCB0cmFja0NvbnRleHQucGVlci5pZCwgdHJhY2tJZCwgdHJhY2tDb250ZXh0LmVuY29kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25UcmFja0VuY29kaW5nQ2hhbmdlZFwiLCB0cmFja0NvbnRleHQucGVlci5pZCwgdHJhY2tJZCwgdHJhY2tDb250ZXh0LmVuY29kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImN1c3RvbVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1lZGlhRXZlbnQoZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIChfcyA9IChfciA9IHRoaXMuY2FsbGJhY2tzKSA9PT0gbnVsbCB8fCBfciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3Iub25Db25uZWN0aW9uRXJyb3IpID09PSBudWxsIHx8IF9zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcy5jYWxsKF9yLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm9uQ29ubmVjdGlvbkVycm9yXCIsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFkTm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2tJZCA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS50cmFja0lkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLnRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFkU3RhdHVzID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhZFN0YXR1c2VzLmluY2x1ZGVzKHZhZFN0YXR1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC52YWRTdGF0dXMgPSB2YWRTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAoX3QgPSBjdHgub25Wb2ljZUFjdGl2aXR5Q2hhbmdlZCkgPT09IG51bGwgfHwgX3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90LmNhbGwoY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5lbWl0KFwib25Wb2ljZUFjdGl2aXR5Q2hhbmdlZFwiLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiUmVjZWl2ZWQgdW5rbm93biB2YWQgc3RhdHVzOiBcIiwgdmFkU3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcImJhbmR3aWR0aEVzdGltYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlc3RpbWF0aW9uID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLmVzdGltYXRpb247XG4gICAgICAgICAgICAgICAgICAgIChfdiA9IChfdSA9IHRoaXMuY2FsbGJhY2tzKSA9PT0gbnVsbCB8fCBfdSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3Uub25CYW5kd2lkdGhFc3RpbWF0aW9uQ2hhbmdlZCkgPT09IG51bGwgfHwgX3YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF92LmNhbGwoX3UsIGVzdGltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJvbkJhbmR3aWR0aEVzdGltYXRpb25DaGFuZ2VkXCIsIGVzdGltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiUmVjZWl2ZWQgdW5rbm93biBtZWRpYSBldmVudDogXCIsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZFRyYWNrVG9Db25uZWN0aW9uID0gKHRyYWNrQ29udGV4dCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRyYW5zY2VpdmVyQ29uZmlnID0gdGhpcy5jcmVhdGVUcmFuc2NlaXZlckNvbmZpZyh0cmFja0NvbnRleHQpO1xuICAgICAgICAgICAgY29uc3QgdHJhY2sgPSB0cmFja0NvbnRleHQudHJhY2s7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uYWRkVHJhbnNjZWl2ZXIodHJhY2ssIHRyYW5zY2VpdmVyQ29uZmlnKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZXMgdGhlIG1ldGFkYXRhIGZvciB0aGUgY3VycmVudCBwZWVyLlxuICAgICAgICAgKiBAcGFyYW0gcGVlck1ldGFkYXRhIC0gRGF0YSBhYm91dCB0aGlzIHBlZXIgdGhhdCBvdGhlciBwZWVycyB3aWxsIHJlY2VpdmUgdXBvbiBqb2luaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB0aGUgbWV0YWRhdGEgaXMgZGlmZmVyZW50IGZyb20gd2hhdCBpcyBhbHJlYWR5IHRyYWNrZWQgaW4gdGhlIHJvb20sIHRoZSBvcHRpb25hbFxuICAgICAgICAgKiBjYWxsYmFjayBgb25QZWVyVXBkYXRlZGAgd2lsbCBiZSB0cmlnZ2VyZWQgZm9yIG90aGVyIHBlZXJzIGluIHRoZSByb29tLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51cGRhdGVQZWVyTWV0YWRhdGEgPSAocGVlck1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWVkaWFFdmVudCA9ICgwLCBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVNZWRpYUV2ZW50KShcInVwZGF0ZVBlZXJNZXRhZGF0YVwiLCB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHBlZXJNZXRhZGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZXMgdGhlIG1ldGFkYXRhIGZvciBhIHNwZWNpZmljIHRyYWNrLlxuICAgICAgICAgKiBAcGFyYW0gdHJhY2tJZCAtIHRyYWNrSWQgKGdlbmVyYXRlZCBpbiBhZGRUcmFjaykgb2YgYXVkaW8gb3IgdmlkZW8gdHJhY2suXG4gICAgICAgICAqIEBwYXJhbSB0cmFja01ldGFkYXRhIC0gRGF0YSBhYm91dCB0aGlzIHRyYWNrIHRoYXQgb3RoZXIgcGVlcnMgd2lsbCByZWNlaXZlIHVwb24gam9pbmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIG1ldGFkYXRhIGlzIGRpZmZlcmVudCBmcm9tIHdoYXQgaXMgYWxyZWFkeSB0cmFja2VkIGluIHRoZSByb29tLCB0aGUgb3B0aW9uYWxcbiAgICAgICAgICogY2FsbGJhY2sgYG9uVHJhY2tVcGRhdGVkYCB3aWxsIGJlIHRyaWdnZXJlZCBmb3Igb3RoZXIgcGVlcnMgaW4gdGhlIHJvb20uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVwZGF0ZVRyYWNrTWV0YWRhdGEgPSAodHJhY2tJZCwgdHJhY2tNZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhY2tDb250ZXh0ID0gdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKTtcbiAgICAgICAgICAgIHRyYWNrQ29udGV4dC5tZXRhZGF0YSA9IHRyYWNrTWV0YWRhdGE7XG4gICAgICAgICAgICB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suc2V0KHRyYWNrSWQsIHRyYWNrQ29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmxvY2FsUGVlci50cmFja0lkVG9NZXRhZGF0YS5zZXQodHJhY2tJZCwgdHJhY2tNZXRhZGF0YSk7XG4gICAgICAgICAgICBjb25zdCBtZWRpYUV2ZW50ID0gKDAsIG1lZGlhRXZlbnRfMS5nZW5lcmF0ZU1lZGlhRXZlbnQpKFwidXBkYXRlVHJhY2tNZXRhZGF0YVwiLCB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZCxcbiAgICAgICAgICAgICAgICB0cmFja01ldGFkYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRyYWNrQ29udGV4dC5uZWdvdGlhdGlvblN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkb25lXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZlcmVkXCI6XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQ29udGV4dC5wZW5kaW5nTWV0YWRhdGFVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYXdhaXRpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRNaWRUb1RyYWNrSWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFRyYWNrTWlkVG9UcmFja0lkID0ge307XG4gICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbilcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5nZXRUcmFuc2NlaXZlcnMoKS5mb3JFYWNoKCh0cmFuc2NlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFRyYWNrSWQgPSAoX2EgPSB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZDtcbiAgICAgICAgICAgICAgICBjb25zdCBtaWQgPSB0cmFuc2NlaXZlci5taWQ7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsVHJhY2tJZCAmJiBtaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2tDb250ZXh0ID0gQXJyYXkuZnJvbSh0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2sudmFsdWVzKCkpLmZpbmQoKHRyYWNrQ29udGV4dCkgPT4gdHJhY2tDb250ZXh0LnRyYWNrLmlkID09PSBsb2NhbFRyYWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFRyYWNrTWlkVG9UcmFja0lkW21pZF0gPSB0cmFja0NvbnRleHQudHJhY2tJZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFRyYWNrTWlkVG9UcmFja0lkO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogTGVhdmVzIHRoZSByb29tLiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB1c2VyIGxlYXZlcyB0aGUgcm9vbVxuICAgICAgICAgKiBpbiBhIGNsZWFuIHdheSBlLmcuIGJ5IGNsaWNraW5nIGEgZGVkaWNhdGVkLCBjdXN0b20gYnV0dG9uIGBkaXNjb25uZWN0YC5cbiAgICAgICAgICogQXMgYSByZXN1bHQgdGhlcmUgd2lsbCBiZSBnZW5lcmF0ZWQgb25lIG1vcmUgbWVkaWEgZXZlbnQgdGhhdCBzaG91bGQgYmVcbiAgICAgICAgICogc2VudCB0byB0aGUgUlRDIEVuZ2luZS4gVGhhbmtzIHRvIGl0IGVhY2ggb3RoZXIgcGVlciB3aWxsIGJlIG5vdGlmaWVkXG4gICAgICAgICAqIHRoYXQgcGVlciBsZWZ0IGluIHtAbGluayBDYWxsYmFja3Mub25QZWVyTGVmdH0sXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSAoMCwgbWVkaWFFdmVudF8xLmdlbmVyYXRlTWVkaWFFdmVudCkoXCJsZWF2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFuVXAoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFucyB1cCB7QGxpbmsgTWVtYnJhbmVXZWJSVEN9IGluc3RhbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbGVhblVwID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9udHJhY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvY2FsVHJhY2tzV2l0aFN0cmVhbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudCA9IChtZWRpYUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBzZXJpYWxpemVkTWVkaWFFdmVudCA9ICgwLCBtZWRpYUV2ZW50XzEuc2VyaWFsaXplTWVkaWFFdmVudCkobWVkaWFFdmVudCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9uU2VuZE1lZGlhRXZlbnQoc2VyaWFsaXplZE1lZGlhRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib25TZW5kTWVkaWFFdmVudFwiLCBzZXJpYWxpemVkTWVkaWFFdmVudCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25BbnN3ZXIgPSBhc3luYyAoYW5zd2VyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub250cmFjayA9IHRoaXMub25UcmFjaygpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkVHJhY2tFbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2RpbmdzLCB0cmFja0lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZykgPT4gdGhpcy5kaXNhYmxlVHJhY2tFbmNvZGluZyh0cmFja0lkLCBlbmNvZGluZykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkVHJhbnNjZWl2ZXJzSWZOZWVkZWQgPSAoc2VydmVyVHJhY2tzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCByZWN2VHJhbnNjZWl2ZXJzID0gdGhpcy5jb25uZWN0aW9uLmdldFRyYW5zY2VpdmVycygpLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5kaXJlY3Rpb24gPT09IFwicmVjdm9ubHlcIik7XG4gICAgICAgICAgICBsZXQgdG9BZGQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGdldE5lZWRlZFRyYW5zY2VpdmVyc1R5cGVzID0gKHR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZU51bWJlciA9IHNlcnZlclRyYWNrcy5nZXQodHlwZSk7XG4gICAgICAgICAgICAgICAgdHlwZU51bWJlciA9IHR5cGVOdW1iZXIgIT09IHVuZGVmaW5lZCA/IHR5cGVOdW1iZXIgOiAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVUcmFuc2NlaXZlcnNOdW1iZXIgPSByZWN2VHJhbnNjZWl2ZXJzLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5yZWNlaXZlci50cmFjay5raW5kID09PSB0eXBlKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KHR5cGVOdW1iZXIgLSB0eXBlVHJhbnNjZWl2ZXJzTnVtYmVyKS5maWxsKHR5cGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gZ2V0TmVlZGVkVHJhbnNjZWl2ZXJzVHlwZXMoXCJhdWRpb1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZ2V0TmVlZGVkVHJhbnNjZWl2ZXJzVHlwZXMoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIHRvQWRkID0gdG9BZGQuY29uY2F0KGF1ZGlvKTtcbiAgICAgICAgICAgIHRvQWRkID0gdG9BZGQuY29uY2F0KHZpZGVvKTtcbiAgICAgICAgICAgIGZvciAobGV0IGtpbmQgb2YgdG9BZGQpXG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkVHJhbnNjZWl2ZXIoa2luZCwgeyBkaXJlY3Rpb246IFwicmVjdm9ubHlcIiB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRUcmFja0lkVG9NZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrSWRUb01ldGFkYXRhID0ge307XG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMubG9jYWxQZWVyLnRyYWNrSWRUb01ldGFkYXRhLmVudHJpZXMoKSkuZm9yRWFjaCgoW3RyYWNrSWQsIG1ldGFkYXRhXSkgPT4ge1xuICAgICAgICAgICAgICAgIHRyYWNrSWRUb01ldGFkYXRhW3RyYWNrSWRdID0gbWV0YWRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cmFja0lkVG9NZXRhZGF0YTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRUcmFja0JpdHJhdGVzID0gKHRyYWNrSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCk7XG4gICAgICAgICAgICBpZiAoIXRyYWNrQ29udGV4dClcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlRyYWNrIHdpdGggaWQgJHt0cmFja0lkfSBub3QgcHJlc2VudCBpbiAnbG9jYWxUcmFja0lkVG9UcmFjaydcIjtcbiAgICAgICAgICAgIGNvbnN0IGtpbmQgPSB0cmFja0NvbnRleHQudHJhY2sua2luZDtcbiAgICAgICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZmluZFNlbmRlcih0cmFja0NvbnRleHQudHJhY2suaWQpO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RpbmdzID0gc2VuZGVyLmdldFBhcmFtZXRlcnMoKS5lbmNvZGluZ3M7XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmdzLmxlbmd0aCA9PSAxICYmICFlbmNvZGluZ3NbMF0ucmlkKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbmNvZGluZ3NbMF0ubWF4Qml0cmF0ZSB8fCBjb25zdF8xLmRlZmF1bHRCaXRyYXRlc1traW5kXTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGtpbmQgPT0gXCJhdWRpb1wiKVxuICAgICAgICAgICAgICAgIHRocm93IFwiQXVkaW8gdHJhY2sgY2Fubm90IGhhdmUgbXVsdGlwbGUgZW5jb2RpbmdzXCI7XG4gICAgICAgICAgICBsZXQgYml0cmF0ZXMgPSB7fTtcbiAgICAgICAgICAgIGVuY29kaW5nc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGVuY29kaW5nKSA9PiBlbmNvZGluZy5yaWQpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGVuY29kaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmlkID0gZW5jb2RpbmcucmlkO1xuICAgICAgICAgICAgICAgIGJpdHJhdGVzW3JpZF0gPSBlbmNvZGluZy5tYXhCaXRyYXRlIHx8IGNvbnN0XzEuZGVmYXVsdFNpbXVsY2FzdEJpdHJhdGVzW3JpZF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBiaXRyYXRlcztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRUcmFja0lkVG9UcmFja0JpdHJhdGVzID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhY2tJZFRvVHJhY2tCaXRyYXRlcyA9IHt9O1xuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmxvY2FsUGVlci50cmFja0lkVG9NZXRhZGF0YS5lbnRyaWVzKCkpLmZvckVhY2goKFt0cmFja0lkLCBfbWV0YWRhdGFdKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZFRvVHJhY2tCaXRyYXRlc1t0cmFja0lkXSA9IHRoaXMuZ2V0VHJhY2tCaXRyYXRlcyh0cmFja0lkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWRUb1RyYWNrQml0cmF0ZXM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hlY2tJZlRyYWNrQmVsb25nVG9QZWVyID0gKHRyYWNrSWQsIHBlZXIpID0+IEFycmF5LmZyb20ocGVlci50cmFja0lkVG9NZXRhZGF0YS5rZXlzKCkpLnNvbWUoKHRyYWNrKSA9PiB0cmFja0lkLnN0YXJ0c1dpdGgodHJhY2spKTtcbiAgICAgICAgdGhpcy5vbk9mZmVyRGF0YSA9IGFzeW5jIChvZmZlckRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHRoaXMucnRjQ29uZmlnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSB0aGlzLm9uTG9jYWxDYW5kaWRhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGVlcnJvciA9IHRoaXMub25JY2VDYW5kaWRhdGVFcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSB0aGlzLm9uQ29ubmVjdGlvblN0YXRlQ2hhbmdlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2U7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2sudmFsdWVzKCkpLmZvckVhY2goKHRyYWNrQ29udGV4dCkgPT4gdGhpcy5hZGRUcmFja1RvQ29ubmVjdGlvbih0cmFja0NvbnRleHQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLmdldFRyYW5zY2VpdmVycygpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKCh0cmFuc2NlaXZlcikgPT4gKHRyYW5zY2VpdmVyLmRpcmVjdGlvbiA9IFwic2VuZG9ubHlcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0aW9uLnJlc3RhcnRJY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkVHJhbnNjZWl2ZXJzSWZOZWVkZWQob2ZmZXJEYXRhKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQW5kU2VuZE9mZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25SZW1vdGVDYW5kaWRhdGUgPSAoY2FuZGlkYXRlKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljZUNhbmRpZGF0ZSA9IG5ldyBSVENJY2VDYW5kaWRhdGUoY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNlaXZlZCBuZXcgcmVtb3RlIGNhbmRpZGF0ZSBidXQgUlRDQ29ubmVjdGlvbiBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uTG9jYWxDYW5kaWRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVkaWFFdmVudCA9ICgwLCBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjYW5kaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uSWNlQ2FuZGlkYXRlRXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihldmVudCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Db25uZWN0aW9uU3RhdGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgaWYgKCgoX2EgPSB0aGlzLmNvbm5lY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb25uZWN0aW9uU3RhdGUpID09PSBcImZhaWxlZFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiQ29ubmVjdGlvbiBmYWlsZWRcIjtcbiAgICAgICAgICAgICAgICAoX2MgPSAoX2IgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9uQ29ubmVjdGlvbkVycm9yKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FsbChfYiwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwib25Db25uZWN0aW9uRXJyb3JcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25JY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IFwiSWNlIGNvbm5lY3Rpb24gZmFpbGVkXCI7XG4gICAgICAgICAgICBzd2l0Y2ggKChfYSA9IHRoaXMuY29ubmVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNjb25uZWN0ZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSUNFIGNvbm5lY3Rpb246IGRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZhaWxlZFwiOlxuICAgICAgICAgICAgICAgICAgICAoX2MgPSAoX2IgPSB0aGlzLmNhbGxiYWNrcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9uQ29ubmVjdGlvbkVycm9yKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FsbChfYiwgZXJyb3JNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm9uQ29ubmVjdGlvbkVycm9yXCIsIGVycm9yTWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vblRyYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgW3N0cmVhbV0gPSBldmVudC5zdHJlYW1zO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pZCA9IGV2ZW50LnRyYW5zY2VpdmVyLm1pZDtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFja0lkID0gdGhpcy5taWRUb1RyYWNrSWQuZ2V0KG1pZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tJZlRyYWNrQmVsb25nVG9QZWVyKHRyYWNrSWQsIHRoaXMubG9jYWxQZWVyKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMudHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICAgICAgICAgIHRyYWNrQ29udGV4dC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICAgICAgdHJhY2tDb250ZXh0LnRyYWNrID0gZXZlbnQudHJhY2s7XG4gICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5jYWxsYmFja3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vblRyYWNrUmVhZHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0cmFja0NvbnRleHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm9uVHJhY2tSZWFkeVwiLCB0cmFja0NvbnRleHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRUdXJucyA9ICh0dXJuU2VydmVycykgPT4ge1xuICAgICAgICAgICAgdHVyblNlcnZlcnMuZm9yRWFjaCgodHVyblNlcnZlcikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnQsIHVyaTtcbiAgICAgICAgICAgICAgICBpZiAodHVyblNlcnZlci50cmFuc3BvcnQgPT0gXCJ0bHNcIikge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBcInRjcFwiO1xuICAgICAgICAgICAgICAgICAgICB1cmkgPSBcInR1cm5zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSB0dXJuU2VydmVyLnRyYW5zcG9ydDtcbiAgICAgICAgICAgICAgICAgICAgdXJpID0gXCJ0dXJuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJ0Y0ljZVNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbDogdHVyblNlcnZlci5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsczogdXJpLmNvbmNhdChcIjpcIiwgdHVyblNlcnZlci5zZXJ2ZXJBZGRyLCBcIjpcIiwgdHVyblNlcnZlci5zZXJ2ZXJQb3J0LCBcIj90cmFuc3BvcnQ9XCIsIHRyYW5zcG9ydCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB0dXJuU2VydmVyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5ydGNDb25maWcuaWNlU2VydmVycy5wdXNoKHJ0Y0ljZVNlcnZlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRQZWVyID0gKHBlZXIpID0+IHtcbiAgICAgICAgICAgIC8vICNUT0RPIHJlbW92ZSB0aGlzIGxpbmUgYWZ0ZXIgZml4aW5nIGRlc2VyaWFsaXphdGlvblxuICAgICAgICAgICAgaWYgKHBlZXIuaGFzT3duUHJvcGVydHkoXCJ0cmFja0lkVG9NZXRhZGF0YVwiKSlcbiAgICAgICAgICAgICAgICBwZWVyLnRyYWNrSWRUb01ldGFkYXRhID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhwZWVyLnRyYWNrSWRUb01ldGFkYXRhKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcGVlci50cmFja0lkVG9NZXRhZGF0YSA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuaWRUb1BlZXIuc2V0KHBlZXIuaWQsIHBlZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVyYXNlUGVlciA9IChwZWVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFja3NJZCA9IEFycmF5LmZyb20ocGVlci50cmFja0lkVG9NZXRhZGF0YS5rZXlzKCkpO1xuICAgICAgICAgICAgdHJhY2tzSWQuZm9yRWFjaCgodHJhY2tJZCkgPT4gdGhpcy50cmFja0lkVG9UcmFjay5kZWxldGUodHJhY2tJZCkpO1xuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLm1pZFRvVHJhY2tJZC5lbnRyaWVzKCkpLmZvckVhY2goKFttaWQsIHRyYWNrSWRdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrc0lkLmluY2x1ZGVzKHRyYWNrSWQpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZFRvVHJhY2tJZC5kZWxldGUobWlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pZFRvUGVlci5kZWxldGUocGVlci5pZCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXJhc2VUcmFjayA9ICh0cmFja0lkLCBwZWVySWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tJZFRvVHJhY2suZGVsZXRlKHRyYWNrSWQpO1xuICAgICAgICAgICAgY29uc3QgbWlkVG9UcmFja0lkID0gQXJyYXkuZnJvbSh0aGlzLm1pZFRvVHJhY2tJZC5lbnRyaWVzKCkpO1xuICAgICAgICAgICAgY29uc3QgW21pZCwgX3RyYWNrSWRdID0gbWlkVG9UcmFja0lkLmZpbmQoKFttaWQsIG1hcFRyYWNrSWRdKSA9PiBtYXBUcmFja0lkID09PSB0cmFja0lkKTtcbiAgICAgICAgICAgIHRoaXMubWlkVG9UcmFja0lkLmRlbGV0ZShtaWQpO1xuICAgICAgICAgICAgdGhpcy5pZFRvUGVlci5nZXQocGVlcklkKS50cmFja0lkVG9NZXRhZGF0YS5kZWxldGUodHJhY2tJZCk7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkVHJhY2tFbmNvZGluZ3MuZGVsZXRlKHRyYWNrSWQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldFBlZXJJZCA9ICgpID0+IHRoaXMubG9jYWxQZWVyLmlkO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5jYWxsYmFja3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgdHJhY2sgdGhhdCB3aWxsIGJlIHNlbnQgdG8gdGhlIFJUQyBFbmdpbmUuXG4gICAgICogQHBhcmFtIHRyYWNrIC0gQXVkaW8gb3IgdmlkZW8gdHJhY2sgZS5nLiBmcm9tIHlvdXIgbWljcm9waG9uZSBvciBjYW1lcmEuXG4gICAgICogQHBhcmFtIHN0cmVhbSAgLSBTdHJlYW0gdGhhdCB0aGlzIHRyYWNrIGJlbG9uZ3MgdG8uXG4gICAgICogQHBhcmFtIHRyYWNrTWV0YWRhdGEgLSBBbnkgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyB0cmFjayB0aGF0IG90aGVyIHBlZXJzIHdpbGxcbiAgICAgKiByZWNlaXZlIGluIHtAbGluayBDYWxsYmFja3Mub25QZWVySm9pbmVkfS4gRS5nLiB0aGlzIGNhbiBzb3VyY2Ugb2YgdGhlIHRyYWNrIC0gd2hlYXRoZXIgaXQnc1xuICAgICAqIHNjcmVlbnNoYXJpbmcsIHdlYmNhbSBvciBzb21lIG90aGVyIG1lZGlhIGRldmljZS5cbiAgICAgKiBAcGFyYW0gc2ltdWxjYXN0Q29uZmlnIC0gU2ltdWxjYXN0IGNvbmZpZ3VyYXRpb24uIEJ5IGRlZmF1bHQgc2ltdWxjYXN0IGlzIGRpc2FibGVkLlxuICAgICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHJlZmVyIHRvIHtAbGluayBTaW11bGNhc3RDb25maWd9LlxuICAgICAqIEBwYXJhbSBtYXhCYW5kd2lkdGggLSBtYXhpbWFsIGJhbmR3aWR0aCB0aGlzIHRyYWNrIGNhbiB1c2UuXG4gICAgICogRGVmYXVsdHMgdG8gMCB3aGljaCBpcyB1bmxpbWl0ZWQuXG4gICAgICogVGhpcyBvcHRpb24gaGFzIG5vIGVmZmVjdCBmb3Igc2ltdWxjYXN0IGFuZCBhdWRpbyB0cmFja3MuXG4gICAgICogRm9yIHNpbXVsY2FzdCB0cmFja3MgdXNlIGB7QGxpbmsgTWVtYnJhbmVXZWJSVEMuc2V0VHJhY2tCYW5kd2lkdGh9LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgaWQgb2YgYWRkZWQgdHJhY2tcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogbGV0IGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbSgpO1xuICAgICAqIHRyeSB7XG4gICAgICogICBsb2NhbEF1ZGlvU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoXG4gICAgICogICAgIEFVRElPX0NPTlNUUkFJTlRTXG4gICAgICogICApO1xuICAgICAqICAgbG9jYWxBdWRpb1N0cmVhbVxuICAgICAqICAgICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgICAgLmZvckVhY2goKHRyYWNrKSA9PiBsb2NhbFN0cmVhbS5hZGRUcmFjayh0cmFjaykpO1xuICAgICAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICogICBjb25zb2xlLmVycm9yKFwiQ291bGRuJ3QgZ2V0IG1pY3JvcGhvbmUgcGVybWlzc2lvbjpcIiwgZXJyb3IpO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHRyeSB7XG4gICAgICogICBsb2NhbFZpZGVvU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoXG4gICAgICogICAgIFZJREVPX0NPTlNUUkFJTlRTXG4gICAgICogICApO1xuICAgICAqICAgbG9jYWxWaWRlb1N0cmVhbVxuICAgICAqICAgICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgICAgLmZvckVhY2goKHRyYWNrKSA9PiBsb2NhbFN0cmVhbS5hZGRUcmFjayh0cmFjaykpO1xuICAgICAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICogIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBnZXQgY2FtZXJhIHBlcm1pc3Npb246XCIsIGVycm9yKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBsb2NhbFN0cmVhbVxuICAgICAqICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgLmZvckVhY2goKHRyYWNrKSA9PiB3ZWJydGMuYWRkVHJhY2sodHJhY2ssIGxvY2FsU3RyZWFtKSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkVHJhY2sodHJhY2ssIHN0cmVhbSwgdHJhY2tNZXRhZGF0YSA9IG5ldyBNYXAoKSwgc2ltdWxjYXN0Q29uZmlnID0geyBlbmFibGVkOiBmYWxzZSwgYWN0aXZlX2VuY29kaW5nczogW10gfSwgbWF4QmFuZHdpZHRoID0gMCAvLyB1bmxpbWl0ZWQgYmFuZHdpZHRoXG4gICAgKSB7XG4gICAgICAgIGlmICghc2ltdWxjYXN0Q29uZmlnLmVuYWJsZWQgJiYgISh0eXBlb2YgbWF4QmFuZHdpZHRoID09PSBcIm51bWJlclwiKSlcbiAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCB0eXBlIG9mIGBtYXhCYW5kd2lkdGhgIGFyZ3VtZW50IGZvciBhIG5vbi1zaW11bGNhc3QgdHJhY2ssIGV4cGVjdGVkOiBudW1iZXJcIjtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGVlcklkKCkgPT09IFwiXCIpXG4gICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBhZGQgdHJhY2tzIGJlZm9yZSBiZWluZyBhY2NlcHRlZCBieSB0aGUgc2VydmVyXCI7XG4gICAgICAgIGNvbnN0IHRyYWNrSWQgPSB0aGlzLmdldFRyYWNrSWQoKDAsIHV1aWRfMS52NCkoKSk7XG4gICAgICAgIHRoaXMubG9jYWxUcmFja3NXaXRoU3RyZWFtcy5wdXNoKHsgdHJhY2ssIHN0cmVhbSB9KTtcbiAgICAgICAgdGhpcy5sb2NhbFBlZXIudHJhY2tJZFRvTWV0YWRhdGEuc2V0KHRyYWNrSWQsIHRyYWNrTWV0YWRhdGEpO1xuICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSBuZXcgVHJhY2tDb250ZXh0SW1wbCh0aGlzLmxvY2FsUGVlciwgdHJhY2tJZCwgdHJhY2tNZXRhZGF0YSk7XG4gICAgICAgIHRyYWNrQ29udGV4dC50cmFjayA9IHRyYWNrO1xuICAgICAgICB0cmFja0NvbnRleHQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICB0cmFja0NvbnRleHQuc2ltdWxjYXN0Q29uZmlnID0gc2ltdWxjYXN0Q29uZmlnO1xuICAgICAgICB0cmFja0NvbnRleHQubWF4QmFuZHdpZHRoID0gbWF4QmFuZHdpZHRoO1xuICAgICAgICB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suc2V0KHRyYWNrSWQsIHRyYWNrQ29udGV4dCk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2tUb0Nvbm5lY3Rpb24odHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblxuICAgICAgICAgICAgICAgIC5nZXRUcmFuc2NlaXZlcnMoKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKCh0cmFuc2NlaXZlcikgPT4gKHRyYW5zY2VpdmVyLmRpcmVjdGlvbiA9XG4gICAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSBcInNlbmRyZWN2XCJcbiAgICAgICAgICAgICAgICAgICAgPyBcInNlbmRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgOiB0cmFuc2NlaXZlci5kaXJlY3Rpb24pKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWVkaWFFdmVudCA9ICgwLCBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCkoeyB0eXBlOiBcInJlbmVnb3RpYXRlVHJhY2tzXCIgfSk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgIHJldHVybiB0cmFja0lkO1xuICAgIH1cbiAgICBjcmVhdGVUcmFuc2NlaXZlckNvbmZpZyh0cmFja0NvbnRleHQpIHtcbiAgICAgICAgbGV0IHRyYW5zY2VpdmVyQ29uZmlnO1xuICAgICAgICBpZiAodHJhY2tDb250ZXh0LnRyYWNrLmtpbmQgPT09IFwiYXVkaW9cIikge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXJDb25maWcgPSB0aGlzLmNyZWF0ZUF1ZGlvVHJhbnNjZWl2ZXJDb25maWcodHJhY2tDb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyQ29uZmlnID0gdGhpcy5jcmVhdGVWaWRlb1RyYW5zY2VpdmVyQ29uZmlnKHRyYWNrQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyQ29uZmlnO1xuICAgIH1cbiAgICBjcmVhdGVBdWRpb1RyYW5zY2VpdmVyQ29uZmlnKF90cmFja0NvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgZGlyZWN0aW9uOiBcInNlbmRvbmx5XCIgfTtcbiAgICB9XG4gICAgY3JlYXRlVmlkZW9UcmFuc2NlaXZlckNvbmZpZyh0cmFja0NvbnRleHQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgdHJhbnNjZWl2ZXJDb25maWc7XG4gICAgICAgIGlmICh0cmFja0NvbnRleHQuc2ltdWxjYXN0Q29uZmlnLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyQ29uZmlnID0gY29uc3RfMS5zaW11bGNhc3RUcmFuc2NlaXZlckNvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQWN0aXZlRW5jb2RpbmdzID0gdHJhY2tDb250ZXh0LnNpbXVsY2FzdENvbmZpZy5hY3RpdmVfZW5jb2RpbmdzO1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkVHJhY2tFbmNvZGluZ3MgPSBbXTtcbiAgICAgICAgICAgIChfYSA9IHRyYW5zY2VpdmVyQ29uZmlnLnNlbmRFbmNvZGluZ3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKChlbmNvZGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0cmFja0FjdGl2ZUVuY29kaW5ncy5pbmNsdWRlcyhlbmNvZGluZy5yaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFRyYWNrRW5jb2RpbmdzLnB1c2goZW5jb2RpbmcucmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRUcmFja0VuY29kaW5ncy5zZXQodHJhY2tDb250ZXh0LnRyYWNrSWQsIGRpc2FibGVkVHJhY2tFbmNvZGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXJDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcInNlbmRvbmx5XCIsXG4gICAgICAgICAgICAgICAgc2VuZEVuY29kaW5nczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNrQ29udGV4dC5tYXhCYW5kd2lkdGggJiYgdHJhbnNjZWl2ZXJDb25maWcuc2VuZEVuY29kaW5ncylcbiAgICAgICAgICAgIHRoaXMuYXBwbHlCYW5kd2lkdGhMaW1pdGF0aW9uKHRyYW5zY2VpdmVyQ29uZmlnLnNlbmRFbmNvZGluZ3MsIHRyYWNrQ29udGV4dC5tYXhCYW5kd2lkdGgpO1xuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXJDb25maWc7XG4gICAgfVxuICAgIGFwcGx5QmFuZHdpZHRoTGltaXRhdGlvbihlbmNvZGluZ3MsIG1heF9iYW5kd2lkdGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtYXhfYmFuZHdpZHRoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAvLyBub24tc2ltdWxjYXN0IGxpbWl0YXRpb25cbiAgICAgICAgICAgIHRoaXMuc3BsaXRCYW5kd2lkdGgoZW5jb2RpbmdzLCBtYXhfYmFuZHdpZHRoICogMTAyNCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBzaW11bGNhc3QgYmFuZHdpZHRoIGxpbWl0XG4gICAgICAgICAgICBlbmNvZGluZ3NcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChlbmNvZGluZykgPT4gZW5jb2RpbmcucmlkKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChlbmNvZGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbWl0ID0gbWF4X2JhbmR3aWR0aC5nZXQoZW5jb2RpbmcucmlkKSB8fCAwO1xuICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RpbmcubWF4Qml0cmF0ZSA9IGxpbWl0ICogMTAyNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZW5jb2RpbmcubWF4Qml0cmF0ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwbGl0QmFuZHdpZHRoKGVuY29kaW5ncywgYmFuZHdpZHRoKSB7XG4gICAgICAgIGlmIChiYW5kd2lkdGggPT09IDApIHtcbiAgICAgICAgICAgIGVuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZykgPT4gZGVsZXRlIGVuY29kaW5nLm1heEJpdHJhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmNvZGluZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIFRoaXMgbW9zdCBsaWtlbHkgaXMgYSByYWNlIGNvbmRpdGlvbi4gTG9nIGFuIGVycm9yIGFuZCBwcmV2ZW50IGNhdGFzdHJvcGhpYyBmYWlsdXJlXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQXR0ZW1wdGVkIHRvIGxpbWl0IGJhbmR3aWR0aCBvZiB0aGUgdHJhY2sgdGhhdCBkb2Vzbid0IGhhdmUgYW55IGVuY29kaW5nc1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBhcmUgc29sdmluZyB0aGUgZm9sbG93aW5nIGVxdWF0aW9uOlxuICAgICAgICAvLyB4ICsgKGswL2sxKV4yICogeCArIChrMC9rMileMiAqIHggKyAuLi4gKyAoazAva24pXjIgKiB4ID0gYmFuZHdpZHRoXG4gICAgICAgIC8vIHdoZXJlIHggaXMgdGhlIGJpdHJhdGUgZm9yIHRoZSBmaXJzdCBlbmNvZGluZywga24gYXJlIHNjYWxlUmVzb2x1dGlvbkRvd25CeSBmYWN0b3JzXG4gICAgICAgIC8vIHNxdWFyZSBpcyBkaWN0YXRlZCBieSB0aGUgZmFjdCB0aGF0IGswL2tuIGlzIGEgc2NhbGUgZmFjdG9yLCBidXQgd2UgYXJlIGludGVyZXN0ZWQgaW4gdGhlIHRvdGFsIG51bWJlciBvZiBwaXhlbHMgaW4gdGhlIGltYWdlXG4gICAgICAgIGNvbnN0IGZpcnN0U2NhbGVEb3duQnkgPSBlbmNvZGluZ3NbMF0uc2NhbGVSZXNvbHV0aW9uRG93bkJ5IHx8IDE7XG4gICAgICAgIGNvbnN0IGJpdHJhdGVfcGFydHMgPSBlbmNvZGluZ3MucmVkdWNlKChhY2MsIHZhbHVlKSA9PiBhY2MgKyAoZmlyc3RTY2FsZURvd25CeSAvICh2YWx1ZS5zY2FsZVJlc29sdXRpb25Eb3duQnkgfHwgMSkpICoqIDIsIDApO1xuICAgICAgICBjb25zdCB4ID0gYmFuZHdpZHRoIC8gYml0cmF0ZV9wYXJ0cztcbiAgICAgICAgZW5jb2RpbmdzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS5tYXhCaXRyYXRlID1cbiAgICAgICAgICAgICAgICB4ICogKGZpcnN0U2NhbGVEb3duQnkgLyAodmFsdWUuc2NhbGVSZXNvbHV0aW9uRG93bkJ5IHx8IDEpKSAqKiAyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgYSB0cmFjayB0aGF0IGlzIGJlaW5nIHNlbnQgdG8gdGhlIFJUQyBFbmdpbmUuXG4gICAgICogQHBhcmFtIHRyYWNrIC0gQXVkaW8gb3IgdmlkZW8gdHJhY2suXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNrSWQgLSBJZCBvZiBhdWRpbyBvciB2aWRlbyB0cmFjayB0byByZXBsYWNlLlxuICAgICAqIEBwYXJhbSB7TWVkaWFTdHJlYW1UcmFja30gbmV3VHJhY2tcbiAgICAgKiBAcGFyYW0ge2FueX0gW25ld01ldGFkYXRhXSAtIE9wdGlvbmFsIHRyYWNrIG1ldGFkYXRhIHRvIGFwcGx5IHRvIHRoZSBuZXcgdHJhY2suIElmIG5vXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjayBtZXRhZGF0YSBpcyBwYXNzZWQsIHRoZSBvbGQgdHJhY2sgbWV0YWRhdGEgaXMgcmV0YWluZWQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IHN1Y2Nlc3NcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogLy8gc2V0dXAgY2FtZXJhXG4gICAgICogbGV0IGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbSgpO1xuICAgICAqIHRyeSB7XG4gICAgICogICBsb2NhbFZpZGVvU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoXG4gICAgICogICAgIFZJREVPX0NPTlNUUkFJTlRTXG4gICAgICogICApO1xuICAgICAqICAgbG9jYWxWaWRlb1N0cmVhbVxuICAgICAqICAgICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgICAgLmZvckVhY2goKHRyYWNrKSA9PiBsb2NhbFN0cmVhbS5hZGRUcmFjayh0cmFjaykpO1xuICAgICAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICogICBjb25zb2xlLmVycm9yKFwiQ291bGRuJ3QgZ2V0IGNhbWVyYSBwZXJtaXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICogfVxuICAgICAqIGxldCBvbGRUcmFja0lkO1xuICAgICAqIGxvY2FsU3RyZWFtXG4gICAgICogIC5nZXRUcmFja3MoKVxuICAgICAqICAuZm9yRWFjaCgodHJhY2spID0+IHRyYWNrSWQgPSB3ZWJydGMuYWRkVHJhY2sodHJhY2ssIGxvY2FsU3RyZWFtKSk7XG4gICAgICpcbiAgICAgKiAvLyBjaGFuZ2UgY2FtZXJhXG4gICAgICogY29uc3Qgb2xkVHJhY2sgPSBsb2NhbFN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAqIGxldCB2aWRlb0RldmljZUlkID0gXCJhYmNkLTEyMzRcIjtcbiAgICAgKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XG4gICAgICogICAgICB2aWRlbzoge1xuICAgICAqICAgICAgICAuLi4oVklERU9fQ09OU1RSQUlOVFMgYXMge30pLFxuICAgICAqICAgICAgICBkZXZpY2VJZDoge1xuICAgICAqICAgICAgICAgIGV4YWN0OiB2aWRlb0RldmljZUlkLFxuICAgICAqICAgICAgICB9LFxuICAgICAqICAgICAgfVxuICAgICAqICAgfSlcbiAgICAgKiAgIC50aGVuKChzdHJlYW0pID0+IHtcbiAgICAgKiAgICAgbGV0IHZpZGVvVHJhY2sgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgKiAgICAgd2VicnRjLnJlcGxhY2VUcmFjayhvbGRUcmFja0lkLCB2aWRlb1RyYWNrKTtcbiAgICAgKiAgIH0pXG4gICAgICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN3aXRjaGluZyBjYW1lcmEnLCBlcnJvcik7XG4gICAgICogICB9KVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFzeW5jIHJlcGxhY2VUcmFjayh0cmFja0lkLCBuZXdUcmFjaywgbmV3VHJhY2tNZXRhZGF0YSkge1xuICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICBjb25zdCBzZW5kZXIgPSB0aGlzLmZpbmRTZW5kZXIodHJhY2tDb250ZXh0LnRyYWNrLmlkKTtcbiAgICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbmRlclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlVHJhY2sobmV3VHJhY2spXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrTWV0YWRhdGEgPSBuZXdUcmFja01ldGFkYXRhIHx8IHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCkubWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgdHJhY2tDb250ZXh0LnRyYWNrID0gbmV3VHJhY2s7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmFja01ldGFkYXRhKHRyYWNrSWQsIHRyYWNrTWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBtYXhpbXVtIGJhbmR3aWR0aCBmb3IgdGhlIHRyYWNrIGlkZW50aWZpZWQgYnkgdHJhY2tJZC5cbiAgICAgKiBUaGlzIHZhbHVlIGRpcmVjdGx5IHRyYW5zbGF0ZXMgdG8gcXVhbGl0eSBvZiB0aGUgc3RyZWFtIGFuZCwgaW4gY2FzZSBvZiB2aWRlbywgdG8gdGhlIGFtb3VudCBvZiBSVFAgcGFja2V0cyBiZWluZyBzZW50LlxuICAgICAqIEluIGNhc2UgdHJhY2tJZCBwb2ludHMgYXQgdGhlIHNpbXVsY2FzdCB0cmFjayBiYW5kd2lkdGggaXMgc3BsaXQgYmV0d2VlbiBhbGwgb2YgdGhlIHZhcmlhbnQgc3RyZWFtcyBwcm9wb3J0aW9uYWxseSB0byB0aGVpciByZXNvbHV0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNrSWRcbiAgICAgKiBAcGFyYW0ge0JhbmR3aWR0aExpbWl0fSBiYW5kd2lkdGggaW4ga2Jwc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBzdWNjZXNzXG4gICAgICovXG4gICAgc2V0VHJhY2tCYW5kd2lkdGgodHJhY2tJZCwgYmFuZHdpZHRoKSB7XG4gICAgICAgIC8vIEZJWE1FOiBtYXhCYW5kd2lkdGggaW4gVHJhY2tDb250ZXh0IGlzIG5vdCB1cGRhdGVkXG4gICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCk7XG4gICAgICAgIGlmICghdHJhY2tDb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYFRyYWNrICcke3RyYWNrSWR9JyBkb2Vzbid0IGV4aXN0YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VuZGVyID0gdGhpcy5maW5kU2VuZGVyKHRyYWNrQ29udGV4dC50cmFjay5pZCk7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBzZW5kZXIuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICBpZiAocGFyYW1ldGVycy5lbmNvZGluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLmVuY29kaW5ncyA9IFt7fV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5QmFuZHdpZHRoTGltaXRhdGlvbihwYXJhbWV0ZXJzLmVuY29kaW5ncywgYmFuZHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VuZGVyXG4gICAgICAgICAgICAuc2V0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSAoMCwgbWVkaWFFdmVudF8xLmdlbmVyYXRlQ3VzdG9tRXZlbnQpKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInRyYWNrVmFyaWFudEJpdHJhdGVzXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0cmFja0lkOiB0cmFja0lkLFxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50Qml0cmF0ZXM6IHRoaXMuZ2V0VHJhY2tCaXRyYXRlcyh0cmFja0lkKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKF9lcnJvcikgPT4gZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIG1heGltdW0gYmFuZHdpZHRoIGZvciB0aGUgZ2l2ZW4gc2ltdWxjYXN0IGVuY29kaW5nIG9mIHRoZSBnaXZlbiB0cmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gaWQgb2YgdGhlIHRyYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJpZCAtIHJpZCBvZiB0aGUgZW5jb2RpbmdcbiAgICAgKiBAcGFyYW0ge0JhbmR3aWR0aExpbWl0fSBiYW5kd2lkdGggLSBkZXNpcmVkIG1heCBiYW5kd2lkdGggdXNlZCBieSB0aGUgZW5jb2RpbmcgKGluIGticHMpXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBzZXRFbmNvZGluZ0JhbmR3aWR0aCh0cmFja0lkLCByaWQsIGJhbmR3aWR0aCkge1xuICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICBpZiAoIXRyYWNrQ29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBUcmFjayAnJHt0cmFja0lkfScgZG9lc24ndCBleGlzdGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZmluZFNlbmRlcih0cmFja0NvbnRleHQudHJhY2suaWQpO1xuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgY29uc3QgZW5jb2RpbmcgPSBwYXJhbWV0ZXJzLmVuY29kaW5ncy5maW5kKChlbmNvZGluZykgPT4gZW5jb2RpbmcucmlkID09PSByaWQpO1xuICAgICAgICBpZiAoIWVuY29kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVuY29kaW5nIHdpdGggcmlkICcke3JpZH0nIGRvZXNuJ3QgZXhpc3RgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiYW5kd2lkdGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbmNvZGluZy5tYXhCaXRyYXRlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW5jb2RpbmcubWF4Qml0cmF0ZSA9IGJhbmR3aWR0aCAqIDEwMjQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbmRlclxuICAgICAgICAgICAgLnNldFBhcmFtZXRlcnMocGFyYW1ldGVycylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBtZWRpYUV2ZW50ID0gKDAsIG1lZGlhRXZlbnRfMS5nZW5lcmF0ZUN1c3RvbUV2ZW50KSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0cmFja1ZhcmlhbnRCaXRyYXRlc1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tJZDogdHJhY2tJZCxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudEJpdHJhdGVzOiB0aGlzLmdldFRyYWNrQml0cmF0ZXModHJhY2tJZCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChfZXJyb3IpID0+IGZhbHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHRyYWNrIGZyb20gY29ubmVjdGlvbiB0aGF0IHdhcyBiZWluZyBzZW50IHRvIHRoZSBSVEMgRW5naW5lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gSWQgb2YgYXVkaW8gb3IgdmlkZW8gdHJhY2sgdG8gcmVtb3ZlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHNcbiAgICAgKiAvLyBzZXR1cCBjYW1lcmFcbiAgICAgKiBsZXQgbG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKCk7XG4gICAgICogdHJ5IHtcbiAgICAgKiAgIGxvY2FsVmlkZW9TdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShcbiAgICAgKiAgICAgVklERU9fQ09OU1RSQUlOVFNcbiAgICAgKiAgICk7XG4gICAgICogICBsb2NhbFZpZGVvU3RyZWFtXG4gICAgICogICAgIC5nZXRUcmFja3MoKVxuICAgICAqICAgICAuZm9yRWFjaCgodHJhY2spID0+IGxvY2FsU3RyZWFtLmFkZFRyYWNrKHRyYWNrKSk7XG4gICAgICogfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgKiAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBnZXQgY2FtZXJhIHBlcm1pc3Npb246XCIsIGVycm9yKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBsZXQgdHJhY2tJZFxuICAgICAqIGxvY2FsU3RyZWFtXG4gICAgICogIC5nZXRUcmFja3MoKVxuICAgICAqICAuZm9yRWFjaCgodHJhY2spID0+IHRyYWNrSWQgPSB3ZWJydGMuYWRkVHJhY2sodHJhY2ssIGxvY2FsU3RyZWFtKSk7XG4gICAgICpcbiAgICAgKiAvLyByZW1vdmUgdHJhY2tcbiAgICAgKiB3ZWJydGMucmVtb3ZlVHJhY2sodHJhY2tJZClcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICByZW1vdmVUcmFjayh0cmFja0lkKSB7XG4gICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCk7XG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZmluZFNlbmRlcih0cmFja0NvbnRleHQudHJhY2suaWQpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSAoMCwgbWVkaWFFdmVudF8xLmdlbmVyYXRlQ3VzdG9tRXZlbnQpKHsgdHlwZTogXCJyZW5lZ290aWF0ZVRyYWNrc1wiIH0pO1xuICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgICAgICB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZGVsZXRlKHRyYWNrSWQpO1xuICAgICAgICB0aGlzLmxvY2FsUGVlci50cmFja0lkVG9NZXRhZGF0YS5kZWxldGUodHJhY2tJZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEN1cnJlbnRseSwgdGhpcyBmdW5jdGlvbiBvbmx5IHdvcmtzIHdoZW4gRGlzcGxheU1hbmFnZXIgaW4gUlRDIEVuZ2luZSBpc1xuICAgICAqIGVuYWJsZWQgYW5kIHNpbXVsY2FzdCBpcyBkaXNhYmxlZC5cbiAgICAgKlxuICAgICAqIFByaW9yaXRpemVzIGEgdHJhY2sgaW4gY29ubmVjdGlvbiB0byBiZSBhbHdheXMgc2VudCB0byBicm93c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNrSWQgLSBJZCBvZiB2aWRlbyB0cmFjayB0byBwcmlvcml0aXplLlxuICAgICAqL1xuICAgIHByaW9yaXRpemVUcmFjayh0cmFja0lkKSB7XG4gICAgICAgIGxldCBtZWRpYUV2ZW50ID0gKDAsIG1lZGlhRXZlbnRfMS5nZW5lcmF0ZUN1c3RvbUV2ZW50KSh7XG4gICAgICAgICAgICB0eXBlOiBcInByaW9yaXRpemVUcmFja1wiLFxuICAgICAgICAgICAgZGF0YTogeyB0cmFja0lkIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50bHksIHRoaXMgZnVuY3Rpb24gb25seSB3b3JrcyB3aGVuIERpc3BsYXlNYW5hZ2VyIGluIFJUQyBFbmdpbmUgaXNcbiAgICAgKiBlbmFibGVkIGFuZCBzaW11bGNhc3QgaXMgZGlzYWJsZWQuXG4gICAgICpcbiAgICAgKiBVbnByaW9yaXRpemVzIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2tJZCAtIElkIG9mIHZpZGVvIHRyYWNrIHRvIHVucHJpb3JpdGl6ZS5cbiAgICAgKi9cbiAgICB1bnByaW9yaXRpemVUcmFjayh0cmFja0lkKSB7XG4gICAgICAgIGxldCBtZWRpYUV2ZW50ID0gKDAsIG1lZGlhRXZlbnRfMS5nZW5lcmF0ZUN1c3RvbUV2ZW50KSh7XG4gICAgICAgICAgICB0eXBlOiBcInVucHJpb3JpdGl6ZVRyYWNrXCIsXG4gICAgICAgICAgICBkYXRhOiB7IHRyYWNrSWQgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEN1cnJlbnRseSB0aGlzIGZ1bmN0aW9uIGhhcyBubyBlZmZlY3QuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0byBhZGp1c3QgcmVzb2x1dGlvbiBhbmQgbnVtYmVyIG9mIHZpZGVvIHRyYWNrcyBzZW50IGJ5IGFuIFNGVSB0byBhIGNsaWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaWdTY3JlZW5zIC0gbnVtYmVyIG9mIHNjcmVlbnMgd2l0aCBiaWcgc2l6ZVxuICAgICAqIChpZiBzaW11bGNhc3QgaXMgdXNlZCB0aGlzIHdpbGwgbGltaXQgbnVtYmVyIG9mIHRyYWNrcyBzZW50IHdpdGggaGlnaGVzdCBxdWFsaXR5KS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc21hbGxTY3JlZW5zIC0gbnVtYmVyIG9mIHNjcmVlbnMgd2l0aCBzbWFsbCBzaXplXG4gICAgICogKGlmIHNpbXVsY2FzdCBpcyB1c2VkIHRoaXMgd2lsbCBsaW1pdCBudW1iZXIgb2YgdHJhY2tzIHNlbnQgd2l0aCBsb3dlc3QgcXVhbGl0eSkuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1lZGl1bVNjcmVlbnMgLSBudW1iZXIgb2Ygc2NyZWVucyB3aXRoIG1lZGl1bSBzaXplXG4gICAgICogKGlmIHNpbXVsY2FzdCBpcyB1c2VkIHRoaXMgd2lsbCBsaW1pdCBudW1iZXIgb2YgdHJhY2tzIHNlbnQgd2l0aCBtZWRpdW0gcXVhbGl0eSkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhbGxTYW1lU2l6ZSAtIGZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBhbGwgc2NyZWVucyBzaG91bGQgdXNlIHRoZSBzYW1lIHF1YWxpdHlcbiAgICAgKi9cbiAgICBzZXRQcmVmZXJlZFZpZGVvU2l6ZXMoYmlnU2NyZWVucywgc21hbGxTY3JlZW5zLCBtZWRpdW1TY3JlZW5zID0gMCwgYWxsU2FtZVNpemUgPSBmYWxzZSkge1xuICAgICAgICBsZXQgbWVkaWFFdmVudCA9ICgwLCBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCkoe1xuICAgICAgICAgICAgdHlwZTogXCJwcmVmZXJlZFZpZGVvU2l6ZXNcIixcbiAgICAgICAgICAgIGRhdGE6IHsgYmlnU2NyZWVucywgbWVkaXVtU2NyZWVucywgc21hbGxTY3JlZW5zLCBhbGxTYW1lU2l6ZSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0cmFjayBlbmNvZGluZyB0aGF0IHNlcnZlciBzaG91bGQgc2VuZCB0byB0aGUgY2xpZW50IGxpYnJhcnkuXG4gICAgICpcbiAgICAgKiBUaGUgZW5jb2Rpbmcgd2lsbCBiZSBzZW50IHdoZW5ldmVyIGl0IGlzIGF2YWlsYWJsZS5cbiAgICAgKiBJZiBjaG9vc2VuIGVuY29kaW5nIGlzIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLCBzb21lIG90aGVyIGVuY29kaW5nXG4gICAgICogd2lsbCBiZSBzZW50IHVudGlsIGNob29zZW4gZW5jb2RpbmcgYmVjb21lcyBhY3RpdmUgYWdhaW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2tJZCAtIGlkIG9mIHRyYWNrXG4gICAgICogQHBhcmFtIHtUcmFja0VuY29kaW5nfSBlbmNvZGluZyAtIGVuY29kaW5nIHRvIHJlY2VpdmVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogd2VicnRjLnNldFRhcmdldFRyYWNrRW5jb2RpbmcoaW5jb21pbmdUcmFja0N0eC50cmFja0lkLCBcImxcIilcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzZXRUYXJnZXRUcmFja0VuY29kaW5nKHRyYWNrSWQsIGVuY29kaW5nKSB7XG4gICAgICAgIGxldCBtZWRpYUV2ZW50ID0gKDAsIG1lZGlhRXZlbnRfMS5nZW5lcmF0ZUN1c3RvbUV2ZW50KSh7XG4gICAgICAgICAgICB0eXBlOiBcInNldFRhcmdldFRyYWNrVmFyaWFudFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQ6IHRyYWNrSWQsXG4gICAgICAgICAgICAgICAgdmFyaWFudDogZW5jb2RpbmcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyB0cmFjayBlbmNvZGluZyBzbyB0aGF0IGl0IHdpbGwgYmUgc2VudCB0byB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gaWQgb2YgdHJhY2tcbiAgICAgKiBAcGFyYW0ge1RyYWNrRW5jb2Rpbmd9IGVuY29kaW5nIC0gZW5jb2RpbmcgdGhhdCB3aWxsIGJlIGVuYWJsZWRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgdHJhY2tJZCA9IHdlYnJ0Yy5hZGRUcmFjayh0cmFjaywgc3RyZWFtLCB7fSwge2VuYWJsZWQ6IHRydWUsIGFjdGl2ZV9lbmNvZGluZ3M6IFtcImxcIiwgXCJtXCIsIFwiaFwiXX0pO1xuICAgICAqIHdlYnJ0Yy5kaXNhYmxlVHJhY2tFbmNvZGluZyh0cmFja0lkLCBcImxcIik7XG4gICAgICogLy8gd2FpdCBzb21lIHRpbWVcbiAgICAgKiB3ZWJydGMuZW5hYmxlVHJhY2tFbmNvZGluZyh0cmFja0lkLCBcImxcIik7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZW5hYmxlVHJhY2tFbmNvZGluZyh0cmFja0lkLCBlbmNvZGluZykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgbGV0IHRyYWNrID0gKF9hID0gdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRyYWNrO1xuICAgICAgICBsZXQgbmV3RGlzYWJsZWRUcmFja0VuY29kaW5ncyA9IChfYiA9IHRoaXMuZGlzYWJsZWRUcmFja0VuY29kaW5nc1xuICAgICAgICAgICAgLmdldCh0cmFja0lkKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigoZW4pID0+IGVuICE9PSBlbmNvZGluZyk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRUcmFja0VuY29kaW5ncy5zZXQodHJhY2tJZCwgbmV3RGlzYWJsZWRUcmFja0VuY29kaW5ncyk7XG4gICAgICAgIGxldCBzZW5kZXIgPSAoX2MgPSB0aGlzLmNvbm5lY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRTZW5kZXJzKCkuZmlsdGVyKChzZW5kZXIpID0+IHNlbmRlci50cmFjayA9PT0gdHJhY2spWzBdO1xuICAgICAgICBsZXQgcGFyYW1zID0gc2VuZGVyID09PSBudWxsIHx8IHNlbmRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncy5maWx0ZXIoKGVuKSA9PiBlbi5yaWQgPT0gZW5jb2RpbmcpWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNlbmRlciA9PT0gbnVsbCB8fCBzZW5kZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbmRlci5zZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRyYWNrIGVuY29kaW5nIHNvIHRoYXQgaXQgd2lsbCBiZSBubyBsb25nZXIgc2VudCB0byB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gaWQgb2YgdHJhY2tcbiAgICAgKiBAcGFyYW0ge3JhY2tFbmNvZGluZ30gZW5jb2RpbmcgLSBlbmNvZGluZyB0aGF0IHdpbGwgYmUgZGlzYWJsZWRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogY29uc3QgdHJhY2tJZCA9IHdlYnJ0Yy5hZGRUcmFjayh0cmFjaywgc3RyZWFtLCB7fSwge2VuYWJsZWQ6IHRydWUsIGFjdGl2ZV9lbmNvZGluZ3M6IFtcImxcIiwgXCJtXCIsIFwiaFwiXX0pO1xuICAgICAqIHdlYnJ0Yy5kaXNhYmxlVHJhY2tFbmNvZGluZyh0cmFja0lkLCBcImxcIik7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZGlzYWJsZVRyYWNrRW5jb2RpbmcodHJhY2tJZCwgZW5jb2RpbmcpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbGV0IHRyYWNrID0gKF9hID0gdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRyYWNrO1xuICAgICAgICB0aGlzLmRpc2FibGVkVHJhY2tFbmNvZGluZ3MuZ2V0KHRyYWNrSWQpLnB1c2goZW5jb2RpbmcpO1xuICAgICAgICBsZXQgc2VuZGVyID0gKF9iID0gdGhpcy5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0U2VuZGVycygpLmZpbHRlcigoc2VuZGVyKSA9PiBzZW5kZXIudHJhY2sgPT09IHRyYWNrKVswXTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHNlbmRlciA9PT0gbnVsbCB8fCBzZW5kZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbmRlci5nZXRQYXJhbWV0ZXJzKCk7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MuZmlsdGVyKChlbikgPT4gZW4ucmlkID09IGVuY29kaW5nKVswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2VuZGVyID09PSBudWxsIHx8IHNlbmRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VuZGVyLnNldFBhcmFtZXRlcnMocGFyYW1zKTtcbiAgICB9XG4gICAgZmluZFNlbmRlcih0cmFja0lkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uZ2V0U2VuZGVycygpLmZpbmQoKHNlbmRlcikgPT4gc2VuZGVyLnRyYWNrICYmIHNlbmRlci50cmFjay5pZCA9PT0gdHJhY2tJZCk7XG4gICAgfVxuICAgIGdldFRyYWNrSWQodXVpZCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRQZWVySWQoKX06JHt1dWlkfWA7XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZUFuZFNlbmRPZmZlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3Rpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvZmZlciA9IGF3YWl0IHRoaXMuY29ubmVjdGlvbi5jcmVhdGVPZmZlcigpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24ob2ZmZXIpO1xuICAgICAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSAoMCwgbWVkaWFFdmVudF8xLmdlbmVyYXRlQ3VzdG9tRXZlbnQpKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNkcE9mZmVyXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBzZHBPZmZlcjogb2ZmZXIsXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrSWRUb1RyYWNrTWV0YWRhdGE6IHRoaXMuZ2V0VHJhY2tJZFRvTWV0YWRhdGEoKSxcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tJZFRvVHJhY2tCaXRyYXRlczogdGhpcy5nZXRUcmFja0lkVG9UcmFja0JpdHJhdGVzKCksXG4gICAgICAgICAgICAgICAgICAgIG1pZFRvVHJhY2tJZDogdGhpcy5nZXRNaWRUb1RyYWNrSWQoKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgICAgICAgICAgZm9yIChsZXQgdHJhY2sgb2YgdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgdHJhY2submVnb3RpYXRpb25TdGF0dXMgPSBcIm9mZmVyZWRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5NZW1icmFuZVdlYlJUQyA9IE1lbWJyYW5lV2ViUlRDO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZW1icmFuZVdlYlJUQyA9IHZvaWQgMDtcbnZhciBtZW1icmFuZVdlYlJUQ18xID0gcmVxdWlyZShcIi4vbWVtYnJhbmVXZWJSVENcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNZW1icmFuZVdlYlJUQ1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVtYnJhbmVXZWJSVENfMS5NZW1icmFuZVdlYlJUQzsgfSB9KTtcbiIsICJpbXBvcnQgeyBNZW1icmFuZVdlYlJUQyB9IGZyb20gJ0BqZWxseWZpc2gtZGV2L21lbWJyYW5lLXdlYnJ0Yy1qcyc7XG5cbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3Bob2VuaXgnO1xuXG5jb25zdCB2aWRlb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlkZW9zJyk7XG5cbmZ1bmN0aW9uIGFkZFZpZGVvRWxlbWVudChpZCkge1xuICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gIHZpZGVvLmlkID0gaWQ7XG4gIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgdmlkZW8ucGxheXNJbmxpbmUgPSB0cnVlO1xuICB2aWRlb3MuYXBwZW5kQ2hpbGQodmlkZW8pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVWaWRlb0VsZW1lbnQoaWQpIHtcbiAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIHZpZGVvcy5yZW1vdmVDaGlsZCh2aWRlbyk7XG59XG5cbmZ1bmN0aW9uIHNldEVycm9yTWVzc2FnZShlcnJvcikge1xuICBjb25zb2xlLmVycm9yKGVycm9yKTtcbn1cblxuY2xhc3MgUm9vbSB7XG4gIGNvbnN0cnVjdG9yKGxvY2FsU3RyZWFtLCBzaW11bGNhc3QpIHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtID0gbG9jYWxTdHJlYW07XG4gICAgdGhpcy5wZWVycyA9IFtdO1xuICAgIHRoaXMuc29ja2V0ID0gbmV3IFNvY2tldCgnL3NvY2tldCcpO1xuICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKTtcbiAgICB0aGlzLmRpc3BsYXlOYW1lID0gJ3dlYic7XG4gICAgdGhpcy53ZWJydGNDaGFubmVsID0gdGhpcy5zb2NrZXQuY2hhbm5lbCgncm9vbTpyb29tJyk7XG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbDtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsO1xuICAgIHRoaXMucGVlckVuY29kaW5nID0gJ20nO1xuICAgIHRoaXMuZW5jb2RpbmdzID0gWydsJywgJ20nLCAnaCddO1xuICAgIHRoaXMucGVlck1ldGFkYXRhID0gbnVsbDtcbiAgICB0aGlzLnRyYWNrTWV0YWRhdGEgPSBudWxsO1xuICAgIHRoaXMuc2VsZklkID0gbnVsbDtcbiAgICB0aGlzLnNpbXVsY2FzdCA9IHNpbXVsY2FzdDtcbiAgICB0aGlzLnJlbW90ZVRyYWNrcyA9IG5ldyBNYXAoKTtcblxuICAgIHRoaXMud2VicnRjU29ja2V0UmVmcyA9IFtdO1xuICAgIHRoaXMud2VicnRjU29ja2V0UmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IodGhpcy5sZWF2ZSkpO1xuICAgIHRoaXMud2VicnRjU29ja2V0UmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uQ2xvc2UodGhpcy5sZWF2ZSkpO1xuXG4gICAgdGhpcy53ZWJydGMgPSBuZXcgTWVtYnJhbmVXZWJSVEMoe1xuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIG9uU2VuZE1lZGlhRXZlbnQ6IChtZWRpYUV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1NFTkQgTUVESUEgRVZFTlQnLCBtZWRpYUV2ZW50KTtcbiAgICAgICAgICB0aGlzLndlYnJ0Y0NoYW5uZWwucHVzaCgnbWVkaWFFdmVudCcsIHsgZGF0YTogbWVkaWFFdmVudCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Db25uZWN0aW9uRXJyb3I6IHNldEVycm9yTWVzc2FnZSxcbiAgICAgICAgb25Kb2luU3VjY2VzczogKHBlZXJJZCwgcGVlcnNJblJvb20pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnT04gSk9JTiBTVUNDRVNTJyk7XG4gICAgICAgICAgdGhpcy5zZWxmSWQgPSBwZWVySWQ7XG4gICAgICAgICAgaWYgKHRoaXMubG9jYWxTdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdHJlYW1cbiAgICAgICAgICAgICAgLmdldFRyYWNrcygpXG4gICAgICAgICAgICAgIC5mb3JFYWNoKCh0cmFjaykgPT4gdGhpcy5hZGRUcmFjayh0cmFjaykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucGVlcnMgPSBwZWVyc0luUm9vbTtcbiAgICAgICAgICB0aGlzLnBlZXJzLmZvckVhY2goKHBlZXIpID0+IHtcbiAgICAgICAgICAgIGFkZFZpZGVvRWxlbWVudChwZWVyLmlkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0xpc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Kb2luRXJyb3I6IChtZXRhZGF0YSkgPT4ge1xuICAgICAgICAgIHRocm93IGBQZWVyIGRlbmllZC5gO1xuICAgICAgICB9LFxuICAgICAgICBvblRyYWNrUmVhZHk6IChjdHgpID0+IHtcbiAgICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN0eC5wZWVyLmlkKTtcblxuICAgICAgICAgIHZpZGVvLnNyY09iamVjdCA9IGN0eC5zdHJlYW07XG4gICAgICAgICAgdGhpcy5yZW1vdGVUcmFja3Muc2V0KGN0eC50cmFja0lkLCBjdHgpO1xuICAgICAgICB9LFxuICAgICAgICBvblRyYWNrQWRkZWQ6IChjdHgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGZJZCwgJyB0cmFjayBhZGRlZCAnLCBjdHgudHJhY2tJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVHJhY2tSZW1vdmVkOiAoY3R4KSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdGVUcmFja3MuZGVsZXRlKGN0eC50cmFja0lkKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25QZWVySm9pbmVkOiAocGVlcikgPT4ge1xuICAgICAgICAgIHRoaXMucGVlcnMucHVzaChwZWVyKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0xpc3QoKTtcbiAgICAgICAgICBhZGRWaWRlb0VsZW1lbnQocGVlci5pZCwgcGVlci5tZXRhZGF0YS5kaXNwbGF5TmFtZSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBvblBlZXJMZWZ0OiAocGVlcikgPT4ge1xuICAgICAgICAgIHRoaXMucGVlcnMgPSB0aGlzLnBlZXJzLmZpbHRlcigocCkgPT4gcC5pZCAhPT0gcGVlci5pZCk7XG4gICAgICAgICAgcmVtb3ZlVmlkZW9FbGVtZW50KHBlZXIuaWQpO1xuICAgICAgICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRzTGlzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBvblBlZXJVcGRhdGVkOiAoY3R4KSA9PiB7XG4gICAgICAgICAgdGhpcy5wZWVyTWV0YWRhdGEgPSBjdHgubWV0YWRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVHJhY2tVcGRhdGVkOiAoY3R4KSA9PiB7XG4gICAgICAgICAgdGhpcy50cmFja01ldGFkYXRhID0gY3R4Lm1ldGFkYXRhO1xuICAgICAgICB9LFxuICAgICAgICBvblRyYWNrRW5jb2RpbmdDaGFuZ2VkOiAocGVlcklkLCB0cmFja0lkLCBlbmNvZGluZykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgdGhpcy5zZWxmSWQsXG4gICAgICAgICAgICAncmVjZWl2ZWQgaW5mbyB0aGF0ICcsXG4gICAgICAgICAgICBwZWVySWQsXG4gICAgICAgICAgICAnY2hhbmdlZCBlbmNvZGluZyB0byAnLFxuICAgICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMucGVlckVuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy53ZWJydGNDaGFubmVsLm9uKCdtZWRpYUV2ZW50JywgKGV2ZW50KSA9PlxuICAgICAgdGhpcy53ZWJydGMucmVjZWl2ZU1lZGlhRXZlbnQoZXZlbnQuZGF0YSlcbiAgICApO1xuICB9XG5cbiAgYWRkVHJhY2sgPSAodHJhY2spID0+IHtcbiAgICBsZXQgdHJhY2tJZCA9XG4gICAgICAhdGhpcy5zaW11bGNhc3QgfHwgdHJhY2sua2luZCA9PSAnYXVkaW8nXG4gICAgICAgID8gdGhpcy53ZWJydGMuYWRkVHJhY2sodHJhY2ssIHRoaXMubG9jYWxTdHJlYW0pXG4gICAgICAgIDogdGhpcy53ZWJydGMuYWRkVHJhY2soXG4gICAgICAgICAgICB0cmFjayxcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdHJlYW0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIHsgZW5hYmxlZDogdHJ1ZSwgYWN0aXZlX2VuY29kaW5nczogdGhpcy5lbmNvZGluZ3MgfSxcbiAgICAgICAgICAgIG5ldyBNYXAoW1xuICAgICAgICAgICAgICBbJ2gnLCAxNTAwXSxcbiAgICAgICAgICAgICAgWydtJywgNTAwXSxcbiAgICAgICAgICAgICAgWydsJywgMTAwXSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKTtcblxuICAgIGlmICh0cmFjay5raW5kID09ICdhdWRpbycpIHtcbiAgICAgIHRoaXMuYXVkaW9UcmFjayA9IFt0cmFja0lkLCB0cmFja107XG4gICAgICB0aGlzLndlYnJ0Yy51cGRhdGVUcmFja01ldGFkYXRhKHRoaXMuYXVkaW9UcmFja1swXSwge1xuICAgICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWRlb1RyYWNrID0gW3RyYWNrSWQsIHRyYWNrXTtcbiAgICAgIHRoaXMud2VicnRjLnVwZGF0ZVRyYWNrTWV0YWRhdGEodGhpcy52aWRlb1RyYWNrWzBdLCB7XG4gICAgICAgIHR5cGU6ICdjYW1lcmEnLFxuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLnBob2VuaXhDaGFubmVsUHVzaFJlc3VsdCh0aGlzLndlYnJ0Y0NoYW5uZWwuam9pbigpKTtcbiAgfTtcblxuICBqb2luID0gKCkgPT4ge1xuICAgIHRoaXMud2VicnRjLmpvaW4oeyBkaXNwbGF5TmFtZTogdGhpcy5kaXNwbGF5TmFtZSB9KTtcbiAgfTtcblxuICBsZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLndlYnJ0Yy5sZWF2ZSgpO1xuICAgIHRoaXMud2VicnRjQ2hhbm5lbC5sZWF2ZSgpO1xuICAgIHRoaXMuc29ja2V0Lm9mZih0aGlzLndlYnJ0Y1NvY2tldFJlZnMpO1xuICAgIHdoaWxlICh0aGlzLndlYnJ0Y1NvY2tldFJlZnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy53ZWJydGNTb2NrZXRSZWZzLnBvcCgpO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNMaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhcnRpY2lwYW50c05hbWVzID0gdGhpcy5wZWVycy5tYXAoKHApID0+IHAubWV0YWRhdGEuZGlzcGxheU5hbWUpO1xuXG4gICAgaWYgKHRoaXMuZGlzcGxheU5hbWUpIHtcbiAgICAgIHBhcnRpY2lwYW50c05hbWVzLnB1c2godGhpcy5kaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIHBob2VuaXhDaGFubmVsUHVzaFJlc3VsdCA9IGFzeW5jIChwdXNoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHB1c2hcbiAgICAgICAgLnJlY2VpdmUoJ29rJywgKHJlc3BvbnNlKSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgLnJlY2VpdmUoJ2Vycm9yJywgKHJlc3BvbnNlKSA9PiByZWplY3QocmVzcG9uc2UpKTtcbiAgICB9KTtcbiAgfTtcblxuICBkaXNhYmxlU2ltdWxjYXN0RW5jb2RpbmcgPSAoZW5jb2RpbmcpID0+IHtcbiAgICB0aGlzLndlYnJ0Yy5kaXNhYmxlVHJhY2tFbmNvZGluZyh0aGlzLnZpZGVvVHJhY2tbMF0sIGVuY29kaW5nKTtcbiAgfTtcblxuICBlbmFibGVTaW11bGNhc3RFbmNvZGluZyA9IChlbmNvZGluZykgPT4ge1xuICAgIHRoaXMud2VicnRjLmVuYWJsZVRyYWNrRW5jb2RpbmcodGhpcy52aWRlb1RyYWNrWzBdLCBlbmNvZGluZyk7XG4gIH07XG5cbiAgc2VsZWN0UGVlclNpbXVsY2FzdEVuY29kaW5nID0gKGVuY29kaW5nKSA9PiB7XG4gICAgY29uc3QgcGVlciA9IHRoaXMucGVlcnNbMF07XG4gICAgY29uc3QgdHJhY2tJZHMgPSBBcnJheS5mcm9tKHBlZXIudHJhY2tJZFRvTWV0YWRhdGEua2V5cygpKTtcbiAgICBjb25zdCB2aWRlb1RyYWNrSWRzID0gdHJhY2tJZHMuZmlsdGVyKFxuICAgICAgKHRyYWNrSWQpID0+IHRoaXMucmVtb3RlVHJhY2tzLmdldCh0cmFja0lkKS50cmFjay5raW5kID09ICd2aWRlbydcbiAgICApO1xuICAgIHZpZGVvVHJhY2tJZHMuZm9yRWFjaCgodHJhY2tJZCkgPT5cbiAgICAgIHRoaXMud2VicnRjLnNldFRhcmdldFRyYWNrRW5jb2RpbmcodHJhY2tJZCwgZW5jb2RpbmcpXG4gICAgKTtcbiAgfTtcblxuICBnZXRQZWVyRW5jb2RpbmcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucGVlckVuY29kaW5nO1xuICB9O1xuXG4gIHVwZGF0ZU1ldGFkYXRhID0gKCkgPT4gdGhpcy53ZWJydGMudXBkYXRlUGVlck1ldGFkYXRhKCd0ZXN0Jyk7XG4gIHVwZGF0ZVRyYWNrTWV0YWRhdGEgPSAoKSA9PlxuICAgIHRoaXMud2VicnRjLnVwZGF0ZVRyYWNrTWV0YWRhdGEodGhpcy52aWRlb1RyYWNrWzBdLCAndHJhY2tNZXRhZGF0YScpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwgIi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsdWUpID0+IHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgIHJldHVybiB2YWx1ZVxuICB9IGVsc2Uge1xuICAgIGxldCBjbG9zdXJlID0gZnVuY3Rpb24gKCl7IHJldHVybiB2YWx1ZSB9XG4gICAgcmV0dXJuIGNsb3N1cmVcbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBnbG9iYWxTZWxmID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogbnVsbFxuZXhwb3J0IGNvbnN0IHBoeFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsXG5leHBvcnQgY29uc3QgZ2xvYmFsID0gZ2xvYmFsU2VsZiB8fCBwaHhXaW5kb3cgfHwgZ2xvYmFsXG5leHBvcnQgY29uc3QgREVGQVVMVF9WU04gPSBcIjIuMC4wXCJcbmV4cG9ydCBjb25zdCBTT0NLRVRfU1RBVEVTID0ge2Nvbm5lY3Rpbmc6IDAsIG9wZW46IDEsIGNsb3Npbmc6IDIsIGNsb3NlZDogM31cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMFxuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDBcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NUQVRFUyA9IHtcbiAgY2xvc2VkOiBcImNsb3NlZFwiLFxuICBlcnJvcmVkOiBcImVycm9yZWRcIixcbiAgam9pbmVkOiBcImpvaW5lZFwiLFxuICBqb2luaW5nOiBcImpvaW5pbmdcIixcbiAgbGVhdmluZzogXCJsZWF2aW5nXCIsXG59XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9FVkVOVFMgPSB7XG4gIGNsb3NlOiBcInBoeF9jbG9zZVwiLFxuICBlcnJvcjogXCJwaHhfZXJyb3JcIixcbiAgam9pbjogXCJwaHhfam9pblwiLFxuICByZXBseTogXCJwaHhfcmVwbHlcIixcbiAgbGVhdmU6IFwicGh4X2xlYXZlXCJcbn1cblxuZXhwb3J0IGNvbnN0IFRSQU5TUE9SVFMgPSB7XG4gIGxvbmdwb2xsOiBcImxvbmdwb2xsXCIsXG4gIHdlYnNvY2tldDogXCJ3ZWJzb2NrZXRcIlxufVxuZXhwb3J0IGNvbnN0IFhIUl9TVEFURVMgPSB7XG4gIGNvbXBsZXRlOiA0XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KXtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZCB8fCBmdW5jdGlvbiAoKXsgcmV0dXJuIHt9IH1cbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5yZWNIb29rcyA9IFtdXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgKi9cbiAgcmVzZW5kKHRpbWVvdXQpe1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLnNlbmQoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZW5kKCl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChcInRpbWVvdXRcIikpeyByZXR1cm4gfVxuICAgIHRoaXMuc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLnNlbnQgPSB0cnVlXG4gICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCgpLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoc3RhdHVzKSl7XG4gICAgICBjYWxsYmFjayh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlY0hvb2tzLnB1c2goe3N0YXR1cywgY2FsbGJhY2t9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgdGhpcy5yZWYgPSBudWxsXG4gICAgdGhpcy5yZWZFdmVudCA9IG51bGxcbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXRjaFJlY2VpdmUoe3N0YXR1cywgcmVzcG9uc2UsIF9yZWZ9KXtcbiAgICB0aGlzLnJlY0hvb2tzLmZpbHRlcihoID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAuZm9yRWFjaChoID0+IGguY2FsbGJhY2socmVzcG9uc2UpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxSZWZFdmVudCgpe1xuICAgIGlmKCF0aGlzLnJlZkV2ZW50KXsgcmV0dXJuIH1cbiAgICB0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZW91dCgpe1xuICAgIGlmKHRoaXMudGltZW91dFRpbWVyKXsgdGhpcy5jYW5jZWxUaW1lb3V0KCkgfVxuICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5tYWtlUmVmKClcbiAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKHRoaXMucmVmRXZlbnQsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgICB0aGlzLmNhbmNlbFRpbWVvdXQoKVxuICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkXG4gICAgICB0aGlzLm1hdGNoUmVjZWl2ZShwYXlsb2FkKVxuICAgIH0pXG5cbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKFwidGltZW91dFwiLCB7fSlcbiAgICB9LCB0aGlzLnRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhc1JlY2VpdmVkKHN0YXR1cyl7XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSl7XG4gICAgdGhpcy5jaGFubmVsLnRyaWdnZXIodGhpcy5yZWZFdmVudCwge3N0YXR1cywgcmVzcG9uc2V9KVxuICB9XG59XG4iLCAiLyoqXG4gKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm1cbiAqIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9KVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aW1lckNhbGNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKXtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsY1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gICAgdGhpcy50cmllcyA9IDBcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmllcyA9IDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgKi9cbiAgc2NoZWR1bGVUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG5cbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDFcbiAgICAgIHRoaXMuY2FsbGJhY2soKVxuICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSlcbiAgfVxufVxuIiwgImltcG9ydCB7Y2xvc3VyZX0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIENIQU5ORUxfU1RBVEVTLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgUHVzaCBmcm9tIFwiLi9wdXNoXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gcGFyYW1zXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgcGFyYW1zLCBzb2NrZXQpe1xuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdXG4gICAgdGhpcy5iaW5kaW5nUmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXRcbiAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZVxuICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KVxuICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMgPSBbXVxuXG4gICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSwgdGhpcy5zb2NrZXQucmVqb2luQWZ0ZXJNcylcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IoKCkgPT4gdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpKSlcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuaXNFcnJvcmVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9KVxuICAgIClcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkXG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKHB1c2hFdmVudCA9PiBwdXNoRXZlbnQuc2VuZCgpKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuam9pblJlZigpfWApXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmUodGhpcylcbiAgICB9KVxuICAgIHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pXG4gICAgICBpZih0aGlzLmlzSm9pbmluZygpKXsgdGhpcy5qb2luUHVzaC5yZXNldCgpIH1cbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGB0aW1lb3V0ICR7dGhpcy50b3BpY30gKCR7dGhpcy5qb2luUmVmKCl9KWAsIHRoaXMuam9pblB1c2gudGltZW91dClcbiAgICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRoaXMudGltZW91dClcbiAgICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICB0aGlzLmpvaW5QdXNoLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLnJlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRyaWVkIHRvIGpvaW4gbXVsdGlwbGUgdGltZXMuICdqb2luJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlXG4gICAgICB0aGlzLnJlam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5qb2luUHVzaFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBjbG9zZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgZXJyb3JzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwgcmVhc29uID0+IGNhbGxiYWNrKHJlYXNvbikpXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyBvbiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBTdWJzY3JpcHRpb24gcmV0dXJucyBhIHJlZiBjb3VudGVyLCB3aGljaCBjYW4gYmUgdXNlZCBsYXRlciB0b1xuICAgKiB1bnN1YnNjcmliZSB0aGUgZXhhY3QgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY29uc3QgcmVmMiA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19vdGhlcl9zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKiAvLyBTaW5jZSB1bnN1YnNjcmlwdGlvbiwgZG9fc3R1ZmYgd29uJ3QgZmlyZSxcbiAgICogLy8gd2hpbGUgZG9fb3RoZXJfc3R1ZmYgd2lsbCBrZWVwIGZpcmluZyBvbiB0aGUgXCJldmVudFwiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLmJpbmRpbmdSZWYrK1xuICAgIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQsIHJlZiwgY2FsbGJhY2t9KVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgb2ZmIG9mIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFVzZSB0aGUgcmVmIHJldHVybmVkIGZyb20gYSBjaGFubmVsLm9uKCkgdG8gdW5zdWJzY3JpYmUgb25lXG4gICAqIGhhbmRsZXIsIG9yIHBhc3Mgbm90aGluZyBmb3IgdGhlIHJlZiB0byB1bnN1YnNjcmliZSBhbGxcbiAgICogaGFuZGxlcnMgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5zdWJzY3JpYmUgdGhlIGRvX3N0dWZmIGhhbmRsZXJcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKlxuICAgKiAvLyBVbnN1YnNjcmliZSBhbGwgaGFuZGxlcnMgZnJvbSBldmVudFxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb2ZmKGV2ZW50LCByZWYpe1xuICAgIHRoaXMuYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgcmV0dXJuICEoYmluZC5ldmVudCA9PT0gZXZlbnQgJiYgKHR5cGVvZiByZWYgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVmID09PSBiaW5kLnJlZikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuUHVzaCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLmlzSm9pbmVkKCkgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYGV2ZW50YCB0byBwaG9lbml4IHdpdGggdGhlIHBheWxvYWQgYHBheWxvYWRgLlxuICAgKiBQaG9lbml4IHJlY2VpdmVzIHRoaXMgaW4gdGhlIGBoYW5kbGVfaW4oZXZlbnQsIHBheWxvYWQsIHNvY2tldClgXG4gICAqIGZ1bmN0aW9uLiBpZiBwaG9lbml4IHJlcGxpZXMgb3IgaXQgdGltZXMgb3V0IChkZWZhdWx0IDEwMDAwbXMpLFxuICAgKiB0aGVuIG9wdGlvbmFsbHkgdGhlIHJlcGx5IGNhbiBiZSByZWNlaXZlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5wdXNoKFwiZXZlbnRcIilcbiAgICogICAucmVjZWl2ZShcIm9rXCIsIHBheWxvYWQgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IHJlcGxpZWQ6XCIsIHBheWxvYWQpKVxuICAgKiAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgZXJyID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCBlcnJvcmVkXCIsIGVycikpXG4gICAqICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IGNvbnNvbGUubG9nKFwidGltZWQgb3V0IHB1c2hpbmdcIikpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdXG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge31cbiAgICBpZighdGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2ApXG4gICAgfVxuICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgZnVuY3Rpb24gKCl7IHJldHVybiBwYXlsb2FkIH0sIHRpbWVvdXQpXG4gICAgaWYodGhpcy5jYW5QdXNoKCkpe1xuICAgICAgcHVzaEV2ZW50LnNlbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudClcbiAgICB9XG5cbiAgICByZXR1cm4gcHVzaEV2ZW50XG4gIH1cblxuICAvKiogTGVhdmVzIHRoZSBjaGFubmVsXG4gICAqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZFxuICAgKiBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyXG4gICAqXG4gICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rc1xuICAgKlxuICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYHJlY2VpdmVgXG4gICAqIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAqXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGxlYXZlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgIHRoaXMuam9pblB1c2guY2FuY2VsVGltZW91dCgpXG5cbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZ1xuICAgIGxldCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGxlYXZlICR7dGhpcy50b3BpY31gKVxuICAgICAgdGhpcy50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBcImxlYXZlXCIpXG4gICAgfVxuICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRpbWVvdXQpXG4gICAgbGVhdmVQdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICBpZighdGhpcy5jYW5QdXNoKCkpeyBsZWF2ZVB1c2gudHJpZ2dlcihcIm9rXCIsIHt9KSB9XG5cbiAgICByZXR1cm4gbGVhdmVQdXNoXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAqXG4gICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmdcbiAgICogYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICpcbiAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBvbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKXsgcmV0dXJuIHBheWxvYWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpKXtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIFwiZHJvcHBpbmcgb3V0ZGF0ZWQgbWVzc2FnZVwiLCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgam9pblJlZigpeyByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWYgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuaXNMZWF2aW5nKCkpeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LmxlYXZlT3BlblRvcGljKHRoaXMudG9waWMpXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmdcbiAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpe1xuICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMub25NZXNzYWdlKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpXG4gICAgaWYocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpeyB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcIikgfVxuXG4gICAgbGV0IGV2ZW50QmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcihiaW5kID0+IGJpbmQuZXZlbnQgPT09IGV2ZW50KVxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50QmluZGluZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGJpbmQgPSBldmVudEJpbmRpbmdzW2ldXG4gICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYsIGpvaW5SZWYgfHwgdGhpcy5qb2luUmVmKCkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXBseUV2ZW50TmFtZShyZWYpeyByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Nsb3NlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzRXJyb3JlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5lZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZyB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0xlYXZpbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmcgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgWEhSX1NUQVRFU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcblxuICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIGlmKGdsb2JhbC5YRG9tYWluUmVxdWVzdCl7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpIC8vIElFOCwgSUU5XG4gICAgICByZXR1cm4gdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICByZXR1cm4gdGhpcy54aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB4ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQpXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICAvLyBXb3JrIGFyb3VuZCBidWcgaW4gSUU5IHRoYXQgcmVxdWlyZXMgYW4gYXR0YWNoZWQgb25wcm9ncmVzcyBoYW5kbGVyXG4gICAgcmVxLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gICAgcmV0dXJuIHJlcVxuICB9XG5cbiAgc3RhdGljIHhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQsIHRydWUpXG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgYWNjZXB0KVxuICAgIHJlcS5vbmVycm9yID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbClcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IFhIUl9TVEFURVMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUpTT04ocmVzcCl7XG4gICAgaWYoIXJlc3AgfHwgcmVzcCA9PT0gXCJcIil7IHJldHVybiBudWxsIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwKVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsIHJlc3ApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemUob2JqLCBwYXJlbnRLZXkpe1xuICAgIGxldCBxdWVyeVN0ciA9IFtdXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgIGlmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKXsgY29udGludWUgfVxuICAgICAgbGV0IHBhcmFtS2V5ID0gcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleVxuICAgICAgbGV0IHBhcmFtVmFsID0gb2JqW2tleV1cbiAgICAgIGlmKHR5cGVvZiBwYXJhbVZhbCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2godGhpcy5zZXJpYWxpemUocGFyYW1WYWwsIHBhcmFtS2V5KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyLmpvaW4oXCImXCIpXG4gIH1cblxuICBzdGF0aWMgYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKXtcbiAgICBpZihPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCl7IHJldHVybiB1cmwgfVxuXG4gICAgbGV0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyBcIiZcIiA6IFwiP1wiXG4gICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3RoaXMuc2VyaWFsaXplKHBhcmFtcyl9YFxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9uZ1BvbGwge1xuXG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50KXtcbiAgICB0aGlzLmVuZFBvaW50ID0gbnVsbFxuICAgIHRoaXMudG9rZW4gPSBudWxsXG4gICAgdGhpcy5za2lwSGVhcnRiZWF0ID0gdHJ1ZVxuICAgIHRoaXMucmVxcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5wb2xsRW5kcG9pbnQgPSB0aGlzLm5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICAgIHRoaXMucG9sbCgpXG4gIH1cblxuICBub3JtYWxpemVFbmRwb2ludChlbmRQb2ludCl7XG4gICAgcmV0dXJuIChlbmRQb2ludFxuICAgICAgLnJlcGxhY2UoXCJ3czovL1wiLCBcImh0dHA6Ly9cIilcbiAgICAgIC5yZXBsYWNlKFwid3NzOi8vXCIsIFwiaHR0cHM6Ly9cIilcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoLiopXFwvXCIgKyBUUkFOU1BPUlRTLndlYnNvY2tldCksIFwiJDEvXCIgKyBUUkFOU1BPUlRTLmxvbmdwb2xsKSlcbiAgfVxuXG4gIGVuZHBvaW50VVJMKCl7XG4gICAgcmV0dXJuIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMucG9sbEVuZHBvaW50LCB7dG9rZW46IHRoaXMudG9rZW59KVxuICB9XG5cbiAgY2xvc2VBbmRSZXRyeShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICB0aGlzLmNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gIH1cblxuICBvbnRpbWVvdXQoKXtcbiAgICB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpXG4gICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMDUsIFwidGltZW91dFwiLCBmYWxzZSlcbiAgfVxuXG4gIGlzQWN0aXZlKCl7IHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMub3BlbiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZyB9XG5cbiAgcG9sbCgpe1xuICAgIHRoaXMuYWpheChcIkdFVFwiLCBudWxsLCAoKSA9PiB0aGlzLm9udGltZW91dCgpLCByZXNwID0+IHtcbiAgICAgIGlmKHJlc3Ape1xuICAgICAgICB2YXIge3N0YXR1cywgdG9rZW4sIG1lc3NhZ2VzfSA9IHJlc3BcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMgPSAwXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlIDIwMDpcbiAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBUYXNrcyBhcmUgd2hhdCB0aGluZ3MgbGlrZSBldmVudCBoYW5kbGVycywgc2V0VGltZW91dCBjYWxsYmFja3MsXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJlc29sdmVzIGFuZCBtb3JlIGFyZSBydW4gd2l0aGluLlxuICAgICAgICAgICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzLCB0aGVyZSBhcmUgdHdvIGRpZmZlcmVudCBraW5kcyBvZiB0YXNrcyxcbiAgICAgICAgICAgIC8vIG1pY3JvdGFza3MgYW5kIG1hY3JvdGFza3MuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFyZSBtYWlubHkgdXNlZCBmb3IgUHJvbWlzZXMsIHdoaWxlIG1hY3JvdGFza3MgYXJlXG4gICAgICAgICAgICAvLyB1c2VkIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFsd2F5cyBoYXZlIHByaW9yaXR5IG92ZXIgbWFjcm90YXNrcy4gSWYgdGhlIEpTIGVuZ2luZVxuICAgICAgICAgICAgLy8gaXMgbG9va2luZyBmb3IgYSB0YXNrIHRvIHJ1biwgaXQgd2lsbCBhbHdheXMgdHJ5IHRvIGVtcHR5IHRoZVxuICAgICAgICAgICAgLy8gbWljcm90YXNrIHF1ZXVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJ1biBhbnl0aGluZyBmcm9tIHRoZVxuICAgICAgICAgICAgLy8gbWFjcm90YXNrIHF1ZXVlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEZvciB0aGUgV2ViU29ja2V0IHRyYW5zcG9ydCwgbWVzc2FnZXMgYWx3YXlzIGFycml2ZSBpbiB0aGVpciBvd25cbiAgICAgICAgICAgIC8vIGV2ZW50LiBUaGlzIG1lYW5zIHRoYXQgaWYgYW55IHByb21pc2VzIGFyZSByZXNvbHZlZCBmcm9tIHdpdGhpbixcbiAgICAgICAgICAgIC8vIHRoZWlyIGNhbGxiYWNrcyB3aWxsIGFsd2F5cyBmaW5pc2ggZXhlY3V0aW9uIGJ5IHRoZSB0aW1lIHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBtZXNzYWdlIGV2ZW50IGhhbmRsZXIgaXMgcnVuLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGVtdWxhdGUgdGhpcyBiZWhhdmlvdXIsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGVhY2hcbiAgICAgICAgICAgIC8vIG9ubWVzc2FnZSBoYW5kbGVyIGlzIHJ1biB3aXRoaW4gaXQncyBvd24gbWFjcm90YXNrLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSksIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNDAzKVxuICAgICAgICAgIHRoaXMuY2xvc2UoMTAwOCwgXCJmb3JiaWRkZW5cIiwgZmFsc2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNTAwKVxuICAgICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCA1MDApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGB1bmhhbmRsZWQgcG9sbCBzdGF0dXMgJHtzdGF0dXN9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2VuZChib2R5KXtcbiAgICB0aGlzLmFqYXgoXCJQT1NUXCIsIGJvZHksICgpID0+IHRoaXMub25lcnJvcihcInRpbWVvdXRcIiksIHJlc3AgPT4ge1xuICAgICAgaWYoIXJlc3AgfHwgcmVzcC5zdGF0dXMgIT09IDIwMCl7XG4gICAgICAgIHRoaXMub25lcnJvcihyZXNwICYmIHJlc3Auc3RhdHVzKVxuICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAxMSwgXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pe1xuICAgIGZvcihsZXQgcmVxIG9mIHRoaXMucmVxcyl7IHJlcS5hYm9ydCgpIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNsb3NlZFxuICAgIGxldCBvcHRzID0gT2JqZWN0LmFzc2lnbih7Y29kZTogMTAwMCwgcmVhc29uOiB1bmRlZmluZWQsIHdhc0NsZWFuOiB0cnVlfSwge2NvZGUsIHJlYXNvbiwgd2FzQ2xlYW59KVxuICAgIGlmKHR5cGVvZihDbG9zZUV2ZW50KSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICB0aGlzLm9uY2xvc2UobmV3IENsb3NlRXZlbnQoXCJjbG9zZVwiLCBvcHRzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNsb3NlKG9wdHMpXG4gICAgfVxuICB9XG5cbiAgYWpheChtZXRob2QsIGJvZHksIG9uQ2FsbGVyVGltZW91dCwgY2FsbGJhY2spe1xuICAgIGxldCByZXFcbiAgICBsZXQgb250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZXFzLmRlbGV0ZShyZXEpXG4gICAgICBvbkNhbGxlclRpbWVvdXQoKVxuICAgIH1cbiAgICByZXEgPSBBamF4LnJlcXVlc3QobWV0aG9kLCB0aGlzLmVuZHBvaW50VVJMKCksIFwiYXBwbGljYXRpb24vanNvblwiLCBib2R5LCB0aGlzLnRpbWVvdXQsIG9udGltZW91dCwgcmVzcCA9PiB7XG4gICAgICB0aGlzLnJlcXMuZGVsZXRlKHJlcSlcbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUoKSl7IGNhbGxiYWNrKHJlc3ApIH1cbiAgICB9KVxuICAgIHRoaXMucmVxcy5hZGQocmVxKVxuICB9XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2VcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICogICAgICAgIGZvciBleGFtcGxlIGB7ZXZlbnRzOiB7c3RhdGU6IFwic3RhdGVcIiwgZGlmZjogXCJkaWZmXCJ9fWBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VuY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV2ZW50cyA9IG9wdHMuZXZlbnRzIHx8IHtzdGF0ZTogXCJwcmVzZW5jZV9zdGF0ZVwiLCBkaWZmOiBcInByZXNlbmNlX2RpZmZcIn1cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuam9pblJlZiA9IG51bGxcbiAgICB0aGlzLmNhbGxlciA9IHtcbiAgICAgIG9uSm9pbjogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uU3luYzogZnVuY3Rpb24gKCl7IH1cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLnN0YXRlLCBuZXdTdGF0ZSA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jU3RhdGUodGhpcy5zdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSlcblxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaChkaWZmID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgICBvblN5bmMoKVxuICAgIH0pXG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLmRpZmYsIGRpZmYgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICBpZih0aGlzLmluUGVuZGluZ1N5bmNTdGF0ZSgpKXtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMucHVzaChkaWZmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgICAgb25TeW5jKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25Kb2luKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25Kb2luID0gY2FsbGJhY2sgfVxuXG4gIG9uTGVhdmUoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkxlYXZlID0gY2FsbGJhY2sgfVxuXG4gIG9uU3luYyhjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrIH1cblxuICBsaXN0KGJ5KXsgcmV0dXJuIFByZXNlbmNlLmxpc3QodGhpcy5zdGF0ZSwgYnkpIH1cblxuICBpblBlbmRpbmdTeW5jU3RhdGUoKXtcbiAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCAodGhpcy5qb2luUmVmICE9PSB0aGlzLmNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLy8gbG93ZXItbGV2ZWwgcHVibGljIHN0YXRpYyBBUElcblxuICAvKipcbiAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyXG4gICAqIHdpdGggdGhlIGNsaWVudCdzIHN0YXRlLiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhblxuICAgKiBiZSBwcm92aWRlZCB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZSBjbGllbnQncyBsb2NhbCBwcmVzZW5jZXMgYWNyb3NzXG4gICAqIGRpc2Nvbm5lY3RzIGFuZCByZWNvbm5lY3RzIHdpdGggdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNTdGF0ZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCBzdGF0ZSA9IHRoaXMuY2xvbmUoY3VycmVudFN0YXRlKVxuICAgIGxldCBqb2lucyA9IHt9XG4gICAgbGV0IGxlYXZlcyA9IHt9XG5cbiAgICB0aGlzLm1hcChzdGF0ZSwgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIGlmKCFuZXdTdGF0ZVtrZXldKXtcbiAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5tYXAobmV3U3RhdGUsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IG5ld1JlZnMgPSBuZXdQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJSZWZzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGpvaW5lZE1ldGFzID0gbmV3UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gY3VyUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBsZXQgbGVmdE1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IG5ld1JlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgaWYoam9pbmVkTWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICAgICAgam9pbnNba2V5XS5tZXRhcyA9IGpvaW5lZE1ldGFzXG4gICAgICAgIH1cbiAgICAgICAgaWYobGVmdE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGxlYXZlc1trZXldID0gdGhpcy5jbG9uZShjdXJyZW50UHJlc2VuY2UpXG4gICAgICAgICAgbGVhdmVzW2tleV0ubWV0YXMgPSBsZWZ0TWV0YXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5zeW5jRGlmZihzdGF0ZSwge2pvaW5zOiBqb2lucywgbGVhdmVzOiBsZWF2ZXN9LCBvbkpvaW4sIG9uTGVhdmUpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXNlZCB0byBzeW5jIGEgZGlmZiBvZiBwcmVzZW5jZSBqb2luIGFuZCBsZWF2ZVxuICAgKiBldmVudHMgZnJvbSB0aGUgc2VydmVyLCBhcyB0aGV5IGhhcHBlbi4gTGlrZSBgc3luY1N0YXRlYCwgYHN5bmNEaWZmYFxuICAgKiBhY2NlcHRzIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2tzIHRvIHJlYWN0IHRvIGEgdXNlclxuICAgKiBqb2luaW5nIG9yIGxlYXZpbmcgZnJvbSBhIGRldmljZS5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNEaWZmKHN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCB7am9pbnMsIGxlYXZlc30gPSB0aGlzLmNsb25lKGRpZmYpXG4gICAgaWYoIW9uSm9pbil7IG9uSm9pbiA9IGZ1bmN0aW9uICgpeyB9IH1cbiAgICBpZighb25MZWF2ZSl7IG9uTGVhdmUgPSBmdW5jdGlvbiAoKXsgfSB9XG5cbiAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZShuZXdQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBqb2luZWRSZWZzID0gc3RhdGVba2V5XS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBqb2luZWRSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIHN0YXRlW2tleV0ubWV0YXMudW5zaGlmdCguLi5jdXJNZXRhcylcbiAgICAgIH1cbiAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZSwgbmV3UHJlc2VuY2UpXG4gICAgfSlcbiAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKCFjdXJyZW50UHJlc2VuY2UpeyByZXR1cm4gfVxuICAgICAgbGV0IHJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICBjdXJyZW50UHJlc2VuY2UubWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKHAgPT4ge1xuICAgICAgICByZXR1cm4gcmVmc1RvUmVtb3ZlLmluZGV4T2YocC5waHhfcmVmKSA8IDBcbiAgICAgIH0pXG4gICAgICBvbkxlYXZlKGtleSwgY3VycmVudFByZXNlbmNlLCBsZWZ0UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2UubWV0YXMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgZGVsZXRlIHN0YXRlW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHByZXNlbmNlcywgd2l0aCBzZWxlY3RlZCBtZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXNlbmNlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaG9vc2VyXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBsaXN0KHByZXNlbmNlcywgY2hvb3Nlcil7XG4gICAgaWYoIWNob29zZXIpeyBjaG9vc2VyID0gZnVuY3Rpb24gKGtleSwgcHJlcyl7IHJldHVybiBwcmVzIH0gfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwKHByZXNlbmNlcywgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIHJldHVybiBjaG9vc2VyKGtleSwgcHJlc2VuY2UpXG4gICAgfSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBzdGF0aWMgbWFwKG9iaiwgZnVuYyl7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubWFwKGtleSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKVxuICB9XG5cbiAgc3RhdGljIGNsb25lKG9iail7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cbn1cbiIsICIvKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgbWVzc2FnZXMgKi9cbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSEVBREVSX0xFTkdUSDogMSxcbiAgTUVUQV9MRU5HVEg6IDQsXG4gIEtJTkRTOiB7cHVzaDogMCwgcmVwbHk6IDEsIGJyb2FkY2FzdDogMn0sXG5cbiAgZW5jb2RlKG1zZywgY2FsbGJhY2spe1xuICAgIGlmKG1zZy5wYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlFbmNvZGUobXNnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBheWxvYWQgPSBbbXNnLmpvaW5fcmVmLCBtc2cucmVmLCBtc2cudG9waWMsIG1zZy5ldmVudCwgbXNnLnBheWxvYWRdXG4gICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjayl7XG4gICAgaWYocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZF0gPSBKU09OLnBhcnNlKHJhd1BheWxvYWQpXG4gICAgICByZXR1cm4gY2FsbGJhY2soe2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICBiaW5hcnlFbmNvZGUobWVzc2FnZSl7XG4gICAgbGV0IHtqb2luX3JlZiwgcmVmLCBldmVudCwgdG9waWMsIHBheWxvYWR9ID0gbWVzc2FnZVxuICAgIGxldCBtZXRhTGVuZ3RoID0gdGhpcy5NRVRBX0xFTkdUSCArIGpvaW5fcmVmLmxlbmd0aCArIHJlZi5sZW5ndGggKyB0b3BpYy5sZW5ndGggKyBldmVudC5sZW5ndGhcbiAgICBsZXQgaGVhZGVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuSEVBREVSX0xFTkdUSCArIG1ldGFMZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyKVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0aGlzLktJTkRTLnB1c2gpIC8vIGtpbmRcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBqb2luX3JlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0b3BpYy5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgZXZlbnQubGVuZ3RoKVxuICAgIEFycmF5LmZyb20oam9pbl9yZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHJlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20odG9waWMsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKGV2ZW50LCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbiAgICB2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIuYnl0ZUxlbmd0aCArIHBheWxvYWQuYnl0ZUxlbmd0aClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkoaGVhZGVyKSwgMClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkocGF5bG9hZCksIGhlYWRlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkLmJ1ZmZlclxuICB9LFxuXG4gIGJpbmFyeURlY29kZShidWZmZXIpe1xuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICBsZXQga2luZCA9IHZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSB0aGlzLktJTkRTLnB1c2g6IHJldHVybiB0aGlzLmRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLnJlcGx5OiByZXR1cm4gdGhpcy5kZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMuYnJvYWRjYXN0OiByZXR1cm4gdGhpcy5kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSCAtIDEgLy8gcHVzaGVzIGhhdmUgbm8gcmVmXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9LFxuXG4gIGRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCByZWZTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoNClcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSFxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICBsZXQgcGF5bG9hZCA9IHtzdGF0dXM6IGV2ZW50LCByZXNwb25zZTogZGF0YX1cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IHJlZiwgdG9waWM6IHRvcGljLCBldmVudDogQ0hBTk5FTF9FVkVOVFMucmVwbHksIHBheWxvYWQ6IHBheWxvYWR9XG4gIH0sXG5cbiAgZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBudWxsLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBwaHhXaW5kb3csXG4gIENIQU5ORUxfRVZFTlRTLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfVlNOLFxuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTLFxuICBXU19DTE9TRV9OT1JNQUxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvc3VyZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuaW1wb3J0IENoYW5uZWwgZnJvbSBcIi4vY2hhbm5lbFwiXG5pbXBvcnQgTG9uZ1BvbGwgZnJvbSBcIi4vbG9uZ3BvbGxcIlxuaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSBcIi4vc2VyaWFsaXplclwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKiogSW5pdGlhbGl6ZXMgdGhlIFNvY2tldCAqXG4gKlxuICogRm9yIElFOCBzdXBwb3J0IHVzZSBhbiBFUzUtc2hpbSAoaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3M6Ly9leGFtcGxlLmNvbS9zb2NrZXRcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwid3NzOi8vZXhhbXBsZS5jb21cImBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvc29ja2V0XCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnRyYW5zcG9ydF0gLSBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0IG9yIFBob2VuaXguTG9uZ1BvbGwuXG4gKlxuICogRGVmYXVsdHMgdG8gV2ViU29ja2V0IHdpdGggYXV0b21hdGljIExvbmdQb2xsIGZhbGxiYWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZW5jb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBlbmNvZGUgb3V0Z29pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTiBlbmNvZGVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmRlY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZGVjb2RlIGluY29taW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT046XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnBhcnNlKHBheWxvYWQpKVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVvdXRdIC0gVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICpcbiAqIERlZmF1bHRzIGBERUZBVUxUX1RJTUVPVVRgXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNc10gLSBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVjb25uZWN0QWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsaXNlY1xuICogc29ja2V0IHJlY29ubmVjdCBpbnRlcnZhbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBzdGVwcGVkIGJhY2tvZmYgb2Y6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWpvaW5BZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxpc2VjXG4gKiByZWpvaW4gaW50ZXJ2YWwgZm9yIGluZGl2aWR1YWwgY2hhbm5lbHMuXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5sb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLCBpZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbihraW5kLCBtc2csIGRhdGEpIHtcbiAqICAgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMubG9uZ3BvbGxlclRpbWVvdXRdIC0gVGhlIG1heGltdW0gdGltZW91dCBvZiBhIGxvbmcgcG9sbCBBSkFYIHJlcXVlc3QuXG4gKlxuICogRGVmYXVsdHMgdG8gMjBzIChkb3VibGUgdGhlIHNlcnZlciBsb25nIHBvbGwgdGltZXIpLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IFtvcHRzLnBhcmFtc10gLSBUaGUgb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuYmluYXJ5VHlwZV0gLSBUaGUgYmluYXJ5IHR5cGUgdG8gdXNlIGZvciBiaW5hcnkgV2ViU29ja2V0IGZyYW1lcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBcImFycmF5YnVmZmVyXCJcbiAqXG4gKiBAcGFyYW0ge3Zzbn0gW29wdHMudnNuXSAtIFRoZSBzZXJpYWxpemVyJ3MgcHJvdG9jb2wgdmVyc2lvbiB0byBzZW5kIG9uIGNvbm5lY3QuXG4gKlxuICogRGVmYXVsdHMgdG8gREVGQVVMVF9WU04uXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtvcGVuOiBbXSwgY2xvc2U6IFtdLCBlcnJvcjogW10sIG1lc3NhZ2U6IFtdfVxuICAgIHRoaXMuY2hhbm5lbHMgPSBbXVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVFxuICAgIHRoaXMudHJhbnNwb3J0ID0gb3B0cy50cmFuc3BvcnQgfHwgZ2xvYmFsLldlYlNvY2tldCB8fCBMb25nUG9sbFxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucyA9IDBcbiAgICB0aGlzLmRlZmF1bHRFbmNvZGVyID0gU2VyaWFsaXplci5lbmNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuZGVmYXVsdERlY29kZXIgPSBTZXJpYWxpemVyLmRlY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmJpbmFyeVR5cGUgPSBvcHRzLmJpbmFyeVR5cGUgfHwgXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy5jb25uZWN0Q2xvY2sgPSAxXG4gICAgaWYodGhpcy50cmFuc3BvcnQgIT09IExvbmdQb2xsKXtcbiAgICAgIHRoaXMuZW5jb2RlID0gb3B0cy5lbmNvZGUgfHwgdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSBvcHRzLmRlY29kZSB8fCB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5jb2RlID0gdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfVxuICAgIGxldCBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgIGlmKHBoeFdpbmRvdyAmJiBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSB0aGlzLmNvbm5lY3RDbG9ja1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBfZSA9PiB7XG4gICAgICAgIGlmKGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPT09IHRoaXMuY29ubmVjdENsb2NrKXtcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNcyB8fCAzMDAwMFxuICAgIHRoaXMucmVqb2luQWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWpvaW5BZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVqb2luQWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVjb25uZWN0QWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlY29ubmVjdEFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyIHx8IG51bGxcbiAgICB0aGlzLmxvbmdwb2xsZXJUaW1lb3V0ID0gb3B0cy5sb25ncG9sbGVyVGltZW91dCB8fCAyMDAwMFxuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLmVuZFBvaW50ID0gYCR7ZW5kUG9pbnR9LyR7VFJBTlNQT1JUUy53ZWJzb2NrZXR9YFxuICAgIHRoaXMudnNuID0gb3B0cy52c24gfHwgREVGQVVMVF9WU05cbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IG51bGxcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gbnVsbFxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5jb25uZWN0KCkpXG4gICAgfSwgdGhpcy5yZWNvbm5lY3RBZnRlck1zKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIExvbmdQb2xsIHRyYW5zcG9ydCByZWZlcmVuY2VcbiAgICovXG4gIGdldExvbmdQb2xsVHJhbnNwb3J0KCl7IHJldHVybiBMb25nUG9sbCB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGFuZCByZXBsYWNlcyB0aGUgYWN0aXZlIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdUcmFuc3BvcnQgLSBUaGUgbmV3IHRyYW5zcG9ydCBjbGFzcyB0byBpbnN0YW50aWF0ZVxuICAgKlxuICAgKi9cbiAgcmVwbGFjZVRyYW5zcG9ydChuZXdUcmFuc3BvcnQpe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSB0cnVlXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgdGhpcy5jb25uLmNsb3NlKClcbiAgICAgIHRoaXMuY29ubiA9IG51bGxcbiAgICB9XG4gICAgdGhpcy50cmFuc3BvcnQgPSBuZXdUcmFuc3BvcnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzb2NrZXQgcHJvdG9jb2xcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHByb3RvY29sKCl7IHJldHVybiBsb2NhdGlvbi5wcm90b2NvbC5tYXRjaCgvXmh0dHBzLykgPyBcIndzc1wiIDogXCJ3c1wiIH1cblxuICAvKipcbiAgICogVGhlIGZ1bGx5IHF1YWxpZmllZCBzb2NrZXQgdXJsXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmRQb2ludFVSTCgpe1xuICAgIGxldCB1cmkgPSBBamF4LmFwcGVuZFBhcmFtcyhcbiAgICAgIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMuZW5kUG9pbnQsIHRoaXMucGFyYW1zKCkpLCB7dnNuOiB0aGlzLnZzbn0pXG4gICAgaWYodXJpLmNoYXJBdCgwKSAhPT0gXCIvXCIpeyByZXR1cm4gdXJpIH1cbiAgICBpZih1cmkuY2hhckF0KDEpID09PSBcIi9cIil7IHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9OiR7dXJpfWAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06Ly8ke2xvY2F0aW9uLmhvc3R9JHt1cml9YFxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXRcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50I1N0YXR1c19jb2RlcyBmb3IgdmFsaWQgc3RhdHVzIGNvZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBzb2NrZXQgaXMgZGlzY29ubmVjdGVkLlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGNvZGUgLSBBIHN0YXR1cyBjb2RlIGZvciBkaXNjb25uZWN0aW9uIChPcHRpb25hbCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBBIHRleHR1YWwgZGVzY3JpcHRpb24gb2YgdGhlIHJlYXNvbiB0byBkaXNjb25uZWN0LiAoT3B0aW9uYWwpXG4gICAqL1xuICBkaXNjb25uZWN0KGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSB0cnVlXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy50ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1zIHRvIHNlbmQgd2hlbiBjb25uZWN0aW5nLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IHVzZXJUb2tlbn1gXG4gICAqXG4gICAqIFBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZDsgcGFzcyB0aGVtIGluIHRoZSBTb2NrZXQgY29uc3RydWN0b3IgaW5zdGVhZDpcbiAgICogYG5ldyBTb2NrZXQoXCIvc29ja2V0XCIsIHtwYXJhbXM6IHt1c2VyX2lkOiB1c2VyVG9rZW59fSlgLlxuICAgKi9cbiAgY29ubmVjdChwYXJhbXMpe1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpXG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zKVxuICAgIH1cbiAgICBpZih0aGlzLmNvbm4peyByZXR1cm4gfVxuXG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kUG9pbnRVUkwoKSlcbiAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZVxuICAgIHRoaXMuY29ubi50aW1lb3V0ID0gdGhpcy5sb25ncG9sbGVyVGltZW91dFxuICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLm9uQ29ubk9wZW4oKVxuICAgIHRoaXMuY29ubi5vbmVycm9yID0gZXJyb3IgPT4gdGhpcy5vbkNvbm5FcnJvcihlcnJvcilcbiAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5NZXNzYWdlKGV2ZW50KVxuICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5DbG9zZShldmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSBtZXNzYWdlLiBPdmVycmlkZSBgdGhpcy5sb2dnZXJgIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLiBub29wcyBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBraW5kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIGxvZyhraW5kLCBtc2csIGRhdGEpeyB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgbG9nZ2VyIGhhcyBiZWVuIHNldCBvbiB0aGlzIHNvY2tldC5cbiAgICovXG4gIGhhc0xvZ2dlcigpeyByZXR1cm4gdGhpcy5sb2dnZXIgIT09IG51bGwgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG9wZW4gZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXsgY29uc29sZS5pbmZvKFwidGhlIHNvY2tldCB3YXMgb3BlbmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk9wZW4oY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBjbG9zZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gZXJyb3IgZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbkVycm9yKGZ1bmN0aW9uKGVycm9yKXsgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBtZXNzYWdlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25NZXNzYWdlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFBpbmdzIHRoZSBzZXJ2ZXIgYW5kIGludm9rZXMgdGhlIGNhbGxiYWNrIHdpdGggdGhlIFJUVCBpbiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwaW5nIHdhcyBwdXNoZWQgb3IgZmFsc2UgaWYgdW5hYmxlIHRvIGJlIHB1c2hlZC5cbiAgICovXG4gIHBpbmcoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gZmFsc2UgfVxuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiByZWZ9KVxuICAgIGxldCBvbk1zZ1JlZiA9IHRoaXMub25NZXNzYWdlKG1zZyA9PiB7XG4gICAgICBpZihtc2cucmVmID09PSByZWYpe1xuICAgICAgICB0aGlzLm9mZihbb25Nc2dSZWZdKVxuICAgICAgICBjYWxsYmFjayhEYXRlLm5vdygpIC0gc3RhcnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBjbGVhckhlYXJ0YmVhdHMoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpXG4gIH1cblxuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGNvbm5lY3RlZCB0byAke3RoaXMuZW5kUG9pbnRVUkwoKX1gKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zKytcbiAgICB0aGlzLmZsdXNoU2VuZEJ1ZmZlcigpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5yZXNldEhlYXJ0YmVhdCgpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBoZWFydGJlYXRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpeyB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImhlYXJ0YmVhdCB0aW1lb3V0LiBBdHRlbXB0aW5nIHRvIHJlLWVzdGFibGlzaCBjb25uZWN0aW9uXCIpIH1cbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgICAgdGhpcy50ZWFyZG93bigoKSA9PiB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpLCBXU19DTE9TRV9OT1JNQUwsIFwiaGVhcnRiZWF0IHRpbWVvdXRcIilcbiAgICB9XG4gIH1cblxuICByZXNldEhlYXJ0YmVhdCgpe1xuICAgIGlmKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4uc2tpcEhlYXJ0YmVhdCl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICB9XG5cbiAgdGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgaWYoIXRoaXMuY29ubil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoKCkgPT4ge1xuICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgaWYoY29kZSl7IHRoaXMuY29ubi5jbG9zZShjb2RlLCByZWFzb24gfHwgXCJcIikgfSBlbHNlIHsgdGhpcy5jb25uLmNsb3NlKCkgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICAgIHRoaXMuY29ubi5vbm9wZW4gPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9uZXJyb3IgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4gPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB3YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8ICF0aGlzLmNvbm4uYnVmZmVyZWRBbW91bnQpe1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhaXRGb3JCdWZmZXJEb25lKGNhbGxiYWNrLCB0cmllcyArIDEpXG4gICAgfSwgMTUwICogdHJpZXMpXG4gIH1cblxuICB3YWl0Rm9yU29ja2V0Q2xvc2VkKGNhbGxiYWNrLCB0cmllcyA9IDEpe1xuICAgIGlmKHRyaWVzID09PSA1IHx8ICF0aGlzLmNvbm4gfHwgdGhpcy5jb25uLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY2xvc2VkKXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yU29ja2V0Q2xvc2VkKGNhbGxiYWNrLCB0cmllcyArIDEpXG4gICAgfSwgMTUwICogdHJpZXMpXG4gIH1cblxuICBvbkNvbm5DbG9zZShldmVudCl7XG4gICAgbGV0IGNsb3NlQ29kZSA9IGV2ZW50ICYmIGV2ZW50LmNvZGVcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImNsb3NlXCIsIGV2ZW50KVxuICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgIGlmKCF0aGlzLmNsb3NlV2FzQ2xlYW4gJiYgY2xvc2VDb2RlICE9PSAxMDAwKXtcbiAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKGV2ZW50KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uRXJyb3IoZXJyb3Ipe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGVycm9yKVxuICAgIGxldCB0cmFuc3BvcnRCZWZvcmUgPSB0aGlzLnRyYW5zcG9ydFxuICAgIGxldCBlc3RhYmxpc2hlZEJlZm9yZSA9IHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9uc1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdHJhbnNwb3J0QmVmb3JlLCBlc3RhYmxpc2hlZEJlZm9yZSlcbiAgICB9KVxuICAgIGlmKHRyYW5zcG9ydEJlZm9yZSA9PT0gdGhpcy50cmFuc3BvcnQgfHwgZXN0YWJsaXNoZWRCZWZvcmUgPiAwKXtcbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyQ2hhbkVycm9yKCl7XG4gICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgaWYoIShjaGFubmVsLmlzRXJyb3JlZCgpIHx8IGNoYW5uZWwuaXNMZWF2aW5nKCkgfHwgY2hhbm5lbC5pc0Nsb3NlZCgpKSl7XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBjb25uZWN0aW9uU3RhdGUoKXtcbiAgICBzd2l0Y2godGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKXtcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nOiByZXR1cm4gXCJjb25uZWN0aW5nXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5vcGVuOiByZXR1cm4gXCJvcGVuXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOiByZXR1cm4gXCJjbG9zaW5nXCJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNsb3NlZFwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY29ubmVjdGlvblN0YXRlKCkgPT09IFwib3BlblwiIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIHtDaGFubmVsfVxuICAgKi9cbiAgcmVtb3ZlKGNoYW5uZWwpe1xuICAgIHRoaXMub2ZmKGNoYW5uZWwuc3RhdGVDaGFuZ2VSZWZzKVxuICAgIHRoaXMuY2hhbm5lbHMgPSB0aGlzLmNoYW5uZWxzLmZpbHRlcihjID0+IGMuam9pblJlZigpICE9PSBjaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgIHJlZ2lzdHJhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7cmVmc30gLSBsaXN0IG9mIHJlZnMgcmV0dXJuZWQgYnkgY2FsbHMgdG9cbiAgICogICAgICAgICAgICAgICAgIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgXG4gICAqL1xuICBvZmYocmVmcyl7XG4gICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyl7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0uZmlsdGVyKChbcmVmXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVmcy5pbmRleE9mKHJlZikgPT09IC0xXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgYSBuZXcgY2hhbm5lbCBmb3IgdGhlIGdpdmVuIHRvcGljXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhblBhcmFtcyAtIFBhcmFtZXRlcnMgZm9yIHRoZSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtDaGFubmVsfVxuICAgKi9cbiAgY2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcyA9IHt9KXtcbiAgICBsZXQgY2hhbiA9IG5ldyBDaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zLCB0aGlzKVxuICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFuKVxuICAgIHJldHVybiBjaGFuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIHB1c2goZGF0YSl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBkYXRhXG4gICAgICB0aGlzLmxvZyhcInB1c2hcIiwgYCR7dG9waWN9ICR7ZXZlbnR9ICgke2pvaW5fcmVmfSwgJHtyZWZ9KWAsIHBheWxvYWQpXG4gICAgfVxuXG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaCgoKSA9PiB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBtYWtlUmVmKCl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMVxuICAgIGlmKG5ld1JlZiA9PT0gdGhpcy5yZWYpeyB0aGlzLnJlZiA9IDAgfSBlbHNlIHsgdGhpcy5yZWYgPSBuZXdSZWYgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVmLnRvU3RyaW5nKClcbiAgfVxuXG4gIHNlbmRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgJiYgIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZn0pXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGVhcnRiZWF0VGltZW91dCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICBmbHVzaFNlbmRCdWZmZXIoKXtcbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCA+IDApe1xuICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soKSlcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgfVxuICB9XG5cbiAgb25Db25uTWVzc2FnZShyYXdNZXNzYWdlKXtcbiAgICB0aGlzLmRlY29kZShyYXdNZXNzYWdlLmRhdGEsIG1zZyA9PiB7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBtc2dcbiAgICAgIGlmKHJlZiAmJiByZWYgPT09IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInJlY2VpdmVcIiwgYCR7cGF5bG9hZC5zdGF0dXMgfHwgXCJcIn0gJHt0b3BpY30gJHtldmVudH0gJHtyZWYgJiYgXCIoXCIgKyByZWYgKyBcIilcIiB8fCBcIlwifWAsIHBheWxvYWQpXG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5uZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbaV1cbiAgICAgICAgaWYoIWNoYW5uZWwuaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luX3JlZikpeyBjb250aW51ZSB9XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZilcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBbLCBjYWxsYmFja10gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2VbaV1cbiAgICAgICAgY2FsbGJhY2sobXNnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBsZWF2ZU9wZW5Ub3BpYyh0b3BpYyl7XG4gICAgbGV0IGR1cENoYW5uZWwgPSB0aGlzLmNoYW5uZWxzLmZpbmQoYyA9PiBjLnRvcGljID09PSB0b3BpYyAmJiAoYy5pc0pvaW5lZCgpIHx8IGMuaXNKb2luaW5nKCkpKVxuICAgIGlmKGR1cENoYW5uZWwpe1xuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGxlYXZpbmcgZHVwbGljYXRlIHRvcGljIFwiJHt0b3BpY31cImApXG4gICAgICBkdXBDaGFubmVsLmxlYXZlKClcbiAgICB9XG4gIH1cbn0iLCAiLy8gY2hlY2sgaW50ZXJ2YWwgaXMgdXNlZCB0byBjaGVjayBpZiBmb3IgZ2l2ZW4gdGltZSBpbnRlcnZhbCBhbnkgbmV3IHBhY2tldHMvZnJhbWVzXG4vLyBoYXZlIGJlZW4gcHJvY2Vzc2VkLCBpdCBtYXkgaGFwcGVuIHRoYXQgdHJhY2sgd2FzIHByb2Nlc3NpbmcgbWVkaWEgYmVmb3JlXG4vLyBidXQgc29tZWhvdyBpdCBzdG9wcGVkIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIGNoZWNrIGRlbHRhcyBpbnN0ZWFkIG9mXG5jb25zdCBjaGVja0ludGVydmFsID0gMjAwO1xuXG5mdW5jdGlvbiBkZXRlY3RCcm93c2VyKCkge1xuICBpZiAodHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSB1bmRlZmluZWQpIHJldHVybiBcImZpcmVmb3hcIjtcbiAgaWYgKHdpbmRvdy5jaHJvbWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiY2hyb21lXCI7XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBicm93c2VyIHR5cGVcIik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNsZWVwKGludGVydmFsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgaW50ZXJ2YWwpO1xuICB9KTtcbn1cblxuLy8gc2VhcmNoZXMgdGhyb3VnaCBSVENQU3RhdHMgZW50cmllcyBpdGVyYXRvciBhbmQgdHJpZXNcbi8vIHRvIGZpbmQgYW4gZW50cnkgd2l0aCBhIGtleSBjb21wbHlpbmcgd2l0aCBnaXZlbiBwcmVmaXhcbi8vXG4vLyB3b3JrcyBvbmx5IGZvciBjaHJvbWUuLi5cbmZ1bmN0aW9uIGV4dHJhY3RTdGF0RW50cnkoc3RhdHMsIHByZWZpeCkge1xuICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2Ygc3RhdHMpIHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgocHJlZml4KSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGlzVmlkZW9QbGF5aW5nQ2hyb21lKHBlZXJDb25uZWN0aW9uLCB2aWRlb1RyYWNrKSB7XG4gIGNvbnN0IHZpZGVvRnJhbWVkRGVjb2RlZCA9IGFzeW5jICh0cmFjaykgPT4ge1xuICAgIGlmICghdHJhY2spIHJldHVybiAtMTtcblxuICAgIGNvbnN0IHZpZGVvU3RhdHMgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5nZXRTdGF0cyh0cmFjayk7XG4gICAgY29uc3QgaW5ib3VuZFZpZGVvU3RhdHMgPSBleHRyYWN0U3RhdEVudHJ5KHZpZGVvU3RhdHMsIFwiUlRDSW5ib3VuZFJUUFZpZGVvU3RyZWFtXCIpO1xuXG4gICAgcmV0dXJuIGluYm91bmRWaWRlb1N0YXRzID8gaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVzRGVjb2RlZCA6IC0xO1xuICB9O1xuXG4gIGNvbnN0IHZpZGVvRnJhbWVzU3RhcnQgPSBhd2FpdCB2aWRlb0ZyYW1lZERlY29kZWQodmlkZW9UcmFjayk7XG4gIGF3YWl0IHNsZWVwKGNoZWNrSW50ZXJ2YWwpO1xuICBjb25zdCB2aWRlb0ZyYW1lc0VuZCA9IGF3YWl0IHZpZGVvRnJhbWVkRGVjb2RlZCh2aWRlb1RyYWNrKTtcblxuICByZXR1cm4gdmlkZW9GcmFtZXNTdGFydCA+PSAwICYmIHZpZGVvRnJhbWVzRW5kID49IDAgPyB2aWRlb0ZyYW1lc0VuZCA+IHZpZGVvRnJhbWVzU3RhcnQgOiBmYWxzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaXNBdWRpb1BsYXlpbmdDaHJvbWUocGVlckNvbm5lY3Rpb24sIGF1ZGlvVHJhY2spIHtcbiAgY29uc3QgYXVkaW9Ub3RhbEVuZXJneSA9IGFzeW5jICh0cmFjaykgPT4ge1xuICAgIGlmICghdHJhY2spIHJldHVybiAtMTtcblxuICAgIGNvbnN0IGF1ZGlvU3RhdHMgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5nZXRTdGF0cyh0cmFjayk7XG4gICAgY29uc3QgaW5ib3VuZEF1ZGlvU3RhdHMgPSBleHRyYWN0U3RhdEVudHJ5KGF1ZGlvU3RhdHMsIFwiUlRDSW5ib3VuZFJUUEF1ZGlvU3RyZWFtXCIpO1xuXG4gICAgcmV0dXJuIGluYm91bmRBdWRpb1N0YXRzID8gaW5ib3VuZEF1ZGlvU3RhdHMudG90YWxBdWRpb0VuZXJneSA6IC0xO1xuICB9O1xuXG4gIGNvbnN0IGF1ZGlvVG90YWxFbmVyZ3lTdGFydCA9IGF3YWl0IHZpZGVvRnJhbWVkRGVjb2RlZCh2aWRlb1RyYWNrKTtcbiAgYXdhaXQgc2xlZXAoY2hlY2tJbnRlcnZhbCk7XG4gIGNvbnN0IGF1ZGlvVG90YWxFbmVyZ3lFbmQgPSBhd2FpdCBhdWRpb1RvdGFsRW5lcmd5KGF1ZGlvVHJhY2spO1xuXG4gIHJldHVybiBhdWRpb1RvdGFsRW5lcmd5U3RhcnQgPj0gMCAmJiBhdWRpb1RvdGFsRW5lcmd5RW5kID49IDBcbiAgICA/IGF1ZGlvVG90YWxFbmVyZ3lFbmQgPiBhdWRpb1RvdGFsRW5lcmd5U3RhcnRcbiAgICA6IGZhbHNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc1ZpZGVvUGxheWluZ0ZpcmVmb3gocGVlckNvbm5lY3Rpb24sIHZpZGVvVHJhY2spIHtcbiAgY29uc3QgcGFja2V0c1JlY2VpdmVkID0gKHN0YXRzKSA9PiB7XG4gICAgY29uc3QgWywgdmFsdWVdID0gQXJyYXkuZnJvbShzdGF0cykuZmluZCgoW19rZXksIHZhbHVlXSkgPT4gdmFsdWUubWVkaWFUeXBlID09PSBcInZpZGVvXCIpO1xuXG4gICAgcmV0dXJuIHZhbHVlLnBhY2tldHNSZWNlaXZlZDtcbiAgfTtcblxuICBjb25zdCBwYWNrZXRzU3RhcnQgPSBwYWNrZXRzUmVjZWl2ZWQoYXdhaXQgcGVlckNvbm5lY3Rpb24uZ2V0U3RhdHModmlkZW9UcmFjaykpO1xuICBhd2FpdCBzbGVlcChjaGVja0ludGVydmFsKTtcbiAgY29uc3QgcGFja2V0c0VuZCA9IHBhY2tldHNSZWNlaXZlZChhd2FpdCBwZWVyQ29ubmVjdGlvbi5nZXRTdGF0cyh2aWRlb1RyYWNrKSk7XG5cbiAgcmV0dXJuIHBhY2tldHNTdGFydCA+IDAgJiYgcGFja2V0c0VuZCA+IDAgJiYgcGFja2V0c0VuZCA+IHBhY2tldHNTdGFydDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaXNBdWRpb1BsYXlpbmdGaXJlZm94KHBlZXJDb25uZWN0aW9uLCBhdWRpb1RyYWNrKSB7XG4gIGNvbnN0IHBhY2tldHNSZWNlaXZlZCA9IChzdGF0cykgPT4ge1xuICAgIGNvbnN0IFssIHZhbHVlXSA9IEFycmF5LmZyb20oc3RhdHMpLmZpbmQoKFtfa2V5LCB2YWx1ZV0pID0+IHZhbHVlLm1lZGlhVHlwZSA9PT0gXCJhdWRpb1wiKTtcblxuICAgIHJldHVybiB2YWx1ZS5wYWNrZXRzUmVjZWl2ZWQ7XG4gIH07XG5cbiAgY29uc3QgcGFja2V0c1N0YXJ0ID0gcGFja2V0c1JlY2VpdmVkKGF3YWl0IHBlZXJDb25uZWN0aW9uLmdldFN0YXRzKGF1ZGlvVHJhY2spKTtcbiAgYXdhaXQgc2xlZXAoY2hlY2tJbnRlcnZhbCk7XG4gIGNvbnN0IHBhY2tldHNFbmQgPSBwYWNrZXRzUmVjZWl2ZWQoYXdhaXQgcGVlckNvbm5lY3Rpb24uZ2V0U3RhdHMoYXVkaW9UcmFjaykpO1xuXG4gIHJldHVybiBwYWNrZXRzU3RhcnQgPiAwICYmIHBhY2tldHNFbmQgPiAwICYmIHBhY2tldHNFbmQgPiBwYWNrZXRzU3RhcnQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbmJvdW5kU2ltdWxjYXN0U3RyZWFtU3RhdHMocGVlckNvbm5lY3Rpb24pIHtcbiAgY29uc3Qgc3RhdHMgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpO1xuICBsZXQgZGF0YSA9IHsgaGVpZ2h0OiBudWxsLCB3aWR0aDogbnVsbCwgZnJhbWVzUGVyU2Vjb25kOiAwIH1cbiAgZm9yIChsZXQgW19rZXksIHJlcG9ydF0gb2Ygc3RhdHMpIHtcbiAgICBpZiAocmVwb3J0LnR5cGUgPT0gXCJpbmJvdW5kLXJ0cFwiKSB7XG4gICAgICBkYXRhID0gZ2V0RGF0YUZyb21SZXBvcnQocmVwb3J0KVxuICAgICAgZGF0YS5mcmFtZXNSZWNlaXZlZCA9IHJlcG9ydC5mcmFtZXNSZWNlaXZlZFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhXG59XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3V0Ym91bmRTaW11bGNhc3RTdHJlYW1TdGF0cyhwZWVyQ29ubmVjdGlvbikge1xuICBjb25zdCBzdGF0cyA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmdldFN0YXRzKCk7XG5cbiAgbGV0IHN0cmVhbXMgPSB7IFwibFwiOiBudWxsLCBcIm1cIjogbnVsbCwgXCJoXCI6IG51bGwgfVxuICBmb3IgKGxldCBbX2tleSwgcmVwb3J0XSBvZiBzdGF0cykge1xuICAgIGlmIChyZXBvcnQudHlwZSA9PSBcIm91dGJvdW5kLXJ0cFwiKSB7XG4gICAgICBsZXQgcmlkID0gcmVwb3J0LnJpZFxuICAgICAgc3RyZWFtc1tyaWRdID0gZ2V0RGF0YUZyb21SZXBvcnQocmVwb3J0KVxuICAgICAgc3RyZWFtc1tyaWRdLmZyYW1lc1NlbnQgPSByZXBvcnQuZnJhbWVzU2VudFxuICAgICAgc3RyZWFtc1tyaWRdLnF1YWxpdHlMaW1pdGF0aW9uRHVyYXRpb24gPSByZXBvcnRbXCJxdWFsaXR5TGltaXRhdGlvbkR1cmF0aW9uc1wiXVxuICAgICAgc3RyZWFtc1tyaWRdLnF1YWxpdHlMaW1pdGF0aW9uUmVhc29uID0gcmVwb3J0W1wicXVhbGl0eUxpbWl0YXRpb25SZWFzb25cIl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyZWFtc1xufVxuXG5mdW5jdGlvbiBnZXREYXRhRnJvbVJlcG9ydCh2YWx1ZXMpIHtcbiAgbGV0IGRhdGEgPSB7IGhlaWdodDogbnVsbCwgd2lkdGg6IG51bGwsIGZyYW1lc1BlclNlY29uZDogMCB9XG4gIGRhdGEuaGVpZ2h0ID0gdmFsdWVzLmZyYW1lSGVpZ2h0XG4gIGRhdGEud2lkdGggPSB2YWx1ZXMuZnJhbWVXaWR0aFxuICBkYXRhLmZyYW1lc1BlclNlY29uZCA9IHZhbHVlcy5mcmFtZXNQZXJTZWNvbmQgIT0gbnVsbCA/IHZhbHVlcy5mcmFtZXNQZXJTZWNvbmQgOiAwXG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdGVTdHJlYW1zU3RhdHMocGVlckNvbm5lY3Rpb24pIHtcbiAgY29uc3Qgc3RyZWFtcyA9IHBlZXJDb25uZWN0aW9uLmdldFJlbW90ZVN0cmVhbXMoKTtcblxuICBjb25zdCBmaXJlZm94VHJhY2tBY3RpdmUgPSBwZWVyQ29ubmVjdGlvblxuICAgIC5nZXRSZWNlaXZlcnMoKVxuICAgIC5tYXAoKHsgdHJhY2sgfSkgPT4gdHJhY2spXG4gICAgLmZpbHRlcigodHJhY2spID0+ICF0cmFjay5tdXRlZClcbiAgICAubWFwKCh7IGlkIH0pID0+IGlkKTtcblxuXG4gIGNvbnN0IHN0YXRzID0gc3RyZWFtcy5tYXAoYXN5bmMgKHN0cmVhbSkgPT4ge1xuICAgIGNvbnN0IFthdWRpb1RyYWNrID0gdW5kZWZpbmVkXSA9IHN0cmVhbS5nZXRBdWRpb1RyYWNrcygpO1xuICAgIGNvbnN0IFt2aWRlb1RyYWNrID0gdW5kZWZpbmVkXSA9IHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpO1xuXG4gICAgbGV0IGRhdGEgPSB7IHN0cmVhbUlkOiBzdHJlYW0uaWQsIGlzQXVkaW9QbGF5aW5nOiBmYWxzZSwgaXNWaWRlb1BsYXlpbmc6IGZhbHNlIH07XG5cbiAgICBzd2l0Y2ggKGRldGVjdEJyb3dzZXIoKSkge1xuICAgICAgY2FzZSBcImNocm9tZVwiOiB7XG4gICAgICAgIGRhdGEuaXNBdWRpb1BsYXlpbmcgPSBhd2FpdCBpc0F1ZGlvUGxheWluZ0Nocm9tZShwZWVyQ29ubmVjdGlvbiwgYXVkaW9UcmFjayk7XG4gICAgICAgIGRhdGEuaXNWaWRlb1BsYXlpbmcgPSBhd2FpdCBpc1ZpZGVvUGxheWluZ0Nocm9tZShwZWVyQ29ubmVjdGlvbiwgYXVkaW9UcmFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImZpcmVmb3hcIjoge1xuICAgICAgICBjb25zdCBpc1N0cmVhbUFjdGl2ZSA9XG4gICAgICAgICAgKGF1ZGlvVHJhY2sgJiYgZmlyZWZveFRyYWNrQWN0aXZlLmluY2x1ZGVzKGF1ZGlvVHJhY2suaWQpKSB8fFxuICAgICAgICAgICh2aWRlb1RyYWNrICYmIGZpcmVmb3hUcmFja0FjdGl2ZS5pbmNsdWRlcyh2aWRlb1RyYWNrLmlkKSk7XG4gICAgICAgIGlmICghaXNTdHJlYW1BY3RpdmUpIHtcbiAgICAgICAgICBkYXRhLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5pc0F1ZGlvUGxheWluZyA9XG4gICAgICAgICAgYXVkaW9UcmFjayAhPT0gdW5kZWZpbmVkICYmIChhd2FpdCBpc0F1ZGlvUGxheWluZ0ZpcmVmb3gocGVlckNvbm5lY3Rpb24sIGF1ZGlvVHJhY2spKTtcbiAgICAgICAgZGF0YS5pc1ZpZGVvUGxheWluZyA9XG4gICAgICAgICAgdmlkZW9UcmFjayAhPT0gdW5kZWZpbmVkICYmIChhd2FpdCBpc1ZpZGVvUGxheWluZ0ZpcmVmb3gocGVlckNvbm5lY3Rpb24sIHZpZGVvVHJhY2spKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSk7XG5cbiAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbChzdGF0cykpLmZpbHRlcigoZGF0YSkgPT4gZGF0YS5hY3RpdmUgPT09IHVuZGVmaW5lZCk7XG59XG4iLCAiaW1wb3J0IFJvb20gZnJvbSAnLi9yb29tJztcbmltcG9ydCB7XG4gIHJlbW90ZVN0cmVhbXNTdGF0cyxcbiAgaW5ib3VuZFNpbXVsY2FzdFN0cmVhbVN0YXRzLFxuICBvdXRib3VuZFNpbXVsY2FzdFN0cmVhbVN0YXRzLFxufSBmcm9tICcuL3N0YXRzJztcblxuY29uc29sZS5sb2coJ0xPR0dJTkcgV09SS1M/Jyk7XG5cbmNvbnN0IHZpZGVvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWRlb3MnKTtcbmNvbnN0IGxvY2FsVmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbyNsb2NhbC12aWRlbycpO1xuY29uc3QgZGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNkYXRhJyk7XG5cbmNvbnN0IGdldEJ1dHRvbnNXaXRoUHJlZml4ID0gKHR5cGVzLCBwcmVmaXgpID0+IHtcbiAgcmV0dXJuIHR5cGVzLm1hcCgodHlwZSkgPT5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b24jJHtwcmVmaXh9LSR7dHlwZX1gKVxuICApO1xufTtcblxuY29uc3Qgc3RhcnRCdXR0b25zID0gZ2V0QnV0dG9uc1dpdGhQcmVmaXgoXG4gIFsnc2ltdWxjYXN0JywgJ2FsbCcsICdtaWMtb25seScsICdjYW1lcmEtb25seScsICdub25lJ10sXG4gICdzdGFydCdcbik7XG5cbmNvbnN0IHNpbXVsY2FzdEJ1dHRvbnMgPSBnZXRCdXR0b25zV2l0aFByZWZpeChcbiAgW1xuICAgICdsb2NhbC1sb3ctZW5jb2RpbmcnLFxuICAgICdsb2NhbC1tZWRpdW0tZW5jb2RpbmcnLFxuICAgICdsb2NhbC1oaWdoLWVuY29kaW5nJyxcbiAgICAncGVlci1sb3ctZW5jb2RpbmcnLFxuICAgICdwZWVyLW1lZGl1bS1lbmNvZGluZycsXG4gICAgJ3BlZXItaGlnaC1lbmNvZGluZycsXG4gICAgJ2luYm91bmQtc3RhdHMnLFxuICAgICdvdXRib3VuZC1zdGF0cycsXG4gIF0sXG4gICdzaW11bGNhc3QnXG4pO1xuXG5jb25zdCBtZXRhZGF0YUJ1dHRvbnMgPSBnZXRCdXR0b25zV2l0aFByZWZpeChcbiAgWyd1cGRhdGUtcGVlcicsICd1cGRhdGUtdHJhY2snLCAncGVlcicsICd0cmFjayddLFxuICAnbWV0YWRhdGEnXG4pO1xuXG5jb25zdCBbXG4gIHN0YXJ0U2ltdWxjYXN0QnV0dG9uLFxuICBzdGFydEFsbEJ1dHRvbixcbiAgc3RhcnRNaWNPbmx5QnV0dG9uLFxuICBzdGFydENhbWVyYU9ubHlCdXR0b24sXG4gIHN0YXJ0Tm9uZUJ1dHRvbixcbl0gPSBzdGFydEJ1dHRvbnM7XG5jb25zdCBbXG4gIGxvY2FsTG93RW5jb2RpbmdCdXR0b24sXG4gIGxvY2FsTWVkaXVtRW5jb2RpbmdCdXR0b24sXG4gIGxvY2FsSGlnaEVuY29kaW5nQnV0dG9uLFxuICBwZWVyTG93RW5jb2RpbmdCdXR0b24sXG4gIHBlZXJNZWRpdW1FbmNvZGluZ0J1dHRvbixcbiAgcGVlckhpZ2hFbmNvZGluZ0J1dHRvbixcbiAgaW5ib3VuZFNpbXVsY2FzdFN0YXRzQnV0dG9uLFxuICBvdXRib3VuZFNpbXVsY2FzdFN0YXRzQnV0dG9uLFxuXSA9IHNpbXVsY2FzdEJ1dHRvbnM7XG5cbmNvbnN0IFtcbiAgdXBkYXRlUGVlck1ldGFkYXRhQnV0dG9uLFxuICB1cGRhdGVUcmFja01ldGFkYXRhQnV0dG9uLFxuICBwZWVyTWV0YWRhdGFCdXR0b24sXG4gIHRyYWNrTWV0YWRhdGFCdXR0b24sXG5dID0gbWV0YWRhdGFCdXR0b25zO1xuXG5jb25zdCBzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI3N0b3AnKTtcbmNvbnN0IHN0YXRzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI3N0YXRzJyk7XG5cbnN0YXJ0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IChidXR0b24uZGlzYWJsZWQgPSBmYWxzZSkpO1xubWV0YWRhdGFCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gKGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlKSk7XG5zaW11bGNhc3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gKGJ1dHRvbi5kaXNhYmxlZCA9IHRydWUpKTtcbnN0b3BCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuc3RhdHNCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcblxubGV0IHJvb207XG5cbmNvbnN0IHNpbXVsY2FzdFByZWZlcmVuY2VzID0ge1xuICB3aWR0aDogeyBtYXg6IDEyODAsIGlkZWFsOiAxMjgwLCBtaW46IDEyODAgfSxcbiAgaGVpZ2h0OiB7IG1heDogNzIwLCBpZGVhbDogNzIwLCBtaW46IDcyMCB9LFxuICBmcmFtZVJhdGU6IHsgbWF4OiAzMCwgaWRlYWw6IDI0IH0sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBzdGFydChtZWRpYSwgc2ltdWxjYXN0ID0gZmFsc2UpIHtcbiAgY29uc29sZS5sb2coJ1NUQVJUIENMSUNLRUQnLCBtZWRpYSk7XG4gIGlmIChyb29tKSByZXR1cm47XG5cbiAgY29uc3QgdXNlVmlkZW8gPSBbJ2FsbCcsICdjYW1lcmEnXS5pbmNsdWRlcyhtZWRpYSk7XG5cbiAgaWYgKHNpbXVsY2FzdCkge1xuICAgIHNpbXVsY2FzdEJ1dHRvbnMubWFwKChlbGVtKSA9PiAoZWxlbS5kaXNhYmxlZCA9IGZhbHNlKSk7XG4gIH1cblxuICBjb25zdCBwcmVmZXJlbmNlcyA9IHtcbiAgICBhdWRpbzogWydhbGwnLCAnbWljJ10uaW5jbHVkZXMobWVkaWEpLFxuICAgIHZpZGVvOiB1c2VWaWRlbyAmJiBzaW11bGNhc3QgPyBzaW11bGNhc3RQcmVmZXJlbmNlcyA6IHVzZVZpZGVvLFxuICB9O1xuXG4gIGNvbnNvbGUubG9nKCdQUkVGRVJFTkNFUzogJywgcHJlZmVyZW5jZXMpO1xuXG4gIGxldCBsb2NhbFN0cmVhbSA9IHVuZGVmaW5lZDtcbiAgaWYgKHByZWZlcmVuY2VzLmF1ZGlvIHx8IHByZWZlcmVuY2VzLnZpZGVvKSB7XG4gICAgY29uc29sZS5sb2coJ0dFVFRJTkcgVVNFUiBNRURJQScpO1xuICAgIGxvY2FsU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEocHJlZmVyZW5jZXMpO1xuICAgIGNvbnNvbGUubG9nKCdHT1QgVVNFUiBNRURJQScpO1xuICAgIHdpbmRvdy5zdHJlYW0gPSBsb2NhbFN0cmVhbTtcbiAgfVxuICBsb2NhbFZpZGVvLnNyY09iamVjdCA9IGxvY2FsU3RyZWFtO1xuXG4gIHN0YXJ0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IChidXR0b24uZGlzYWJsZWQgPSB0cnVlKSk7XG4gIHN0b3BCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcblxuICBjb25zb2xlLmxvZygnQ1JFQVRJTkcgUk9PTScpO1xuICByb29tID0gbmV3IFJvb20obG9jYWxTdHJlYW0sIHNpbXVsY2FzdCk7XG5cbiAgYXdhaXQgcm9vbS5pbml0KCk7XG4gIGNvbnNvbGUubG9nKCdKT0lOSU5HJyk7XG4gIGF3YWl0IHJvb20uam9pbigpO1xuICBjb25zb2xlLmxvZygnSk9JTkVEJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3AoKSB7XG4gIGlmICghcm9vbSkgcmV0dXJuO1xuXG4gIHJvb20ubGVhdmUoKTtcblxuICAvLyByZW1vdmUgY2hpbGRyZW4gdW50aWwgd2UgYXJlIGxlZnQgd2l0aCB0aGUgbG9jYWwgdmlkZW9cbiAgLy8gdGFnIHdoaWNoIHdhcyB0aGUgZmlyc3Qgb25lIHByZXNlbnRcbiAgd2hpbGUgKHZpZGVvcy5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgdmlkZW9zLnJlbW92ZUNoaWxkKHZpZGVvcy5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgcm9vbSA9IHVuZGVmaW5lZDtcblxuICBzdGFydEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiAoYnV0dG9uLmRpc2FibGVkID0gZmFsc2UpKTtcbiAgc3RvcEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHB1dFN0YXRzKHN0YXRzKSB7XG4gIC8vIHB1dCB0aGUgc3RhdGlzdGljcyBhcyB0ZXh0IGluc2lkZSBkaXZcbiAgZGF0YS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShzdGF0cyk7XG5cbiAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IGFjY2Vzc2VkIHZlcnNpb25cbiAgZGF0YS5kYXRhc2V0LnZlcnNpb24gPSBwYXJzZUludChkYXRhLmRhdGFzZXQudmVyc2lvbikgKyAxO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWZyZXNoU3RhdHMoc3RhdHNGdW5jdGlvbikge1xuICBpZiAoIXJvb20gfHwgIXJvb20ud2VicnRjIHx8ICFyb29tLndlYnJ0Yy5jb25uZWN0aW9uKSB7XG4gICAgZGF0YS5pbm5lckhUTUwgPSBgUm9vbSBlcnJvci4gT25lIG9mIG9iamVjdHMgZG9lc24ndCBleGlzdHM6IFJvb20gJHshcm9vbX0sIFdlYlJUQyAkeyFyb29tLndlYnJ0Y30sIFBlZXJDb25uZWN0aW9uICR7IXJvb21cbiAgICAgIC53ZWJydGMuY29ubmVjdGlvbn1gO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB3ZSBhcmUgYWNjZXNzaW5nIHJvb20ncyBwcml2YXRlIGZpZWxkLCBpbiB0aGUgbmFtZSBvZiBzY2llbmNlIG9mIGNvdXJzZS4uLlxuICBjb25zdCBzdGF0cyA9IGF3YWl0IHN0YXRzRnVuY3Rpb24ocm9vbS53ZWJydGMuY29ubmVjdGlvbik7XG5cbiAgcHV0U3RhdHMoc3RhdHMpO1xufVxuXG5jb25zdCB0b2dnbGVTaW11bGNhc3RFbmNvZGluZyA9IGZ1bmN0aW9uIChidXR0b24sIGVuY29kaW5nKSB7XG4gIGNvbnN0IGlzRW5hYmxlZCA9IGJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKCdEaXNhYmxlJyk7XG4gIGxldCB0ZXh0ID0gYnV0dG9uLnRleHRDb250ZW50O1xuICBpZiAoaXNFbmFibGVkKSB7XG4gICAgcm9vbS5kaXNhYmxlU2ltdWxjYXN0RW5jb2RpbmcoZW5jb2RpbmcpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoJ0Rpc2FibGUnLCAnRW5hYmxlJyk7XG4gIH0gZWxzZSB7XG4gICAgcm9vbS5lbmFibGVTaW11bGNhc3RFbmNvZGluZyhlbmNvZGluZyk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgnRW5hYmxlJywgJ0Rpc2FibGUnKTtcbiAgfVxuICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xufTtcblxuLy8gc2V0dXAgYWxsIGJ1dHRvbiBjYWxsYmFja3NcbnN0YXJ0U2ltdWxjYXN0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBzdGFydCgnYWxsJywgdHJ1ZSk7XG5zdGFydEFsbEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gc3RhcnQoJ2FsbCcpO1xuc3RhcnRBbGxCdXR0b24ub25jbGljayA9ICgpID0+IHN0YXJ0KCdhbGwnKTtcbnN0YXJ0TWljT25seUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gc3RhcnQoJ21pYycpO1xuc3RhcnRDYW1lcmFPbmx5QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBzdGFydCgnY2FtZXJhJyk7XG5zdGFydE5vbmVCdXR0b24ub25jbGljayA9ICgpID0+IHN0YXJ0KCdub25lJyk7XG5zdG9wQnV0dG9uLm9uY2xpY2sgPSBzdG9wO1xuc3RhdHNCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgcmVmcmVzaFN0YXRzKHJlbW90ZVN0cmVhbXNTdGF0cyk7XG59O1xudXBkYXRlUGVlck1ldGFkYXRhQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHJvb20udXBkYXRlTWV0YWRhdGEoKTtcbn07XG51cGRhdGVUcmFja01ldGFkYXRhQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHJvb20udXBkYXRlVHJhY2tNZXRhZGF0YSgpO1xufTtcbnBlZXJNZXRhZGF0YUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICBwdXRTdGF0cyhyb29tLnBlZXJNZXRhZGF0YSk7XG59O1xudHJhY2tNZXRhZGF0YUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICBwdXRTdGF0cyhyb29tLnRyYWNrTWV0YWRhdGEpO1xufTtcbmxvY2FsTG93RW5jb2RpbmdCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgdG9nZ2xlU2ltdWxjYXN0RW5jb2RpbmcobG9jYWxMb3dFbmNvZGluZ0J1dHRvbiwgJ2wnKTtcbn07XG5sb2NhbE1lZGl1bUVuY29kaW5nQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHRvZ2dsZVNpbXVsY2FzdEVuY29kaW5nKGxvY2FsTWVkaXVtRW5jb2RpbmdCdXR0b24sICdtJyk7XG59O1xubG9jYWxIaWdoRW5jb2RpbmdCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgdG9nZ2xlU2ltdWxjYXN0RW5jb2RpbmcobG9jYWxIaWdoRW5jb2RpbmdCdXR0b24sICdoJyk7XG59O1xucGVlckxvd0VuY29kaW5nQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHJvb20uc2VsZWN0UGVlclNpbXVsY2FzdEVuY29kaW5nKCdsJyk7XG59O1xucGVlck1lZGl1bUVuY29kaW5nQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHJvb20uc2VsZWN0UGVlclNpbXVsY2FzdEVuY29kaW5nKCdtJyk7XG59O1xucGVlckhpZ2hFbmNvZGluZ0J1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICByb29tLnNlbGVjdFBlZXJTaW11bGNhc3RFbmNvZGluZygnaCcpO1xufTtcbmluYm91bmRTaW11bGNhc3RTdGF0c0J1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICByZWZyZXNoU3RhdHMoYXN5bmMgKGNvbm5lY3Rpb24pID0+IHtcbiAgICBsZXQgc3RhdHMgPSBhd2FpdCBpbmJvdW5kU2ltdWxjYXN0U3RyZWFtU3RhdHMoY29ubmVjdGlvbik7XG4gICAgc3RhdHMuZW5jb2RpbmcgPSByb29tLmdldFBlZXJFbmNvZGluZygpO1xuICAgIHJldHVybiBzdGF0cztcbiAgfSk7XG59O1xub3V0Ym91bmRTaW11bGNhc3RTdGF0c0J1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICByZWZyZXNoU3RhdHMob3V0Ym91bmRTaW11bGNhc3RTdHJlYW1TdGF0cyk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPO0FBQ3RELGNBQVEsc0JBQXNCLFFBQVEscUJBQXFCLFFBQVEsd0JBQXdCLFFBQVEsc0JBQXNCO0FBQ3pILG1DQUE2QixZQUFZO0FBQ3JDLGVBQU8sS0FBSyxVQUFVO0FBQUE7QUFFMUIsY0FBUSxzQkFBc0I7QUFDOUIscUNBQStCLHNCQUFzQjtBQUNqRCxlQUFPLEtBQUssTUFBTTtBQUFBO0FBRXRCLGNBQVEsd0JBQXdCO0FBQ2hDLGtDQUE0QixNQUFNLE9BQU07QUFDcEMsWUFBSSxRQUFRLEVBQUU7QUFDZCxZQUFJLE9BQU07QUFDTixr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QyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRztBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHO0FBQ25DLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSTtBQUNoQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHO0FBQ25DLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUc7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRztBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRztBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHO0FBQ25DLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHO0FBQ25DLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRztBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSTtBQUNoQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRztBQUNuQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRztBQUMvQixVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcs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
