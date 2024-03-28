import { TravelNoteEntity } from '../entities/travel-note.entity';
import { CreateTravelNoteDto } from '../dtos/req/create-travel-note.dto';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';

export interface TravelNotesRepository {
  create(dto: CreateTravelNoteDto): Promise<TravelNoteEntity>;
  findMany(): Promise<TravelNoteEntity[]>;
  delete(id: number): Promise<void>;
  update(id: number, dto: UpdateTravelNoteDto): Promise<TravelNoteEntity>;
}

export const TravelNotesRepository = Symbol('TravelNotesRepository');
