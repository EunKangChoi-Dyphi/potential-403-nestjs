import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import JwtPayload from 'src/modules/core/auth/jwt/jwt.payload';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { RedisService } from 'src/modules/core/redis/redis.service';
import { UsersRepository } from 'src/modules/users/repositories/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly customConfigService: CustomConfigService,
    @Inject(UsersRepository) private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
  ) {}
  async signUpNewUser() {
    // 소셜로그인했는데 회원이 존재하지 않으면 회원가입처리
    try {
    } catch (e) {
      throw e;
    }
  }

  private async createAccessToken(payload: JwtPayload) {
    try {
      const { userId } = payload;

      // 액세스 토큰을 발급한다.
      const accessToken = await this.jwtService.signAsync(payload);

      // redis에 등록
      await this.redisService.set(
        `user-${userId}`,
        accessToken,
        +this.customConfigService.get(ENV_KEY.JWT_ACCESS_TOKEN_EXPIRATION_TTL),
      );

      return {
        access_token: accessToken,
      };
    } catch (e) {
      throw e;
    }
  }

  async signInKakao(code: string) {
    try {
      // 받은 코드로 토큰을 요청
      const tokenUrl =
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${this.customConfigService.get(ENV_KEY.KAKAO_CLIENT_ID)}&redirect_url=${this.customConfigService.get(ENV_KEY.KAKAO_CALLBACK_URL)}&code=${code}` as const;
      const tokenHeaders = {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      };

      const kakaoToken = await firstValueFrom(
        this.httpService.post(tokenUrl, '', {
          headers: tokenHeaders,
        }),
      );

      const accessToken = kakaoToken.data.access_token;

      // 받은 토큰으로 회원정보 갖고오기
      const userInfoKakao = await firstValueFrom(
        this.httpService.get(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      // 카카오서버에서의 유저아이디
      // kakao 유저아이디(PK):            userInfoKakao.data.id                             / number
      // kakao 유저닉네임:                userInfoKakao.data.kakao_account.nickname         / string
      // kakao 프로필이미지가 기본프로필여부:  userInfoKakao.data.kakao_account.is_default_image / boolean
      // kakao 프로필이미지:              userInfoKakao.data.kakao_account.profile_image_url / string

      const userId = userInfoKakao.data.id;
      return userId;
    } catch (e) {
      throw e;
    }
  }

  async signInGoogle(code: string) {
    try {
    } catch (e) {
      throw e;
    }
  }

  async signInApple(code: string) {
    try {
    } catch (e) {
      throw e;
    }
  }
}
