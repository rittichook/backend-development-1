/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StatusResponse } from './interceptor.dto';

export interface Response<T> {
  data: T | null;
  statusResponse: StatusResponse;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse<ExpressResponse>();
    return next.handle().pipe(
      map((d) => {
        if (!d || typeof d !== 'object' || Array.isArray(d)) {
          return {
            statusResponse: {
              statusCode: response.statusCode,
              messageCode: '',
            },
            data: d || null,
          };
        }
        const { meta, links, data, items, ...rest } = d;
        return {
          statusResponse: {
            statusCode: response.statusCode,
            messageCode: '',
          },
          data: data || items || rest,
          meta,
          links,
        };
      }),
    );
  }
}
