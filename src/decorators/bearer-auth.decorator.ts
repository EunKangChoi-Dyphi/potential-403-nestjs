import { applyDecorators, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { ApiFailureResponse } from "./api-failure-response.decorator";

export const BearerAuth = (guard: any = JwtAuthGuard) => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, "Unauthorized"),
    UseGuards(guard)
  );
};
