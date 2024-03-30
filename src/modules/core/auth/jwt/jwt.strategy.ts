import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import ENV_KEY from "src/modules/core/config/constants/env-config.constant";
import { CustomConfigService } from "src/modules/core/config/custom-config.service";
import { PrismaService } from "src/modules/core/database/prisma/prisma.service";
import { RedisService } from "src/modules/core/redis/redis.service";
import JwtPayload from "./trazzle-jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly customConfigService: CustomConfigService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: customConfigService.get<string>(ENV_KEY.JWT_SECRET_KEY),
    });
  }

  async validate(payload: JwtPayload) {
    const { userId, account } = payload;
    try {
      // redis에 토큰이 존재하여 캐시히트인지 확인
      const tokenFromRedis = await this.redisService.get(`user-${userId}`);

      if (!tokenFromRedis) {
        throw new UnauthorizedException("토큰이 만료하였습니다.");
      }

      const user: User | null = await this.prismaService.user.findFirst({
        where: {
          OR: [{ id: userId }, { account: account }],
        },
      });

      if (!user) {
        throw new NotFoundException("존재하지 않은 유저입니다.");
      }

      return user;
    } catch (e) {
      throw e;
    }
  }
}
