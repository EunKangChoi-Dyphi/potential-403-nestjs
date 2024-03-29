import { Injectable } from '@nestjs/common';
import { TravelNotesRepository } from './travel-notes.interface';
import { TravelNoteEntity } from '../entities/travel-note.entity';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';

@Injectable()
export class TravelsRepositoryImpl implements TravelNotesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(id: number): Promise<TravelNoteEntity> {
    return this.prismaService.travelNote.findFirst({ where: { id } });
  }

  async create(entity: TravelNoteEntity): Promise<TravelNoteEntity> {
    return this.prismaService.travelNote.create({
      data: entity,
    });
  }

  async findMany(userId: number): Promise<TravelNoteEntity[]> {
    return await this.prismaService.travelNote.findMany({
      where: { userId },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.travelNote.delete({
      where: { id },
    });
  }

  async update(
    id: number,
    dto: UpdateTravelNoteDto,
  ): Promise<TravelNoteEntity> {
    return this.prismaService.travelNote.update({
      where: { id },
      data: {
        cityId: dto.cityId,
        cityName: dto.cityName,
        title: dto.title,
        startDate: dto.startDate.toString(),
        endDate: dto.endDate.toString(),
        review: dto.review,
      },
    });
  }
}
