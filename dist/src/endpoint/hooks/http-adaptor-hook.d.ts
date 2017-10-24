import { Observable } from 'rxjs';
import { HttpRequestHook, HttpAdaptor, HttpRequest, HttpResponse, HttpError } from '../../index';
export declare class HttpAdaptorHook implements HttpRequestHook {
    private _adaptor;
    constructor(adaptor: HttpAdaptor);
    execute(input: HttpRequest): Observable<HttpResponse | HttpError>;
}
