import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { firstValueFrom } from "rxjs";
import TrazzleJwtPayload from "src/modules/core/auth/jwt/trazzle-jwt.payload";
import ENV_KEY from "src/modules/core/config/constants/env-config.constant";
import { CustomConfigService } from "src/modules/core/config/custom-config.service";
import { RedisService } from "src/modules/core/redis/redis.service";
import { OAuthSocialLoginType } from "../constants/oauth.constant";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import JwksRsa, { SigningKey } from "jwks-rsa";
import { OAuth2Client, TokenInfo } from "google-auth-library";
import { GOOGLE_OAUTH_CLIENT_TOKEN, JWK_CLIENT_TOKEN } from "../constants/auth.constant";
import { SignInOrSignUpRequestBodyDto } from "src/modules/users/dtos/req/sign-in-sign-up-request-body.dto";
import { PrismaService } from "../../database/prisma/prisma.service";
import { SocialLoginResponseDto } from "src/modules/users/dtos/res/social-login-response.dto";

@Injectable()
export class AuthService {
  private JWT_ACCESS_TOKEN_EXPIRATION_TTL: number;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customConfigService: CustomConfigService,

    @Inject(GOOGLE_OAUTH_CLIENT_TOKEN)
    private readonly googleOAuthClient: OAuth2Client,

    private readonly jwtService: JwtService,

    @Inject(JWK_CLIENT_TOKEN)
    private readonly jwksClient: JwksRsa.JwksClient,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
  ) {
    this.JWT_ACCESS_TOKEN_EXPIRATION_TTL = +this.customConfigService.get(ENV_KEY.JWT_ACCESS_TOKEN_EXPIRATION_TTL);
  }
  async signOut(userId: number) {
    try {
      // access 토큰을 찾아서 삭제한다.
      const key = `user-${userId}`;
      await this.redisService.del(key);
    } catch (e) {
      throw e;
    }
  }

  private async createAccessToken(payload: TrazzleJwtPayload) {
    try {
      const { userId } = payload;

      // 액세스 토큰을 발급한다.
      const accessToken = await this.jwtService.signAsync(payload);

      // redis에 등록
      await this.redisService.set(`user-${userId}`, accessToken, this.JWT_ACCESS_TOKEN_EXPIRATION_TTL);

      return accessToken;
    } catch (e) {
      throw e;
    }
  }

  async signInKakao(dto: SignInOrSignUpRequestBodyDto) {
    const { accessToken } = dto;
    try {
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
        throw new NotFoundException("존재하지 않은 회원입니다.");
      }

      // account 값이 해당되는 유저데이터 로우가 존재하는지 확인한다.
      const { nickname, profile_image } = userInfoKakao.data.properties;
      const { id } = userInfoKakao.data;
      const account = `${OAuthSocialLoginType.Kakao}-${id}`;

      let user = await this.prismaService.user.findFirst({
        where: { account },
      });
      if (!user) {
        // account 값이 해당하는 유저 데이터로우가 존재하지 않음 -> 등록
        user = await this.prismaService.user.create({
          data: {
            account: account,
            name: nickname,
            profileImageURL: profile_image ?? null,
            intro: null,
          },
        });
      }

      // 레디스에 액세스 토큰 등록
      const access_token = await this.createAccessToken({
        userId: user.id,
        account: account,
      });

      return {
        id: user.id,
        name: user.name,
        account: user.account,
        profileImageURL: user.profileImageURL,
        intro: user.intro,
        access_token: access_token,
      };
    } catch (e) {
      throw e;
    }
  }

  async signInGoogle(dto: SignInOrSignUpRequestBodyDto) {
    const { accessToken } = dto;
    try {
      // todo
      const googleToken: TokenInfo = await this.googleOAuthClient.getTokenInfo(accessToken);

      const account = `${OAuthSocialLoginType.Google}-${googleToken.aud}`;

      let user = await this.prismaService.user.findFirst({
        where: { account },
      });
      if (!user) {
        // account 값이 해당하는 유저 데이터로우가 존재하지 않음 -> 등록
        user = await this.prismaService.user.create({
          data: {
            account: account,
            name: `google-user-${googleToken.email}`, // todo
            profileImageURL: null,
            intro: null,
          },
        });
      }

      // 레디스에 액세스 토큰 등록
      const access_token = await this.createAccessToken({
        userId: user.id,
        account: account,
      });

      return {
        id: user.id,
        name: user.name,
        account: user.account,
        profileImageURL: user.profileImageURL,
        intro: user.intro,
        access_token: access_token,
      };
    } catch (e) {
      throw e;
    }
  }

  async signInApple(dto: SignInOrSignUpRequestBodyDto): Promise<SocialLoginResponseDto> {
    const { accessToken } = dto;
    try {
      // jwt 토큰 디코드
      const decodedJWT: Jwt | null = jwt.decode(accessToken, {
        complete: true,
      });

      if (!decodedJWT?.header?.kid) {
        throw new UnauthorizedException("유효하지 않은 토큰입니다.");
      }

      // 공개키
      const applePublicKey: SigningKey = await this.jwksClient.getSigningKey(decodedJWT.header.kid);

      const appleSignedKey: string = applePublicKey.getPublicKey();

      const { payload }: JwtPayload = jwt.verify(accessToken, appleSignedKey, {
        complete: true,
      });

      if (!payload.nonce_supported || payload.iss !== "https://appleid.apple.com") {
        throw new UnauthorizedException("유효하지 않은 토큰입니다.");
      }

      //todo - payload가 무엇인지 확인이 필요...
      const account = `${OAuthSocialLoginType.Apple}-${payload.sub}`;

      let user = await this.prismaService.user.findFirst({
        where: { account },
      });
      if (!user) {
        // account 값이 해당하는 유저 데이터로우가 존재하지 않음 -> 등록
        user = await this.prismaService.user.create({
          data: {
            account: account,
            name: `apple-user-${payload.sub}`, // todo
            profileImageURL: null,
            intro: null,
          },
        });
      }

      // 레디스에 액세스 토큰 등록
      const access_token = await this.createAccessToken({
        userId: user.id,
        account: account,
      });

      return {
        id: user.id,
        name: user.name,
        account: user.account,
        profileImageURL: user.profileImageURL,
        intro: user.intro,
        access_token: access_token,
      };
    } catch (e) {
      throw e;
    }
  }

  async signInAccount(account: string) {
    const user = await this.prismaService.user.findFirst({
      where: { account },
    });

    if (!user) {
      throw new NotFoundException("존재하지 않는 회원입니다.");
    }

    const access_token = await this.createAccessToken({
      userId: user.id,
      account: account,
    });

    return {
      id: user.id,
      name: user.name,
      account: user.account,
      profileImageURL: user.profileImageURL,
      intro: user.intro,
      access_token: access_token,
    };
  }
}
