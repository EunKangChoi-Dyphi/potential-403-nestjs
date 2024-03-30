import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { OAuthSocialLoginType } from "src/modules/core/auth/constants/oauth.constant";

export class SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "OAuth Access Token",
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: "소셜/로그인타입 - 카카오: k, 구글: g, 애플: a",
    example: "k",
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}

export class SignInOrSignUpKakaoRequestBodyDto extends SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "소셜/로그인타입 - 카카오: k",
    example: "k",
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}

export class SignInOrSignUpAppleRequestBodyDto extends SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "소셜/로그인타입 - 애플: a",
    example: "a",
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}

export class SignInOrSignUpGoogleRequestBodyDto extends SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "소셜/로그인타입 - 구글: g",
    example: "g",
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}
