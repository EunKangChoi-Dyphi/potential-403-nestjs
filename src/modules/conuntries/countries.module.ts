import { Module } from '@nestjs/common';
import { CountriesService } from './service/countries.service';
import { CountriesController } from './controller/countries.controller';
import { PrismaModule } from 'src/modules/core/database/prisma/prisma.module';
import { CountryRepository } from 'src/modules/conuntries/repositories/country.interface';
import { CountryRepositoryImpl } from 'src/modules/conuntries/repositories/country.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    CountriesService,
    {
      provide: CountryRepository,
      useClass: CountryRepositoryImpl,
    },
  ],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
