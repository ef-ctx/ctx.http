import { HttpRequest, HttpHeaders, HttpRequestOptions, HttpSearchParams } from '../../index';
export interface HttpEndpointMethodSignature {
    type: string;
    url: string;
    search?: HttpSearchParams;
    withCredentials?: boolean;
    cache?: boolean;
    headers?: HttpHeaders;
    timeout?: number;
    requestHooks?: string[];
    responseHooks?: string[];
    errorHooks?: string[];
}
export declare class HttpEndpointMethod {
    private _type;
    private _url;
    private _search;
    private _headers;
    private _withCredentials;
    private _cache;
    private _timeout;
    private _requestHooks;
    private _responseHooks;
    private _errorHooks;
    constructor(signature: HttpEndpointMethodSignature);
    readonly requestHooks: string[];
    readonly responseHooks: string[];
    readonly errorHooks: string[];
    toRequest(params?: {
        [key: string]: any;
    }, options?: HttpRequestOptions): HttpRequest;
}
