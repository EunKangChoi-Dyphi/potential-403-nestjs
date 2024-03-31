import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCityDto {
  @ApiProperty({})
  @IsNotEmpty({ message: "도시 이름[name]은 필수 입력값입니다." })
  name: string;

  @ApiProperty({})
  @IsNotEmpty({ message: "국가코드 [countryCode]는 필수 입력값입니다." })
  countryCode: string;
}
