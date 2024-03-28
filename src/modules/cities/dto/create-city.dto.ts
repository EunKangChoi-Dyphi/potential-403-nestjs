import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty({ message: '도시 이름[name]은 필수 입력값입니다.' })
  name: string;

  @IsNotEmpty({ message: '국가코드 [countryCode]는 필수 입력값입니다.' })
  countryCode: string;
}
