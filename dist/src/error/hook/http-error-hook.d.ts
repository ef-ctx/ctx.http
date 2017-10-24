import { Hook } from '@ctx/ts.common';
import { HttpError } from '../../index';
export interface HttpErrorHook extends Hook<HttpError, HttpError> {
}
