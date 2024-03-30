import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class SearchCityDto {
  @ApiProperty({
    required: false,
    description: "국가코드",
    example: "KR",
  })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiProperty({
    required: false,
    description: "도시이름",
    example: "Seoul",
  })
  @IsOptional()
  @IsString()
  name?: string;
}
