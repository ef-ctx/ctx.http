import { HttpHeadersConfig, HttpHooksConfig, HttpSearchParams } from '../../../index';
export interface HttpEndpointMethodConfig extends HttpHooksConfig {
    type: string;
    url: string;
    baseUrl?: string;
    search?: HttpSearchParams;
    withCredentials?: boolean;
    cache?: boolean;
    headers?: HttpHeadersConfig;
    timeout?: number;
}
