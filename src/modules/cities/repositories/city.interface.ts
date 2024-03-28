import { CityEntity } from 'src/modules/cities/entities/city.entity';
import { CreateCityDto } from 'src/modules/cities/dto/create-city.dto';
import { UpdateCityDto } from 'src/modules/cities/dto/update-city.dto';

export interface CityRepository {
  create(dto: CreateCityDto): Promise<CityEntity>;

  findMany(countryCode?: string): Promise<CityEntity[]>;
  delete(id: number): Promise<CityEntity>;
  update(id: number, dto: UpdateCityDto): Promise<CityEntity>;
}

export const CityRepository = Symbol('CityRepository');
