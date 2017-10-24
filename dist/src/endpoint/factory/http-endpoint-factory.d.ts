import { HooksProcessor } from '@ctx/ts.common';
import { HttpEndpoint, HttpEndpointConfigParser, HttpAdaptor, HttpEndpointConfig, UrlInterpolator, HttpHooks } from '../../index';
export declare class HttpEndpointFactory {
    private _parser;
    private _adaptor;
    private _interpolator;
    private _hookProcessor;
    private _hooks;
    constructor(adaptor: HttpAdaptor, hooks?: HttpHooks, parser?: HttpEndpointConfigParser, interpolator?: UrlInterpolator, processor?: HooksProcessor);
    create(config: HttpEndpointConfig): HttpEndpoint;
}
