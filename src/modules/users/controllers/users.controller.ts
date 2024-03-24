import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/req/create-user.dto';
import { UpdateUserRequestBodyDto } from '../dtos/req/create-user-request-body.dto';
import { SignInUser } from 'src/decorators/sign-in-user.decorator';
import { UserEntity } from '../entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 로그인한 회원정보 조회
  @Get()
  async getOneUser(
    @Param('id', ParseIntPipe) id: number,
    @SignInUser() user: UserEntity, // login required
  ) {
    return await this.usersService.getOneUser(user.id);
  }

  // 회원정보 수정
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    const { name } = body;
    return await this.usersService.updateUser({ id: id, name: name });
  }

  // 회원탈퇴
  @Delete(':id')
  async withdrawUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }

  // 소셜로그인겸 & 회원가입
  // 소셜로그인 - 카카오
  // 소셜로그인 - 구글
  // 소셜로그인 - 애플
  @Post('sign-in')
  async signInWithSocialOauth() {}
}
