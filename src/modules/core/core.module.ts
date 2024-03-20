import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { CustomConfigModule } from './config/custom-config.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [PrismaModule, CustomConfigModule, AuthModule, RedisModule],
  exports: [PrismaModule, CustomConfigModule, AuthModule, RedisModule],
})
export class CoreModule {}
