import {UrlInterpolator} from '../../index';


export class DefaultUrlInterpolator implements UrlInterpolator {

    public interpolate(url: string, params: {[key: string]: any} = {}): string {

        return url.replace(/\/:(\w+)/g, (match, key: string) => {

            if(!!params[key]) {

                match = match.replace(`/:${key}`, '/' + params[key]);

            } else {

                throw new Error(`Cannot compile url "${url}" parameter "${key}" is missing.`);
            }

            return match;
        });
    }
}
