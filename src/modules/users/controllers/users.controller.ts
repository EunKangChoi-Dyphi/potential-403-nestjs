import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserRequestBodyDto } from '../dtos/req/create-user-request-body.dto';
import { SignInUser } from 'src/decorators/sign-in-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SignInOrSignUpRequestBodyDto } from 'src/modules/users/dtos/req/sign-in-sign-up-request-body.dto';
import { AuthService } from 'src/modules/core/auth/services/auth.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // 로그인한 회원정보 조회
  @UseGuards(JwtAuthGuard)
  @Get()
  async getOneUser(
    // @Param('id', ParseIntPipe) id: number,
    @SignInUser() user: UserEntity, // login required
  ) {
    return await this.usersService.getOneUser(user.id);
  }

  // 회원정보 수정
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    // @Param('id', ParseIntPipe) id: number,
    @SignInUser() user: UserEntity,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    const { name } = body;
    return await this.usersService.updateUser({ id: user.id, name: name });
  }

  // 회원탈퇴
  @UseGuards(JwtAuthGuard)
  @Delete()
  async withdrawUser(
    @SignInUser() user: UserEntity,
    // @Param('id', ParseIntPipe) id: number,
  ) {
    // 탈퇴처리된 유저는 DB에 해당 데이터로우 삭제
    return await this.usersService.deleteUser(user.id);
  }

  // 소셜로그인겸 & 회원가입
  @Post('sign-in')
  async signInOrSignUp(@Body() body: SignInOrSignUpRequestBodyDto) {
    const account = await this.authService.validateExternalAccessToken(body);

    // const member =
  }
}
