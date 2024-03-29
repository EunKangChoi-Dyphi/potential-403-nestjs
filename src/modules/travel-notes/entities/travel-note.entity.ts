import { TravelNote } from '@prisma/client';
import { CreateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/create-travel-note.dto';
import { BadRequestException } from '@nestjs/common';

export class TravelNoteEntity implements TravelNote {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  review: string;
  cityId: number;
  cityName: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  static of(userId: number, dto: CreateTravelNoteDto): TravelNote {
    const travelNote = new TravelNoteEntity();
    travelNote.userId = userId;
    travelNote.title = dto.title;
    travelNote.cityId = dto.cityId;
    travelNote.cityName = dto.cityName;
    travelNote.startDate = dto.startDate.toString();
    travelNote.endDate = dto.endDate.toString();
    travelNote.review = dto.review;
    return travelNote;
  }
}
