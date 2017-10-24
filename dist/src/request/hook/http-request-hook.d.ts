import { Hook } from '@ctx/ts.common';
import { HttpResponse, HttpRequest, HttpError } from '../../index';
export interface HttpRequestHook extends Hook<HttpRequest, HttpRequest | HttpResponse | HttpError> {
}
