"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_common_1 = require("@ctx/ts.common");
var index_1 = require("../../../index");
var HttpEndpointConfigParser = /** @class */ (function () {
    function HttpEndpointConfigParser() {
    }
    HttpEndpointConfigParser.prototype.parse = function (config) {
        var _this = this;
        var methodMap = new ts_common_1.Map(), methods = config.methods;
        Object.keys(methods)
            .map(function (key) {
            methodMap.set(key, _this._createMethod(config, methods[key]));
        });
        return methodMap;
    };
    HttpEndpointConfigParser.prototype._createMethod = function (config, methodConfig) {
        var signature = {
            type: methodConfig.type,
            url: this._resolveUrl(config, methodConfig),
            search: this._resolveSearch(config.search, methodConfig.search),
            withCredentials: methodConfig.withCredentials !== undefined ? methodConfig.withCredentials : config.withCredentials,
            timeout: !!methodConfig.timeout ? methodConfig.timeout : config.timeout,
            cache: methodConfig.cache !== undefined ? methodConfig.cache : config.cache,
            headers: this._createHeaders(config.headers, methodConfig.headers),
            requestHooks: [].concat(config.requestHooks || []).concat(methodConfig.requestHooks || []),
            responseHooks: [].concat(config.responseHooks || []).concat(methodConfig.responseHooks || []),
            errorHooks: [].concat(config.errorHooks || []).concat(methodConfig.errorHooks || [])
        };
        return new index_1.HttpEndpointMethod(signature);
    };
    HttpEndpointConfigParser.prototype._resolveUrl = function (config, methodConfig) {
        var baseUrl = methodConfig.baseUrl || config.baseUrl || '';
        return baseUrl + methodConfig.url;
    };
    HttpEndpointConfigParser.prototype._resolveSearch = function (config, method) {
        var search = {};
        if (config) {
            ts_common_1.merge(search, config);
        }
        if (method) {
            ts_common_1.merge(search, method);
        }
        return search;
    };
    HttpEndpointConfigParser.prototype._createHeaders = function (configHeaders, methodHeaders) {
        if (configHeaders === void 0) { configHeaders = {}; }
        if (methodHeaders === void 0) { methodHeaders = {}; }
        var headers = new index_1.HttpHeaders();
        headers.fromObject(configHeaders);
        headers.fromObject(methodHeaders);
        return headers;
    };
    return HttpEndpointConfigParser;
}());
exports.HttpEndpointConfigParser = HttpEndpointConfigParser;
//# sourceMappingURL=http-endpoint-config-parser.js.map