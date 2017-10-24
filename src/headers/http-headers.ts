import {Map} from '@ctx/ts.common';


export interface HttpHeadersConfig {
    [type: string]: string
};


export class HttpHeaders {

    private _map: Map<string, string>;


    constructor(config?: HttpHeadersConfig) {

        this._map = new Map<string, string>();

        if(!config) {
            return;
        }

        this.fromObject(config);
    }

    public set(name: string, value): void {

        if(!value) {
            this._map.delete(name);
            return;
        }

        this._map.set(name, value);
    }

    public get(name: string): string {
        return this._map.get(name);
    }

    public merge(headers:HttpHeaders) :void {

        this.fromObject(headers.toObject());
    }

    public clone(): HttpHeaders {
        return new HttpHeaders(this.toObject());
    }

    public toObject(): HttpHeadersConfig {

        var headers: HttpHeadersConfig = {};

        this._map.forEach((value: string, key: string) => {
            headers[key] = value;
        });

        return headers;
    }

    public fromObject(headers: HttpHeadersConfig): void {

        Object.keys(headers)
            .map((key: string) => {
                this._map.set(key, headers[key]);
            });
    }
}
