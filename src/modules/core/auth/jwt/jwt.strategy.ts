import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
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
      secretOrKey: 
    });
  }

  async validateUser(payload: any) {
    const user: User | null = await this.prismaService.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }

    return user;
    try {
    } catch (error) {
      throw error;
    }
  }
}
