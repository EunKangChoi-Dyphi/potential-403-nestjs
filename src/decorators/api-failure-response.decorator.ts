import { applyDecorators } from "@nestjs/common";
import { ErrorHttpStatusCode } from "@nestjs/common/utils/http-error-by-code.util";
import { ApiResponse } from "@nestjs/swagger";
import { timestamp } from "rxjs";

export const ApiFailureResponse = (
  status: ErrorHttpStatusCode,
  errorMessage: string | string[],
) => {
  if (typeof errorMessage === "string") {
    errorMessage = [errorMessage];
  }

  const errors = errorMessage.map(error => {
    return { message: error };
  });

  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        example: {
          status,
          timestamp: "2024-03-30T22:00:00.000Z",
          errors,
        },
      },
    }),
  );
};
