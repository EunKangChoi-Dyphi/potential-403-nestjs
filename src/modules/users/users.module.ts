import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from '../core/database/prisma/prisma.module';
import { UserProfilesController } from './controllers/user-profiles.controller';
import { UserProfileService } from './services/user-profiles.service';
import { UsersRepository } from './repositories/users.interface';
import { UsersRepositoryImpl } from './repositories/users.repository';
import { CustomConfigModule } from 'src/modules/core/config/custom-config.module';

@Module({
  imports: [PrismaModule, CustomConfigModule],
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
