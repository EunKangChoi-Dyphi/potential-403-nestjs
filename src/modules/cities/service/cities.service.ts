import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityRepository } from 'src/modules/cities/repositories/city.interface';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CityRepository) private readonly cityRepository: CityRepository,
  ) {}
  create(createCityDto: CreateCityDto) {
    return this.cityRepository.create(createCityDto);
  }

  findAll(countryId?: number) {
    return this.cityRepository.findMany(countryId);
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.cityRepository.update(id, updateCityDto);
  }

  delete(id: number) {
    return this.cityRepository.delete(id);
  }
}
