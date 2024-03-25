import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OAuthSocialLoginType } from 'src/modules/core/auth/constants/oauth.constant';

export class SignInOrSignUpRequestBodyDto {
  @ApiProperty({
    description: 'OAuth Access Token',
  })
  @IsString()
  oauthToken: string;

  @ApiProperty({
    description: '소셜/로그인타입 - 카카오: k, 구글: g, 애플: a',
    example: 'k',
    enum: OAuthSocialLoginType,
  })
  loginType: OAuthSocialLoginType;
}
