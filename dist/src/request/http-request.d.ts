import { HttpRequestOptions } from '../index';
export interface HttpRequest extends HttpRequestOptions {
    method: string;
    url: string;
    params?: {
        [key: string]: any;
    };
}
