"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var index_1 = require("../index");
var index_2 = require("../utils/index");
/******************************************************
 *
 * HttpEndpoint
 *
 ******************************************************/
var HttpEndpoint = /** @class */ (function () {
    function HttpEndpoint(methods, adaptor, interpolator, hooksProcessor, hooks) {
        this._methods = methods;
        this._hooksProcessor = hooksProcessor;
        this._adaptor = new index_1.HttpAdaptorHook(adaptor);
        this._interpolator = new index_1.UrlInterpolatorHook(interpolator);
        this._hooks = hooks;
    }
    HttpEndpoint.prototype.request = function (methodId, params, options) {
        var _this = this;
        var method = this._getMethodById(methodId), request = method.toRequest(params, options), requestHooks = this._hooks.getArrayByKeys(method.requestHooks), responseHooks = this._hooks.getArrayByKeys(method.responseHooks), errorHooks = this._hooks.getArrayByKeys(method.errorHooks);
        // flatMap deprecated !!!!!
        return this._processRequest(request, requestHooks)
            .flatMap(function (response) { return _this._processResponse(response, responseHooks); })
            .catch(function (error) { return _this._processError(error, errorHooks); });
    };
    HttpEndpoint.prototype._getMethodById = function (id) {
        var method = this._methods.get(id);
        if (!method) {
            throw new Error("There is no registered http method with the id '" + id + "'");
        }
        return method;
    };
    HttpEndpoint.prototype._processRequest = function (request, hooks) {
        hooks.push(this._interpolator, this._adaptor);
        return this._hooksProcessor.execute(request, hooks, index_2.isHttpResponse);
    };
    HttpEndpoint.prototype._processResponse = function (response, hooks) {
        return this._hooksProcessor.execute(response, hooks);
    };
    HttpEndpoint.prototype._processError = function (error, hooks) {
        return this._hooksProcessor.execute(error, hooks)
            .flatMap(function (output) { return rxjs_1.Observable.throw(output); });
    };
    return HttpEndpoint;
}());
exports.HttpEndpoint = HttpEndpoint;
//# sourceMappingURL=http-endpoint.js.map