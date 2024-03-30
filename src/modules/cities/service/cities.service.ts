import { Inject, Injectable } from "@nestjs/common";
import { CreateCityDto } from "../dto/create-city.dto";
import { UpdateCityDto } from "../dto/update-city.dto";
import { SearchCityDto } from "../dto/search-city.dto";
import { PrismaService } from "src/modules/core/database/prisma/prisma.service";
import { TAKE_20_PER_PAGE } from "src/commons/constants/pagination.constant";

@Injectable()
export class CitiesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCityDto: CreateCityDto) {
    return this.prismaService.city.create({
      data: {
        name: createCityDto.name,
        countryCode: createCityDto.countryCode,
      },
    });
  }

  findAll(searchCityDto: SearchCityDto) {
    return this.prismaService.city.findMany({
      take: TAKE_20_PER_PAGE,
      skip: 1,
      where: {
        AND: [
          {
            name: {
              contains: searchCityDto.name,
            },
          },
          {
            countryCode: searchCityDto.countryCode,
          },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.prismaService.city.update({
      where: { id },
      data: {
        ...updateCityDto,
      },
    });
  }

  delete(id: number) {
    return this.prismaService.city.delete({
      where: { id },
    });
  }
}
