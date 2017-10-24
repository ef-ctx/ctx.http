"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_common_1 = require("@ctx/ts.common");
var HttpHooks = /** @class */ (function () {
    function HttpHooks() {
        this._hooks = new ts_common_1.Dictionary();
    }
    HttpHooks.prototype.add = function (key, hook) {
        this._hooks.addItem(key, hook);
        return hook;
    };
    HttpHooks.prototype.getByKey = function (key) {
        return this._hooks.getByKey(key);
    };
    HttpHooks.prototype.getByKeys = function (keys) {
        return this._hooks.getByKeys(keys);
    };
    HttpHooks.prototype.getArrayByKeys = function (keys) {
        return this._hooks.getArrayByKeys(keys);
    };
    HttpHooks.prototype.toArray = function () {
        return this._hooks.toArray();
    };
    return HttpHooks;
}());
exports.HttpHooks = HttpHooks;
//# sourceMappingURL=http-hooks.js.map