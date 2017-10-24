import {HttpHeaders, HttpHeadersConfig} from '../index';


describe('HttpHeaders', () => {

    var headersConfig: HttpHeadersConfig = {
            value1: 'value1',
            value2: 'value2',
            value3: 'value3',
        },
        headers: HttpHeaders;

    beforeEach(() => {

        headers = new HttpHeaders(headersConfig);
    });

    describe('constructor', () => {

        it('sets values from config object', () => {

            expect(headers.get('value1')).toEqual('value1');
            expect(headers.get('value2')).toEqual('value2');
            expect(headers.get('value3')).toEqual('value3');
        });
    });

    describe('set', () => {

        it('sets the value', () => {

            headers.set('value4', 'value4');

            expect(headers.get('value4')).toEqual('value4');
        });

        it('overwrites any previously set value with the new value', () => {

            expect(headers.get('value3')).toEqual('value3');

            headers.set('value3', 'newValue3');

            expect(headers.get('value3')).toEqual('newValue3');
        });
    });

    describe('get', () => {

        it('retrieve the previously set header value', () => {

            expect(headers.get('value1')).toEqual('value1');
        });

        it('returns undefined if the header value has not been set', () => {

            expect(headers.get('notSet')).toBeUndefined();
        });
    });

    describe('merge', () => {

        it('merge the supplied HttpHeaders instance', () => {

            headers.merge(new HttpHeaders({
                value4: 'value4'
            }));

            expect(headers.get('value4')).toEqual('value4');
        });

        it('overwrites any existing values with those of the merged HttpHeaders instance', () => {

            headers.merge(new HttpHeaders({
                value1: 'mergedValue1'
            }));

            expect(headers.get('value1')).toEqual('mergedValue1');
        });
    });

    describe('clone', () => {

        it('returns a copy of the header instance', () => {

            var clone: HttpHeaders = headers.clone();

            expect(clone).not.toBe(headers);
            expect(clone.get('value1')).toEqual('value1');
            expect(clone.get('value2')).toEqual('value2');
            expect(clone.get('value3')).toEqual('value3');
        });
    });

    describe('toObject', () => {

        it('returns an HttpHeadersConfig representation of the HttpHeaders instance', () => {

            expect(headers.toObject()).toEqual(headersConfig);
        });
    });

    describe('fromObject', () => {

        it('merge an HttpHeadersConfig into the HttpHeaders instance', () => {

            headers.fromObject({
                value4: 'mergedValue4'
            });

            expect(headers.get('value4')).toEqual('mergedValue4');
        });
    });
});
