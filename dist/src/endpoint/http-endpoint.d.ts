import { Observable } from 'rxjs';
import { HooksProcessor, Map } from '@ctx/ts.common';
import { HttpEndpointMethod, HttpAdaptor, UrlInterpolator, HttpResponse, HttpError, HttpRequestOptions, HttpHooks } from '../index';
/******************************************************
 *
 * HttpEndpoint
 *
 ******************************************************/
export declare class HttpEndpoint {
    private _methods;
    private _adaptor;
    private _interpolator;
    private _hooksProcessor;
    private _hooks;
    constructor(methods: Map<string, HttpEndpointMethod>, adaptor: HttpAdaptor, interpolator: UrlInterpolator, hooksProcessor: HooksProcessor, hooks?: HttpHooks);
    request(methodId: string, params?: {
        [key: string]: any;
    }, options?: HttpRequestOptions): Observable<HttpResponse | HttpError>;
    private _getMethodById(id);
    private _processRequest(request, hooks);
    private _processResponse(response, hooks);
    private _processError(error, hooks);
}
