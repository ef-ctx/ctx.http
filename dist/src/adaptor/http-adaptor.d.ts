import { Observable } from 'rxjs';
import { HttpResponse, HttpRequest, HttpError } from '../index';
export interface HttpAdaptor {
    request(request: HttpRequest): Observable<HttpResponse | HttpError>;
}
