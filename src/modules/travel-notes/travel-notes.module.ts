import { Module } from '@nestjs/common';
import { PrismaModule } from '../core/database/prisma/prisma.module';
import { TravelNotesController } from './controller/travel-notes.controller';
import { TravelNotesService } from './service/travel-notes.service';
import { TravelNotesRepository } from './repositories/travel-notes.interface';
import { TravelsRepositoryImpl } from './repositories/travel-notes.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    TravelNotesService,
    {
      provide: TravelNotesRepository,
      useClass: TravelsRepositoryImpl,
    }
  ],
  controllers: [TravelNotesController],
  exports: [TravelNotesService],
})
export class TravelNotesModule {}
