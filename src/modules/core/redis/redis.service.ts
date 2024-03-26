import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  // ttl 값 단위는 초(s)단위
  // 예를들어 1분 => 60s
  async set<T>(key: string, value: T, ttl?: number) {
    // set(key, value, {ttl: 5 }) =>  ttl: 5s
    // set(key, value, 5) => ttl: 5ms
    await this.cacheManager.set(key, value, { ttl: ttl ?? 1000 } as any);
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }
}
