import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModules } from 'src/modules';

@Module({
  imports: [...MainModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
