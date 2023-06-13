import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";
import { NotFoundError } from "rxjs";
import { QueryFailedError } from "typeorm";

// 에러 응답 객체
export interface CustomErrorResponse {
  isSuccess: boolean;
  data: null;
  error: CustomError;
}

export interface CustomError {
  name: string | null;
  code: string | null;
  message: string | null;
  timeStamp: Date;
}

export type HttpCustomError = Pick<CustomError, "code" | "message">;

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost) {
    this.logger.error(exception);

    // NotFound 에러가 아닐 경우 에러 로그 출력
    if (!(exception instanceof NotFoundError)) {
      console.error(exception);
    }

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    // 기본 반환 값
    const errorResponse: CustomErrorResponse = {
      isSuccess: false,
      data: null,
      error: {
        name: (exception as Error).name ?? null,
        code: null,
        message: (exception as Error).message ?? null,
        timeStamp: new Date(),
      },
    };

    // 쿼리 에러
    if (exception instanceof QueryFailedError) {
      errorResponse.error.message = exception.message;
      // HTTP 에러
    } else if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse() as HttpCustomError;

      errorResponse.error.code = response["code"] ?? null;
      errorResponse.error.message = response["message"] ?? null;
    }

    httpAdapter.reply(ctx.getResponse<Response>(), errorResponse, httpStatus);
  }
}
