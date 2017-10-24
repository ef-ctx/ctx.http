import { Map } from '@ctx/ts.common';
import { HttpEndpointConfig, HttpEndpointMethod } from '../../../index';
export declare class HttpEndpointConfigParser {
    parse(config: HttpEndpointConfig): Map<string, HttpEndpointMethod>;
    private _createMethod(config, methodConfig);
    private _resolveUrl(config, methodConfig);
    private _resolveSearch(config, method);
    private _createHeaders(configHeaders?, methodHeaders?);
}
