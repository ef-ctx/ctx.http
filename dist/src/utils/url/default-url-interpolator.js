"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultUrlInterpolator = /** @class */ (function () {
    function DefaultUrlInterpolator() {
    }
    DefaultUrlInterpolator.prototype.interpolate = function (url, params) {
        if (params === void 0) { params = {}; }
        return url.replace(/\/:(\w+)/g, function (match, key) {
            if (!!params[key]) {
                match = match.replace("/:" + key, '/' + params[key]);
            }
            else {
                throw new Error("Cannot compile url \"" + url + "\" parameter \"" + key + "\" is missing.");
            }
            return match;
        });
    };
    return DefaultUrlInterpolator;
}());
exports.DefaultUrlInterpolator = DefaultUrlInterpolator;
//# sourceMappingURL=default-url-interpolator.js.map