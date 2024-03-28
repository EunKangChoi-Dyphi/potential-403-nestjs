import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.interface';
import { CreateUserDto } from '../dtos/req/create-user.dto';
import { UpdateUserDto } from '../dtos/req/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly userRepository: UsersRepository,
  ) {}

  /**
   * @param userId
   */
  async getOneUser(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });
    return user;
  }

  /**
   * @param email
   * @param name
   */
  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.createUser(dto);
    return newUser;
  }

  /**
   * @param userId
   * @param name
   */
  async updateUser(dto: UpdateUserDto) {
    const updatedUser = await this.userRepository.updateUser(dto);
    return updatedUser;
  }

  /**
   * @param userId
   */
  async deleteUser(userId: number) {
    const deletedUser = await this.userRepository.deleteUser(userId);
    return deletedUser;
  }
}
