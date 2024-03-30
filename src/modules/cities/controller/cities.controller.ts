import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { CitiesService } from "../service/cities.service";
import { CreateCityDto } from "../dto/create-city.dto";
import { UpdateCityDto } from "../dto/update-city.dto";
import { SearchCityDto } from "../dto/search-city.dto";
import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CityEntity } from "../entities/city.entity";

@ApiTags("City")
@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiExcludeEndpoint()
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @ApiOperation({ summary: "도시 검색" })
  @ApiOkResponse({ type: CityEntity, isArray: true })
  @Get()
  findAll(@Query() query: SearchCityDto) {
    return this.citiesService.findAll(query);
  }

  @ApiExcludeEndpoint()
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(+id, updateCityDto);
  }

  @ApiExcludeEndpoint()
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.citiesService.delete(+id);
  }
}
