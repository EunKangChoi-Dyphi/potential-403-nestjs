import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserRequestBodyDto } from '../dtos/req/update-user-request-body.dto';
import { SignInUser } from 'src/decorators/sign-in-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/core/auth/services/auth.service';
import { CustomConfigService } from 'src/modules/core/config/custom-config.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignInOrSignUpRequestBodyDto } from '../dtos/req/sign-in-sign-up-request-body.dto';

@ApiTags('사용자 & 로그인')
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly customConfigService: CustomConfigService,
    private readonly authService: AuthService,
  ) {}

  // 로그인한 회원정보 조회
  @ApiOperation({ summary: '로그인한 회원의 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async myProfile(
    @SignInUser() user: UserEntity, // login required
  ) {
    return await this.usersService.getOneUser(user.id);
  }

  // TODO
  // 회원정보 수정 - TBD : name / intro / profile 수정
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '유저정보 수정',
    type: UpdateUserRequestBodyDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch()
  async updateUser(
    @SignInUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    const { name } = body;
    return await this.usersService.updateUser({
      id: user.id,
      name: name,
      // profileImage: file,
    });
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
  @Post('sign-in/kakao')
  async signInKakao(@Body() body: SignInOrSignUpRequestBodyDto) {
    const access_token = await this.authService.signInKakao(body);
    return access_token;
  }

  @Post('sign-in/apple')
  async signInApple(@Body() body: SignInOrSignUpRequestBodyDto) {
    const access_token = await this.authService.signInApple(body);
    return access_token;
  }

  @Post('sign-in/google')
  async signInGoogle(@Body() body: SignInOrSignUpRequestBodyDto) {
    const access_token = await this.authService.signInGoogle(body);
    return access_token;
  }

  @ApiTags('로그인 (테스트용)')
  @Post('sign-in/account')
  async signInAccount(@Query('account') account: string) {
    return this.authService.signInAccount(account);
  }
}
