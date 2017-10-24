import {
  Map,
  DefaultHooksProcessor,
  HooksProcessor,
} from '@ctx/ts.common';

import {
  HttpEndpoint,
  HttpEndpointConfigParser,
  HttpAdaptor,
  HttpEndpointConfig,
  HttpEndpointMethod,
  UrlInterpolator,
  DefaultUrlInterpolator,
  HttpHooks
} from '../../index';

export class HttpEndpointFactory {

  private _parser: HttpEndpointConfigParser;
  private _adaptor: HttpAdaptor;
  private _interpolator: UrlInterpolator;
  private _hookProcessor: HooksProcessor;
  private _hooks: HttpHooks;


  constructor(
    adaptor: HttpAdaptor,
    hooks ? : HttpHooks,
    parser ? : HttpEndpointConfigParser,
    interpolator ? : UrlInterpolator,
    processor ? : HooksProcessor,
  ) {
    this._adaptor = adaptor;
    this._hooks = hooks;
    this._parser = parser || new HttpEndpointConfigParser();
    this._interpolator = interpolator || new DefaultUrlInterpolator();
    this._hookProcessor = processor || new DefaultHooksProcessor();
  }

  public create(config: HttpEndpointConfig): HttpEndpoint {

    var methods: Map < string, HttpEndpointMethod > = this._parser.parse(config);

    return new HttpEndpoint(methods, this._adaptor, this._interpolator, this._hookProcessor, this._hooks);
  }
}
