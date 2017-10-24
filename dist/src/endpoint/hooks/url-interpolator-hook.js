"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlInterpolatorHook = /** @class */ (function () {
    function UrlInterpolatorHook(interpolator) {
        this._interpolator = interpolator;
    }
    UrlInterpolatorHook.prototype.execute = function (input) {
        input.url = this._interpolator.interpolate(input.url, input.params);
        return input;
    };
    return UrlInterpolatorHook;
}());
exports.UrlInterpolatorHook = UrlInterpolatorHook;
//# sourceMappingURL=url-interpolator-hook.js.map