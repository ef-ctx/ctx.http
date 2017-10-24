/*
    HttpEndpoint integration tests
 */

import Spy = jasmine.Spy;

import {
  Observable
} from 'rxjs';

import {
  Map
} from '@ctx/ts.common';

import {
  HttpEndpointConfigParser,
  HttpEndpointMethod,
  HttpEndpoint,
  HttpRequestHook,
  HttpResponseHook,
  HttpErrorHook,
  HttpResponse,
  HttpError,
  UrlInterpolator,
  HttpAdaptor,
  DefaultUrlInterpolator,
  HttpHeaders,
  HttpRequestOptions,
  HttpRequest,
  HttpHooks,
} from '../index';

import {
  mockHttpConfig,
  MockRequestHook,
  MockResponseHook,
  MockErrorHook,
  MockHttpAdaptor
} from '../http.mock';

import {
  Hook,
  HooksProcessor,
  DefaultHooksProcessor
} from "@ctx/ts.common";


describe('HttpEndpoint', () => {

  var parser: HttpEndpointConfigParser,
    requestHookMap: Map < string, HttpRequestHook > ,
    responseHookMap: Map < string, HttpResponseHook > ,
    errorHookMap: Map < string, HttpErrorHook > ,
    methods: Map < string, HttpEndpointMethod > ,
    adaptor: HttpAdaptor,
    interpolator: UrlInterpolator,
    hooksProcessor: HooksProcessor,
    endpoint: HttpEndpoint,
    hooks: HttpHooks;

  var mockResponse: HttpResponse,
    mockError: HttpError;

  function createHookMaps() {

    requestHookMap = new Map < string, HttpRequestHook > ();
    responseHookMap = new Map < string, HttpResponseHook > ();
    errorHookMap = new Map < string, HttpErrorHook > ();
  }

  function populateMapsWithConcreteHooks(requestResponse ? : HttpResponse | HttpError, responseError ? : HttpError) {

    hooks = new HttpHooks();

    hooks.add('mainRequestHook', new MockRequestHook(requestResponse));
    hooks.add('methodRequestHook', new MockRequestHook());
    hooks.add('mainResponseHook', new MockResponseHook(responseError));
    hooks.add('methodResponseHook', new MockResponseHook());
    hooks.add('mainErrorHook', new MockErrorHook());
    hooks.add('methodErrorHook', new MockErrorHook());
  }

  function createParser() {
    parser = new HttpEndpointConfigParser();
  }

  function parseConfig() {
    methods = parser.parse(mockHttpConfig);
  }

  function createEndpoint(response: HttpResponse | HttpError) {

    adaptor = new MockHttpAdaptor(response);
    interpolator = new DefaultUrlInterpolator();
    hooksProcessor = new DefaultHooksProcessor();

    endpoint = new HttpEndpoint(methods, adaptor, interpolator, hooksProcessor, hooks);
  }

  function setUp(
    response: HttpResponse | HttpError,
    requestHookResponse ? : HttpResponse | HttpError,
    responseHookError ? : HttpError
  ) {
    createHookMaps();
    populateMapsWithConcreteHooks(requestHookResponse, responseHookError);
    createParser();
    parseConfig();
    createEndpoint(response);
  }

  beforeEach(() => {

    mockResponse = {
      status: 200,
      statusText: 'status text',
      data: {},
      headers: new HttpHeaders(),
      request: null
    };

    mockError = {
      status: 500,
      statusText: 'status text',
      data: {},
      headers: new HttpHeaders(),
      request: null
    };
  });

  describe('request creation', () => {

    it('errores if the supplied method id does not exist', () => {

      var methodId: string = 'noSuchMethod';

      setUp(mockResponse);

      expect(() => {

        endpoint.request(methodId)
          .subscribe();

      }).toThrow();
    });

    it('makes a request with the expected HttpEndpointMethod properties', (done: Function) => {

      setUp(mockResponse);

      endpoint.request('create')
        .subscribe((response: HttpResponse) => {

          var request: HttpRequest = response.request,
            headers: HttpHeaders = request.headers;

          expect(request.search).toEqual({
            field1: 'field1',
            field2: 'field2',
          });

          expect(request.method).toBe('POST');
          expect(request.data).toBeUndefined();
          expect(request.withCredentials).toEqual(true);
          expect(request.cache).toEqual(true);
          expect(request.timeout).toBeUndefined();

          expect(headers.get('Accept')).toEqual('application/json');
          expect(headers.get('Cache-control')).toEqual('no-cache');

          done();
        });
    });

    it('overwrites the request params with the supplied options', (done: Function) => {

      var requestOptions: HttpRequestOptions = {

        search: {
          test1: 'test1',
          field2: 'overwritten'
        },
        data: {
          field: true
        },
        headers: new HttpHeaders({
          'Cache-control': 'max-age=0'
        }),
        withCredentials: false,
        cache: false,
        timeout: 1000
      };

      setUp(mockResponse);

      endpoint.request('create', undefined, requestOptions)
        .subscribe((response: HttpResponse) => {

          var request: HttpRequest = response.request,
            headers: HttpHeaders = request.headers;

          expect(request.search).toEqual({
            field1: 'field1',
            field2: 'overwritten',
            test1: 'test1'
          });

          expect(request.data).toEqual({
            field: true
          });
          expect(request.withCredentials).toEqual(false);
          expect(request.cache).toEqual(false);
          expect(request.timeout).toEqual(1000);

          expect(headers.get('Accept')).toEqual('application/json');
          expect(headers.get('Cache-control')).toEqual('max-age=0');

          done();
        });
    });
  });

  describe('request hook phase', () => {

    var methodId: string,
      method: HttpEndpointMethod,
      hookSpys: Spy[],
      adaptorSpy: Spy,
      interpolatorSpy: Spy;

    function setUpHookSpys() {

      methodId = 'create';
      method = methods.get(methodId);

      hookSpys = hooks
        .getArrayByKeys(method.requestHooks)
        .map((hook: HttpRequestHook) => spyOn<any>(hook, 'execute').and.callThrough());
    }

    function setUpSpys() {

      adaptorSpy = spyOn(adaptor, 'request').and.callThrough();
      interpolatorSpy = spyOn(interpolator, 'interpolate').and.callThrough();
    }

    it('processes the request hooks', (done: Function) => {

      setUp(mockResponse);
      setUpHookSpys();

      endpoint.request(methodId)
        .subscribe((response: HttpResponse) => {

          hookSpys.forEach((spy: Spy) => {
            expect(spy).toHaveBeenCalledWith(response.request);
          });

          done();
        });
    });

    it('interpolate the url with the supplied params', (done: Function) => {

      setUp(mockResponse);

      endpoint.request('getById', {
          id: 5
        })
        .subscribe((response: HttpResponse) => {
          expect(response.request.url).toBe('api/5/');
          done();
        });
    });

    it('calls the HttpAdaptor once the url has been interpolated', (done: Function) => {

      setUp(mockResponse);
      setUpSpys();

      endpoint.request('getById', {
          id: 5
        })
        .subscribe((response: HttpResponse) => {

          var request: HttpRequest = adaptorSpy.calls.argsFor(0)[0];

          expect(request.url).toBe('api/5/');
          expect(request.method).toBe('GET');
          expect(request.data).toBeUndefined();
          expect(request.withCredentials).toEqual(true);
          expect(request.cache).toEqual(true);
          expect(request.timeout).toBeUndefined();

          done();
        });
    });

    it('bypasses any remaining hooks if an HttpResponse is returned during the phase', (done: Function) => {

      var interuptResponse: HttpResponse = {
        status: 200,
        statusText: 'interupt response',
        data: {},
        headers: new HttpHeaders(),
        request: null
      };

      setUp(mockResponse, interuptResponse);
      setUpHookSpys();
      setUpSpys();

      endpoint.request(methodId)
        .subscribe((response: HttpResponse) => {

          expect(hookSpys.reduce((count: number, spy: Spy) => {
            return spy.calls.count() + count;
          }, 0)).toEqual(1);

          expect(adaptorSpy).not.toHaveBeenCalled();
          expect(interpolatorSpy).not.toHaveBeenCalled();

          expect(response).not.toBe(mockResponse);
          expect(response).toBe(interuptResponse);

          done();
        });
    });

    it('bypasses any remaining hooks if an HttpError is returned during the phase', (done: Function) => {

      setUp(mockResponse, mockError);
      setUpHookSpys();
      setUpSpys();

      endpoint.request(methodId)
        .catch((error: HttpError) => {

          expect(hookSpys.reduce((count: number, spy: Spy) => {
            return spy.calls.count() + count;
          }, 0)).toEqual(1);

          expect(adaptorSpy).not.toHaveBeenCalled();
          expect(interpolatorSpy).not.toHaveBeenCalled();

          expect(error).not.toBe(mockResponse);
          expect(error).toBe(mockError);

          done();

          return Observable.of(error);
        })
        .subscribe();
    });
  });

  describe('response hooks phase', () => {

    var methodId: string,
      method: HttpEndpointMethod,
      hookSpys: Spy[];

    function setUpHookSpys() {

      methodId = 'create';
      method = methods.get(methodId);

      hookSpys = hooks
        .getArrayByKeys(method.responseHooks)
        .map((hook: HttpRequestHook) => spyOn<any>(hook, 'execute').and.callThrough());
    }

    it('processes the response hooks', (done: Function) => {

      setUp(mockResponse);
      setUpHookSpys();

      endpoint.request(methodId)
        .subscribe((response: HttpResponse) => {

          hookSpys.forEach((spy: Spy) => {
            expect(spy).toHaveBeenCalledWith(response);
          });

          done();
        });
    });

    it('bypasses any remaining hooks if an HttpError is returned during the phase', (done: Function) => {

      setUp(mockResponse, null, mockError);
      setUpHookSpys();

      endpoint.request(methodId)
        .catch((error: HttpError) => {

          expect(hookSpys.reduce((count: number, spy: Spy) => {
            return spy.calls.count() + count;
          }, 0)).toEqual(1);

          expect(error).not.toBe(mockResponse);
          expect(error).toBe(mockError);

          done();

          return Observable.of(error);
        })
        .subscribe();
    });

    it('bypasses this phase in its entirety if an HttpError is returned during the request phase', (done: Function) => {

      setUp(mockError);
      setUpHookSpys();

      endpoint.request(methodId)
        .catch((error: HttpError) => {

          expect(hookSpys.reduce((count: number, spy: Spy) => {
            return spy.calls.count() + count;
          }, 0)).toEqual(0);

          expect(error).not.toBe(mockResponse);
          expect(error).toBe(mockError);

          done();

          return Observable.of(error);
        })
        .subscribe();
    });
  });

  describe('error hook phase', () => {

    var methodId: string,
      method: HttpEndpointMethod,
      hookSpys: Spy[];

    function setUpHookSpys() {

      methodId = 'create';
      method = methods.get(methodId);

      hookSpys = hooks
        .getArrayByKeys(method.errorHooks)
        .map((hook: HttpRequestHook) => spyOn<any>(hook, 'execute').and.callThrough());
    }

    it('processes the error hooks when an error occurs in the request phase', (done: Function) => {

      setUp(mockError);
      setUpHookSpys();

      endpoint.request(methodId)
        .catch((error: HttpError) => {

          hookSpys.forEach((spy: Spy) => {
            expect(spy).toHaveBeenCalledWith(error);
          });

          done();

          return Observable.of(error);
        })
        .subscribe();
    });

    it('processes the error hooks when an error occurs in the response phase', (done: Function) => {

      setUp(mockResponse, null, mockError);
      setUpHookSpys();

      endpoint.request(methodId)
        .catch((error: HttpError) => {

          hookSpys.forEach((spy: Spy) => {
            expect(spy).toHaveBeenCalledWith(error);
          });

          done();

          return Observable.of(error);
        })
        .subscribe();
    });

    it('forward the error to any subscribers - ensure the internally caught error is re-thrown', (done: Function) => {

      setUp(mockError);

      endpoint.request(methodId)
        .subscribe(
          () => {},
          (error: HttpError) => {

            expect(error).toBe(mockError);
            done();
          }
        );
    });

    it('does not process the error hooks if no error occurs', (done: Function) => {

      setUp(mockResponse);
      setUpHookSpys();

      endpoint.request(methodId)
        .subscribe(() => {

          hookSpys.forEach((spy: Spy) => {
            expect(spy).not.toHaveBeenCalled();
          });

          done();
        });
    });
  });
});
