import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty({ message: '도시 이름[name]은 필수 입력값입니다.' })
  name: string;

  @IsNumber({}, { message: '국가ID [countryId]는 필수 입력값입니다.' })
  countryId: number;
}
