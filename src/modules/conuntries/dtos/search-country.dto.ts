import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SearchCountryDto {
  @ApiProperty({
    required: false,
    description: "국가이름",
    example: "South Korea",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    description: "대륙이름",
    example: "Asia",
  })
  @IsOptional()
  @IsString()
  continent?: string;
}
