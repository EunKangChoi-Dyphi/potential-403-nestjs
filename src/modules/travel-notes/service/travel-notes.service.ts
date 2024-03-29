import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TravelNotesRepository } from '../repositories/travel-notes.interface';
import { CreateTravelNoteDto } from '../dtos/req/create-travel-note.dto';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';
import { TravelNoteEntity } from 'src/modules/travel-notes/entities/travel-note.entity';

@Injectable()
export class TravelNotesService {
  constructor(
    @Inject(TravelNotesRepository)
    private readonly travelsRepository: TravelNotesRepository,
  ) {}

  async create(userId: number, dto: CreateTravelNoteDto) {
    dto.validate();
    const travelNote = TravelNoteEntity.of(userId, dto);
    return this.travelsRepository.create(travelNote);
  }

  async list(userId: number) {
    return await this.travelsRepository.findMany(userId);
  }

  async delete(userId: number, id: number) {
    await this.findByUserIdOrElseThrow(id, userId);
    return await this.travelsRepository.delete(id);
  }

  async update(userId: number, id: number, dto: UpdateTravelNoteDto) {
    await this.findByUserIdOrElseThrow(id, userId);
    dto.validate();
    if (dto.cityId) {
      dto.cityName = null;
    } else if (dto.cityName) {
      dto.cityId = null;
    }
    return await this.travelsRepository.update(id, dto);
  }

  private async findByUserIdOrElseThrow(id: number, userId: number) {
    const travelNote = await this.travelsRepository.findOne(id);
    if (!travelNote) {
      throw new NotFoundException('존재 하지 않는 여행 일지 입니다.');
    }
    if (travelNote.userId !== userId) {
      throw new ForbiddenException(
        '본인의 여행 일지만 조회/수정/삭제 가능합니다.',
      );
    }
    return travelNote;
  }
}
