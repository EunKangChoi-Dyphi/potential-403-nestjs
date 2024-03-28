import { Module } from '@nestjs/common';
import { CitiesService } from './service/cities.service';
import { CitiesController } from './controller/cities.controller';
import { PrismaModule } from 'src/modules/core/database/prisma/prisma.module';
import { CityRepositoryImpl } from 'src/modules/cities/repositories/city.repository';
import { CityRepository } from 'src/modules/cities/repositories/city.interface';

@Module({
  imports: [PrismaModule],
  providers: [
    CitiesService,
    {
      provide: CityRepository,
      useClass: CityRepositoryImpl,
    },
  ],
  controllers: [CitiesController],
  exports: [CitiesService],
})
export class CitiesModule {}
