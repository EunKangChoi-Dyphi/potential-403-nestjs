import { TravelNote } from '@prisma/client';
import { CreateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/create-travel-note.dto';

export class TravelNoteEntity implements TravelNote {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  review: string;
  createdAt: Date;
  updatedAt: Date;
  cityId: number;
  userId: number;

  static of(userId: number, dto: CreateTravelNoteDto): TravelNote {
    const travelNote = new TravelNoteEntity();
    travelNote.userId = userId;
    travelNote.title = dto.title;
    travelNote.cityId = dto.cityId;
    travelNote.startDate = dto.startDate.toString();
    travelNote.endDate = dto.endDate.toString();
    travelNote.review = dto.review;
    return travelNote;
  }
}
