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

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // 회원가입 (일반)
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  // 회원정보 조회
  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getOneUser(id);
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
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }

  // 소셜로그인 - 카카오
  @Post('login/kakao')
  async socialLoginKakao() {}
  // 소셜로그인 - 구글
  // 소셜로그인 - 애플
}
