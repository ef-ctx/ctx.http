import {
  HttpHeadersConfig,
  HttpEndpointMethodConfig
} from '../../index';


export interface HttpSearchParams {
  [key: string]: string;
}

export interface HttpHooksConfig {

  requestHooks ? : string[];
  responseHooks ? : string[];
  errorHooks ? : string[];
}

export interface HttpEndpointConfig extends HttpHooksConfig {

  baseUrl ? : string;
  search ? : HttpSearchParams;
  withCredentials ? : boolean;
  cache ? : boolean;
  headers ? : HttpHeadersConfig;
  timeout ? : number;

  methods: {
    [methodId: string]: HttpEndpointMethodConfig
  };
}
