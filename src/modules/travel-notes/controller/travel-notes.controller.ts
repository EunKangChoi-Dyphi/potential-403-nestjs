import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/create-travel-note.dto';
import { TravelNotesService } from 'src/modules/travel-notes/service/travel-notes.service';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';
import { SignInUser } from 'src/decorators/sign-in-user.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOkResponse, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TravelNoteEntity } from "../entities/travel-note.entity";
import { BearerAuth } from "src/decorators/bearer-auth.decorator";

@BearerAuth()
@ApiTags("여행일지")
@UseGuards(JwtAuthGuard)
@Controller()
export class TravelNotesController {
  constructor(private readonly travelNotesService: TravelNotesService) {}

  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "여행일지 생성" })
  @ApiOkResponse({ description: "신규 여행기록", type: TravelNoteEntity })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image1: { type: "file", format: "binary", description: "여행일지 이미지1" },
        image2: { type: "file", format: "binary", description: "여행일지 이미지2" },
        image3: { type: "file", format: "binary", description: "여행일지 이미지3" },
        image4: { type: "file", format: "binary", description: "여행일지 이미지4" },
        image5: { type: "file", format: "binary", description: "여행일지 이미지5" },
        image6: { type: "file", format: "binary", description: "여행일지 이미지6" },
        startDate: { type: "string", example: "2024-03-20", description: "여행 시작일" },
        endDate: { type: "string", example: "2024-03-25", description: "여행 종료일" },
        title: { type: "string", example: "서울여행", description: "여행일지 제목" },
        review: { type: "string", example: "서울여행 재밌다.", description: "여행일지 내용" },
        cityId: { type: "number", example: "1", description: "도시 ID" },
        cityName: {
          type: "string",
          example: "서울",
          description: "도시명(도시ID가 없을 경우에만 입력 -> 기타도시 선택시)",
        },
        mainImageIndex: { type: "number", example: 1, description: "메인 이미지 인덱스 (1 - 6)" },
      },
      required: ["startDate", "endDate", "title", "mainImageIndex"],
    },
  })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
      { name: "image5", maxCount: 1 },
      { name: "image6", maxCount: 1 },
    ])
  )
  async create(
    @SignInUser() user: UserEntity,
    @Body() body: CreateTravelNoteDto,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File[];
      image2?: Express.Multer.File[];
      image3?: Express.Multer.File[];
      image4?: Express.Multer.File[];
      image5?: Express.Multer.File[];
      image6?: Express.Multer.File[];
    }
  ) {
    // console.log(body);
    const images = [
      { sequence: 1, file: files?.image1 ? files.image1[0] : null },
      { sequence: 2, file: files?.image2 ? files.image2[0] : null },
      { sequence: 3, file: files?.image3 ? files.image3[0] : null },
      { sequence: 4, file: files?.image4 ? files.image4[0] : null },
      { sequence: 5, file: files?.image5 ? files.image5[0] : null },
      { sequence: 6, file: files?.image6 ? files.image6[0] : null },
    ]
      .filter((image) => image.file) // 파일 존재
      .filter((image) => image.file.size > 0); // 사이즈 0 이상

    return await this.travelNotesService.create(user.id, body, images);
  }


  @ApiOperation({
    summary: "여행일지 목록 조회",
    description: "로그인한 사용자의 여행 일지를 반환",
  })
  @ApiOkResponse({ type: TravelNoteEntity, isArray: true })
  @Get()
  async list(@SignInUser() user: UserEntity) {
    return await this.travelNotesService.list(user.id);
  }

  
  @ApiOperation({ summary: "여행일지 단건 조회" })
  @ApiParam({
    name: "id",
    required: true,
    type: "number",
    description: "여행일지 고유번호 PK",
    example: 1,
  })
  @ApiOkResponse({ type: TravelNoteEntity, description: "id에 부합하는 단건 조회" })
  @Get(":id")
  async getOneTravelNote(@Param("id", ParseIntPipe) id: number, @SignInUser() user: UserEntity) {
    return await this.travelNotesService.getOne(id);
  }

  @ApiOperation({ summary: "여행일지 수정" })
  @ApiConsumes("multipart/form-data")
  @ApiParam({ name: "id", required: true, description: "여행일지ID", type: String })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image1: { type: "file", format: "binary", description: "여행일지 이미지1" },
        image2: { type: "file", format: "binary", description: "여행일지 이미지2" },
        image3: { type: "file", format: "binary", description: "여행일지 이미지3" },
        image4: { type: "file", format: "binary", description: "여행일지 이미지4" },
        image5: { type: "file", format: "binary", description: "여행일지 이미지5" },
        image6: { type: "file", format: "binary", description: "여행일지 이미지6" },
        startDate: { type: "string", example: "2024-03-20", description: "여행 시작일" },
        endDate: { type: "string", example: "2024-03-25", description: "여행 종료일" },
        title: { type: "string", example: "서울여행", description: "여행일지 제목" },
        review: { type: "string", example: "서울여행 재밌다.", description: "여행일지 내용" },
        cityId: { type: "number", example: "1", description: "도시 ID" },
        cityName: {
          type: "string",
          example: "서울",
          description: "도시명(도시ID가 없을 경우에만 입력 -> 기타도시 선택시)",
        },
        mainImageIndex: { type: "number", example: 1, description: "메인 이미지 인덱스 (1 - 6)" },
      },
      required: ["startDate", "endDate", "title", "mainImageIndex"],
    },
  })
  @Put(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
      { name: "image5", maxCount: 1 },
      { name: "image6", maxCount: 1 },
    ])
  )
  async update(
    @SignInUser() user: UserEntity,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateTravelNoteDto,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File[];
      image2?: Express.Multer.File[];
      image3?: Express.Multer.File[];
      image4?: Express.Multer.File[];
      image5?: Express.Multer.File[];
      image6?: Express.Multer.File[];
    }
  ) {
    const images = [
      { sequence: 1, file: files?.image1 ? files.image1[0] : null },
      { sequence: 2, file: files?.image2 ? files.image2[0] : null },
      { sequence: 3, file: files?.image3 ? files.image3[0] : null },
      { sequence: 4, file: files?.image4 ? files.image4[0] : null },
      { sequence: 5, file: files?.image5 ? files.image5[0] : null },
      { sequence: 6, file: files?.image6 ? files.image6[0] : null },
    ]
      .filter((image) => image.file) // 파일 존재
      .filter((image) => image.file.size > 0); // 사이즈 0 이상

    return await this.travelNotesService.update(user.id, id, body, images);
  }

  @ApiConsumes("application/json")
  @ApiOperation({ summary: "여행일지 삭제" })
  @ApiParam({
    name: "id",
    required: true,
    type: "number",
    description: "여행일지 고유번호 PK",
    example: 1,
  })
  @Delete(":id")
  async delete(@SignInUser() user: UserEntity, @Param("id", ParseIntPipe) id: number) {
    return await this.travelNotesService.delete(user.id, id);
  }
}
