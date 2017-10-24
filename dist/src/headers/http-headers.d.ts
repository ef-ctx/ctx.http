export interface HttpHeadersConfig {
    [type: string]: string;
}
export declare class HttpHeaders {
    private _map;
    constructor(config?: HttpHeadersConfig);
    set(name: string, value: any): void;
    get(name: string): string;
    merge(headers: HttpHeaders): void;
    clone(): HttpHeaders;
    toObject(): HttpHeadersConfig;
    fromObject(headers: HttpHeadersConfig): void;
}
