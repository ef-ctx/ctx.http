import {
  Observable
} from 'rxjs';

import {
  HttpRequestHook,
  HttpAdaptor,
  HttpRequest,
  HttpResponse,
  HttpError
} from '../../index';


export class HttpAdaptorHook implements HttpRequestHook {

  private _adaptor: HttpAdaptor;


  constructor(adaptor: HttpAdaptor) {

    this._adaptor = adaptor;
  }

  public execute(input: HttpRequest): Observable < HttpResponse | HttpError > {

    /*
        @todo - add timeout handling here
     */

    return this._adaptor.request(input);
  }
}
