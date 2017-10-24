"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_common_1 = require("@ctx/ts.common");
var index_1 = require("../../index");
var HttpEndpointFactory = /** @class */ (function () {
    function HttpEndpointFactory(adaptor, hooks, parser, interpolator, processor) {
        this._adaptor = adaptor;
        this._hooks = hooks;
        this._parser = parser || new index_1.HttpEndpointConfigParser();
        this._interpolator = interpolator || new index_1.DefaultUrlInterpolator();
        this._hookProcessor = processor || new ts_common_1.DefaultHooksProcessor();
    }
    HttpEndpointFactory.prototype.create = function (config) {
        var methods = this._parser.parse(config);
        return new index_1.HttpEndpoint(methods, this._adaptor, this._interpolator, this._hookProcessor, this._hooks);
    };
    return HttpEndpointFactory;
}());
exports.HttpEndpointFactory = HttpEndpointFactory;
//# sourceMappingURL=http-endpoint-factory.js.map