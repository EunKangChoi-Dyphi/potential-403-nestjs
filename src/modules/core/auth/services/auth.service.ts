import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import JwtPayload from 'src/modules/core/auth/jwt/jwt.payload';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { RedisService } from 'src/modules/core/redis/redis.service';
import { UsersRepository } from 'src/modules/users/repositories/users.interface';
import { OAuthSocialLoginType } from '../constants/oauth.constant';

@Injectable()
export class AuthService {
  private JWT_ACCESS_TOKEN_EXPIRATION_TTL: number;
  constructor(
    private readonly customConfigService: CustomConfigService,
    @Inject(UsersRepository) private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
  ) {
    this.JWT_ACCESS_TOKEN_EXPIRATION_TTL = +this.customConfigService.get(
      ENV_KEY.JWT_ACCESS_TOKEN_EXPIRATION_TTL,
    );
  }
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
        this.JWT_ACCESS_TOKEN_EXPIRATION_TTL,
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

      if (
        !userInfoKakao ||
        !userInfoKakao.data ||
        !userInfoKakao.data.kakao_account ||
        !userInfoKakao.data.properties
      ) {
        throw new NotFoundException('존재하지 않은 회원입니다.');
      }

      // account 값이 해당되는 유저데이터 로우가 존재하는지 확인한다.
      const { nickname, profile_image } = userInfoKakao.data.properties;
      const { id } = userInfoKakao.data;
      const account = `${OAuthSocialLoginType.Kakao}-${id}`;

      let user = await this.userRepository.findOne({ account: account });
      if (!user) {
        // account 값이 해당하는 유저 데이터로우가 존재하지 않음 -> 등록
        user = await this.userRepository.createUser({
          account: account,
          name: nickname,
          profileImageURL: profile_image ?? null,
          intro: null,
        });
      }

      // 레디스에 액세스 토큰 등록
      const access_token = await this.createAccessToken({
        userId: user.id,
        account: account,
      });

      return access_token;
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
