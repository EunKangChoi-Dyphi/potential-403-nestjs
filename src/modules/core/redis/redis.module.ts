import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomConfigModule } from 'src/modules/core/config/custom-config.module';

// import type { RedisClientOptions } from 'redis';
import { RedisOptions } from 'src/modules/core/redis/constants/redis-option.constant';

@Global()
@Module({
  imports: [CustomConfigModule, CacheModule.registerAsync(RedisOptions)],
  providers: [
    RedisService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheModule, RedisService],
})
export class RedisModule {}
