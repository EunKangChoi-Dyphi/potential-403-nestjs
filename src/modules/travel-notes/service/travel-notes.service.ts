import { Inject, Injectable } from '@nestjs/common';
import { TravelNotesRepository } from '../repositories/travel-notes.interface';
import { CreateTravelNoteDto } from '../dtos/req/create-travel-note.dto';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';
import { binary } from 'joi';

@Injectable()
export class TravelNotesService {

  constructor(
    @Inject(TravelNotesRepository) private readonly travelsRepository: TravelNotesRepository,
  ) {
  }

  async create(dto: CreateTravelNoteDto) {
    dto.validate();
    const newTravel = await this.travelsRepository.create(dto);
    return newTravel;
  }

  async list() {
    return await this.travelsRepository.findMany();
  }

  async delete(id: number) {
    return await this.travelsRepository.delete(id);
  }

  async update(id: number, dto: UpdateTravelNoteDto) {
    dto.validate();
    return await this.travelsRepository.update(id, dto);
  }
}