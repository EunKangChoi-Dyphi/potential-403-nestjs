import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CountriesService } from '../service/countries.service';
import { CreateCountryDto } from 'src/modules/conuntries/dtos/create-country.dto';
import { UpdateCountryDto } from 'src/modules/conuntries/dtos/update-country.dto';

@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() dto: UpdateCountryDto) {
    return this.countriesService.update(code, dto);
  }

  @Delete(':code')
  delete(@Param('code') code: string) {
    return this.countriesService.delete(code);
  }
}
