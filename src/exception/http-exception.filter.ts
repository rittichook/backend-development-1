/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface ExceptionContext {
  statusCode: number;
  message: number | string;
  error: string;
  validateMessage?: object;
}

// interface ExceptionResponse

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    let exceptionResponse = exception.getResponse() as ExceptionContext;
    if (typeof exceptionResponse === 'string') {
      exceptionResponse = JSON.parse(exceptionResponse);
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseMessage = {
      statusCode: status,
      messageCode: exceptionResponse.error ? exceptionResponse.message : '',
    };

    if (exceptionResponse?.validateMessage) responseMessage['validationMessage'] = exceptionResponse.validateMessage;

    response.status(status).json(responseMessage);
  }
}
