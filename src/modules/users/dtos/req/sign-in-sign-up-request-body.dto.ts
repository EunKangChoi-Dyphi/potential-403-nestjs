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
    required: true,
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}

export class SignInOrSignUpKakaoRequestBodyDto extends SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "OAuth Access Token",
    required: true,
    example: "{{카카오 액세스토큰}}",
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: "소셜/로그인타입 - 카카오: k",
    required: true,
    example: "k",
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}

export class SignInOrSignUpAppleRequestBodyDto extends SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "OAuth Access Token",
    required: true,
    example: "{{애플 액세스토큰}}",
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: "소셜/로그인타입 - 애플: a",
    example: "a",
    required: true,
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}

export class SignInOrSignUpGoogleRequestBodyDto extends SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: "OAuth Access Token",
    example: "{{구글 액세스토큰}}",
    required: true,
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: "소셜/로그인타입 - 구글: g",
    example: "g",
    required: true,
    enum: OAuthSocialLoginType,
  })
  oauthProvider: OAuthSocialLoginType;
}
