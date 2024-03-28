import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty({ message: '국가코드[code]는 필수 입력값입니다.' })
  code: string;

  @IsNotEmpty({ message: '국가명[name]은 필수 입력값입니다.' })
  name: string;

  @IsOptional()
  continent: string;
}
