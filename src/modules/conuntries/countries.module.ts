import { Module } from "@nestjs/common";
import { CountriesService } from "./service/countries.service";
import { CountriesController } from "./controller/countries.controller";
import { PrismaModule } from "src/modules/core/database/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
