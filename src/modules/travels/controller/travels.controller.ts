import { Body, Controller, Post } from '@nestjs/common';
import { TravelsService } from 'src/modules/travels/service/travels.service';
import { CreateTravelDto } from 'src/modules/travels/dtos/req/create-travel.dto';

@Controller()
export class TravelsController{

  constructor(private readonly travelsService: TravelsService) {}

  @Post()
  async createTravel(@Body() body: CreateTravelDto) {
    return await this.travelsService.createTravel(body);
  }

}