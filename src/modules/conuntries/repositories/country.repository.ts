import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';
import { CreateCountryDto } from 'src/modules/conuntries/dtos/create-country.dto';
import { CountryRepository } from 'src/modules/conuntries/repositories/country.interface';

import { UpdateCountryDto } from 'src/modules/conuntries/dtos/update-country.dto';
import { CountryEntity } from 'src/modules/conuntries/entities/country.entity';

@Injectable()
export class CountryRepositoryImpl implements CountryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCountryDto): Promise<CountryEntity> {
    return this.prismaService.country.create({
      data: {
        name: dto.name,
        continent: dto.continent,
      },
    });
  }

  async findMany(): Promise<CountryEntity[]> {
    return this.prismaService.country.findMany();
  }

  async delete(id: number): Promise<CountryEntity> {
    return this.prismaService.country.delete({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateCountryDto): Promise<CountryEntity> {
    return this.prismaService.country.update({
      where: { id },
      data: {
        name: dto.name,
        continent: dto.continent,
      },
    });
  }
}
