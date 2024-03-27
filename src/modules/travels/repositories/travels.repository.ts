import { Injectable } from '@nestjs/common';
import { TravelsRepository } from './travels.interface';
import { CreateTravelDto } from '../dtos/req/create-travel.dto';
import { TravelEntity } from '../entities/travel.entity';
import { PrismaService } from '../../core/database/prisma/prisma.service';

@Injectable()
export class TravelsRepositoryImpl implements TravelsRepository {

  constructor(private readonly prismaService: PrismaService) {}
  async createTravel(dto: CreateTravelDto): Promise<TravelEntity> {
    const newTravel = await this.prismaService.travel.create({
      data: {
        ...dto,
      },
    });
    return newTravel;
  }


}
