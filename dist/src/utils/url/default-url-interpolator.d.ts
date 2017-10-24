import { UrlInterpolator } from '../../index';
export declare class DefaultUrlInterpolator implements UrlInterpolator {
    interpolate(url: string, params?: {
        [key: string]: any;
    }): string;
}
