import { HttpHook } from '../index';
import { Dictionary } from '@ctx/ts.common';
export declare class HttpHooks {
    private _hooks;
    constructor();
    add(key: string, hook: HttpHook): HttpHook;
    getByKey(key: string): HttpHook;
    getByKeys(keys: string[]): Dictionary<HttpHook>;
    getArrayByKeys(keys: string[]): HttpHook[];
    toArray(): HttpHook[];
}
