import { Module } from '@nestjs/common';
import { PrismaModule } from '../core/database/prisma/prisma.module';
import { TravelNotesController } from './controller/travel-notes.controller';
import { TravelNotesService } from './service/travel-notes.service';
import { AwsS3Module } from 'src/modules/core/aws-s3/aws-s3.module';

@Module({
  imports: [PrismaModule, AwsS3Module],
  providers: [
    TravelNotesService,
  ],
  controllers: [TravelNotesController],
  exports: [TravelNotesService],
})
export class TravelNotesModule {}
