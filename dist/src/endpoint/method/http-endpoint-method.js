"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var ts_common_1 = require("@ctx/ts.common");
var HttpEndpointMethod = /** @class */ (function () {
    function HttpEndpointMethod(signature) {
        this._type = signature.type;
        this._url = signature.url;
        this._search = signature.search;
        this._headers = signature.headers || new index_1.HttpHeaders();
        this._withCredentials = 'withCredentials' in signature ? !!signature.withCredentials : false;
        this._cache = 'cache' in signature ? !!signature.cache : false;
        this._timeout = signature.timeout;
        this._requestHooks = signature.requestHooks || [];
        this._responseHooks = signature.responseHooks || [];
        this._errorHooks = signature.errorHooks || [];
    }
    Object.defineProperty(HttpEndpointMethod.prototype, "requestHooks", {
        get: function () {
            return this._requestHooks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpEndpointMethod.prototype, "responseHooks", {
        get: function () {
            return this._responseHooks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpEndpointMethod.prototype, "errorHooks", {
        get: function () {
            return this._errorHooks;
        },
        enumerable: true,
        configurable: true
    });
    HttpEndpointMethod.prototype.toRequest = function (params, options) {
        var request, search, headers = this._headers.clone(), timeout = options && !isNaN(options.timeout) ? options.timeout : this._timeout;
        if (options && options.headers) {
            headers.merge(options.headers);
        }
        request = {
            method: this._type,
            url: this._url,
            headers: headers,
            withCredentials: options && options.withCredentials !== undefined ? options.withCredentials : this._withCredentials,
            cache: options && options.cache !== undefined ? options.cache : this._cache
        };
        if (timeout) {
            request.timeout = timeout;
        }
        if (params) {
            request.params = params;
        }
        if (this._search) {
            search = {};
            ts_common_1.merge(search, this._search);
        }
        if (options) {
            if (options.search) {
                if (!search) {
                    search = {};
                }
                ts_common_1.merge(search, options.search);
            }
            if (options.data) {
                request.data = options.data;
            }
        }
        if (search) {
            request.search = search;
        }
        return request;
    };
    return HttpEndpointMethod;
}());
exports.HttpEndpointMethod = HttpEndpointMethod;
//# sourceMappingURL=http-endpoint-method.js.map