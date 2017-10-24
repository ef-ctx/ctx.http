import {
  Observable
} from 'rxjs';

import {
  HooksProcessor,
  Map
} from '@ctx/ts.common';

import {
  UrlInterpolatorHook,
  HttpAdaptorHook,
  HttpEndpointMethod,
  HttpAdaptor,
  UrlInterpolator,
  HttpRequest,
  HttpResponse,
  HttpError,
  HttpRequestHook,
  HttpResponseHook,
  HttpErrorHook,
  HttpRequestOptions,
  HttpHooks,
  HttpHook
} from '../index';

import {
  isHttpResponse
} from '../utils/index';


/******************************************************
 *
 * HttpEndpoint
 *
 ******************************************************/

export class HttpEndpoint {

  private _methods: Map < string, HttpEndpointMethod > ;
  private _adaptor: HttpAdaptorHook;
  private _interpolator: UrlInterpolatorHook;
  private _hooksProcessor: HooksProcessor;
  private _hooks: HttpHooks;


  constructor(
    methods: Map < string, HttpEndpointMethod > ,
    adaptor: HttpAdaptor,
    interpolator: UrlInterpolator,
    hooksProcessor: HooksProcessor,
    hooks ? : HttpHooks
  ) {
    this._methods = methods;
    this._hooksProcessor = hooksProcessor;

    this._adaptor = new HttpAdaptorHook(adaptor);
    this._interpolator = new UrlInterpolatorHook(interpolator);

    this._hooks = hooks;
  }

  public request(
    methodId: string,
    params ? : {
      [key: string]: any
    },
    options ? : HttpRequestOptions

  ): Observable < HttpResponse | HttpError > {

    var method: HttpEndpointMethod = this._getMethodById(methodId),
      request: HttpRequest = method.toRequest(params, options),
      requestHooks: HttpHook[] = this._hooks.getArrayByKeys(method.requestHooks),
      responseHooks: HttpHook[] = this._hooks.getArrayByKeys(method.responseHooks),
      errorHooks: HttpHook[] = this._hooks.getArrayByKeys(method.errorHooks);

    // flatMap deprecated !!!!!
    return this._processRequest(request, requestHooks)
      .flatMap((response: HttpResponse) => this._processResponse(response, responseHooks))
      .catch((error: HttpError) => this._processError(error, errorHooks));
  }

  private _getMethodById(id: string): HttpEndpointMethod {

    var method: HttpEndpointMethod = this._methods.get(id);

    if (!method) {
      throw new Error(`There is no registered http method with the id '${id}'`);
    }

    return method;
  }

  private _processRequest(request: HttpRequest, hooks: HttpHook[]): Observable < HttpResponse > {

    hooks.push(this._interpolator, this._adaptor);

    return this._hooksProcessor.execute < HttpRequest,
    HttpResponse > (request, hooks, isHttpResponse);
  }

  private _processResponse(response: HttpResponse, hooks: HttpHook[]): Observable < HttpResponse > {

    return this._hooksProcessor.execute(response, hooks);
  }

  private _processError(error: HttpError, hooks: HttpHook[]): Observable < HttpError > {

    return this._hooksProcessor.execute(error, hooks)
      .flatMap((output: HttpError) => Observable.throw(output));
  }
}
