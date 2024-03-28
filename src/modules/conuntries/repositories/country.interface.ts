import { CountryEntity } from 'src/modules/conuntries/entities/country.entity';
import { CreateCountryDto } from 'src/modules/conuntries/dtos/create-country.dto';
import { UpdateCountryDto } from 'src/modules/conuntries/dtos/update-country.dto';

export interface CountryRepository {
  create(dto: CreateCountryDto): Promise<CountryEntity>;
  findMany(): Promise<CountryEntity[]>;
  delete(id: number): Promise<CountryEntity>;
  update(id: number, dto: UpdateCountryDto): Promise<CountryEntity>;
}

export const CountryRepository = Symbol('CountryRepository');
