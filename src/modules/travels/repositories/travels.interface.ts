import { TravelEntity } from '../entities/travel.entity';
import { CreateTravelDto } from '../dtos/req/create-travel.dto';

export interface TravelsRepository {
  createTravel(dto: CreateTravelDto): Promise<TravelEntity>;
}

export const TravelsRepository = Symbol('TravelsRepository');
