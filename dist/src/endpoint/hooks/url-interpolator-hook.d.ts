import { Observable } from 'rxjs';
import { HttpRequestHook, UrlInterpolator, HttpRequest } from '../../index';
export declare class UrlInterpolatorHook implements HttpRequestHook {
    private _interpolator;
    constructor(interpolator: UrlInterpolator);
    execute(input: HttpRequest): HttpRequest | Observable<HttpRequest>;
}
