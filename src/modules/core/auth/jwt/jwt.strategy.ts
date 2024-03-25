import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly customConfigService: CustomConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: customConfigService.get<string>(ENV_KEY.JWT_SECRET_KEY),
    });
  }

  async validateUser(payload: any) {
    try {
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
