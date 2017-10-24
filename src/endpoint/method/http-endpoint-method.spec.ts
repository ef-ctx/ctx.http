import {
  HttpEndpointMethod,
  HttpEndpointMethodSignature,
  HttpHeaders,
  HttpRequest,
  HttpRequestOptions
} from '../../index';


describe('HttpEndpointMethod', () => {

  var method: HttpEndpointMethod,
    signature: HttpEndpointMethodSignature;

  describe('constructor', () => {

    describe('with only mandatory signature values supplied', () => {

      beforeEach(() => {

        signature = {
          type: 'GET',
          url: 'http://google.com'
        };

        method = new HttpEndpointMethod(signature);
      });

      it('returns an HttpRequest object with default values', () => {

        var request: HttpRequest = method.toRequest();

        expect(request.method).toEqual(signature.type);
        expect(request.url).toEqual(signature.url);
        expect(request.headers).toEqual(jasmine.any(HttpHeaders));
        expect(request.withCredentials).toEqual(false);
        expect(request.cache).toEqual(false);

        expect('timeout' in request).toBe(false);
        expect('params' in request).toBe(false);
        expect('search' in request).toBe(false);
        expect('data' in request).toBe(false);
      });

      it('returns empty arrays for all hooks', () => {

        expect(method.requestHooks).toEqual([]);
        expect(method.responseHooks).toEqual([]);
        expect(method.errorHooks).toEqual([]);
      });
    });

    describe('with all signature values supplied', () => {

      beforeEach(() => {

        signature = {
          type: 'GET',
          url: 'http://google.com',
          withCredentials: true,
          cache: true,
          headers: new HttpHeaders({
            'Content-type': 'application/json'
          }),
          timeout: 1000,
          requestHooks: [null],
          responseHooks: [null],
          errorHooks: [null]
        };

        method = new HttpEndpointMethod(signature);
      });

      it('returns an HttpRquest with the default values overriden', () => {

        var request: HttpRequest = method.toRequest();

        expect(request.method).toEqual(signature.type);
        expect(request.url).toEqual(signature.url);
        expect(request.withCredentials).toEqual(signature.withCredentials);
        expect(request.cache).toEqual(signature.cache);
        expect(request.headers.get('Content-type')).toEqual(signature.headers.get('Content-type'));
        expect(request.timeout).toEqual(signature.timeout);

        expect(method.requestHooks).toEqual(signature.requestHooks);
        expect(method.responseHooks).toEqual(signature.responseHooks);
        expect(method.errorHooks).toEqual(signature.errorHooks);
      });

      it('creates a copy of the supplied headers to enforce encapsulation', () => {

        var request: HttpRequest = method.toRequest();

        expect(request.headers).not.toBe(signature.headers);
      });
    });
  });

  describe('toRequest', () => {

    beforeEach(() => {

      signature = {
        type: 'GET',
        url: 'http://google.com',
        withCredentials: true,
        cache: true,
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        }),
        timeout: 1000
      };

      method = new HttpEndpointMethod(signature);
    });

    describe('with no optional HttpRquest object supplied', () => {

      it('returns an HttpRequest object with the previously set constructor values', () => {

        var request: HttpRequest = method.toRequest();

        expect(request.method).toEqual(signature.type);
        expect(request.url).toEqual(signature.url);
        expect(request.withCredentials).toEqual(signature.withCredentials);
        expect(request.cache).toEqual(signature.cache);
        expect(request.headers.get('Content-type')).toEqual(signature.headers.get('Content-type'));
        expect(request.timeout).toEqual(signature.timeout);
      });
    });

    describe('with optional params supplied', () => {

      var request: HttpRequest,
        params: {
          [key: string]: any
        };

      beforeEach(() => {

        params = {
          id: 1
        };

        request = method.toRequest(params);
      });

      it('returns an HttpRequest object with the params', () => {

        expect(request.params).toEqual(params);
      });
    });

    describe('with an optional HttpRquest object supplied', () => {

      var options: HttpRequestOptions,
        request: HttpRequest;

      beforeEach(() => {

        options = {
          withCredentials: false,
          cache: false,
          headers: new HttpHeaders({
            'Content-type': 'application/xml'
          }),
          timeout: 6000,
          search: {
            id: 1
          },
          data: {}
        };

        request = method.toRequest(null, options);
      });

      it('returns an HttpRequest object with the previously set constructor values overriden', () => {

        expect(request.withCredentials).toEqual(options.withCredentials);
        expect(request.cache).toEqual(options.cache);
        expect(request.headers.get('Content-type')).toEqual(options.headers.get('Content-type'));
        expect(request.timeout).toEqual(options.timeout);
        expect(request.search).toEqual(options.search);
        expect(request.data).toEqual(options.data);
      });

      it('does not return the supplied headers object to enforce encapsulation', () => {

        expect(request.headers).not.toBe(options.headers);
      });
    });
  });
});
