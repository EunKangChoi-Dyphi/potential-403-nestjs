import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ENV_KEY from './constants/env-config.constant';

@Injectable()
export class CustomConfigService {
  private readonly PRODUCTION = 'production'; // 배포
  private readonly DEVELOPMENT = 'development'; //개발 & 테스트

  constructor(
    private readonly configService: ConfigService<typeof ENV_KEY, true>,
  ) {}

  get<T>(key: (typeof ENV_KEY)[keyof typeof ENV_KEY]): T {
    return this.configService.get<T>(key);
  }

  isDevelop(): boolean {
    return this.get<string>(ENV_KEY.NODE_ENV) === this.DEVELOPMENT;
  }

  isProduction(): boolean {
    return this.get<string>(ENV_KEY.NODE_ENV) === this.PRODUCTION;
  }
}
