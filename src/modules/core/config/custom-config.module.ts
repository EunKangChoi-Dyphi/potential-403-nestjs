import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CustomConfigService } from "./custom-config.service";
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".production.env", ".env"],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default("development"),
        SERVER_PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TTL: Joi.number().default(86400),
        KAKAO_CLIENT_ID: Joi.string().required(),
        KAKAO_SECRET_KEY: Joi.string().required(),
        KAKAO_CALLBACK_URL: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
      }),
    }),
  ],
  providers: [CustomConfigService],
  exports: [ConfigModule, CustomConfigService],
})
export class CustomConfigModule {}
