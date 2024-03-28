import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../core/database/prisma/prisma.module';
import { TravelNotesModule } from '../travel-notes.module';
import { TravelNotesService } from './travel-notes.service';
import { CreateTravelNoteDto } from '../dtos/req/create-travel-note.dto';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';

describe('TravelsService', () => {

  let travelsService: TravelNotesService;
  let usersService: UsersService;
  let prismaService: PrismaService;
  let user: UserEntity;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, TravelNotesModule, UsersModule],
    }).compile();

    travelsService = app.get<TravelNotesService>(TravelNotesService);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    prismaService.user.create({
      data: {
        email: 'potency_403@test.com',
        name: 'potency_403',
      }
    });
  });

  afterEach(async () => {

  });

  it('should be defined', () => {
    expect(travelsService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(user).toBeDefined();
  });

  describe('여행 기록 생성', () => {
    it('여행 기록을 생성 한다.', async () => {

      const dto: CreateTravelNoteDto  = {
        city: 'Seoul',
        startDate: new Date(2024, 2, 24), // 2024-03-24
        endDate: new Date(2024, 2, 26), // 2024-03-26
        review: 'Good',
        userId: 1,
      }

      const travels = await travelsService.create(dto);
      expect(travels).toBeDefined();
    });
  });

});
