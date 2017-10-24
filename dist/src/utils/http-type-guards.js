"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isHttpRequest(arg) {
    return 'method' in arg && 'url' in arg;
}
exports.isHttpRequest = isHttpRequest;
function isHttpResponse(arg) {
    return 'status' in arg;
}
exports.isHttpResponse = isHttpResponse;
//# sourceMappingURL=http-type-guards.js.map