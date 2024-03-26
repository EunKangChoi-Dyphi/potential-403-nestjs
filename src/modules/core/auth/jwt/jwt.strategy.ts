import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';
import { RedisService } from 'src/modules/core/redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly customConfigService: CustomConfigService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: customConfigService.get<string>(ENV_KEY.JWT_SECRET_KEY),
    });
  }

  async validateUser(payload: any) {
    try {
      // redis에 토큰이 존재하여 캐시히트인지 확인
      const token = await this.redisService.get('');

      // redis에 없으면 DB에 조회
      const user: User | null = await this.prismaService.user.findFirst({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw new UnauthorizedException('로그인에 실패하였습니다.');
      }

      return user;
    } catch (e) {
      throw e;
    }
  }
}
