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
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UpdateUserRequestBodyDto } from "../dtos/req/update-user-request-body.dto";
import { SignInUser } from "src/decorators/sign-in-user.decorator";
import { UserEntity } from "../entities/user.entity";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AuthService } from "src/modules/core/auth/services/auth.service";
import { CustomConfigService } from "src/modules/core/config/custom-config.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  SignInOrSignUpAppleRequestBodyDto,
  SignInOrSignUpGoogleRequestBodyDto,
  SignInOrSignUpKakaoRequestBodyDto,
  SignInOrSignUpRequestBodyDto,
} from "../dtos/req/sign-in-sign-up-request-body.dto";
import { BearerAuth } from "src/decorators/bearer-auth.decorator";
import { SocialLoginResponseDto } from "../dtos/res/social-login-response.dto";

@ApiTags("사용자 & 로그인")
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly customConfigService: CustomConfigService,
    private readonly authService: AuthService,
  ) {}

  // 로그인한 회원정보 조회
  @ApiOperation({ summary: "로그인한 회원의 정보 조회" })
  @BearerAuth(JwtAuthGuard)
  @ApiOkResponse({ description: "현재 로그인 유저정보", type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get()
  async myProfile(
    @SignInUser() user: UserEntity, // login required
  ) {
    return await this.usersService.getOneUser(user.id);
  }

  // 회원탈퇴
  @BearerAuth(JwtAuthGuard)
  @ApiOperation({
    summary: "회원탈퇴",
  })
  @ApiOkResponse({ description: "탈퇴한 유저정보", type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async withdrawUser(@SignInUser() user: UserEntity) {
    // 탈퇴처리된 유저는 DB에 해당 데이터로우 삭제
    return await this.usersService.deleteUser(user.id);
  }

  // 로그아웃
  @BearerAuth(JwtAuthGuard)
  @ApiOkResponse({ description: "액세스 토큰 삭제" })
  @UseGuards(JwtAuthGuard)
  @Get("sign-out")
  async signOut(@SignInUser() user: UserEntity) {
    return await this.authService.signOut(user.id);
  }

  // 소셜로그인
  @ApiOperation({
    summary: "카카오 연동 로그인",
  })
  @ApiOkResponse({
    description: "카카오 연동 로그인 유저정보",
    type: SocialLoginResponseDto,
  })
  @Post("sign-in/kakao")
  async signInKakao(@Body() body: SignInOrSignUpKakaoRequestBodyDto) {
    const loginUserInfo = await this.authService.signInKakao(body);
    return loginUserInfo;
  }

  @ApiOperation({
    summary: "애플 연동 로그인",
  })
  @ApiOkResponse({
    description: "애플 연동 로그인 유저정보",
    type: SignInOrSignUpAppleRequestBodyDto,
  })
  @Post("sign-in/apple")
  async signInApple(@Body() body: SignInOrSignUpAppleRequestBodyDto) {
    const loginUserInfo = await this.authService.signInApple(body);
    return loginUserInfo;
  }

  @ApiOperation({
    summary: "구글 연동 로그인",
  })
  @ApiOkResponse({
    description: "구글 연동 로그인 유저정보",
    type: SocialLoginResponseDto,
  })
  @Post("sign-in/google")
  async signInGoogle(@Body() body: SignInOrSignUpGoogleRequestBodyDto) {
    const loginUserInfo = await this.authService.signInGoogle(body);
    return loginUserInfo;
  }

  @ApiTags("로그인 (테스트용)")
  @Post("sign-in/account")
  async signInAccount(@Query("account") account: string) {
    return this.authService.signInAccount(account);
  }

  // 회원정보 수정 - TBD : name / intro / profile 수정
  @ApiConsumes("multipart/form")
  @BearerAuth(JwtAuthGuard)
  @ApiOperation({ summary: "유저정보 수정" })
  @ApiOkResponse({
    description: "유저명 / 프로필이미지 / 소개글 수정",
    type: UserEntity,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiBody({
    description: "유저정보 수정",
    type: UpdateUserRequestBodyDto,
  })
  @Patch("profile")
  async updateUser(
    @SignInUser() user: UserEntity,
    @Body() body: UpdateUserRequestBodyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { name, intro } = body;
    return await this.usersService.updateUser({
      id: user.id,
      name: name,
      intro: intro,
      profileImageFile: file,
    });
  }
}
