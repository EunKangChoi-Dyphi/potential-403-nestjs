import { CityRepository } from 'src/modules/cities/repositories/city.interface';
import { Injectable } from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityEntity } from '../entities/city.entity';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';

@Injectable()
export class CityRepositoryImpl implements CityRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(dto: CreateCityDto): Promise<CityEntity> {
    return this.prismaService.city.create({
      data: {
        name: dto.name,
        countryCode: dto.countryCode,
      },
    });
  }

  findMany(countryCode?: string): Promise<CityEntity[]> {
    const where = countryCode ? { countryCode } : {};
    return this.prismaService.city.findMany({ where });
  }

  delete(id: number): Promise<CityEntity> {
    return this.prismaService.city.delete({
      where: { id },
    });
  }
  update(id: number, dto: UpdateCityDto): Promise<CityEntity> {
    return this.prismaService.city.update({
      where: { id },
      data: {
        name: dto.name,
        countryCode: dto.countryCode,
      },
    });
  }
}
