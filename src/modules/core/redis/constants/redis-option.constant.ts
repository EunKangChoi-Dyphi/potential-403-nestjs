import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import { CustomConfigModule } from 'src/modules/core/config/custom-config.module';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [CustomConfigModule],
  useFactory: async (customConfigService: CustomConfigService) => {
    const store = await redisStore({
      socket: {
        host: customConfigService.get<string>(ENV_KEY.REDIS_HOST),
        port: customConfigService.get<number>(ENV_KEY.REDIS_PORT),
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [CustomConfigService],
};
