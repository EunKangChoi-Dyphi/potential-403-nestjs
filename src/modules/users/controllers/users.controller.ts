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
  Header,
  Res,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserRequestBodyDto } from '../dtos/req/create-user-request-body.dto';
import { SignInUser } from 'src/decorators/sign-in-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/core/auth/services/auth.service';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import { Request, Response } from 'express';
import ENV_KEY from 'src/modules/core/config/constants/env-config.constant';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly customConfigService: CustomConfigService,
    private readonly authService: AuthService,
  ) {}

  // 로그인한 회원정보 조회
  @UseGuards(JwtAuthGuard)
  @Get()
  async getOneUser(
    @SignInUser() user: UserEntity, // login required
  ) {
    return await this.usersService.getOneUser(user.id);
  }

  // 회원정보 수정
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @SignInUser() user: UserEntity,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    const { name } = body;
    return await this.usersService.updateUser({ id: user.id, name: name });
  }

  // 회원탈퇴
  @UseGuards(JwtAuthGuard)
  @Delete()
  async withdrawUser(@SignInUser() user: UserEntity) {
    // 탈퇴처리된 유저는 DB에 해당 데이터로우 삭제
    return await this.usersService.deleteUser(user.id);
  }

  // 로그아웃
  @UseGuards(JwtAuthGuard)
  @Get('sign-out')
  async signOut(@SignInUser() user: UserEntity) {
    return await this.authService.signOut(user.id);
  }

  // 소셜로그인
  // For web application
  // @Get('sign-in/kakao')
  // @Header('Content-Type', 'text/html')
  // async signInKakao(@Res() res: Response) {
  //   // 카카오 로그인 페이지로 이동
  //   // 동의화면
  //   const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.customConfigService.get(ENV_KEY.KAKAO_CLIENT_ID)}&redirect_uri=${this.customConfigService.get(ENV_KEY.KAKAO_CALLBACK_URL)}`;
  //   res.redirect(url);
  // }

  // @ApiExcludeEndpoint()
  // @Get('sign-in/kakao/callback')
  // async signInKakaoCallback(@Query('code') code: string) {
  //   const access_token = await this.authService.signInKakao(code);
  //   return access_token;
  // }
  @Get('sign-in/kakao')
  async signInKakao(oauthToken: string) {
    const access_token = await this.authService.signInKakao(oauthToken);
    return access_token;
  }

  @Get('sign-in/apple')
  async signInApple(oauthToken: string) {
    const access_token = await this.authService.signInApple(oauthToken);
    return access_token;
  }

  @Get('sign-in/google')
  async signInGoogle(oauthToken: string) {
    const access_token = await this.authService.signInGoogle(oauthToken);
    return access_token;
  }
}
