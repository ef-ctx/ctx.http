import {
  HttpRequest,
  HttpResponse
} from '../index';


export function isHttpRequest(arg: any): arg is HttpRequest {
  return 'method' in arg && 'url' in arg;
}

export function isHttpResponse(arg: any): arg is HttpResponse {
  return 'status' in arg;
}
