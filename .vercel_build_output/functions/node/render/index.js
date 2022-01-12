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
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_fs = __toModule(require("fs"));
    import_node_path = __toModule(require("path"));
    import_node_worker_threads = __toModule(require("worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("http"));
    import_node_https = __toModule(require("https"));
    import_node_zlib = __toModule(require("zlib"));
    import_node_stream = __toModule(require("stream"));
    import_node_util = __toModule(require("util"));
    import_node_url = __toModule(require("url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function __fetch_polyfill() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      value: Headers2
    }
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http2 = __toModule(require("http"));
    import_node_https2 = __toModule(require("https"));
    import_node_zlib2 = __toModule(require("zlib"));
    import_node_stream2 = __toModule(require("stream"));
    import_node_util2 = __toModule(require("util"));
    import_node_url2 = __toModule(require("url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry5 = this._queue.shift();
              this._queueTotalSize -= entry5.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry5.buffer, entry5.byteOffset, entry5.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init, context) {
          assertDictionary(init, context);
          const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
          const size = init === null || init === void 0 ? void 0 : init.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable, "readable", "ReadableWritablePair");
          assertReadableStream(readable, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable, writable: writable2 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init, context) {
          assertDictionary(init, context);
          const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable._state === "errored") {
              throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init) {
        let result = [];
        if (init instanceof Headers2) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null)
          ;
        else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers2(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-a9a6e648.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css9) => css9.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_a9a6e648 = __esm({
  ".svelte-kit/output/server/chunks/index-a9a6e648.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/entries/pages/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/layout.svelte.js"() {
    init_index_a9a6e648();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css2;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "layout.svelte-04575238.js";
    js = ["layout.svelte-04575238.js", "chunks/vendor-d72d44f7.js"];
    css2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/error.svelte.js"() {
    init_index_a9a6e648();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css3;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-4ba8341c.js";
    js2 = ["error.svelte-4ba8341c.js", "chunks/vendor-d72d44f7.js"];
    css3 = [];
  }
});

// .svelte-kit/output/server/chunks/stores-d75da388.js
var css4, Header, getStores, page;
var init_stores_d75da388 = __esm({
  ".svelte-kit/output/server/chunks/stores-d75da388.js"() {
    init_index_a9a6e648();
    css4 = {
      code: ".headline.svelte-epo8os{position:relative;z-index:999;display:flex;width:98%;padding:4px 8px 20px 16px}.top-50.svelte-epo8os{display:flex;max-width:500px;padding-right:10px;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:0;width:1600px}.text-semi.svelte-epo8os{font-size:48px;line-height:1;font-weight:400}.text-regular.svelte-epo8os{font-size:14px;line-height:1.15;font-weight:400}.div-block-107.svelte-epo8os{display:flex;padding-top:8px;flex-wrap:wrap;align-items:center}.text-regular.bold.info-link.svelte-epo8os{margin-right:4px;margin-left:0px;padding:2px 6px 3px;border:1px solid #000;border-radius:24px;color:#000;font-weight:400;text-decoration:none;cursor:pointer}.text-regular.bold.info-link.bluehighlight.svelte-epo8os{background-color:#c0eeff}.text-regular.bold.info-link.pinkhighlight.svelte-epo8os{background-color:#ffc2fd}.source.svelte-epo8os{text-decoration:underline}a.svelte-epo8os{text-decoration:auto;color:black}",
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css4);
      return `<div id="${"top"}" class="${"headline svelte-epo8os"}"><div class="${"top-50 svelte-epo8os"}"><a sveltekit:prefetch href="${"/"}" class="${"svelte-epo8os"}"><div class="${"text-semi svelte-epo8os"}">The Numbers Game
            </div></a>
        <div class="${"div-block-107 svelte-epo8os"}"><div class="${"div-block-109"}"><a href="${"https://twitter.com/_Numbers_Game"}" target="${"_blank"}" class="${"text-regular bold info-link bluehighlight svelte-epo8os"}">Twitter</a>
                <a href="${"mailto:seeablenews@gmail.com"}" target="${"_blank"}" class="${"text-regular bold info-link pinkhighlight svelte-epo8os"}">Email</a></div></div></div>
    <div class="${"flex"}"><div class="${"text-regular svelte-epo8os"}">This is an experiment in data journalism, using a machine learning model to generate articles based on football data. I am currently using a Text-to-Text transformer model (called T5) which can be trained to turn data into into natural language. The project is in an early stage of development and will contain errors. Please verify accuracy with <a class="${"source svelte-epo8os"}" href="${"https://fbref.com/en/"}">FBREF</a>, the original data source, before sharing content.
            <br></div></div>
</div>`;
    });
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/endpoints/fb-utils.js
var fb_utils_exports = {};
__export(fb_utils_exports, {
  teams: () => teams
});
var teams;
var init_fb_utils = __esm({
  ".svelte-kit/output/server/entries/endpoints/fb-utils.js"() {
    teams = [
      { id: "tottenham", name: "Tottenham" },
      { id: "liverpool", name: "Liverpool" },
      { id: "man-city", name: "Manchester City" },
      { id: "newcastle", name: "Newcastle Utd" },
      { id: "chelsea", name: "Chelsea" },
      { id: "west-ham", name: "West Ham" },
      { id: "arsenal", name: "Arsenal" },
      { id: "burnley", name: "Burnley" },
      { id: "watford", name: "Watford" },
      { id: "leeds", name: "Leeds United" },
      { id: "everton", name: "Everton" },
      { id: "brentford", name: "Brentford" },
      { id: "southampton", name: "Southampton" },
      { id: "aston-villa", name: "Aston Villa" },
      { id: "crystal-palace", name: "Crystal Palace" },
      { id: "brighton", name: "Brighton" },
      { id: "leicester", name: "Leicester City" },
      { id: "wolves", name: "Wolves" },
      { id: "man-utd", name: "Manchester Utd" },
      { id: "norwich", name: "Norwich City" }
    ];
  }
});

// .svelte-kit/output/server/chunks/tweets-222e5605.js
var tweets, someJSON;
var init_tweets_222e5605 = __esm({
  ".svelte-kit/output/server/chunks/tweets-222e5605.js"() {
    tweets = {
      "1": {
        data: [
          {
            text: "Tottenham created far more than Watford, finding chances worth 2.1 expected goals to Watford's 0.3.",
            id: "1481017750197874694"
          },
          {
            text: "It was a dominant display by Tottenham, who completed an impressive 672 passes to Watford's 182. This season Tottenham have averaged 427.0 completed passes per 90 minute.",
            id: "1481017751577706498"
          },
          {
            text: "Tottenham took nine shots on target, considerably more than their average per 90 minutes this season (4.6).",
            id: "1481017753121267712"
          },
          {
            text: "Tottenham applied more pressure high up the pitch, pressing 45 times in the final third while Watford pressed 13 times in the final third. In their last game (against Southampton) Spurs pressed 45 times in the final third.",
            id: "1481017754580926470"
          },
          {
            text: "Tottenham were aggressive out of possession, making five tackles in the final third compared with one in their last game (against Southampton). This season Spurs have averaged 2.5 tackles in the final third per 90 minutes.",
            id: "1481017756157947917"
          },
          {
            text: "Tottenham succesffuly played an impressive 66 passes into the final third, compared with 10 from Watford. This season Spurs have averaged 32.0 completed passes into the final per 90 minutes.",
            id: "1481017757722460164"
          },
          {
            text: "Tottenham were given a lot of time on the ball, taking an average of 8.7 touches each time the opponent pressed - Watford took an average of 2.6 touches per press. This season, Tottenham have averaged (4.3 touches for each opponent press.",
            id: "1481017759270162436"
          },
          {
            text: "Tottenham attempted 17 challenges resulting in 12 successful tackles. In their last game (against Southampton) Tottenham attempted nine challenges.",
            id: "1481017760830439427"
          },
          {
            text: "Tottenham attempted three challenges in the defensive third. In their last game (against Southampton) Spurs made one challenges in the defensive third, while throughout the season they've made three challenges in the defensive third.",
            id: "1481017762457788418"
          },
          {
            text: "Eric Dier successfuly completed 88 passes - more than any other player on the pitch.",
            id: "1481017764038983683"
          },
          {
            text: "Ben Davies completed 93% of his passes - the second highest rate of any player on the pitch. Eric Dier completed 93% of his attempted passes - the second highest rate of any player on the pitch.",
            id: "1481017765540638723"
          },
          {
            text: "Eric Dier passed the ball a combined 847 yards towards the opponents goal - more than any other player on the pitch. Eric Dier also played 13 passes into the final third.",
            id: "1481017767201488905"
          },
          {
            text: "Eric Dier played more successful long balls than any other player on the pitch (22), followed by Davinson Sanchez, who completed 12.",
            id: "1481021543991980034"
          },
          {
            text: "Ben Davies carried the ball farther towards the opponent's goal than any other player on the pitch (a combined 476 yards), while Eric Dier carried the ball a combined 441 yards towards the opponent's goal.",
            id: "1481021545497694210"
          },
          {
            text: "Ben Davies carried the ball into the final third eight times (more than any other player on the pitch), while Davinson Sanchez made four carries into the final third.",
            id: "1481021547292901378"
          },
          {
            text: "Ben Davies pressed the opponent 15 times - more than any other player in a Tottenham shirt.",
            id: "1481021548983201794"
          },
          {
            text: "Ben Davies attempted to make three challenges, resulting in three attempted passes.",
            id: "1481021550535094276"
          },
          {
            text: "Ben Davies made more clearances (six) than any other Tottenham player, while Davinson Sanchez made five clearances.",
            id: "1481021552162484225"
          },
          {
            text: "Davinson Sanchez won seven aerial duels (more than any other player on the pitch), winning seven aerial duels (more than any other player on the pitch). Ben Davies also won six aerial duels and seven aerial duels.",
            id: "1481021555253465091"
          }
        ],
        misc: {
          story_id: 1,
          team: "Tottenham",
          opponent: "Watford",
          result: [
            0,
            1
          ],
          date: "2022-01-01",
          stories: [
            [
              [
                "Tottenham",
                "Attack_xG",
                2.1
              ],
              [
                "Watford",
                "Attack_xG",
                0.3
              ]
            ],
            [
              [
                "Tottenham",
                "Passing_TotalSucc",
                672
              ],
              [
                "Watford",
                "Passing_TotalSucc",
                182
              ],
              [
                "Tottenham",
                "Passing_TotalSucc!s",
                426.94
              ]
            ],
            [
              [
                "Tottenham",
                "Attack_SoT",
                9
              ],
              [
                "Tottenham",
                "Attack_SoT!s",
                4.61
              ]
            ],
            [
              [
                "Tottenham",
                "Attack_PressFinal3rd",
                45
              ],
              [
                "Watford",
                "Attack_PressFinal3rd",
                13
              ],
              [
                "Tottenham",
                "Attack_PressFinal3rd!p-Southampton",
                29
              ]
            ],
            [
              [
                "Tottenham",
                "Attack_TacklesFinal3rd",
                5
              ],
              [
                "Tottenham",
                "Attack_TacklesFinal3rd!p-Southampton",
                1
              ],
              [
                "Tottenham",
                "Attack_TacklesFinal3rd!s",
                2.5
              ]
            ],
            [
              [
                "Tottenham",
                "Passing_PassesFinal3rd",
                66
              ],
              [
                "Watford",
                "Passing_PassesFinal3rd",
                10
              ],
              [
                "Tottenham",
                "Passing_PassesFinal3rd!s",
                32.22
              ]
            ],
            [
              [
                "Tottenham",
                "Possession_TchPPressTakenRatio",
                8.71
              ],
              [
                "Watford",
                "Possession_TchPPressTakenRatio",
                2.64
              ],
              [
                "Tottenham",
                "Possession_TchPPressTakenRatio!s",
                4.35
              ]
            ],
            [
              [
                "Tottenham",
                "Defence_Tackles",
                17
              ],
              [
                "Tottenham",
                "Defence_Tackles!p-Southampton",
                9
              ],
              [
                "Tottenham",
                "Defence_TacklesSucc",
                12
              ]
            ],
            [
              [
                "Tottenham",
                "Defence_TacklesSucc!p-Southampton",
                2
              ],
              [
                "Tottenham",
                "Defence_TacklesDef3rd",
                3
              ],
              [
                "Tottenham",
                "Defence_TacklesDef3rd!p-Southampton",
                1
              ]
            ],
            [
              [
                "Eric Dier - Tottenham",
                "Passing_TotalSucc",
                88
              ],
              [
                "Eric Dier - Tottenham",
                "Passing_TotalSucc!r",
                1
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Passing_TotalPerc",
                92.9
              ],
              [
                "Ben Davies - Tottenham",
                "Passing_TotalPerc!r",
                1
              ],
              [
                "Eric Dier - Tottenham",
                "Passing_TotalPerc",
                92.6
              ],
              [
                "Eric Dier - Tottenham",
                "Passing_TotalPerc!r",
                2
              ]
            ],
            [
              [
                "Eric Dier - Tottenham",
                "Passing_PassesFinal3rd",
                13
              ],
              [
                "Eric Dier - Tottenham",
                "Passing_PassesPrgDist",
                847
              ],
              [
                "Eric Dier - Tottenham",
                "Passing_PassesPrgDist!r",
                1
              ]
            ],
            [
              [
                "Eric Dier - Tottenham",
                "Passing_LongSucc",
                22
              ],
              [
                "Eric Dier - Tottenham",
                "Passing_LongSucc!r",
                1
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Passing_LongSucc",
                12
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Passing_LongSucc!r",
                2
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Possession_CarriesPrgDist",
                476
              ],
              [
                "Ben Davies - Tottenham",
                "Possession_CarriesPrgDist!r",
                1
              ],
              [
                "Eric Dier - Tottenham",
                "Possession_CarriesPrgDist",
                441
              ],
              [
                "Eric Dier - Tottenham",
                "Possession_CarriesPrgDist!r",
                2
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Possession_CarriesFinal3rd",
                8
              ],
              [
                "Ben Davies - Tottenham",
                "Possession_CarriesFinal3rd!r",
                1
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Possession_CarriesFinal3rd",
                4
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Possession_CarriesFinal3rd!r",
                2
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Defence_Press",
                15
              ],
              [
                "Ben Davies - Tottenham",
                "Defence_Press!tr",
                1
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Defence_Tackles",
                3
              ],
              [
                "Ben Davies - Tottenham",
                "Defence_Tackles!tr",
                2
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Defence_Clearances",
                6
              ],
              [
                "Ben Davies - Tottenham",
                "Defence_Clearances!tr",
                1
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Defence_Clearances",
                5
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Defence_Clearances!tr",
                2
              ]
            ],
            [
              [
                "Ben Davies - Tottenham",
                "Defence_AerialSucc",
                6
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Defence_AerialSucc",
                7
              ],
              [
                "Davinson Sanchez - Tottenham",
                "Defence_AerialSucc!r",
                1
              ],
              [
                "Ben Davies - Tottenham",
                "Defence_AerialSucc!tr",
                2
              ]
            ]
          ]
        }
      },
      "2": {
        data: [
          {
            text: "Liverpool were given a lot of time on the ball, taking an average of 74% of the passes they played short compared with 81% from Chelsea. This season the Reds have averaged 83% of their completed passes were played short compared with 83% in the last game.",
            id: "1481022058997989380"
          },
          {
            text: "Liverpool took five shots on target, up from three in their last game against Leicester.",
            id: "1481022060734423048"
          },
          {
            text: "Liverpool were given an average of 4.4 touches each time the opponent pressed - Chelsea took an average of 4.5 touches per press.",
            id: "1481022062433116171"
          },
          {
            text: "Liverpool gave their opponent an average of 4.5 touches each time they pressed. Chelsea allowed the Reds 4.4 touches per press, considerably more than the 3.3 touches permitted by Leicester in Liverpool's last game.",
            id: "1481022064089870341"
          },
          {
            text: "Liverpool made nine successful tackles in this match, similar to the 9.8 successful tackles they've averaged per 90 minutes this season.",
            id: "1481022065843093508"
          },
          {
            text: "Liverpool attempted six challenges in the defensive third. In their last game (against Leicester) the Reds attempted five challenges in the defensive third, while throughout the season they've averaged 5.2 per 90 minutes.",
            id: "1481022067466248194"
          },
          {
            text: "Liverpool won an impressive 21 aerial duels to Chelsea's nine. In their last game (against Leicester) the Reds won 18 aerial duels and have averaged 16.0 per 90 minutes this season.",
            id: "1481025844294389764"
          },
          {
            text: "Liverpool won an impressive 70% or the game's aerial duels. In their last game they won 43% and across the season they've won 53%.",
            id: "1481025846278242317"
          },
          {
            text: "Sadio Mane, our man of the match, created some of the best chances of the game - tallying an xA of 0.2 (more than any other Liverpool player) resulting in 0.2 (more than any other Liverpool player).",
            id: "1481025847922511872"
          },
          {
            text: "Sadio Mane took two shots on target, while carried the ball into the box one times.",
            id: "1481025850124472324"
          },
          {
            text: "Trent Alexander-Arnold successfuly completed 45 passes (more than any other Liverpool player), while Fabinho completed 42 passes.",
            id: "1481025851827408898"
          },
          {
            text: "Trent Alexander-Arnold passed the ball a combined 582 yards towards the opponents goal - more than any other player on the pitch. Trent Alexander-Arnold also played more successful long balls than any other Liverpool player.",
            id: "1481025853526102021"
          },
          {
            text: "Sadio Mane successfully dribbled past an opponent on two occasions out of two attempts - more than any other Liverpool player. He carried the ball into the final third 1 times.",
            id: "1481025855799312385"
          },
          {
            text: "Sadio Mane pressed the opponent 29 times (more than any other player on the pitch), winning possession on six occassions.",
            id: "1481025857451868161"
          },
          {
            text: "Trent Alexander-Arnold made five interceptions - more than any other Liverpool player.",
            id: "1481025859058343939"
          }
        ],
        misc: {
          story_id: 2,
          team: "Liverpool",
          opponent: "Chelsea",
          result: [
            2,
            2
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Liverpool",
                "Passing_TotalPerc",
                74.4
              ],
              [
                "Chelsea",
                "Passing_TotalPerc",
                80.6
              ],
              [
                "Liverpool",
                "Passing_TotalPerc!s",
                82.9
              ]
            ],
            [
              [
                "Liverpool",
                "Attack_SoT",
                5
              ],
              [
                "Liverpool",
                "Attack_SoT!p-Leicester City",
                3
              ]
            ],
            [
              [
                "Liverpool",
                "Possession_TchPPressTakenRatio",
                4.39
              ],
              [
                "Chelsea",
                "Possession_TchPPressTakenRatio",
                4.49
              ]
            ],
            [
              [
                "Liverpool",
                "Possession_TchPPressGivenRatio",
                4.49
              ],
              [
                "Chelsea",
                "Possession_TchPPressGivenRatio",
                4.39
              ],
              [
                "Liverpool",
                "Possession_TchPPressGivenRatio!p-Leicester City",
                3.27
              ]
            ],
            [
              [
                "Liverpool",
                "Defence_TacklesSucc",
                9
              ],
              [
                "Liverpool",
                "Defence_TacklesSucc!s",
                9.85
              ]
            ],
            [
              [
                "Liverpool",
                "Defence_TacklesDef3rd",
                6
              ],
              [
                "Liverpool",
                "Defence_TacklesDef3rd!p-Leicester City",
                5
              ],
              [
                "Liverpool",
                "Defence_TacklesDef3rd!s",
                5.2
              ]
            ],
            [
              [
                "Liverpool",
                "Defence_AerialSucc",
                21
              ],
              [
                "Chelsea",
                "Defence_AerialSucc",
                9
              ],
              [
                "Liverpool",
                "Defence_AerialSucc!p-Leicester City",
                18
              ],
              [
                "Liverpool",
                "Defence_AerialSucc!s",
                15.85
              ]
            ],
            [
              [
                "Liverpool",
                "Defence_AerialPerc",
                70
              ],
              [
                "Chelsea",
                "Defence_AerialPerc",
                30
              ],
              [
                "Liverpool",
                "Defence_AerialPerc!p-Leicester City",
                42.9
              ],
              [
                "Liverpool",
                "Defence_AerialPerc!s",
                53.1
              ]
            ],
            [
              [
                "Sadio Mane - Liverpool",
                "Attack_xA",
                0.2
              ],
              [
                "Sadio Mane - Liverpool",
                "MOTM",
                "true"
              ],
              [
                "Sadio Mane - Liverpool",
                "Attack_xA!tr",
                1
              ]
            ],
            [
              [
                "Sadio Mane - Liverpool",
                "Attack_KP",
                1
              ],
              [
                "Sadio Mane - Liverpool",
                "Attack_SoT",
                2
              ],
              [
                "Sadio Mane - Liverpool",
                "Attack_CarriesPA",
                1
              ]
            ],
            [
              [
                "Trent Alexander-Arnold - Liverpool",
                "Passing_TotalSucc",
                45
              ],
              [
                "Trent Alexander-Arnold - Liverpool",
                "Passing_TotalSucc!tr",
                1
              ],
              [
                "Fabinho - Liverpool",
                "Passing_TotalSucc",
                42
              ],
              [
                "Fabinho - Liverpool",
                "Passing_TotalSucc!tr",
                2
              ]
            ],
            [
              [
                "Trent Alexander-Arnold - Liverpool",
                "Passing_PassesPrgDist",
                582
              ],
              [
                "Trent Alexander-Arnold - Liverpool",
                "Passing_PassesPrgDist!r",
                1
              ],
              [
                "Trent Alexander-Arnold - Liverpool",
                "Passing_LongSucc",
                9
              ],
              [
                "Trent Alexander-Arnold - Liverpool",
                "Passing_LongSucc!tr",
                1
              ]
            ],
            [
              [
                "Sadio Mane - Liverpool",
                "Possession_CarriesFinal3rd",
                1
              ],
              [
                "Sadio Mane - Liverpool",
                "Possession_DrbSucc",
                2
              ],
              [
                "Sadio Mane - Liverpool",
                "Possession_DrbSucc!tr",
                1
              ]
            ],
            [
              [
                "Sadio Mane - Liverpool",
                "Defence_Press",
                29
              ],
              [
                "Sadio Mane - Liverpool",
                "Defence_Press!r",
                1
              ],
              [
                "Sadio Mane - Liverpool",
                "Defence_PressSucc",
                6
              ]
            ],
            [
              [
                "Trent Alexander-Arnold - Liverpool",
                "Defence_Int",
                5
              ],
              [
                "Trent Alexander-Arnold - Liverpool",
                "Defence_Int!tr",
                1
              ]
            ]
          ]
        }
      },
      "3": {
        data: [
          {
            text: "Crystal Palace found a teammate with 83% of his attempted passes (83%). West Ham completed 74% of their passes.",
            id: "1481026445279440904"
          },
          {
            text: "West Ham were patient out of possession, making only five tackles in the final third Crystal Palace's six. This season the Hammers have averaged 2.5 tackles in the final third per 90 minutes.",
            id: "1481026446864830470"
          },
          {
            text: "West Ham succesffuly played 27 passes into the final third, considerably more than the 26 they played in their last game (against Watford). This season the Hammers have averaged 26.0 successsful passes into the final third per 90 minutes.",
            id: "1481026448626491392"
          },
          {
            text: "West Ham gave their opponent an average of 4.8 touches each time they pressed.",
            id: "1481026450375548929"
          },
          {
            text: "Crystal Palace allowed the Hammers 3.6 touches per press, considerably less than the 4.3 touches permitted by Watford in West Ham's last game. This season they've allowed the Hammers 4.3 touches per press..",
            id: "1481030227086217222"
          },
          {
            text: "West Ham attempted 24 challenges in this game, considerably more than the 18 they made during their last game (against Watford). This season they have averaged 17.0 challenges per 90 minutes.",
            id: "1481030228780724227"
          },
          {
            text: "West Ham attempted 11 challenges in the defensive third, considerably more than the seven made by Crystal Palace. In their last game (against Watford) the Hammers attempted seven challenges in the defensive third, while throughout the season they've averaged 8.4 per 90 minutes.",
            id: "1481030230500380680"
          },
          {
            text: "West Ham won 42% or the game's aerial duels. In their last game they won 42% and across the season they've won 42%.",
            id: "1481030232215900160"
          },
          {
            text: "Vladimir Coufal, our man of the match, made two successful passes into the final third and carried the ball into the box one times.",
            id: "1481030233809735685"
          },
          {
            text: "Declan Rice scored one assist to Declan Rice's one, while creating 0.2 expected goals.",
            id: "1481030235424440324"
          },
          {
            text: "Declan Rice successfuly completed 41 passes - the second most of any West Ham player.",
            id: "1481030237890646019"
          },
          {
            text: "Declan Rice had a great game, completing 91% of his passes into the final third - the highest rate of any West Ham player. He also played 8 passes into the final third, the highest pass completion rate of any West Ham player.",
            id: "1481030239664943106"
          },
          {
            text: "Vladimir Coufal made 357 yards worth of progressive passes, while Declan Rice successfully passed the ball 229 yards towards the opponent's goal.",
            id: "1481030241829236736"
          },
          {
            text: "Vladimir Coufal played more successful long balls than any other West Ham player (five), while Vladimir Coufal completed five long balls.",
            id: "1481030243544707074"
          },
          {
            text: "Declan Rice carried the ball farther towards the opponent's goal than any other player in a West Ham shirt (a combined 165 yards), while Vladimir Coufal carried the ball a combined 126 yards towards the opponent's goal.",
            id: "1481030245113372676"
          },
          {
            text: "Vladimir Coufal carried the ball into the final third four times (more than any other West Ham player), while Vladimir Coufal made four carries into the final third.",
            id: "1481030246929420293"
          },
          {
            text: "Vladimir Coufal attempted to make five challenges, resulting in two successful tackles.",
            id: "1481030248603000836"
          },
          {
            text: "Vladimir Coufal made more interceptions (five) than any other West Ham player, while Declan Rice made two.",
            id: "1481034025380810756"
          }
        ],
        misc: {
          story_id: 3,
          team: "West Ham",
          opponent: "Crystal Palace",
          result: [
            2,
            3
          ],
          date: "2022-01-01",
          stories: [
            [
              [
                "West Ham",
                "Passing_TotalPerc",
                73.6
              ],
              [
                "Crystal Palace",
                "Passing_TotalPerc",
                82.8
              ]
            ],
            [
              [
                "West Ham",
                "Attack_TacklesFinal3rd",
                5
              ],
              [
                "Crystal Palace",
                "Attack_TacklesFinal3rd",
                6
              ],
              [
                "West Ham",
                "Attack_TacklesFinal3rd!s",
                2.45
              ]
            ],
            [
              [
                "West Ham",
                "Passing_PassesFinal3rd",
                27
              ],
              [
                "West Ham",
                "Passing_PassesFinal3rd!p-Watford",
                26
              ],
              [
                "West Ham",
                "Passing_PassesFinal3rd!s",
                26.45
              ]
            ],
            [
              [
                "West Ham",
                "Possession_TchPPressGivenRatio",
                4.83
              ],
              [
                "Crystal Palace",
                "Possession_TchPPressGivenRatio",
                3.64
              ],
              [
                "West Ham",
                "Possession_TchPPressGivenRatio!p-Watford",
                3.23
              ],
              [
                "West Ham",
                "Possession_TchPPressGivenRatio!s",
                4.31
              ]
            ],
            [
              [
                "West Ham",
                "Defence_Tackles",
                24
              ],
              [
                "Crystal Palace",
                "Defence_Tackles",
                18
              ],
              [
                "West Ham",
                "Defence_Tackles!p-Watford",
                22
              ],
              [
                "West Ham",
                "Defence_Tackles!s",
                16.9
              ]
            ],
            [
              [
                "West Ham",
                "Defence_TacklesDef3rd",
                11
              ],
              [
                "Crystal Palace",
                "Defence_TacklesDef3rd",
                7
              ],
              [
                "West Ham",
                "Defence_TacklesDef3rd!p-Watford",
                7
              ],
              [
                "West Ham",
                "Defence_TacklesDef3rd!s",
                8.45
              ]
            ],
            [
              [
                "West Ham",
                "Defence_AerialPerc",
                42.4
              ],
              [
                "West Ham",
                "Defence_AerialPerc!p-Watford",
                42
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "MOTM",
                "true"
              ],
              [
                "Vladimir Coufal - West Ham",
                "Attack_CarriesPA",
                2
              ],
              [
                "Vladimir Coufal - West Ham",
                "Attack_CarriesPA!r",
                1
              ]
            ],
            [
              [
                "Declan Rice - West Ham",
                "Attack_xA",
                0.2
              ],
              [
                "Declan Rice - West Ham",
                "Attack_Assist",
                1
              ]
            ],
            [
              [
                "Declan Rice - West Ham",
                "Passing_TotalSucc",
                41
              ],
              [
                "Declan Rice - West Ham",
                "Passing_TotalSucc!tr",
                2
              ]
            ],
            [
              [
                "Declan Rice - West Ham",
                "Passing_TotalPerc",
                91.1
              ],
              [
                "Declan Rice - West Ham",
                "Passing_TotalPerc!tr",
                1
              ],
              [
                "Declan Rice - West Ham",
                "Passing_PassesFinal3rd",
                8
              ],
              [
                "Declan Rice - West Ham",
                "Passing_PassesFinal3rd!tr",
                1
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "Passing_PassesPrgDist",
                357
              ],
              [
                "Vladimir Coufal - West Ham",
                "Passing_PassesPrgDist!tr",
                1
              ],
              [
                "Declan Rice - West Ham",
                "Passing_PassesPrgDist",
                229
              ],
              [
                "Declan Rice - West Ham",
                "Passing_PassesPrgDist!tr",
                2
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "Passing_LongSucc",
                5
              ],
              [
                "Vladimir Coufal - West Ham",
                "Passing_LongSucc!tr",
                1
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "Possession_CarriesPrgDist",
                126
              ],
              [
                "Declan Rice - West Ham",
                "Possession_CarriesPrgDist",
                165
              ],
              [
                "Declan Rice - West Ham",
                "Possession_CarriesPrgDist!tr",
                1
              ],
              [
                "Vladimir Coufal - West Ham",
                "Possession_CarriesPrgDist!tr",
                2
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "Possession_CarriesFinal3rd",
                4
              ],
              [
                "Vladimir Coufal - West Ham",
                "Possession_CarriesFinal3rd!tr",
                1
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "Defence_Tackles",
                5
              ],
              [
                "Vladimir Coufal - West Ham",
                "Defence_TacklesSucc",
                2
              ]
            ],
            [
              [
                "Vladimir Coufal - West Ham",
                "Defence_Int",
                5
              ],
              [
                "Vladimir Coufal - West Ham",
                "Defence_Int!r",
                1
              ],
              [
                "Declan Rice - West Ham",
                "Defence_Int",
                2
              ],
              [
                "Vladimir Coufal - West Ham",
                "Defence_Clearances",
                7
              ],
              [
                "Declan Rice - West Ham",
                "Defence_Int!tr",
                2
              ]
            ]
          ]
        }
      },
      "4": {
        data: [
          {
            text: "It was a dominant display by Manchester City, who completed 582 passes to Arsenal's 192.",
            id: "1481034601367851012"
          },
          {
            text: "Manchester City were aggressive out of possession, making six tackles in the final third compared with two in their last game (against Brentford). This season City have averaged 2.6 tackles in the final third per 90 minutes.",
            id: "1481034602940702720"
          },
          {
            text: "It was a dominant display by Manchester City, who completed an impressive 760 touches to Arsenal's 363.",
            id: "1481034604719087619"
          },
          {
            text: "Manchester City were given a lot of time on the ball, taking an average of 9.2 touches each time the opponent pressed - Arsenal took an average of 1.8 touches per press. This season, Manchester City have averaged (7.5 touches for each opponent press.",
            id: "1481034606363222016"
          },
          {
            text: "Manchester City attempted 10 challenges resulting in nine successful tackles. In their last game (against Brentford) Manchester City attempted seven challenges.",
            id: "1481034608003235844"
          },
          {
            text: "Manchester City attempted three challenges in the defensive third. In their last game (against Brentford) City made one challenges in the defensive third, while throughout the season they've averaged 8.6 per 90 minutes.",
            id: "1481034609655795714"
          },
          {
            text: "Manchester City won an impressive 21 aerial duels to Arsenal's 10. This season Manchester City have averaged 13.0 per 90 minutes.",
            id: "1481034611417362432"
          },
          {
            text: "Manchester City won an impressive 68% or the game's aerial duels. In their last game they won 54% and across the season they've won 53%.",
            id: "1481034614059585537"
          },
          {
            text: "Raheem Sterling, our man of the match, created some of the best chances of the game - tallying an xA of 0.2 (more than anyone else on the pitch) resulting in 0.2 (more than anyone else on the pitch) - more than anyone else on the pitch.",
            id: "1481034615842394115"
          },
          {
            text: "Raheem Sterling played no successful passes - the second most of any Manchester City player.",
            id: "1481034618040201221"
          },
          {
            text: "Rodri found a teammate with 93% of his attempted passes, the second highest pass completion rate of any Manchester City player.",
            id: "1481034619717836806"
          },
          {
            text: "Rodri played more successful long balls than any other player on the pitch (11), followed by Aymeric Laporte, who completed 14.",
            id: "1481034621274009609"
          },
          {
            text: "Rahee Sterling attempted to play three challenges (more than any other player on the pitch) and completed two successful dribbles.",
            id: "1481038398118899719"
          },
          {
            text: "Rodri pressed the opponent 13 times - more than any other player in a Manchester City shirt. Raheem Sterling pressed 12 times.",
            id: "1481038399930777607"
          },
          {
            text: "Raheem Sterling pressed the opponent 4 times, winning possession on four occassions.",
            id: "1481038401541394439"
          },
          {
            text: "Raheem Sterling attempted to make more challenges than any other Manchester City player (challanges), resulting in three successful tackles (more than any other player on the pitch). Rodri attempted three challenges, completing three successful tackles.",
            id: "1481038403537879043"
          },
          {
            text: "Raheem Sterling made one interceptions - the second most of any Manchester City player.",
            id: "1481038405341528065"
          },
          {
            text: "Rodri made five clearances - more than any other player on the pitch.",
            id: "1481038407526670337"
          }
        ],
        misc: {
          story_id: 4,
          team: "Manchester City",
          opponent: "Arsenal",
          result: [
            1,
            2
          ],
          date: "2022-01-01",
          stories: [
            [
              [
                "Manchester City",
                "Passing_TotalSucc",
                582
              ],
              [
                "Arsenal",
                "Passing_TotalSucc",
                192
              ]
            ],
            [
              [
                "Manchester City",
                "Attack_TacklesFinal3rd",
                6
              ],
              [
                "Manchester City",
                "Attack_TacklesFinal3rd!p-Brentford",
                2
              ],
              [
                "Manchester City",
                "Attack_TacklesFinal3rd!s",
                2.57
              ]
            ],
            [
              [
                "Manchester City",
                "Possession_Touches",
                760
              ],
              [
                "Arsenal",
                "Possession_Touches",
                363
              ]
            ],
            [
              [
                "Manchester City",
                "Possession_TchPPressTakenRatio",
                9.16
              ],
              [
                "Arsenal",
                "Possession_TchPPressTakenRatio",
                1.8
              ],
              [
                "Manchester City",
                "Possession_TchPPressTakenRatio!s",
                7.5
              ]
            ],
            [
              [
                "Manchester City",
                "Defence_Tackles",
                10
              ],
              [
                "Manchester City",
                "Defence_Tackles!p-Brentford",
                7
              ],
              [
                "Manchester City",
                "Defence_TacklesSucc",
                9
              ]
            ],
            [
              [
                "Manchester City",
                "Defence_TacklesSucc!p-Brentford",
                3
              ],
              [
                "Manchester City",
                "Defence_TacklesSucc!s",
                8.62
              ],
              [
                "Manchester City",
                "Defence_TacklesDef3rd",
                3
              ],
              [
                "Manchester City",
                "Defence_TacklesDef3rd!p-Brentford",
                1
              ]
            ],
            [
              [
                "Manchester City",
                "Defence_AerialSucc",
                21
              ],
              [
                "Arsenal",
                "Defence_AerialSucc",
                10
              ],
              [
                "Manchester City",
                "Defence_AerialSucc!s",
                12.86
              ]
            ],
            [
              [
                "Manchester City",
                "Defence_AerialPerc",
                67.7
              ],
              [
                "Arsenal",
                "Defence_AerialPerc",
                32.3
              ],
              [
                "Manchester City",
                "Defence_AerialPerc!p-Brentford",
                54.5
              ],
              [
                "Manchester City",
                "Defence_AerialPerc!s",
                53.3
              ]
            ],
            [
              [
                "Raheem Sterling - Manchester City",
                "Attack_xA",
                0.2
              ],
              [
                "Raheem Sterling - Manchester City",
                "MOTM",
                "true"
              ],
              [
                "Raheem Sterling - Manchester City",
                "Attack_xA!r",
                1
              ]
            ],
            [
              [
                "Raheem Sterling - Manchester City",
                "Attack_Assist",
                0
              ],
              [
                "Raheem Sterling - Manchester City",
                "Attack_Assist!tr",
                2
              ]
            ],
            [
              [
                "Rodri - Manchester City",
                "Passing_TotalPerc",
                93.2
              ],
              [
                "Rodri - Manchester City",
                "Passing_TotalPerc!tr",
                2
              ]
            ],
            [
              [
                "Rodri - Manchester City",
                "Passing_LongSucc",
                11
              ],
              [
                "Aymeric Laporte - Manchester City",
                "Passing_LongSucc",
                14
              ],
              [
                "Aymeric Laporte - Manchester City",
                "Passing_LongSucc!r",
                1
              ],
              [
                "Rodri - Manchester City",
                "Passing_LongSucc!r",
                2
              ]
            ],
            [
              [
                "Raheem Sterling - Manchester City",
                "Possession_ReceiveProg",
                9
              ],
              [
                "Raheem Sterling - Manchester City",
                "Possession_ReceiveProg!r",
                1
              ],
              [
                "Raheem Sterling - Manchester City",
                "Possession_DrbSucc",
                2
              ],
              [
                "Raheem Sterling - Manchester City",
                "Defence_Tackles",
                3
              ],
              [
                "Rodri - Manchester City",
                "Defence_Tackles",
                3
              ]
            ],
            [
              [
                "Raheem Sterling - Manchester City",
                "Defence_Press",
                12
              ],
              [
                "Rodri - Manchester City",
                "Defence_Press",
                13
              ],
              [
                "Rodri - Manchester City",
                "Defence_Press!tr",
                1
              ],
              [
                "Raheem Sterling - Manchester City",
                "Defence_Press!tr",
                2
              ]
            ],
            [
              [
                "Raheem Sterling - Manchester City",
                "Defence_PressSucc",
                4
              ],
              [
                "Raheem Sterling - Manchester City",
                "Defence_PressSucc!tr",
                2
              ]
            ],
            [
              [
                "Raheem Sterling - Manchester City",
                "Defence_Tackles!tr",
                1
              ],
              [
                "Raheem Sterling - Manchester City",
                "Defence_TacklesSucc",
                3
              ],
              [
                "Raheem Sterling - Manchester City",
                "Defence_TacklesSucc!r",
                1
              ],
              [
                "Rodri - Manchester City",
                "Defence_TacklesSucc",
                3
              ]
            ],
            [],
            [
              [
                "Raheem Sterling - Manchester City",
                "Defence_Int",
                1
              ],
              [
                "Raheem Sterling - Manchester City",
                "Defence_Int!tr",
                2
              ]
            ],
            [
              [
                "Rodri - Manchester City",
                "Defence_Clearances",
                5
              ],
              [
                "Rodri - Manchester City",
                "Defence_Clearances!r",
                1
              ]
            ]
          ]
        }
      },
      "5": {
        data: [
          {
            text: "Newcastle applied more pressure high up the pitch, pressing 39 times in the final third while Manchester Utd pressed 28 times in the final third.",
            id: "1481039135460630528"
          },
          {
            text: "In their last game (against Manchester City) the Magpies pressed 39 times in the final third and have pressed 25.0 times in the final third this season..",
            id: "1481039137796988929"
          },
          {
            text: "Newcastle were aggressive out of possession, making four tackles in the final third to Manchester United's one.",
            id: "1481039139835416580"
          },
          {
            text: "In their last game (against Manchester City) the Magpies attempted one challenges in the final third, while throughout the season they've averaged 2.3 tackles in the final third per 90 minutes..",
            id: "1481039141668376577"
          },
          {
            text: "Newcastle Utd gave their opponent an average of 4.8 touches each time they pressed. Manchester Utd allowed the Magpies 3.0 touches per press, considerably more than the 3.5 touches permitted by Manchester United in Newcastle's last game.",
            id: "1481039143811665920"
          },
          {
            text: "Newcastle Utd attempted 21 challenges resulting in 10 successful tackles.",
            id: "1481039145938132998"
          },
          {
            text: "In their last game (against Manchester City) the Magpies attempted 12 challenges, making 10 successful tackles, while this season they have averaged 18.0 challenges and 10.0 successful tackles per 90 minutes..",
            id: "1481042922783059971"
          },
          {
            text: "Newcastle made five successful tackles in this match, similar to the five they made in their last match (against Manchester City).",
            id: "1481042925052170243"
          },
          {
            text: "Newcastle Utd attempted 11 challenges in the defensive third, considerably more than the six made by Manchester Utd.",
            id: "1481042926717358080"
          },
          {
            text: "Joelinton, our man of the match, created some of the best chances of the game. He carried the ball into the box seven times, played seven key passes and finished with an xA of 0.2.",
            id: "1481042928730619904"
          },
          {
            text: "Joelinton played an impressive four key passes - more than anyone else on the pitch.",
            id: "1481042931154923522"
          },
          {
            text: "Allan Saint-Maximin took four shots on target (more than any other player on the pitch), followed by Jonjo Shelvey, who completed two shots on target.",
            id: "1481042932866207746"
          },
          {
            text: "Allan Saint-Maximin carried the ball into the opponent's box one times, more than any other Newcastle player.",
            id: "1481042934984232967"
          },
          {
            text: "Joelinton made 212 yards worth of progressive passes (76%), while Jonjo Shelvey successfully passed the ball 212 yards towards the opponent's goal.",
            id: "1481042938889187329"
          },
          {
            text: "Allan Saint-Maximin successfuly recieved six progressive passes (more than any other Newcastle player) and recieved 6 progressive passes.",
            id: "1481042940759887875"
          },
          {
            text: "Joelinton carried the ball a total of 142 yards towards the opponent's goal - second farthest of any Newcastle player.",
            id: "1481042942580117505"
          },
          {
            text: "Allan Saint-Maximin carried the ball into the final third seven times (more than any other player on the pitch), while Allan Saint-Maximin made six carries into the final third.",
            id: "1481042944270417924"
          },
          {
            text: "Joelinton successfully dribbled past an opponent on two occasions out of two attempts - more than any other Newcastle player.",
            id: "1481042946174689288"
          },
          {
            text: "Joelinton pressed the opponent 27 times - more than any other player on the pitch.",
            id: "1481046722855985152"
          },
          {
            text: "Joelinton pressed the opponent more times (21) than any other player in a Newcastle shirt, followed by Jonjo Shelvey, who pressed 8 times, winning possession on nine occasions.",
            id: "1481046724395380743"
          },
          {
            text: "Joelinton attempted to make more challenges than any other player on the pitch (two), resulting in two successful tackles (more than any other Newcastle player).",
            id: "1481046726035263497"
          },
          {
            text: "Joelinton made three interceptions and won three aerial duels (more than any other Newcastle player). Joelinton also made three interceptions and won three aerial duels (more than any other Newcastle player).",
            id: "1481046727683678209"
          }
        ],
        misc: {
          story_id: 5,
          team: "Newcastle Utd",
          opponent: "Manchester Utd",
          result: [
            1,
            1
          ],
          date: "2021-12-27",
          stories: [
            [
              [
                "Newcastle Utd",
                "Attack_SoT",
                8
              ],
              [
                "Manchester Utd",
                "Attack_SoT",
                3
              ],
              [
                "Newcastle Utd",
                "Attack_SoT!p-Manchester City",
                1
              ],
              [
                "Newcastle Utd",
                "Attack_SoT!s",
                3.26
              ]
            ],
            [
              [
                "Newcastle Utd",
                "Attack_PressFinal3rd",
                39
              ],
              [
                "Manchester Utd",
                "Attack_PressFinal3rd",
                28
              ],
              [
                "Newcastle Utd",
                "Attack_PressFinal3rd!p-Manchester City",
                20
              ],
              [
                "Newcastle Utd",
                "Attack_PressFinal3rd!s",
                24.95
              ]
            ],
            [
              [
                "Newcastle Utd",
                "Attack_TacklesFinal3rd",
                4
              ],
              [
                "Manchester Utd",
                "Attack_TacklesFinal3rd",
                1
              ],
              [
                "Newcastle Utd",
                "Attack_TacklesFinal3rd!p-Manchester City",
                1
              ],
              [
                "Newcastle Utd",
                "Attack_TacklesFinal3rd!s",
                2.32
              ]
            ],
            [
              [
                "Newcastle Utd",
                "Possession_TchPPressGivenRatio",
                4.82
              ],
              [
                "Manchester Utd",
                "Possession_TchPPressGivenRatio",
                2.99
              ],
              [
                "Newcastle Utd",
                "Possession_TchPPressGivenRatio!s",
                3.51
              ]
            ],
            [
              [
                "Newcastle Utd",
                "Defence_Tackles",
                21
              ],
              [
                "Newcastle Utd",
                "Defence_Tackles!p-Manchester City",
                12
              ],
              [
                "Newcastle Utd",
                "Defence_Tackles!s",
                18.05
              ],
              [
                "Newcastle Utd",
                "Defence_TacklesSucc",
                10
              ]
            ],
            [
              [
                "Newcastle Utd",
                "Defence_TacklesSucc!p-Manchester City",
                5
              ]
            ],
            [
              [
                "Newcastle Utd",
                "Defence_TacklesDef3rd",
                11
              ],
              [
                "Manchester Utd",
                "Defence_TacklesDef3rd",
                6
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Attack_xA",
                0.2
              ],
              [
                "Joelinton - Newcastle Utd",
                "MOTM",
                "true"
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Attack_KP",
                4
              ],
              [
                "Joelinton - Newcastle Utd",
                "Attack_KP!r",
                1
              ]
            ],
            [
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Attack_SoT",
                4
              ],
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Attack_SoT!r",
                1
              ],
              [
                "Jonjo Shelvey - Newcastle Utd",
                "Attack_SoT",
                2
              ],
              [
                "Jonjo Shelvey - Newcastle Utd",
                "Attack_SoT!r",
                2
              ]
            ],
            [
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Attack_CarriesPA",
                1
              ],
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Attack_CarriesPA!tr",
                1
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Passing_TotalSucc",
                31
              ],
              [
                "Joelinton - Newcastle Utd",
                "Passing_TotalSucc!tr",
                1
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_Tackles",
                5
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Passing_TotalPerc",
                75.6
              ],
              [
                "Jonjo Shelvey - Newcastle Utd",
                "Passing_TotalPerc",
                78.8
              ],
              [
                "Jonjo Shelvey - Newcastle Utd",
                "Passing_TotalPerc!tr",
                1
              ],
              [
                "Joelinton - Newcastle Utd",
                "Passing_PassesPrgDist",
                212
              ],
              [
                "Joelinton - Newcastle Utd",
                "Passing_PassesPrgDist!tr",
                1
              ]
            ],
            [
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Possession_ReceiveProg",
                6
              ],
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Possession_ReceiveProg!tr",
                1
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Possession_CarriesPrgDist",
                142
              ],
              [
                "Joelinton - Newcastle Utd",
                "Possession_CarriesPrgDist!tr",
                2
              ]
            ],
            [
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Possession_CarriesFinal3rd",
                3
              ],
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Possession_CarriesFinal3rd!r",
                1
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Possession_DrbSucc",
                2
              ],
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Possession_DrbSucc",
                2
              ],
              [
                "Allan Saint-Maximin - Newcastle Utd",
                "Possession_DrbSucc!tr",
                1
              ],
              [
                "Joelinton - Newcastle Utd",
                "Possession_DrbSucc!tr",
                2
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Defence_Press",
                27
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_Press!r",
                1
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Defence_PressSucc",
                9
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_PressSucc!tr",
                1
              ],
              [
                "Jonjo Shelvey - Newcastle Utd",
                "Defence_PressSucc",
                8
              ],
              [
                "Jonjo Shelvey - Newcastle Utd",
                "Defence_PressSucc!tr",
                2
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Defence_Tackles!r",
                1
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_TacklesSucc",
                2
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_TacklesSucc!tr",
                1
              ]
            ],
            [
              [
                "Joelinton - Newcastle Utd",
                "Defence_Int",
                3
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_AerialSucc",
                3
              ],
              [
                "Joelinton - Newcastle Utd",
                "Defence_AerialSucc!tr",
                1
              ]
            ]
          ]
        }
      },
      "6": {
        data: [
          {
            text: "It was a dominant display by Chelsea, who completed 477 passes to Chelsea's 477. In their last game (against Brighton) Chelsea completed 365 passes, while they've completed 365.",
            id: "1481047280727859201"
          },
          {
            text: "Chelsea took six shots on target, up from five in their last game against Brighton. This season the Blues have averaged 5.1 took six shots on target per 90 minutes.",
            id: "1481047282904666116"
          },
          {
            text: "Chelsea applied more pressure high up the pitch, pressing 45 times in the final third while Liverpool pressed 29 times in the final third. This season the Blues have pressed 38.0 times in the final third per 90 minutes.",
            id: "1481047284582338561"
          },
          {
            text: "Chelsea played an impressive 73 successful long balls, compared with 44 from Liverpool. In their last game (against Brighton) the Blues successfully played 51 long balls and have averaged 60.0 per 90 minutes this season.",
            id: "1481047286449082370"
          },
          {
            text: "Chelsea completed 63% of the passes they played long, compared with 47% from Liverpool.",
            id: "1481047288357212172"
          },
          {
            text: "In this match Chelsea controlled possession, taking 736 touches to Chelsea's 736. In their last game (against Brighton) the Blues took 600 touches, while they've averaged 735.0 touches for each opponent press.",
            id: "1481047289988792322"
          },
          {
            text: "Chelsea were given an average of 4.5 touches each time the opponent pressed - more than the amount of touches they were given in their last game (3.7 touches per Brighton press).",
            id: "1481047291725295619"
          },
          {
            text: "Chelsea attempted 17 challenges resulting in 12 successful tackles. Liverpool attempted 13 challenges, completing nine successful tackles.",
            id: "1481047293436567555"
          },
          {
            text: "Chelsea made 11.0 successful tackles in this match, considerably more than the 11.0 successful tackles they've averaged per 90 minutes this season.",
            id: "1481047295068102658"
          },
          {
            text: "N'Golo Kante played three key passes - more than anyone else on the pitch.",
            id: "1481051073083236357"
          },
          {
            text: "Christian Pulisic took two shots on target - more than any other Chelsea player.",
            id: "1481051074664534019"
          },
          {
            text: "Christian Pulisic carried the ball into the opponent's box four times, more than any other player on the pitch.",
            id: "1481051076258418692"
          },
          {
            text: "N'Golo Kante made more successful passes into the final third than any other player on the pitch (eight), while N'Golo Kante completed 10 long balls.",
            id: "1481051078863069188"
          },
          {
            text: "Christian Pulisic successfuly recieved 12 progressive passes (more than any other player on the pitch) and recieved 12 progressive passes.",
            id: "1481051080523931651"
          },
          {
            text: "N'Golo Kante successfully dribbled past an opponent on three occasions out of three attempts - more than any other player on the pitch. Kante was also involved in five shot creating actions.",
            id: "1481051082113658880"
          },
          {
            text: "Christian Pulisic pressed the opponent 28 times - more than any other player in a Chelsea shirt.",
            id: "1481051083749437441"
          },
          {
            text: "Christian Pulisic pressed the opponent seven times, winning possession on eight occassions.",
            id: "1481051085334892546"
          }
        ],
        misc: {
          story_id: 6,
          team: "Chelsea",
          opponent: "Liverpool",
          result: [
            2,
            2
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Chelsea",
                "Passing_TotalSucc",
                477
              ],
              [
                "Chelsea",
                "Passing_TotalSucc!p-Brighton",
                365
              ]
            ],
            [
              [
                "Chelsea",
                "Attack_SoT",
                6
              ],
              [
                "Chelsea",
                "Attack_SoT!p-Brighton",
                5
              ],
              [
                "Chelsea",
                "Attack_SoT!s",
                5.14
              ]
            ],
            [
              [
                "Chelsea",
                "Attack_PressFinal3rd",
                45
              ],
              [
                "Liverpool",
                "Attack_PressFinal3rd",
                29
              ],
              [
                "Chelsea",
                "Attack_PressFinal3rd!s",
                37.76
              ]
            ],
            [
              [
                "Chelsea",
                "Passing_LongSucc",
                73
              ],
              [
                "Liverpool",
                "Passing_LongSucc",
                44
              ],
              [
                "Chelsea",
                "Passing_LongSucc!p-Brighton",
                51
              ],
              [
                "Chelsea",
                "Passing_LongSucc!s",
                60.05
              ]
            ],
            [
              [
                "Chelsea",
                "Passing_LongPerc",
                62.9
              ],
              [
                "Liverpool",
                "Passing_LongPerc",
                47.3
              ]
            ],
            [
              [
                "Chelsea",
                "Possession_Touches",
                736
              ],
              [
                "Chelsea",
                "Possession_Touches!p-Brighton",
                600
              ],
              [
                "Chelsea",
                "Possession_Touches!s",
                724.86
              ]
            ],
            [
              [
                "Chelsea",
                "Possession_TchPPressTakenRatio",
                4.49
              ],
              [
                "Chelsea",
                "Possession_TchPPressTakenRatio!p-Brighton",
                3.66
              ]
            ],
            [
              [
                "Chelsea",
                "Defence_Tackles",
                17
              ],
              [
                "Liverpool",
                "Defence_Tackles",
                13
              ],
              [
                "Chelsea",
                "Defence_TacklesSucc",
                12
              ],
              [
                "Liverpool",
                "Defence_TacklesSucc",
                9
              ]
            ],
            [
              [
                "Chelsea",
                "Defence_TacklesSucc!s",
                10.52
              ]
            ],
            [
              [
                "N'Golo Kante - Chelsea",
                "Attack_xA",
                0.4
              ],
              [
                "N'Golo Kante - Chelsea",
                "MOTM",
                "true"
              ],
              [
                "N'Golo Kante - Chelsea",
                "Attack_xA!r",
                1
              ]
            ],
            [
              [
                "N'Golo Kante - Chelsea",
                "Attack_KP",
                3
              ],
              [
                "N'Golo Kante - Chelsea",
                "Attack_KP!r",
                1
              ]
            ],
            [
              [
                "Christian Pulisic - Chelsea",
                "Attack_SoT",
                2
              ],
              [
                "Christian Pulisic - Chelsea",
                "Attack_SoT!tr",
                1
              ]
            ],
            [
              [
                "Christian Pulisic - Chelsea",
                "Attack_CarriesPA",
                4
              ],
              [
                "Christian Pulisic - Chelsea",
                "Attack_CarriesPA!r",
                1
              ]
            ],
            [
              [
                "N'Golo Kante - Chelsea",
                "Passing_PassesFinal3rd",
                8
              ],
              [
                "N'Golo Kante - Chelsea",
                "Passing_PassesFinal3rd!r",
                1
              ],
              [
                "N'Golo Kante - Chelsea",
                "Passing_LongSucc",
                10
              ]
            ],
            [
              [
                "Christian Pulisic - Chelsea",
                "Possession_ReceiveProg",
                12
              ],
              [
                "Christian Pulisic - Chelsea",
                "Possession_ReceiveProg!r",
                1
              ]
            ],
            [
              [
                "N'Golo Kante - Chelsea",
                "Possession_CarriesPrgDist",
                158
              ],
              [
                "N'Golo Kante - Chelsea",
                "Possession_CarriesPrgDist!r",
                1
              ],
              [
                "N'Golo Kante - Chelsea",
                "Possession_DrbSucc",
                3
              ]
            ],
            [
              [
                "Christian Pulisic - Chelsea",
                "Defence_Press",
                28
              ],
              [
                "Christian Pulisic - Chelsea",
                "Defence_Press!tr",
                1
              ]
            ],
            [
              [
                "Christian Pulisic - Chelsea",
                "Defence_PressSucc",
                7
              ],
              [
                "Cesar Azpilicueta - Chelsea",
                "Defence_PressSucc",
                8
              ],
              [
                "Cesar Azpilicueta - Chelsea",
                "Defence_PressSucc!tr",
                1
              ],
              [
                "Christian Pulisic - Chelsea",
                "Defence_PressSucc!tr",
                2
              ]
            ]
          ]
        }
      },
      "7": {
        data: [
          {
            text: "Arsenal applied more pressure high up the pitch, pressing 72 times in the final third while Manchester City pressed 19 times in the final third.",
            id: "1481051697376108544"
          },
          {
            text: "In their last game (against Norwich) the Gunners pressed 72 times in the final third and have pressed 36.0 times in the final third this season..",
            id: "1481051699464839174"
          },
          {
            text: "Arsenal were aggressive when of possession, making three tackles in the final third compared with one in their last game (against Norwich).",
            id: "1481051701599686657"
          },
          {
            text: "Arsenal were patient off the ball, allowing Manchester City an average of 9.2 touches each time they pressed.",
            id: "1481051703789203460"
          },
          {
            text: "Manchester City allowed the Gunners 1.8 touches per press, considerably less than the 4.8 touches permitted by Norwich in Arsenal's last game. This season they've averaged (4.8 touches for each opponent press..",
            id: "1481051705911525380"
          },
          {
            text: "Arsenal attempted 23 challenges resulting in 13 successful tackles, while Manchester City made 10 challenges and nine successful tackles.",
            id: "1481055482840334336"
          },
          {
            text: "In their last match (against Norwich) the Gunners attempted 17 challenges, making 13 successful tackles, while this season they have averaged 16.0 challenges and 9 successful tackles per 90 minutes..",
            id: "1481055485138722820"
          },
          {
            text: "Arsenal attempted 12 challenges in the defensive third, considerably more than the three made by Manchester City. In their last game (against Norwich) the Gunners attempted nine challenges in the defensive third, while throughout the season they've averaged 7.4 per 90 minutes.",
            id: "1481055487302983681"
          },
          {
            text: "Thomas Partey, our man of the match, created some of the best chances of the game. He carried the ball into the box once, played one key passes and finished with an xA of 0.1.",
            id: "1481055489068875779"
          },
          {
            text: "Thomas Partey successfuly completed 25 passes - more than any other Arsenal player.",
            id: "1481055491144957952"
          },
          {
            text: "Granit Xhaka completed 100% of his passes - the highest rate of any player on the pitch.",
            id: "1481055492805906441"
          },
          {
            text: "Thomas Partey were aggressive when of possession, making five tackles into the final third - more than any other player on the pitch. He also played nine passes into the final third, more than any other player on the pitch.",
            id: "1481055494420762625"
          },
          {
            text: "Thomas Partey carried the ball farther towards the opponent's goal than any other Arsenal player (a combined 143 yards), while Thomas Partey carried the ball a combined 143 yards towards the opponent's goal.",
            id: "1481055496178225155"
          },
          {
            text: "Granit Xhaka carried the ball into the final third two times (more than any other Arsenal player), while Granit Xhaka made two carries into the final third.",
            id: "1481055498040487937"
          },
          {
            text: "Thomas Partey successfully dribbled past an opponent on four occasions out of six attempts - more than any other player on the pitch. Martinelli successfully dribbled past an opponent on four occasions out of six attempts.",
            id: "1481055499755917313"
          },
          {
            text: "Granit Xhaka pressed the opponent 27 times - more than any other player on the pitch.",
            id: "1481055502784249861"
          },
          {
            text: "Thomas Partey pressed the opponent 10 times, winning possession on 10 occassions.",
            id: "1481055504482938880"
          },
          {
            text: "Granit Xhaka made three successful tackles (more than any other player on the pitch), while Thomas Partey made two.",
            id: "1481055506718470147"
          },
          {
            text: "Granit Xhaka made three interceptions, while Martinelli made five.",
            id: "1481059284091867139"
          }
        ],
        misc: {
          story_id: 7,
          team: "Arsenal",
          opponent: "Manchester City",
          result: [
            1,
            2
          ],
          date: "2022-01-01",
          stories: [
            [
              [
                "Arsenal",
                "Attack_PressFinal3rd",
                72
              ],
              [
                "Manchester City",
                "Attack_PressFinal3rd",
                19
              ],
              [
                "Arsenal",
                "Attack_PressFinal3rd!p-Norwich City",
                26
              ],
              [
                "Arsenal",
                "Attack_PressFinal3rd!s",
                35.85
              ]
            ],
            [
              [
                "Arsenal",
                "Attack_TacklesFinal3rd",
                3
              ],
              [
                "Arsenal",
                "Attack_TacklesFinal3rd!p-Norwich City",
                1
              ]
            ],
            [
              [
                "Arsenal",
                "Possession_TchPPressGivenRatio",
                9.16
              ],
              [
                "Manchester City",
                "Possession_TchPPressGivenRatio",
                1.8
              ],
              [
                "Arsenal",
                "Possession_TchPPressGivenRatio!p-Norwich City",
                2.17
              ],
              [
                "Arsenal",
                "Possession_TchPPressGivenRatio!s",
                4.76
              ]
            ],
            [
              [
                "Arsenal",
                "Defence_Tackles",
                23
              ],
              [
                "Manchester City",
                "Defence_Tackles",
                10
              ],
              [
                "Arsenal",
                "Defence_Tackles!p-Norwich City",
                17
              ],
              [
                "Arsenal",
                "Defence_Tackles!s",
                15.7
              ],
              [
                "Arsenal",
                "Defence_TacklesSucc",
                13
              ],
              [
                "Manchester City",
                "Defence_TacklesSucc",
                9
              ]
            ],
            [],
            [
              [
                "Arsenal",
                "Defence_TacklesSucc!s",
                9.5
              ],
              [
                "Arsenal",
                "Defence_TacklesDef3rd",
                12
              ],
              [
                "Manchester City",
                "Defence_TacklesDef3rd",
                3
              ],
              [
                "Arsenal",
                "Defence_TacklesDef3rd!p-Norwich City",
                9
              ],
              [
                "Arsenal",
                "Defence_TacklesDef3rd!s",
                7.4
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "MOTM",
                "true"
              ],
              [
                "Thomas Partey - Arsenal",
                "Attack_xA",
                0.1
              ],
              [
                "Thomas Partey - Arsenal",
                "Attack_KP",
                1
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "Passing_TotalSucc",
                25
              ],
              [
                "Thomas Partey - Arsenal",
                "Passing_TotalSucc!tr",
                1
              ]
            ],
            [
              [
                "Granit Xhaka - Arsenal",
                "Passing_TotalPerc",
                100
              ],
              [
                "Granit Xhaka - Arsenal",
                "Passing_TotalPerc!r",
                1
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "Passing_PassesFinal3rd",
                9
              ],
              [
                "Thomas Partey - Arsenal",
                "Passing_PassesFinal3rd!r",
                1
              ],
              [
                "Thomas Partey - Arsenal",
                "Defence_Tackles",
                5
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "Possession_CarriesPrgDist",
                143
              ],
              [
                "Thomas Partey - Arsenal",
                "Possession_CarriesPrgDist!tr",
                1
              ]
            ],
            [
              [
                "Granit Xhaka - Arsenal",
                "Possession_CarriesFinal3rd",
                2
              ],
              [
                "Granit Xhaka - Arsenal",
                "Possession_CarriesFinal3rd!tr",
                1
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "Possession_DrbSucc",
                6
              ],
              [
                "Thomas Partey - Arsenal",
                "Possession_DrbSucc!r",
                1
              ],
              [
                "Martinelli - Arsenal",
                "Possession_DrbSucc",
                4
              ],
              [
                "Martinelli - Arsenal",
                "Possession_DrbSucc!r",
                2
              ]
            ],
            [
              [
                "Granit Xhaka - Arsenal",
                "Defence_Press",
                27
              ],
              [
                "Granit Xhaka - Arsenal",
                "Defence_Press!r",
                1
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "Defence_PressSucc",
                10
              ],
              [
                "Granit Xhaka - Arsenal",
                "Defence_PressSucc",
                10
              ],
              [
                "Granit Xhaka - Arsenal",
                "Defence_PressSucc!r",
                1
              ],
              [
                "Thomas Partey - Arsenal",
                "Defence_PressSucc!r",
                2
              ]
            ],
            [
              [
                "Thomas Partey - Arsenal",
                "Defence_TacklesSucc",
                2
              ],
              [
                "Granit Xhaka - Arsenal",
                "Defence_TacklesSucc",
                3
              ],
              [
                "Granit Xhaka - Arsenal",
                "Defence_TacklesSucc!r",
                1
              ]
            ],
            [
              [
                "Granit Xhaka - Arsenal",
                "Defence_Int",
                3
              ],
              [
                "Martinelli - Arsenal",
                "Defence_Int",
                5
              ],
              [
                "Martinelli - Arsenal",
                "Defence_Int!r",
                1
              ],
              [
                "Granit Xhaka - Arsenal",
                "Defence_Int!tr",
                2
              ]
            ]
          ]
        }
      },
      "8": {
        data: [
          {
            text: "Norwich City saw slightly less of the ball, completing 313 passes to the 244 they saw in their last game (against Arsenal).",
            id: "1481059959722987520"
          },
          {
            text: "Norwich City saw more of the ball, completing an impressive 77% of his passes. Crystal Palace completed 77% of his passes.",
            id: "1481059961740447752"
          },
          {
            text: "Norwich City succesffuly played 23 passes into the final third, compared with 22 from Crystal Palace. In their last game (against Arsenal) City completed 11 passes into the final third and have averaged 22.0 per 90 minutes this season.",
            id: "1481059965217480704"
          },
          {
            text: "Crystal Palace saw more of the ball, taking 565 touches to Norwich City's 538. Crystal Palace took 565 touches to Norwich City's 538.",
            id: "1481059966953869320"
          },
          {
            text: "Norwich City were given an average of 3.9 touches each time the opponent pressed - Crystal Palace took an average of 3.7 touches per press. In their last game they took 2.9 touches each time the opponent pressed and have averaged (3.7 touches for each opponent press.",
            id: "1481059968593936385"
          },
          {
            text: "Norwich City gave their opponent an average of 3.7 touches each time they pressed. This season they have averaged 3.7 touches for each opponent press.",
            id: "1481059970238107653"
          },
          {
            text: "Norwich City made seven successful tackles in this match, similar to the five they made in their last match (against Arsenal).",
            id: "1481059971928313858"
          },
          {
            text: "Norwich City attempted seven challenges in the defensive third. In their last game (against Arsenal) City attempted four challenges in the defensive third.",
            id: "1481059973551595527"
          },
          {
            text: "Norwich City won 16 aerial duels, considerably more than their average per 90 minute this season (16.0).",
            id: "1481059975149596681"
          },
          {
            text: "Adam Idah scored no goals to Christos Tzolis' zero, while Christos Tzolis scored no goals.",
            id: "1481059977250934790"
          },
          {
            text: "Adam Idah played more successful passes than any other Norwich player (zero), while Christos Tzolis completed zero shots on target.",
            id: "1481059978836426756"
          },
          {
            text: "Billy Gilmour successfuly completed 57 passes - more than any other player on the pitch.",
            id: "1481063755534512133"
          },
          {
            text: "Billy Gilmour made more successful passes into the final third than any other Norwich player (six), while Billy Gilmour completed six passes into the final third.",
            id: "1481063757098983425"
          },
          {
            text: "Billy Gilmour played more successful long balls than any other player on the pitch (13), while Billy Gilmour completed 13.",
            id: "1481063758734802948"
          },
          {
            text: "Adam Idah successfuly recieved 10 progressive passes (more than any other player on the pitch) and recieved 10 progressive passes.",
            id: "1481063760324444160"
          },
          {
            text: "Billy Gilmour carried the ball a combined 100 yards towards the opponent's goal - second farthest of any Norwich player.",
            id: "1481063762014711811"
          },
          {
            text: "Billy Gilmour were aggressive when of possession, making four tackles (more than any other player on the pitch), while Christos Tzolis made four carries into the final third.",
            id: "1481063763516309516"
          },
          {
            text: "Billy Gilmour successfully dribbled past an opponent on one occasions out of three attempts - more than any other player on the pitch.",
            id: "1481063765261103111"
          },
          {
            text: "Billy Gilmour pressed the opponent 23 times - more than any other player on the pitch. Adam Idah pressed 15 times.",
            id: "1481063766888493056"
          },
          {
            text: "Billy Gilmour pressed the opponent seven times (more than any other player on the pitch), winning possession on seven occassions.",
            id: "1481063768499048452"
          },
          {
            text: "Billy Gilmour attempted to make more challenges than any other Norwich player (two), resulting in two successful tackles (more than any other Norwich player). Christos Tzolis attempted one successful tackles.",
            id: "1481063770092969989"
          }
        ],
        misc: {
          story_id: 8,
          team: "Norwich City",
          opponent: "Crystal Palace",
          result: [
            3,
            0
          ],
          date: "2021-12-28",
          stories: [
            [
              [
                "Norwich City",
                "Passing_TotalSucc",
                313
              ],
              [
                "Norwich City",
                "Passing_TotalSucc!p-Arsenal",
                244
              ]
            ],
            [
              [
                "Norwich City",
                "Passing_TotalPerc",
                76.9
              ],
              [
                "Crystal Palace",
                "Passing_TotalPerc",
                76.8
              ]
            ],
            [
              [
                "Norwich City",
                "Attack_PressFinal3rd",
                40
              ],
              [
                "Crystal Palace",
                "Attack_PressFinal3rd",
                26
              ],
              [
                "Norwich City",
                "Attack_PressFinal3rd!s",
                32.37
              ]
            ],
            [
              [
                "Norwich City",
                "Passing_PassesFinal3rd",
                23
              ],
              [
                "Crystal Palace",
                "Passing_PassesFinal3rd",
                22
              ],
              [
                "Norwich City",
                "Passing_PassesFinal3rd!p-Arsenal",
                11
              ],
              [
                "Norwich City",
                "Passing_PassesFinal3rd!s",
                21.68
              ]
            ],
            [
              [
                "Norwich City",
                "Possession_Touches",
                538
              ],
              [
                "Crystal Palace",
                "Possession_Touches",
                565
              ]
            ],
            [
              [
                "Norwich City",
                "Possession_TchPPressTakenRatio",
                3.9
              ],
              [
                "Crystal Palace",
                "Possession_TchPPressTakenRatio",
                3.67
              ],
              [
                "Norwich City",
                "Possession_TchPPressTakenRatio!p-Arsenal",
                2.85
              ],
              [
                "Norwich City",
                "Possession_TchPPressTakenRatio!s",
                3.66
              ]
            ],
            [
              [
                "Norwich City",
                "Possession_TchPPressGivenRatio",
                3.67
              ],
              [
                "Norwich City",
                "Possession_TchPPressGivenRatio!s",
                3.66
              ]
            ],
            [
              [
                "Norwich City",
                "Defence_TacklesSucc",
                7
              ],
              [
                "Norwich City",
                "Defence_TacklesSucc!p-Arsenal",
                5
              ]
            ],
            [
              [
                "Norwich City",
                "Defence_TacklesDef3rd",
                7
              ],
              [
                "Norwich City",
                "Defence_TacklesDef3rd!p-Arsenal",
                4
              ]
            ],
            [
              [
                "Norwich City",
                "Defence_AerialSucc",
                16
              ],
              [
                "Norwich City",
                "Defence_AerialSucc!s",
                15.68
              ]
            ],
            [
              [
                "Adam Idah - Norwich City",
                "Attack_Goals",
                0
              ],
              [
                "Adam Idah - Norwich City",
                "Attack_Goals!tr",
                1
              ],
              [
                "Christos Tzolis - Norwich City",
                "Attack_Goals",
                0
              ],
              [
                "Christos Tzolis - Norwich City",
                "Attack_Goals!tr",
                2
              ]
            ],
            [
              [
                "Adam Idah - Norwich City",
                "Attack_Assist",
                0
              ],
              [
                "Adam Idah - Norwich City",
                "Attack_Assist!tr",
                1
              ],
              [
                "Christos Tzolis - Norwich City",
                "Attack_Assist",
                0
              ],
              [
                "Adam Idah - Norwich City",
                "Attack_SoT",
                0
              ],
              [
                "Christos Tzolis - Norwich City",
                "Attack_Assist!tr",
                2
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Passing_TotalSucc",
                57
              ],
              [
                "Billy Gilmour - Norwich City",
                "Passing_TotalSucc!r",
                1
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Passing_PassesFinal3rd",
                6
              ],
              [
                "Billy Gilmour - Norwich City",
                "Passing_PassesFinal3rd!r",
                1
              ],
              [
                "Billy Gilmour - Norwich City",
                "Passing_PassesPrgDist",
                385
              ],
              [
                "Billy Gilmour - Norwich City",
                "Passing_PassesPrgDist!tr",
                1
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Passing_LongSucc",
                13
              ],
              [
                "Billy Gilmour - Norwich City",
                "Passing_LongSucc!r",
                1
              ]
            ],
            [
              [
                "Adam Idah - Norwich City",
                "Possession_ReceiveProg",
                10
              ],
              [
                "Adam Idah - Norwich City",
                "Possession_ReceiveProg!r",
                1
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Possession_CarriesPrgDist",
                100
              ],
              [
                "Billy Gilmour - Norwich City",
                "Possession_CarriesPrgDist!tr",
                2
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Possession_CarriesFinal3rd",
                3
              ],
              [
                "Billy Gilmour - Norwich City",
                "Possession_CarriesFinal3rd!r",
                1
              ],
              [
                "Christos Tzolis - Norwich City",
                "Possession_CarriesFinal3rd",
                2
              ],
              [
                "Christos Tzolis - Norwich City",
                "Possession_CarriesFinal3rd!tr",
                2
              ],
              [
                "Billy Gilmour - Norwich City",
                "Defence_Tackles",
                4
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Possession_DrbSucc",
                1
              ],
              [
                "Adam Idah - Norwich City",
                "Possession_DrbSucc",
                3
              ],
              [
                "Adam Idah - Norwich City",
                "Possession_DrbSucc!r",
                1
              ],
              [
                "Billy Gilmour - Norwich City",
                "Possession_DrbSucc!tr",
                2
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Defence_Press",
                23
              ],
              [
                "Billy Gilmour - Norwich City",
                "Defence_Press!r",
                1
              ],
              [
                "Adam Idah - Norwich City",
                "Defence_Press",
                15
              ],
              [
                "Adam Idah - Norwich City",
                "Defence_Press!tr",
                2
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Defence_PressSucc",
                7
              ],
              [
                "Billy Gilmour - Norwich City",
                "Defence_PressSucc!r",
                1
              ]
            ],
            [
              [
                "Billy Gilmour - Norwich City",
                "Defence_Tackles!tr",
                1
              ],
              [
                "Billy Gilmour - Norwich City",
                "Defence_TacklesSucc",
                2
              ],
              [
                "Billy Gilmour - Norwich City",
                "Defence_TacklesSucc!tr",
                1
              ],
              [
                "Christos Tzolis - Norwich City",
                "Defence_TacklesSucc",
                1
              ],
              [
                "Christos Tzolis - Norwich City",
                "Defence_TacklesSucc!tr",
                2
              ]
            ]
          ]
        }
      },
      "9": {
        data: [
          {
            text: "It was a dominant display by Manchester Utd, who completed 426 passes to Wolves' 408.",
            id: "1481064394737991681"
          },
          {
            text: "Manchester Utd applied more pressure high up the pitch, pressing 25 times in the final third while Manchester Utd pressed 25 times in the final third. In their last game (against Burnley) Unitedtd pressed 25 times in the final third.",
            id: "1481064396373823496"
          },
          {
            text: "Manchester Utd were aggressive out of possession, making three tackles in the final third compared with one in their last game (against Burnley). This season United have averaged 2.0 tackles in the final third per 90 minutes.",
            id: "1481064398601007104"
          },
          {
            text: "Manchester Utd succesffuly played an impressive 35 passes into the final third, compared with 31 from Wolves. This season United have averaged 34.0 completed passes into the final per 90 minutes.",
            id: "1481068175668174848"
          },
          {
            text: "Manchester Utd were given an average of 4.4 touches each time the opponent pressed - Wolves took an average of 4.2 touches per press.",
            id: "1481068177345945608"
          },
          {
            text: "Manchester Utd attempted 17 challenges resulting in 11 successful tackles, while Wolves made 12 challenges and nine successful tackles.",
            id: "1481068178922950658"
          },
          {
            text: "In their last match (against Burnley) United attempted eight challenges, making 11 successful tackles, while this season they have averaged 15.0 challenges and 9 successful tackles per 90 minutes..",
            id: "1481068180688838656"
          },
          {
            text: "Manchester Utd made five successful tackles in this match, considerably more than the five they made in their last match (against Burnley). This season Manchester Utd have averaged 9.2 successful tackles per 90 minutes.",
            id: "1481068182471335936"
          },
          {
            text: "Manchester Utd attempted eight challenges in the defensive third. In their last game (against Burnley) United attempted three challenges in the defensive third, while throughout the season they've averaged 7.8 per 90 minutes.",
            id: "1481068184228745217"
          },
          {
            text: "Cristiano Ronaldo, our man of the match, scored no goals to Manchester United's zero - more than any other Manchester United player.",
            id: "1481068186254589952"
          },
          {
            text: "Cristiano Ronaldo created less than Nemanja Matic, finding chances worth 0.1 expected goals to Nemanja Matic, who created 0.2 expected goals.",
            id: "1481068187898851329"
          },
          {
            text: "Cristiano Ronaldo played one key passes - more than any other Manchester United player.",
            id: "1481068190214115333"
          },
          {
            text: "Cristiano Ronaldo played more successful shots on target than any other Manchester United player (one), while Cristiano Ronaldo carried the ball into the box once.",
            id: "1481068192013430790"
          },
          {
            text: "Nemanja Matic successfuly completed 59 passes (more than any other player on the pitch), while Nemanja Matic completed 59.",
            id: "1481068194064384000"
          },
          {
            text: "Cristiano Ronaldo successfuly recieved eight progressive passes (more than any other Manchester United player) and recieved 8 progressive passes.",
            id: "1481068195867992066"
          },
          {
            text: "Nemanja Matic carried the ball farther towards the opponent's goal than any other player on the pitch (a combined 207 yards), while Nemanja Matic carried the ball a combined 207 yards towards the opponent's goal.",
            id: "1481068197885489153"
          },
          {
            text: "Nemanja Matic pressed the opponent 19 times - more than any other player in a Manchester United shirt.",
            id: "1481071974671650824"
          },
          {
            text: "Cristiano Ronaldo pressed the opponent 5 times (more than any other player in a Manchester United shirt), winning possession on five occassions.",
            id: "1481071976303284224"
          },
          {
            text: "Phil Jones made more successful tackles (three) than any other player on the pitch, while Cristiano Ronaldo made one successful tackles.",
            id: "1481071978001883136"
          },
          {
            text: "Cristiano Ronaldo won two aerial duels (more than any other player on the pitch), winning the ball back on two occassions. Jatic also won four aerial duels (more than any other player on the pitch), and won two aerial duels.",
            id: "1481071979671261185"
          },
          {
            text: "Nemanja Matic made five interceptions - more than any other player on the pitch.",
            id: "1481071981680279559"
          }
        ],
        misc: {
          story_id: 9,
          team: "Manchester Utd",
          opponent: "Wolves",
          result: [
            0,
            1
          ],
          date: "2022-01-03",
          stories: [
            [
              [
                "Manchester Utd",
                "Passing_TotalSucc",
                426
              ],
              [
                "Wolves",
                "Passing_TotalSucc",
                408
              ]
            ],
            [
              [
                "Manchester Utd",
                "Attack_PressFinal3rd",
                25
              ],
              [
                "Manchester Utd",
                "Attack_PressFinal3rd!p-Burnley",
                14
              ]
            ],
            [
              [
                "Manchester Utd",
                "Attack_TacklesFinal3rd",
                3
              ],
              [
                "Manchester Utd",
                "Attack_TacklesFinal3rd!p-Burnley",
                1
              ],
              [
                "Manchester Utd",
                "Attack_TacklesFinal3rd!s",
                2
              ]
            ],
            [
              [
                "Manchester Utd",
                "Passing_PassesFinal3rd",
                35
              ],
              [
                "Wolves",
                "Passing_PassesFinal3rd",
                31
              ],
              [
                "Manchester Utd",
                "Passing_PassesFinal3rd!s",
                34.11
              ]
            ],
            [
              [
                "Manchester Utd",
                "Possession_TchPPressTakenRatio",
                4.38
              ],
              [
                "Wolves",
                "Possession_TchPPressTakenRatio",
                4.21
              ]
            ],
            [
              [
                "Manchester Utd",
                "Defence_Tackles",
                17
              ],
              [
                "Wolves",
                "Defence_Tackles",
                12
              ],
              [
                "Manchester Utd",
                "Defence_Tackles!p-Burnley",
                8
              ],
              [
                "Manchester Utd",
                "Defence_Tackles!s",
                15.32
              ],
              [
                "Manchester Utd",
                "Defence_TacklesSucc",
                11
              ],
              [
                "Wolves",
                "Defence_TacklesSucc",
                9
              ]
            ],
            [],
            [
              [
                "Manchester Utd",
                "Defence_TacklesSucc!p-Burnley",
                5
              ],
              [
                "Manchester Utd",
                "Defence_TacklesSucc!s",
                9.16
              ]
            ],
            [
              [
                "Manchester Utd",
                "Defence_TacklesDef3rd",
                8
              ],
              [
                "Manchester Utd",
                "Defence_TacklesDef3rd!p-Burnley",
                3
              ],
              [
                "Manchester Utd",
                "Defence_TacklesDef3rd!s",
                7.79
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_Goals",
                0
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "MOTM",
                "true"
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_Goals!tr",
                1
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_xA",
                0.1
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Attack_xA",
                0.2
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Attack_xA!r",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_xA!tr",
                2
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_KP",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_KP!tr",
                1
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_Assist",
                0
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_Assist!r",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_SoT",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_SoT!tr",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Attack_CarriesPA",
                1
              ]
            ],
            [
              [
                "Nemanja Matic - Manchester Utd",
                "Passing_TotalSucc",
                59
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Passing_TotalSucc!r",
                1
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Possession_ReceiveProg",
                8
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Possession_ReceiveProg!tr",
                1
              ]
            ],
            [
              [
                "Nemanja Matic - Manchester Utd",
                "Possession_CarriesPrgDist",
                207
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Possession_CarriesPrgDist!r",
                1
              ]
            ],
            [
              [
                "Nemanja Matic - Manchester Utd",
                "Defence_Press",
                19
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Defence_Press!tr",
                1
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Defence_PressSucc",
                5
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Defence_PressSucc!tr",
                1
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Defence_TacklesSucc",
                1
              ],
              [
                "Phil Jones - Manchester Utd",
                "Defence_TacklesSucc",
                3
              ],
              [
                "Phil Jones - Manchester Utd",
                "Defence_TacklesSucc!r",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Defence_TacklesSucc!tr",
                2
              ]
            ],
            [
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Defence_AerialSucc",
                2
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Defence_AerialSucc",
                4
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Defence_AerialSucc!r",
                1
              ],
              [
                "Cristiano Ronaldo - Manchester Utd",
                "Defence_AerialSucc!tr",
                2
              ]
            ],
            [
              [
                "Nemanja Matic - Manchester Utd",
                "Defence_Int",
                5
              ],
              [
                "Nemanja Matic - Manchester Utd",
                "Defence_Int!r",
                1
              ]
            ]
          ]
        }
      },
      "10": {
        data: [
          {
            text: "Wolves took six shots on target, up from one in their last game against Chelsea. This season Wolves have averaged 3.3 took six shots on target per 90 minutes.",
            id: "1481072553523400707"
          },
          {
            text: "Wolves applied more pressure high up the pitch, pressing 33 times in the final third while Manchester Utd pressed 25 times in the final third.",
            id: "1481072555192733700"
          },
          {
            text: "In their last game (against Chelsea) Wolves pressed 33 times in the final third and have pressed 24.0 times in the final third this season..",
            id: "1481072556908105730"
          },
          {
            text: "Wolves were aggressive out of possession, making four tackles in the final third to Manchester United's three. In their last game (against Chelsea) Wolves attempted one challenges in the final third, while throughout the season they've averaged 1.8 per 90 minutes.",
            id: "1481072558480973833"
          },
          {
            text: "Wolves succesffuly played an impressive 31 passes into the final third, considerably more than the 17 they played in their last game (against Chelsea). This season Wolves have averaged 28.0 successsful passes into the final third per 90 minutes.",
            id: "1481072560045449220"
          },
          {
            text: "Wolves completed 72 long balls, while Manchester Utd managed 56.",
            id: "1481072561857388547"
          },
          {
            text: "Wolves won 54% or the game's aerial duels. In their last game they won 36% and across the season they've won 49%.",
            id: "1481072563396743170"
          },
          {
            text: "Daniel Podence played three key passes.",
            id: "1481072564982226945"
          },
          {
            text: "Raul Jimenez played more successful passes into the final third than any other player on the pitch (against the ball), while Daniel Podence carried the ball into the box once.",
            id: "1481076341978116107"
          },
          {
            text: "Daniel Podence, with three successful shots on target (more than any other player on the pitch), while Joao Moutinho completed one shots on target.",
            id: "1481076343735570432"
          },
          {
            text: "Joao Moutinho successfuly completed 56 passes - more than any other Wolves player.",
            id: "1481076345438355459"
          },
          {
            text: "Joao Moutinho made more successful passes into the final third than any other player on the pitch (seven), while Joao Moutinho completed 15.",
            id: "1481076347078328320"
          },
          {
            text: "Raul Jimenez successfuly recieved nine progressive passes (more than any other player on the pitch) and recieved 9 progressive passes.",
            id: "1481076348688941060"
          },
          {
            text: "Daniel Podence carried the ball farther towards the opponent's goal than any other player on the pitch (a combined 202 yards), while Daniel Podence carried the ball into the final third five times.",
            id: "1481076350299656196"
          },
          {
            text: "Daniel Podence successfully dribbled past an opponent on three occasions out of three attempts - more than any other player in a Wolves shirt.",
            id: "1481076351905980417"
          },
          {
            text: "Joao Moutinho pressed the opponent 18 times, while Joao Moutinho pressed 18 times.",
            id: "1481076353537646596"
          },
          {
            text: "Joao Moutinho attempted to make more challenges than any other player on the pitch (three), resulting in three successful tackles (more than any other player on the pitch).",
            id: "1481076355194310661"
          },
          {
            text: "Joao Moutinho attempted three challenges, completing three successful tackles (more than any other player on the pitch)..",
            id: "1481076356779847682"
          }
        ],
        misc: {
          story_id: 10,
          team: "Wolves",
          opponent: "Manchester Utd",
          result: [
            0,
            1
          ],
          date: "2022-01-03",
          stories: [
            [
              [
                "Wolves",
                "Attack_SoT",
                6
              ],
              [
                "Manchester Utd",
                "Attack_SoT",
                2
              ],
              [
                "Wolves",
                "Attack_SoT!p-Chelsea",
                1
              ],
              [
                "Wolves",
                "Attack_SoT!s",
                3.32
              ]
            ],
            [
              [
                "Wolves",
                "Attack_PressFinal3rd",
                33
              ],
              [
                "Manchester Utd",
                "Attack_PressFinal3rd",
                25
              ],
              [
                "Wolves",
                "Attack_PressFinal3rd!p-Chelsea",
                24
              ],
              [
                "Wolves",
                "Attack_PressFinal3rd!s",
                24.47
              ]
            ],
            [
              [
                "Wolves",
                "Attack_TacklesFinal3rd",
                4
              ],
              [
                "Manchester Utd",
                "Attack_TacklesFinal3rd",
                3
              ],
              [
                "Wolves",
                "Attack_TacklesFinal3rd!p-Chelsea",
                1
              ],
              [
                "Wolves",
                "Attack_TacklesFinal3rd!s",
                1.84
              ]
            ],
            [
              [
                "Wolves",
                "Passing_PassesFinal3rd",
                31
              ],
              [
                "Wolves",
                "Passing_PassesFinal3rd!p-Chelsea",
                17
              ],
              [
                "Wolves",
                "Passing_PassesFinal3rd!s",
                27.68
              ]
            ],
            [
              [
                "Wolves",
                "Passing_LongSucc",
                72
              ],
              [
                "Manchester Utd",
                "Passing_LongSucc",
                56
              ]
            ],
            [
              [
                "Wolves",
                "Defence_AerialPerc",
                54.2
              ],
              [
                "Manchester Utd",
                "Defence_AerialPerc",
                45.8
              ],
              [
                "Wolves",
                "Defence_AerialPerc!p-Chelsea",
                36.4
              ],
              [
                "Wolves",
                "Defence_AerialPerc!s",
                49.1
              ]
            ],
            [
              [
                "Daniel Podence - Wolves",
                "Attack_KP",
                3
              ],
              [
                "Daniel Podence - Wolves",
                "Attack_KP!r",
                2
              ]
            ],
            [
              [
                "Daniel Podence - Wolves",
                "Attack_Assist",
                0
              ],
              [
                "Raul Jimenez - Wolves",
                "Attack_Assist",
                0
              ],
              [
                "Raul Jimenez - Wolves",
                "Attack_Assist!r",
                1
              ],
              [
                "Daniel Podence - Wolves",
                "Attack_CarriesPA",
                4
              ],
              [
                "Daniel Podence - Wolves",
                "Attack_CarriesPA!r",
                1
              ]
            ],
            [
              [
                "Joao Moutinho - Wolves",
                "Attack_SoT",
                1
              ],
              [
                "Joao Moutinho - Wolves",
                "MOTM",
                "true"
              ],
              [
                "Daniel Podence - Wolves",
                "Attack_SoT",
                3
              ],
              [
                "Daniel Podence - Wolves",
                "Attack_SoT!r",
                1
              ]
            ],
            [
              [
                "Joao Moutinho - Wolves",
                "Passing_TotalSucc",
                56
              ],
              [
                "Joao Moutinho - Wolves",
                "Passing_TotalSucc!tr",
                1
              ]
            ],
            [
              [
                "Joao Moutinho - Wolves",
                "Passing_PassesFinal3rd",
                7
              ],
              [
                "Joao Moutinho - Wolves",
                "Passing_PassesFinal3rd!r",
                1
              ],
              [
                "Joao Moutinho - Wolves",
                "Passing_LongSucc",
                15
              ],
              [
                "Joao Moutinho - Wolves",
                "Passing_LongSucc!r",
                1
              ]
            ],
            [
              [
                "Daniel Podence - Wolves",
                "Possession_ReceiveProg",
                9
              ],
              [
                "Raul Jimenez - Wolves",
                "Possession_ReceiveProg",
                9
              ],
              [
                "Raul Jimenez - Wolves",
                "Possession_ReceiveProg!r",
                1
              ],
              [
                "Daniel Podence - Wolves",
                "Possession_ReceiveProg!r",
                2
              ]
            ],
            [
              [
                "Daniel Podence - Wolves",
                "Possession_CarriesPrgDist",
                202
              ],
              [
                "Daniel Podence - Wolves",
                "Possession_CarriesPrgDist!tr",
                1
              ],
              [
                "Daniel Podence - Wolves",
                "Possession_CarriesFinal3rd",
                5
              ],
              [
                "Daniel Podence - Wolves",
                "Possession_CarriesFinal3rd!r",
                1
              ]
            ],
            [
              [
                "Daniel Podence - Wolves",
                "Possession_DrbSucc",
                3
              ],
              [
                "Daniel Podence - Wolves",
                "Possession_DrbSucc!tr",
                1
              ]
            ],
            [
              [
                "Joao Moutinho - Wolves",
                "Defence_Press",
                18
              ],
              [
                "Joao Moutinho - Wolves",
                "Defence_Press!tr",
                2
              ]
            ],
            [
              [
                "Joao Moutinho - Wolves",
                "Defence_Tackles",
                3
              ],
              [
                "Joao Moutinho - Wolves",
                "Defence_Tackles!r",
                1
              ],
              [
                "Joao Moutinho - Wolves",
                "Defence_TacklesSucc",
                3
              ],
              [
                "Joao Moutinho - Wolves",
                "Defence_TacklesSucc!r",
                1
              ]
            ]
          ]
        }
      },
      "11": {
        data: [
          {
            text: "Leicester City applied more pressure high up the pitch, pressing 17 times in the final third while Leicester City pressed 17 times in the final third. In their last game (against Manchester City) City pressed 17 times in the final third.",
            id: "1481076906673987584"
          },
          {
            text: "Leicester City played 38 successful long balls, considerably more than the 24 they played in their last game (against Manchester City).",
            id: "1481076908334931976"
          },
          {
            text: "Leicester City completed 52% of the passes they played long, compared with 54% from Leicester.",
            id: "1481076909949730816"
          },
          {
            text: "In this game Leicester City saw more of the ball, taking 537 touches to Manchester City's 537. In their last game (against Manchester City) Leicester City took 410 touches in the final game.",
            id: "1481080686928969728"
          },
          {
            text: "Leicester City gave their opponent an average of 5.5 touches each time they pressed. Liverpool allowed City 3.3 touches per press, considerably less than the 3.9 touches permitted by Leicester City in Leicester City's last game.",
            id: "1481080688690577411"
          },
          {
            text: "Leicester City attempted 17 challenges resulting in 17 challenges, while Liverpool attempted 17 challenges.",
            id: "1481080690368299008"
          },
          {
            text: "Leicester City attempted 14 challenges in the defensive third, considerably more than the five made by Liverpool. In their last game (against Manchester City) City attempted nine challenges in the defensive third, while throughout the season they've averaged 9.5 per 90 minutes.",
            id: "1481080691999784962"
          },
          {
            text: "Leicester City won an impressive 24 aerial duels to Liverpool's 43%. In their last game they won 4 aerial duels and across the season they've won 53%.",
            id: "1481080694180917253"
          },
          {
            text: "Kelechi Iheanacho, our man of the match, made seven successful passes into the match, the same amount as the zero of his attempted passes.",
            id: "1481080695938236417"
          },
          {
            text: "Kelechi Iheanacho created far better chances while both teams failed to find a winner. Kelechi Iheanacho tallied an xG of 0.1 and zero shots on target while concedeing 0.1 xG and zero shots on target.",
            id: "1481080697532071936"
          },
          {
            text: "Kiernan Dewsbury Hall successfuly completed 37 passes - more than any other Leicester player.",
            id: "1481080699180441603"
          },
          {
            text: "Kelechi Iheanacho successfuly recieved six progressive passes (more than any other Leicester player) and recieved 6 progressive passes.",
            id: "1481080700778524679"
          },
          {
            text: "Kiernan Dewsbury Hall carried the ball farther towards the opponent's goal than any other player in a Leicester shirt (a combined 212 yards), while Leicester carried the ball a combined 212 yards towards the opponent's goal.",
            id: "1481080702498217985"
          },
          {
            text: "Kelechi Iheanacho successfully dribbled past an opponent on one occasions out of five attempts - more than any other Leicester player. Kiernan Dewsbury Hall carried the ball into the final third 2 times.",
            id: "1481080704541011968"
          },
          {
            text: "Kiernan Dewsbury Hall pressed the opponent 22 times - more than any other player on the pitch.",
            id: "1481080706772127747"
          },
          {
            text: "Kiernan Dewsbury Hall attempted to make more challenges than any other player on the pitch (three), resulting in three attempted passes. Wilfred Ndidi attempted five challenges, completing five successful tackles.",
            id: "1481080708357627911"
          }
        ],
        misc: {
          story_id: 11,
          team: "Leicester City",
          opponent: "Liverpool",
          result: [
            1,
            0
          ],
          date: "2021-12-28",
          stories: [
            [
              [
                "Leicester City",
                "Attack_PressFinal3rd",
                17
              ],
              [
                "Leicester City",
                "Attack_PressFinal3rd!p-Manchester City",
                10
              ]
            ],
            [
              [
                "Leicester City",
                "Passing_LongSucc",
                38
              ],
              [
                "Leicester City",
                "Passing_LongSucc!p-Manchester City",
                24
              ]
            ],
            [
              [
                "Leicester City",
                "Passing_LongPerc",
                52.1
              ],
              [
                "Leicester City",
                "Passing_LongPerc!s",
                53.8
              ]
            ],
            [
              [
                "Leicester City",
                "Possession_Touches",
                537
              ],
              [
                "Leicester City",
                "Possession_Touches!p-Manchester City",
                410
              ]
            ],
            [
              [
                "Leicester City",
                "Possession_TchPPressGivenRatio",
                5.55
              ],
              [
                "Liverpool",
                "Possession_TchPPressGivenRatio",
                3.31
              ],
              [
                "Leicester City",
                "Possession_TchPPressGivenRatio!s",
                3.87
              ]
            ],
            [
              [
                "Leicester City",
                "Defence_Tackles",
                17
              ],
              [
                "Liverpool",
                "Defence_Tackles",
                17
              ]
            ],
            [
              [
                "Leicester City",
                "Defence_TacklesDef3rd",
                14
              ],
              [
                "Liverpool",
                "Defence_TacklesDef3rd",
                5
              ],
              [
                "Leicester City",
                "Defence_TacklesDef3rd!p-Manchester City",
                9
              ],
              [
                "Leicester City",
                "Defence_TacklesDef3rd!s",
                9.5
              ]
            ],
            [
              [
                "Leicester City",
                "Defence_AerialSucc",
                24
              ],
              [
                "Liverpool",
                "Defence_AerialSucc",
                18
              ],
              [
                "Leicester City",
                "Defence_AerialSucc!p-Manchester City",
                4
              ],
              [
                "Leicester City",
                "Defence_AerialSucc!s",
                18
              ],
              [
                "Leicester City",
                "Defence_AerialPerc",
                57.1
              ],
              [
                "Liverpool",
                "Defence_AerialPerc",
                42.9
              ],
              [
                "Leicester City",
                "Defence_AerialPerc!s",
                53
              ]
            ],
            [
              [
                "Kelechi Iheanacho - Leicester City",
                "Attack_Goals",
                0
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "MOTM",
                "true"
              ]
            ],
            [
              [
                "Kelechi Iheanacho - Leicester City",
                "Attack_xA",
                0.1
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Attack_KP",
                1
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Attack_KP!tr",
                1
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Attack_Assist",
                0
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Attack_SoT",
                0
              ]
            ],
            [
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Passing_TotalSucc",
                37
              ],
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Passing_TotalSucc!tr",
                1
              ]
            ],
            [
              [
                "Kelechi Iheanacho - Leicester City",
                "Possession_ReceiveProg",
                6
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Possession_ReceiveProg!tr",
                1
              ]
            ],
            [
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Possession_CarriesPrgDist",
                212
              ],
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Possession_CarriesPrgDist!tr",
                1
              ]
            ],
            [
              [
                "Kelechi Iheanacho - Leicester City",
                "Possession_CarriesFinal3rd",
                0
              ],
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Possession_CarriesFinal3rd",
                2
              ],
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Possession_CarriesFinal3rd!tr",
                1
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Possession_DrbSucc",
                1
              ],
              [
                "Kelechi Iheanacho - Leicester City",
                "Possession_DrbSucc!tr",
                1
              ]
            ],
            [
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Defence_Press",
                22
              ],
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Defence_Press!r",
                1
              ]
            ],
            [
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Defence_Tackles",
                3
              ],
              [
                "Wilfred Ndidi - Leicester City",
                "Defence_Tackles",
                5
              ],
              [
                "Wilfred Ndidi - Leicester City",
                "Defence_Tackles!r",
                1
              ],
              [
                "Kiernan Dewsbury Hall - Leicester City",
                "Defence_Tackles!tr",
                2
              ]
            ]
          ]
        }
      },
      "12": {
        data: [
          {
            text: "Everton saw more of the ball, completing 320 passes to Brighton's 329.",
            id: "1481085081217347584"
          },
          {
            text: "Brighton took five shots on target, considerably more than their average per 90 minutes this season (3.7).",
            id: "1481085082769276930"
          },
          {
            text: "Brighton were aggressive out of possession, making four tackles in the final third compared with three in their last game (against Chelsea). This season the Seagulls have averaged 3.0 tackles in the final third per 90 minutes.",
            id: "1481085084430217217"
          },
          {
            text: "Brighton succesffuly played 21 passes into the final third, considerably more than the 16 they played in their last game (against Chelsea).",
            id: "1481085086124675073"
          },
          {
            text: "The Seagulls saw less of the ball, taking 603 touches to Everton's 577.",
            id: "1481085087680802822"
          },
          {
            text: "Brighton gave their opponent an average of 4.8 touches each time they pressed. Everton allowed the Seagulls 4.3 touches per press, considerably more than the 4.3 touches permitted by Everton in Brighton's last game.",
            id: "1481085089379495940"
          },
          {
            text: "Brighton attempted 25 challenges in this game, more than the 23 made by Everton. In their last game (against Chelsea) the Seagulls attempted 22 challenges in the final third, while this season they have averaged 20.0 challenges per 90 minutes.",
            id: "1481085091019378689"
          },
          {
            text: "Brighton attempted 13 challenges in the defensive third, considerably more than the eight made by Everton. In their last game (against Chelsea) the Seagulls attempted 10 challenges in the defensive third, while throughout the season they've averaged 9.7 per 90 minutes.",
            id: "1481085092747526152"
          },
          {
            text: "Brighton won an impressive 28 aerial duels, considerably more than their 15 they won in their last game (against Chelsea). This season Brighton have averaged 17.0 per 90 minutes.",
            id: "1481085094949441536"
          },
          {
            text: "Alexis Mac Allister, our man of the match, made two successful passes into the final third (more than anyone else on the pitch) and scored two goals (also more than anyone else on the pitch).",
            id: "1481085096715329543"
          },
          {
            text: "Enock Mwepu created more than any other player on the pitch (0.6 expected goals), while creating 0.6 expected goals.",
            id: "1481085098384633856"
          },
          {
            text: "Alexis Mac Allister took two shots on target, more than any other Brighton player. Mac Allister also had a good game, playing two key passes.",
            id: "1481085100121116675"
          },
          {
            text: "Enock Mwepu played more successful passes into the final third than any other player on the pitch (two), while Enock Mwepu carried the ball into the box one times.",
            id: "1481085101891108867"
          },
          {
            text: "Alexis Mac Allister made seven successful passes into the final third - more than any other player on the pitch.",
            id: "1481088878735986691"
          },
          {
            text: "Alexis Mac Allister passed the ball a combined 287 yards towards the opponents goal, more than any other Brighton player.",
            id: "1481088880304701440"
          },
          {
            text: "Enock Mwepu carried the ball into the final third one times (more than any other Brighton player), while Yves Bissouma made one carries into the final third.",
            id: "1481088882154389506"
          },
          {
            text: "Enock Mwepu successfully dribbled past an opponent on two occasions out of nine attempts.",
            id: "1481088883903418370"
          },
          {
            text: "Alexis Mac Allister pressed the opponent 22 times - more than any other player in a Brighton shirt. Yves Bisouma pressed 18 times.",
            id: "1481088885463691267"
          },
          {
            text: "Alexis Mac Allister pressed the opponent 10 times (more than any other player on the pitch), winning possession on 10 occassions.",
            id: "1481088887032270850"
          },
          {
            text: "Enock Mwepu made two successful tackles - more than any other Brighton player.",
            id: "1481088888647081988"
          }
        ],
        misc: {
          story_id: 12,
          team: "Brighton",
          opponent: "Everton",
          result: [
            2,
            3
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Brighton",
                "Passing_TotalSucc",
                329
              ],
              [
                "Everton",
                "Passing_TotalSucc",
                320
              ]
            ],
            [
              [
                "Brighton",
                "Attack_SoT",
                5
              ],
              [
                "Brighton",
                "Attack_SoT!s",
                3.74
              ]
            ],
            [
              [
                "Brighton",
                "Attack_TacklesFinal3rd",
                4
              ],
              [
                "Brighton",
                "Attack_TacklesFinal3rd!p-Chelsea",
                3
              ],
              [
                "Brighton",
                "Attack_TacklesFinal3rd!s",
                2.95
              ]
            ],
            [
              [
                "Brighton",
                "Passing_PassesFinal3rd",
                21
              ],
              [
                "Brighton",
                "Passing_PassesFinal3rd!p-Chelsea",
                16
              ]
            ],
            [
              [
                "Brighton",
                "Possession_Touches",
                603
              ],
              [
                "Everton",
                "Possession_Touches",
                577
              ]
            ],
            [
              [
                "Brighton",
                "Possession_TchPPressGivenRatio",
                4.77
              ],
              [
                "Everton",
                "Possession_TchPPressGivenRatio",
                4.31
              ]
            ],
            [
              [
                "Brighton",
                "Defence_Tackles",
                25
              ],
              [
                "Everton",
                "Defence_Tackles",
                23
              ],
              [
                "Brighton",
                "Defence_Tackles!p-Chelsea",
                22
              ],
              [
                "Brighton",
                "Defence_Tackles!s",
                20.16
              ]
            ],
            [
              [
                "Brighton",
                "Defence_TacklesDef3rd",
                13
              ],
              [
                "Everton",
                "Defence_TacklesDef3rd",
                8
              ],
              [
                "Brighton",
                "Defence_TacklesDef3rd!p-Chelsea",
                10
              ],
              [
                "Brighton",
                "Defence_TacklesDef3rd!s",
                9.68
              ]
            ],
            [
              [
                "Brighton",
                "Defence_AerialSucc",
                28
              ],
              [
                "Brighton",
                "Defence_AerialSucc!p-Chelsea",
                15
              ],
              [
                "Brighton",
                "Defence_AerialSucc!s",
                16.53
              ]
            ],
            [
              [
                "Alexis Mac Allister - Brighton",
                "Attack_Goals",
                2
              ],
              [
                "Alexis Mac Allister - Brighton",
                "MOTM",
                "true"
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Attack_Goals!r",
                1
              ]
            ],
            [
              [
                "Enock Mwepu - Brighton",
                "Attack_xA",
                0.6
              ],
              [
                "Enock Mwepu - Brighton",
                "Attack_xA!r",
                1
              ]
            ],
            [
              [
                "Alexis Mac Allister - Brighton",
                "Attack_KP",
                2
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Attack_SoT",
                2
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Attack_SoT!tr",
                1
              ]
            ],
            [
              [
                "Enock Mwepu - Brighton",
                "Attack_Assist",
                2
              ],
              [
                "Enock Mwepu - Brighton",
                "Attack_Assist!r",
                1
              ],
              [
                "Enock Mwepu - Brighton",
                "Attack_CarriesPA",
                1
              ],
              [
                "Enock Mwepu - Brighton",
                "Attack_CarriesPA!tr",
                1
              ]
            ],
            [
              [
                "Alexis Mac Allister - Brighton",
                "Passing_PassesFinal3rd",
                7
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Passing_PassesFinal3rd!r",
                1
              ]
            ],
            [
              [
                "Alexis Mac Allister - Brighton",
                "Passing_PassesPrgDist",
                287
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Passing_PassesPrgDist!tr",
                1
              ]
            ],
            [
              [
                "Enock Mwepu - Brighton",
                "Possession_CarriesFinal3rd",
                1
              ],
              [
                "Enock Mwepu - Brighton",
                "Possession_CarriesFinal3rd!tr",
                1
              ],
              [
                "Yves Bissouma - Brighton",
                "Possession_CarriesFinal3rd",
                1
              ],
              [
                "Yves Bissouma - Brighton",
                "Possession_CarriesFinal3rd!tr",
                2
              ]
            ],
            [
              [
                "Enock Mwepu - Brighton",
                "Possession_DrbSucc",
                2
              ],
              [
                "Enock Mwepu - Brighton",
                "Possession_DrbSucc!tr",
                2
              ]
            ],
            [
              [
                "Alexis Mac Allister - Brighton",
                "Defence_Press",
                22
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Defence_Press!tr",
                1
              ],
              [
                "Yves Bissouma - Brighton",
                "Defence_Press",
                18
              ],
              [
                "Yves Bissouma - Brighton",
                "Defence_Press!tr",
                2
              ]
            ],
            [
              [
                "Alexis Mac Allister - Brighton",
                "Defence_PressSucc",
                10
              ],
              [
                "Alexis Mac Allister - Brighton",
                "Defence_PressSucc!r",
                1
              ]
            ],
            [
              [
                "Enock Mwepu - Brighton",
                "Defence_TacklesSucc",
                2
              ],
              [
                "Enock Mwepu - Brighton",
                "Defence_TacklesSucc!tr",
                1
              ]
            ]
          ]
        }
      },
      "13": {
        data: [
          {
            text: "Crystal Palace created far more than Crystal Palace, finding chances worth 2.2 expected goals to Crystal Palace's 2.2. This season Crystal Palace have averaged 1.2 expected goals per 90 minutes.",
            id: "1481089476285943810"
          },
          {
            text: "Crystal Palace saw more of the ball, completing 507 passes to West Ham's 282. In their last game (against Norwich) Palace completed 338 passes, while West Ham completed 282.",
            id: "1481089477888069633"
          },
          {
            text: "Crystal Palace took six shots on target, compared with four shots on target. This season Crystal Palace have averaged 3.6 took on target per 90 minutes.",
            id: "1481089480526340098"
          },
          {
            text: "Crystal Palace applied more pressure high up the pitch, pressing 39 times in the final third while the opponent pressed 39 times in the final third. In their last game (against Norwich) Palace pressed 39 times in the final third.",
            id: "1481089482388553728"
          },
          {
            text: "Crystal Palace were aggressive out of possession, making six tackles in the final third compared with zero in their last game (against Norwich). This season Palace have averaged 2.1 tackles in the final third per 90 minutes.",
            id: "1481089484070563840"
          },
          {
            text: "Crystal Palace succesffuly played an impressive 47 passes into the final third, compared with 27 from West Ham. In their last game (against Norwich) Palace completed 22 passes into the final third and have averaged 24.0 per 90 minutes this season.",
            id: "1481089485844758532"
          },
          {
            text: "Crystal Palace played an impressive 92 successful long balls, compared with 42 from West Ham. In their last game (against Norwich) Palace successfully played 62 long balls and have averaged 56.0 per 90 minutes this season.",
            id: "1481093262798643202"
          },
          {
            text: "Christian Benteke scored no goals to Christian Benteke's zero.",
            id: "1481093264988164101"
          },
          {
            text: "Jordan Ayew had a great game, playing three key passes. Christian Benteke played two key passes and carried the ball into the opponent's box two times.",
            id: "1481093267387260931"
          },
          {
            text: "Christian Benteke played more successful shots on target than any other player on the pitch (two), while Christian Benteke completed two shots on target.",
            id: "1481093269048242184"
          },
          {
            text: "Christian Benteke completed 94% of his passes - the highest rate of any player on the pitch.",
            id: "1481093270704902147"
          },
          {
            text: "Jordan Ayew carried the ball farther towards the opponent's goal than any other player on the pitch (a combined 306 yards), while Joachim Anderen carried the ball a combined 270 yards towards the opponent's goal.",
            id: "1481093272269381642"
          },
          {
            text: "Jordan Ayew successfully dribbled past an opponent on six occasions out of six attempts - more than any other player on the pitch. Ayew also carried the ball into the final third six times (more than any other player on the pitch).",
            id: "1481093273959776257"
          },
          {
            text: "Jordan Ayew pressed the opponent 25 times - more than any other player on the pitch.",
            id: "1481093275553566722"
          },
          {
            text: "Jordan Ayew pressured the opponent three times (more than any other player on the pitch), winning possession on nine occassions.",
            id: "1481093277088727043"
          }
        ],
        misc: {
          story_id: 13,
          team: "Crystal Palace",
          opponent: "West Ham",
          result: [
            2,
            3
          ],
          date: "2022-01-01",
          stories: [
            [
              [
                "Crystal Palace",
                "Attack_xG",
                2.2
              ],
              [
                "Crystal Palace",
                "Attack_xG!s",
                1.25
              ]
            ],
            [
              [
                "Crystal Palace",
                "Passing_TotalSucc",
                507
              ],
              [
                "West Ham",
                "Passing_TotalSucc",
                282
              ],
              [
                "Crystal Palace",
                "Passing_TotalSucc!p-Norwich City",
                338
              ]
            ],
            [
              [
                "Crystal Palace",
                "Attack_SoT",
                6
              ],
              [
                "West Ham",
                "Attack_SoT",
                4
              ],
              [
                "Crystal Palace",
                "Attack_SoT!s",
                3.6
              ]
            ],
            [
              [
                "Crystal Palace",
                "Attack_PressFinal3rd",
                39
              ],
              [
                "Crystal Palace",
                "Attack_PressFinal3rd!p-Norwich City",
                26
              ]
            ],
            [
              [
                "Crystal Palace",
                "Attack_TacklesFinal3rd",
                6
              ],
              [
                "Crystal Palace",
                "Attack_TacklesFinal3rd!p-Norwich City",
                0
              ],
              [
                "Crystal Palace",
                "Attack_TacklesFinal3rd!s",
                2.15
              ]
            ],
            [
              [
                "Crystal Palace",
                "Passing_PassesFinal3rd",
                47
              ],
              [
                "West Ham",
                "Passing_PassesFinal3rd",
                27
              ],
              [
                "Crystal Palace",
                "Passing_PassesFinal3rd!p-Norwich City",
                22
              ],
              [
                "Crystal Palace",
                "Passing_PassesFinal3rd!s",
                24.45
              ]
            ],
            [
              [
                "Crystal Palace",
                "Passing_LongSucc",
                92
              ],
              [
                "West Ham",
                "Passing_LongSucc",
                42
              ],
              [
                "Crystal Palace",
                "Passing_LongSucc!p-Norwich City",
                62
              ],
              [
                "Crystal Palace",
                "Passing_LongSucc!s",
                55.75
              ],
              [
                "Crystal Palace",
                "Passing_LongPerc",
                73
              ],
              [
                "West Ham",
                "Passing_LongPerc",
                45.2
              ]
            ],
            [
              [
                "Christian Benteke - Crystal Palace",
                "Attack_Goals",
                0
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Attack_Goals!tr",
                2
              ]
            ],
            [
              [
                "Jordan Ayew - Crystal Palace",
                "Attack_xA",
                0.7
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "MOTM",
                "true"
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Attack_xA!r",
                1
              ]
            ],
            [
              [
                "Jordan Ayew - Crystal Palace",
                "Attack_KP",
                3
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Attack_CarriesPA",
                2
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Attack_CarriesPA!r",
                1
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Attack_CarriesPA",
                0
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Attack_CarriesPA!tr",
                2
              ]
            ],
            [
              [
                "Christian Benteke - Crystal Palace",
                "Attack_Assist",
                0
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Attack_Assist!tr",
                1
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Attack_SoT",
                2
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Attack_SoT!r",
                1
              ]
            ],
            [
              [
                "Christian Benteke - Crystal Palace",
                "Passing_TotalPerc",
                94.4
              ],
              [
                "Christian Benteke - Crystal Palace",
                "Passing_TotalPerc!r",
                1
              ]
            ],
            [
              [
                "Jordan Ayew - Crystal Palace",
                "Possession_CarriesPrgDist",
                306
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Possession_CarriesPrgDist!r",
                1
              ],
              [
                "Joachim Andersen - Crystal Palace",
                "Possession_CarriesPrgDist",
                270
              ],
              [
                "Joachim Andersen - Crystal Palace",
                "Possession_CarriesPrgDist!r",
                2
              ]
            ],
            [
              [
                "Jordan Ayew - Crystal Palace",
                "Possession_CarriesFinal3rd",
                7
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Possession_CarriesFinal3rd!r",
                1
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Possession_DrbSucc",
                6
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Possession_DrbSucc!r",
                1
              ]
            ],
            [
              [
                "Jordan Ayew - Crystal Palace",
                "Defence_Press",
                25
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Defence_Press!r",
                1
              ]
            ],
            [
              [
                "Jordan Ayew - Crystal Palace",
                "Defence_PressSucc",
                9
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Defence_PressSucc!r",
                1
              ],
              [
                "Jordan Ayew - Crystal Palace",
                "Defence_Tackles",
                3
              ]
            ]
          ]
        }
      },
      "14": {
        data: [
          {
            text: "It was a dominant display by Aston Villa, who completed 428 passes to Brentford's 320. This season Aston Villa have averaged 300.6 completed passes per 90 minute.",
            id: "1481093946726100994"
          },
          {
            text: "Aston Villa took five shots on target, up from one in their last game against Chelsea. This season Aston Villa have averaged 3.4 took four shots on target per 90 minutes.",
            id: "1481093948391268357"
          },
          {
            text: "Aston Villa succesffuly played 25 passes into the final third, more than the 23 from Brentford. In their last game (against Chelsea) Villa completed 19 passes into the final third.",
            id: "1481093950408732676"
          },
          {
            text: "Aston Villa played 54 successful long balls, more than the 43 they played in their last game (against Chelsea).",
            id: "1481093952132595712"
          },
          {
            text: "Aston Villa controlled possession, taking 627 touches to Brentford's 526. Aston Villa were given an average of 587.0 touches each time the opponent pressed - Brentford took an average of 526 touches per 90 minutes.",
            id: "1481097728935571456"
          },
          {
            text: "Aston Villa were given a lot of time on the ball, taking an average of 7.0 touches each time the opponent pressed - Brentford took an average of 6.1 touches per press. This season, Aston Villa have averaged (3.8 touches for each opponent press.",
            id: "1481097730705530886"
          },
          {
            text: "Aston Villa gave their opponent an average of 6.1 touches each time they pressed. This season, Aston Villa have averaged 3.8 touches for each opponent press.",
            id: "1481097732337147906"
          },
          {
            text: "Aston Villa won 15 aerial duels, considerably more than the eight they won in their last game (against Chelsea).",
            id: "1481097733960306689"
          },
          {
            text: "Aston Villa won 48% or the game's aerial duels. In their last game they won 42% and across the season they've won 42%.",
            id: "1481097735713529858"
          },
          {
            text: "Emi Buendia scored no goals to Aston Villa's zero.",
            id: "1481097737345110017"
          },
          {
            text: "Emi Buendia created more than any other player on the pitch (0.4 expected goals) and created 0.4 expected goals.",
            id: "1481097738972450826"
          },
          {
            text: "Emi Buendia also had a good game, playing more key passes than any other player on the pitch (four), followed by John McGinn, who played three key passes.",
            id: "1481097740578873353"
          },
          {
            text: "Danny Ings, our man of the match, played an impressive seven key passes - tallying an xA of zero resulting in zero assist.",
            id: "1481097742357250057"
          },
          {
            text: "Danny Ings took more shots on target than any other player on the pitch (three), followed by Emi Buendia, who completed one shots on target.",
            id: "1481097743892365313"
          },
          {
            text: "Emi Buendia found a teammate with 85% of his attempted passes, the second highest pass completion rate of any Aston Villa player.",
            id: "1481097745846968325"
          },
          {
            text: "John McGinn made more successful passes into the final third than any other player on the pitch (four), followed by Emi Buendia, who completed three passes into the final third.",
            id: "1481097747956703232"
          },
          {
            text: "Danny Ings successfuly recieved 12 progressive passes (more than any other player on the pitch) and recieved 12 progressive passes.",
            id: "1481097749659631621"
          },
          {
            text: "Emi Buendia successfully dribbled past an opponent on two occasions out of two attempts. Buendia also carried the ball into the final third 2 times and completed 2 successful dribbles.",
            id: "1481101526470905856"
          },
          {
            text: "Danny Ings pressed the opponent 13 times - more than any other player in a Aston Villa shirt.",
            id: "1481101528123457540"
          },
          {
            text: "Danny Ings pressed the opponent more times (21) than any other player in a Aston Villa shirt, winning the ball back on five occassions. Ings also made two interceptions and made one clearances.",
            id: "1481101529763524610"
          },
          {
            text: "Emi Buendia made one successful tackles - more than any other Aston Villa player.",
            id: "1481101531562840069"
          }
        ],
        misc: {
          story_id: 14,
          team: "Aston Villa",
          opponent: "Brentford",
          result: [
            2,
            1
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Aston Villa",
                "Passing_TotalSucc",
                428
              ],
              [
                "Brentford",
                "Passing_TotalSucc",
                320
              ],
              [
                "Aston Villa",
                "Passing_TotalSucc!s",
                305.74
              ]
            ],
            [
              [
                "Aston Villa",
                "Attack_SoT",
                5
              ],
              [
                "Brentford",
                "Attack_SoT",
                4
              ],
              [
                "Aston Villa",
                "Attack_SoT!p-Chelsea",
                1
              ],
              [
                "Aston Villa",
                "Attack_SoT!s",
                3.37
              ]
            ],
            [
              [
                "Aston Villa",
                "Passing_PassesFinal3rd",
                25
              ],
              [
                "Brentford",
                "Passing_PassesFinal3rd",
                23
              ],
              [
                "Aston Villa",
                "Passing_PassesFinal3rd!p-Chelsea",
                19
              ]
            ],
            [
              [
                "Aston Villa",
                "Passing_LongSucc",
                54
              ],
              [
                "Aston Villa",
                "Passing_LongSucc!p-Chelsea",
                43
              ]
            ],
            [
              [
                "Aston Villa",
                "Possession_Touches",
                627
              ],
              [
                "Brentford",
                "Possession_Touches",
                526
              ],
              [
                "Aston Villa",
                "Possession_Touches!s",
                517.26
              ]
            ],
            [
              [
                "Aston Villa",
                "Possession_TchPPressTakenRatio",
                7.04
              ],
              [
                "Brentford",
                "Possession_TchPPressTakenRatio",
                6.12
              ],
              [
                "Aston Villa",
                "Possession_TchPPressTakenRatio!s",
                3.82
              ]
            ],
            [
              [
                "Aston Villa",
                "Possession_TchPPressGivenRatio",
                6.12
              ],
              [
                "Aston Villa",
                "Possession_TchPPressGivenRatio!s",
                3.82
              ]
            ],
            [
              [
                "Aston Villa",
                "Defence_AerialSucc",
                15
              ],
              [
                "Aston Villa",
                "Defence_AerialSucc!p-Chelsea",
                8
              ]
            ],
            [
              [
                "Aston Villa",
                "Defence_AerialPerc",
                48.4
              ],
              [
                "Aston Villa",
                "Defence_AerialPerc!p-Chelsea",
                42.1
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Attack_Goals",
                0
              ],
              [
                "Emi Buendia - Aston Villa",
                "Attack_Goals!tr",
                2
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Attack_xA",
                0.4
              ],
              [
                "Emi Buendia - Aston Villa",
                "Attack_xA!r",
                1
              ],
              [
                "John McGinn - Aston Villa",
                "Attack_xA",
                0.4
              ],
              [
                "John McGinn - Aston Villa",
                "Attack_xA!r",
                2
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Attack_KP",
                4
              ],
              [
                "Emi Buendia - Aston Villa",
                "Attack_KP!r",
                1
              ],
              [
                "John McGinn - Aston Villa",
                "Attack_KP",
                3
              ],
              [
                "John McGinn - Aston Villa",
                "Attack_KP!r",
                2
              ]
            ],
            [
              [
                "Danny Ings - Aston Villa",
                "Attack_Assist",
                0
              ],
              [
                "Danny Ings - Aston Villa",
                "MOTM",
                "true"
              ]
            ],
            [
              [
                "Danny Ings - Aston Villa",
                "Attack_SoT",
                3
              ],
              [
                "Danny Ings - Aston Villa",
                "Attack_SoT!r",
                1
              ],
              [
                "Emi Buendia - Aston Villa",
                "Attack_SoT",
                1
              ],
              [
                "Danny Ings - Aston Villa",
                "Attack_CarriesPA",
                2
              ],
              [
                "Danny Ings - Aston Villa",
                "Attack_CarriesPA!r",
                1
              ],
              [
                "Emi Buendia - Aston Villa",
                "Attack_SoT!tr",
                2
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Passing_TotalPerc",
                84.6
              ],
              [
                "Emi Buendia - Aston Villa",
                "Passing_TotalPerc!tr",
                2
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Passing_PassesFinal3rd",
                3
              ],
              [
                "John McGinn - Aston Villa",
                "Passing_PassesFinal3rd",
                4
              ],
              [
                "John McGinn - Aston Villa",
                "Passing_PassesFinal3rd!tr",
                1
              ],
              [
                "Emi Buendia - Aston Villa",
                "Passing_PassesFinal3rd!tr",
                2
              ]
            ],
            [
              [
                "Danny Ings - Aston Villa",
                "Possession_ReceiveProg",
                12
              ],
              [
                "Danny Ings - Aston Villa",
                "Possession_ReceiveProg!r",
                1
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Possession_CarriesFinal3rd",
                2
              ],
              [
                "Emi Buendia - Aston Villa",
                "Possession_DrbSucc",
                2
              ]
            ],
            [
              [
                "Danny Ings - Aston Villa",
                "Defence_Press",
                13
              ],
              [
                "Danny Ings - Aston Villa",
                "Defence_Press!tr",
                1
              ]
            ],
            [
              [
                "Danny Ings - Aston Villa",
                "Defence_PressSucc",
                5
              ],
              [
                "Danny Ings - Aston Villa",
                "Defence_PressSucc!tr",
                1
              ],
              [
                "Danny Ings - Aston Villa",
                "Defence_Int",
                2
              ],
              [
                "Danny Ings - Aston Villa",
                "Defence_Clearances",
                1
              ]
            ],
            [
              [
                "Emi Buendia - Aston Villa",
                "Defence_TacklesSucc",
                1
              ],
              [
                "Emi Buendia - Aston Villa",
                "Defence_TacklesSucc!tr",
                1
              ]
            ]
          ]
        }
      },
      "15": {
        data: [
          {
            text: "Southampton applied more pressure high up the pitch, pressing 46 times in the final third while Tottenham pressed 29 times in the final third.",
            id: "1481102117838499844"
          },
          {
            text: "In their last game (against West Ham) the Saints pressed 46 times in the final third and have pressed 39.0 times in the final third this season..",
            id: "1481102119545544706"
          },
          {
            text: "Southampton played 38 successful long balls, compared with 38 from Southampton. In their last game (against West Ham) the Saints successfully played 36 long balls and have averaged 37.0 per 90 minutes this season.",
            id: "1481102121277743106"
          },
          {
            text: "Southampton gave their opponent an average of 5.1 touches each time they pressed.",
            id: "1481102123022655488"
          },
          {
            text: "Tottenham allowed the Saints 2.6 touches per press, considerably less than the 3.6 touches permitted by West Ham in Southampton's last game. This season they've allowed the Saints 3.6 touches per press..",
            id: "1481102124666736648"
          },
          {
            text: "Southampton attempted 14 challenges resulting in six successful tackles. Tottenham attempted nine challenges, completing two successful tackles.",
            id: "1481102126860447745"
          },
          {
            text: "Tottenham were patient when of possession, making only one tackles in the defensive third Southampton's five.",
            id: "1481102128491945987"
          },
          {
            text: "Southampton won an impressive 24 aerial duels, similar to their average per 90 minute this season (20.0).",
            id: "1481102130077384709"
          },
          {
            text: "Southampton won 46% or the game's aerial duels. In their last game they won 51% and across the season they've won 45%.",
            id: "1481102131704868866"
          },
          {
            text: "James Ward-Prowse, our man of the match, took two shots on target (more than anyone else on the pitch) and took two shots on target.",
            id: "1481105908528824321"
          },
          {
            text: "Ibrahima Diallo created more than any other Southampton player (0.1), creating more successful passes than any other Southampton player.",
            id: "1481105910118465537"
          },
          {
            text: "Ibrahima Diallo played three key passes - more than anyone else on the pitch.",
            id: "1481105911695519744"
          },
          {
            text: "James Ward-Prowse successfuly completed 29 passes (more than any other Southampton player), while Ibrahima Diallo attempted four challenges.",
            id: "1481105913356460036"
          },
          {
            text: "Ibrahima Diallo found a teammate with 88% of his attempted passes, the highest pass completion rate of any Southampton player.",
            id: "1481105915029954563"
          },
          {
            text: "James Ward-Prowse made more successful passes into the final third than any other Southampton player (five), followed by Ibrahima Diallo, who completed four passes into the final third.",
            id: "1481105916753813509"
          },
          {
            text: "James Ward-Prowse carried the ball into the final third two times, while James Ward-Prowse made two carries into the final third.",
            id: "1481105918502842368"
          },
          {
            text: "James Ward-Prowse successfully dribbled past an opponent on one occasions out of one attempts - more than any other player in a Southampton shirt. Ibrahima Diallo successfully dribbled past an opponent on one occasions out of one attempts.",
            id: "1481105920201568258"
          },
          {
            text: "Ibrahima Diallo pressed the opponent 23 times - more than any other player in a Southampton shirt. Shane long pressed 27 times.",
            id: "1481105921975767040"
          },
          {
            text: "Ibrahima Diallo attempted more challenges than any other player on the pitch (a combined challanges (more than any other player on the pitch), followed by Shane, who attempted two challenges.",
            id: "1481105923645054983"
          }
        ],
        misc: {
          story_id: 15,
          team: "Southampton",
          opponent: "Tottenham",
          result: [
            1,
            1
          ],
          date: "2021-12-28",
          stories: [
            [
              [
                "Southampton",
                "Attack_PressFinal3rd",
                46
              ],
              [
                "Tottenham",
                "Attack_PressFinal3rd",
                29
              ],
              [
                "Southampton",
                "Attack_PressFinal3rd!p-West Ham",
                21
              ],
              [
                "Southampton",
                "Attack_PressFinal3rd!s",
                39.37
              ]
            ],
            [
              [
                "Southampton",
                "Passing_LongSucc",
                38
              ],
              [
                "Southampton",
                "Passing_LongSucc!p-West Ham",
                36
              ],
              [
                "Southampton",
                "Passing_LongSucc!s",
                36.74
              ]
            ],
            [
              [
                "Southampton",
                "Possession_TchPPressGivenRatio",
                5.14
              ],
              [
                "Tottenham",
                "Possession_TchPPressGivenRatio",
                2.58
              ],
              [
                "Southampton",
                "Possession_TchPPressGivenRatio!p-West Ham",
                3.64
              ],
              [
                "Southampton",
                "Possession_TchPPressGivenRatio!s",
                3.58
              ]
            ],
            [
              [
                "Southampton",
                "Defence_Tackles",
                14
              ],
              [
                "Tottenham",
                "Defence_Tackles",
                9
              ],
              [
                "Southampton",
                "Defence_TacklesSucc",
                6
              ],
              [
                "Tottenham",
                "Defence_TacklesSucc",
                2
              ]
            ],
            [
              [
                "Southampton",
                "Defence_TacklesDef3rd",
                5
              ],
              [
                "Tottenham",
                "Defence_TacklesDef3rd",
                1
              ]
            ],
            [
              [
                "Southampton",
                "Defence_AerialSucc",
                24
              ],
              [
                "Southampton",
                "Defence_AerialSucc!p-West Ham",
                24
              ],
              [
                "Southampton",
                "Defence_AerialSucc!s",
                19.95
              ]
            ],
            [
              [
                "Southampton",
                "Defence_AerialPerc",
                46.2
              ],
              [
                "Southampton",
                "Defence_AerialPerc!p-West Ham",
                51.1
              ],
              [
                "Southampton",
                "Defence_AerialPerc!s",
                45
              ]
            ],
            [
              [
                "James Ward-Prowse - Southampton",
                "MOTM",
                "true"
              ],
              [
                "James Ward-Prowse - Southampton",
                "Attack_SoT",
                2
              ],
              [
                "James Ward-Prowse - Southampton",
                "Attack_SoT!r",
                1
              ]
            ],
            [
              [
                "Ibrahima Diallo - Southampton",
                "Attack_xA",
                0.1
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Attack_xA!tr",
                1
              ]
            ],
            [
              [
                "Ibrahima Diallo - Southampton",
                "Attack_KP",
                3
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Attack_KP!r",
                1
              ]
            ],
            [
              [
                "James Ward-Prowse - Southampton",
                "Passing_TotalSucc",
                29
              ],
              [
                "James Ward-Prowse - Southampton",
                "Passing_TotalSucc!tr",
                1
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Passing_TotalSucc",
                28
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Passing_TotalSucc!tr",
                2
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Defence_Tackles",
                4
              ],
              [
                "Shane Long - Southampton",
                "Defence_Tackles",
                2
              ]
            ],
            [
              [
                "Ibrahima Diallo - Southampton",
                "Passing_TotalPerc",
                87.5
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Passing_TotalPerc!tr",
                1
              ]
            ],
            [
              [
                "James Ward-Prowse - Southampton",
                "Passing_PassesFinal3rd",
                6
              ],
              [
                "James Ward-Prowse - Southampton",
                "Passing_PassesFinal3rd!tr",
                1
              ],
              [
                "James Ward-Prowse - Southampton",
                "Passing_LongSucc",
                5
              ],
              [
                "James Ward-Prowse - Southampton",
                "Passing_LongSucc!tr",
                1
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Passing_LongSucc",
                4
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Passing_LongSucc!tr",
                2
              ]
            ],
            [
              [
                "James Ward-Prowse - Southampton",
                "Possession_CarriesFinal3rd",
                2
              ],
              [
                "James Ward-Prowse - Southampton",
                "Possession_CarriesFinal3rd!tr",
                2
              ]
            ],
            [
              [
                "James Ward-Prowse - Southampton",
                "Possession_DrbSucc",
                1
              ],
              [
                "James Ward-Prowse - Southampton",
                "Possession_DrbSucc!tr",
                1
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Possession_DrbSucc",
                1
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Possession_DrbSucc!tr",
                2
              ]
            ],
            [
              [
                "Ibrahima Diallo - Southampton",
                "Defence_Press",
                23
              ],
              [
                "Shane Long - Southampton",
                "Defence_Press",
                27
              ],
              [
                "Shane Long - Southampton",
                "Defence_Press!tr",
                1
              ],
              [
                "Ibrahima Diallo - Southampton",
                "Defence_Press!tr",
                2
              ]
            ],
            [
              [
                "Ibrahima Diallo - Southampton",
                "Defence_Tackles!r",
                1
              ],
              [
                "Shane Long - Southampton",
                "Defence_Tackles!r",
                2
              ]
            ]
          ]
        }
      },
      "16": {
        data: [
          {
            text: "Brentford saw more of the ball, completing 320 passes to the 148 they saw in their last game (against Manchester City).",
            id: "1481106500848336897"
          },
          {
            text: "Brentford took four shots on target, up from two in their last game against Manchester City.",
            id: "1481106502513479687"
          },
          {
            text: "Brentford were aggressive when of possession, making three tackles in the final third to Aston Villa's one.",
            id: "1481106504073818118"
          },
          {
            text: "Brentford succesffuly played 23 passes into the final third, considerably more than the eight they played in their last game (against Manchester City).",
            id: "1481110280922882048"
          },
          {
            text: "Brentford completed 58 long balls, compared with 58 from Manchester City. In their last game (against Manchester City) the Bees successfully played 22 long balls and have averaged 48.0 per 90 minutes this season.",
            id: "1481110282571329537"
          },
          {
            text: "Brentford were given an average of 6.1 touches each time the opponent pressed - more than the average amount of touches they've been given this season (3.7 touches per press).",
            id: "1481110284525838338"
          },
          {
            text: "Brentford were patient off the ball, allowing Aston Villa an average of 7.0 touches each time they pressed. Aston Villa allowed the Bees 6.1 touches per press, considerably more than the 3.7 touches permitted by Aston Villa in Brentford's last game.",
            id: "1481110286929219584"
          },
          {
            text: "Brentford attempted 24 challenges resulting in 10 successful tackles, while Aston Villa made 12 challenges and six successful tackles. This season they have averaged 19.0 challenges and six successful tackles per 90 minutes.",
            id: "1481110288577576961"
          },
          {
            text: "Brentford attempted 13 challenges in the defensive third, considerably more than the three made by Aston Villa. This season the Bees have averaged 9.3 tackles in the defensive third per 90 minutes.",
            id: "1481110290716577794"
          },
          {
            text: "Christian Norgaard successfuly completed 46 passes - the second most of any Brentford player.",
            id: "1481110292373385216"
          },
          {
            text: "Christian Norgaard made more successful passes into the final third than any other player on the pitch (nine), while Pontus Jansson completed 12.",
            id: "1481110293900058624"
          },
          {
            text: "Frankonyeka carried the ball farther towards the opponent's goal than any other player on the pitch (a combined 162 yards), while Frankonyeka carried the ball a combined 162 yards towards the opponent's goal.",
            id: "1481110295531638785"
          },
          {
            text: "Frankonyeka successfully dribbled past an opponent on one occasions out of one attempts - more than any other player in a Brentford shirt. Christian Norgaard successfully dribbled past an opponent on one occasions out of one attempts.",
            id: "1481110297217744897"
          },
          {
            text: "Frankonyeka pressed the opponent 20 times - more than any other player on the pitch. Christian Norgaard pressed 13 times.",
            id: "1481110299155574784"
          },
          {
            text: "Frankonyeka pressed the opponent more times (21) than any other player on the pitch, while Christian Norgaard pressed 5 times, winning possession on five occasions.",
            id: "1481110300770377731"
          },
          {
            text: "Frank onyeka attempted to make more challenges than any other player on the pitch (five), resulting in two successful tackles. Christian Norgaard attempted five challenges, completing two successful tackles.",
            id: "1481110302393569285"
          },
          {
            text: "Christian Norgaard made five interceptions - more than any other player on the pitch.",
            id: "1481114079200780288"
          }
        ],
        misc: {
          story_id: 16,
          team: "Brentford",
          opponent: "Aston Villa",
          result: [
            2,
            1
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Brentford",
                "Passing_TotalSucc",
                320
              ],
              [
                "Brentford",
                "Passing_TotalSucc!p-Manchester City",
                148
              ]
            ],
            [
              [
                "Brentford",
                "Attack_SoT",
                4
              ],
              [
                "Brentford",
                "Attack_SoT!p-Manchester City",
                2
              ]
            ],
            [
              [
                "Brentford",
                "Attack_TacklesFinal3rd",
                3
              ],
              [
                "Aston Villa",
                "Attack_TacklesFinal3rd",
                1
              ]
            ],
            [
              [
                "Brentford",
                "Passing_PassesFinal3rd",
                23
              ],
              [
                "Brentford",
                "Passing_PassesFinal3rd!p-Manchester City",
                8
              ]
            ],
            [
              [
                "Brentford",
                "Passing_LongSucc",
                58
              ],
              [
                "Brentford",
                "Passing_LongSucc!p-Manchester City",
                22
              ],
              [
                "Brentford",
                "Passing_LongSucc!s",
                48.11
              ],
              [
                "Brentford",
                "Passing_LongPerc",
                56.9
              ],
              [
                "Brentford",
                "Passing_LongPerc!p-Manchester City",
                31.4
              ]
            ],
            [
              [
                "Brentford",
                "Possession_TchPPressTakenRatio",
                6.12
              ],
              [
                "Brentford",
                "Possession_TchPPressTakenRatio!s",
                3.73
              ]
            ],
            [
              [
                "Brentford",
                "Possession_TchPPressGivenRatio",
                7.04
              ],
              [
                "Aston Villa",
                "Possession_TchPPressGivenRatio",
                6.12
              ],
              [
                "Brentford",
                "Possession_TchPPressGivenRatio!s",
                3.73
              ]
            ],
            [
              [
                "Brentford",
                "Defence_Tackles",
                24
              ],
              [
                "Aston Villa",
                "Defence_Tackles",
                12
              ],
              [
                "Brentford",
                "Defence_Tackles!s",
                19.16
              ],
              [
                "Brentford",
                "Defence_TacklesSucc",
                10
              ],
              [
                "Aston Villa",
                "Defence_TacklesSucc",
                6
              ]
            ],
            [
              [
                "Brentford",
                "Defence_TacklesDef3rd",
                13
              ],
              [
                "Aston Villa",
                "Defence_TacklesDef3rd",
                3
              ],
              [
                "Brentford",
                "Defence_TacklesDef3rd!s",
                9.32
              ]
            ],
            [
              [
                "Christian Norgaard - Brentford",
                "Passing_TotalSucc",
                46
              ],
              [
                "Christian Norgaard - Brentford",
                "Passing_TotalSucc!tr",
                2
              ]
            ],
            [
              [
                "Christian Norgaard - Brentford",
                "Passing_PassesFinal3rd",
                7
              ],
              [
                "Christian Norgaard - Brentford",
                "Passing_PassesFinal3rd!r",
                1
              ],
              [
                "Christian Norgaard - Brentford",
                "Passing_LongSucc",
                9
              ],
              [
                "Pontus Jansson - Brentford",
                "Passing_LongSucc",
                12
              ],
              [
                "Pontus Jansson - Brentford",
                "Passing_LongSucc!r",
                1
              ]
            ],
            [
              [
                "Frank Onyeka - Brentford",
                "Possession_CarriesPrgDist",
                162
              ],
              [
                "Frank Onyeka - Brentford",
                "Possession_CarriesPrgDist!r",
                1
              ]
            ],
            [
              [
                "Frank Onyeka - Brentford",
                "Possession_DrbSucc",
                1
              ],
              [
                "Frank Onyeka - Brentford",
                "Possession_DrbSucc!tr",
                1
              ],
              [
                "Christian Norgaard - Brentford",
                "Possession_DrbSucc",
                1
              ],
              [
                "Christian Norgaard - Brentford",
                "Possession_DrbSucc!tr",
                2
              ]
            ],
            [
              [
                "Frank Onyeka - Brentford",
                "Defence_Press",
                20
              ],
              [
                "Frank Onyeka - Brentford",
                "Defence_Press!r",
                1
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_Press",
                13
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_Press!r",
                2
              ]
            ],
            [
              [
                "Frank Onyeka - Brentford",
                "Defence_PressSucc",
                6
              ],
              [
                "Frank Onyeka - Brentford",
                "Defence_PressSucc!r",
                1
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_PressSucc",
                5
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_PressSucc!r",
                2
              ]
            ],
            [
              [
                "Frank Onyeka - Brentford",
                "Defence_Tackles",
                5
              ],
              [
                "Frank Onyeka - Brentford",
                "Defence_Tackles!r",
                1
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_Tackles",
                5
              ],
              [
                "Frank Onyeka - Brentford",
                "Defence_TacklesSucc",
                2
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_Tackles!r",
                2
              ]
            ],
            [
              [
                "Christian Norgaard - Brentford",
                "Defence_Int",
                5
              ],
              [
                "Christian Norgaard - Brentford",
                "Defence_Int!r",
                1
              ]
            ]
          ]
        }
      },
      "17": {
        data: [
          {
            text: "Everton saw more of the ball, completing 320 passes to Everton's 320. In their last game (against Chelsea) Everton completed 115 passes, while Everton completed 115.",
            id: "1481114650674700288"
          },
          {
            text: "Everton took six shots on target, up from three in their last game against Chelsea. This season the Toffees have averaged 3.7 took five shots on target per 90 minutes.",
            id: "1481114652419530752"
          },
          {
            text: "Everton were aggressive out of possession, making four tackles in the final third compared with 2.7 tackles in the final third this season.",
            id: "1481114654080475141"
          },
          {
            text: "Everton succesffuly played an impressive 31 passes into the final third, considerably more than the 21 from Brighton. In their last game (against Chelsea) the Toffees completed eight passes into the final third.",
            id: "1481114655674314757"
          },
          {
            text: "Everton played 64 successful long balls, compared with 45 from Brighton. In their last game (against Chelsea) the Toffees successfully played 27 long balls and have averaged 44.0 per 90 minutes this season.",
            id: "1481114657406529542"
          },
          {
            text: "Everton completed 55% of the passes they played long, compared with 45% from Brighton.",
            id: "1481114659063275520"
          },
          {
            text: "Everton were given an average of 4.8 touches each time the opponent pressed - more than the average amount of touches they've been given this season (3.2 touches per press).",
            id: "1481114660732608518"
          },
          {
            text: "Everton made 14 successful tackles, while Brighton made 10 successful tackles.",
            id: "1481114662305415169"
          },
          {
            text: "Everton won an impressive 29 aerial duels, considerably more than their average per 90 minute this season (18.0).",
            id: "1481114664000012288"
          },
          {
            text: "Demarai Gray, our man of the match, created some of the best chances of the game - tallying an xA of 0.3 (more than any other Everton player) created more than Jonjoe Kenny, finding chances worth 0.3 expected goals to Jonjoe Kenny's 0.2.",
            id: "1481114665619017741"
          },
          {
            text: "Demarai Gray also had a good game, playing more key passes than any other player on the pitch (three), followed by Jonjoe Kenny, who completed two key passes.",
            id: "1481114667435102210"
          },
          {
            text: "Jonjoe Kenny played one assist, while Allan assisted one assist.",
            id: "1481114669658296322"
          },
          {
            text: "Demarai Gray successfuly recieved eight progressive passes (more than any other Everton player) and recieved 8 progressive passes.",
            id: "1481118447127994371"
          },
          {
            text: "Demarai Gray successfully dribbled past an opponent on six occasions out of six attempts - more than any other player on the pitch.",
            id: "1481118448721838088"
          },
          {
            text: "Gray also carried the ball a combined 134 yards towards the opponent's goal, while Demarai Gray successfully dribbled past an opponent on six occasions out of six attempts..",
            id: "1481118450546266112"
          },
          {
            text: "Allan pressed the opponent more times (21) than any other player in a Everton shirt, winning possession on nine occassions.",
            id: "1481118452584701961"
          },
          {
            text: "Jonjoe Kenny attempted to make more challenges than any other Everton player (four), resulting in four successful tackles (more than any other player on the pitch). Allan attempted three challenges, completing two successful tackles.",
            id: "1481118454077870084"
          }
        ],
        misc: {
          story_id: 17,
          team: "Everton",
          opponent: "Brighton",
          result: [
            2,
            3
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Everton",
                "Passing_TotalSucc",
                320
              ],
              [
                "Everton",
                "Passing_TotalSucc!p-Chelsea",
                115
              ]
            ],
            [
              [
                "Everton",
                "Attack_SoT",
                6
              ],
              [
                "Brighton",
                "Attack_SoT",
                5
              ],
              [
                "Everton",
                "Attack_SoT!p-Chelsea",
                3
              ],
              [
                "Everton",
                "Attack_SoT!s",
                3.67
              ]
            ],
            [
              [
                "Everton",
                "Attack_TacklesFinal3rd",
                4
              ],
              [
                "Everton",
                "Attack_TacklesFinal3rd!s",
                2.67
              ]
            ],
            [
              [
                "Everton",
                "Passing_PassesFinal3rd",
                31
              ],
              [
                "Brighton",
                "Passing_PassesFinal3rd",
                21
              ],
              [
                "Everton",
                "Passing_PassesFinal3rd!p-Chelsea",
                8
              ]
            ],
            [
              [
                "Everton",
                "Passing_LongSucc",
                64
              ],
              [
                "Brighton",
                "Passing_LongSucc",
                45
              ],
              [
                "Everton",
                "Passing_LongSucc!p-Chelsea",
                27
              ],
              [
                "Everton",
                "Passing_LongSucc!s",
                44.28
              ]
            ],
            [
              [
                "Everton",
                "Passing_LongPerc",
                55.2
              ],
              [
                "Brighton",
                "Passing_LongPerc",
                45
              ]
            ],
            [
              [
                "Everton",
                "Possession_TchPPressTakenRatio",
                4.77
              ],
              [
                "Everton",
                "Possession_TchPPressTakenRatio!p-Chelsea",
                2.24
              ],
              [
                "Everton",
                "Possession_TchPPressTakenRatio!s",
                3.24
              ]
            ],
            [
              [
                "Everton",
                "Defence_TacklesSucc",
                14
              ],
              [
                "Brighton",
                "Defence_TacklesSucc",
                10
              ]
            ],
            [
              [
                "Everton",
                "Defence_AerialSucc",
                29
              ],
              [
                "Everton",
                "Defence_AerialSucc!s",
                17.83
              ]
            ],
            [
              [
                "Demarai Gray - Everton",
                "Attack_xA",
                0.3
              ],
              [
                "Demarai Gray - Everton",
                "MOTM",
                "true"
              ],
              [
                "Demarai Gray - Everton",
                "Attack_xA!tr",
                1
              ],
              [
                "Jonjoe Kenny - Everton",
                "Attack_xA",
                0.2
              ],
              [
                "Jonjoe Kenny - Everton",
                "Attack_xA!tr",
                2
              ]
            ],
            [
              [
                "Demarai Gray - Everton",
                "Attack_KP",
                3
              ],
              [
                "Demarai Gray - Everton",
                "Attack_KP!r",
                1
              ],
              [
                "Jonjoe Kenny - Everton",
                "Attack_KP",
                2
              ],
              [
                "Demarai Gray - Everton",
                "Attack_CarriesPA",
                1
              ],
              [
                "Jonjoe Kenny - Everton",
                "Attack_KP!r",
                2
              ]
            ],
            [
              [
                "Jonjoe Kenny - Everton",
                "Attack_Assist",
                1
              ],
              [
                "Allan - Everton",
                "Attack_Assist",
                1
              ],
              [
                "Allan - Everton",
                "Attack_Assist!tr",
                1
              ],
              [
                "Jonjoe Kenny - Everton",
                "Attack_Assist!tr",
                2
              ]
            ],
            [
              [
                "Demarai Gray - Everton",
                "Possession_ReceiveProg",
                8
              ],
              [
                "Demarai Gray - Everton",
                "Possession_ReceiveProg!tr",
                1
              ]
            ],
            [
              [
                "Demarai Gray - Everton",
                "Possession_CarriesPrgDist",
                134
              ],
              [
                "Demarai Gray - Everton",
                "Possession_DrbSucc",
                6
              ],
              [
                "Demarai Gray - Everton",
                "Possession_DrbSucc!r",
                1
              ]
            ],
            [
              [
                "Jonjoe Kenny - Everton",
                "Defence_PressSucc",
                9
              ],
              [
                "Allan - Everton",
                "Defence_PressSucc",
                9
              ],
              [
                "Allan - Everton",
                "Defence_PressSucc!tr",
                1
              ],
              [
                "Jonjoe Kenny - Everton",
                "Defence_PressSucc!tr",
                2
              ]
            ],
            [
              [
                "Jonjoe Kenny - Everton",
                "Defence_Tackles",
                4
              ],
              [
                "Jonjoe Kenny - Everton",
                "Defence_Tackles!tr",
                1
              ],
              [
                "Allan - Everton",
                "Defence_Tackles",
                3
              ],
              [
                "Jonjoe Kenny - Everton",
                "Defence_TacklesSucc",
                4
              ],
              [
                "Jonjoe Kenny - Everton",
                "Defence_TacklesSucc!r",
                1
              ],
              [
                "Allan - Everton",
                "Defence_TacklesSucc",
                2
              ]
            ],
            []
          ]
        }
      },
      "18": {
        data: [
          {
            text: "Burnley spent large parts of the game without the ball, completing only 214 passes to Leeds' 291.",
            id: "1481119031591641090"
          },
          {
            text: "Leeds United took seven shots on target, up from one in their last game against Arsenal. This season Leeds have averaged 4.0 took seven shots on target per 90 minutes.",
            id: "1481119033143480321"
          },
          {
            text: "Leeds United were aggressive out of possession, making five tackles in the final third to Burnley's two. In their last game (against Arsenal) United attempted one challenges in the final third, while throughout the season they've averaged 2.7 per 90 minutes.",
            id: "1481119034842226688"
          },
          {
            text: "Leeds United were given an average of 4.8 touches each time the opponent pressed - Burnley took an average of 3.3 touches per press. This season, Leeds United have averaged (3.7 touches for each opponent press.",
            id: "1481119036490625033"
          },
          {
            text: "Leeds United attempted 23 challenges in this game, considerably more than the 19 they made during their last game (against Arsenal). This season they have averaged 21.0 challenges per 90 minutes.",
            id: "1481119038109593602"
          },
          {
            text: "Burnley made seven successful tackles, while Leeds United made 11 successful tackles.",
            id: "1481119039778959365"
          },
          {
            text: "Leeds United won an impressive 30 aerial duels. In their last game they won 11 aerial duels and across the season they've averaged 15.0 per 90 minutes.",
            id: "1481119041452449793"
          },
          {
            text: "Mateusz Klich created less than Leeds, finding chances worth 0.3 expected goals to Leeds' 0.3.",
            id: "1481119043100753921"
          },
          {
            text: "Mateusz Klich played an impressive eight key passes, more than anyone else on the pitch, while Mateusz Klich played eight key passes resulting in one assist.",
            id: "1481122819782189057"
          },
          {
            text: "Luke Ayling successfuly completed 42 passes (more than any other player on the pitch), while Mateusz Klich completed 32.",
            id: "1481122821417979907"
          },
          {
            text: "Mateusz Klich made more successful passes into the final third than any other player on the pitch (six), while Luke Ayling completed five passes into the final third.",
            id: "1481122822978215937"
          },
          {
            text: "Luke Ayling played more successful long balls than any other Leeds player (eight), followed by Adam Forshaw, who completed five long balls.",
            id: "1481122824651784193"
          },
          {
            text: "Mateusz Klich successfuly recieved 10 progressive passes (more than any other player on the pitch) and recieved 10 progressive passes.",
            id: "1481122826220359685"
          },
          {
            text: "Luke Ayling carried the ball farther towards the opponent's goal than any other player on the pitch (a combined 185 yards), while Luke Ayling carried the ball a combined 185 yards towards the opponent's goal.",
            id: "1481122827940028416"
          },
          {
            text: "Mateusz Klich carried the ball into the final third four times (more than any other player on the pitch), while Adam Forshaw made two carries into the final third.",
            id: "1481122829642969089"
          },
          {
            text: "Mateusz Klich pressed the opponent 18 times - more than any other player in a Leeds shirt.",
            id: "1481122831660470276"
          },
          {
            text: "Luke Ayling made more interceptions (three) than any other Leeds player, while Adam Toshaw made three.",
            id: "1481122833199677440"
          },
          {
            text: "Luke Ayling made five clearances and won seven aerial duels (more than any other Leeds player).",
            id: "1481122834751668224"
          }
        ],
        misc: {
          story_id: 18,
          team: "Leeds United",
          opponent: "Burnley",
          result: [
            3,
            1
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Leeds United",
                "Passing_TotalSucc",
                291
              ],
              [
                "Burnley",
                "Passing_TotalSucc",
                214
              ]
            ],
            [
              [
                "Leeds United",
                "Attack_SoT",
                7
              ],
              [
                "Burnley",
                "Attack_SoT",
                2
              ],
              [
                "Leeds United",
                "Attack_SoT!p-Arsenal",
                1
              ],
              [
                "Leeds United",
                "Attack_SoT!s",
                4.05
              ]
            ],
            [
              [
                "Leeds United",
                "Attack_TacklesFinal3rd",
                5
              ],
              [
                "Burnley",
                "Attack_TacklesFinal3rd",
                2
              ],
              [
                "Leeds United",
                "Attack_TacklesFinal3rd!p-Arsenal",
                1
              ],
              [
                "Leeds United",
                "Attack_TacklesFinal3rd!s",
                2.68
              ]
            ],
            [
              [
                "Leeds United",
                "Possession_TchPPressTakenRatio",
                4.83
              ],
              [
                "Burnley",
                "Possession_TchPPressTakenRatio",
                3.34
              ],
              [
                "Leeds United",
                "Possession_TchPPressTakenRatio!s",
                3.68
              ]
            ],
            [
              [
                "Leeds United",
                "Defence_Tackles",
                23
              ],
              [
                "Leeds United",
                "Defence_Tackles!p-Arsenal",
                19
              ],
              [
                "Leeds United",
                "Defence_Tackles!s",
                20.79
              ]
            ],
            [
              [
                "Leeds United",
                "Defence_TacklesSucc",
                11
              ],
              [
                "Burnley",
                "Defence_TacklesSucc",
                7
              ]
            ],
            [
              [
                "Leeds United",
                "Defence_AerialSucc",
                30
              ],
              [
                "Leeds United",
                "Defence_AerialSucc!p-Arsenal",
                11
              ],
              [
                "Leeds United",
                "Defence_AerialSucc!s",
                14.84
              ],
              [
                "Leeds United",
                "Defence_AerialPerc",
                43.5
              ],
              [
                "Leeds United",
                "Defence_AerialPerc!p-Arsenal",
                39.3
              ]
            ],
            [
              [
                "Mateusz Klich - Leeds United",
                "Attack_xA",
                0.3
              ],
              [
                "Mateusz Klich - Leeds United",
                "Attack_xA!tr",
                2
              ]
            ],
            [
              [
                "Mateusz Klich - Leeds United",
                "Attack_KP",
                8
              ],
              [
                "Mateusz Klich - Leeds United",
                "Attack_KP!r",
                1
              ],
              [
                "Mateusz Klich - Leeds United",
                "Attack_Assist",
                1
              ]
            ],
            [
              [
                "Luke Ayling - Leeds United",
                "Passing_TotalSucc",
                42
              ],
              [
                "Luke Ayling - Leeds United",
                "Passing_TotalSucc!r",
                1
              ],
              [
                "Mateusz Klich - Leeds United",
                "Passing_TotalSucc",
                32
              ],
              [
                "Mateusz Klich - Leeds United",
                "Passing_TotalSucc!r",
                2
              ]
            ],
            [
              [
                "Luke Ayling - Leeds United",
                "Passing_PassesFinal3rd",
                5
              ],
              [
                "Mateusz Klich - Leeds United",
                "Passing_PassesFinal3rd",
                6
              ],
              [
                "Mateusz Klich - Leeds United",
                "Passing_PassesFinal3rd!r",
                1
              ],
              [
                "Luke Ayling - Leeds United",
                "Passing_PassesPrgDist",
                484
              ],
              [
                "Luke Ayling - Leeds United",
                "Passing_PassesPrgDist!r",
                1
              ]
            ],
            [
              [
                "Luke Ayling - Leeds United",
                "Passing_LongSucc",
                8
              ],
              [
                "Luke Ayling - Leeds United",
                "Passing_LongSucc!tr",
                1
              ],
              [
                "Adam Forshaw - Leeds United",
                "Passing_LongSucc",
                5
              ],
              [
                "Adam Forshaw - Leeds United",
                "Passing_LongSucc!tr",
                2
              ]
            ],
            [
              [
                "Mateusz Klich - Leeds United",
                "Possession_ReceiveProg",
                10
              ],
              [
                "Mateusz Klich - Leeds United",
                "Possession_ReceiveProg!r",
                1
              ]
            ],
            [
              [
                "Luke Ayling - Leeds United",
                "Possession_CarriesPrgDist",
                185
              ],
              [
                "Luke Ayling - Leeds United",
                "Possession_CarriesPrgDist!r",
                1
              ]
            ],
            [
              [
                "Mateusz Klich - Leeds United",
                "Possession_CarriesFinal3rd",
                4
              ],
              [
                "Mateusz Klich - Leeds United",
                "Possession_CarriesFinal3rd!r",
                1
              ],
              [
                "Adam Forshaw - Leeds United",
                "Possession_CarriesFinal3rd",
                2
              ],
              [
                "Adam Forshaw - Leeds United",
                "Possession_CarriesFinal3rd!tr",
                2
              ]
            ],
            [
              [
                "Mateusz Klich - Leeds United",
                "Defence_Press",
                18
              ],
              [
                "Mateusz Klich - Leeds United",
                "Defence_Press!tr",
                1
              ]
            ],
            [
              [
                "Luke Ayling - Leeds United",
                "Defence_Int",
                3
              ],
              [
                "Adam Forshaw - Leeds United",
                "Defence_Int",
                3
              ],
              [
                "Adam Forshaw - Leeds United",
                "Defence_Int!tr",
                1
              ],
              [
                "Luke Ayling - Leeds United",
                "Defence_Int!tr",
                2
              ]
            ],
            [
              [
                "Luke Ayling - Leeds United",
                "Defence_Clearances",
                5
              ],
              [
                "Luke Ayling - Leeds United",
                "Defence_AerialSucc",
                7
              ],
              [
                "Luke Ayling - Leeds United",
                "Defence_AerialSucc!tr",
                1
              ]
            ]
          ]
        }
      },
      "19": {
        data: [
          {
            text: "Watford found a teammate with 66% of his attempted passes. In their last game (against West Ham) the Hornets successfully played 70% of their attempted passes and have averaged 70% of their completed passes.",
            id: "1481123446448963585"
          },
          {
            text: "Watford took four shots on target, considerably more than their average per 90 minutes this season (4.0).",
            id: "1481123448151810049"
          },
          {
            text: "Watford were patient off the ball, allowing Tottenham an average of 8.7 touches each time they pressed.",
            id: "1481123449779200000"
          },
          {
            text: "Tottenham allowed the Hornets 2.6 touches per press, considerably less than the 5.7 touches permitted by West Ham in Watford's last game. This season, Watford have allowed the Hornets 3.3 touches for each opponent press..",
            id: "1481127226548670465"
          },
          {
            text: "Watford attempted 19 challenges in this game, more than the 17 made by Tottenham. In their last game (against West Ham) the Hornets attempted 20 challenges in the final game, while this season they have averaged 17.0 challenges per 90 minutes.",
            id: "1481127228238934016"
          },
          {
            text: "Watford made 10 successful tackles in this match, less than the 12 they made in their last match (against West Ham).",
            id: "1481127230101147652"
          },
          {
            text: "Watford attempted 13 challenges in the defensive third, considerably more than the three made by Tottenham. In their last game (against West Ham) the Hornets attempted 14 challenges in the defensive third, while throughout the season they've averaged 9.8 per 90 minutes.",
            id: "1481127231657230336"
          },
          {
            text: "Watford won 46% or the game's aerial duels. This season Watford have averaged 22.0 per 90 minutes.",
            id: "1481127233301401601"
          },
          {
            text: "Imran Louza successfuly completed 26 passes - more than any other Watford player.",
            id: "1481127235054673928"
          },
          {
            text: "Imran Louza found a teammate with 76% of his attempted passes, while Joshua King completed 77% of his passes.",
            id: "1481127236677914628"
          },
          {
            text: "Imran Louza made more successful passes into the final third than any other player on the pitch (two), followed by Joshua King, who completed two passes into the final third.",
            id: "1481127238242295809"
          },
          {
            text: "Juraj Kucka passed the ball a combined 175 yards towards the opponents goal, more than any other Watford player.",
            id: "1481127239911714816"
          },
          {
            text: "Juraj Kucka attempted to make five challenges, resulting in five successful passes (more than any other Watford player). Imran Louza attempted five challenges, completing the ball a combined 114 yards towards the opponent's goal.",
            id: "1481127241480343553"
          },
          {
            text: "Imran Louza successfully dribbled past an opponent on four occasions out of four attempts - more than any other Watford player.",
            id: "1481127244294729732"
          },
          {
            text: "Imran Louza pressed the opponent 27 times - more than any other player on the pitch.",
            id: "1481127245800484865"
          },
          {
            text: "Imran Louza pressed the opponent 5 times, while Joshua King pressed 6 times, winning possession on five occasions.",
            id: "1481127247427911680"
          },
          {
            text: "Juraj Kucka attempted to make more challenges than any other player on the pitch (three), resulting in three successful tackles. Imran Louza attempted three successful tackles.",
            id: "1481131024532836352"
          },
          {
            text: "Juraj Kucka made successful tackles - more than any other player on the pitch.",
            id: "1481131026629992449"
          },
          {
            text: "Juraj Kucka made six interceptions - more than any other player on the pitch.",
            id: "1481131028160913409"
          },
          {
            text: "Juraj Kucka made seven clearances (more than any other player on the pitch) and won seven aerial duels (also more than anyone else on the pitch).",
            id: "1481131029742211072"
          }
        ],
        misc: {
          story_id: 19,
          team: "Watford",
          opponent: "Tottenham",
          result: [
            0,
            1
          ],
          date: "2022-01-01",
          stories: [
            [
              [
                "Watford",
                "Passing_TotalPerc",
                66.2
              ],
              [
                "Watford",
                "Passing_TotalPerc!p-West Ham",
                70.1
              ]
            ],
            [
              [
                "Watford",
                "Attack_SoT",
                4
              ],
              [
                "Watford",
                "Attack_SoT!s",
                4
              ]
            ],
            [
              [
                "Watford",
                "Possession_TchPPressGivenRatio",
                8.71
              ],
              [
                "Tottenham",
                "Possession_TchPPressGivenRatio",
                2.64
              ],
              [
                "Watford",
                "Possession_TchPPressGivenRatio!p-West Ham",
                5.74
              ],
              [
                "Watford",
                "Possession_TchPPressGivenRatio!s",
                3.3
              ]
            ],
            [
              [
                "Watford",
                "Defence_Tackles",
                19
              ],
              [
                "Tottenham",
                "Defence_Tackles",
                17
              ],
              [
                "Watford",
                "Defence_Tackles!p-West Ham",
                20
              ],
              [
                "Watford",
                "Defence_Tackles!s",
                17.11
              ]
            ],
            [
              [
                "Watford",
                "Defence_TacklesSucc",
                10
              ],
              [
                "Watford",
                "Defence_TacklesSucc!p-West Ham",
                12
              ]
            ],
            [
              [
                "Watford",
                "Defence_TacklesDef3rd",
                13
              ],
              [
                "Tottenham",
                "Defence_TacklesDef3rd",
                3
              ],
              [
                "Watford",
                "Defence_TacklesDef3rd!p-West Ham",
                14
              ],
              [
                "Watford",
                "Defence_TacklesDef3rd!s",
                9.83
              ]
            ],
            [
              [
                "Watford",
                "Defence_AerialSucc",
                22
              ],
              [
                "Tottenham",
                "Defence_AerialSucc",
                26
              ],
              [
                "Watford",
                "Defence_AerialSucc!s",
                21.61
              ],
              [
                "Watford",
                "Defence_AerialPerc",
                45.8
              ],
              [
                "Tottenham",
                "Defence_AerialPerc",
                54.2
              ]
            ],
            [
              [
                "Imran Louza - Watford",
                "Passing_TotalSucc",
                26
              ],
              [
                "Imran Louza - Watford",
                "Passing_TotalSucc!tr",
                1
              ]
            ],
            [
              [
                "Imran Louza - Watford",
                "Passing_TotalPerc",
                76.5
              ],
              [
                "Joshua King - Watford",
                "Passing_TotalPerc",
                76.9
              ],
              [
                "Joshua King - Watford",
                "Passing_TotalPerc!tr",
                1
              ],
              [
                "Imran Louza - Watford",
                "Passing_TotalPerc!tr",
                2
              ]
            ],
            [
              [
                "Imran Louza - Watford",
                "Passing_PassesFinal3rd",
                2
              ],
              [
                "Imran Louza - Watford",
                "Passing_PassesFinal3rd!tr",
                1
              ],
              [
                "Joshua King - Watford",
                "Passing_PassesFinal3rd",
                1
              ],
              [
                "Joshua King - Watford",
                "Passing_PassesFinal3rd!tr",
                2
              ]
            ],
            [
              [
                "Juraj Kucka - Watford",
                "Passing_PassesPrgDist",
                175
              ],
              [
                "Juraj Kucka - Watford",
                "Passing_PassesPrgDist!tr",
                1
              ]
            ],
            [
              [
                "Juraj Kucka - Watford",
                "Possession_CarriesPrgDist",
                114
              ],
              [
                "Juraj Kucka - Watford",
                "Possession_CarriesPrgDist!tr",
                1
              ],
              [
                "Juraj Kucka - Watford",
                "Defence_Tackles",
                5
              ],
              [
                "Imran Louza - Watford",
                "Defence_Tackles",
                5
              ]
            ],
            [
              [
                "Imran Louza - Watford",
                "Possession_DrbSucc",
                4
              ],
              [
                "Imran Louza - Watford",
                "Possession_DrbSucc!tr",
                1
              ]
            ],
            [
              [
                "Imran Louza - Watford",
                "Defence_Press",
                27
              ],
              [
                "Imran Louza - Watford",
                "Defence_Press!r",
                1
              ]
            ],
            [
              [
                "Imran Louza - Watford",
                "Defence_PressSucc",
                5
              ],
              [
                "Joshua King - Watford",
                "Defence_PressSucc",
                6
              ],
              [
                "Joshua King - Watford",
                "Defence_PressSucc!r",
                1
              ],
              [
                "Imran Louza - Watford",
                "Defence_PressSucc!tr",
                2
              ]
            ],
            [
              [
                "Juraj Kucka - Watford",
                "Defence_Tackles!r",
                1
              ],
              [
                "Juraj Kucka - Watford",
                "Defence_TacklesSucc",
                3
              ],
              [
                "Imran Louza - Watford",
                "Defence_TacklesSucc",
                3
              ]
            ],
            [
              [
                "Juraj Kucka - Watford",
                "Defence_TacklesSucc!r",
                1
              ]
            ],
            [
              [
                "Juraj Kucka - Watford",
                "Defence_Int",
                6
              ],
              [
                "Juraj Kucka - Watford",
                "Defence_Int!r",
                1
              ]
            ],
            [
              [
                "Juraj Kucka - Watford",
                "Defence_Clearances",
                7
              ],
              [
                "Juraj Kucka - Watford",
                "Defence_Clearances!r",
                1
              ],
              [
                "Juraj Kucka - Watford",
                "Defence_AerialSucc",
                7
              ],
              [
                "Juraj Kucka - Watford",
                "Defence_AerialSucc!r",
                1
              ]
            ]
          ]
        }
      },
      "20": {
        data: [
          {
            text: "Burnley applied more pressure high up the pitch, pressing 51 times in the final third while Leeds United pressed 27 times in the final third.",
            id: "1481131595608334337"
          },
          {
            text: "In their last game (against Manchester United) the Clarets pressed 51 times in the final third and have pressed 35.0 times in the final third this season..",
            id: "1481131597260804096"
          },
          {
            text: "Burnley succesffuly played 30 passes into the final third, compared with 22 from Leeds. In their last game (against Manchester United) the Clarets completed 26 passes into the final third and have averaged 24.0 per 90 minutes this season.",
            id: "1481131598846255104"
          },
          {
            text: "Burnley gave their opponent an average of 4.8 touches each time they pressed. Leeds United allowed the Clarets 3.3 touches per press, considerably less than the 3.6 touches permitted by Leeds in Burnley's last game.",
            id: "1481131600519868417"
          },
          {
            text: "Burnley attempted eight challenges in the defensive third. In their last game (against Manchester United) the Clarets attempted six challenges in the defensive third.",
            id: "1481131602277289986"
          },
          {
            text: "Burnley won an impressive 39 aerial duels to Leeds' 30. In their last game (against Manchester United) the Clarets won 27 aerial duels and have averaged 28.0 per 90 minutes this season.",
            id: "1481131604542111744"
          },
          {
            text: "Burnley won 56% or the game's aerial duels. In their last game they won 53% and across the season they've won 53%.",
            id: "1481131606249295876"
          },
          {
            text: "Charlie Taylor, our man of the match, created some of the best chances of the game - tallying an xA of 0.5 (more than anyone else on the pitch) resulting in 0.5 (more than anyone else on the pitch) compared with 0.5 - more than anyone else on the pitch.",
            id: "1481131607809531906"
          },
          {
            text: "Charlie Taylor played two key passes - more than any other Burnley player.",
            id: "1481131609436962817"
          },
          {
            text: "Charlie Taylor successfuly completed 30 passes - more than any other Burnley player.",
            id: "1481135386382544898"
          },
          {
            text: "Ben Mee made six successful passes into the final third - more than any other player on the pitch.",
            id: "1481135387909230594"
          },
          {
            text: "Ben Mee passed the ball a combined 315 yards towards the opponents goal - more than any other Burnley player. Ben Mee also played more successful long balls than any other player on the pitch (nine), while Ben Mee completed nine.",
            id: "1481135389532426241"
          },
          {
            text: "Charlie Taylor carried the ball farther towards the opponent's goal than any other player in a Burnley shirt (a combined 60 yards). Ben Mee was the game's next most progessive ball carrier (65 yards).",
            id: "1481135391747063809"
          },
          {
            text: "Charlie Taylor successfully dribbled past an opponent on three occasions out of three attempts - more than any other player on the pitch. Taylor also carried the ball into the final third three times.",
            id: "1481135393734987777"
          },
          {
            text: "Charlie Taylor attempted to make more challenges than any other Burnley player (five), resulting in five attempted passes - more than any other Burnley player.",
            id: "1481135396046135300"
          },
          {
            text: "Charlie Taylor made four interceptions, while Ben Mee made three.",
            id: "1481135397744824320"
          },
          {
            text: "Chris Wood won 18 aerial duels (more than any other player on the pitch), while Charlie Taylor won five aerial duels.",
            id: "1481135400156545025"
          }
        ],
        misc: {
          story_id: 20,
          team: "Burnley",
          opponent: "Leeds United",
          result: [
            3,
            1
          ],
          date: "2022-01-02",
          stories: [
            [
              [
                "Burnley",
                "Attack_PressFinal3rd",
                51
              ],
              [
                "Leeds United",
                "Attack_PressFinal3rd",
                27
              ],
              [
                "Burnley",
                "Attack_PressFinal3rd!p-Manchester Utd",
                44
              ],
              [
                "Burnley",
                "Attack_PressFinal3rd!s",
                35
              ]
            ],
            [
              [
                "Burnley",
                "Passing_PassesFinal3rd",
                30
              ],
              [
                "Leeds United",
                "Passing_PassesFinal3rd",
                22
              ],
              [
                "Burnley",
                "Passing_PassesFinal3rd!p-Manchester Utd",
                26
              ],
              [
                "Burnley",
                "Passing_PassesFinal3rd!s",
                23.94
              ]
            ],
            [
              [
                "Burnley",
                "Possession_TchPPressGivenRatio",
                4.83
              ],
              [
                "Leeds United",
                "Possession_TchPPressGivenRatio",
                3.34
              ],
              [
                "Burnley",
                "Possession_TchPPressGivenRatio!s",
                3.58
              ]
            ],
            [
              [
                "Burnley",
                "Defence_TacklesDef3rd",
                8
              ],
              [
                "Burnley",
                "Defence_TacklesDef3rd!p-Manchester Utd",
                6
              ]
            ],
            [
              [
                "Burnley",
                "Defence_AerialSucc",
                39
              ],
              [
                "Leeds United",
                "Defence_AerialSucc",
                30
              ],
              [
                "Burnley",
                "Defence_AerialSucc!p-Manchester Utd",
                27
              ],
              [
                "Burnley",
                "Defence_AerialSucc!s",
                28.29
              ]
            ],
            [
              [
                "Burnley",
                "Defence_AerialPerc",
                56.5
              ],
              [
                "Leeds United",
                "Defence_AerialPerc",
                43.5
              ],
              [
                "Burnley",
                "Defence_AerialPerc!p-Manchester Utd",
                52.9
              ],
              [
                "Burnley",
                "Defence_AerialPerc!s",
                53.3
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Attack_xA",
                0.5
              ],
              [
                "Charlie Taylor - Burnley",
                "MOTM",
                "true"
              ],
              [
                "Charlie Taylor - Burnley",
                "Attack_xA!r",
                1
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Attack_KP",
                2
              ],
              [
                "Charlie Taylor - Burnley",
                "Attack_KP!tr",
                1
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Passing_TotalSucc",
                30
              ],
              [
                "Charlie Taylor - Burnley",
                "Passing_TotalSucc!tr",
                1
              ]
            ],
            [
              [
                "Ben Mee - Burnley",
                "Passing_PassesFinal3rd",
                6
              ],
              [
                "Ben Mee - Burnley",
                "Passing_PassesFinal3rd!r",
                1
              ]
            ],
            [
              [
                "Ben Mee - Burnley",
                "Passing_PassesPrgDist",
                315
              ],
              [
                "Ben Mee - Burnley",
                "Passing_PassesPrgDist!tr",
                1
              ],
              [
                "Ben Mee - Burnley",
                "Passing_LongSucc",
                9
              ],
              [
                "Ben Mee - Burnley",
                "Passing_LongSucc!r",
                1
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Possession_CarriesPrgDist",
                60
              ],
              [
                "Ben Mee - Burnley",
                "Possession_CarriesPrgDist",
                65
              ],
              [
                "Ben Mee - Burnley",
                "Possession_CarriesPrgDist!tr",
                1
              ],
              [
                "Charlie Taylor - Burnley",
                "Possession_CarriesPrgDist!tr",
                2
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Possession_CarriesFinal3rd",
                3
              ],
              [
                "Charlie Taylor - Burnley",
                "Possession_CarriesFinal3rd!tr",
                1
              ],
              [
                "Charlie Taylor - Burnley",
                "Possession_DrbSucc",
                3
              ],
              [
                "Charlie Taylor - Burnley",
                "Possession_DrbSucc!r",
                1
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Defence_Tackles",
                5
              ],
              [
                "Charlie Taylor - Burnley",
                "Defence_Tackles!tr",
                1
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Defence_Int",
                4
              ],
              [
                "Charlie Taylor - Burnley",
                "Defence_Int!r",
                1
              ],
              [
                "Ben Mee - Burnley",
                "Defence_Int",
                3
              ],
              [
                "Ben Mee - Burnley",
                "Defence_Int!r",
                2
              ]
            ],
            [
              [
                "Charlie Taylor - Burnley",
                "Defence_AerialSucc",
                5
              ],
              [
                "Chris Wood - Burnley",
                "Defence_AerialSucc",
                18
              ],
              [
                "Chris Wood - Burnley",
                "Defence_AerialSucc!r",
                1
              ],
              [
                "Charlie Taylor - Burnley",
                "Defence_AerialSucc!tr",
                2
              ]
            ]
          ]
        }
      }
    };
    someJSON = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      "default": tweets
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
function addZeros(id) {
  if (String(id).length < 3) {
    id = "0" + id;
  }
  if (String(id).length < 3) {
    id = "0" + id;
  }
  return id;
}
var css5, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_a9a6e648();
    init_stores_d75da388();
    init_fb_utils();
    init_tweets_222e5605();
    css5 = {
      code: ".body2.svelte-1sa3ipy{font-family:system-ui;color:#000;font-size:16px;line-height:17px;font-weight:500;letter-spacing:0.06em;margin-top:18px}h2.svelte-1sa3ipy{font-family:system-ui;font-size:12vw;margin:auto;line-height:0.85}a.svelte-1sa3ipy{text-decoration:auto;color:black}.row.svelte-1sa3ipy{border-bottom:1px solid #000;font-size:medium;padding-top:4px;padding-bottom:4px}.number.svelte-1sa3ipy{font-size:xx-large;line-height:1}.name.svelte-1sa3ipy{font-weight:800}.text.svelte-1sa3ipy{display:flex;justify-content:flex-start}.col1.svelte-1sa3ipy{overflow:hidden;width:40%}.last.svelte-1sa3ipy{border-bottom:none}.grid-container.svelte-1sa3ipy{display:grid;grid-template-columns:auto auto auto auto;grid-gap:10px;padding:10px}.team-div.svelte-1sa3ipy{background-color:rgba(255, 255, 255, 0.8);text-align:left;padding:20px 0;font-family:system-ui;font-size:1.4rem;width:100%}@media only screen and (max-width: 1180px){.grid-container.svelte-1sa3ipy{grid-template-columns:auto auto auto}}@media only screen and (max-width: 768px){.grid-container.svelte-1sa3ipy{grid-template-columns:auto auto}}@media only screen and (max-width: 600px){.grid-container.svelte-1sa3ipy{grid-template-columns:auto}}",
      map: null
    };
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      console.log("teams", teams.find((d) => d.name == "Tottenham"));
      let data = tweets;
      console.log("DATA", data);
      data = Object.keys(data).map((e2) => {
        return data[e2];
      });
      data.sort(function(a, b) {
        return b.misc.story_id - a.misc.story_id;
      });
      console.log("someJSON", data);
      $$result.css.add(css5);
      $$unsubscribe_page();
      return `<body class="${"body2 svelte-1sa3ipy"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

    <h2 class="${"svelte-1sa3ipy"}">Premier League<br>Statistics
    </h2>
    <div class="${"grid-container svelte-1sa3ipy"}">${each(data, ({ data: data2, misc }, i2) => `<a sveltekit:prefetch${add_attribute("href", "/team/" + teams.find((d) => d.name == misc.team)["id"], 0)} class="${"svelte-1sa3ipy"}"><div class="${[
        "team-div svelte-1sa3ipy",
        $page.url.pathname === "/" + teams.find((d) => d.name == misc.team)["id"] ? "active" : ""
      ].join(" ").trim()}"><div class="${"row number svelte-1sa3ipy"}">${escape(addZeros(misc.story_id))}</div>
                    <div class="${"row name svelte-1sa3ipy"}">${escape(misc.team)}</div>
                    <div class="${"row text svelte-1sa3ipy"}"><div class="${"col1 svelte-1sa3ipy"}">Opponent</div>
                        <div>${escape(misc.opponent)}</div></div>
                    <div class="${"row text svelte-1sa3ipy"}"><div class="${"col1 svelte-1sa3ipy"}">Result</div>
                        <div>${escape(misc.result[0])}-${escape(misc.result[1])}</div></div>
                    <div class="${"row text last svelte-1sa3ipy"}"><div class="${"col1 svelte-1sa3ipy"}">Date</div>
                        <div>${escape(misc.date)}</div></div>
                </div></a>


            `)}

        </div>
</body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css6,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css6;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-0553014e.js";
    js3 = ["pages/index.svelte-0553014e.js", "chunks/vendor-d72d44f7.js", "chunks/tweets-74065d1e.js"];
    css6 = ["assets/pages/index.svelte-4de5c469.css", "assets/tweets-8c07d15f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/team/_teamName_.svelte.js
var teamName_svelte_exports = {};
__export(teamName_svelte_exports, {
  default: () => U5BteamNameu5D
});
var css7, U5BteamNameu5D;
var init_teamName_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/team/_teamName_.svelte.js"() {
    init_index_a9a6e648();
    init_stores_d75da388();
    init_fb_utils();
    init_tweets_222e5605();
    css7 = {
      code: "a.tweets.svelte-15h0coy{color:var(--heading-color);line-height:initial;font-size:large}a.svelte-15h0coy:hover{background-color:yellow}.body2.svelte-15h0coy{font-family:system-ui;color:#000;font-size:16px;line-height:17px;font-weight:500;letter-spacing:0.06em;margin-top:18px}h2.svelte-15h0coy{font-family:system-ui;font-size:8vw;margin:auto;line-height:0.85}a.svelte-15h0coy{text-decoration:auto;color:black}",
      map: null
    };
    U5BteamNameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let teamName;
      let tweets$1;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      console.log("someJSON", someJSON);
      let data = tweets;
      data = Object.keys(data).map((e2) => {
        return data[e2];
      });
      $$result.css.add(css7);
      teamName = $page.params.teamName;
      teamName = teams.find((d) => d.id == teamName).name;
      {
        console.log("teamName", teamName);
      }
      tweets$1 = data.find((e2) => e2.misc.team == teamName).data;
      tweets$1 = tweets$1.sort(function(a, b) {
        return parseInt(a["id"]) - parseInt(b["id"]);
      });
      {
        console.log("TWEETS", tweets$1);
      }
      $$unsubscribe_page();
      return `<body class="${"body2 svelte-15h0coy"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
	<div style="${"height: 50px;"}"></div>
	<h2 class="${"svelte-15h0coy"}">Latest ${escape(teamName)} <br> match report
    </h2>
	<div style="${"height: 50px;"}"></div>
	<div id="${"tweet-cont"}" style="${"width: 640px; margin:0 auto;"}">${each(tweets$1, ({ id, text }, i2) => `<div><a class="${"tweets svelte-15h0coy"}"${add_attribute("href", "https://twitter.com/_Numbers_Game/status/" + id, 0)} target="${"_blank"}">${escape(text)}</a></div>
			<br>`)}</div></body>

`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css8,
  entry: () => entry4,
  js: () => js4,
  module: () => teamName_svelte_exports
});
var entry4, js4, css8;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_teamName_svelte();
    entry4 = "pages/team/_teamName_.svelte-b42c51c7.js";
    js4 = ["pages/team/_teamName_.svelte-b42c51c7.js", "chunks/vendor-d72d44f7.js", "chunks/tweets-74065d1e.js"];
    css8 = ["assets/pages/team/_teamName_.svelte-384a8127.css", "assets/tweets-8c07d15f.css"];
  }
});

// .svelte-kit/output/server/entries/endpoints/tweets.json.js
var tweets_json_exports = {};
__export(tweets_json_exports, {
  default: () => tweets
});
var init_tweets_json = __esm({
  ".svelte-kit/output/server/entries/endpoints/tweets.json.js"() {
    init_tweets_222e5605();
  }
});

// .svelte-kit/vercel-tmp/entry.js
__export(exports, {
  default: () => entry_default
});
init_install_fetch();

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
init_index_a9a6e648();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function decode_params(params) {
  for (const key in params) {
    params[key] = params[key].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  request.params = route.params ? decode_params(route.params(match)) : {};
  const response = await handler(request);
  const preface = `Invalid response from route ${request.url.pathname}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = __spreadProps(__spreadValues({}, headers), { "content-type": "application/json; charset=utf-8" });
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry5) {
    return entry5[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry5, i2) {
    names.set(entry5[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape2(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s2 = JSON.stringify;
async function render_response({
  branch,
  options,
  $session,
  page_config,
  status,
  error: error2,
  url,
  params
}) {
  const css22 = new Set(options.manifest._.entry.css);
  const js5 = new Set(options.manifest._.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => css22.add(url2));
      if (node.js)
        node.js.forEach((url2) => js5.add(url2));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: { url, params, status, error: error2 },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js5.clear();
  const links = options.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(css22).map((dep) => `<link rel="stylesheet" href="${options.prefix}${dep}">`),
    ...Array.from(js5).map((dep) => `<link rel="modulepreload" href="${options.prefix}${dep}">`)
  ].join("\n		");
  let init = "";
  if (options.amp) {
    init = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    init += options.service_worker ? '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>' : "";
  } else if (include_js) {
    init = `<script type="module">
			import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
			start({
				target: ${options.target ? `document.querySelector(${s2(options.target)})` : "document.body"},
				paths: ${s2(options.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s2(options.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
					],
					url: new URL(${s2(url.href)}),
					params: ${devalue(params)}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options.service_worker && !options.amp) {
    init += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init
  ].join("\n\n		");
  let body = rendered.html;
  if (options.amp) {
    if (options.service_worker) {
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    body += serialized_data.map(({ url: url2, body: body2, json }) => {
      let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url2)}`;
      if (body2)
        attributes += ` data-body="${hash(body2)}"`;
      return `<script ${attributes}>${json}<\/script>`;
    }).join("\n\n	");
  }
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
async function load_node({
  request,
  options,
  state,
  route,
  url,
  params,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const url_proxy = new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prerender_enabled && (prop === "search" || prop === "searchParams")) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      url: url_proxy,
      params,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        const resolved = resolve(request.url.pathname, requested.split("?")[0]);
        let response;
        const prefix = options.paths.assets || options.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          const relative = resolved;
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            if (request.headers.cookie) {
              opts.headers.set("cookie", request.headers.cookie);
            }
            if (request.headers.authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", request.headers.authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const rendered = await respond({
            url: new URL(requested, request.url),
            method: opts.method || "GET",
            headers: Object.fromEntries(opts.headers),
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body)
          }, options, {
            fetched: requested,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          } else {
            return fetch(new URL(requested, request.url).href, {
              method: opts.method || "GET",
              headers: opts.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${requested}) in server-side fetch`);
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${request.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            opts.headers.set("cookie", request.headers.cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url: requested,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: __spreadValues({}, stuff)
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({ request, options, state, $session, status, error: error2 }) {
  const default_layout = await options.manifest._.nodes[0]();
  const default_error = await options.manifest._.nodes[1]();
  const params = {};
  const loaded = await load_node({
    request,
    options,
    state,
    route: null,
    url: request.url,
    params,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options,
      state,
      route: null,
      url: request.url,
      params,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router,
        ssr: options.ssr
      },
      status,
      error: error2,
      branch,
      url: request.url,
      params
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options, node, state) {
  return options.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return await respond_with_error({
      request,
      options,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              url: request.url,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options, node, state),
              is_leaf: i2 === nodes.length - 1,
              is_error: false
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, request);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options.manifest._.nodes[route.b[i2]]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    url: request.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      url: request.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options.ssr,
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.url.pathname}`
    };
  }
  const params = route.params ? decode_params(route.params(match)) : {};
  const $session = await options.hooks.getSession(request);
  const response = await respond$1({
    request,
    options,
    state,
    $session,
    route,
    params
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd2(this, _map, void 0);
    __privateSet2(this, _map, map);
  }
  get(key) {
    const value = __privateGet2(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet2(this, _map).get(key);
  }
  has(key) {
    return __privateGet2(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet2(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield value[i2];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options, state = {}) {
  if (incoming.url.pathname !== "/" && options.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.url.pathname.endsWith("/");
    if (has_trailing_slash && options.trailing_slash === "never" || !has_trailing_slash && options.trailing_slash === "always" && !(incoming.url.pathname.split("/").pop() || "").includes(".")) {
      incoming.url.pathname = has_trailing_slash ? incoming.url.pathname.slice(0, -1) : incoming.url.pathname + "/";
      if (incoming.url.search === "?")
        incoming.url.search = "";
      return {
        status: 301,
        headers: {
          location: incoming.url.pathname + incoming.url.search
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = __spreadProps(__spreadValues({}, incoming), {
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  });
  const print_error = (property, replacement) => {
    Object.defineProperty(request, property, {
      get: () => {
        throw new Error(`request.${property} has been replaced by request.url.${replacement}`);
      }
    });
  };
  print_error("origin", "origin");
  print_error("path", "pathname");
  print_error("query", "searchParams");
  try {
    return await options.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: request2.url,
            params: request2.params,
            options,
            $session: await options.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.url.pathname).replace(options.paths.base, "");
        for (const route of options.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                let if_none_match_value = request2.headers["if-none-match"];
                if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                  if_none_match_value = if_none_match_value.substring(2);
                }
                const etag = `"${hash(response.body || "")}"`;
                if (if_none_match_value === etag) {
                  return {
                    status: 304,
                    headers: {}
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(request2);
          return await respond_with_error({
            request: request2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${request2.url.pathname}`)
          });
        }
      }
    });
  } catch (err) {
    const e2 = coalesce_to_error(err);
    options.handle_error(e2, request);
    return {
      status: 500,
      headers: {},
      body: options.dev ? e2.stack : e2.message
    };
  }
}
function afterUpdate() {
}
var css = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: null
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`
    })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<meta name="description" content="" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var default_protocol = "https";
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, request) => {
        hooks.handleError({ error: error2, request });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      ssr: true,
      target: "#svelte",
      template,
      trailing_slash: "never"
    };
  }
  render(request, {
    prerender
  } = {}) {
    if (Object.keys(request).sort().join() !== "headers,method,rawBody,url") {
      throw new Error("Adapters should call app.render({ url, method, headers, rawBody })");
    }
    const host = request.headers["host"];
    const protocol = default_protocol;
    return respond(__spreadProps(__spreadValues({}, request), { url: new URL(request.url, protocol + "://" + host) }), this.options, { prerender });
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: new Set(["favicon.png"]),
  _: {
    mime: { ".png": "image/png" },
    entry: { "file": "start-22a162d6.js", "js": ["start-22a162d6.js", "chunks/vendor-d72d44f7.js"], "css": ["assets/start-61d1577b.css"] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        a: [0, 2],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/fb-utils\/?$/,
        params: null,
        load: () => Promise.resolve().then(() => (init_fb_utils(), fb_utils_exports))
      },
      {
        type: "endpoint",
        pattern: /^\/tweets\/?$/,
        params: null,
        load: () => Promise.resolve().then(() => (init_tweets_json(), tweets_json_exports))
      },
      {
        type: "page",
        pattern: /^\/team\/([^/]+?)\/?$/,
        params: (m2) => ({ teamName: m2[1] }),
        path: null,
        a: [0, 3],
        b: [1]
      }
    ]
  }
};

// .svelte-kit/vercel-tmp/entry.js
__fetch_polyfill();
var app = new App(manifest);
var entry_default = async (req, res) => {
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await app.render({
    url: req.url,
    method: req.method,
    headers: req.headers,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
