import { RouterModule } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from '../core/database/prisma/prisma.module';
import { UserProfilesController } from './controllers/user-profiles.controller';
import { UserProfileService } from './services/user-profiles.service';

@Module({
  imports: [PrismaModule, RouterModule.register([{ path: 'api/users' }])],
  providers: [UsersService, UserProfileService],
  controllers: [UsersController, UserProfilesController],
  exports: [UsersService],
})
export class UsersModule {}
