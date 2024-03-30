import { PickType, PartialType } from "@nestjs/mapped-types";
import { UserEntity } from "../../entities/user.entity";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class UpdateUserRequestBodyDto {
  @ApiProperty({
    description: "수정할 유저명",
    example: "이름수정",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "수정할 유저 소개글",
    example: "소개글수정",
  })
  @IsOptional()
  @IsString()
  intro?: string;

  @ApiProperty({
    description: "수정할 프로필 이미지",
  })
  @IsOptional()
  profileImageFile?: Express.Multer.File;
}
