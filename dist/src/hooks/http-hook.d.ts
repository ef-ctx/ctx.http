import { Hook } from '@ctx/ts.common';
import { HttpRequest, HttpResponse, HttpError } from "../index";
export interface HttpHook extends Hook<HttpRequest | HttpResponse | HttpError, HttpRequest | HttpResponse | HttpError> {
}
