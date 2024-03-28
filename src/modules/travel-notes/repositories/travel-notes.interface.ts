import { TravelNoteEntity } from '../entities/travel-note.entity';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';

export interface TravelNotesRepository {
  create(dto: TravelNoteEntity): Promise<TravelNoteEntity>;
  findMany(userId: number): Promise<TravelNoteEntity[]>;
  findOne(id: number): Promise<TravelNoteEntity>;
  delete(id: number): Promise<void>;
  update(id: number, dto: UpdateTravelNoteDto): Promise<TravelNoteEntity>;
}

export const TravelNotesRepository = Symbol('TravelNotesRepository');
