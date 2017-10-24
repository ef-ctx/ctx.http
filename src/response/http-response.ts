import {HttpRequest} from '../index';


export interface HttpResponse {

    data: any;
    headers: any;
    status: number;
    statusText: string;
    request: HttpRequest
}
