import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigService } from './custom-config.service';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        SERVER_PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
  ],
  providers: [CustomConfigService],
  exports: [ConfigModule, CustomConfigService],
})
export class CustomConfigModule {}
