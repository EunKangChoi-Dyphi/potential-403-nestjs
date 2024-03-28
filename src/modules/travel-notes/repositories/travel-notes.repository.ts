import { BadRequestException, Injectable } from '@nestjs/common';
import { TravelNotesRepository } from './travel-notes.interface';
import { CreateTravelNoteDto } from '../dtos/req/create-travel-note.dto';
import { TravelNoteEntity } from '../entities/travel-note.entity';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { convert, ZoneId } from '@js-joda/core';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';

@Injectable()
export class TravelsRepositoryImpl implements TravelNotesRepository {

  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTravelNoteDto): Promise<TravelNoteEntity> {

    const newTravel = await this.prismaService.travelNote.create({
      data: {
        title: dto.title,
        city: dto.city,
        startDate: dto.startDate.toString(),
        endDate: dto.endDate.toString(),
        review: dto.review,
        userId: dto.userId,
      },
    });

    return newTravel;
  }

  async findMany(): Promise<TravelNoteEntity[]> {
      return await this.prismaService.travelNote.findMany();
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.travelNote.delete({
      where: { id }
    });
  }

  async update(id: number, dto: UpdateTravelNoteDto): Promise<TravelNoteEntity> {
    return await this.prismaService.travelNote.update({
      where: { id },
      data: {
        title: dto.title,
        city: dto.city,
        startDate: dto.startDate.toString(),
        endDate: dto.endDate.toString(),
        review: dto.review,
      }
    });
  }

}
