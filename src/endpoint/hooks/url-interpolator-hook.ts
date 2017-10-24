import {
  Observable
} from 'rxjs';

import {
  HttpRequestHook,
  UrlInterpolator,
  HttpRequest
} from '../../index';


export class UrlInterpolatorHook implements HttpRequestHook {

  private _interpolator: UrlInterpolator;

  constructor(interpolator: UrlInterpolator) {
    this._interpolator = interpolator;
  }

  public execute(input: HttpRequest): HttpRequest | Observable < HttpRequest > {
    input.url = this._interpolator.interpolate(input.url, input.params);
    return input;
  }
}
