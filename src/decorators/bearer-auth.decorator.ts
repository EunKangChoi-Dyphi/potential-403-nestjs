import { applyDecorators, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { ApiFailureResponse } from "./api-failure-response.decorator";

export const BearerAuth = (guard: any = JwtAuthGuard) => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: "accessToken",
      description: "Trazzle Access Token (Sign-In Required)",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFjY291bnQiOiJrLWNobGRtc3JrZCIsImlhdCI6MTcxMTc5MTU2MCwiZXhwIjoxNzExODc3OTYwfQ.qNeh3LJTjMsNitv8wU76EdqjRzScyQdZfWodm1SPcSM",
    }),
    ApiFailureResponse(HttpStatus.UNAUTHORIZED, "Unauthorized"),
    UseGuards(guard)
  );
};
