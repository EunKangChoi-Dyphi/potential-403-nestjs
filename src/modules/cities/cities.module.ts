import { Module } from "@nestjs/common";
import { CitiesService } from "./service/cities.service";
import { CitiesController } from "./controller/cities.controller";
import { PrismaModule } from "src/modules/core/database/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CitiesService],
  controllers: [CitiesController],
  exports: [CitiesService],
})
export class CitiesModule {}
