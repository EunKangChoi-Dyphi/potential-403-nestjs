import { Module } from '@nestjs/common';
import { PrismaModule } from '../core/database/prisma/prisma.module';
import { TravelsController } from './controller/travels.controller';
import { TravelsService } from './service/travels.service';
import { TravelsRepository } from './repositories/travels.interface';
import { TravelsRepositoryImpl } from './repositories/travels.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    TravelsService,
    {
      provide: TravelsRepository,
      useClass: TravelsRepositoryImpl,
    }
  ],
  controllers: [TravelsController],
  exports: [TravelsService],
})
export class TravelsModule {}
