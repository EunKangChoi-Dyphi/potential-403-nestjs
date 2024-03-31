import { PickType, OmitType } from "@nestjs/mapped-types";
import { Readable } from "stream";
export class S3CommandDto {
  UploadFile: Express.Multer.File;
  Key: string;
  Body?: any; // Express.Multer.File.buffer
  ContentType?: string; // Express.MulterFile.mimetype
}

export class putObjectCommandDto extends OmitType(S3CommandDto, [
  "UploadFile",
] as const) {}

export class getObjectCommandDto extends PickType(S3CommandDto, ["Key"]) {}
export class deleteObjectCommandDto extends PickType(S3CommandDto, ["Key"]) {}
