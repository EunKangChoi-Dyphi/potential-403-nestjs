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
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.createUser(body);
  }

  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.getOneUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    const { name } = body;
    await this.usersService.updateUser({ id: id, name: name });
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }
}
