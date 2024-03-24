import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@nestjs/axios';
import { CustomConfigModule } from '../config/custom-config.module';

@Module({
  imports: [HttpModule, CustomConfigModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
