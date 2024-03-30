import { PickType, PartialType } from "@nestjs/mapped-types";
import { UserEntity } from "../../entities/user.entity";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { OmitType } from "@nestjs/swagger";

export class UpdateUserRequestBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  intro?: string;

  @IsOptional()
  profileImageFile?: Express.Multer.File;
}
