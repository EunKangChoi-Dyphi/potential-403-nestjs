import { CreateUserDto } from '../dtos/req/create-user.dto';
import { UpdateUserDto } from '../dtos/req/update-user.dto';
import { UserEntity } from '../entities/user.entity';
export interface UsersRepository {
  findUserById(userId: number): Promise<UserEntity>;
  createUser(dto: CreateUserDto): Promise<UserEntity>;
  updateUser(dto: UpdateUserDto): Promise<UserEntity>;
  deleteUser(userId: number): Promise<UserEntity>;
}

export const UsersRepository = Symbol('UsersRepository');
