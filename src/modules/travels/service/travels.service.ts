import { Inject, Injectable } from '@nestjs/common';
import { TravelsRepository } from '../repositories/travels.interface';
import { CreateTravelDto } from '../dtos/req/create-travel.dto';

@Injectable()
export class TravelsService {

  constructor(
    @Inject(TravelsRepository) private readonly travelsRepository: TravelsRepository,
  ) {
  }

  async createTravel(dto: CreateTravelDto) {
    const newTravel = await this.travelsRepository.createTravel(dto);
    return newTravel;
  }

}