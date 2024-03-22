import { RouterModule } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from '../core/database/prisma/prisma.module';
import { UserProfilesController } from './controllers/user-profiles.controller';
import { UserProfileService } from './services/user-profiles.service';
import { UsersRepository } from './repositories/users.interface';
import { UsersRepositoryImpl } from './repositories/users.repository';

@Module({
  imports: [PrismaModule, RouterModule.register([{ path: 'api/users' }])],
  providers: [
    UsersService,
    UserProfileService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
  ],
  controllers: [UsersController, UserProfilesController],
  exports: [UsersService],
})
export class UsersModule {}
