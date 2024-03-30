import { Inject, Injectable } from "@nestjs/common";
import { CreateCountryDto } from "src/modules/conuntries/dtos/create-country.dto";
import { UpdateCountryDto } from "src/modules/conuntries/dtos/update-country.dto";
import { PrismaService } from "src/modules/core/database/prisma/prisma.service";
import { CountryEntity } from "../entities/country.entity";

@Injectable()
export class CountriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateCountryDto): Promise<CountryEntity> {
    return this.prismaService.country.create({
      data: {
        code: dto.code,
        name: dto.name,
        continent: dto.continent,
      },
    });
  }

  findAll(): Promise<CountryEntity[]> {
    return this.prismaService.country.findMany();
  }

  update(code: string, dto: UpdateCountryDto): Promise<CountryEntity> {
    return this.prismaService.country.update({
      where: { code },
      data: {
        code: dto.code,
        name: dto.name,
        continent: dto.continent,
      },
    });
  }

  delete(code: string) {
    return this.prismaService.country.delete({ where: { code } });
  }
}
