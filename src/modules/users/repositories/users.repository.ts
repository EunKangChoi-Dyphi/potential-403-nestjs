import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.interface';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
}
