import {
  Observable
} from 'rxjs';

import {
  HttpEndpointConfig,
  HttpRequest,
  HttpResponse,
  HttpError,
  HttpRequestHook,
  HttpResponseHook,
  HttpErrorHook,
  HttpAdaptor
} from '../.';


export const mockHttpConfig: HttpEndpointConfig = {

  baseUrl: 'api/',
  search: {
    field1: 'field1'
  },
  withCredentials: true,
  cache: true,
  headers: {
    Accept: 'application/json'
  },
  requestHooks: ['mainRequestHook'],
  responseHooks: ['mainResponseHook'],
  errorHooks: ['mainErrorHook'],
  methods: {
    getById: {
      type: 'GET',
      url: ':id/',
      search: {
        field2: 'field2'
      },
      headers: {
        'Cache-control': 'no-cache'
      },
      requestHooks: ['methodRequestHook'],
      responseHooks: ['methodResponseHook'],
      errorHooks: ['methodErrorHook']
    },
    create: {
      type: 'POST',
      url: 'test/',
      search: {
        field2: 'field2'
      },
      headers: {
        'Cache-control': 'no-cache'
      },
      requestHooks: ['methodRequestHook'],
      responseHooks: ['methodResponseHook'],
      errorHooks: ['methodErrorHook']
    }
  }
};

export class MockRequestHook implements HttpRequestHook {

  private _response: HttpResponse | HttpError;

  constructor(response ? : HttpResponse | HttpError) {
    this._response = response;
  }

  public execute(input: HttpRequest): HttpRequest | HttpResponse | HttpError | Observable < HttpRequest | HttpResponse | HttpError > {

    if (this._response) {

      if (this._isError(this._response)) {

        return Observable.throw(this._response);

      } else {

        return Observable.of(this._response);
      }
    }

    return Observable.of(input);
  }

  private _isError(arg: HttpResponse | HttpError): arg is HttpError {

    return arg.status >= 400;
  }
}

export class MockResponseHook implements HttpResponseHook {

  private _error: any;

  constructor(error ? : HttpError) {
    this._error = error;
  }

  public execute(input: HttpResponse): HttpResponse | HttpError | Observable < HttpResponse | HttpError > {

    if (this._error) {
      return Observable.throw(this._error);
    }

    return Observable.of(input);
  }
}

export class MockErrorHook implements HttpErrorHook {

  public execute(input: HttpError): HttpError | Observable < HttpError > {

    return Observable.of(input);
  }
}

export class MockHttpAdaptor implements HttpAdaptor {

  private _response: HttpResponse | HttpError;

  constructor(response: HttpResponse | HttpError) {
    this._response = response;
  }

  public request(request: HttpRequest): Observable < HttpResponse | HttpError > {

    this._response.request = request;

    if (this._isError(this._response)) {

      return Observable.throw(this._response);

    } else {

      return Observable.of(this._response);
    }
  }

  private _isError(arg: HttpResponse | HttpError): arg is HttpError {
    return arg.status >= 400;
  }
}
