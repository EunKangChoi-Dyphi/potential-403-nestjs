import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { PrismaModule } from "../core/database/prisma/prisma.module";
import { CustomConfigModule } from "src/modules/core/config/custom-config.module";
import { AwsS3Module } from "../core/aws-s3/aws-s3.module";

@Module({
  imports: [PrismaModule, CustomConfigModule, AwsS3Module],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
