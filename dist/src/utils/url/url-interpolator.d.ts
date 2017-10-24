export interface UrlInterpolator {
    interpolate(url: string, params?: {
        [key: string]: any;
    }): string;
}
