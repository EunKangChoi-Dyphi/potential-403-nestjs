import { Inject, Injectable } from '@nestjs/common';
import { CreateCountryDto } from 'src/modules/conuntries/dtos/create-country.dto';
import { UpdateCountryDto } from 'src/modules/conuntries/dtos/update-country.dto';
import { CountryRepository } from 'src/modules/conuntries/repositories/country.interface';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(CountryRepository)
    private readonly countryRepository: CountryRepository,
  ) {}

  create(dto: CreateCountryDto) {
    return this.countryRepository.create(dto);
  }

  findAll() {
    return this.countryRepository.findMany();
  }

  update(code: string, dto: UpdateCountryDto) {
    return this.countryRepository.update(code, dto);
  }

  delete(code: string) {
    return this.countryRepository.delete(code);
  }
}
