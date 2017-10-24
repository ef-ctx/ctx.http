
import { HttpHook } from '../index';
import { Dictionary } from '@ctx/ts.common';

export class HttpHooks {

    private _hooks: Dictionary<HttpHook>;

    constructor() {
        this._hooks = new Dictionary<HttpHook>();
    }

    add(key:string, hook: HttpHook): HttpHook {
        this._hooks.addItem(key, hook);
        return hook;
    }

    getByKey(key:string): HttpHook {
        return this._hooks.getByKey(key);
    }

    getByKeys(keys:string[]): Dictionary<HttpHook> {
        return this._hooks.getByKeys(keys);
    }

    getArrayByKeys(keys:string[]): HttpHook[]{
        return this._hooks.getArrayByKeys(keys);
    }

    toArray(): HttpHook[] {
        return this._hooks.toArray();
    }

}
