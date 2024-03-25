import { Injectable } from '@nestjs/common';
import { SignInOrSignUpRequestBodyDto } from 'src/modules/users/dtos/req/sign-in-sign-up-request-body.dto';

@Injectable()
export class AuthService {
  async validateExternalAccessToken(dto: SignInOrSignUpRequestBodyDto) {
    try {
      const { oauthToken, loginType } = dto;
      console.log(oauthToken, loginType);
      return;
    } catch (e) {
      throw e;
    }
  }
}
