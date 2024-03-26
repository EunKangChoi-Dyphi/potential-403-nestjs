import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CustomConfigModule } from 'src/modules/core/config/custom-config.module';

// import type { RedisClientOptions } from 'redis';
import { RedisOptions } from 'src/modules/core/redis/constants/redis-option.constant';

@Global()
@Module({
  imports: [CustomConfigModule, CacheModule.registerAsync(RedisOptions)],
  providers: [RedisService],
  exports: [CacheModule, RedisService],
})
export class RedisModule {}
