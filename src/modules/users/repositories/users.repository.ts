import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.interface';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';
import { CreateUserDto } from '../dtos/req/create-user.dto';
import { UpdateUserDto } from '../dtos/req/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.prismaService.user.create({
      data: {
        ...dto,
      },
    });
    return newUser;
  }

  async findOne(where: Prisma.UserWhereInput): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({
      where,
    });

    return user;
  }
  // async findOneByUserId(userId: number): Promise<UserEntity> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   return user;
  // }

  async updateUser(dto: UpdateUserDto): Promise<UserEntity> {
    const data = dto.name ? { name: dto.name } : {};
    const updateUser = await this.prismaService.user.update({
      where: { id: dto.id },
      data: data,
    });
    return updateUser;
  }

  async deleteUser(userId: number): Promise<UserEntity> {
    const deleteUser = await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
    return deleteUser;
  }
}
