import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CountriesService } from "../service/countries.service";
import { CreateCountryDto } from "src/modules/conuntries/dtos/create-country.dto";
import { UpdateCountryDto } from "src/modules/conuntries/dtos/update-country.dto";
import { SearchCountryDto } from "../dtos/search-country.dto";
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CountryEntity } from "../entities/country.entity";

@ApiTags("Country")
@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiExcludeEndpoint()
  @Post()
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.create(dto);
  }

  @ApiOperation({
    summary: "국가 검색",
  })
  @ApiOkResponse({ type: CountryEntity, isArray: true })
  @Get()
  findAll(@Query() dto: SearchCountryDto) {
    return this.countriesService.findAll(dto);
  }

  @ApiExcludeEndpoint()
  @Put(":code")
  update(@Param("code") code: string, @Body() dto: UpdateCountryDto) {
    return this.countriesService.update(code, dto);
  }

  @ApiExcludeEndpoint()
  @Delete(":code")
  delete(@Param("code") code: string) {
    return this.countriesService.delete(code);
  }
}
