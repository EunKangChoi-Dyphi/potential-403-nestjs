import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [PrismaModule, ConfigModule, AuthModule],
  exports: [PrismaModule, ConfigModule, AuthModule],
})
export class CoreModule {}
