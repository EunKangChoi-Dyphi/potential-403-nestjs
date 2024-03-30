import { Inject, Injectable, Query } from "@nestjs/common";
import { CreateCountryDto } from "src/modules/conuntries/dtos/create-country.dto";
import { UpdateCountryDto } from "src/modules/conuntries/dtos/update-country.dto";
import { PrismaService } from "src/modules/core/database/prisma/prisma.service";
import { CountryEntity } from "../entities/country.entity";
import { SearchCountryDto } from "../dtos/search-country.dto";
import { TAKE_20_PER_PAGE } from "src/commons/constants/pagination.constant";

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

  findAll(dto: SearchCountryDto): Promise<CountryEntity[]> {
    return this.prismaService.country.findMany({
      take: TAKE_20_PER_PAGE,
      skip: 1,
      where: {
        OR: [
          {
            name: {
              contains: dto.name,
            },
          },
          {
            continent: dto.continent,
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
    });
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
