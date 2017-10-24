import {
  HttpRequest,
  HttpHeaders,
  HttpRequestHook,
  HttpResponseHook,
  HttpErrorHook,
  HttpRequestOptions,
  HttpSearchParams,
} from '../../index';

import { merge } from '@ctx/ts.common';


export interface HttpEndpointMethodSignature {
  type: string,
    url: string,
    search ? : HttpSearchParams;
  withCredentials ? : boolean,
    cache ? : boolean,
    headers ? : HttpHeaders,
    timeout ? : number,
    requestHooks ? : string[],
    responseHooks ? : string[],
    errorHooks ? : string[]
}


export class HttpEndpointMethod {

  private _type: string;
  private _url: string;
  private _search: HttpSearchParams;
  private _headers: HttpHeaders;
  private _withCredentials: boolean;
  private _cache: boolean;
  private _timeout: number;

  private _requestHooks: string[];
  private _responseHooks: string[];
  private _errorHooks: string[];


  constructor(signature: HttpEndpointMethodSignature) {

    this._type = signature.type;
    this._url = signature.url;
    this._search = signature.search;
    this._headers = signature.headers || new HttpHeaders();
    this._withCredentials = 'withCredentials' in signature ? !!signature.withCredentials : false;
    this._cache = 'cache' in signature ? !!signature.cache : false;

    this._timeout = signature.timeout;

    this._requestHooks = signature.requestHooks || [];
    this._responseHooks = signature.responseHooks || [];
    this._errorHooks = signature.errorHooks || [];
  }

  get requestHooks() {
    return this._requestHooks;
  }
  get responseHooks() {
    return this._responseHooks;
  }
  get errorHooks() {
    return this._errorHooks;
  }

  public toRequest(params ? : {
    [key: string]: any
  }, options ? : HttpRequestOptions): HttpRequest {

    var request: HttpRequest,
      search: HttpSearchParams,
      headers: HttpHeaders = this._headers.clone(),
      timeout: number = options && !isNaN(options.timeout) ? options.timeout : this._timeout;

    if (options && options.headers) {
      headers.merge(options.headers);
    }

    request = {
      method: this._type,
      url: this._url,
      headers: headers,
      withCredentials: options && options.withCredentials !== undefined ? options.withCredentials : this._withCredentials,
      cache: options && options.cache !== undefined ? options.cache : this._cache
    };

    if (timeout) {
      request.timeout = timeout;
    }

    if (params) {
      request.params = params;
    }

    if (this._search) {

      search = {};

      merge(search, this._search);
    }

    if (options) {

      if (options.search) {

        if (!search) {
          search = {};
        }

        merge(search, options.search);
      }

      if (options.data) {
        request.data = options.data;
      }
    }

    if (search) {
      request.search = search;
    }

    return request;
  }
}
