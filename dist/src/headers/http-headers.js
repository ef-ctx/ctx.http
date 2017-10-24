"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_common_1 = require("@ctx/ts.common");
;
var HttpHeaders = /** @class */ (function () {
    function HttpHeaders(config) {
        this._map = new ts_common_1.Map();
        if (!config) {
            return;
        }
        this.fromObject(config);
    }
    HttpHeaders.prototype.set = function (name, value) {
        if (!value) {
            this._map.delete(name);
            return;
        }
        this._map.set(name, value);
    };
    HttpHeaders.prototype.get = function (name) {
        return this._map.get(name);
    };
    HttpHeaders.prototype.merge = function (headers) {
        this.fromObject(headers.toObject());
    };
    HttpHeaders.prototype.clone = function () {
        return new HttpHeaders(this.toObject());
    };
    HttpHeaders.prototype.toObject = function () {
        var headers = {};
        this._map.forEach(function (value, key) {
            headers[key] = value;
        });
        return headers;
    };
    HttpHeaders.prototype.fromObject = function (headers) {
        var _this = this;
        Object.keys(headers)
            .map(function (key) {
            _this._map.set(key, headers[key]);
        });
    };
    return HttpHeaders;
}());
exports.HttpHeaders = HttpHeaders;
//# sourceMappingURL=http-headers.js.map