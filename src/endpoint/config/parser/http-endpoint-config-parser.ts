import {
  Map,
  merge
} from '@ctx/ts.common';

import {
  HttpEndpointConfig,
  HttpSearchParams,
  HttpEndpointMethod,
  HttpEndpointMethodSignature,
  HttpEndpointMethodConfig,
  HttpHeaders,
  HttpHeadersConfig,
} from '../../../index';

export class HttpEndpointConfigParser {

  public parse(config: HttpEndpointConfig): Map < string, HttpEndpointMethod > {

    var methodMap: Map < string, HttpEndpointMethod > = new Map < string,
      HttpEndpointMethod > (),
      methods: {
        [methodId: string]: HttpEndpointMethodConfig
      } = config.methods;

    Object.keys(methods)
    .map((key: string) => {
      methodMap.set(key, this._createMethod(config, methods[key]));
    });

    return methodMap;
  }

  private _createMethod(config: HttpEndpointConfig, methodConfig: HttpEndpointMethodConfig): HttpEndpointMethod {

    var signature: HttpEndpointMethodSignature = {

      type: methodConfig.type,
      url: this._resolveUrl(config, methodConfig),
      search: this._resolveSearch(config.search, methodConfig.search),
      withCredentials: methodConfig.withCredentials !== undefined ? methodConfig.withCredentials : config.withCredentials,
      timeout: !!methodConfig.timeout ? methodConfig.timeout : config.timeout,
      cache: methodConfig.cache !== undefined ? methodConfig.cache : config.cache,
      headers: this._createHeaders(config.headers, methodConfig.headers),
      requestHooks: [].concat(config.requestHooks || []).concat(methodConfig.requestHooks || []),
      responseHooks: [].concat(config.responseHooks || []).concat(methodConfig.responseHooks || []),
      errorHooks: [].concat(config.errorHooks || []).concat(methodConfig.errorHooks || [])
    };

    return new HttpEndpointMethod(signature);
  }

  private _resolveUrl(config: HttpEndpointConfig, methodConfig: HttpEndpointMethodConfig): string {

    var baseUrl: string = methodConfig.baseUrl || config.baseUrl || '';

    return baseUrl + methodConfig.url;
  }

  private _resolveSearch(config: HttpSearchParams, method: HttpSearchParams): HttpSearchParams {

    var search: HttpSearchParams = {};

    if (config) {
      merge(search, config);
    }

    if (method) {
      merge(search, method);
    }

    return search;
  }

  private _createHeaders(
    configHeaders: HttpHeadersConfig = {},
    methodHeaders: HttpHeadersConfig = {}

  ): HttpHeaders {

    var headers: HttpHeaders = new HttpHeaders();

    headers.fromObject(configHeaders);
    headers.fromObject(methodHeaders);

    return headers;
  }

}
