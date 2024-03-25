import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInOrSignUpRequestBodyDto } from 'src/modules/users/dtos/req/sign-in-sign-up-request-body.dto';
import { OAuthSocialLoginType } from '../constants/oauth.constant';

@Injectable()
export class AuthService {
  async validateExternalAccessToken(dto: SignInOrSignUpRequestBodyDto) {
    try {
      const { oauthToken, loginType } = dto;
      switch (loginType) {
        case OAuthSocialLoginType.Kakao: // k
          console.log('kakao - social login');
          break;
        case OAuthSocialLoginType.Google: // g
          console.log('google - social login');
          break;
        case OAuthSocialLoginType.Apple: // a
          console.log('apple - social login');
          break;
        default:
          throw new BadRequestException('유효하지 않은 로그인 입니다.');
      }
    } catch (e) {
      throw e;
    }
  }
}
