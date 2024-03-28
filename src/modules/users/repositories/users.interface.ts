import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../dtos/req/create-user.dto';
import { UpdateUserDto } from '../dtos/req/update-user.dto';
import { UserEntity } from '../entities/user.entity';
export interface UsersRepository {
  findOne(where: Prisma.UserWhereInput): Promise<UserEntity | null>;
  // findOneByUserId(userId: number): Promise<UserEntity>;
  createUser(dto: CreateUserDto): Promise<UserEntity>;
  updateUser(dto: UpdateUserDto): Promise<UserEntity>;
  deleteUser(userId: number): Promise<UserEntity>;
}

export const UsersRepository = Symbol('UsersRepository');
