import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException, Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseDto } from 'src/filters/error-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let body: ErrorResponseDto;


    if (typeof exceptionResponse === 'string') {
      body = {
        path: request.url,
        timestamp: new Date().toISOString(),
        error: exceptionResponse,
        statusCode: statusCode,
        message: [exceptionResponse],
      }

      this.logger.error(exceptionResponse, exception.stack);
    } else {
      body = {
        path: request.url,
        timestamp: new Date().toISOString(),
        error: exceptionResponse['error'],
        statusCode: exceptionResponse['statusCode'],
        message: exceptionResponse['message'],
      }

      this.logger.error(exceptionResponse['message'], exception.stack);
    }

    response.status(body.statusCode).json(body);
  }
}
