
import {
  Hook
} from '@ctx/ts.common';

import {
  HttpResponse,
  HttpError
} from '../../index';


export interface HttpResponseHook extends Hook < HttpResponse, HttpResponse | HttpError > { }
