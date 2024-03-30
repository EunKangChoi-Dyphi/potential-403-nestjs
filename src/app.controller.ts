import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { RedisService } from "src/modules/core/redis/redis.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { writeFileSync } from "fs";
import { ApiExcludeController, ApiExcludeEndpoint } from "@nestjs/swagger";

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async testRedis(@Body() body: { key: string; value: string }) {
    const { key, value } = body;
    await this.redisService.set(key, value, 60 * 60 * 24);
    return "OK";
  }

  @Post("file-upload")
  @UseInterceptors(FileInterceptor("file"))
  async testFileUpload(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log(file);
    writeFileSync("test.jpg", file.buffer);

    console.log(body);
  }

  @Post("file-upload2")
  @UseInterceptors(FilesInterceptor("files"))
  async testFileUpload2(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any) {
    console.log(files);
    console.log(body);
  }
}
