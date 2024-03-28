import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from 'src/modules/core/redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async testRedis(@Body() body: { key: string; value: string }) {
    const { key, value } = body;
    await this.redisService.set(key, value, 60 * 60 * 24);
    return 'OK';
  }
}
