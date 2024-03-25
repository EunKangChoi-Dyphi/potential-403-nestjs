import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@nestjs/axios';
import { CustomConfigModule } from '../config/custom-config.module';
import { AuthHelper } from 'src/modules/core/auth/helpers/auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';
import { JwtStrategy } from 'src/modules/core/auth/jwt/jwt.strategy';
import { OAuth2Client } from 'google-auth-library';
import jwksClient from 'jwks-rsa';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import {
  GOOGLE_OAUTH_CLIENT_TOKEN,
  JWK_CLIENT_TOKEN,
} from 'src/modules/core/auth/constants/auth.constant';

@Module({
  imports: [
    HttpModule,
    CustomConfigModule,
    JwtModule.registerAsync({
      inject: [CustomConfigService],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          secret: customConfigService.get<string>(ENV_KEY.JWT_SECRET_KEY),
          signOptions: {
            expiresIn: customConfigService.get<string>(
              ENV_KEY.JWT_ACCESS_TOKEN_EXPIRATION,
            ),
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    AuthHelper,
    JwtStrategy,
    PrismaService,
    {
      provide: GOOGLE_OAUTH_CLIENT_TOKEN,
      useClass: OAuth2Client,
    },
    {
      provide: JWK_CLIENT_TOKEN,
      useValue: jwksClient({
        jwksUri: 'https://appleid.apple.com/auth/keys',
      }),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
