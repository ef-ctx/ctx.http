"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpAdaptorHook = /** @class */ (function () {
    function HttpAdaptorHook(adaptor) {
        this._adaptor = adaptor;
    }
    HttpAdaptorHook.prototype.execute = function (input) {
        /*
            @todo - add timeout handling here
         */
        return this._adaptor.request(input);
    };
    return HttpAdaptorHook;
}());
exports.HttpAdaptorHook = HttpAdaptorHook;
//# sourceMappingURL=http-adaptor-hook.js.map